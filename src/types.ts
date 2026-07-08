/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Locale = 'zh' | 'en';

export interface LocalizedString {
  zh: string;
  en: string;
}

export interface LocalizedArray {
  zh: string[];
  en: string[];
}

export interface DesignerProfile {
  name: LocalizedString;
  englishName: string;
  title: LocalizedString;
  tags: LocalizedArray;
  intro: LocalizedString;
  bio: LocalizedString;
  philosophy: LocalizedString;
  avatarUrl: string;
  experienceYears: number;
  email: string;
  wechat: string;
  wechatQrCode: string; // Base64 or placeholder URL
  redBookUrl: string;
  redBookName: string;
  zcoolUrl: string;
  zcoolName: string;
  behanceUrl: string;
  behanceName: string;
  resumeDownloadUrl: string;
}

export type WorkCategory = 'all' | 'render3d' | 'illustration' | 'detail' | 'newmedia';

export interface PortfolioWork {
  id: string;
  title: LocalizedString;
  category: 'render3d' | 'illustration' | 'detail' | 'newmedia';
  imageUrl: string;
  description: LocalizedString;
  prompt: string;
  toolsUsed: string[];
  dimensions: string; // e.g., "1200 x 1600" or "1920 x 1080"
  ratio: string; // e.g. "3:4", "16:9", "1:1"
  date: string;
}

export interface SkillItem {
  name: string;
  proficiency: number; // 0-100
  category: 'aigc' | 'traditional' | 'tech';
  description: LocalizedString;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: LocalizedString;
  company: LocalizedString;
  description: LocalizedString;
  highlights: LocalizedArray;
}
