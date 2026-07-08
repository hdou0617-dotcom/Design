/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Portfolio } from './components/Portfolio';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { AdminEditor } from './components/AdminEditor';
import { DesignerProfile, PortfolioWork, SkillItem, ExperienceItem, Locale } from './types';
import { initialProfile, initialWorks, initialSkills, initialExperiences } from './data';
import { Settings, Globe, Heart } from 'lucide-react';

const migrateWorksToLocalPublic = (parsed: PortfolioWork[]): PortfolioWork[] => {
  const PATH_MAPPING: Record<string, string> = {
    // 3D Rendering
    "/3d_rendering/xiazhui.jpg": "/3d_rendering/下坠.jpg",
    "/3d_rendering/nanjiangjiu.jpg": "/3d_rendering/南匠酒.jpg",
    "/3d_rendering/chufangxidiji.jpg": "/3d_rendering/厨房洗地机.jpg",
    "/3d_rendering/naiping.jpg": "/3d_rendering/奶瓶.jpg",
    "/3d_rendering/saodiji.jpg": "/3d_rendering/扫地机.jpg",
    "/3d_rendering/hufataozhuang.jpg": "/3d_rendering/护发套装.jpg",
    "/3d_rendering/hufutaozhuang1.jpg": "/3d_rendering/护肤套装1.jpg",
    "/3d_rendering/hufutaozhuang2.jpg": "/3d_rendering/护肤套装2.jpg",
    "/3d_rendering/huoguobaozhuang.jpg": "/3d_rendering/火锅包装.jpg",
    "/3d_rendering/yashua.jpg": "/3d_rendering/牙刷.jpg",
    "/3d_rendering/kongqijinghuaqi.jpg": "/3d_rendering/空气净化器.jpg",
    "/3d_rendering/jinghuaye2.jpg": "/3d_rendering/精华液2.jpg",
    "/3d_rendering/jinghuaye.jpg": "/3d_rendering/精华液.jpg",
    "/3d_rendering/zhijin.jpg": "/3d_rendering/纸巾.jpg",
    "/3d_rendering/zhijin2.jpg": "/3d_rendering/纸巾 (2).jpg",
    "/3d_rendering/jiangjiu.jpg": "/3d_rendering/酱酒.jpg",
    "/3d_rendering/chushiqi.jpg": "/3d_rendering/除湿器.jpg",
    "/3d_rendering/xiangtilu.jpg": "/3d_rendering/香体露.jpg",

    // Details Page (User uploaded in "Details page")
    "/details_page/gelishuang.jpg": "/Details page/隔离霜.jpg",
    "/details_page/kouhong.jpg": "/Details page/口红.jpg",
    "/details_page/huanfuye.jpg": "/Details page/焕肤液.jpg",
    "/details_page/xifamuyu.jpg": "/Details page/洗发沐浴.jpg",
    "/details_page/xiaodugui.jpg": "/Details page/消毒柜.jpg",
    "/details_page/jiaju.jpg": "/Details page/家居.jpg",
    "/details_page/tangrantuiche.jpg": "/Details page/烫染推车.jpg",
    "/details_page/nuanzhuo.jpg": "/Details page/暖桌.jpg",
    "/details_page/wangzhan2.jpg": "/Details page/网站2.jpg",

    // Illustration (User uploaded in "Illustration")
    "/illustration/chahua1.jpg": "/Illustration/插画1.jpg",
    "/illustration/chahua2.jpg": "/Illustration/插画2.jpg",
    "/illustration/chahua3.jpg": "/Illustration/插画3.jpg",
    "/illustration/chahua4.jpg": "/Illustration/插画4.jpg",
    "/illustration/chahua5.jpg": "/Illustration/插画5.jpg",
    "/illustration/chahua6.jpg": "/Illustration/插画6.jpg",

    // New Media (User uploaded under "new_media" with Chinese names)
    "/new_media/banner1.jpg": "/New media/banner1.jpg",
    "/new_media/banner2.jpg": "/New media/banner2.jpg",
    "/new_media/banner3.jpg": "/New media/banner3.jpg",
    "/new_media/banner4.jpg": "/New media/banner4.jpg",
    "/new_media/beijing1.jpg": "/New media/背景1.jpg",
    "/new_media/beijing2.jpg": "/New media/背景2.jpg",
    "/new_media/tiepian1.jpg": "/New media/贴片1.jpg",
    "/new_media/tiepian2.jpg": "/New media/贴片2.jpg",
    "/new_media/tiepian3.jpg": "/New media/贴片3.jpg",
    "/new_media/tiepian4.jpg": "/New media/贴片4.jpg",
    "/new_media/tiepian5.jpg": "/New media/贴片5.jpg"
  };

  const FILENAME_MAPPING: Record<string, string> = {
    "下坠.jpg": "/3d_rendering/下坠.jpg",
    "下坠20136 拷贝.png": "/3d_rendering/下坠.jpg",
    "xiazhui.jpg": "/3d_rendering/下坠.jpg",
    "南匠酒.jpg": "/3d_rendering/南匠酒.jpg",
    "nanjiangjiu.jpg": "/3d_rendering/南匠酒.jpg",
    "厨房洗地机.jpg": "/3d_rendering/厨房洗地机.jpg",
    "厨房洗地机.png": "/3d_rendering/厨房洗地机.jpg",
    "chufangxidiji.jpg": "/3d_rendering/厨房洗地机.jpg",
    "奶瓶.jpg": "/3d_rendering/奶瓶.jpg",
    "naiping.jpg": "/3d_rendering/奶瓶.jpg",
    "扫地机.jpg": "/3d_rendering/扫地机.jpg",
    "saodiji.jpg": "/3d_rendering/扫地机.jpg",
    "护发套装.jpg": "/3d_rendering/护发套装.jpg",
    "hufataozhuang.jpg": "/3d_rendering/护发套装.jpg",
    "护肤套装1.jpg": "/3d_rendering/护肤套装1.jpg",
    "护肤套装1.png": "/3d_rendering/护肤套装1.jpg",
    "hufutaozhuang1.jpg": "/3d_rendering/护肤套装1.jpg",
    "护肤套装2.jpg": "/3d_rendering/护肤套装2.jpg",
    "护肤套装2.png": "/3d_rendering/护肤套装2.jpg",
    "hufutaozhuang2.jpg": "/3d_rendering/护肤套装2.jpg",
    "火锅包装.jpg": "/3d_rendering/火锅包装.jpg",
    "huoguobaozhuang.jpg": "/3d_rendering/火锅包装.jpg",
    "牙刷.jpg": "/3d_rendering/牙刷.jpg",
    "yashua.jpg": "/3d_rendering/牙刷.jpg",
    "空气净化器.jpg": "/3d_rendering/空气净化器.jpg",
    "kongqijinghuaqi.jpg": "/3d_rendering/空气净化器.jpg",
    "精华液2.jpg": "/3d_rendering/精华液2.jpg",
    "jinghuaye2.jpg": "/3d_rendering/精华液2.jpg",
    "精华液.jpg": "/3d_rendering/精华液.jpg",
    "精华液.png": "/3d_rendering/精华液.jpg",
    "jinghuaye.jpg": "/3d_rendering/精华液.jpg",
    "纸巾.jpg": "/3d_rendering/纸巾.jpg",
    "zhijin.jpg": "/3d_rendering/纸巾.jpg",
    "纸巾 (2).jpg": "/3d_rendering/纸巾 (2).jpg",
    "zhijin2.jpg": "/3d_rendering/纸巾 (2).jpg",
    "酱酒.jpg": "/3d_rendering/酱酒.jpg",
    "jiangjiu.jpg": "/3d_rendering/酱酒.jpg",
    "除湿器.jpg": "/3d_rendering/除湿器.jpg",
    "chushiqi.jpg": "/3d_rendering/除湿器.jpg",
    "香体露.jpg": "/3d_rendering/香体露.jpg",
    "香体露.png": "/3d_rendering/香体露.jpg",
    "xiangtilu.jpg": "/3d_rendering/香体露.jpg",

    "隔离霜.jpg": "/Details page/隔离霜.jpg",
    "gelishuang.jpg": "/Details page/隔离霜.jpg",
    "口红.jpg": "/Details page/口红.jpg",
    "kouhong.jpg": "/Details page/口红.jpg",
    "焕肤液.jpg": "/Details page/焕肤液.jpg",
    "huanfuye.jpg": "/Details page/焕肤液.jpg",
    "洗发沐浴.jpg": "/Details page/洗发沐浴.jpg",
    "xifamuyu.jpg": "/Details page/洗发沐浴.jpg",
    "消毒柜.jpg": "/Details page/消毒柜.jpg",
    "xiaodugui.jpg": "/Details page/消毒柜.jpg",
    "家居.jpg": "/Details page/家居.jpg",
    "jiaju.jpg": "/Details page/家居.jpg",
    "烫染推车.jpg": "/Details page/烫染推车.jpg",
    "tangrantuiche.jpg": "/Details page/烫染推车.jpg",
    "暖桌.jpg": "/Details page/暖桌.jpg",
    "nuanzhuo.jpg": "/Details page/暖桌.jpg",
    "网站2.jpg": "/Details page/网站2.jpg",
    "wangzhan2.jpg": "/Details page/网站2.jpg",

    "插画1.jpg": "/Illustration/插画1.jpg",
    "chahua1.jpg": "/Illustration/插画1.jpg",
    "插画2.jpg": "/Illustration/插画2.jpg",
    "chahua2.jpg": "/Illustration/插画2.jpg",
    "插画3.jpg": "/Illustration/插画3.jpg",
    "chahua3.jpg": "/Illustration/插画3.jpg",
    "插画4.jpg": "/Illustration/插画4.jpg",
    "chahua4.jpg": "/Illustration/插画4.jpg",
    "插画5.jpg": "/Illustration/插画5.jpg",
    "chahua5.jpg": "/Illustration/插画5.jpg",
    "插画6.jpg": "/Illustration/插画6.jpg",
    "chahua6.jpg": "/Illustration/插画6.jpg",

    "背景1.jpg": "/New media/背景1.jpg",
    "beijing1.jpg": "/New media/背景1.jpg",
    "背景2.jpg": "/New media/背景2.jpg",
    "beijing2.jpg": "/New media/背景2.jpg",
    "贴片1.jpg": "/New media/贴片1.jpg",
    "tiepian1.jpg": "/New media/贴片1.jpg",
    "贴片2.jpg": "/New media/贴片2.jpg",
    "tiepian2.jpg": "/New media/贴片2.jpg",
    "贴片3.jpg": "/New media/贴片3.jpg",
    "tiepian3.jpg": "/New media/贴片3.jpg",
    "贴片4.jpg": "/New media/贴片4.jpg",
    "tiepian4.jpg": "/New media/贴片4.jpg",
    "贴片5.jpg": "/New media/贴片5.jpg",
    "tiepian5.jpg": "/New media/贴片5.jpg"
  };

  return parsed.map(w => {
    if (!w.imageUrl) return w;

    let targetUrl = w.imageUrl;

    // 1. Direct path mapping check
    if (PATH_MAPPING[targetUrl]) {
      return { ...w, imageUrl: PATH_MAPPING[targetUrl] };
    }

    // 2. Map legacy /poster/ prefix
    const cleanPath = targetUrl.startsWith('/poster/') 
      ? targetUrl.replace('/poster/', '/') 
      : (targetUrl.startsWith('/') ? targetUrl : '/' + targetUrl);

    if (PATH_MAPPING[cleanPath]) {
      return { ...w, imageUrl: PATH_MAPPING[cleanPath] };
    }

    // 3. Filename match
    const cleanFilename = targetUrl.split('/').pop() || '';
    if (FILENAME_MAPPING[cleanFilename]) {
      return { ...w, imageUrl: FILENAME_MAPPING[cleanFilename] };
    }

    return w;
  });
};

export default function App() {
  // Clear cached local storage on new builds to ensure Netlify/Cloudflare visitors see the updated content immediately
  const CURRENT_VERSION = "v1.6.0";
  try {
    const savedVersion = localStorage.getItem('dou_portfolio_app_version');
    if (savedVersion !== CURRENT_VERSION) {
      localStorage.removeItem('dou_portfolio_profile');
      localStorage.removeItem('dou_portfolio_works');
      localStorage.removeItem('dou_portfolio_skills');
      localStorage.removeItem('dou_portfolio_experiences');
      localStorage.setItem('dou_portfolio_app_version', CURRENT_VERSION);
    }
  } catch (e) {
    console.warn("Could not check app version:", e);
  }

  // 1. Language & Theme States (Always deep elegant dark mode as standard)
  const [locale, setLocale] = React.useState<Locale>(() => {
    const saved = localStorage.getItem('dou_portfolio_locale');
    return (saved === 'zh' || saved === 'en') ? saved : 'zh';
  });

  const [darkMode, setDarkMode] = React.useState<boolean>(() => {
    const saved = localStorage.getItem('dou_portfolio_dark_mode');
    return saved !== 'false'; // Default to dark mode (true)
  });

  // 2. Resume Data States
  const [profile, setProfile] = React.useState<DesignerProfile>(() => {
    const saved = localStorage.getItem('dou_portfolio_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [works, setWorks] = React.useState<PortfolioWork[]>(() => {
    const saved = localStorage.getItem('dou_portfolio_works');
    if (!saved) return initialWorks;
    try {
      const parsed = JSON.parse(saved) as PortfolioWork[];
      // If any work contains the old porcelain or greek marble sculpture images, force sync to initialWorks
      const hasOldImages = parsed.some(w => 
        w.imageUrl.includes('photo-1620641788421-7a1c342ea42e') || // old poster-1
        w.imageUrl.includes('photo-1558591710-4b4a1ae0f04d')      // old illustration-3
      );
      
      if (hasOldImages) {
        localStorage.setItem('dou_portfolio_works', JSON.stringify(initialWorks));
        return initialWorks;
      }

      // Sync all categories to use their respective initial configs and filter out any deleted ones
      let updated = false;
      const synced = parsed.map(w => {
        const initial = initialWorks.find(iw => iw.id === w.id);
        if (initial && (w.imageUrl !== initial.imageUrl || w.title.zh !== initial.title.zh || w.description.zh !== initial.description.zh)) {
          updated = true;
          return {
            ...w,
            imageUrl: initial.imageUrl,
            title: initial.title,
            description: initial.description,
            dimensions: initial.dimensions,
            ratio: initial.ratio,
            toolsUsed: initial.toolsUsed
          };
        }
        return w;
      });

      const filtered = synced.filter(w => {
        if (w.id.startsWith('render3d-') || w.id.startsWith('illustration-') || w.id.startsWith('detail-') || w.id.startsWith('newmedia-')) {
          const existsInInitial = initialWorks.some(iw => iw.id === w.id);
          if (!existsInInitial) {
            updated = true;
            return false;
          }
        }
        return true;
      });

      const migrated = migrateWorksToLocalPublic(filtered);
      if (updated || JSON.stringify(migrated) !== JSON.stringify(parsed)) {
        localStorage.setItem('dou_portfolio_works', JSON.stringify(migrated));
      }
      return migrated;
    } catch (e) {
      return initialWorks;
    }
  });

  const [skills, setSkills] = React.useState<SkillItem[]>(() => {
    const saved = localStorage.getItem('dou_portfolio_skills');
    return saved ? JSON.parse(saved) : initialSkills;
  });

  const [experiences, setExperiences] = React.useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem('dou_portfolio_experiences');
    return saved ? JSON.parse(saved) : initialExperiences;
  });

  // 3. UI states
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('hero');

  // 4. Save locale/theme changes
  React.useEffect(() => {
    localStorage.setItem('dou_portfolio_locale', locale);
    document.documentElement.lang = locale;
  }, [locale]);

  React.useEffect(() => {
    localStorage.setItem('dou_portfolio_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 5. Active section scroll tracking
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'portfolio', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 160; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 6. Server synchronization & auto-recovery of local changes
  React.useEffect(() => {
    const syncWithServer = async () => {
      try {
        const response = await fetch('/api/data');
        if (response.ok) {
          const data = await response.json();
          if (data.isCustom) {
            // Server copy is master; force sync React states and browser local storage
            const migratedWorks = migrateWorksToLocalPublic(data.works);
            setProfile(data.profile);
            setWorks(migratedWorks);
            setSkills(data.skills);
            setExperiences(data.experiences);

            try {
              localStorage.setItem('dou_portfolio_profile', JSON.stringify(data.profile));
              localStorage.setItem('dou_portfolio_works', JSON.stringify(migratedWorks));
              localStorage.setItem('dou_portfolio_skills', JSON.stringify(data.skills));
              localStorage.setItem('dou_portfolio_experiences', JSON.stringify(data.experiences));
            } catch (e) {
              console.warn("localStorage sync from server ignored:", e);
            }
          } else {
            // Server is not custom yet. Do we have local edits in browser local storage?
            const localProfile = localStorage.getItem('dou_portfolio_profile');
            const localWorks = localStorage.getItem('dou_portfolio_works');
            const localSkills = localStorage.getItem('dou_portfolio_skills');
            const localExp = localStorage.getItem('dou_portfolio_experiences');

            if (localProfile || localWorks || localSkills || localExp) {
              const profileObj = localProfile ? JSON.parse(localProfile) : initialProfile;
              const rawWorksObj = localWorks ? JSON.parse(localWorks) : initialWorks;
              const worksObj = migrateWorksToLocalPublic(rawWorksObj);
              const skillsObj = localSkills ? JSON.parse(localSkills) : initialSkills;
              const expObj = localExp ? JSON.parse(localExp) : initialExperiences;

              console.log("Client-side changes detected. Propagating to server workspace...");
              await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  profile: profileObj,
                  works: worksObj,
                  skills: skillsObj,
                  experiences: expObj
                })
              });

              setWorks(worksObj);
              localStorage.setItem('dou_portfolio_works', JSON.stringify(worksObj));
            }
          }
        }
      } catch (err) {
        console.error("Auto synchronization failed:", err);
      }
    };

    syncWithServer();
  }, []);

  // 7. Data mutation callbacks
  const handleSaveData = async (
    newProfile: DesignerProfile,
    newWorks: PortfolioWork[],
    newSkills: SkillItem[],
    newExperiences: ExperienceItem[]
  ) => {
    setProfile(newProfile);
    setWorks(newWorks);
    setSkills(newSkills);
    setExperiences(newExperiences);
    
    try {
      localStorage.setItem('dou_portfolio_profile', JSON.stringify(newProfile));
      localStorage.setItem('dou_portfolio_works', JSON.stringify(newWorks));
      localStorage.setItem('dou_portfolio_skills', JSON.stringify(newSkills));
      localStorage.setItem('dou_portfolio_experiences', JSON.stringify(newExperiences));
    } catch (e) {
      console.warn("localStorage persistence ignored:", e);
    }

    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: newProfile,
          works: newWorks,
          skills: newSkills,
          experiences: newExperiences
        })
      });
    } catch (err) {
      console.error("Failed to persist data on server workspace:", err);
    }
  };

  const handleResetData = async () => {
    setProfile(initialProfile);
    setWorks(initialWorks);
    setSkills(initialSkills);
    setExperiences(initialExperiences);

    try {
      localStorage.removeItem('dou_portfolio_profile');
      localStorage.removeItem('dou_portfolio_works');
      localStorage.removeItem('dou_portfolio_skills');
      localStorage.removeItem('dou_portfolio_experiences');
    } catch (e) {
      console.warn("localStorage clear ignored:", e);
    }

    try {
      await fetch('/api/reset', { method: 'POST' });
    } catch (err) {
      console.error("Failed to reset configurations on server workspace:", err);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300 font-geist antialiased text-zinc-50 bg-zinc-950 selection:bg-zinc-800 selection:text-white">
      
      {/* Dynamic Header Navbar */}
      <Navbar
        locale={locale}
        setLocale={setLocale}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenEditor={() => setEditorOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Page Layout Sections */}
      <main className="flex flex-col">
        {/* HERO SECTION */}
        <Hero profile={profile} locale={locale} />

        {/* SKILLS SECTION */}
        <Skills locale={locale} />

        {/* PORTFOLIO SECTION */}
        <Portfolio
          works={works}
          locale={locale}
          onUpdateWork={(updatedWork) => {
            const updatedWorks = works.map((w) => (w.id === updatedWork.id ? updatedWork : w));
            handleSaveData(profile, updatedWorks, skills, experiences);
          }}
        />

        {/* EXPERIENCE WORK TIMELINE */}
        <Experience experiences={experiences} locale={locale} darkMode={darkMode} />

        {/* CONTACT SECTION */}
        <Contact profile={profile} locale={locale} darkMode={darkMode} />
      </main>

      {/* FOOTER */}
      <footer className="py-12 md:py-16 bg-zinc-950 transition-colors duration-300 border-t border-white/5 text-[10px] uppercase tracking-[0.2em] text-zinc-500" id="vanguard-footer">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left copyright and credits */}
          <div className="space-y-2 text-center md:text-left flex-shrink-0">
            <p className="font-semibold tracking-widest text-zinc-400 uppercase">
              © {new Date().getFullYear()} {profile.name[locale]} // ALL RIGHTS RESERVED
            </p>
            <p className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase flex items-center justify-center md:justify-start gap-1.5">
              <span>DESIGNED BY</span>
              <Heart className="w-3 h-3 text-white fill-current animate-pulse" />
              <span>IN ELEGANT PORTFOLIO STYLE</span>
            </p>
          </div>

          {/* Right metadata badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 flex-shrink-0">
            <span className="px-4 py-1.5 rounded-full border border-zinc-850 bg-zinc-900/30 text-zinc-400 font-mono text-[9px] tracking-widest select-none">
              AIGC COMPILATION V1.8
            </span>
            <button
              onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
              className="px-4 py-1.5 rounded-full border border-zinc-850 bg-zinc-900/30 hover:bg-white hover:text-zinc-950 hover:border-white text-zinc-400 font-mono text-[9px] tracking-widest flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              <span>{locale === 'zh' ? '中文 / EN' : 'ZH / EN'}</span>
            </button>
          </div>

        </div>
      </footer>

      {/* ADMIN EDIT MODE SLIDER DRAWER */}
      <AdminEditor
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        locale={locale}
        profile={profile}
        works={works}
        skills={skills}
        experiences={experiences}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
    </div>
  );
}
