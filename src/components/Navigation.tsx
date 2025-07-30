import React from 'react';
import { Home, Calendar, Flower } from 'lucide-react';

interface NavigationProps {
  currentView: 'home' | 'garden' | 'history';
  onViewChange: (view: 'home' | 'garden' | 'history') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'home', label: 'Today', icon: Home },
    { id: 'garden', label: 'Garden', icon: Flower },
    { id: 'history', label: 'History', icon: Calendar },
  ] as const;

  return (
    <nav className="bg-white border-t border-green-100 px-6 py-3">
      <div className="flex justify-center space-x-8">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all duration-200 ${
              currentView === id
                ? 'bg-green-50 text-green-600'
                : 'text-gray-500 hover:text-green-500 hover:bg-green-25'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};