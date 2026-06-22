const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./models/Tasks'); // Task model import kiya

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());


// MongoDB connection
require('dotenv').config(); // Yeh line .env file ko read karegi
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB successfully connected!'))
    .catch((err) => console.error('Database connection error:', err));

// 1. GET route: Saare tasks fetch karne ke liye (Fixed Path)
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); 
        res.json(tasks); 
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
});

// 2. POST route: Naya task create karne ke liye
app.post('/api/tasks', async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description
        });
        const savedTask = await newTask.save(); 
        res.status(201).json(savedTask); 
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. PUT ROUTE: Task ko update karne ke liye
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            { completed: req.body.completed }, 
            { new: true } 
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: 'Task update nahi ho saka' });
    }
});

// 4. DELETE ROUTE: Task ko delete karne ke liye
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task kamyabi se delete ho gaya!' });
    } catch (err) {
        res.status(500).json({ error: 'Task delete karne mein masla hua' });
    }
});

// Root Test Route
app.get('/', (req, res) => {
    res.send('Alhamdulillah! Backend aur Database ka setup bilkul sahi hai.');
});

app.listen(PORT, () => {
    console.log(`Server successfully started on port: ${PORT}`);
});