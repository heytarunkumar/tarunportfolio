import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminSkillManager: React.FC = () => {
  const { skills, updateSkills } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'core' | 'building' | 'applied'>('building');

  const handleAddSkill = (groupIndex: number) => {
    if (!newSkillName.trim()) return;

    const nextSkills = [...skills];
    nextSkills[groupIndex].skills.push({
      id: newSkillName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: newSkillName,
      category: newSkillCategory,
      status: newSkillCategory === 'core' ? 'Production Ready' : newSkillCategory === 'building' ? 'Currently Building' : 'Applied in Projects',
      description: `Technological competence in ${newSkillName}.`,
      relatedProjects: [],
    });

    updateSkills(nextSkills);
    setNewSkillName('');
    setSavedMessage('New skill added to category group!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDeleteSkill = (groupIndex: number, skillId: string) => {
    const nextSkills = [...skills];
    nextSkills[groupIndex].skills = nextSkills[groupIndex].skills.filter((s) => s.id !== skillId);
    updateSkills(nextSkills);
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          TECHNICAL COMPETENCY MATRIX MANAGER
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          SKILLS &amp; ECOSYSTEM MANAGER
        </h1>
      </div>

      {savedMessage && (
        <div className="p-3 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm">
          {savedMessage}
        </div>
      )}

      {/* Skill Groups */}
      {skills.map((group, groupIdx) => (
        <div key={group.id} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#8C6D4F]/20 pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{group.badge}</span>
              <h2 className="text-xl font-mono font-bold text-white uppercase">{group.title}</h2>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 border border-[#8C6D4F]/40 bg-[#120F0C] text-[#C4B5A5]">
              {group.statusText}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {group.skills.map((tech) => (
              <div
                key={tech.id}
                className="px-3 py-1.5 border border-[#8C6D4F]/30 bg-[#120F0C] text-xs font-mono text-[#E8DFD8] flex items-center space-x-2 rounded-sm"
              >
                <span>{tech.name}</span>
                <span className="text-[9px] text-[#8C6D4F]">({tech.category})</span>
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(groupIdx, tech.id)}
                  className="text-red-400 hover:text-red-300 ml-1 text-xs font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Quick Add Skill */}
          <div className="pt-4 border-t border-[#8C6D4F]/15 flex items-center space-x-2 font-mono text-xs">
            <input
              type="text"
              placeholder="Add skill name..."
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-2 rounded-sm outline-none flex-1"
            />
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value as any)}
              className="bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-2 rounded-sm outline-none"
            >
              <option value="core">CORE</option>
              <option value="building">BUILDING</option>
              <option value="applied">APPLIED</option>
            </select>
            <button
              type="button"
              onClick={() => handleAddSkill(groupIdx)}
              className="px-4 py-2 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase"
            >
              + ADD
            </button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default AdminSkillManager;
