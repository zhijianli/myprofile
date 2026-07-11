import { useEffect, useState } from "react";
import {
  faqs,
  productVideos,
  projects,
  site,
  skillCards,
  type SocialLink,
} from "./content";
import "./App.css";

const navItems = [
  { id: "about", label: "关于我" },
  { id: "skills", label: "技术栈" },
  { id: "videos", label: "产品视频" },
  { id: "projects", label: "项目" },
  { id: "faq", label: "常见问题" },
] as const;

const videoMeta = [
  { title: "疗愈实验室·心悦", subtitle: "产品演示", duration: "0:09" },
  { title: "颂经 SONGJING", subtitle: "诵读体验", duration: "0:08" },
  { title: "御衣 YUYI", subtitle: "节气配色", duration: "0:17" },
  { title: "心悦 · 功能走览", subtitle: "操作录屏", duration: "0:09" },
  { title: "颂经 · 完整流程", subtitle: "用户体验", duration: "0:37" },
  { title: "御衣 · 日常使用", subtitle: "生活场景", duration: "0:51" },
];

function videoPublicSrc(file: string): string {
  return `/videos/${encodeURIComponent(file)}`;
}

function SocialGlyph({ link }: { link: SocialLink }) {
  if ("svg" in link && link.svg === "github") {
    return (
      <svg className="social__svg" width={28} height={28} viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.378.203 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
        />
      </svg>
    );
  }
  if ("icon" in link) {
    if (link.iconWhiteBackdrop) {
      return (
        <span className="social__glyph social__glyph--white-back">
          <img src={link.icon} alt="" width={28} height={28} />
        </span>
      );
    }
    return <img src={link.icon} alt="" width={28} height={28} />;
  }
  return null;
}

function HeroSocialRow({ onOpenWechat }: { onOpenWechat: (src: string) => void }) {
  return (
    <ul className="social social--in-hero">
      {site.social.map((s) => {
        const popupImage = "popupImage" in s && s.popupImage ? s.popupImage : null;
        if (popupImage) {
          return (
            <li key={`${s.label}-${s.href}`}>
              <button
                type="button"
                className="social__link social__link--popup"
                onClick={() => onOpenWechat(popupImage)}
              >
                <SocialGlyph link={s} />
                <span>{s.label}</span>
              </button>
            </li>
          );
        }
        const isPlaceholder = s.href === "#";
        return (
          <li key={`${s.label}-${s.href}`}>
            <a
              className="social__link"
              href={s.href}
              {...(isPlaceholder
                ? {
                    onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
                      e.preventDefault(),
                  }
                : { target: "_blank", rel: "noreferrer" })}
            >
              <SocialGlyph link={s} />
              <span>{s.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(() => new Set());

  const markVideoPlaying = (file: string, playing: boolean) => {
    setPlayingVideos((current) => {
      const next = new Set(current);
      if (playing) {
        next.add(file);
      } else {
        next.delete(file);
      }
      return next;
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightboxSrc ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, lightboxSrc]);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxSrc(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxSrc]);

  return (
    <div className="page">
      <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="brand__text">{site.brandTitle}</span>
        </a>
        <button
          type="button"
          className={`nav-toggle ${menuOpen ? "nav-toggle--open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          aria-label="切换导航"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
        <nav
          id="site-nav"
          className={`nav ${menuOpen ? "nav--open" : ""}`}
          aria-label="主导航"
        >
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              className="nav__link"
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      {menuOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="关闭菜单"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <main id="top">
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__copy">
              <p className="eyebrow hero__eyebrow">{site.heroEyebrow}</p>
              <h1 className="hero__name">{site.name}</h1>
              <h2 className="hero__role">{site.heroTitle}</h2>
              <p className="hero__tagline">{site.tagline}</p>
              <ul className="pill-list" aria-label="核心标签">
                {site.heroTags.map((tag) => (
                  <li key={tag} className="pill">
                    {tag}
                  </li>
                ))}
              </ul>
              <HeroSocialRow onOpenWechat={setLightboxSrc} />
            </div>
            <dl className="stat-grid" aria-label="个人概览">
              {site.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="stat-card">
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="section section--about">
          <div className="section__inner">
            <div className="section-grid">
              <div className="section-copy">
                <SectionHeading index="01" label="关于我" title="站在十字路口之前" />
                <p className="about__intro">{site.aboutIntro}</p>
                <div
                  className={`about__story ${aboutExpanded ? "about__story--expanded" : ""}`}
                  id="about-story"
                  aria-hidden={!aboutExpanded}
                >
                  <div className="about__story-inner">
                    <div className="about__text">
                      {site.aboutParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="about__toggle"
                  aria-expanded={aboutExpanded}
                  aria-controls="about-story"
                  onClick={() => setAboutExpanded((expanded) => !expanded)}
                >
                  <svg
                    className="about__toggle-icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    aria-hidden
                  >
                    <path
                      d={
                        aboutExpanded
                          ? "M3.5 9.25 7.5 5.25l4 4"
                          : "M3.5 5.75 7.5 9.75l4-4"
                      }
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {aboutExpanded ? "收起" : "展开完整故事"}
                </button>
              </div>
              <aside className="credential-panel" aria-label="核心资质">
                <h3>核心资质</h3>
                <ul>
                  {site.credentials.map((item) => (
                    <li key={item.title} className="credential-card">
                      <span className="credential-card__icon" aria-hidden>
                        ◆
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.desc}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section__inner">
            <SectionHeading index="02" label="技术专长" title="全栈能力 · 跨领域应用" />
            <ul className="skill-list">
              {skillCards.map((skill) => (
                <li key={skill.title} className="skill-card">
                  <span className="skill-card__icon" aria-hidden>
                    ✦
                  </span>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  <ul className="chip-list" aria-label={`${skill.title} 技术`}>
                    {skill.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="videos" className="section section--videos">
          <div className="section__inner">
            <SectionHeading index="03" label="产品视频" title="产品演示与录屏" />
            <p className="section__lead">过去产品的一些演示与录屏，展示实际运行效果。</p>
            <ul className="video-list">
              {productVideos.map((v, index) => (
                <li
                  key={v.file}
                  className={`video-card ${
                    playingVideos.has(v.file) ? "video-card--playing" : ""
                  }`}
                >
                  <div className="video-card__player">
                    <video
                      className="video-card__video"
                      controls
                      playsInline
                      preload="metadata"
                      src={videoPublicSrc(v.file)}
                      onPlay={() => markVideoPlaying(v.file, true)}
                      onPause={() => markVideoPlaying(v.file, false)}
                      onEnded={() => markVideoPlaying(v.file, false)}
                    >
                      您的浏览器不支持 HTML5 视频。
                    </video>
                    <div className="video-card__overlay" aria-hidden>
                      <span className="video-card__play">▶</span>
                      <strong>{videoMeta[index]?.title ?? `产品视频 ${index + 1}`}</strong>
                      <small>{videoMeta[index]?.subtitle ?? "产品演示"}</small>
                    </div>
                    <span className="video-card__duration">
                      {videoMeta[index]?.duration ?? ""}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="projects" className="section section--projects">
          <div className="section__inner">
            <SectionHeading
              index="04"
              label="独立产品"
              title="在疗愈与技术之间构建的作品"
            />
            <ul className="project-list">
              {projects.map((p, index) => (
                <li key={p.title} className="project-card">
                  <div className="project-card__index">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="project-card__body">
                    <div className="project-card__heading">
                      <h3 className="project-card__title">{p.title}</h3>
                      <span className="project-card__subtitle">{p.subtitle}</span>
                    </div>
                    <p className="project-card__kicker">
                      {index === 0
                        ? "心理健康应用超市"
                        : index === 1
                          ? "数字化佛学诵读应用"
                          : "节气服饰色彩推荐"}
                    </p>
                    <p className="project-card__desc">{p.description}</p>
                    <ul className="chip-list project-card__tags" aria-label={`${p.title} 标签`}>
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    className="project-card__cta"
                    href={p.href}
                    {...(p.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    立即体验 <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="section section--faq">
          <div className="section__inner">
            <SectionHeading index="05" label="常见问题" title="关于 墨崔 的常见问题" />
            <p className="section__lead">
              以下信息有助于 AI 助手、搜索引擎更准确地理解与引用 墨崔 的工作。
            </p>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="faq-item" open={index === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {lightboxSrc ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="微信二维码"
        >
          <button
            type="button"
            className="lightbox__backdrop"
            aria-label="关闭"
            onClick={() => setLightboxSrc(null)}
          />
          <div className="lightbox__panel">
            <button
              type="button"
              className="lightbox__close"
              aria-label="关闭"
              onClick={() => setLightboxSrc(null)}
            >
              ×
            </button>
            <img
              className="lightbox__img"
              src={lightboxSrc}
              alt="微信二维码"
            />
          </div>
        </div>
      ) : null}

      <footer className="footer">
        <div className="footer__inner">
          <div>
            <p className="footer__copy">墨崔 · 独立开发者</p>
            <p className="footer__credit">疗愈 × 技术 · 常驻杭州 · 2026</p>
          </div>
          <HeroSocialRow onOpenWechat={setLightboxSrc} />
          <p className="footer__copy">© {new Date().getFullYear()} 版权所有</p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-label">
        <span>{index}</span>
        <i aria-hidden />
        <span>{label}</span>
      </div>
      <h2>{title}</h2>
    </div>
  );
}

export default App;
