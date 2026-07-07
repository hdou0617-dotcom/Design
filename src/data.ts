/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DesignerProfile, PortfolioWork, SkillItem, ExperienceItem } from './types';
import customData from './customData.json';

const defaultProfile: DesignerProfile = {
  name: {
    zh: "黄文荟",
    en: "WENHUI HUANG"
  },
  englishName: "WENHUI",
  title: {
    zh: "高级电商设计师 / 3D 渲染设计师",
    en: "Senior E-commerce & 3D Rendering Designer"
  },
  tags: {
    zh: ["六年电商深耕", "3D 渲染多面手", "大厂全案设计", "极致细节与精修"],
    en: ["6 Years E-commerce", "3D Rendering Expert", "Full-scale Campaign", "Precision Retouching"]
  },
  intro: {
    zh: "六年深耕电商视觉与三维写实渲染，融合工科结构逻辑与前沿审美，赋予品牌极具转化力的高阶产品质感。",
    en: "6 years specializing in e-commerce visuals and photorealistic 3D rendering. Blending engineering structural logic with modern design to empower brands with high-converting premium product textures."
  },
  bio: {
    zh: "拥有 6 年以上专业电商设计与三维物理写实渲染经验。精通 Photoshop (PS)、CINEMA 4D (C4D)、Autodesk 3ds Max 和 Illustrator (AI) 等核心设计套件。毕业于长沙航空职业技术学院飞机维修专业，工科背景赋予了我对三维立体空间、硬核机械建模与精密物理光影材质极其敏锐的技术直觉。深谙淘宝、天猫、京东、拼多多等主流电商平台的详情页深度定制、大促首页设计与商业主视觉策划，精通产品商业精修与拟真合成，致力于用顶级视觉拉升产品转化率与品牌溢价。",
    en: "Over 6 years of professional e-commerce design and photorealistic 3D rendering experience. Highly proficient in Photoshop, CINEMA 4D, Autodesk 3ds Max, and Illustrator. Graduated from Changsha Aeronautical Vocational and Technical College with a major in Aircraft Maintenance, an engineering background that equips me with sharp technical intuition for 3D spaces, complex industrial modeling, and physical lighting/textures. Expert in customizing high-converting product detail pages, promotional campaigns, and brand key visuals for major platforms like Taobao, Tmall, JD, and Pinduoduo, with master-level product retouching and compositing."
  },
  philosophy: {
    zh: "设计并非关于工具的堆砌，而是关于商业意图与美学载体的精确传达。电商设计更是理性逻辑与感性审美的极致结合。每一个详情页的排版、每一个三维光影的折射、每一处暗部阴影的呼吸感，都在悄无声息地向消费者诉说着产品的灵魂，在其视觉接触的零点一秒内击中心智、促成消费决策。",
    en: "Design is not about piling up tools, but the precise delivery of commercial intent and aesthetic vehicles. E-commerce design is the ultimate intersection of logical strategy and emotional beauty. Every single detail page typography, every refractive index in a 3D glass, and every soft breath in a drop shadow speaks to the customer's subconscious, capturing their hearts within a fraction of a second to trigger purchase decisions."
  },
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400", // High end portrait placeholder
  experienceYears: 6,
  email: "1162273294@qq.com",
  wechat: "ice-paper--",
  wechatQrCode: "/微信图片_20260706113809_21_2.jpg", // Custom real-time QR code generator URL
  redBookUrl: "#",
  redBookName: "文荟设计",
  zcoolUrl: "#",
  zcoolName: "黄文荟",
  behanceUrl: "#",
  behanceName: "wenhui_huang",
  resumeDownloadUrl: "#"
};

import { initialWorks } from './worksData';
export { initialWorks };


const defaultSkills: SkillItem[] = [
  {
    name: "Photoshop 高级精修与排版",
    proficiency: 95,
    category: "traditional",
    description: {
      zh: "精通商业级产品高阶精修、光影重塑、拟真合成、大促海报多层创意排版，对电商视觉表现有极强的把控力。",
      en: "Expert in high-end product retouching, lighting reconstruction, realistic composting, and multi-layered creative e-commerce typography."
    }
  },
  {
    name: "Cinema 4D 物理写实渲染",
    proficiency: 92,
    category: "traditional",
    description: {
      zh: "熟练掌握 C4D 概念建模、产品打光、Redshift / Octane 写实材质渲染与物理动力学，呈现极致的商品质感。",
      en: "Proficient in C4D concept modeling, lighting setups, Redshift/Octane photorealistic material rendering, and physics."
    }
  },
  {
    name: "Autodesk 3ds Max 场景建模",
    proficiency: 88,
    category: "traditional",
    description: {
      zh: "熟练运用 3ds Max 进行高精度硬表面建模、复杂家居场景搭建及物理材质灯光表现，呈现完美的空间张力。",
      en: "Adept at 3ds Max hard-surface modeling, complex furniture scene layout, and physical rendering to show perfect spatial depth."
    }
  },
  {
    name: "Illustrator 矢量图形与VI",
    proficiency: 90,
    category: "traditional",
    description: {
      zh: "精通矢量品牌图形插画、企业 VI 视觉系统定制、高精度海报排版及包装刀版与印刷输出工艺流程。",
      en: "Master of vector branding illustrations, corporate VI identity design, layout typography, and packaging prepress blueprints."
    }
  },
  {
    name: "电商全案详情页深度定制",
    proficiency: 95,
    category: "tech",
    description: {
      zh: "深谙各主流电商平台的高转化爆款设计逻辑，从卖点提炼、竞品分析到视觉风格定调、结构策划、渲染到精修一站式输出。",
      en: "Adept at high-converting e-commerce design logics, offering one-stop solutions from USP selling points, copy outline, styling to rendering."
    }
  }
];

const defaultExperiences: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2025.9 - 2025.11",
    role: {
      zh: "电商设计师",
      en: "E-commerce Designer"
    },
    company: {
      zh: "金运美科技",
      en: "Jinyunmei Technology"
    },
    description: {
      zh: "负责电商平台（APP/店铺）产品修图、详情页模板定制、活动促销首页制作、以及整体店铺风格打造、专业适配品牌企业和零售商需求",
      en: "Responsible for product image retouching, custom detail page templates, promotional event homepages, and overall shop visual branding on e-commerce platforms (apps/stores), professionally tailored to the needs of brand enterprises and retailers."
    },
    highlights: {
      zh: [
        "独立负责电商平台整体视觉风格升级，深度定制适配品牌与零售商差异化诉求的详情页模板",
        "主导核心爆款产品的高精度修图与促销物料视觉设计，显著提升高转化率主图的视觉质感"
      ],
      en: [
        "Independently led the visual style upgrade for e-commerce platforms, customizing detail page templates for diverse brand and retailer needs",
        "Spearheaded high-precision product image retouching and campaign visual assets to boost click-through and conversion rates"
      ]
    }
  },
  {
    id: "exp-2",
    period: "2023.12 - 2025.7",
    role: {
      zh: "电商设计师",
      en: "E-commerce Designer"
    },
    company: {
      zh: "易宠科技",
      en: "Epets Technology"
    },
    description: {
      zh: "负责活动促销首页及店铺(APP)等平台、提供产品修图，产品主题，详情页模板制定、banner 以及整体店铺风格打造",
      en: "Responsible for promotional event homepages and shop designs for apps. Provided product retouching, product themes, detail page template formulation, banners, and overall store branding."
    },
    highlights: {
      zh: [
        "负责大促活动（双十一、年货节等）店铺首页及APP专题活动页的主视觉风格设计",
        "定制多款高转化产品详情页模版及产品主题风格，打造兼具商业转化与艺术美感的品牌视觉"
      ],
      en: [
        "Designed main visual styles for mega-promotions (Double 11, CNY) across store homepages and app-specific campaign pages",
        "Formulated high-converting detail page templates and distinct product theme lines, merging retail conversion with clean design aesthetics"
      ]
    }
  },
  {
    id: "exp-3",
    period: "2021.9 - 2023.10",
    role: {
      zh: "视觉设计师",
      en: "Visual Designer"
    },
    company: {
      zh: "北京视达科",
      en: "Beijing Starcor"
    },
    description: {
      zh: "负责大屏panel页,推荐图、icon进行改版、移动智家中心的魔百和线上及线下平台、宣传海报、H5、朋友圈作图",
      en: "Responsible for redesigning big screen panel pages, recommendation graphics, and icons. Crafted promotional posters, H5 pages, and social media designs for Mobaihe online and offline platforms under the Mobile Smart Home Center."
    },
    highlights: {
      zh: [
        "主导IPTV大屏主页Panel及导航视觉系统升级，重构遥控器交互下的高清晰度图标与推荐图排版",
        "独立承接线上专题H5推广页、宣传海报及朋友圈宣发物料设计，确保多端分发视觉的高度一致性"
      ],
      en: [
        "Led the overhaul of IPTV home page panels and icon systems, optimizing layout and clarity for remote-controlled interfaces",
        "Independently created promotional H5 pages, print posters, and social graphics, maintaining a cohesive identity across diverse channels"
      ]
    }
  },
  {
    id: "exp-4",
    period: "2019.6 - 2021.7",
    role: {
      zh: "电商设计师",
      en: "E-commerce Designer"
    },
    company: {
      zh: "三文鱼电商",
      en: "Salmon E-commerce"
    },
    description: {
      zh: "负责店铺(淘宝、京东、拼多多)等平台提供产品修图、促销页面以及整体店铺风格打造、产品主题，banner，详情页模板制定",
      en: "Responsible for product image retouching, promotional pages, overall store styling, product themes, banner designs, and detail page template formulation across platforms such as Taobao, JD.com, and Pinduoduo."
    },
    highlights: {
      zh: [
        "完成跨平台多店铺的整体视觉形象建立与日常店铺促销页面、KV主视觉的升级维护",
        "制定统一的产品图修图规范与详情页组件化模板，大幅提升设计团队的日常上新输出效率"
      ],
      en: [
        "Established the overall visual brand identity and drove key visual upgrades for multi-platform e-commerce storefronts",
        "Formulated unified retouching guidelines and modular detail templates, significantly boosting asset production efficiency"
      ]
    }
  }
];

export const initialProfile: DesignerProfile = (customData && customData.profile) ? (customData.profile as any) : defaultProfile;
export const initialSkills: SkillItem[] = (customData && customData.skills) ? (customData.skills as any) : defaultSkills;
export const initialExperiences: ExperienceItem[] = (customData && customData.experiences) ? (customData.experiences as any) : defaultExperiences;
