/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DesignerProfile, PortfolioWork, SkillItem, ExperienceItem } from './types';

export const initialProfile: DesignerProfile = {
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


export const initialSkills: SkillItem[] = [
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

export const initialExperiences: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2023.08 - 2024.08",
    role: {
      zh: "渲染设计师",
      en: "3D Rendering Designer"
    },
    company: {
      zh: "重庆三文鱼电子商务有限公司",
      en: "Chongqing Salmon E-commerce Co., Ltd."
    },
    description: {
      zh: "负责公司3D产品效果图渲染、场景搭建、灯光质感表现及后期精修。与策划、运营团队密切配合，完成核心主图、详情页及促销海报的视觉落地，大幅提升产品转化率。",
      en: "Responsible for 3D product rendering, scene design, lighting, material texture modeling, and high-end photo retouching. Partnered with marketing and operations to execute core main images, details pages, and promotional banners, significantly boosting sales conversion rates."
    },
    highlights: {
      zh: [
        "主导3D化妆品、3D智能家居品类的光影物理搭建与精细化质感渲染",
        "与视觉设计团队深度协作，主导爆款产品详情页中的核心三维渲染视觉呈现",
        "建立并维护三维产品高精度模型库，提效日常渲染与合成产出流程"
      ],
      en: [
        "Led lighting setups and premium material rendering for 3D cosmetics and smart home devices",
        "Collaborated with visual designers to execute core 3D imagery for highly successful detail pages",
        "Built and maintained a high-precision 3D asset library to accelerate rendering and compositing workflows"
      ]
    }
  },
  {
    id: "exp-2",
    period: "2021.05 - 2023.05",
    role: {
      zh: "视觉设计师",
      en: "Visual Designer"
    },
    company: {
      zh: "北京视达科科技有限公司重庆分公司",
      en: "Beijing Starcor Technology Co., Ltd. (Chongqing Branch)"
    },
    description: {
      zh: "负责IPTV/OTT等电视终端界面设计、大屏UI/UX交互视觉以及配套宣传物料设计。参与品牌VI升级和活动主视觉策划，确保多终端视觉体验的一致性与高质感。",
      en: "Responsible for IPTV/OTT television interface design, big-screen UI/UX interactive visuals, and marketing materials. Contributed to brand identity (VI) upgrades and core campaign key visuals to guarantee a high-end, consistent multi-terminal user experience."
    },
    highlights: {
      zh: [
        "主导多个省份广电IPTV大屏UI界面改版，在保持遥控器操作易用性的同时赋予极致视觉质感",
        "负责各类线上专题活动主视觉及大屏动态视觉系统开发，具备出色的巨幅物料延展控制力",
        "参与北京视达科重庆团队的品牌视觉体系重构，产出标准化设计规范手册"
      ],
      en: [
        "Led UI redesigns for IPTV big screens across multiple provinces, delivering premium visuals optimized for remote controls",
        "Designed main visual packages for featured online campaign keynotes and television dynamic displays",
        "Contributed to branding system restructuring and produced standardized design guidelines"
      ]
    }
  },
  {
    id: "exp-3",
    period: "2019.03 - 2021.03",
    role: {
      zh: "资深美工 / 视觉设计师",
      en: "Senior E-commerce Visual Designer"
    },
    company: {
      zh: "重庆易宠科技有限公司",
      en: "Chongqing Epets Technology Co., Ltd."
    },
    description: {
      zh: "负责宠物用品、宠物食品等自主品牌及代理品牌的电商全案视觉设计。主导双十一、年货节等大型S级大促活动店铺首页、详情页及推广图的设计，具备极强的电商视觉把控和爆款打造经验。",
      en: "Managed full-service e-commerce visual designs for proprietary pet care brands and licensed distributors. Guided S-level shopping festivals (e.g., Double 11, Chinese New Year Festival), customizing homepages, detail sections, and ad banners with outstanding conversion power."
    },
    highlights: {
      zh: [
        "主导开发并沉淀了多个自主高端宠粮品牌的整套电商详情页视觉模版，建立极富吸引力的自然亲和质感",
        "负责双十一、双十二、年货节大促周期的多渠道全套推广视觉系统，助力大促GMV破千万",
        "精通宠物食品及用品的高级商业修图与拟真合成，极大提升了产品的轻奢高级感"
      ],
      en: [
        "Led and standardized visual templates for premium pet food detail pages, evoking natural organic warmth",
        "Designed multi-channel visual assets for mega-promos (Double 11, 12, CNY) supporting massive GMV milestones",
        "Expert in professional commercial photo retouching and hyper-realistic pet product composites"
      ]
    }
  },
  {
    id: "exp-4",
    period: "2018.06 - 2019.01",
    role: {
      zh: "美工 / 平面设计师",
      en: "E-commerce Graphic Designer"
    },
    company: {
      zh: "深圳市金运美科技有限公司",
      en: "Shenzhen Jinyunmei Technology Co., Ltd."
    },
    description: {
      zh: "负责数码配件产品精修、主图排版、基础详情页制作。协助团队完成日常活动图、详情页更新以及跨境电商平台（Amazon、eBay）的图片优化。",
      en: "Responsible for digital accessories professional photo retouching, core product cards, and basic details pages. Assisted in daily updates, promotional graphics, and optimization for global platforms (Amazon, eBay)."
    },
    highlights: {
      zh: [
        "负责数码充电头、充电线、蓝牙耳机等3C配件的高质量精修，大幅消除塑料感，突出金属与科技光影",
        "优化Amazon/eBay平台Listing首图及A+页面视觉排版，使其符合海外消费者极简、理性的读图习惯"
      ],
      en: [
        "Executed high-quality retouching for 3C products, transforming cheap plastic materials into sleek metallic finishes",
        "Optimized Amazon/eBay listing cards and A+ detail pages tailored for international minimalist visual habits"
      ]
    }
  }
];
