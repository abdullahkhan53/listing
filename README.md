# Listing Web App

A dynamic web application to create, manage, and explore property listings.  
Built with **Node.js**, **Express**, **MongoDB**, and **Cloudinary** for image storage.

---

## Features
- **Add, Edit, and Delete Listings** easily
- **Image Upload** via Cloudinary
- **User Authentication** with Passport.js
- **Responsive Design** using Bootstrap
- **Flash Messages** for better UX

---

## Tech Stack
- **Frontend:** EJS, Bootstrap, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Image Hosting:** Cloudinary
- **Authentication:** Passport.js (Local Strategy)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/abdullahkhan53/listing

# Install dependencies
npm install

# Create a `.env` file and add:
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret

# Start the app
npm index
