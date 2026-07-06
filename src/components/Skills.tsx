/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Locale } from '../types';

interface SkillsProps {
  locale: Locale;
}

export const Skills: React.FC<SkillsProps> = ({ locale }) => {
  const [activeTool, setActiveTool] = React.useState<string | null>(null);

  const coreTools = [
    {
      id: 'aigc',
      shortName: 'AIGC',
      fullName: 'Generative AI',
      glowColor: 'rgba(236, 72, 153, 0.5)',
      borderColor: 'border-pink-500/80',
      textColor: 'text-pink-400',
      bgGlow: 'shadow-[0_0_20px_rgba(236,72,153,0.15)] hover:shadow-[0_0_35px_rgba(236,72,153,0.5)]',
      gradient: 'from-pink-950 via-zinc-900 to-black',
      percent: 92,
      desc: {
        zh: '精通 Midjourney 提示词工程、Stable Diffusion 局部重绘与 ControlNet 精确控图、Luma/Runway 视频生成及主流 AI 工具工作流。',
        en: 'Expert in Midjourney prompt engineering, Stable Diffusion with ControlNet, Luma/Runway dynamic video generation, and mainstream AI workflow orchestration.'
      }
    },
    {
      id: 'ps',
      shortName: 'PS',
      fullName: 'Photoshop',
      glowColor: 'rgba(0, 200, 255, 0.5)',
      borderColor: 'border-sky-500/80',
      textColor: 'text-sky-400',
      bgGlow: 'shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:shadow-[0_0_35px_rgba(14,165,233,0.5)]',
      gradient: 'from-sky-950 via-zinc-900 to-black',
      percent: 95,
      desc: {
        zh: '精通商业级高阶图像处理、修图润饰、多层创意排版、AI 创成式扩图与后期分层精修。',
        en: 'Expert in high-end commercial retouching, creative compositing, and AI Generative Fill workflows.'
      }
    },
    {
      id: 'ai',
      shortName: 'AI',
      fullName: 'Illustrator',
      glowColor: 'rgba(245, 158, 11, 0.5)',
      borderColor: 'border-amber-500/80',
      textColor: 'text-amber-500',
      bgGlow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)]',
      gradient: 'from-amber-950 via-zinc-900 to-black',
      percent: 90,
      desc: {
        zh: '精通矢量图形插画、品牌VI视觉系统定制、高精度海报排版以及全矢量包装创意输出。',
        en: 'Master of vector illustration, brand identity blueprints, typography, and print layouts.'
      }
    },
    {
      id: 'c4d',
      shortName: 'C4D',
      fullName: 'CINEMA 4D',
      glowColor: 'rgba(168, 85, 247, 0.5)',
      borderColor: 'border-purple-500/80',
      textColor: 'text-purple-400',
      bgGlow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]',
      gradient: 'from-purple-950 via-zinc-900 to-black',
      percent: 88,
      desc: {
        zh: '熟练掌握三维概念建模、Redshift 物理写实渲染及复杂动画动力学，为 AIGC 确定几何基底。',
        en: 'Proficient in conceptual 3D modeling, photorealistic Redshift renders, and physical dynamics.'
      }
    },
    {
      id: '3dmax',
      shortName: '3D MAX',
      fullName: 'Autodesk 3ds Max',
      glowColor: 'rgba(20, 184, 166, 0.5)',
      borderColor: 'border-teal-500/80',
      textColor: 'text-teal-400',
      bgGlow: 'shadow-[0_0_20px_rgba(20,184,166,0.15)] hover:shadow-[0_0_35px_rgba(20,184,166,0.5)]',
      gradient: 'from-teal-950 via-zinc-900 to-black',
      percent: 85,
      desc: {
        zh: '擅长商业电商渲染、室内场景空间布局与材质灯光表现，呈现极致的三维物理真实度。',
        en: 'Experienced in ecommerce product renderings, scene layouts, and high-fidelity lighting setups.'
      }
    }
  ];

  return (
    <section id="skills" className="py-20 md:py-24 bg-zinc-950 text-zinc-50 transition-colors duration-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
         
         {/* Section Header with top-alignment and consistent spacing */}
         <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-start justify-between gap-8" id="skills-header">
           <div className="max-w-xl text-center md:text-left">
             <h2 
               className="font-podium text-2xl sm:text-3xl text-white tracking-widest mb-3 uppercase"
               style={{ color: '#ffffff' }}
             >
               {locale === 'zh' ? '01 // 核心能力' : '01 // OFFERINGS'}
             </h2>
            <p className="font-podium text-3xl sm:text-4xl md:text-5xl text-zinc-100 uppercase tracking-wide leading-tight mt-4">
              {locale === 'zh' ? (
                <>
                  全流程生成式 AI <br />
                  与专业级视觉创意工具。
                </>
              ) : (
                <>
                  Pioneering generative toolkits <br />
                  fused with high-fidelity design.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Professional Tools Showcase - Styled directly after the reference resume image */}
        <div className="mb-20 p-8 md:p-12 rounded-[2rem] border border-zinc-800/80 bg-gradient-to-b from-zinc-900/10 via-zinc-950 to-zinc-950 shadow-2xl relative overflow-hidden" id="core-tools-showcase">
          {/* Subtle top edge lighting */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-80" />
          
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase block mb-2">
              {locale === 'zh' ? '// 掌握专业技能 // MASTERED TOOLS' : '// MASTERED TOOLS'}
            </span>
            <h3 className="text-xl md:text-2xl font-light text-zinc-50 tracking-tight">
              {locale === 'zh' ? '生成式 AI 与专业级视觉创意工具' : 'Generative AI & Professional Creative Suite'}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 max-w-5xl mx-auto justify-center items-center">
            {coreTools.map((tool) => {
              const isSelected = activeTool === tool.id;
              return (
                <div 
                  key={tool.id}
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                  onMouseEnter={() => setActiveTool(tool.id)}
                  onMouseLeave={() => setActiveTool(null)}
                  id={`core-tool-badge-${tool.id}`}
                >
                  {/* Circle Badge - Mirrors the reference resume image perfectly */}
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center relative transition-all duration-500 ${tool.bgGlow} border ${tool.borderColor} bg-gradient-to-b ${tool.gradient} relative z-10 group-hover:scale-105 active:scale-98`}>
                    
                    {/* Inner core container */}
                    <div className="absolute inset-[3px] rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-900 z-20 overflow-hidden">
                      {/* Interactive glow backing */}
                      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black z-10 animate-fade" />
                      <span className={`text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight font-sans relative z-20 transition-all duration-300 ${tool.textColor} group-hover:brightness-110 text-center whitespace-nowrap`}>
                        {tool.shortName}
                      </span>
                    </div>

                    {/* Outer glowing pulsing aura */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ boxShadow: `0 0 20px ${tool.glowColor}` }}
                    />
                  </div>

                  {/* Tool Name Label */}
                  <span className="mt-4 text-xs md:text-sm font-medium text-zinc-400 group-hover:text-zinc-100 transition-colors tracking-wide text-center">
                    {tool.fullName}
                  </span>

                  {/* Interactive Status Indicator Line */}
                  <div className={`h-[2px] bg-zinc-400 rounded-full transition-all duration-300 mt-2 ${
                    isSelected ? 'w-8 bg-zinc-100' : 'w-0 group-hover:w-4'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
