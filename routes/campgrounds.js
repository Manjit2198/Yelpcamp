var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//show all campgrounds

router.get("/campgrounds", function(req, res){
    
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }

    });
});


//show form to create new campground

router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//add a new campground to Database

router.post("/campgrounds", middleware.isLoggedIn, function(req,res){
   
    var name= req.body.name
    var price= req.body.price
    var image= req.body.image
    var desc= req.body.description
    var author= {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description:desc, author:author}
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            req.flash("error", err.message);
        }else{
            req.flash("success", "Campground added succesfully")
            res.redirect("/campgrounds");
        }
    });
   
})


//shows more info about one campground

router.get("/campgrounds/:id", function(req, res){

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
        }else{
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
  
});


//edit the campground

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.render("campgrounds/edit", {campground:foundCampground})
        }
    });
    });


//update route

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "Campground not found")
            res.redirect("/campgrounds")
        }else{
            req.flash("success", "Campground Updated")
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});


//delete route
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        }else{
            req.flash("success", "Campground Deleted")
            res.redirect("/campgrounds")
        }
    })
})


module.exports = router;