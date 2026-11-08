'use client';

import { Calendar, TrendingUp } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    status: string;
    progress: number;
    dueDate: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    'In Progress': 'bg-blue-500',
    'Planning': 'bg-yellow-500',
    'Completed': 'bg-green-500',
    'On Hold': 'bg-gray-500',
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-white text-lg">{project.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs text-white ${statusColors[project.status as keyof typeof statusColors] || 'bg-gray-500'}`}>
          {project.status}
        </span>
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs text-gray-400 font-medium">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Calendar size={14} />
        <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
