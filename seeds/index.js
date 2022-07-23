const mongoose = require("mongoose");
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")
const Campground = require("../models/campground");

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpCamp')
        .then(() => {
            console.log("Connected to mongodb")
        }).catch(e => {
            console.log("ERRROR");
            console.log(e)
        })
};

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", () => {
//     console.log("Database connected!");
// });

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100)
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            image: "https://random.imagecdn.app/500/500",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit a quidem quisquam laboriosam neque minus ut culpa voluptas labore deserunt similique voluptatum, dolore amet, iure impedit corporis nostrum in? Alias.",
            price
        })
        await camp.save();
    }
}

// seedDB().then(() => {
//     db.connection.close();
// })