require('dotenv').config();

var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    flash           = require("connect-flash"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
console.log(process.env.DATABASEURL);
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//mongoose.connect('mongodb://localhost:27017/yelp_camp_v11', { useNewUrlParser: true });
//mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true } );
// then(() => console.log(`Database connected at ${process.env.DATABASEURL}`))
//       .catch(err => console.log(`Database connection error: ${err.message}`));
//mongodb://ziyezhu:ziye1202@ds121982.mlab.com:21982/yelpcamp
mongoose.connect('mongodb://ziyezhu:ziye1202@ds121982.mlab.com:21982/yelpcamp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database

app.locals.moment = require("moment");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Broccoli is the best food in the world!",
    resave: false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


// Campground.create(
//     {
//         name: "Everglades", 
//         image:"https://farm7.staticflickr.com/6184/6098929858_e55839883e.jpg"
//     },function(err,campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("NEWLY ADDED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });

var campgrounds = [
       {name: "Moutain Rainier", image:"https://farm7.staticflickr.com/6061/6128480949_a8c7921e9e.jpg"},
        {name: "Everglades", image:"https://farm7.staticflickr.com/6184/6098929858_e55839883e.jpg"},
        {name: "Olympics", image:"https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg"},
         {name: "Moutain Rainier", image:"https://farm7.staticflickr.com/6061/6128480949_a8c7921e9e.jpg"},
        {name: "Everglades", image:"https://farm7.staticflickr.com/6184/6098929858_e55839883e.jpg"},
        {name: "Olympics", image:"https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg"},
         {name: "Moutain Rainier", image:"https://farm7.staticflickr.com/6061/6128480949_a8c7921e9e.jpg"},
        {name: "Everglades", image:"https://farm7.staticflickr.com/6184/6098929858_e55839883e.jpg"},
        {name: "Olympics", image:"https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg"}
    ]


app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server starts!") 
});