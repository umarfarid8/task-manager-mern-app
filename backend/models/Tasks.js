const mongoose = require('mongoose');

// Schema batata hai ke data ka structure kya hoga
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is mandatory'], // Title lazmi hona chahiye
        trim: true // Aas paas ki extra spaces khatam karne ke liye
    },
    description: {
        type: String,
        default: '' // Agar description na ho to empty string save ho
    },
    completed: {
        type: Boolean,
        default: false // Shuru mein har naya task uncompleted (false) hoga
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatic current time save karega
    }
});

// Model banta hai jo is schema ko use kar ke database se baat karta hai
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;