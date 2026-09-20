const projectModel = require('../models/projectModel');

async function showEditProjectForm(req, res) {
    try {
        const projectId = req.params.id;
        // Ensure you call your model functions to fetch project details and organizations
        const project = await projectModel.getProjectDetails ? await projectModel.getProjectDetails(projectId) : {};
        const organizations = await projectModel.getAllOrganizations ? await projectModel.getAllOrganizations() : [];
        
        res.render('update-project', {
            title: 'Edit Service Project',
            project,
            organizations
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error loading edit project form.');
    }
}

async function processEditProjectForm(req, res) {
    try {
        const projectId = req.params.id;
        const { name, description, due_date, organization_id } = req.body;
        
        await projectModel.updateProject(projectId, name, description, due_date, organization_id);
        
        // Redirect back to the project details page
        res.redirect(`/projects/${projectId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating the project.');
    }
}

module.exports = {
    showEditProjectForm,
    processEditProjectForm
};
