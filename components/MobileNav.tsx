'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, FolderKanban, Settings, Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Quick Notes', href: '/notes', icon: BookOpen },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Study Materials', href: '/study', icon: BookOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-blue-400">Knowledge Hub</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 z-50 p-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-blue-400">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
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
          </div>
        </>
      )}
    </>
  );
}
