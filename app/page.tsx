'use client';

import { useState, useEffect } from 'react';
import { Plus, Lightbulb, Rocket, BookMarked } from 'lucide-react';
import QuickNoteCard from '@/components/QuickNoteCard';
import ProjectCard from '@/components/ProjectCard';
import StudyCard from '@/components/StudyCard';

export default function Home() {
  const [quickNotes, setQuickNotes] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [studyMaterials, setStudyMaterials] = useState<any[]>([]);

  // Load data from localStorage on mount (will be replaced with Firebase)
  useEffect(() => {
    const savedNotes = localStorage.getItem('quickNotes');
    const savedProjects = localStorage.getItem('projects');
    const savedStudy = localStorage.getItem('studyMaterials');

    if (savedNotes) setQuickNotes(JSON.parse(savedNotes));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedStudy) setStudyMaterials(JSON.parse(savedStudy));
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Welcome Back! 👋
        </h1>
        <p className="text-gray-400">
          Your personal knowledge and project workspace
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <Lightbulb className="text-white" size={32} />
            <div>
              <p className="text-blue-100 text-sm">Quick Notes</p>
              <p className="text-3xl font-bold text-white">{quickNotes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <Rocket className="text-white" size={32} />
            <div>
              <p className="text-purple-100 text-sm">Active Projects</p>
              <p className="text-3xl font-bold text-white">{projects.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <BookMarked className="text-white" size={32} />
            <div>
              <p className="text-green-100 text-sm">Study Materials</p>
              <p className="text-3xl font-bold text-white">{studyMaterials.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Notes Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Recent Notes</h2>
          <a
            href="/notes"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Note
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickNotes.slice(0, 3).map((note) => (
            <QuickNoteCard key={note.id} note={note} />
          ))}
          {quickNotes.length === 0 && (
            <div className="col-span-full bg-gray-800 rounded-xl p-8 text-center">
              <Lightbulb className="mx-auto mb-3 text-gray-500" size={48} />
              <p className="text-gray-400">No notes yet. Start capturing your ideas!</p>
            </div>
          )}
        </div>
      </section>

      {/* Active Projects Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Active Projects</h2>
          <a
            href="/projects"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            New Project
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {projects.length === 0 && (
            <div className="col-span-full bg-gray-800 rounded-xl p-8 text-center">
              <Rocket className="mx-auto mb-3 text-gray-500" size={48} />
              <p className="text-gray-400">No projects yet. Create your first one!</p>
            </div>
          )}
        </div>
      </section>

      {/* Study Materials Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Study Materials</h2>
          <a
            href="/study"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Material
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studyMaterials.slice(0, 3).map((material) => (
            <StudyCard key={material.id} material={material} />
          ))}
          {studyMaterials.length === 0 && (
            <div className="col-span-full bg-gray-800 rounded-xl p-8 text-center">
              <BookMarked className="mx-auto mb-3 text-gray-500" size={48} />
              <p className="text-gray-400">No study materials yet. Add your first resource!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
