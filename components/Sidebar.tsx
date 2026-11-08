'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, FolderKanban, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Quick Notes', href: '/notes', icon: BookOpen },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Study Materials', href: '/study', icon: BookOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-4">
      {/* Logo/Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">Knowledge Hub</h1>
        <p className="text-sm text-gray-400 mt-1">Your Personal Workspace</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          Built with Next.js & Firebase
        </p>
      </div>
    </div>
  );
}
