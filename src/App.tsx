import { useEffect, useState } from "react";
import { productVideos, projects, site, type SocialLink } from "./content";
import "./App.css";

const navItems = [
  { id: "about", label: "关于我" },
  { id: "videos", label: "产品视频" },
  { id: "projects", label: "项目" },
] as const;

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
          <div className="hero__grid">
            <div className="hero__copy">
              <p className="hero__hi">你好，我是</p>
              <h1 className="hero__name">{site.name}.</h1>
              <h2 className="hero__role">我是一名独立开发者。</h2>
              <p className="hero__tagline">{site.tagline}</p>
              <HeroSocialRow onOpenWechat={setLightboxSrc} />
            </div>
            <div className="hero__visual">
              <div className="hero__frame">
                <img src="/images/personal.png" alt="" className="hero__photo" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section section--about">
          <div className="section__inner section__inner--about">
            <h2 className="section__title section__title--about">关于我</h2>
            <div className="about about--split">
              <div className="about__avatar-wrap">
                <img
                  src={site.aboutPhoto}
                  alt=""
                  className="about__avatar"
                  width={220}
                  height={220}
                  loading="lazy"
                />
              </div>
              <div className="about__main">
                <p className="about__lead">{site.aboutLead}</p>
                <div className="about__skill-grid">
                  {site.aboutSkillColumns.map((col, colIndex) => (
                    <ul key={colIndex} className="about__skill-col">
                      {col.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="videos" className="section section--videos">
          <div className="section__inner">
            <h2 className="section__title">产品视频</h2>
            <p className="section__lead section__lead--videos">
              过去产品的一些演示与录屏，均在本地托管。
            </p>
            <ul className="video-list">
              {productVideos.map((v) => (
                <li key={v.file} className="video-card">
                  <div className="video-card__player">
                    <video
                      className="video-card__video"
                      controls
                      playsInline
                      preload="metadata"
                      src={videoPublicSrc(v.file)}
                    >
                      您的浏览器不支持 HTML5 视频。
                    </video>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="projects" className="section section--projects">
          <div className="section__inner">
            <h2 className="section__title">项目</h2>
            <ul className="project-list">
              {projects.map((p) => (
                <li key={p.title} className="project-card">
                  <div className="project-card__media">
                    <img src={p.image} alt="" loading="lazy" />
                  </div>
                  <div className="project-card__body">
                    <div className="project-card__tags">
                      {p.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="project-card__title">
                      {p.title}
                      {p.subtitle ? (
                        <span className="project-card__subtitle"> {p.subtitle}</span>
                      ) : null}
                    </h3>
                    <p className="project-card__desc">{p.description}</p>
                    <a
                      className="project-card__cta"
                      href={p.href}
                      {...(p.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      立即体验
                    </a>
                  </div>
                </li>
              ))}
            </ul>
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
          <p className="footer__copy">© {new Date().getFullYear()} 保留所有权利</p>
          <p className="footer__credit">用 ❤ 与 React 制作</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
