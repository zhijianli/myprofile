export const site = {
  brandTitle: "墨崔",
  name: "墨崔",
  title: "独立开发者",
  tagline:
    "我的60%是程序员，40%却是心理咨询师，因此我希望在疗愈与技术的交汇处，综合运用两边的积累，做出能帮助他人的产品。",
  aboutPhoto: "/images/coding.png",
  heroEyebrow: "独立开发者 · 杭州",
  heroTitle: "疗愈与技术的十字路口",
  heroTags: ["Java / Python", "心理咨询师", "React / Flutter", "AI 产品"],
  stats: [
    { value: "10+", label: "年技术经验" },
    { value: "8+", label: "年心理行业经验" },
    { value: "三级", label: "国家心理咨询师" },
    { value: "6+", label: "独立项目" },
  ],
  aboutIntro:
    "我现在觉得，很多事情规划不出来，叙事弧线是当生命中的各个事情发生之后自己串联剪辑出来的，貌似乔布斯在他那次著名的演讲中也讲过类似的观点。",
  aboutParagraphs: [
    "我长居杭州，职业生涯从阿里巴巴 Java 工程师起步，做过最出圈的产品是天猫超市，产品足够伟大，但我只是冗长流水线上的一颗螺丝钉，这段生涯对我最直接的意义是让我明白很多做事的逻辑与方法论，但当时的我并不明白自己到底想做什么。",
    "因此我开启了漫长的奥德赛时期，做过音乐平台，也做过条漫平台，这两样虽然都是我喜欢的东西，但一旦进入到深水区之后，我发现和里面的氛围格格不入，可能这些试错都是必经之路，但于我来说，正面反馈并不多。",
    "而在这段漫长的奥德赛时期，武志红提供了一个出口，让我遇见了心理咨询，并在后续的学习过程中得到了非常多的正面反馈，因此当时想着我可以尝试着走走心理咨询师这条道路，于是J人开始行动，在德瑞姆学了两年，考了国家心理咨询师三级，在杭州七院开始做危机干预热线，当时觉得挺顺的，觉得自己就是为这个事业而生的，殊不知当你这么想的时候，正是处在愚昧之巅的时候，然后，顺理成章就下滑到绝望之谷，发现自己对于直接做心理咨询师帮助他人，或许并不合适。",
    "然后，某日在云南大理洱海旁，忽然灵光一闪，想着既然我会技术，又学了那么久的心理学，为何不把这两者结合起来，在这两个领域的交叉地带做些事情呢。",
    "事情从这里开始有了转变，开始走上一条平稳之坡了，先在杭州心猫网络（心理咨询平台）从零搭建心理测评类产品，一段非常幸福的职业生涯，也让我知道从事自己所热爱的事业是什么感觉。而后，也在杭州健海科技（慢病健康管理平台）主导 AI 实验室并构建 ASR 语音识别引擎，这段时间稍微有点偏离自己的主题，但好在也学习了很多健康管理和AI的知识，也不算浪费，心理健康必将从单维度的心理咨询单兵作战转变到多维度的心理健康管理的持久战。",
    "接下来，三十五岁，一个临界值的年龄，决定跳出公司的晋升路径，追求一个人操盘一件事情的可能，这个可能也许是自己的产品，也许是与这个赛道的同行者合作开发相关产品，也有可能就不做研发的事情了，毕竟这块事情价值越来越低，不过疗愈这个核心是我一直想要坚持下去的，只要是围绕这件事，其他我保持开放态度。",
    "上面就是我大致的来时路了，这一路走来并没有取得太多亮眼的成绩，好在也没有遭受过多大的挫折，对于得到的东西我异常感恩，对于失去的东西我也并不舍得，只是人生不是只活在上半场，下半场还剩很多年（也许），还是希望有可以折腾的事情让我渡过这漫长而又丰满的一生。",
  ],
  credentials: [
    { title: "阿里巴巴 Java 工程师", desc: "参与天猫超市早期架构建设" },
    { title: "国家三级心理咨询师", desc: "中华人民共和国颁发，持证执业" },
    { title: "心理危机干预志愿者", desc: "自 2017 年起持续参与" },
    { title: "常驻杭州", desc: "专注于疗愈与技术的交汇" },
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

/** 对应 `public/videos/` 下的文件名；展示时会对路径做编码以支持空格等特殊字符 */
export type ProductVideo = {
  file: string;
};

export type SkillCard = {
  title: string;
  description: string;
  tags: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const skillCards: SkillCard[] = [
  {
    title: "后端开发",
    description: "阿里巴巴起步，主导过多平台架构",
    tags: ["Java", "Python"],
  },
  {
    title: "前端开发",
    description: "从心理测评类产品到独立 Web 应用",
    tags: ["React", "Vue", "JavaScript"],
  },
  {
    title: "移动端",
    description: "跨平台移动应用开发",
    tags: ["Flutter", "Kotlin", "小程序原生"],
  },
  {
    title: "人工智能",
    description: "曾主导杭州健海科技 AI 实验室",
    tags: ["ASR 语音识别", "Dify", "Coze"],
  },
];

export const productVideos: ProductVideo[] = [
  { file: "1.mp4" },
  { file: "2.mp4" },
  { file: "3.mp4" },
  { file: "4.mp4" },
  { file: "5.mp4" },
  { file: "6.mp4" },
];

export const projects: Project[] = [
  {
    title: "疗愈实验室 · 心悦",
    subtitle: "心理健康平台",
    description:
      "心悦旗下的心理健康应用超市，以「让心灵有所依托」为理念，为心理健康服务提供基础设施入口。",
    image: "/images/healing-lab-cover.png",
    tags: ["心理健康", "AI", "Web"],
    href: "https://supermarket.xwxinli.com/supermarket",
  },
  {
    title: "诵经 SONGJING",
    subtitle: "精神健康工具",
    description:
      "跟随经文诵读，体会「空」的意蕴。将佛学经典与 AI 语音技术结合，为用户提供沉浸式冥想诵读体验。",
    image: "/images/songjing-cover.png",
    tags: ["AI", "Python", "Flutter"],
    href: "http://songjing.menganhealth.cn/",
  },
  {
    title: "羽衣 YUYI",
    subtitle: "生活方式工具",
    description:
      "依照二十四节气与阳历推算，推荐每日适合的服饰颜色搭配。将中国传统时令智慧与现代审美结合。",
    image: "/images/yuyi-cover.png",
    tags: ["AI", "Python", "UniApp"],
    href: "http://menganhealth.cn:9000/build/web/#/",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "墨崔 是谁？",
    answer:
      "墨崔 是一位常驻杭州的独立开发者，职业生涯从阿里巴巴 Java 工程师起步，曾参与天猫超市早期建设，后来持续在心理健康、医疗健康与 AI 产品方向工作。",
  },
  {
    question: "墨崔 专注于哪些技术领域？",
    answer:
      "主要覆盖 Java、Python、React、Vue、Flutter、UniApp、ASR 语音识别、Dify 工作流与 AI 产品设计。",
  },
  {
    question: "墨崔 有哪些心理健康资质？",
    answer:
      "持有国家三级心理咨询师证书，并自 2017 年起持续参与心理危机干预志愿工作。",
  },
  {
    question: "墨崔 目前开发了哪些产品？",
    answer:
      "目前重点产品包括疗愈实验室 · 心悦、诵经 SONGJING、羽衣 YUYI 等，方向集中在心理健康、精神健康工具与生活方式应用。",
  },
  {
    question: "如何与 墨崔 合作或联系？",
    answer:
      "可以通过页面中的 GitHub、知乎、豆瓣、小红书或微信入口联系，适合围绕疗愈、心理健康、AI 与独立产品展开合作。",
  },
  {
    question: "墨崔 的产品理念是什么？",
    answer:
      "在疗愈与技术的十字路口，综合运用工程、心理学、佛学与产品经验，做出踏实、有用、能帮助他人的产品。",
  },
];
