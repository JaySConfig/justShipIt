const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const app = express();
require('dotenv').config();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// Session setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// MongoDB Connection
// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit if we can't connect to database
});


// Add a root route
app.get('/', (req, res) => {
    res.send('Welcome to Just Ship It - Go to <a href="/projects">Projects</a>');
});

// Middleware to log all requests
app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

// Routes
const projectRoutes = require('./routes/projects');
app.use('/projects', projectRoutes);

// Temporary test route to add a sample project
app.get('/add-test-project', async (req, res) => {
    try {
        const Project = require('./models/project');
        const testProject = new Project({
            title: "Weather Dashboard",
            description: "A real-time weather application showing forecasts and weather data for multiple cities. Features include search history, detailed weather info, and responsive design.",
            techStack: ["JavaScript", "React", "Node.js", "CSS", "Express"],
            liveUrl: "https://example.com/weather",
            githubUrl: "https://github.com/example/weather",
            devDuration: "1-3 months",
            category: "Web App"
        });
        await testProject.save();
        res.send('Test project added successfully!');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error adding test project: ' + error.message);
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3001, () => console.log('Server running on port 3001'));