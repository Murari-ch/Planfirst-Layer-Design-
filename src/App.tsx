import React, { useState, useCallback } from 'react';
import { FileCode, Plus, ChevronRight, ChevronDown, Trash2, Edit2, Check, Copy, Download, Sparkles, GitBranch, List, Play } from 'lucide-react';

interface FileChange {
  id: string;
  path: string;
  description: string;
  reasoning: string;
  changeType: 'create' | 'modify' | 'delete';
}

interface Phase {
  id: string;
  name: string;
  description: string;
  files: FileChange[];
  isExpanded: boolean;
  status: 'pending' | 'planning' | 'ready' | 'completed';
}

interface Project {
  name: string;
  intent: string;
  phases: Phase[];
}

const App: React.FC = () => {
  const [project, setProject] = useState<Project>({
    name: '',
    intent: '',
    phases: []
  });
  
  const [activeView, setActiveView] = useState<'setup' | 'planning'>('setup');
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate phases from intent (simulated AI planning)
  const generatePhases = useCallback(() => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const samplePhases: Phase[] = [
        {
          id: '1',
          name: 'Setup & Infrastructure',
          description: 'Initialize project structure, dependencies, and core configuration files',
          files: [
            {
              id: '1-1',
              path: 'package.json',
              description: 'Add required dependencies for the project',
              reasoning: 'Need to install base libraries before implementing features',
              changeType: 'modify'
            },
            {
              id: '1-2',
              path: 'src/config/index.ts',
              description: 'Create central configuration file',
              reasoning: 'Centralize environment variables and app settings',
              changeType: 'create'
            }
          ],
          isExpanded: true,
          status: 'ready'
        },
        {
          id: '2',
          name: 'Core Components',
          description: 'Build reusable UI components and shared utilities',
          files: [
            {
              id: '2-1',
              path: 'src/components/Button.tsx',
              description: 'Create reusable button component with variants',
              reasoning: 'Needed across multiple features for consistency',
              changeType: 'create'
            },
            {
              id: '2-2',
              path: 'src/utils/helpers.ts',
              description: 'Add utility functions for data formatting',
              reasoning: 'Avoid code duplication across features',
              changeType: 'create'
            }
          ],
          isExpanded: false,
          status: 'pending'
        },
        {
          id: '3',
          name: 'Feature Implementation',
          description: 'Implement main feature logic and integrate with components',
          files: [
            {
              id: '3-1',
              path: 'src/features/dashboard/Dashboard.tsx',
              description: 'Build main dashboard component',
              reasoning: 'Primary user interface for the feature',
              changeType: 'create'
            }
          ],
          isExpanded: false,
          status: 'pending'
        }
      ];
      
      setProject(prev => ({ ...prev, phases: samplePhases }));
      setActiveView('planning');
      setIsGenerating(false);
    }, 1500);
  }, []);

  const togglePhaseExpansion = (phaseId: string) => {
    setProject(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId ? { ...phase, isExpanded: !phase.isExpanded } : phase
      )
    }));
  };

  const addPhase = () => {
    const newPhase: Phase = {
      id: Date.now().toString(),
      name: 'New Phase',
      description: 'Describe this phase...',
      files: [],
      isExpanded: true,
      status: 'pending'
    };
    setProject(prev => ({ ...prev, phases: [...prev.phases, newPhase] }));
  };

  const addFile = (phaseId: string) => {
    const newFile: FileChange = {
      id: Date.now().toString(),
      path: 'src/new-file.ts',
      description: 'Describe the changes...',
      reasoning: 'Explain why this change is needed...',
      changeType: 'create'
    };
    
    setProject(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? { ...phase, files: [...phase.files, newFile] }
          : phase
      )
    }));
  };

  const updatePhase = (phaseId: string, updates: Partial<Phase>) => {
    setProject(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId ? { ...phase, ...updates } : phase
      )
    }));
    setEditingPhase(null);
  };

  const updateFile = (phaseId: string, fileId: string, updates: Partial<FileChange>) => {
    setProject(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              files: phase.files.map(file =>
                file.id === fileId ? { ...file, ...updates } : file
              )
            }
          : phase
      )
    }));
    setEditingFile(null);
  };

  const deleteFile = (phaseId: string, fileId: string) => {
    setProject(prev => ({
      ...prev,
      phases: prev.phases.map(phase =>
        phase.id === phaseId
          ? { ...phase, files: phase.files.filter(f => f.id !== fileId) }
          : phase
      )
    }));
  };

  const deletePhase = (phaseId: string) => {
    setProject(prev => ({
      ...prev,
      phases: prev.phases.filter(p => p.id !== phaseId)
    }));
  };

  const exportPlan = () => {
    const markdown = `# ${project.name}\n\n## Project Intent\n${project.intent}\n\n## Implementation Plan\n\n${project.phases.map((phase, idx) => `### Phase ${idx + 1}: ${phase.name}\n\n${phase.description}\n\n**Files to Change:**\n\n${phase.files.map(file => `- **${file.path}** (${file.changeType})\n  - ${file.description}\n  - *Reasoning:* ${file.reasoning}`).join('\n\n')}`).join('\n\n---\n\n')}`;
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}-plan.md`;
    a.click();
  };

  const copyToClipboard = () => {
    const text = `Project: ${project.name}\nIntent: ${project.intent}\n\nPhases: ${project.phases.length}\nTotal Files: ${project.phases.reduce((acc, p) => acc + p.files.length, 0)}`;
    navigator.clipboard.writeText(text);
  };

  if (activeView === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <GitBranch className="w-10 h-10 text-purple-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                PlanFirst
              </h1>
            </div>
            <p className="text-xl text-slate-300">
              Plan smarter, code better. A simplified planning layer for AI coding agents.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700 shadow-2xl">
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => setProject(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., E-commerce Dashboard"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-500"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Project Intent
              </label>
              <textarea
                value={project.intent}
                onChange={(e) => setProject(prev => ({ ...prev, intent: e.target.value }))}
                placeholder="Describe what you want to build... Be specific about features, user flows, and technical requirements."
                rows={8}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-500 resize-none"
              />
            </div>

            <button
              onClick={generatePhases}
              disabled={!project.name || !project.intent || isGenerating}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-purple-500/50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Smart Plan
                </>
              )}
            </button>

            <p className="text-center text-sm text-slate-400 mt-4">
              AI will break down your project into phases with detailed file-level changes
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6">
            <div className="bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-slate-700">
              <div className="text-purple-400 mb-2">
                <List className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-1">Phase-Based Planning</h3>
              <p className="text-sm text-slate-400">Break complex projects into manageable phases</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-slate-700">
              <div className="text-purple-400 mb-2">
                <FileCode className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-1">File-Level Detail</h3>
              <p className="text-sm text-slate-400">Precise specifications for every file change</p>
            </div>
            <div className="bg-slate-800/30 backdrop-blur rounded-xl p-6 border border-slate-700">
              <div className="text-purple-400 mb-2">
                <Play className="w-8 h-8" />
              </div>
              <h3 className="font-semibold mb-1">Agent Handoff</h3>
              <p className="text-sm text-slate-400">Export plans for any coding agent to execute</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <GitBranch className="w-6 h-6 text-purple-400" />
              <div>
                <h1 className="text-xl font-bold">{project.name}</h1>
                <p className="text-sm text-slate-400">
                  {project.phases.length} phases • {project.phases.reduce((acc, p) => acc + p.files.length, 0)} files
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
                Copy Summary
              </button>
              <button
                onClick={exportPlan}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Intent Card */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 mb-6 border border-slate-700">
          <h2 className="text-sm font-semibold text-purple-400 mb-2">PROJECT INTENT</h2>
          <p className="text-slate-200">{project.intent}</p>
        </div>

        {/* Phases */}
        <div className="space-y-4">
          {project.phases.map((phase, phaseIdx) => (
            <div
              key={phase.id}
              className="bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 overflow-hidden transition-all hover:border-purple-500/50"
            >
              {/* Phase Header */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <button
                      onClick={() => togglePhaseExpansion(phase.id)}
                      className="mt-1 text-slate-400 hover:text-white transition-colors"
                    >
                      {phase.isExpanded ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                    <div className="flex-1">
                      {editingPhase === phase.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={phase.name}
                            onChange={(e) => setProject(prev => ({
                              ...prev,
                              phases: prev.phases.map(p =>
                                p.id === phase.id ? { ...p, name: e.target.value } : p
                              )
                            }))}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white"
                          />
                          <textarea
                            value={phase.description}
                            onChange={(e) => setProject(prev => ({
                              ...prev,
                              phases: prev.phases.map(p =>
                                p.id === phase.id ? { ...p, description: e.target.value } : p
                              )
                            }))}
                            rows={2}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white text-sm"
                          />
                          <button
                            onClick={() => setEditingPhase(null)}
                            className="flex items-center gap-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
                          >
                            <Check className="w-4 h-4" />
                            Done
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-semibold px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
                              Phase {phaseIdx + 1}
                            </span>
                            <h3 className="text-lg font-semibold">{phase.name}</h3>
                          </div>
                          <p className="text-slate-400 text-sm">{phase.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingPhase(phase.id)}
                      className="p-2 hover:bg-slate-700 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-slate-400" />
                    </button>
                    <button
                      onClick={() => deletePhase(phase.id)}
                      className="p-2 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Phase Files */}
              {phase.isExpanded && (
                <div className="px-6 pb-6 space-y-3">
                  {phase.files.map((file) => (
                    <div
                      key={file.id}
                      className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500/30 transition-all"
                    >
                      {editingFile === file.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={file.path}
                            onChange={(e) => updateFile(phase.id, file.id, { path: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm font-mono"
                          />
                          <select
                            value={file.changeType}
                            onChange={(e) => updateFile(phase.id, file.id, { changeType: e.target.value as any })}
                            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                          >
                            <option value="create">Create</option>
                            <option value="modify">Modify</option>
                            <option value="delete">Delete</option>
                          </select>
                          <textarea
                            value={file.description}
                            onChange={(e) => updateFile(phase.id, file.id, { description: e.target.value })}
                            rows={2}
                            placeholder="Description"
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                          />
                          <textarea
                            value={file.reasoning}
                            onChange={(e) => updateFile(phase.id, file.id, { reasoning: e.target.value })}
                            rows={2}
                            placeholder="Reasoning"
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                          />
                          <button
                            onClick={() => setEditingFile(null)}
                            className="flex items-center gap-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm"
                          >
                            <Check className="w-4 h-4" />
                            Done
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <FileCode className="w-4 h-4 text-purple-400 flex-shrink-0" />
                              <code className="text-sm text-purple-300 font-mono">{file.path}</code>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                file.changeType === 'create' ? 'bg-green-500/20 text-green-300' :
                                file.changeType === 'modify' ? 'bg-blue-500/20 text-blue-300' :
                                'bg-red-500/20 text-red-300'
                              }`}>
                                {file.changeType}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setEditingFile(file.id)}
                                className="p-1 hover:bg-slate-700 rounded"
                              >
                                <Edit2 className="w-3 h-3 text-slate-400" />
                              </button>
                              <button
                                onClick={() => deleteFile(phase.id, file.id)}
                                className="p-1 hover:bg-red-500/20 rounded"
                              >
                                <Trash2 className="w-3 h-3 text-red-400" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-slate-300 mb-2">{file.description}</p>
                          <div className="flex items-start gap-2 text-xs text-slate-500">
                            <span className="font-semibold">Why:</span>
                            <span>{file.reasoning}</span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  
                  <button
                    onClick={() => addFile(phase.id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 border-dashed rounded-lg transition-colors text-slate-400 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                    Add File Change
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Phase Button */}
        <button
          onClick={addPhase}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600 border-dashed rounded-xl transition-colors text-slate-300 hover:text-white mt-6"
        >
          <Plus className="w-5 h-5" />
          Add New Phase
        </button>
      </div>
    </div>
  );
};

export default App;