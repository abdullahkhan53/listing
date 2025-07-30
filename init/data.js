const mongoose = require('mongoose');
const Listing = require('../models/listing.js')

let sampleData = [
    { 
      title: "Cozy Beachfront Bungalow",
      description: "A peaceful retreat right on the beach with stunning views of the ocean.",
      image:{
        url: "https://media.istockphoto.com/id/2152515127/photo/southern-lights-over-lake-te-anau.jpg?s=1024x1024&w=is&k=20&c=UgpP14LeS2aeICcMxkkTH8jtnYE5V8DRsPaA_qlimlQ=",
        filename: "listingimage"
        },
      price: 200,
      location: "Malibu, California",
      country: "United States",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Mountain View Cabin",
      description: "Perfect getaway cabin located in the heart of the Rocky Mountains.",
      image:{
        url: "https://images.unsplash.com/photo-1742317402143-449e8b4cbf91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
        filename: "listingimage"
        },
      price: 150,
      location: "Aspen, Colorado",
      country: "United States",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Luxury Apartment in the City",
      description: "A modern, luxurious apartment located in the heart of New York City.",
      image:{
        url: "https://images.unsplash.com/photo-1731964877423-364ed1e13a7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
        filename: "listingimage"
        },
      price: 350,
      location: "Manhattan, New York",
      country: "United States",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Rustic Cottage in the Woods",
      description: "Charming cottage surrounded by nature, perfect for a quiet weekend retreat.",
      image:{
        url: "https://images.unsplash.com/photo-1742603096268-0efc93dcc95a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
        filename: "listingimage"
        },
      price: 120,
      location: "Portland, Oregon",
      country: "United States",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Modern Loft in the City Center",
      description: "Stylish and spacious loft with views of the city skyline.",
      image:{
        url: "https://images.unsplash.com/photo-1742590794643-5b401ed198b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
        filename: "listingimage"
        },
      price: 250,
      location: "Los Angeles, California",
      country: "United States",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Charming Villa in Tuscany",
      description: "A beautiful countryside villa in the heart of Tuscany, Italy, with a private vineyard.",
      image:{
        url: "https://images.unsplash.com/photo-1742414348816-fe5f76446808?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D",
        filename: "listingimage"
        },
      price: 450,
      location: "Florence, Tuscany",
      country: "Italy",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Secluded Cabin by the Lake",
      description: "Escape to this secluded cabin by the lake for the perfect nature retreat.",
      image:{
        url: "https://images.unsplash.com/photo-1742268350468-345079a1081b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2NXx8fGVufDB8fHx8fA%3D%3D",
        filename: "listingimage"
        },
      price: 180,
      location: "Lake Tahoe, California",
      country: "United States",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Penthouse Suite in the Heart of Tokyo",
      description: "A luxurious penthouse with breathtaking views of Tokyo Tower and the city skyline.",
      image:{
        url: "https://images.unsplash.com/photo-1741851373479-b43efb3b6e54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3Mnx8fGVufDB8fHx8fA%3D%3D",
        filename: "listingimage"
        },
      price: 500,
      location: "Shibuya, Tokyo",
      country: "Japan",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Historic Mansion in Paris",
      description: "An elegant and historic mansion located in the heart of Paris, France.",
      image:{
        url: "https://images.unsplash.com/photo-1741851373786-1986f693aaf2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3NXx8fGVufDB8fHx8fA%3D%3D",
        filename: "listingimage"
        },
      price: 600,
      location: "Le Marais, Paris",
      country: "France",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Beachfront Resort in Bali",
      description: "Stay in a beautiful beachfront resort with luxurious amenities and serene views.",
      image:{
        url: "https://images.unsplash.com/photo-1741851373794-ab6b44b367c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDJ8fHxlbnwwfHx8fHw%3D",
        filename: "listingimage"
        },
      price: 350,
      location: "Seminyak, Bali",
      country: "Indonesia",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Eco-Friendly Cabin in the Forest",
      description: "A sustainable, eco-friendly cabin nestled in the heart of the forest.",
      image:{
        url: "https://images.unsplash.com/photo-1742590794643-5b401ed198b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
        filename: "listingimage"
        },
      price: 170,
      location: "Vancouver Island, Canada",
      country: "Canada",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Luxury Ski Chalet in the Alps",
      description: "Enjoy skiing and comfort in a luxurious chalet with amazing alpine views.",
      image:{
        url: "https://images.unsplash.com/photo-1741850820683-b25798ff3164?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDd8fHxlbnwwfHx8fHw%3D",
        filename: "listingimage"
        },
      price: 600,
      location: "Chamonix, French Alps",
      country: "France",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Gorgeous Apartment with Ocean Views",
      description: "Modern apartment offering panoramic ocean views in a tropical paradise.",
      image:{
        url: "https://images.unsplash.com/photo-1740520224644-1e123158ab34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzh8fHxlbnwwfHx8fHw%3D",
        filename: "listingimage"
        },
      price: 320,
      location: "Honolulu, Hawaii",
      country: "United States",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Charming Cottage on the Beach",
      description: "A small but charming cottage right on the beach with a private dock.",
      image:{
        url: "https://images.unsplash.com/photo-1724963843259-3b0727c53b0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNTh8fHxlbnwwfHx8fHw%3D",
        filename: "listingimage"
        },
      price: 210,
      location: "Key West, Florida",
      country: "United States",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Luxury Condo in Dubai Marina",
      description: "Stylish and luxurious condo with stunning views of the Marina and skyscrapers.",
      image:{
        url: "https://images.unsplash.com/photo-1741115815553-20c3c83ca6c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNjN8fHxlbnwwfHx8fHw%3D",
        filename: "listingimage"
        },
      price: 800,
      location: "Dubai Marina, Dubai",
      country: "United Arab Emirates",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Chic City Apartment in Barcelona",
      description: "Modern and chic apartment located in the vibrant city of Barcelona, Spain.",
      image:{
        url: "https://images.unsplash.com/photo-1734536314871-40de62976e1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzN8fHxlbnwwfHx8fHw%3D",
        filename: "listingimage"
        },
      price: 220,
      location: "Eixample, Barcelona",
      country: "Spain",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Spacious Farmhouse in the Countryside",
      description: "A lovely farmhouse with large gardens and plenty of space for relaxation.",
      image:{
        url: "https://images.unsplash.com/photo-1735956742769-9932350cb87b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODB8fHxlbnwwfHx8fHw%3D",
        filename: "listingimage"
        },
      price: 280,
      location: "Kent, England",
      country: "United Kingdom",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Stylish Loft with Industrial Charm",
      description: "A spacious loft with modern amenities and a touch of industrial charm.",
      image:{
        url: "https://images.unsplash.com/photo-1741290723109-e7f4222b27b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMDl8fHxlbnwwfHx8fHw%3D",
        filename: "listingimage"
        },
      price: 230,
      location: "Brooklyn, New York",
      country: "United States",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    },
    {
      title: "Beachfront Villa in the Maldives",
      description: "Exclusive beachfront villa offering total privacy and luxury in the Maldives.",
      image:{
        url: "https://images.unsplash.com/photo-1737961756998-973ead0592df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMTh8fHxlbnwwfHx8fHw%3Ds",
        filename: "listingimage"
        },
      price: 1000,
      location: "Maldives",
      country: "Maldives",
      geometry: { type: 'Point', coordinates: [ 150.8929, -34.394005 ] }
    }
  ];

  // module.exports = {sampleData}


//  Mongoose Link
const mongooseLink = 'mongodb://127.0.0.1:27017/wanderLust';

async function main(){
    await mongoose.connect(mongooseLink);
}

main().then((res) => {
    console.log('mongoose connection successful')
}).catch((err) => {
    console.log('mongoose connection error');    
})
  
async function initData() {
    await Listing.deleteMany({});
    sampleData = sampleData.map((obj) => ({...obj, owner: "686a5107477d150064003b7e"}))
    await Listing.insertMany(sampleData);
    console.log('data was initialized')

}

initData();