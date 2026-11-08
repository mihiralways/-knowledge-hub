'use client';

import { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  dueDate: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'Planning',
    progress: 0,
    dueDate: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('projects');
    if (saved) setProjects(JSON.parse(saved));
  }, []);

  const saveProjects = (updatedProjects: Project[]) => {
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    if (!newProject.name.trim() || !newProject.description.trim()) return;

    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
    };

    saveProjects([project, ...projects]);
    setNewProject({
      name: '',
      description: '',
      status: 'Planning',
      progress: 0,
      dueDate: '',
    });
    setIsAdding(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Track and manage your projects</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          {isAdding ? <X size={20} /> : <Plus size={20} />}
          {isAdding ? 'Cancel' : 'New Project'}
        </button>
      </div>

      {/* Add Project Form */}
      {isAdding && (
        <div className="bg-gray-800 border border-purple-500 rounded-xl p-6 mb-6 shadow-lg shadow-purple-500/10">
          <input
            type="text"
            placeholder="Project name..."
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoFocus
          />
          <textarea
            placeholder="Project description..."
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            rows={4}
            className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Status</label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>Planning</option>
                <option>In Progress</option>
                <option>On Hold</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Progress (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newProject.progress}
                onChange={(e) => setNewProject({ ...newProject, progress: parseInt(e.target.value) || 0 })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Due Date</label>
              <input
                type="date"
                value={newProject.dueDate}
                onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            onClick={handleAddProject}
            className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <Save size={20} />
            Save Project
          </button>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && !isAdding && (
        <div className="bg-gray-800 rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-gray-400 mb-6">Start tracking your projects and goals</p>
          <button
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Create Your First Project
          </button>
        </div>
      )}
    </div>
  );
}
