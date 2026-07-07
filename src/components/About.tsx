/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Compass, Sparkles, BookOpen } from 'lucide-react';
import { DesignerProfile, Locale } from '../types';

interface AboutProps {
  profile: DesignerProfile;
  locale: Locale;
}

export const About: React.FC<AboutProps> = ({ profile, locale }) => {
  const stats = [
    {
      value: `${profile.experienceYears}+`,
      label: { zh: '设计从业年限', en: 'Years Design Experience' },
    },
    {
      value: '20+',
      label: { zh: '服务品牌项目', en: 'Brands Collaborated' },
    },
    {
      value: '10M+',
      label: { zh: '全网商业曝光', en: 'Social Impressions' },
    },
    {
      value: '98%',
      label: { zh: '效率提速指标', en: 'Efficiency Gains' },
    },
  ];

  const philosophyPillars = [
    {
      icon: <Sparkles className="w-5 h-5 text-zinc-50" />,
      title: { zh: '意图传达 (Precision)', en: 'Precision of Intent' },
      text: {
        zh: '设计不仅是技法，更是观念。我们利用精确的提示词将抽象的意象翻译为高精度的视觉现实，AI 成为设计意图的扩音器。',
        en: 'Design is about concept first. We translate abstract mental models into ultra-fidelity visual realities with surgical prompting.',
      },
    },
    {
      icon: <Compass className="w-5 h-5 text-zinc-50" />,
      title: { zh: '融合工作流 (Hybrid Pipeline)', en: 'Hybrid Workflow' },
      text: {
        zh: '拒绝纯粹的“盲盒生成”。在 Cinema 4D 或手绘确定严密骨架后，通过 ControlNet 与重绘赋能，融三维结构与算法效率于一体。',
        en: "Reject pure 'lottery prompting'. We build ironclad geometry in C4D first, then feed ControlNet to merge structure with AI agility.",
      },
    },
    {
      icon: <BookOpen className="w-5 h-5 text-zinc-50" />,
      title: { zh: '极简与留白 (Absolute Silence)', en: 'Aesthetic Silence' },
      text: {
        zh: '去除浮华的多余渲染，以高级的黑白灰、精雕细琢的光影对比和无尽的白空间，给观者留下呼吸和思索的心灵尺度。',
        en: 'Shedding superfluous rendering, we embrace high-end monochromes, calculated lighting contrasts, and negative space that breathes.',
      },
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-zinc-950 transition-colors duration-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-start justify-between gap-8" id="about-header">
          <div className="max-w-2xl">
            <h2 
              className="font-podium text-2xl sm:text-3xl text-white tracking-widest mb-3 uppercase"
              style={{ color: '#ffffff' }}
            >
              {locale === 'zh' ? '01 关于我' : '01 STUDIO'}
            </h2>
            <p className="font-podium text-3xl sm:text-4xl md:text-5xl text-zinc-100 uppercase tracking-wide leading-tight mt-4">
              {locale === 'zh' ? (
                <>
                  以算法重塑美学，<br />
                  用理性创意雕琢感性秩序。
                </>
              ) : (
                <>
                  Architecting future aesthetics <br />
                  with deliberate intent.
                </>
              )}
            </p>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed text-left font-light font-inter mt-4 md:mt-12">
            {locale === 'zh' ? '设计师不应沦为画笔的奴隶，而是视觉矩阵的创意总监。在算力无限的时代，极致的审美与前瞻概念决定最终的高度。' : 'The modern designer is not a passive tool operator, but the visionary director of a digital matrix. Pure taste and conceptual depth define our boundaries.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" id="about-grid">
          {/* Left Column: Portrait & Biography */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="relative group overflow-hidden rounded-3xl bg-zinc-900 aspect-square border border-zinc-800">
              {/* Profile Image with subtle scale */}
              <img
                src={profile.avatarUrl}
                alt={profile.name[locale]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-103 group-hover:grayscale-0 transition-all duration-700 ease-out"
                id="about-avatar"
              />
              {/* Overlay Glass Panel */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                  {profile.englishName} // CREATIVE ENGINE // 2026
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2" id="about-stats">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors"
                >
                  <div className="font-sans font-light text-3xl md:text-4xl text-zinc-50 mb-1.5 tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 tracking-wide leading-snug">
                    {stat.label[locale]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative Biography & Philosophy Pillars */}
          <div className="lg:col-span-7 flex flex-col space-y-12">
            {/* Story Paragraphs */}
            <div className="space-y-6" id="about-bio-container">
              <h3 className="font-podium text-xs tracking-wider uppercase text-zinc-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-zinc-400" />
                <span>{locale === 'zh' ? '设计背景与历程' : 'Creative Odyssey'}</span>
              </h3>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-light text-pretty">
                {profile.bio[locale]}
              </p>
              
              <div className="p-6 md:p-8 rounded-3xl border border-zinc-800 bg-zinc-900/20 relative">
                {/* Visual Accent */}
                <div className="absolute -left-1.5 top-8 w-3 h-12 bg-white rounded-r-md" />
                <p className="text-sm md:text-base text-zinc-300 italic font-light leading-relaxed">
                  “ {profile.philosophy[locale]} ”
                </p>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="space-y-6" id="about-pillars">
              <h3 className="font-podium text-xs tracking-wider uppercase text-zinc-400">
                {locale === 'zh' ? '遵循的创作范式' : 'Production Principles'}
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {philosophyPillars.map((pillar, index) => (
                  <div
                    key={index}
                    className="flex gap-5 p-5 rounded-2xl hover:bg-zinc-900/20 transition-all border border-transparent hover:border-zinc-800/60"
                  >
                    <div className="flex-shrink-0 mt-0.5 p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-semibold text-zinc-100 mb-1.5">
                        {pillar.title[locale]}
                      </h4>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
                        {pillar.text[locale]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
