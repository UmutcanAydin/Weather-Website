const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geoCode");
const forecast = require("./utils/foreCast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath  = path.join(__dirname,"/templates/views");
const partialsPath = path.join(__dirname,"/templates/partials"); 

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Umutcan Aydin"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Umutcan Aydin"
    });
});

app.get("/help", (req,res) => {
    res.render("help", {
        helpMessage: "This is a help message",
        title: "Help",
        name: "Umutcan Aydin"
    });
});

app.get("/weather", (req, res) => {
   if(!req.query.address){
       return res.send({
        error: "Please provide an address"
       });
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
        
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({error}); 
            }

            res.send({
                location,
                forecastData
            });
            
        });
    });

});

app.get("/products", (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        });
    }// or put else

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.render("404error",{
        title: "404",
        errorMessage: "Help page not found",
        name: "Umutcan Aydin"
    });
});

// Must come last
app.get("*", (req, res) => {
    res.render("404error",{
        title: "404",
        errorMessage: "404 not found",
        name: "Umutcan Aydin"
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});