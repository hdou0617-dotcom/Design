/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, MessageSquare, Copy, Check, ExternalLink, QrCode } from 'lucide-react';
import { DesignerProfile, Locale } from '../types';
import BorderGlow from './BorderGlow';

interface ContactProps {
  profile: DesignerProfile;
  locale: Locale;
  darkMode: boolean;
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

export const Contact: React.FC<ContactProps> = ({ profile, locale, darkMode }) => {
  const [copied, setCopied] = React.useState(false);
  const [showWechatQr, setShowWechatQr] = React.useState(false);

  const handleCopyWechat = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(profile.wechat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactMethods = [
    {
      id: 'email',
      icon: <Mail className="w-4 h-4 text-zinc-400" />,
      label: { zh: '电子邮件', en: 'Email' },
      value: profile.email,
      actionLabel: { zh: '发送邮件', en: 'Send Mail' },
      href: `mailto:${profile.email}`,
      isExternal: false,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-24 bg-zinc-950 text-zinc-50 transition-colors duration-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-start justify-between gap-8" id="contact-header">
          <div className="max-w-2xl">
            <h2 
              className="font-podium text-2xl sm:text-3xl text-white tracking-widest mb-3 uppercase"
              style={{ color: '#ffffff' }}
            >
              {locale === 'zh' ? '04 联系我' : '04 CONTACT'}
            </h2>
            <p className="font-podium text-3xl sm:text-4xl md:text-5xl text-zinc-100 uppercase tracking-wide leading-tight mt-4">
              {locale === 'zh' ? (
                <>
                  激发极致美学，<br />
                  立即与我建立联结。
                </>
              ) : (
                <>
                  Orchestrate the future <br />
                  of your visual matrix.
                </>
              )}
            </p>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed text-left font-light font-inter mt-2 md:mt-12 md:pt-1">
            {locale === 'zh' 
              ? '诚接商业级高精度海报、品牌三维建模重塑、AIGC 生产流程定制咨询。' 
              : 'Open for high-end commercial posters, 3D brand modeling, and customized corporate generative workflows.'}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6" id="contact-grid">
          
          {/* 1. WeChat Interactive Card */}
          <BorderGlow
            edgeSensitivity={25}
            glowColor="30 80 80"
            backgroundColor={showWechatQr ? "#0d0d11" : "#050508"}
            borderRadius={24}
            glowRadius={30}
            glowIntensity={0.8}
            colors={['#a855f7', '#ec4899', '#3b82f6']}
            className="w-full text-left transition-all duration-300 border border-zinc-900"
            style={{ cursor: 'pointer' }}
          >
            <div
              onClick={() => setShowWechatQr(!showWechatQr)}
              className="p-6 md:p-8 flex flex-col justify-between min-h-[180px] h-full"
              id="contact-card-wechat"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 select-text">
                  <span className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </span>
                  <div>
                    <h3 className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                      {locale === 'zh' ? '微信平台' : 'WECHAT PLATFORM'}
                    </h3>
                    <p className="text-lg font-bold text-zinc-200 tracking-tight">
                      {profile.wechat}
                    </p>
                  </div>
                </div>
                
                {/* Copy WeChat ID button */}
                <button
                  onClick={handleCopyWechat}
                  className="p-2 rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title={locale === 'zh' ? '复制微信号' : 'Copy WeChat ID'}
                >
                  {copied ? <Check className="w-4 h-4 text-white animate-bounce" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Tap prompt */}
              <div className="mt-6 flex items-center justify-between text-[11px] text-zinc-500">
                <span className="font-light">{locale === 'zh' ? '点击显示或隐藏专属微缩二维码' : 'Click to toggle QR Code display'}</span>
                <span className="font-mono text-[9px] uppercase tracking-wider underline text-zinc-400">
                  {showWechatQr ? (locale === 'zh' ? '隐藏二维码' : 'Hide QR') : (locale === 'zh' ? '显示二维码' : 'Show QR')}
                </span>
              </div>

              {/* Collapsible QR Code box */}
              <div className={`overflow-hidden transition-all duration-500 flex flex-col items-center justify-center bg-zinc-950 rounded-2xl border border-zinc-850 ${
                showWechatQr ? 'max-h-[240px] opacity-100 p-4 mt-4' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
                <img
                  src={profile.wechatQrCode && profile.wechatQrCode.startsWith('data:') ? profile.wechatQrCode : safeEncodeUrl(profile.wechatQrCode || '')}
                  alt="WeChat QR Code"
                  referrerPolicy="no-referrer"
                  className="w-32 h-32 object-cover rounded-lg border border-zinc-900"
                />
                <span className="text-[9px] font-mono text-zinc-500 mt-2 text-center uppercase tracking-wider">
                  {locale === 'zh' ? '直接扫码添加好友' : 'Scan to add contacts'}
                </span>
              </div>
            </div>
          </BorderGlow>

          {/* 2. Email Interactive Card */}
          <BorderGlow
            edgeSensitivity={25}
            glowColor="30 80 80"
            backgroundColor="#050508"
            borderRadius={24}
            glowRadius={30}
            glowIntensity={0.8}
            colors={['#3b82f6', '#ec4899', '#a855f7']}
            className="w-full text-left transition-all duration-300 border border-zinc-900 shadow-xl"
          >
            <div
              className="p-6 md:p-8 flex flex-col justify-between h-full"
              id="contact-card-email"
            >
              <div>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-start justify-between group/mail cursor-pointer block"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850 group-hover/mail:border-zinc-700 transition-all">
                      <Mail className="w-5 h-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                        {locale === 'zh' ? '电子邮件' : 'EMAIL ADDRESS'}
                      </h3>
                      <p className="text-lg font-bold text-zinc-200 tracking-tight group-hover/mail:text-white transition-colors">
                        {profile.email}
                      </p>
                    </div>
                  </div>
                  
                  {/* Send Email button */}
                  <span className="p-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 group-hover/mail:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </a>

                {/* Action prompt */}
                <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="font-light">{locale === 'zh' ? '点击直接唤起系统邮箱发送咨询' : 'Click to launch system mail client'}</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider underline text-zinc-400">
                    {locale === 'zh' ? '发送邮件' : 'Send Email'}
                  </span>
                </div>
              </div>

              {/* Quick Mail Links */}
              <div className="mt-6 pt-5 border-t border-zinc-900/60 flex flex-col gap-3">
                <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  {locale === 'zh' ? '或点击选择以下常用邮箱快速写信:' : 'OR SELECT AN EMAIL PROVIDER TO COMPOSE:'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 text-[11px] text-red-200 transition-all duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Gmail</span>
                  </a>
                  <a
                    href={`https://outlook.live.com/mail/0/deeplink/compose?to=${profile.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 hover:border-blue-500/30 text-[11px] text-blue-200 transition-all duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span>Outlook</span>
                  </a>
                  <a
                    href="https://mail.qq.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-teal-500/5 hover:bg-teal-500/10 border border-teal-500/10 hover:border-teal-500/30 text-[11px] text-teal-200 transition-all duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    <span>QQ {locale === 'zh' ? '邮箱' : 'Mail'}</span>
                  </a>
                  <a
                    href="https://mail.163.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/10 hover:border-amber-500/30 text-[11px] text-amber-200 transition-all duration-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>163 {locale === 'zh' ? '网易邮箱' : 'Mail'}</span>
                  </a>
                </div>
              </div>
            </div>
          </BorderGlow>

        </div>

      </div>
    </section>
  );
};
