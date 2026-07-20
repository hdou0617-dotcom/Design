/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, Globe, Sun, Moon, X } from 'lucide-react';
import { Locale } from '../types';

interface NavbarProps {
  locale: Locale;
  setLocale: (l: Locale) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  locale,
  setLocale,
  darkMode,
  setDarkMode,
  activeSection,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  // 4 Nav links as requested
  const navItems = [
    { id: 'skills', label: { zh: '核心能力', en: 'Offerings' } },
    { id: 'portfolio', label: { zh: '创意作品', en: 'Creations' } },
    { id: 'experience', label: { zh: '个人履历', en: 'Chronology' } },
    { id: 'contact', label: { zh: '联系我', en: 'Inquire' } },
  ];

  const handleScrollTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset calculated based on header height
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* VANGUARD Sleek Horizontal Navbar */}
      <nav 
        className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/60 backdrop-blur-xl border-b border-white/10 transition-all duration-300 shadow-lg"
        id="vanguard-navbar"
      >
        <div className="px-6 sm:px-10 lg:px-16 py-5 lg:py-7 flex items-center justify-between">
          
          {/* Left: Brand name PORTFOLIO */}
          <button
            onClick={() => handleScrollTo('hero')}
            className="font-podium text-white font-bold uppercase text-2xl sm:text-3xl tracking-wider hover:opacity-85 transition-opacity cursor-pointer whitespace-nowrap flex-shrink-0"
            id="vanguard-brand-logo"
          >
            PORTFOLIO
          </button>

          {/* Center: Hidden below md, 4 nav links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 flex-shrink-0" id="vanguard-desktop-nav">
            {navItems.map((item) => {
              const isSectionActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`relative font-inter text-xs tracking-widest uppercase transition-all duration-300 hover:text-white cursor-pointer whitespace-nowrap pb-1.5 ${
                    isSectionActive ? 'text-white font-bold' : 'text-white/45 font-normal'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.label[locale]}
                  {isSectionActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)] animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Actions and GET IN TOUCH */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0" id="vanguard-navbar-actions">
            
            {/* Elegant language picker */}
            <button
              onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
              className="p-2 rounded-full border border-white/10 cursor-pointer hover:bg-white/10 text-white/70 hover:text-white transition-colors text-[10px] font-mono tracking-widest flex items-center gap-1"
              title={locale === 'zh' ? 'Switch to English' : '切换至中文'}
              id="vanguard-btn-lang"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{locale === 'zh' ? 'EN' : 'ZH'}</span>
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="hidden md:flex items-center justify-center relative overflow-hidden px-5 py-2.5 rounded-full border border-white bg-white hover:bg-transparent font-medium text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] group"
              id="vanguard-btn-get-touch"
            >
              <span className="relative z-10 flex items-center gap-1.5 text-zinc-950 group-hover:text-white transition-colors duration-300">
                <span className="font-semibold">{locale === 'zh' ? '联系我' : 'GET IN TOUCH'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            {/* Hamburger button (visible below md) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex md:hidden flex-col justify-between h-3.5 w-6 cursor-pointer space-y-1.5 focus:outline-none"
              id="vanguard-hamburger"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-0.5 bg-white transition-all" />
              <div className="w-6 h-0.5 bg-white transition-all" />
              <div className="w-4 h-0.5 bg-white transition-all self-end" />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay (below md only) */}
      <div 
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
        id="vanguard-mobile-menu"
      >
        {/* Header Row */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/5">
          <span className="font-podium text-white font-bold uppercase text-2xl tracking-wider">
            PORTFOLIO
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 text-white hover:text-white/80 cursor-pointer"
            id="vanguard-close-menu"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Centered Vertically Nav Links */}
        <div className="flex flex-col items-center justify-center space-y-8 px-6 text-center">
          {navItems.map((item, i) => {
            const isSectionActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`font-podium text-4xl sm:text-5xl uppercase tracking-wider transition-all duration-300 transform cursor-pointer ${
                  isSectionActive ? 'text-white scale-105 font-bold' : 'text-white/40 hover:text-white/80'
                }`}
                style={{
                  transitionDelay: menuOpen ? `${i * 80 + 100}ms` : '0ms',
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: menuOpen ? 1 : 0,
                  transitionProperty: 'transform, opacity',
                }}
                id={`vanguard-mobile-link-${item.id}`}
              >
                {item.label[locale]}
              </button>
            );
          })}

          {/* GET IN TOUCH Bordered Button with Staggered Animation */}
          <button
            onClick={() => handleScrollTo('contact')}
            className="flex items-center justify-center gap-2 rounded-full border border-white bg-white hover:bg-transparent px-8 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 transform mt-4 cursor-pointer group"
            style={{
              transitionDelay: menuOpen ? `${navItems.length * 80 + 100}ms` : '0ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
              transitionProperty: 'transform, opacity',
            }}
            id="vanguard-mobile-get-touch"
          >
            <span className="flex items-center gap-1.5 text-zinc-950 group-hover:text-white transition-colors duration-300">
              <span>{locale === 'zh' ? '联系我' : 'GET IN TOUCH'}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

        {/* Footer info in overlay */}
        <div className="px-6 py-8 text-center border-t border-white/5 flex flex-col items-center gap-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
            © {new Date().getFullYear()} PORTFOLIO DESIGN COLLECTIVE
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setLocale(locale === 'zh' ? 'en' : 'zh');
                setMenuOpen(false);
              }}
              className="text-xs font-mono uppercase tracking-widest text-white/60 hover:text-white"
            >
              {locale === 'zh' ? 'ENGLISH (EN)' : '中文 (ZH)'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
