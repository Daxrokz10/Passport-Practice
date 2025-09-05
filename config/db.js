const { default: mongoose } = require("mongoose");

const db = mongoose.connect('mongodb://localhost:27017/passportPracticeDB').then(()=>{
    console.log(" Database Connected.");
}).catch((error)=>{
    console.error(" Database Connection Error: ", error.message);
});

module.exports = db;