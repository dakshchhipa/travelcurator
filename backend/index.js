import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import packageRoute from "./routes/package.route.js";
import ratingRoute from "./routes/rating.route.js";
import bookingRoute from "./routes/booking.route.js";
import Package from "./models/package.model.js";
import Booking from "./models/booking.model.js";
import User from "./models/user.model.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import bcryptjs from "bcryptjs";
const app = express();
dotenv.config();

const __dirname = path.resolve();

const hashPassword = (password) => {
  return bcryptjs.hashSync(password, 10); // Synchronously hash the password with salt rounds of 10
};

const corsOptions = {
  origin: ["http://localhost:5173"], // Add Vite's dev server origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

const insertSampleData = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((err) => console.log(err));
    // const sampleUsers = [
    //   {
    //     username: "Ansh",
    //     email: "ansh@example.com",
    //     password: await hashPassword("password123"), // Hashing the password
    //     address: "123 Main Street, City A",
    //     phone: "1234567890",
    //     avatar: "https://example.com/images/ansh-avatar.jpg",
    //     user_role: 1, // Admin role
    //   },
    //   {
    //     username: "Daksh",
    //     email: "daksh@example.com",
    //     password: await hashPassword("password123"), // Hashing the password
    //     address: "456 Elm Street, City B",
    //     phone: "9876543210",
    //     avatar: "https://example.com/images/daksh-avatar.jpg",
    //     user_role: 0, // Regular user
    //   },
    //   {
    //     username: "Vasu",
    //     email: "vasu@example.com",
    //     password: await hashPassword("password123"), // Hashing the password
    //     address: "789 Oak Avenue, City C",
    //     phone: "1122334455",
    //     avatar: "https://example.com/images/vasu-avatar.jpg",
    //     user_role: 0, // Regular user
    //   },
    // ];

    // const samplePackages = [
    //   {
    //     packageName: "Beach Paradise Getaway",
    //     packageDescription:
    //       "Enjoy a relaxing 5-day vacation at the beautiful beaches of Bali, with luxury accommodation and water activities.",
    //     packageDestination: "Bali, Indonesia",
    //     packageDays: 5,
    //     packageNights: 4,
    //     packageAccommodation: "5-star Resort",
    //     packageTransportation: "Private Transfer",
    //     packageMeals: "Breakfast and Dinner",
    //     packageActivities: "Scuba Diving, Snorkeling, Beach Volleyball",
    //     packagePrice: 1200,
    //     packageDiscountPrice: 1000,
    //     packageOffer: true,
    //     packageRating: 4.8,
    //     packageTotalRatings: 150,
    //     packageImages: [
    //       "https://example.com/images/bali1.jpg",
    //       "https://example.com/images/bali2.jpg",
    //       "https://example.com/images/bali3.jpg",
    //     ],
    //   },
    //   {
    //     packageName: "Mountain Adventure Trek",
    //     packageDescription:
    //       "Experience thrilling treks and breathtaking views in the Himalayan Mountains.",
    //     packageDestination: "Manali, India",
    //     packageDays: 7,
    //     packageNights: 6,
    //     packageAccommodation: "Mountain Camps and Lodges",
    //     packageTransportation: "Shared Transport",
    //     packageMeals: "All Meals Included",
    //     packageActivities: "Trekking, Camping, Bonfires",
    //     packagePrice: 800,
    //     packageDiscountPrice: 700,
    //     packageOffer: true,
    //     packageRating: 4.5,
    //     packageTotalRatings: 200,
    //     packageImages: [
    //       "https://example.com/images/himalaya1.jpg",
    //       "https://example.com/images/himalaya2.jpg",
    //     ],
    //   },
    //   {
    //     packageName: "European Delight Tour",
    //     packageDescription:
    //       "Explore the best of Europe with guided city tours and luxury accommodations.",
    //     packageDestination: "Paris, Rome, and Zurich",
    //     packageDays: 10,
    //     packageNights: 9,
    //     packageAccommodation: "Luxury Hotels",
    //     packageTransportation: "Flights and Private Transfers",
    //     packageMeals: "All Meals Included",
    //     packageActivities: "City Tours, Museums, Shopping",
    //     packagePrice: 2500,
    //     packageDiscountPrice: 2200,
    //     packageOffer: false,
    //     packageRating: 4.9,
    //     packageTotalRatings: 300,
    //     packageImages: [
    //       "https://example.com/images/europe1.jpg",
    //       "https://example.com/images/europe2.jpg",
    //       "https://example.com/images/europe3.jpg",
    //     ],
    //   },
    // ];
    // await User.insertMany(sampleUsers);
    console.log("Sample users inserted successfully!");
//    await Package.insertMany(samplePackages);
    console.log("Sample data inserted successfully!");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  }
};

insertSampleData();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/package", packageRoute);
app.use("/api/rating", ratingRoute);
app.use("/api/booking", bookingRoute);

if (process.env.NODE_ENV_CUSTOM === "production") {
  //static files
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
} else {
  // //rest api
  app.use("/", (req, res) => {
    res.send("Welcome to travel and tourism app");
  });
}

//port
app.listen(4000, () => {
  console.log("listening on 8000");
});
