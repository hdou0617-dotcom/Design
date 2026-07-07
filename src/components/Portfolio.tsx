/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Copy, Check, Sparkles, Maximize2, Calendar, FileImage, X, Heart, Palette, Share2, Edit3, Upload, Shield, BookOpen, Monitor, Gift, Music, Zap, Trophy, Compass, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioWork, Locale, WorkCategory } from '../types';
import TiltedCard from './TiltedCard';

// Stable deterministic color palette generator based on work id
const getColorsForWork = (id: string): string[] => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorSets = [
    ['#0F172A', '#0284C7', '#38BDF8', '#7DD3FC', '#E0F2FE'], // Ocean Blue
    ['#1C1917', '#B45309', '#F59E0B', '#FCD34D', '#FEF3C7'], // Sunset Gold
    ['#14532D', '#047857', '#10B981', '#6EE7B7', '#D1FAE5'], // Emerald Green
    ['#312E81', '#4F46E5', '#6366F1', '#818CF8', '#E0E7FF'], // Indigo Dream
    ['#581C87', '#7E22CE', '#A855F7', '#C084FC', '#F3E8FF'], // Mystic Purple
    ['#451A03', '#BE123C', '#E11D48', '#FB7185', '#FFE4E6'], // Crimson Rose
  ];
  const index = Math.abs(hash) % colorSets.length;
  return colorSets[index];
};

// Stable deterministic starting likes counter based on work id
const getInitialLikes = (id: string): number => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (Math.abs(hash) % 75) + 18; // 18 to 92 stable seeded likes
};

interface PortfolioImageProps {
  work: PortfolioWork;
  locale: Locale;
  className?: string;
  isThumbnail?: boolean;
}

const LOCAL_IMAGE_FALLBACKS: Record<string, string> = {
  // 3D Rendering Fallbacks
  "/3d_rendering/xiazhui.jpg": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
  "/3d_rendering/nanjiangjiu.jpg": "https://images.unsplash.com/photo-1569529465841-dfedd8d5043d?q=80&w=1000",
  "/3d_rendering/chufangxidiji.jpg": "https://images.unsplash.com/photo-1581842239015-0a17f22ca451?q=80&w=1000",
  "/3d_rendering/naiping.jpg": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000",
  "/3d_rendering/saodiji.jpg": "https://images.unsplash.com/photo-1618090584126-129cd1f3f94c?q=80&w=1000",
  "/3d_rendering/hufataozhuang.jpg": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1000",
  "/3d_rendering/hufutaozhuang1.jpg": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000",
  "/3d_rendering/hufutaozhuang2.jpg": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000",
  "/3d_rendering/huoguobaozhuang.jpg": "https://images.unsplash.com/photo-1554998171-7e599bc95ccd?q=80&w=1000",
  "/3d_rendering/yashua.jpg": "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1000",
  "/3d_rendering/kongqijinghuaqi.jpg": "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=1000",
  "/3d_rendering/jinghuaye2.jpg": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1000",
  "/3d_rendering/jinghuaye.jpg": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000",
  "/3d_rendering/zhijin.jpg": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000",
  "/3d_rendering/zhijin2.jpg": "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1000",
  "/3d_rendering/jiangjiu.jpg": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1000",
  "/3d_rendering/chushiqi.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000",
  "/3d_rendering/xiangtilu.jpg": "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1000",

  // Legacy/Alternate Fallbacks
  "/poster/下坠20136 拷贝.png": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000",
  "/poster/牙刷.jpg": "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1000",
  "/poster/精华液2.jpg": "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1000",
  "/poster/精华液.png": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000",
  "/poster/香体露.png": "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1000",
  "/new_media/banner1.jpg": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000",
  "/new_media/banner2.jpg": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000",
  "/new_media/banner3.jpg": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000",
  "/new_media/banner4.jpg": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000",
  "/new_media/beijing1.jpg": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000",
  "/new_media/beijing2.jpg": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000",
  "/new_media/tiepian1.jpg": "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1000",
  "/new_media/tiepian2.jpg": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000",
  "/new_media/tiepian3.jpg": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000",
  "/new_media/tiepian4.jpg": "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=1000",
  "/new_media/tiepian5.jpg": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
  "/details_page/gelishuang.jpg": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000",
  "/details_page/kouhong.jpg": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1000",
  "/details_page/huanfuye.jpg": "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1000",
  "/details_page/xifamuyu.jpg": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=1000",
  "/details_page/xiaodugui.jpg": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000",
  "/details_page/jiaju.jpg": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000",
  "/details_page/tangrantuiche.jpg": "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000",
  "/details_page/nuanzhuo.jpg": "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000",
  "/details_page/wangzhan2.jpg": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000"
};

const PortfolioImage: React.FC<PortfolioImageProps> = ({ work, locale, className = "w-full h-full object-cover", isThumbnail = false }) => {
  const [hasError, setHasError] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const getImageUrl = (url: string, thumb: boolean) => {
    if (thumb && url && url.startsWith('/')) {
      return `/temp_small${url}`;
    }
    return url;
  };

  const [currentSrc, setCurrentSrc] = React.useState(() => getImageUrl(work.imageUrl, isThumbnail));

  // Reset states when imageUrl changes, so new URLs can load correctly
  React.useEffect(() => {
    setHasError(false);
    setLoaded(false);
    setCurrentSrc(getImageUrl(work.imageUrl, isThumbnail));
  }, [work.imageUrl, isThumbnail]);

  // Handle cached images on mount or URL change using a callback ref
  const handleImageRef = React.useCallback((node: HTMLImageElement | null) => {
    if (node) {
      imgRef.current = node;
      if (node.complete) {
        if (node.naturalWidth === 320 && node.naturalHeight === 320 && currentSrc.includes('postimg')) {
          setHasError(true);
        } else {
          setLoaded(true);
        }
      }
    }
  }, [currentSrc]);

  // Render a beautiful, highly stylized native vector mockup for the design work
  const renderMockup = () => {
    const titleText = work.title[locale];
    
    switch (work.id) {
      case "newmedia-3": // 5.17世界电信日
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex flex-col justify-between p-6 overflow-hidden select-none">
            {/* Tech Matrix Cyber Grid */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />
            
            <div className="z-10 flex justify-between items-start">
              <span className="text-[8px] font-mono tracking-widest text-sky-400 bg-sky-950/50 px-2 py-0.5 rounded border border-sky-800/40">5G CONNECT</span>
              <Shield className="w-5 h-5 text-sky-400 animate-pulse" />
            </div>

            <div className="z-10 space-y-2 my-auto text-center px-2">
              <h4 className="text-sm font-bold tracking-tight text-white line-clamp-2">{locale === 'zh' ? '5.17 世界电信日' : '5.17 Telecom Day'}</h4>
              <p className="text-lg font-black tracking-tight bg-gradient-to-r from-sky-400 via-blue-200 to-indigo-300 bg-clip-text text-transparent">{locale === 'zh' ? '全新反诈攻略' : 'Anti-Fraud Guide'}</p>
              <div className="inline-block px-2 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-[9px] font-mono text-sky-300 tracking-wider">
                {locale === 'zh' ? '再也不怕被套路啦' : 'Protect Your Digital Assets'}
              </div>
            </div>

            <div className="z-10 flex justify-between items-center text-[8px] font-mono text-sky-500">
              <span>SECURITY MULTIPLEX</span>
              <span>v6.0_STABLE</span>
            </div>
          </div>
        );

      case "newmedia-4": // 旧西圆
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-indigo-950 to-violet-900 flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
            
            <div className="z-10 flex justify-between items-start">
              <span className="text-[8px] font-mono tracking-widest text-purple-300 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-800/40">VISUAL COURSE</span>
              <BookOpen className="w-5 h-5 text-purple-300" />
            </div>

            <div className="z-10 space-y-2 my-auto text-center">
              <span className="text-[10px] font-serif italic text-purple-200 tracking-widest">{locale === 'zh' ? '旧西圆设计' : 'Old West Garden'}</span>
              <h4 className="text-base font-extrabold tracking-tight text-white">{locale === 'zh' ? '1+2新视觉培训' : '1+2 Visual Training'}</h4>
              <p className="text-xs text-purple-300/90">{locale === 'zh' ? '多元化教程 · 全新上线' : 'Diversified Design Tutorials'}</p>
            </div>

            <div className="z-10 flex justify-between items-center text-[8px] font-mono text-purple-400">
              <span>LAVENDER AMBIENCE</span>
              <span>NIJI_6.0</span>
            </div>
          </div>
        );

      case "newmedia-5": // 职业技能
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-zinc-950 flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/5 border border-blue-500/10 rounded-full flex items-center justify-center">
              <div className="w-28 h-28 border border-blue-500/15 rounded-full border-dashed" />
            </div>
            
            <div className="z-10 flex justify-between items-start">
              <span className="text-[8px] font-mono tracking-widest text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-800/40">PARTNERSHIP</span>
              <Monitor className="w-5 h-5 text-blue-400" />
            </div>

            <div className="z-10 space-y-1 my-auto text-center px-1">
              <h4 className="text-base font-black tracking-tight text-white leading-tight">{locale === 'zh' ? '职业技能等级证书' : 'Professional Skills'}</h4>
              <p className="text-[10px] text-blue-400 font-mono tracking-widest uppercase">{locale === 'zh' ? '大厂宣发 与 腾讯合作推广' : 'Tencent Strategic Cooperation'}</p>
              <div className="pt-2">
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[8px] font-mono text-blue-300">COLLABORATION_HQ</span>
              </div>
            </div>

            <div className="z-10 flex justify-between items-center text-[8px] font-mono text-blue-500">
              <span>TENCENT CLOUD INTEGRATION</span>
              <span>RENDER_3D</span>
            </div>
          </div>
        );

      case "newmedia-6": // 热力不减
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-violet-950 to-zinc-950 flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-500/15 rounded-full blur-2xl" />
            
            <div className="z-10 flex justify-between items-start">
              <span className="text-[8px] font-mono tracking-widest text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-800/40">SUMMER CAMPAIGN</span>
              <Gift className="w-5 h-5 text-rose-400 animate-bounce" />
            </div>

            <div className="z-10 space-y-2.5 my-auto text-center px-1">
              <h4 className="text-lg font-black tracking-tighter text-white uppercase bg-gradient-to-r from-yellow-300 via-rose-300 to-rose-400 bg-clip-text text-transparent">
                {locale === 'zh' ? '热力不减 狂赚一夏' : 'SUMMER CASH SPLASH'}
              </h4>
              <p className="text-xs text-rose-200/90 tracking-wide font-medium">{locale === 'zh' ? '邀请好友领现金红包' : 'Invite Friends for Red Packets'}</p>
              <div className="pt-1">
                <span className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-mono text-[9px] font-bold rounded-full shadow-md tracking-widest">
                  {locale === 'zh' ? '立即参与' : 'JOIN NOW'}
                </span>
              </div>
            </div>

            <div className="z-10 flex justify-between items-center text-[8px] font-mono text-rose-500">
              <span>FIESTA_RED_PACKET</span>
              <span>v6.0_ULTRA</span>
            </div>
          </div>
        );

      case "newmedia-2": // 嗨翻国庆
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-amber-950 to-zinc-950 flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="absolute bottom-4 right-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-xl" />
            
            <div className="z-10 flex justify-between items-start">
              <span className="text-[8px] font-mono tracking-widest text-yellow-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">GOLDEN WEEK</span>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            </div>

            <div className="z-10 space-y-2 my-auto text-center">
              <span className="text-[9px] font-mono text-yellow-500 tracking-[0.2em] uppercase">{locale === 'zh' ? '创意扭蛋机活动' : 'Creative Gashapon Machine'}</span>
              <h4 className="text-base font-extrabold tracking-tight text-white leading-tight">{locale === 'zh' ? '嗨翻国庆七天乐' : 'National Day Fiesta'}</h4>
              <p className="text-[10px] text-zinc-400 font-light">{locale === 'zh' ? '趣味拼图 & 抽豪礼不断' : 'Interactive games & lucky draws'}</p>
            </div>

            <div className="z-10 flex justify-between items-center text-[8px] font-mono text-yellow-600">
              <span>OCTOBER_FESTIVAL</span>
              <span>NIJI_STABLE</span>
            </div>
          </div>
        );

      case "newmedia-7": // 星宿之誓
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950 via-purple-950 to-slate-950 flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-fuchsia-500/10 rounded-full blur-2xl" />
            
            <div className="z-10 flex justify-between items-start">
              <span className="text-[8px] font-mono tracking-widest text-fuchsia-400 bg-fuchsia-950/50 px-2 py-0.5 rounded border border-fuchsia-800/40">ANIME SOUNDS</span>
              <Music className="w-5 h-5 text-fuchsia-400" />
            </div>

            <div className="z-10 space-y-2 my-auto text-center">
              <h4 className="text-base font-black tracking-tight text-white leading-tight bg-gradient-to-r from-fuchsia-300 via-purple-200 to-indigo-300 bg-clip-text text-transparent">
                {locale === 'zh' ? '星宿之誓 · 命运之战' : 'Starry Constellation'}
              </h4>
              <p className="text-xs text-purple-300 tracking-widest uppercase">{locale === 'zh' ? '二次元星光音乐节' : 'Anime Music Festival'}</p>
              <div className="inline-block mx-auto w-12 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-500 rounded-full" />
            </div>

            <div className="z-10 flex justify-between items-center text-[8px] font-mono text-fuchsia-500">
              <span>STARRY_MUSIC_LAB</span>
              <span>NIJI_COSMIC</span>
            </div>
          </div>
        );

      case "newmedia-8": // 街舞新势力
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-stone-950 to-zinc-950 flex flex-col justify-between p-6 overflow-hidden select-none">
            <div className="absolute -left-12 -top-12 w-36 h-36 bg-zinc-500/5 rounded-full blur-2xl" />
            
            <div className="z-10 flex justify-between items-start">
              <span className="text-[8px] font-mono tracking-widest text-zinc-400 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-700/50">STREET CULTURE</span>
              <Zap className="w-5 h-5 text-zinc-100" />
            </div>

            <div className="z-10 space-y-2.5 my-auto text-center">
              <span className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase">{locale === 'zh' ? '街舞新势力' : 'Street Dance Force'}</span>
              <h4 className="text-lg font-black tracking-tighter text-white italic">{locale === 'zh' ? 'JIEWU 街舞新势力' : 'JIEWU AWAKENING'}</h4>
              <p className="text-[10px] text-zinc-300 font-mono tracking-widest uppercase bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded inline-block">
                {locale === 'zh' ? '觉醒计划 街舞课程' : 'Awakening Course'}
              </p>
            </div>

            <div className="z-10 flex justify-between items-center text-[8px] font-mono text-zinc-500">
              <span>MINIMALIST_STREET</span>
              <span>B&W_CHROME_v6</span>
            </div>
          </div>
        );

      case "newmedia-9": // BeautiPro美缇丝
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-zinc-900 to-stone-950 flex flex-col justify-between p-6 overflow-hidden select-none border border-amber-950/20">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:14px_14px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-32 bg-amber-500/5 blur-3xl rounded-full" />
            
            <div className="z-10 flex justify-between items-start">
              <span className="text-[8px] font-mono tracking-widest text-amber-300 bg-stone-950/50 px-2 py-0.5 rounded border border-amber-900/30">LUXURY ESTHETIC</span>
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>

            <div className="z-10 space-y-2 my-auto text-center">
              <span className="text-[10px] font-serif italic text-amber-200 tracking-widest uppercase">{locale === 'zh' ? 'BeautiPro 美缇丝' : 'BeautiPro Cosmetics'}</span>
              <h4 className="text-base font-bold tracking-tight text-white">{locale === 'zh' ? '高端美容仪器大促' : 'Luxury Skincare Devices'}</h4>
              <p className="text-[9px] font-mono text-amber-400/80 uppercase tracking-widest">{locale === 'zh' ? '直播间臻享好礼' : 'Exclusive Live Event'}</p>
            </div>

            <div className="z-10 flex justify-between items-center text-[8px] font-mono text-amber-600">
              <span>WARM_CHAMPAGNE</span>
              <span>v6.0_HQ_STUDIO</span>
            </div>
          </div>
        );

      case "newmedia-10": // 凯迪拉克
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-zinc-900 to-indigo-950 flex flex-col justify-between p-6 overflow-hidden select-none">
            {/* Horizon and city lights glow */}
            <div className="absolute bottom-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-slate-950/40 backdrop-blur-xs" />
            <div className="absolute bottom-4 left-1/4 w-32 h-8 bg-sky-400/10 rounded-full blur-xl" />
            
            <div className="z-10 flex justify-between items-start">
              <span className="text-[8px] font-mono tracking-widest text-zinc-400 bg-slate-950/60 px-2 py-0.5 rounded border border-zinc-800/40">AUTOMOTIVE</span>
              <Compass className="w-5 h-5 text-zinc-400 animate-pulse" />
            </div>

            <div className="z-10 space-y-1.5 my-auto text-center px-2">
              <span className="text-[8px] font-mono text-zinc-400 tracking-[0.3em] uppercase">{locale === 'zh' ? '全新凯迪拉克 CT5' : 'THE ALL-NEW CADILLAC CT5'}</span>
              <h4 className="text-base font-extrabold tracking-tight text-white italic">{locale === 'zh' ? '全新 CT5 迈步同频' : 'CT5: NEXT MOVE IS YOU'}</h4>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[8px] font-mono text-indigo-300">
                {locale === 'zh' ? '未来每一步，都与你同频' : 'In Sync With The Future'}
              </div>
            </div>

            <div className="z-10 flex justify-between items-center text-[8px] font-mono text-indigo-400">
              <span>METALLIC_SUNSET</span>
              <span>AUTOMOTIVE_V6</span>
            </div>
          </div>
        );

      default: // General elegant layout for other items
        const colors = getColorsForWork(work.id);
        return (
          <div 
            style={{ backgroundColor: colors[0] }}
            className="absolute inset-0 flex flex-col justify-between p-6 overflow-hidden select-none"
          >
            {/* Ambient glows */}
            <div 
              style={{ backgroundColor: colors[1], opacity: 0.15 }}
              className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl" 
            />
            <div 
              style={{ backgroundColor: colors[2], opacity: 0.1 }}
              className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full blur-2xl" 
            />

            <div className="z-10 flex justify-between items-start">
              <span 
                style={{ color: colors[2], borderColor: `${colors[2]}40`, backgroundColor: `${colors[0]}80` }}
                className="text-[8px] font-mono tracking-widest px-2 py-0.5 rounded border"
              >
                {work.category.toUpperCase()}
              </span>
              <Sparkles className="w-4 h-4" style={{ color: colors[2] }} />
            </div>

            <div className="z-10 space-y-2 my-auto text-center px-1">
              <h4 className="text-sm font-semibold tracking-tight text-white leading-snug line-clamp-2">
                {titleText}
              </h4>
              <p className="text-[9px] text-zinc-400 font-mono tracking-widest">
                {work.dimensions} ({work.ratio})
              </p>
            </div>

            <div className="z-10 flex justify-between items-center text-[8px] font-mono text-zinc-500">
              <span>AIGC_LAB</span>
              <span>{work.id.toUpperCase()}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent flex items-center justify-center">
      {/* Fallback Vector Mockup */}
      {(!loaded || hasError) && renderMockup()}
      
      {/* Actual Image overlaying on top */}
      {!hasError && (
        <img
          ref={handleImageRef}
          src={currentSrc && currentSrc.startsWith('data:') ? currentSrc : encodeURI(currentSrc)}
          alt={work.title[locale]}
          referrerPolicy="no-referrer"
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth === 320 && img.naturalHeight === 320 && currentSrc.includes('postimg')) {
              console.warn(`Detected 320x320 postimg 404 placeholder for work: ${work.id}, switching to native vector mockup fallback.`);
              setHasError(true);
            } else {
              setLoaded(true);
            }
          }}
          onError={() => {
            if (currentSrc in LOCAL_IMAGE_FALLBACKS) {
              const fallbackUrl = LOCAL_IMAGE_FALLBACKS[currentSrc];
              console.warn(`Local file ${currentSrc} not found, falling back to Unsplash URL: ${fallbackUrl}`);
              setCurrentSrc(fallbackUrl);
            } else if (currentSrc && currentSrc.includes('/temp_small/')) {
              // Smart recovery: fall back to original high-res folder if temp_small thumbnail fails to load
              const originalUrl = currentSrc.replace('/temp_small', '');
              console.warn(`Thumbnail ${currentSrc} failed, retrying with original high-res image: ${originalUrl}`);
              setCurrentSrc(originalUrl);
            } else if (currentSrc && currentSrc.startsWith('/') && !currentSrc.startsWith('/poster/') && !currentSrc.startsWith('/assets/')) {
              console.warn(`Local image ${currentSrc} failed to load. Retrying at /poster${currentSrc}...`);
              setCurrentSrc(`/poster${currentSrc}`);
            } else {
              console.warn(`Failed to load image for: ${work.id}, using native vector mockup fallback.`);
              setHasError(true);
            }
          }}
          className={`${className} absolute inset-0 transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

interface PortfolioProps {
  works: PortfolioWork[];
  locale: Locale;
  onUpdateWork?: (work: PortfolioWork) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ works, locale, onUpdateWork }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<WorkCategory>('all');
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [previewWork, setPreviewWork] = React.useState<PortfolioWork | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [likedWorks, setLikedWorks] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_likes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);
  const [shareCopied, setShareCopied] = React.useState(false);

  const [isEditingUrl, setIsEditingUrl] = React.useState(false);
  const [newUrlInput, setNewUrlInput] = React.useState('');

  const [imageDim, setImageDim] = React.useState<{ width: number; height: number } | null>(null);
  const [isModalImgLoaded, setIsModalImgLoaded] = React.useState(false);
  const [modalImgError, setModalImgError] = React.useState(false);
  const [modalSrc, setModalSrc] = React.useState<string>('');
  const modalImgRef = React.useRef<HTMLImageElement>(null);

  const activeColors = previewWork ? getColorsForWork(previewWork.id) : [];

  React.useEffect(() => {
    if (previewWork) {
      setNewUrlInput(previewWork.imageUrl);
      setIsEditingUrl(false);
      setImageDim(null);
      setIsModalImgLoaded(false);
      setModalImgError(false);
      setModalSrc(previewWork.imageUrl);
    }
  }, [previewWork]);

  // Handle cached modal images using a callback ref
  const handleModalImageRef = React.useCallback((node: HTMLImageElement | null) => {
    if (node) {
      modalImgRef.current = node;
      if (node.complete) {
        if (node.naturalWidth === 320 && node.naturalHeight === 320 && modalSrc.includes('postimg')) {
          setModalImgError(true);
        } else {
          if (node.naturalWidth > 0) {
            setImageDim({ width: node.naturalWidth, height: node.naturalHeight });
          }
          setIsModalImgLoaded(true);
        }
      }
    }
  }, [modalSrc]);

  const currentCategoryWorks = React.useMemo(() => {
    if (selectedCategory === 'all') {
      return works;
    }
    return works.filter(w => w.category === selectedCategory);
  }, [works, selectedCategory]);

  const handlePrevWork = React.useCallback(() => {
    if (!previewWork || currentCategoryWorks.length <= 1) return;
    const idx = currentCategoryWorks.findIndex(w => w.id === previewWork.id);
    if (idx !== -1) {
      const prevIdx = (idx - 1 + currentCategoryWorks.length) % currentCategoryWorks.length;
      setPreviewWork(currentCategoryWorks[prevIdx]);
    }
  }, [previewWork, currentCategoryWorks]);

  const handleNextWork = React.useCallback(() => {
    if (!previewWork || currentCategoryWorks.length <= 1) return;
    const idx = currentCategoryWorks.findIndex(w => w.id === previewWork.id);
    if (idx !== -1) {
      const nextIdx = (idx + 1) % currentCategoryWorks.length;
      setPreviewWork(currentCategoryWorks[nextIdx]);
    }
  }, [previewWork, currentCategoryWorks]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!previewWork) return;
      if (e.key === 'ArrowLeft') {
        handlePrevWork();
      } else if (e.key === 'ArrowRight') {
        handleNextWork();
      } else if (e.key === 'Escape') {
        setPreviewWork(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewWork, handlePrevWork, handleNextWork]);

  const toggleLike = (id: string) => {
    setLikedWorks((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('portfolio_likes', JSON.stringify(next));
      return next;
    });
  };

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  // Filter categories
  const categories = [
    { id: 'all', label: { zh: '全部画廊', en: 'All' } },
    { id: 'render3d', label: { zh: '3D渲染', en: '3D Rendering' } },
    { id: 'illustration', label: { zh: '插画', en: 'Illustration' } },
    { id: 'detail', label: { zh: '详情页', en: 'Detail Pages' } },
    { id: 'newmedia', label: { zh: '新媒体', en: 'New Media' } },
  ];

  // Group works by categories
  const render3dWorks = works.filter((w) => w.category === 'render3d');
  const illustrationWorks = works.filter((w) => w.category === 'illustration');
  const detailWorks = works.filter((w) => w.category === 'detail');
  const newmediaWorks = works.filter((w) => w.category === 'newmedia');

  // Handle prompt copying
  const handleCopyPrompt = (id: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'render3d':
        return locale === 'zh' ? '3D渲染' : '3D Rendering';
      case 'illustration':
        return locale === 'zh' ? '插画' : 'Illustration';
      case 'detail':
        return locale === 'zh' ? '详情页' : 'Detail Page';
      case 'newmedia':
        return locale === 'zh' ? '新媒体' : 'New Media';
      default:
        return locale === 'zh' ? '设计创意' : 'Creative Work';
    }
  };

  const getCategoryBadgeStyles = (cat: string) => {
    switch (cat) {
      case 'render3d':
        return 'text-sky-400 bg-sky-950/40 border-sky-800/30';
      case 'illustration':
        return 'text-indigo-400 bg-indigo-950/40 border-indigo-800/30';
      case 'detail':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/30';
      case 'newmedia':
        return 'text-pink-400 bg-pink-950/40 border-pink-800/30';
      default:
        return 'text-zinc-400 bg-zinc-950/40 border-zinc-800/30';
    }
  };

  // Render individual work item card: uses exact aspect ratio from metadata/dimensions to match the image pixel ratio perfectly
  const renderWorkCard = (work: PortfolioWork) => {
    const ratioStr = (() => {
      const category: string = work.category;
      // Force 9:16 aspect ratio for illustration and detail categories as requested
      if (category === 'illustration' || category === 'detail') {
        return '9 / 16';
      }
      // Force consistent ratios for newmedia subgroups to ensure perfectly aligned grid columns
      if (category === 'newmedia') {
        const horizontalIds = ["newmedia-1", "newmedia-2", "newmedia-3", "newmedia-4", "newmedia-5", "newmedia-6"];
        if (horizontalIds.includes(work.id)) {
          return '16 / 9';
        } else {
          return '3 / 4';
        }
      }
      // 1. Try ratio field first
      if (work.ratio) {
        const parts = work.ratio.split(':');
        if (parts.length === 2) {
          const w = parseFloat(parts[0]);
          const h = parseFloat(parts[1]);
          if (!isNaN(w) && !isNaN(h) && h > 0) {
            return `${w} / ${h}`;
          }
        }
      }
      // 2. Try parsing dimensions field (e.g. "1200 x 8000 px" or "1920 x 1080")
      if (work.dimensions) {
        const cleanDim = work.dimensions.replace(/px/gi, '').trim();
        const parts = cleanDim.split(/[x*]/i);
        if (parts.length === 2) {
          const w = parseFloat(parts[0].trim());
          const h = parseFloat(parts[1].trim());
          if (!isNaN(w) && !isNaN(h) && h > 0) {
            return `${w} / ${h}`;
          }
        }
      }
      // Fallbacks
      if (category === 'newmedia') {
        return '16 / 9';
      }
      return '3 / 4';
    })();
    return (
      <div
        key={work.id}
        onClick={() => setPreviewWork(work)}
        className="group relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/95 border border-zinc-800/50 hover:border-zinc-700/80 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 flex flex-col justify-between"
        id={`work-card-${work.id}`}
      >
        {/* Image Container with high quality scales and TiltedCard effect */}
        <div 
          className="relative overflow-hidden w-full bg-zinc-950 flex-shrink-0"
          style={{ aspectRatio: ratioStr }}
        >
          <div className="absolute inset-0 w-full h-full">
            {isMobile ? (
              <PortfolioImage
                work={work}
                locale={locale}
                className="w-full h-full object-cover"
                isThumbnail={true}
              />
            ) : (
              <TiltedCard
                imageSrc={work.imageUrl}
                altText={work.title[locale]}
                captionText=""
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                scaleOnHover={1.03}
                rotateAmplitude={10}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="absolute inset-0 bg-zinc-950/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                }
              >
                <PortfolioImage
                  work={work}
                  locale={locale}
                  className="w-full h-full object-cover"
                  isThumbnail={true}
                />
              </TiltedCard>
            )}
          </div>
        </div>

        {/* Info panel */}
        <div className="p-4 flex flex-col gap-1.5 bg-zinc-900/40 border-t border-zinc-850/60">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-md border ${getCategoryBadgeStyles(work.category)}`}>
              {getCategoryLabel(work.category)}
            </span>
            <span className="text-[9px] font-mono text-zinc-100" style={{ color: '#f1f3f5' }}>
              {work.dimensions}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-white transition-colors tracking-tight line-clamp-1" style={{ color: '#ffffff' }}>
            {work.title[locale]}
          </h4>
        </div>
      </div>
    );
  };

  // Calculate dynamic max-width for the modal to perfectly fit the image's natural aspect ratio
  const modalMaxWidth = (() => {
    if (!imageDim) return '48rem'; // default to max-w-3xl (48rem)
    const ratio = imageDim.width / imageDim.height;
    const widthInVh = 65 * ratio;
    if (ratio < 1) {
      // Portrait image: bound to minimum of 360px and maximum of 90vw
      return `min(90vw, max(360px, ${widthInVh}vh))`;
    } else {
      // Landscape/Square image: bound to minimum of 450px, max of 1000px, and maximum of 90vw
      return `min(90vw, max(450px, min(1000px, ${widthInVh}vh)))`;
    }
  })();

  return (
    <section id="portfolio" className="py-20 md:py-24 bg-zinc-950 text-zinc-50 transition-colors duration-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Gallery Header with top-alignment and consistent spacing */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-start justify-between gap-8" id="portfolio-header">
          <div className="max-w-2xl">
            <h2 
              className="font-podium text-2xl sm:text-3xl text-white tracking-widest mb-3 uppercase"
              style={{ color: '#ffffff' }}
            >
              {locale === 'zh' ? '02 创意作品' : '02 CREATIONS'}
            </h2>
            <p className="font-podium text-3xl sm:text-4xl md:text-5xl text-zinc-100 uppercase tracking-wide leading-tight mt-4">
              {locale === 'zh' ? (
                <>
                  创意像素画廊，<br />
                  探寻算法的无限边界。
                </>
              ) : (
                <>
                  Bespoke pixel gallery, <br />
                  exploring the infinite limits of algorithms.
                </>
              )}
            </p>
          </div>

          {/* Elegant Capsule Tab Navigation */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 backdrop-blur-md" id="portfolio-tabs">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-lg scale-102'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                  }`}
                  style={
                    isActive
                      ? { color: '#000000', backgroundColor: '#ffffff', opacity: 1 }
                      : { color: 'rgba(255, 255, 255, 0.6)' }
                  }
                >
                  {cat.label[locale]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories Content Sections */}
        <div className="space-y-24" id="portfolio-container">
          
          {/* 1. SECTION: 3D渲染 */}
          {(selectedCategory === 'all' || selectedCategory === 'render3d') && render3dWorks.length > 0 && (
            <div className="space-y-8" id="portfolio-section-render3d">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <span className="w-1 h-3 bg-white rounded-full" style={{ backgroundColor: '#ffffff' }} />
                <h3 
                  className="font-podium text-sm tracking-wider uppercase text-white"
                  style={{ color: '#ffffff' }}
                >
                  {locale === 'zh' ? 'Ⅰ. 3D渲染作品展示' : 'Ⅰ. 3D CONCEPT RENDERS'}
                </h3>
                <span className="text-[10px] font-mono text-zinc-300">({render3dWorks.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {render3dWorks.map((work) => renderWorkCard(work))}
              </div>
            </div>
          )}

          {/* 2. SECTION: 插画 */}
          {(selectedCategory === 'all' || selectedCategory === 'illustration') && illustrationWorks.length > 0 && (
            <div className="space-y-8" id="portfolio-section-illustrations">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3 pt-4">
                <span className="w-1 h-3 bg-white rounded-full" style={{ backgroundColor: '#ffffff' }} />
                <h3 
                  className="font-podium text-sm tracking-wider uppercase text-white"
                  style={{ color: '#ffffff' }}
                >
                  {locale === 'zh' ? 'Ⅱ. 创意插画展示' : 'Ⅱ. CONCEPT ILLUSTRATIONS'}
                </h3>
                <span className="text-[10px] font-mono text-zinc-300">({illustrationWorks.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {illustrationWorks.map((work) => renderWorkCard(work))}
              </div>
            </div>
          )}

          {/* 3. SECTION: 详情页 */}
          {(selectedCategory === 'all' || selectedCategory === 'detail') && detailWorks.length > 0 && (
            <div className="space-y-8" id="portfolio-section-details">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3 pt-4">
                <span className="w-1 h-3 bg-white rounded-full" style={{ backgroundColor: '#ffffff' }} />
                <h3 
                  className="font-podium text-sm tracking-wider uppercase text-white"
                  style={{ color: '#ffffff' }}
                >
                  {locale === 'zh' ? 'Ⅲ. 详情页商业作品' : 'Ⅲ. COMMERCIAL DETAIL PAGES'}
                </h3>
                <span className="text-[10px] font-mono text-zinc-300">({detailWorks.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {detailWorks.map((work) => renderWorkCard(work))}
              </div>
            </div>
          )}

          {/* 4. SECTION: 新媒体 */}
          {(selectedCategory === 'all' || selectedCategory === 'newmedia') && newmediaWorks.length > 0 && (() => {
            const horizontalIds = ["newmedia-1", "newmedia-2", "newmedia-3", "newmedia-4", "newmedia-5", "newmedia-6"];
            const horizontalWorks = newmediaWorks.filter(w => horizontalIds.includes(w.id));
            const verticalWorks = newmediaWorks.filter(w => !horizontalIds.includes(w.id));
            return (
              <div className="space-y-12" id="portfolio-section-newmedia">
                <div className="flex items-center gap-3 border-b border-white/5 pb-3 pt-4">
                  <span className="w-1 h-3 bg-white rounded-full" style={{ backgroundColor: '#ffffff' }} />
                  <h3 
                    className="font-podium text-sm tracking-wider uppercase text-white"
                    style={{ color: '#ffffff' }}
                  >
                    {locale === 'zh' ? 'Ⅳ. 新媒体创意设计' : 'Ⅳ. NEW MEDIA CREATIONS'}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-300">({newmediaWorks.length})</span>
                </div>

                {/* Horizontal Section */}
                {horizontalWorks.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
                      <h4 
                        className="text-xs font-semibold text-white uppercase tracking-widest"
                        style={{ color: '#ffffff' }}
                      >
                        {locale === 'zh' ? '品牌大图与运营 Banner' : 'Brand Key Visuals & Widescreen Banners'}
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {horizontalWorks.map((work) => renderWorkCard(work))}
                    </div>
                  </div>
                )}

                {/* Vertical Section */}
                {verticalWorks.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse" />
                      <h4 
                        className="text-xs font-semibold text-white uppercase tracking-widest"
                        style={{ color: '#ffffff' }}
                      >
                        {locale === 'zh' ? '社媒推广海报与商业贴片' : 'Social Media Posters & E-commerce Tiles'}
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {verticalWorks.map((work) => renderWorkCard(work))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Empty State */}
        {selectedCategory !== 'all' && 
          ((selectedCategory === 'render3d' && render3dWorks.length === 0) ||
           (selectedCategory === 'illustration' && illustrationWorks.length === 0) ||
           (selectedCategory === 'detail' && detailWorks.length === 0) ||
           (selectedCategory === 'newmedia' && newmediaWorks.length === 0)) && (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl animate-fade-in" id="portfolio-empty">
            <p className="text-zinc-500 text-sm font-light">
              {locale === 'zh' ? '该分类下暂无作品。' : 'No works found in this category.'}
            </p>
          </div>
        )}
      </div>

      {/* FULL SCREEN LIGHTBOX PREVIEW OVERLAY / MODAL */}
      {previewWork && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl animate-fade-in overflow-hidden"
          id="portfolio-lightbox"
        >
          {/* Ambient dynamic colorful gradient backdrop glow */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-all duration-1000 select-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${activeColors[2] || '#38bdf8'} 0%, ${activeColors[1] || '#0284c7'} 35%, ${activeColors[0] || '#0f172a'} 85%, transparent 100%)`
            }}
          />

          {/* Close Trigger - positioned at top-right and strictly fixed in the overflow-hidden container */}
          <button
            onClick={() => setPreviewWork(null)}
            className="fixed top-6 right-6 p-2.5 rounded-full cursor-pointer bg-zinc-900/95 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all z-50 border border-zinc-750 shadow-xl"
            id="lightbox-close-btn"
            title={locale === 'zh' ? '关闭' : 'Close'}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Lightbox Navigation Controls - Fixed on the right side under the close button, non-scrollable */}
          <div className="fixed top-[76px] right-6 flex flex-col gap-3 z-50">
            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevWork(); }}
              className="p-2.5 rounded-full cursor-pointer bg-zinc-900/95 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all border border-zinc-750 shadow-xl flex items-center justify-center"
              id="lightbox-prev-btn"
              title={locale === 'zh' ? '上一个' : 'Previous'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNextWork(); }}
              className="p-2.5 rounded-full cursor-pointer bg-zinc-900/95 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all border border-zinc-750 shadow-xl flex items-center justify-center"
              id="lightbox-next-btn"
              title={locale === 'zh' ? '下一个' : 'Next'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable container for the content */}
          <div
            className={`w-full h-full ${
              previewWork.category === 'detail'
                ? 'overflow-y-auto overflow-x-hidden flex flex-col items-center py-16 px-4 md:px-0'
                : 'flex items-center justify-center overflow-hidden p-4 md:p-6'
            }`}
            onClick={() => setPreviewWork(null)}
          >
            {/* Clean centered image with no border or text cards */}
            <div
              className={`relative select-none ${
                previewWork.category === 'detail' ? 'w-full max-w-[1200px] flex justify-center' : 'flex items-center justify-center max-w-full max-h-[92vh]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {!modalImgError ? (
                <img
                  ref={handleModalImageRef}
                  src={modalSrc && modalSrc.startsWith('data:') ? modalSrc : encodeURI(modalSrc)}
                  alt={previewWork.title[locale]}
                  referrerPolicy="no-referrer"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img.naturalWidth === 320 && img.naturalHeight === 320 && modalSrc.includes('postimg')) {
                      console.warn("Detected 320x320 postimg 404 placeholder in lightbox, triggering recovery UI");
                      setModalImgError(true);
                    } else {
                      setImageDim({ width: img.naturalWidth, height: img.naturalHeight });
                      setIsModalImgLoaded(true);
                    }
                  }}
                  onError={() => {
                    if (modalSrc in LOCAL_IMAGE_FALLBACKS) {
                      const fallbackUrl = LOCAL_IMAGE_FALLBACKS[modalSrc];
                      console.warn(`Lightbox local file ${modalSrc} failed to load, falling back to Unsplash: ${fallbackUrl}`);
                      setModalSrc(fallbackUrl);
                    } else if (modalSrc && modalSrc.startsWith('/') && !modalSrc.startsWith('/poster/') && !modalSrc.startsWith('/assets/')) {
                      console.warn(`Lightbox local image ${modalSrc} failed to load. Retrying at /poster${modalSrc}...`);
                      setModalSrc(`/poster${modalSrc}`);
                    } else {
                      setModalImgError(true);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  style={
                    previewWork.category === 'detail'
                      ? {
                          width: '100%',
                          height: 'auto',
                          maxWidth: imageDim ? `${Math.min(imageDim.width, 900)}px` : '450px',
                          maxHeight: 'none',
                          display: 'block',
                          margin: '0 auto',
                        }
                      : undefined
                  }
                  className={`select-none transition-all duration-300 rounded-lg shadow-2xl cursor-default ${
                    previewWork.category === 'detail'
                      ? 'block'
                      : 'max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain'
                  } ${
                    isModalImgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                />
              ) : (
              <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4 mx-auto my-12 animate-fade-in">
                {/* Fallback Vector Mockup */}
                <div className="w-full aspect-[3/4] max-h-[50vh] relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
                  <PortfolioImage
                    work={previewWork}
                    locale={locale}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Helpful error recovery panel */}
                <div className="w-full p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md space-y-4 shadow-xl">
                  <div className="flex items-center gap-3 text-amber-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <h5 className="text-sm font-semibold">
                      {locale === 'zh' ? '检测到第三方图床失效 (404 Placeholder)' : 'Stale Third-Party Image Link (404)'}
                    </h5>
                  </div>
                  
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {locale === 'zh' 
                      ? '由于该作品在第三方图床的链接已失效（被强制降级为了 320x320 px 的模糊缩略图，导致显示模糊），我们已自动为您切换为设计精美、分辨率无限的 native 矢量 Mockup 进行展示。您可以通过下方输入框或直接上传本地的高清图片，我们将为您自动保存并应用新图片：'
                      : 'The high-resolution link on the third-party image host is invalid (downgraded to a 320x320 px blurry thumbnail). We have automatically fallbacked to our beautiful, infinite-resolution vector mockup. You can update the URL or upload a local high-resolution image below to replace it permanently:'
                    }
                  </p>
                  
                  <div className="space-y-3 pt-1">
                    {/* Input field */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        {locale === 'zh' ? '高清图片链接 (ImageUrl)' : 'High-Res Image URL'}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newUrlInput}
                          onChange={(e) => setNewUrlInput(e.target.value)}
                          placeholder="https://example.com/your-high-res-image.jpg"
                          className="flex-grow px-3 py-1.5 text-xs rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-150 placeholder-zinc-600 focus:outline-hidden focus:border-zinc-700 transition-colors font-mono"
                        />
                        <button
                          onClick={() => {
                            if (newUrlInput.trim()) {
                              const updated = { ...previewWork, imageUrl: newUrlInput.trim() };
                              setPreviewWork(updated);
                              if (onUpdateWork) onUpdateWork(updated);
                            }
                          }}
                          className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 cursor-pointer transition-colors"
                        >
                          {locale === 'zh' ? '保存' : 'Save'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Local File Upload Selector */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-zinc-800/60">
                      <span className="text-[10px] font-mono text-zinc-500">
                        {locale === 'zh' ? '或重新上传高清原图：' : 'Or upload high-res image:'}
                      </span>
                      <label className="text-xs text-white hover:text-zinc-200 font-mono flex items-center gap-2 bg-zinc-850 hover:bg-zinc-800 px-3 py-1.5 rounded-lg cursor-pointer transition-colors border border-zinc-750 shadow-xs">
                        <Upload className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{locale === 'zh' ? '上传高清图片' : 'Upload Image'}</span>
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
                                  const updated = { ...previewWork, imageUrl: event.target.result as string };
                                  setPreviewWork(updated);
                                  if (onUpdateWork) onUpdateWork(updated);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading spinner overlay */}
            {!isModalImgLoaded && !modalImgError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-xs">
                <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-200 rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </section>
  );
};
