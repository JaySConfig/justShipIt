const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Project = require('../models/project');

// GET all projects
router.get('/', async (req, res) => {
   try {
       console.log('Starting projects fetch...');
       console.log('MongoDB connection state:', mongoose.connection.readyState);
       
       const projects = await Project.find({});
       console.log('Projects found:', JSON.stringify(projects, null, 2));
       
       if (!projects) {
           console.log('No projects array returned');
           return res.render('projects/index', { projects: [] });
       }

       console.log('Rendering page with', projects.length, 'projects');
       return res.render('projects/index', { projects });

   } catch (error) {
       console.error('Detailed error:', error);
       return res.status(500).render('projects/index', { 
           projects: [],
           error: 'Error fetching projects: ' + error.message 
       });
   }
});

// GET project submission form
router.get('/new', (req, res) => {
   res.render('projects/new', {
       techStackOptions: Project.schema.path('techStack.0').enumValues
   });
});

// POST new project
router.post('/', async (req, res) => {
   try {
       const project = new Project(req.body);
       await project.save();
       res.redirect('/projects');
   }
   catch (error) {
       res.render('projects/new', {
           error: 'Error creating project',
           project: req.body,
           techStackOptions: Project.schema.path('techStack.0').enumValues
       });
   }
});

module.exports = router;