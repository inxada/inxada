import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CharacterHeaderProps {
  name: string;
  onSave: () => void;
  saving: boolean;
}

const CharacterHeader: React.FC<CharacterHeaderProps> = ({ name, onSave, saving }) => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center mb-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/characters')}
          className="rpg-button-secondary p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl md:text-2xl font-display text-primary truncate max-w-[200px] md:max-w-none">
          {name}
        </h1>
      </div>
      <button
        onClick={onSave}
        disabled={saving}
        className="rpg-button-primary flex items-center gap-2"
      >
        <Save className="w-4 h-4" />
        <span className="hidden md:inline">{saving ? 'Salvando...' : 'Salvar'}</span>
      </button>
    </header>
  );
};

export default CharacterHeader;
