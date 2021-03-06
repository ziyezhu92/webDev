var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENT NEW
router.get("/new",middleware.isLoggedIn ,function(req,res){
    //find campground by id
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
            // res.render("comments/new",{campground:campground, currentUser:req.user}); 
        }
    })
});

router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           req.flash("error", "Something went wrong");
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               console.log(comment.author);
               req.flash("success","Comment added successfully");
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
        }
    })
});

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            req.flash("error", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});



// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }else{
//         res.redirect("/login");
//     }
// }

// function checkCommentOwnership(req,res,next){
//     //check if user logged in
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id,function(err,foundComment){
//             if(err){
//                 res.redirect("back");
//             }else{
//                 //does user own that comment
//                 console.log(foundComment);
//                 if(foundComment.author.id.equals(req.user._id)){
//                      next();
//                 }else{
//                     res.redirect("back");
//                 }
//             }
//       })
//     }else{
//          res.redirect("back");
//     }
// }

module.exports = router;