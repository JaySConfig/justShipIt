// models/project.js
const mongoose = require('mongoose');

const TECH_STACK_OPTIONS = [
    // Frontend
    'HTML', 'CSS', 'JavaScript', 'TypeScript',
    
    // Frontend Frameworks
    'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt',
    
    // CSS Frameworks
    'Tailwind', 'Bootstrap', 'SASS',
    
    // Backend
    'Node.js', 'Express', 'Flask', 'Django', 'Laravel', 'Ruby on Rails',
    
    // Databases
    'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis',
    
    // Programming Languages
    'Python', 'Java', 'PHP', 'Ruby', 'Go', 'C#', 'C++',
    
    // DevOps & Tools
    'Docker', 'Kubernetes', 'Jenkins',
    
    // Cloud Platforms
    'AWS', 'Google Cloud', 'Azure', 'Heroku', 'Vercel', 'Netlify',
    
    // Mobile
    'React Native', 'Flutter', 'Swift', 'Kotlin',
    
    // Other
    'Other'
];

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    techStack: [{
        type: String,
        enum: TECH_STACK_OPTIONS,
        required: true
    }],
    liveUrl: {
        type: String,
        trim: true
    },
    githubUrl: {
        type: String,
        trim: true
    },
    devDuration: {
        type: String,
        enum: ['Less than a month', '1-3 months', '3-6 months', '6-12 months', 'Over a year']
    },
    category: {
        type: String,
        required: true,
        enum: ['Web App', 'Mobile App', 'Browser Extension', 'API/Backend', 'Developer Tool', 
               'Open Source Library', 'Portfolio', 'E-commerce', 'Educational', 'Game', 'Just for Fun']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    // We'll add user reference later when we implement authentication
});

module.exports = mongoose.model('Project', projectSchema);