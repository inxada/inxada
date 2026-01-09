import React from 'react';
import { User, Heart, Zap, Dices, Package, BookOpen } from 'lucide-react';

export type TabType = 'attributes' | 'injuries' | 'talents' | 'skills' | 'inventory' | 'info';

interface CharacterTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'attributes', label: 'Atributos', icon: <User className="w-4 h-4" /> },
  { id: 'injuries', label: 'Ferimentos', icon: <Heart className="w-4 h-4" /> },
  { id: 'talents', label: 'Talentos', icon: <Zap className="w-4 h-4" /> },
  { id: 'skills', label: 'Perícias', icon: <Dices className="w-4 h-4" /> },
  { id: 'inventory', label: 'Inventário', icon: <Package className="w-4 h-4" /> },
  { id: 'info', label: 'Informações', icon: <BookOpen className="w-4 h-4" /> },
];

const CharacterTabs: React.FC<CharacterTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-1 md:gap-2 overflow-x-auto pb-2 mb-6 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 font-display text-sm whitespace-nowrap transition-colors ${
            activeTab === tab.id
              ? 'tab-active'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab.icon}
          <span className="hidden md:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CharacterTabs;
