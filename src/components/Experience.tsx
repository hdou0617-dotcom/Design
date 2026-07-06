/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Briefcase, ChevronDown, Award } from 'lucide-react';
import { ExperienceItem, Locale } from '../types';
import BorderGlow from './BorderGlow';

interface ExperienceProps {
  experiences: ExperienceItem[];
  locale: Locale;
  darkMode: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ experiences, locale, darkMode }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(experiences[0]?.id || null);

  return (
    <section id="experience" className="py-20 md:py-24 bg-zinc-950 text-zinc-50 transition-colors duration-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header with top-alignment and no offset on right side description */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-start justify-between gap-8" id="experience-header">
          <div className="max-w-2xl">
            <h2 className="font-podium text-2xl sm:text-3xl text-white tracking-widest mb-3 uppercase">
              03 CHRONOLOGY
            </h2>
            <p className="font-podium text-3xl sm:text-4xl md:text-5xl text-zinc-100 uppercase tracking-wide leading-tight mt-4">
              {locale === 'zh' ? (
                <>
                  见证生成式创意生产力 <br />
                  在商业主战场上的效率跃升。
                </>
              ) : (
                <>
                  Fusing artificial design <br />
                  into active commercial systems.
                </>
              )}
            </p>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed text-left font-light font-inter mt-2 md:mt-12 md:pt-1">
            {locale === 'zh' ? '作为先锋创意开发者，从经典三维物理视觉渲染，到深度定制开发专属 AI 神经网络风格流，我用扎实的创意产出与商业实绩，论证视觉重塑的无限可能。' : 'As a vanguard creative developer, bridging classic 3D physical mockups with custom-trained proprietary neural style pipelines, delivering real-world commercial results and infinite design possibilities.'}
          </p>
        </div>

        {/* Minimal Timeline */}
        <div className="max-w-4xl mx-auto relative pl-6 md:pl-10 before:absolute before:left-2 before:top-4 before:bottom-4 before:w-[1px] before:bg-zinc-800" id="experience-timeline">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="relative mb-12 md:mb-16 last:mb-0 group cursor-pointer animate-fade-in"
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                id={`timeline-node-${index}`}
              >
                {/* Custom active ring on bullet */}
                <span className={`absolute -left-[22px] md:-left-[38px] top-8 w-3.5 h-3.5 rounded-full border bg-zinc-950 z-10 transition-all duration-300 ${
                  isExpanded ? 'border-zinc-50 scale-125' : 'border-zinc-800'
                }`} />
                
                {/* Node Container Card wrapped in BorderGlow for premium interactivity */}
                <BorderGlow
                  edgeSensitivity={25}
                  glowColor="30 80 80"
                  backgroundColor={isExpanded ? "#0d0d11" : "#050508"}
                  borderRadius={24}
                  glowRadius={30}
                  glowIntensity={0.8}
                  colors={['#a855f7', '#ec4899', '#3b82f6']}
                  className={`w-full text-left transition-all duration-300 border ${
                    isExpanded ? 'border-zinc-700' : 'border-zinc-900'
                  }`}
                >
                  <div className="p-6 md:p-8">
                    {/* Top Line: Meta & Company */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        {/* Period Label */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </div>
                        
                        {/* Role Heading */}
                        <h3 className="text-lg md:text-xl font-semibold text-zinc-100 tracking-tight">
                          {exp.role[locale]}
                        </h3>

                        {/* Company Sub-Heading */}
                        <div className="text-xs md:text-sm font-medium text-zinc-400 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                          <span>{exp.company[locale]}</span>
                        </div>
                      </div>

                      {/* Collapse Button */}
                      <button className="flex-shrink-0 self-start md:self-center p-1.5 rounded-full hover:bg-zinc-850 text-zinc-500 hover:text-zinc-300 transition-colors">
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-zinc-50' : ''}`} />
                      </button>
                    </div>

                    {/* Collapsible Details */}
                    <div className={`space-y-5 overflow-hidden transition-all duration-500 ${
                      isExpanded ? 'max-h-[800px] opacity-100 mt-5 pt-4 border-t border-zinc-850' : 'max-h-0 opacity-0 pointer-events-none'
                     }`}>
                      {/* Role Description */}
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light text-pretty">
                        {exp.description[locale]}
                      </p>

                      {/* Highlights & KPI metrics */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 flex items-center gap-2">
                          <Award className="w-4 h-4 text-zinc-400" />
                          <span>{locale === 'zh' ? '核心项目产出与增效指标 // METRICS' : 'Project Outcomes & KPI // METRICS'}</span>
                        </h4>
                        <ul className="grid grid-cols-1 gap-2.5 pl-1 select-text">
                          {exp.highlights[locale].map((hl, i) => (
                            <li
                              key={i}
                              className="text-xs md:text-sm text-zinc-300 flex items-start gap-2.5 leading-relaxed font-light"
                            >
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-500 flex-shrink-0" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
