var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
       name: "Everglades",
       image: "https://farm4.staticflickr.com/3031/2966370678_44a2b7529f.jpg",
       description: "The Inside Out Mermaid is fine with letting it all hang out–veins, muscles, the bits of fat at her belly, her small gray spleen. At first her lover loves it–with her organs on the outside, she's the ultimate open book. He can pump her lungs like two bellows and make her gasp; ask her difficult questions and study the synapses firing in her brain as she answers to see if she's lying; poke a pleasure center in the frontal lobe and watch her squirm. No need for bouquets or sad stories about his childhood. He just plucks a pulmonary vein and watches the left ventricle flounder. But before long, she starts to sense that her lover, like all the others before him, is getting restless. This is when she starts showing them her collections–the basket of keys from all over the world, the box of zippers with teeth of every imaginable size–all chosen to convey a sense of openness. As a last resort, she’ll even read out loud the entries from her diary about him to him. But eventually he’ll become convinced she’s hiding things from him and she is. Her perfect skin. Her long black hair. Her red mouth, never chapped from exposure to sun or wind, how she secretly loves that he can’t touch her here or here."
    },
    {
       name: "Alachu",
       image: "https://farm7.staticflickr.com/6184/6098929858_e55839883e.jpg",
       description: "The Inside Out Mermaid is fine with letting it all hang out–veins, muscles, the bits of fat at her belly, her small gray spleen. At first her lover loves it–with her organs on the outside, she's the ultimate open book. He can pump her lungs like two bellows and make her gasp; ask her difficult questions and study the synapses firing in her brain as she answers to see if she's lying; poke a pleasure center in the frontal lobe and watch her squirm. No need for bouquets or sad stories about his childhood. He just plucks a pulmonary vein and watches the left ventricle flounder. But before long, she starts to sense that her lover, like all the others before him, is getting restless. This is when she starts showing them her collections–the basket of keys from all over the world, the box of zippers with teeth of every imaginable size–all chosen to convey a sense of openness. As a last resort, she’ll even read out loud the entries from her diary about him to him. But eventually he’ll become convinced she’s hiding things from him and she is. Her perfect skin. Her long black hair. Her red mouth, never chapped from exposure to sun or wind, how she secretly loves that he can’t touch her here or here."
    },
    {
       name: "Moutain Rainier",
       image: "https://farm8.staticflickr.com/7378/9495289393_f6bd610cf9.jpg",
       description: "The Inside Out Mermaid is fine with letting it all hang out–veins, muscles, the bits of fat at her belly, her small gray spleen. At first her lover loves it–with her organs on the outside, she's the ultimate open book. He can pump her lungs like two bellows and make her gasp; ask her difficult questions and study the synapses firing in her brain as she answers to see if she's lying; poke a pleasure center in the frontal lobe and watch her squirm. No need for bouquets or sad stories about his childhood. He just plucks a pulmonary vein and watches the left ventricle flounder. But before long, she starts to sense that her lover, like all the others before him, is getting restless. This is when she starts showing them her collections–the basket of keys from all over the world, the box of zippers with teeth of every imaginable size–all chosen to convey a sense of openness. As a last resort, she’ll even read out loud the entries from her diary about him to him. But eventually he’ll become convinced she’s hiding things from him and she is. Her perfect skin. Her long black hair. Her red mouth, never chapped from exposure to sun or wind, how she secretly loves that he can’t touch her here or here."
    }
    ]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
