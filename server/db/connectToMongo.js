const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://HamzaJavedShaikh:12@cluster0.blo8xq3.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "Chat-App-Socket"
      }, 
    );
    console.log(`"Connected to MongoDB"`  );
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectToDB;
