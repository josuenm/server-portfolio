const express = require('express');
const Project = require('../models/project');
const router = express.Router();
const Auth = require('../middlewares/auth');

router.get('/getAll', async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/getAll', async (req, res) => {
  try {
    const projects = await Project.find();

    if (!projects) {
      res.status(404).json({ message: 'Projects not found' });
    }

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (project === null) {
      res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/create', Auth, async (req, res) => {
  const { title, description, technologies, repository, website } = req.body;

  try {
    const project = new Project({
      title,
      description,
      technologies,
      repository,
      website,
    });

    await project.save();

    res.status(200).send(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/project/edit/:id', Auth, async (req, res) => {
  const { title, description, technologies, repository, website } = req.body;

  const newProject = {
    title,
    description,
    technologies,
    repository,
    website,
  };

  try {
    const project = await Project.findByIdAndUpdate(req.params.id, newProject);

    res.status(204).json(newProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id/delete', Auth, async (req, res) => {
  const { title, description, technologies, repository, website } = req.body;

  const newProject = {
    title,
    description,
    technologies,
    repository,
    website,
  };

  try {
    const project = await Project.findByIdAndUpdate(req.params.id, newProject);

    res.status(204).json(newProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
