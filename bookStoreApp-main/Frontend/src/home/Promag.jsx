// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const ProjectManagementSystem = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectName || !projectDescription || !projectStatus) {
      alert('Please fill in all fields');
      return;
    }
    const newProject = {
      id: new Date().getTime().toString(),
      name: projectName,
      description: projectDescription,
      status: projectStatus,
    };
    setProjects([...projects, newProject]);
    setProjectName('');
    setProjectDescription('');
    setProjectStatus('');
  };

  const handleDelete = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  const handleDone = (projectId) => {
    const updatedProject = projects.find((project) => project.id === projectId);
    updatedProject.status = 'Done';
    setProjects([...projects]);
  };

  const handleEdit = (projectId) => {
    setIsEditing(true);
    setEditingProjectId(projectId);
    const editingProject = projects.find((project) => project.id === projectId);
    setProjectName(editingProject.name);
    setProjectDescription(editingProject.description);
    setProjectStatus(editingProject.status);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!projectName || !projectDescription || !projectStatus) {
      alert('Please fill in all fields');
      return;
    }
    const updatedProject = {
      id: editingProjectId,
      name: projectName,
      description: projectDescription,
      status: projectStatus,
    };
    setProjects(
      projects.map((project) => {
        if (project.id === editingProjectId) {
          return updatedProject;
        }
        return project;
      })
    );
    setIsEditing(false);
    setProjectName('');
    setProjectDescription('');
    setProjectStatus('');
  };

  return (
    <div>
      <h2>Project Management System</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Project Name:
          <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        </label>
        <br />
        <label>
          Project Description:
          <input type="text" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Project Status:
          <input type="text" value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <label>
            Project Name:
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          </label>
          <br />
          <label>
            Project Description:
            <input type="text" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
          </label>
          <br />
          <label>
            Project Status:
            <input type="text" value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)} />
          </label>
          <br />
          <button type="submit">Update</button>
        </form>
      ) : (
        <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id}>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <p className="project-status">{project.status}</p>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
            <button onClick={() => handleDone(project.id)}>Done</button>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default ProjectManagementSystem;