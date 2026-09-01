import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { SkillCategory, SkillItem } from '../../data/skills';

export const AdminSkillManager: React.FC = () => {
  const { skills, updateSkills } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  
  // Independent input state per group index
  const [newSkillNames, setNewSkillNames] = useState<Record<number, string>>({});
  const [newSkillCategories, setNewSkillCategories] = useState<Record<number, SkillCategory>>({});

  const handleNameChange = (groupIdx: number, value: string) => {
    setNewSkillNames((prev) => ({ ...prev, [groupIdx]: value }));
  };

  const handleCategoryChange = (groupIdx: number, category: SkillCategory) => {
    setNewSkillCategories((prev) => ({ ...prev, [groupIdx]: category }));
  };

  const handleAddSkill = (groupIdx: number) => {
    const name = (newSkillNames[groupIdx] || '').trim();
    const category = newSkillCategories[groupIdx] || 'building';

    if (!name) return;

    const nextSkills = JSON.parse(JSON.stringify(skills));
    nextSkills[groupIdx].skills.push({
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: name,
      category: category,
      status: category === 'core' ? 'Production Ready' : category === 'building' ? 'Currently Building' : 'Applied in Projects',
      description: `Technological competence in ${name}.`,
      relatedProjects: [],
    });

    updateSkills(nextSkills);
    setNewSkillNames((prev) => ({ ...prev, [groupIdx]: '' }));
    setSavedMessage(`Added "${name}" as ${category.toUpperCase()} to ${skills[groupIdx].title}!`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleUpdateSkillCategory = (
    groupIdx: number,
    skillId: string,
    newCategory: SkillCategory
  ) => {
    const nextSkills = JSON.parse(JSON.stringify(skills));
    const targetSkill = nextSkills[groupIdx].skills.find((s: SkillItem) => s.id === skillId);
    if (targetSkill) {
      targetSkill.category = newCategory;
      targetSkill.status =
        newCategory === 'core'
          ? 'Production Ready'
          : newCategory === 'building'
          ? 'Currently Building'
          : 'Applied in Projects';
      updateSkills(nextSkills);
      setSavedMessage(`Updated "${targetSkill.name}" competency level to ${newCategory.toUpperCase()}.`);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const handleDeleteSkill = (groupIdx: number, skillId: string) => {
    const nextSkills = JSON.parse(JSON.stringify(skills));
    const targetSkillName = nextSkills[groupIdx].skills.find((s: SkillItem) => s.id === skillId)?.name;
    nextSkills[groupIdx].skills = nextSkills[groupIdx].skills.filter((s: SkillItem) => s.id !== skillId);
    updateSkills(nextSkills);
    setSavedMessage(`Deleted "${targetSkillName || skillId}".`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const getCategoryBadgeStyle = (category: SkillCategory) => {
    switch (category) {
      case 'core':
        return 'border-[#D4AF37] bg-[#1E1914] text-[#F7E7C4] shadow-[0_0_8px_rgba(212,175,55,0.2)]';
      case 'building':
        return 'border-amber-500/50 bg-amber-950/30 text-amber-300';
      case 'applied':
        return 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300';
      default:
        return 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#C4B5A5]';
    }
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            TECHNICAL COMPETENCY MATRIX MANAGER
          </span>
          <h1
            className="text-4xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            SKILLS &amp; ECOSYSTEM MANAGER
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Independently manage each skill category: CORE (Production Ready), BUILDING (Currently Building), or APPLIED (Projects).
          </p>
        </div>
      </div>

      {savedMessage && (
        <div className="p-4 border border-emerald-500/50 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm flex items-center justify-between animate-fadeIn">
          <span>✓ {savedMessage}</span>
          <button onClick={() => setSavedMessage('')} className="text-emerald-400 font-bold hover:underline">
            DISMISS
          </button>
        </div>
      )}

      {/* Skill Groups */}
      {skills.map((group, groupIdx) => (
        <div key={group.id || groupIdx} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#8C6D4F]/20 pb-3 gap-2">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">{group.badge}</span>
              <h2 className="text-xl font-mono font-bold text-white uppercase">{group.title}</h2>
            </div>
            <span className="text-[10px] font-mono px-3 py-1 border border-[#8C6D4F]/40 bg-[#120F0C] text-[#D4AF37] rounded-sm self-start sm:self-auto">
              {group.skills.length} SKILLS MANAGED
            </span>
          </div>

          {/* Skill Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {group.skills.map((tech) => (
              <div
                key={tech.id}
                className="p-3 border border-[#8C6D4F]/30 bg-[#120F0C] text-xs font-mono text-[#E8DFD8] flex items-center justify-between gap-2 rounded-sm group hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-white font-bold truncate">{tech.name}</span>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  {/* Per-Skill Category Selector */}
                  <select
                    value={tech.category}
                    onChange={(e) => handleUpdateSkillCategory(groupIdx, tech.id, e.target.value as SkillCategory)}
                    className={`text-[9.5px] font-mono px-1.5 py-1 rounded-sm border outline-none cursor-pointer uppercase ${getCategoryBadgeStyle(tech.category)}`}
                  >
                    <option value="core" className="bg-[#0A0806] text-[#F7E7C4]">CORE</option>
                    <option value="building" className="bg-[#0A0806] text-amber-300">BUILDING</option>
                    <option value="applied" className="bg-[#0A0806] text-emerald-300">APPLIED</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(groupIdx, tech.id)}
                    title={`Delete ${tech.name}`}
                    className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-sm text-xs font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add Skill Form for this specific group */}
          <div className="pt-4 border-t border-[#8C6D4F]/15 flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 font-mono text-xs">
            <input
              type="text"
              placeholder={`Add new skill to ${group.title}...`}
              value={newSkillNames[groupIdx] || ''}
              onChange={(e) => handleNameChange(groupIdx, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill(groupIdx);
                }
              }}
              className="bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-2.5 rounded-sm outline-none flex-1"
            />
            <select
              value={newSkillCategories[groupIdx] || 'building'}
              onChange={(e) => handleCategoryChange(groupIdx, e.target.value as SkillCategory)}
              className="bg-[#120F0C] border border-[#8C6D4F]/30 text-[#D4AF37] p-2.5 rounded-sm outline-none"
            >
              <option value="core">CORE (Production Ready)</option>
              <option value="building">BUILDING (Currently Building)</option>
              <option value="applied">APPLIED (In Projects)</option>
            </select>
            <button
              type="button"
              onClick={() => handleAddSkill(groupIdx)}
              className="px-5 py-2.5 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase hover:bg-[#E2C054] transition-colors"
            >
              + ADD SKILL
            </button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default AdminSkillManager;
