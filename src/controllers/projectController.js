import { getAllProjects } from '../models/projects.js';

export async function buildProjects(req, res) {
  const projects = await getAllProjects();
  res.render('projects', { 
    title: 'Upcoming Service Projects', 
    projects 
  });
}
