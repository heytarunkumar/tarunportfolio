import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { SkillItem, SkillCategory } from '../../data/skills';

export const AdminSkillManager: React.FC = () => {
  const { skills, updateSkills } = usePortfolio();

  const updateSkillInGroup = (groupIdx: number, skillId: string, updated: Partial<SkillItem>) => {
    const next = [...skills];
    if (next[groupIdx]) {
      next[groupIdx] = {
        ...next[groupIdx],
        skills: next[groupIdx].skills.map((s) => (s.id === skillId ? { ...s, ...updated } : s)),
      };
      updateSkills(next);
    }
  };

  const deleteSkillFromGroup = (groupIdx: number, skillId: string) => {
    const next = [...skills];
    if (next[groupIdx]) {
      next[groupIdx] = {
        ...next[groupIdx],
        skills: next[groupIdx].skills.filter((s) => s.id !== skillId),
      };
      updateSkills(next);
    }
  };

  const addSkillToGroup = (groupIdx: number, skill: SkillItem) => {
    const next = [...skills];
    if (next[groupIdx]) {
      next[groupIdx] = {
        ...next[groupIdx],
        skills: [...next[groupIdx].skills, skill],
      };
      updateSkills(next);
    }
  };
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState<SkillCategory>('building');
  const [editDescription, setEditDescription] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  // Per-group quick add state
  const [newSkillNames, setNewSkillNames] = useState<{ [groupIdx: number]: string }>({});
  const [newSkillCategories, setNewSkillCategories] = useState<{ [groupIdx: number]: SkillCategory }>({});

  const startEditSkill = (skill: SkillItem) => {
    setEditingSkillId(skill.id);
    setEditName(skill.name);
    setEditCategory(skill.category);
    setEditDescription(skill.description || '');
  };

  const cancelEditSkill = () => {
    setEditingSkillId(null);
    setEditName('');
    setEditDescription('');
  };

  const handleSaveSkill = (groupIdx: number, skillId: string) => {
    if (!editName.trim()) return;

    updateSkillInGroup(groupIdx, skillId, {
      name: editName.trim(),
      category: editCategory,
      description: editDescription.trim(),
      status: editCategory === 'core' ? 'Production Core' : editCategory === 'building' ? 'In Progress' : 'Demonstrated',
    });

    setSavedMessage(`Skill "${editName}" updated successfully.`);
    cancelEditSkill();
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDeleteSkill = (groupIdx: number, skillId: string) => {
    const targetSkill = skills[groupIdx]?.skills.find((s) => s.id === skillId);
    if (confirm(`Delete skill "${targetSkill?.name || skillId}"?`)) {
      deleteSkillFromGroup(groupIdx, skillId);
      setSavedMessage(`Skill deleted from ${skills[groupIdx]?.title}.`);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const handleAddSkill = (groupIdx: number) => {
    const name = newSkillNames[groupIdx]?.trim();
    if (!name) return;

    const category = newSkillCategories[groupIdx] || 'building';
    const newSkill: SkillItem = {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      category,
      status: category === 'core' ? 'Production Core' : category === 'building' ? 'In Progress' : 'Demonstrated',
      description: `Technical implementation and hands-on usage of ${name}.`,
      relatedProjects: [],
    };

    addSkillToGroup(groupIdx, newSkill);
    setNewSkillNames({ ...newSkillNames, [groupIdx]: '' });
    setSavedMessage(`Skill "${name}" added to ${skills[groupIdx]?.title}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleNameChange = (groupIdx: number, value: string) => {
    setNewSkillNames({ ...newSkillNames, [groupIdx]: value });
  };

  const handleCategoryChange = (groupIdx: number, value: SkillCategory) => {
    setNewSkillCategories({ ...newSkillCategories, [groupIdx]: value });
  };

  const handleUpdateSkillCategory = (groupIdx: number, skillId: string, newCat: SkillCategory) => {
    updateSkillInGroup(groupIdx, skillId, {
      category: newCat,
      status: newCat === 'core' ? 'Production Core' : newCat === 'building' ? 'In Progress' : 'Demonstrated',
    });
    setSavedMessage(`Skill category updated to ${newCat.toUpperCase()}.`);
    setTimeout(() => setSavedMessage(''), 2500);
  };

  const getCategoryBadgeStyle = (cat: SkillCategory) => {
    switch (cat) {
      case 'core':
        return 'border-[#D4AF37]/50 bg-[#1E1914] text-[#F7E7C4] shadow-[0_0_8px_rgba(212,175,55,0.2)]';
      case 'building':
        return 'border-amber-500/40 bg-amber-950/20 text-amber-300';
      case 'applied':
        return 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300';
      default:
        return 'border-[#26211B] bg-[#12100E] text-[#C4BCB3]';
    }
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#26211B] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            TECHNICAL COMPETENCY MATRIX MANAGER
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Skills &amp; Ecosystem Manager
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Modify skill names, descriptions, competency levels (CORE, BUILDING, APPLIED), or delete skills.
          </p>
        </div>
      </div>

      {savedMessage && (
        <div className="p-4 border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 text-xs font-mono rounded-xl flex items-center justify-between animate-fadeIn">
          <span>✓ {savedMessage}</span>
          <button onClick={() => setSavedMessage('')} className="text-emerald-400 font-bold hover:underline cursor-pointer">
            DISMISS
          </button>
        </div>
      )}

      {/* Skill Groups */}
      {skills.map((group, groupIdx) => (
        <div key={group.id || groupIdx} className="card-lift bg-[#12100E] border border-[#26211B] p-6 sm:p-7 rounded-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#26211B] pb-3 gap-2">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">{group.badge}</span>
              <h2 className="text-lg font-serif font-bold text-white tracking-wide">{group.title}</h2>
            </div>
            <span className="text-[10.5px] font-mono px-3 py-1 border border-[#26211B] bg-[#0A0908] text-[#D4AF37] rounded-full self-start sm:self-auto">
              {group.skills.length} SKILLS MANAGED
            </span>
          </div>

          {/* Skill Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {group.skills.map((tech) => {
              const isEditing = editingSkillId === tech.id;

              if (isEditing) {
                return (
                  <div
                    key={tech.id}
                    className="p-4 border border-[#D4AF37] bg-[#1A1714] text-xs font-mono text-[#E8DFD8] rounded-xl space-y-3 col-span-1 md:col-span-2 lg:col-span-3 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                  >
                    <div className="flex items-center justify-between border-b border-[#26211B] pb-2">
                      <span className="text-[#D4AF37] font-bold uppercase tracking-wider">
                        EDIT SKILL: {tech.name}
                      </span>
                      <button
                        type="button"
                        onClick={cancelEditSkill}
                        className="text-xs text-[#8C6D4F] hover:text-white cursor-pointer"
                      >
                        ✕ CANCEL
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] text-[#8C6D4F] uppercase mb-1">
                          SKILL NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-2.5 rounded-xl outline-none font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-[#8C6D4F] uppercase mb-1">
                          COMPETENCY LEVEL *
                        </label>
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value as SkillCategory)}
                          className="w-full bg-[#0A0908] border border-[#26211B] text-[#D4AF37] p-2.5 rounded-xl outline-none font-sans"
                        >
                          <option value="core">CORE (Production Ready)</option>
                          <option value="building">BUILDING (Currently Building)</option>
                          <option value="applied">APPLIED (In Projects)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#8C6D4F] uppercase mb-1">
                        DESCRIPTION / CONTEXT NOTE
                      </label>
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Brief technical detail or experience context..."
                        className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-2.5 rounded-xl outline-none font-sans"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleSaveSkill(groupIdx, tech.id)}
                        className="px-4 py-2 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold uppercase cursor-pointer"
                      >
                        SAVE CHANGES ↗
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditSkill}
                        className="px-3 py-2 rounded-xl border border-[#26211B] bg-[#0A0908] text-[#C4BCB3] uppercase hover:text-white cursor-pointer"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={tech.id}
                  className="p-3 border border-[#26211B] bg-[#0A0908] text-xs font-mono text-[#E8DFD8] flex items-center justify-between gap-2 rounded-xl group hover:border-[#D4AF37]/40 transition-colors"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <span className="text-white font-bold truncate font-sans">{tech.name}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    {/* Per-Skill Category Selector */}
                    <select
                      value={tech.category}
                      onChange={(e) => handleUpdateSkillCategory(groupIdx, tech.id, e.target.value as SkillCategory)}
                      className={`text-[9.5px] font-mono px-2 py-1 rounded-lg border outline-none cursor-pointer uppercase ${getCategoryBadgeStyle(tech.category)}`}
                    >
                      <option value="core" className="bg-[#0A0908] text-[#F7E7C4]">CORE</option>
                      <option value="building" className="bg-[#0A0908] text-amber-300">BUILDING</option>
                      <option value="applied" className="bg-[#0A0908] text-emerald-300">APPLIED</option>
                    </select>

                    {/* Edit Skill Button */}
                    <button
                      type="button"
                      onClick={() => startEditSkill(tech)}
                      title={`Edit ${tech.name}`}
                      className="px-2 py-1 border border-[#26211B] bg-[#12100E] text-[#D4AF37] hover:border-[#D4AF37] rounded-lg text-[10px] cursor-pointer"
                    >
                      EDIT
                    </button>

                    {/* Delete Skill Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(groupIdx, tech.id)}
                      title={`Delete ${tech.name}`}
                      className="px-2 py-1 border border-red-500/30 bg-red-950/20 text-red-400 hover:border-red-500 rounded-lg text-[10px] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Add Skill Form for this specific group */}
          <div className="pt-4 border-t border-[#26211B] flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 font-mono text-xs">
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
              className="bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-2.5 rounded-xl outline-none flex-1 font-sans text-xs"
            />
            <select
              value={newSkillCategories[groupIdx] || 'building'}
              onChange={(e) => handleCategoryChange(groupIdx, e.target.value as SkillCategory)}
              className="bg-[#0A0908] border border-[#26211B] text-[#D4AF37] p-2.5 rounded-xl outline-none font-sans text-xs"
            >
              <option value="core">CORE (Production Ready)</option>
              <option value="building">BUILDING (Currently Building)</option>
              <option value="applied">APPLIED (In Projects)</option>
            </select>
            <button
              type="button"
              onClick={() => handleAddSkill(groupIdx)}
              className="px-5 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold uppercase hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-colors cursor-pointer"
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
