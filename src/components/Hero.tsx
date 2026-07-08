/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Crown, Award, ArrowUpRight, ChevronDown, ArrowRight } from 'lucide-react';
import { DesignerProfile, Locale } from '../types';

interface HeroProps {
  profile: DesignerProfile;
  locale: Locale;
}

export const Hero: React.FC<HeroProps> = ({ profile, locale }) => {
  const handleScrollToNext = () => {
    const next = document.getElementById('portfolio');
    if (next) {
      const offset = 90;
      const elementPosition = next.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden flex items-center justify-start bg-black"
    >
      {/* Fullscreen Looping Background Video */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '70% center' }}
      />

      {/* Organic noise overlay */}
      <div className="noise-bg" />

      {/* Modern Vignette & Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

      {/* Main Content (overlay on top) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 pt-32 pb-16 flex flex-col justify-center h-full">

        {/* 2. Display Heading h1 */}
        <h1 
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-white mb-6 uppercase"
          style={{ color: '#ffffff' }}
          id="hero-vanguard-title"
        >
          Design.<br />
          Disrupt.<br />
          Craft.
        </h1>

        {/* 3. Subtext Paragraph */}
        <p 
          className="text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mb-8 sm:mb-10 font-light"
          id="hero-vanguard-subtext"
        >
          {locale === 'zh' ? (
            "在创意与不懈的美学追求中，定义独属于个人的视觉叙事与设计边界。"
          ) : (
            "Defining a personal visual narrative and design boundary through creative focus and a relentless pursuit of beauty."
          )}
        </p>

        {/* 4. CTA Button and Stats Row wrapper */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-12">
          <button
            onClick={handleScrollToNext}
            className="rounded-lg bg-white px-6 py-3 text-sm font-medium hover:scale-105 transition-all duration-300 inline-flex items-center justify-center cursor-pointer shadow-lg shadow-white/5 hover:bg-zinc-100 self-start animate-fade-in-delay"
            id="hero-cta-btn"
          >
            <span className="flex items-center gap-2 text-zinc-950 font-semibold">
              <span>{locale === 'zh' ? '探索作品' : 'Explore Work'}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          {/* Vertical divider on desktop */}
          <div className="hidden sm:block h-10 w-[1px] bg-white/10" />

          {/* Stats Row */}
          <div 
            className="flex items-center gap-8"
            id="hero-stats-row"
          >
            {/* Stat 1: cases */}
            <div className="flex flex-col">
              <span className="font-sans text-white text-xl sm:text-2xl font-extrabold tracking-tight">
                100+
              </span>
              <span className="text-white/40 text-[9px] font-mono tracking-widest uppercase mt-1">
                {locale === 'zh' ? '先锋创意' : 'Cases'}
              </span>
            </div>

            <div className="h-6 w-[1px] bg-white/10" />

            {/* Stat 2: Retention */}
            <div className="flex flex-col">
              <span className="font-sans text-white text-xl sm:text-2xl font-extrabold tracking-tight">
                95%
              </span>
              <span className="text-white/40 text-[9px] font-mono tracking-widest uppercase mt-1">
                {locale === 'zh' ? '高续约率' : 'Retention'}
              </span>
            </div>

            <div className="h-6 w-[1px] bg-white/10" />

            {/* Stat 3: Exp */}
            <div className="flex flex-col">
              <span className="font-sans text-white text-xl sm:text-2xl font-extrabold tracking-tight">
                7+
              </span>
              <span className="text-white/40 text-[9px] font-mono tracking-widest uppercase mt-1">
                {locale === 'zh' ? '经验7+' : 'Experience'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <button
        onClick={handleScrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white/80 transition-colors z-20 flex flex-col items-center gap-1 cursor-pointer animate-fade-in-delay"
        id="hero-scroll-btn"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] mb-1">
          {locale === 'zh' ? '向下探索' : 'EXPLORE'}
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};
