const { session } = require("passport");

var express            = require("express"),
    app                = express(),
 bodyParser            = require("body-parser"),
 mongoose              = require("mongoose"),
 Comment               = require("./models/comment"),
 Campground            = require("./models/campground"),
 flash                 = require("connect-flash"),
 User                  = require("./models/user"),
 passport              = require("passport"),
 methodOverride        = require("method-override"),
 passportLocalMongoose = require("passport-local-mongoose"),
 localStrategy         = require("passport-local");
 seedDB                = require("./seed")
 
//requiring routes

var commentRoutes      = require("./routes/comments");
var campgroundRoutes  = require("./routes/campgrounds");
var indexRoutes        = require("./routes/index");


 mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser:true});

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
// seedDB();

app.use(require("express-session")({
    secret: "rusty is the best dog",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(3511,function(){
    console.log("server started");
});
