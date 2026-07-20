/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Save, RotateCcw, Download, Upload, Plus, Trash, Edit, Check, Settings, AlertCircle, FileText } from 'lucide-react';
import { DesignerProfile, PortfolioWork, SkillItem, ExperienceItem, Locale } from '../types';

interface AdminEditorProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  profile: DesignerProfile;
  works: PortfolioWork[];
  skills: SkillItem[];
  experiences: ExperienceItem[];
  onSave: (
    profile: DesignerProfile,
    works: PortfolioWork[],
    skills: SkillItem[],
    experiences: ExperienceItem[]
  ) => void;
  onReset: () => void;
}

const safeEncodeUrl = (url: string): string => {
  if (!url) return url;
  if (url.startsWith('data:')) return url;
  try {
    const decoded = decodeURIComponent(url);
    return encodeURI(decoded);
  } catch (e) {
    return encodeURI(url);
  }
};

export const AdminEditor: React.FC<AdminEditorProps> = ({
  isOpen,
  onClose,
  locale,
  profile,
  works,
  skills,
  experiences,
  onSave,
  onReset,
}) => {
  // State variables for edits
  const [editedProfile, setEditedProfile] = React.useState<DesignerProfile>({ ...profile });
  const [editedWorks, setEditedWorks] = React.useState<PortfolioWork[]>([...works]);
  const [editedSkills, setEditedSkills] = React.useState<SkillItem[]>([...skills]);
  const [editedExperiences, setEditedExperiences] = React.useState<ExperienceItem[]>([...experiences]);

  // Tab state
  const [activeTab, setActiveTab] = React.useState<'profile' | 'works' | 'skills' | 'experiences'>('profile');
  const [selectedWorkId, setSelectedWorkId] = React.useState<string | null>(null);
  const [showImportArea, setShowImportArea] = React.useState(false);
  const [importJsonText, setImportJsonText] = React.useState('');
  const [saveStatus, setSaveStatus] = React.useState<string | null>(null);

  // Sync state if initial props change
  React.useEffect(() => {
    setEditedProfile({ ...profile });
    setEditedWorks([...works]);
    setEditedSkills([...skills]);
    setEditedExperiences([...experiences]);
  }, [profile, works, skills, experiences]);

  if (!isOpen) return null;

  // Handles Saving All
  const handleSaveAll = () => {
    onSave(editedProfile, editedWorks, editedSkills, editedExperiences);
    setSaveStatus(locale === 'zh' ? '✅ 保存成功！已写入本地缓存。' : '✅ Saved successfully to browser memory.');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Export as JSON file
  const handleExportJson = () => {
    const fullData = {
      profile: editedProfile,
      works: editedWorks,
      skills: editedSkills,
      experiences: editedExperiences,
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aigc_resume_data_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON text
  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed.profile && parsed.works && parsed.skills && parsed.experiences) {
        setEditedProfile(parsed.profile);
        setEditedWorks(parsed.works);
        setEditedSkills(parsed.skills);
        setEditedExperiences(parsed.experiences);
        setShowImportArea(false);
        setImportJsonText('');
        alert(locale === 'zh' ? '🎉 数据解析并导入成功！请点击右上角“保存并应用”使其正式生效。' : '🎉 Import parsed successfully! Click Save to apply.');
      } else {
        alert(locale === 'zh' ? '❌ 导入格式有误，JSON 必须同时包含 profile, works, skills, experiences 节点。' : '❌ Schema error, must contain profile, works, skills, experiences.');
      }
    } catch (e) {
      alert(locale === 'zh' ? '❌ JSON 解析失败，请检查语法格式。' : '❌ JSON syntax parsing error.');
    }
  };

  // WORKS CRUD
  const handleAddWork = () => {
    const newId = `custom-work-${Date.now()}`;
    const newWorkItem: PortfolioWork = {
      id: newId,
      title: { zh: '新生成的艺术作品', en: 'New Gen Visual Creation' },
      category: 'render3d',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      description: {
        zh: '在此输入该商业海报或概念创作的设计构思。',
        en: 'Describe the creative vision and industrial context for this generation here.'
      },
      prompt: '',
      toolsUsed: ['Midjourney v6.0', 'Photoshop CC'],
      dimensions: '1200 x 1600 px',
      ratio: '3:4',
      date: '2026-07'
    };
    setEditedWorks([newWorkItem, ...editedWorks]);
    setSelectedWorkId(newId);
  };

  const handleRemoveWork = (id: string) => {
    if (confirm(locale === 'zh' ? '确定要删除此作品吗？' : 'Delete this work?')) {
      setEditedWorks(editedWorks.filter((w) => w.id !== id));
      if (selectedWorkId === id) setSelectedWorkId(null);
    }
  };

  const handleUpdateWorkField = (id: string, field: keyof PortfolioWork, value: any) => {
    setEditedWorks(
      editedWorks.map((w) => {
        if (w.id === id) {
          return { ...w, [field]: value };
        }
        return w;
      })
    );
  };

  const handleUpdateWorkLocaleField = (id: string, field: 'title' | 'description', lang: 'zh' | 'en', value: string) => {
    setEditedWorks(
      editedWorks.map((w) => {
        if (w.id === id) {
          return {
            ...w,
            [field]: {
              ...w[field],
              [lang]: value
            }
          };
        }
        return w;
      })
    );
  };

  // SKILLS CRUD
  const handleUpdateSkillProficiency = (index: number, val: number) => {
    const updated = [...editedSkills];
    updated[index].proficiency = val;
    setEditedSkills(updated);
  };

  const handleUpdateSkillLocaleDesc = (index: number, lang: 'zh' | 'en', val: string) => {
    const updated = [...editedSkills];
    updated[index].description[lang] = val;
    setEditedSkills(updated);
  };

  // EXPERIENCES CRUD
  const handleUpdateExpLocale = (id: string, field: 'role' | 'company' | 'description', lang: 'zh' | 'en', val: string) => {
    setEditedExperiences(
      editedExperiences.map((e) => {
        if (e.id === id) {
          return {
            ...e,
            [field]: {
              ...e[field],
              [lang]: val
            }
          };
        }
        return e;
      })
    );
  };

  const handleUpdateExpPeriod = (id: string, val: string) => {
    setEditedExperiences(
      editedExperiences.map((e) => {
        if (e.id === id) return { ...e, period: val };
        return e;
      })
    );
  };

  const handleUpdateExpHighlight = (expId: string, hIndex: number, lang: 'zh' | 'en', val: string) => {
    setEditedExperiences(
      editedExperiences.map((e) => {
        if (e.id === expId) {
          const newHighlights = { ...e.highlights };
          newHighlights[lang] = [...newHighlights[lang]];
          newHighlights[lang][hIndex] = val;
          return { ...e, highlights: newHighlights };
        }
        return e;
      })
    );
  };

  const handleAddExpHighlight = (expId: string) => {
    setEditedExperiences(
      editedExperiences.map((e) => {
        if (e.id === expId) {
          return {
            ...e,
            highlights: {
              zh: [...e.highlights.zh, '新成就指标内容'],
              en: [...e.highlights.en, 'New milestone KPI content']
            }
          };
        }
        return e;
      })
    );
  };

  const handleRemoveExpHighlight = (expId: string, hIndex: number) => {
    setEditedExperiences(
      editedExperiences.map((e) => {
        if (e.id === expId) {
          return {
            ...e,
            highlights: {
              zh: e.highlights.zh.filter((_, idx) => idx !== hIndex),
              en: e.highlights.en.filter((_, idx) => idx !== hIndex)
            }
          };
        }
        return e;
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs select-none">
      {/* Container */}
      <div className="w-full max-w-4xl bg-zinc-950 text-zinc-100 h-full flex flex-col border-l border-zinc-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-500 animate-spin" style={{ animationDuration: '6s' }} />
            <div>
              <h2 className="text-base font-bold tracking-tight">
                {locale === 'zh' ? 'DOU AIGC 简历配置终端' : 'AIGC Resume Configurator'}
              </h2>
              <p className="text-[10px] text-zinc-400 font-mono">WORKSPACE // CONSOLE VERSION 1.2</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Save Button */}
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{locale === 'zh' ? '保存并应用' : 'Save & Build'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Alert / Status Bar */}
        {saveStatus && (
          <div className="px-6 py-2 bg-emerald-950 border-b border-emerald-800 text-emerald-300 text-xs font-mono">
            {saveStatus}
          </div>
        )}

        {/* Configuration Tool Rail */}
        <div className="px-6 py-2 bg-zinc-900 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          {/* Section Selector Tabs */}
          <div className="flex space-x-2">
            {([
              { id: 'profile', label: { zh: '1. 个人档案', en: '1. Profile' } },
              { id: 'works', label: { zh: '2. 作品库', en: '2. Works' } },
              { id: 'skills', label: { zh: '3. 技能栈', en: '3. Skills' } },
              { id: 'experiences', label: { zh: '4. 职业履历', en: '4. Timeline' } },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowImportArea(false);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer tracking-wider transition-all uppercase ${
                  activeTab === tab.id
                    ? 'bg-zinc-800 text-white border-b-2 border-emerald-500'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {tab.label[locale]}
              </button>
            ))}
          </div>

          {/* Backup Import / Export */}
          <div className="flex items-center space-x-2">
            {/* Export */}
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-[11px] text-zinc-300 font-mono cursor-pointer"
              title="Export Full JSON Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{locale === 'zh' ? '导出 JSON' : 'Export JSON'}</span>
            </button>

            {/* Import Toggle */}
            <button
              onClick={() => setShowImportArea(!showImportArea)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-[11px] text-zinc-300 font-mono cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{locale === 'zh' ? '导入 JSON' : 'Import JSON'}</span>
            </button>

            {/* Factory Reset */}
            <button
              onClick={() => {
                if (confirm(locale === 'zh' ? '确定要恢复为高大上预设数据吗？本地修改将丢失。' : 'Reset to default mockup data?')) {
                  onReset();
                  onClose();
                }
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-red-950 hover:bg-red-950/20 text-[11px] text-red-400 font-mono cursor-pointer"
              title="Reset to mockup data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{locale === 'zh' ? '恢复默认' : 'Reset Default'}</span>
            </button>
          </div>
        </div>

        {/* JSON Import Overlay */}
        {showImportArea && (
          <div className="p-6 bg-zinc-900 border-b border-zinc-800 space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
              <AlertCircle className="w-4 h-4 text-emerald-500" />
              <span>{locale === 'zh' ? '贴入 JSON 数据进行全量覆盖' : 'Paste full JSON config to override'}</span>
            </h3>
            <textarea
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='{ "profile": { ... }, "works": [...], ... }'
              className="w-full h-32 p-3 rounded-lg border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-300 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowImportArea(false)}
                className="px-3 py-1 rounded bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700 cursor-pointer"
              >
                {locale === 'zh' ? '取消' : 'Cancel'}
              </button>
              <button
                onClick={handleImportJson}
                className="px-3 py-1 rounded bg-emerald-600 text-xs text-white font-semibold hover:bg-emerald-500 cursor-pointer"
              >
                {locale === 'zh' ? '解析并加载' : 'Parse & Load'}
              </button>
            </div>
          </div>
        )}

        {/* Main Editor Canvas Workspace (Scrollable) */}
        <div className="flex-grow p-6 overflow-y-auto space-y-6 select-text">
          
          {/* TAB 1: PROFILE FORM */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in" id="editor-tab-profile">
              <div className="border-b border-zinc-800 pb-2">
                <h3 className="text-sm font-bold text-white">{locale === 'zh' ? '个人核心属性配置' : 'Main Profile settings'}</h3>
                <p className="text-[11px] text-zinc-400">{locale === 'zh' ? '编辑姓名、职业标签、首屏简介、头像、作品集下载等' : 'Control hero texts, contact points, avatar pictures.'}</p>
              </div>

              {/* Grid Names */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '中文姓名' : 'Chinese Name'}</label>
                  <input
                    type="text"
                    value={editedProfile.name.zh}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: { ...editedProfile.name, zh: e.target.value } })}
                    className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '英文全称' : 'English Name'}</label>
                  <input
                    type="text"
                    value={editedProfile.name.en}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: { ...editedProfile.name, en: e.target.value } })}
                    className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '英文首字母 (大写)' : 'Uppercase initials'}</label>
                  <input
                    type="text"
                    value={editedProfile.englishName}
                    onChange={(e) => setEditedProfile({ ...editedProfile, englishName: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Professional Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '中文职位' : 'Title (ZH)'}</label>
                  <input
                    type="text"
                    value={editedProfile.title.zh}
                    onChange={(e) => setEditedProfile({ ...editedProfile, title: { ...editedProfile.title, zh: e.target.value } })}
                    className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '英文职位' : 'Title (EN)'}</label>
                  <input
                    type="text"
                    value={editedProfile.title.en}
                    onChange={(e) => setEditedProfile({ ...editedProfile, title: { ...editedProfile.title, en: e.target.value } })}
                    className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Avatar & Experience Years */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '设计师头像 URL' : 'Avatar URL'}</label>
                  <input
                    type="text"
                    value={editedProfile.avatarUrl}
                    onChange={(e) => setEditedProfile({ ...editedProfile, avatarUrl: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '设计从业年限' : 'Experience Years'}</label>
                  <input
                    type="number"
                    value={editedProfile.experienceYears}
                    onChange={(e) => setEditedProfile({ ...editedProfile, experienceYears: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* One sentence Intro */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '中文首屏简介' : 'Intro (ZH)'}</label>
                  <textarea
                    value={editedProfile.intro.zh}
                    onChange={(e) => setEditedProfile({ ...editedProfile, intro: { ...editedProfile.intro, zh: e.target.value } })}
                    className="w-full h-20 p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '英文首屏简介' : 'Intro (EN)'}</label>
                  <textarea
                    value={editedProfile.intro.en}
                    onChange={(e) => setEditedProfile({ ...editedProfile, intro: { ...editedProfile.intro, en: e.target.value } })}
                    className="w-full h-20 p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Narrative Bio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '中文关于我故事' : 'Bio Narrative (ZH)'}</label>
                  <textarea
                    value={editedProfile.bio.zh}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: { ...editedProfile.bio, zh: e.target.value } })}
                    className="w-full h-28 p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '英文关于我故事' : 'Bio Narrative (EN)'}</label>
                  <textarea
                    value={editedProfile.bio.en}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: { ...editedProfile.bio, en: e.target.value } })}
                    className="w-full h-28 p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Philosophy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '中文设计哲学金句' : 'Design Philosophy (ZH)'}</label>
                  <textarea
                    value={editedProfile.philosophy.zh}
                    onChange={(e) => setEditedProfile({ ...editedProfile, philosophy: { ...editedProfile.philosophy, zh: e.target.value } })}
                    className="w-full h-24 p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 font-semibold mb-1">{locale === 'zh' ? '英文设计哲学金句' : 'Design Philosophy (EN)'}</label>
                  <textarea
                    value={editedProfile.philosophy.en}
                    onChange={(e) => setEditedProfile({ ...editedProfile, philosophy: { ...editedProfile.philosophy, en: e.target.value } })}
                    className="w-full h-24 p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Social Channels & Contacts */}
              <div className="border-t border-zinc-850 pt-4">
                <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">{locale === 'zh' ? '社媒与联系网' : 'Social Channels & Contact'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '微信微信号' : 'WeChat ID'}</label>
                    <input
                      type="text"
                      value={editedProfile.wechat}
                      onChange={(e) => setEditedProfile({ ...editedProfile, wechat: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '微信二维码图片 URL' : 'WeChat QR Code URL'}</label>
                    <input
                      type="text"
                      value={editedProfile.wechatQrCode}
                      onChange={(e) => setEditedProfile({ ...editedProfile, wechatQrCode: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '邮箱地址' : 'Email Address'}</label>
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '小红书链接' : 'RED Link'}</label>
                    <input
                      type="text"
                      value={editedProfile.redBookUrl}
                      onChange={(e) => setEditedProfile({ ...editedProfile, redBookUrl: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '小红书昵称' : 'RED Nickname'}</label>
                    <input
                      type="text"
                      value={editedProfile.redBookName}
                      onChange={(e) => setEditedProfile({ ...editedProfile, redBookName: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '站酷链接' : 'Zcool Link'}</label>
                    <input
                      type="text"
                      value={editedProfile.zcoolUrl}
                      onChange={(e) => setEditedProfile({ ...editedProfile, zcoolUrl: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '站酷显示昵称' : 'Zcool Nickname'}</label>
                    <input
                      type="text"
                      value={editedProfile.zcoolName}
                      onChange={(e) => setEditedProfile({ ...editedProfile, zcoolName: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTFOLIO WORKS LIST */}
          {activeTab === 'works' && (
            <div className="space-y-6 animate-fade-in text-zinc-200" id="editor-tab-works">
              <div className="border-b border-zinc-800 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{locale === 'zh' ? '设计师作品库' : 'Portfolio Library'}</h3>
                  <p className="text-[11px] text-zinc-400">{locale === 'zh' ? '支持无损分类、自定义原尺寸比例、定制提示词(Prompts)' : 'Configure aspect ratio and original prompt engineering logs.'}</p>
                </div>
                {/* Add Work */}
                <button
                  onClick={handleAddWork}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{locale === 'zh' ? '新建作品' : 'Add Work'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left side list */}
                <div className="md:col-span-4 border border-zinc-800 rounded-xl max-h-[500px] overflow-y-auto bg-zinc-900/30 p-2 space-y-1">
                  {editedWorks.map((work) => (
                    <div
                      key={work.id}
                      onClick={() => setSelectedWorkId(work.id)}
                      className={`p-3 rounded-lg flex items-center justify-between gap-2 text-left cursor-pointer transition-all ${
                        selectedWorkId === work.id
                          ? 'bg-zinc-800 text-white border-l-4 border-emerald-500'
                          : 'hover:bg-zinc-900 text-zinc-400'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold line-clamp-1">{work.title[locale]}</p>
                        <p className="text-[9px] uppercase font-mono text-zinc-500 mt-1">{work.category}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveWork(work.id);
                        }}
                        className="p-1 rounded hover:bg-zinc-700 text-red-500 cursor-pointer"
                        title="Delete work"
                      >
                        <Trash className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Right side form */}
                <div className="md:col-span-8 border border-zinc-800 rounded-xl p-5 bg-zinc-900/10 space-y-4">
                  {selectedWorkId ? (
                    (() => {
                      const selectedWork = editedWorks.find((w) => w.id === selectedWorkId);
                      if (!selectedWork) return null;
                      return (
                        <div className="space-y-4">
                          {/* Image preview & source URL */}
                          <div className="flex gap-4 items-center">
                            <img
                              src={selectedWork.imageUrl && selectedWork.imageUrl.startsWith('data:') ? selectedWork.imageUrl : safeEncodeUrl(selectedWork.imageUrl)}
                              alt="preview"
                              referrerPolicy="no-referrer"
                              className="w-16 h-16 object-cover rounded-lg bg-zinc-950 border border-zinc-800 cursor-zoom-in hover:opacity-80 transition-all"
                              onClick={() => window.open(selectedWork.imageUrl, '_blank')}
                              title={locale === 'zh' ? '点击查看原图' : 'Click to view original image'}
                            />
                            <div className="flex-grow space-y-1.5">
                              <div className="flex items-center justify-between">
                                <label className="block text-xs text-zinc-400 font-mono">// 图片 URL (点击左侧预览图可查看高清原图)</label>
                                <label className="text-[10px] text-emerald-400 hover:text-emerald-350 font-mono flex items-center gap-1 bg-zinc-850 hover:bg-zinc-800 px-2.5 py-0.5 rounded-md cursor-pointer transition-colors border border-zinc-700/50">
                                  <Upload className="w-3 h-3" />
                                  <span>{locale === 'zh' ? '上传本地图片' : 'Upload Image'}</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                          if (event.target?.result) {
                                            handleUpdateWorkField(selectedWork.id, 'imageUrl', event.target.result as string);
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                              <input
                                type="text"
                                value={selectedWork.imageUrl}
                                onChange={(e) => handleUpdateWorkField(selectedWork.id, 'imageUrl', e.target.value)}
                                className="w-full p-2 rounded border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-300 focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                          </div>

                          {/* Category and sizes */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '作品尺寸分类' : 'Category'}</label>
                              <select
                                value={selectedWork.category}
                                onChange={(e) => handleUpdateWorkField(selectedWork.id, 'category', e.target.value)}
                                className="w-full p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500 text-zinc-300"
                              >
                                <option value="render3d">{locale === 'zh' ? '3D渲染 (render3d)' : '3D Rendering (render3d)'}</option>
                                <option value="illustration">{locale === 'zh' ? '插画 (illustration)' : 'Illustration (illustration)'}</option>
                                <option value="detail">{locale === 'zh' ? '详情页 (detail)' : 'Detail Page (detail)'}</option>
                                <option value="newmedia">{locale === 'zh' ? '新媒体 (newmedia)' : 'New Media (newmedia)'}</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '原始物理分辨率' : 'Dimensions'}</label>
                              <input
                                type="text"
                                value={selectedWork.dimensions}
                                onChange={(e) => handleUpdateWorkField(selectedWork.id, 'dimensions', e.target.value)}
                                className="w-full p-2 rounded border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-300 focus:outline-none focus:border-emerald-500"
                                placeholder="e.g. 1200 x 1600 px"
                              />
                            </div>
                          </div>

                          {/* Titles */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '作品中文名称 / 给图片命名' : 'Title (ZH) / Name Image'}</label>
                              <input
                                type="text"
                                value={selectedWork.title.zh}
                                onChange={(e) => handleUpdateWorkLocaleField(selectedWork.id, 'title', 'zh', e.target.value)}
                                className="w-full p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500 text-zinc-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '作品英文名称 / Name Image' : 'Title (EN) / Name Image'}</label>
                              <input
                                type="text"
                                value={selectedWork.title.en}
                                onChange={(e) => handleUpdateWorkLocaleField(selectedWork.id, 'title', 'en', e.target.value)}
                                className="w-full p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500 text-zinc-300"
                              />
                            </div>
                          </div>

                          {/* Description */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '中文创意介绍' : 'Concept Description (ZH)'}</label>
                              <textarea
                                value={selectedWork.description.zh}
                                onChange={(e) => handleUpdateWorkLocaleField(selectedWork.id, 'description', 'zh', e.target.value)}
                                className="w-full h-16 p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500 text-zinc-300"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '英文创意介绍' : 'Concept Description (EN)'}</label>
                              <textarea
                                value={selectedWork.description.en}
                                onChange={(e) => handleUpdateWorkLocaleField(selectedWork.id, 'description', 'en', e.target.value)}
                                className="w-full h-16 p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500 text-zinc-300"
                              />
                            </div>
                          </div>



                          {/* Tools tags */}
                          <div>
                            <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '使用的工具（逗号隔开）' : 'Tools Chain (split by comma)'}</label>
                            <input
                              type="text"
                              value={selectedWork.toolsUsed.join(', ')}
                              onChange={(e) => handleUpdateWorkField(selectedWork.id, 'toolsUsed', e.target.value.split(',').map(s => s.trim()))}
                              className="w-full p-2 rounded border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-300 focus:outline-none focus:border-emerald-500"
                              placeholder="Midjourney v6, Photoshop CC"
                            />
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-center py-24 text-zinc-500 text-xs">
                      {locale === 'zh' ? '👈 请在左侧列表中选择作品，或者新建作品进行编辑。' : '👈 Select an artwork from list to start configuring.'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS STACK */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fade-in" id="editor-tab-skills">
              <div className="border-b border-zinc-800 pb-2">
                <h3 className="text-sm font-bold text-white">{locale === 'zh' ? '生成式技术栈微调' : 'Tech stack customizer'}</h3>
                <p className="text-[11px] text-zinc-400">{locale === 'zh' ? '精细控制每一项设计工具与算法模块的熟练度数值、核心说明' : 'Adjust mastery levels and detailed descriptions.'}</p>
              </div>

              <div className="space-y-4">
                {editedSkills.map((skill, index) => (
                  <div key={skill.name} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-3">
                      <span className="text-xs uppercase font-mono text-emerald-500 tracking-wider">[{skill.category}]</span>
                      <p className="text-sm font-bold text-white mt-1">{skill.name}</p>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-[10px] text-zinc-400 mb-1">{locale === 'zh' ? '熟练度' : 'Proficiency'} ({skill.proficiency}%)</label>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={skill.proficiency}
                        onChange={(e) => handleUpdateSkillProficiency(index, parseInt(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-[10px] text-zinc-400 mb-1">{locale === 'zh' ? '中文描述' : 'Description (ZH)'}</label>
                      <textarea
                        value={skill.description.zh}
                        onChange={(e) => handleUpdateSkillLocaleDesc(index, 'zh', e.target.value)}
                        className="w-full h-12 p-1 border border-zinc-800 bg-zinc-950 rounded text-[11px] focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-[10px] text-zinc-400 mb-1">{locale === 'zh' ? '英文描述' : 'Description (EN)'}</label>
                      <textarea
                        value={skill.description.en}
                        onChange={(e) => handleUpdateSkillLocaleDesc(index, 'en', e.target.value)}
                        className="w-full h-12 p-1 border border-zinc-800 bg-zinc-950 rounded text-[11px] focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EXPERIENCES TIMELINE */}
          {activeTab === 'experiences' && (
            <div className="space-y-6 animate-fade-in" id="editor-tab-exp">
              <div className="border-b border-zinc-800 pb-2">
                <h3 className="text-sm font-bold text-white">{locale === 'zh' ? '履历与项目重大成果管理' : 'Career timeline editor'}</h3>
                <p className="text-[11px] text-zinc-400">{locale === 'zh' ? '调整职业阶段、履职企业、核心职责及降本增效指标 highlights' : 'Re-shape history highlights and job duties.'}</p>
              </div>

              <div className="space-y-8">
                {editedExperiences.map((exp, expIdx) => (
                  <div key={exp.id} className="p-5 border border-zinc-800 rounded-2xl bg-zinc-900/10 space-y-4">
                    {/* Meta company period */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '就职时间段' : 'Work Period'}</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => handleUpdateExpPeriod(exp.id, e.target.value)}
                          className="w-full p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '就职企业 (中/英)' : 'Company Name (ZH/EN)'}</label>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={exp.company.zh}
                            onChange={(e) => handleUpdateExpLocale(exp.id, 'company', 'zh', e.target.value)}
                            className="w-1/2 p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500"
                            placeholder="公司"
                          />
                          <input
                            type="text"
                            value={exp.company.en}
                            onChange={(e) => handleUpdateExpLocale(exp.id, 'company', 'en', e.target.value)}
                            className="w-1/2 p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500"
                            placeholder="Company"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '担任职位 (中/英)' : 'Role Title (ZH/EN)'}</label>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={exp.role.zh}
                            onChange={(e) => handleUpdateExpLocale(exp.id, 'role', 'zh', e.target.value)}
                            className="w-1/2 p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500"
                            placeholder="职位"
                          />
                          <input
                            type="text"
                            value={exp.role.en}
                            onChange={(e) => handleUpdateExpLocale(exp.id, 'role', 'en', e.target.value)}
                            className="w-1/2 p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500"
                            placeholder="Role"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Duty details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '中文工作描述' : 'Duties Description (ZH)'}</label>
                        <textarea
                          value={exp.description.zh}
                          onChange={(e) => handleUpdateExpLocale(exp.id, 'description', 'zh', e.target.value)}
                          className="w-full h-16 p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-400 mb-1">{locale === 'zh' ? '英文工作描述' : 'Duties Description (EN)'}</label>
                        <textarea
                          value={exp.description.en}
                          onChange={(e) => handleUpdateExpLocale(exp.id, 'description', 'en', e.target.value)}
                          className="w-full h-16 p-2 rounded border border-zinc-800 bg-zinc-950 text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* KPI Highlights List */}
                    <div className="border-t border-zinc-800/60 pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs text-zinc-400 font-bold uppercase tracking-wider">{locale === 'zh' ? '项目里程碑 & 降本提速亮点 (Bilingual)' : 'Milestones & Accomplishments'}</label>
                        <button
                          onClick={() => handleAddExpHighlight(exp.id)}
                          className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{locale === 'zh' ? '新增亮点' : 'Add KPI'}</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {exp.highlights.zh.map((_, hIdx) => (
                          <div key={hIdx} className="flex gap-2 items-start">
                            <span className="text-zinc-500 font-mono text-xs mt-2">#{hIdx + 1}</span>
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={exp.highlights.zh[hIdx] || ''}
                                onChange={(e) => handleUpdateExpHighlight(exp.id, hIdx, 'zh', e.target.value)}
                                className="p-1.5 rounded border border-zinc-800 bg-zinc-950 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500"
                                placeholder="中文指标"
                              />
                              <input
                                type="text"
                                value={exp.highlights.en[hIdx] || ''}
                                onChange={(e) => handleUpdateExpHighlight(exp.id, hIdx, 'en', e.target.value)}
                                className="p-1.5 rounded border border-zinc-800 bg-zinc-950 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500"
                                placeholder="English KPI"
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveExpHighlight(exp.id, hIdx)}
                              className="p-2 text-red-500 hover:bg-zinc-800 rounded cursor-pointer mt-0.5"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
