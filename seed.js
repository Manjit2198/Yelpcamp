var mongoose = require("mongoose"),
  Campground = require("./models/campground"),
    Comment  = require("./models/comment");
   
var data = [
    // {
    //     name: "Dal lake",
    //     image: "https://farm1.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
    //     description: "akjfslafkasflak"
    // },
    // {
    //     name:"Hill-Top", 
    //     image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
    //     description: "This hill top is at altitude 56890 metres. It is third highest altitude of the world. "
        
    // }

]    

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
            console.log("removed campgrounds");
         
        Comment.remove({},function(err){
            if(err){
                console.log(err);
            }
                console.log("comments removed");
            

data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
        if(err){
            console.log(err);
        }else{
            console.log("added Campground");

            Comment.create(
                {
                    text: "This place is great, but i wish there was internet",
                    author: "Manjit"
                }, function(err, comment){
                    if(err)
                    {
                        console.log(err);
                    }else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created new comment");
                    }
                }
            )
        }
    });
});
    });
});
};

module.exports = seedDB;