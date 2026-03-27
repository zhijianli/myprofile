export const site = {
  brandTitle: "Mocuili's Profile",
  name: "Mocuili",
  title: "独立开发者",
  tagline: "我的目标是在疗愈与技术的交汇处，创建出能帮助他人的产品。",
  aboutPhoto: "/images/coding.png",
  aboutLead:
    "你好，很高兴认识你。我长居杭州。职业生涯从阿里巴巴天猫起步，担任 Java 开发工程师，曾作为较早一批开发者参与天猫超市建设，并从零搭建起初期的架构体系。此后在杭州心猫网络（心理咨询平台）任 Java 高级开发工程师，从零搭建心理测评类产品，并主导产品与研发。在杭州健海科技（医疗健康管理平台）历任研发经理，主导 AI 实验室，并从零构建 ASR 语音识别引擎。我持有国家三级心理咨询师证书，自 2017 年起参与心理危机干预志愿工作，对佛学与心理学有持续兴趣。近一年多来从事独立开发，覆盖产品设计、研发与推广。我希望在疗愈与技术的交汇处，综合运用两边的积累做出踏实有用的事。以下是我用到的一些技术：",
  aboutSkillColumns: [
    ["Java", "JavaScript", "React", "Kotlin"],
    ["Python", "Vue", "Flutter"],
  ],
  email: "mailto:you@example.com",
  social: [
    {
      label: "GitHub",
      href: "https://github.com/zhijianli",
      svg: "github" as const,
    },
    { label: "知乎", href: "https://www.zhihu.com/people/kong-hao-56-28", icon: "/images/zhihu.png" },
    { label: "豆瓣", href: "https://www.douban.com/people/46125148/", icon: "/images/douban.png" },
    {
      label: "小红书",
      href: "https://www.xiaohongshu.com/user/profile/66330c1b00000000070066d7?xsec_token=ABx4h6xx2X4Ll5EjLlcDlfd_E1_RXdAnLEBb7ZuRnvfqQ%3D&xsec_source=pc_search",
      icon: "/images/xiaohongshu-logo.svg",
      iconWhiteBackdrop: true,
    },
    {
      label: "微信",
      href: "#",
      icon: "/images/wechat-logo.svg",
      popupImage: "/images/wechat.png",
    },
  ] satisfies SocialLink[],
};

export type SocialLink =
  | {
      label: string;
      href: string;
      icon: string;
      svg?: undefined;
      popupImage?: string;
      /** 与图标同尺寸的白色衬底，logo 叠在上层 */
      iconWhiteBackdrop?: boolean;
    }
  | { label: string; href: string; svg: "github"; icon?: undefined };

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
};

export const projects: Project[] = [
  {
    title: "AI-SFBT",
    subtitle: "短焦咨询师",
    description:
      "基于焦点解决短期治疗（SFBT）技法开发的 AI 心理咨询助手。",
    image: "/images/sfbt.png",
    tags: ["AI", "React"],
    href: "https://supermarket.xwxinli.com/chat",
  },
  {
    title: "SONGJING",
    subtitle: "静心诵经",
    description: "跟随经文诵读，体会「空」的意涵。",
    image: "/images/lotus.png",
    tags: ["AI", "Python", "Flutter"],
    href: "http://songjing.menganhealth.cn/",
  },
  {
    title: "YUYI",
    subtitle: "羽衣",
    description: "依据阴阳五行，推荐每日适合的服饰配色。",
    image: "/images/羽衣.png",
    tags: ["AI", "Python", "UniApp"],
    href: "http://menganhealth.cn:9000/build/web/#/",
  },
];
