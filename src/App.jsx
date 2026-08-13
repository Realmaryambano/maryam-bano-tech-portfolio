import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail, Phone, MapPin, Sun, Moon, X, ArrowUpRight,
  ArrowDown, Leaf, BarChart3, GraduationCap, Briefcase,
  ShoppingCart, Globe, Award, Sparkles, Code2, ChevronUp, ExternalLink,
  Users, Download, ImagePlus, Cpu, Layers, ChevronDown, Rocket, Database,
  Play, Star, MessageSquareQuote, Bot, Gift, Wallet,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

/* ---------------------------------------------------------------------- */
/* DATA                                                                    */
/* ---------------------------------------------------------------------- */
/*
  IMAGES
  -------------------------------------------------
  All images below point to files inside an "images" folder that sits
  alongside this component (e.g. /public/images/... in Next.js, or
  src/images/... if you're importing them as modules — just swap the
  string paths for your real imports/paths).

  Folder structure assumed:
    images/
      hero-photo.jpg
      about-photo.jpg
      about-work-1.jpg
      about-work-2.jpg
      projects/
        mariame.jpg
        analytics.jpg
        payroll-hub.jpg
        retail-chatbot.jpg
        birthday-site.jpg
        bu-clone.jpg

  Replace any of these paths with your real filenames whenever you have
  the actual assets — no other code changes needed.
*/

const IMAGES = {
  heroPhoto: "images/her-photo.png",
  aboutPhoto: "images/hero-photo.png",
  aboutWork1: "images/working_at_office 1.png",
  aboutWork2: "images/about-work-2.png",
};

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  {
    id: "technology", label: "Technology",
    children: [
      { id: "ai-engineering", label: "AI Engineering", icon: Cpu },
      { id: "fullstack", label: "Full-Stack Dev", icon: Layers },
      { id: "projects", label: "Projects", icon: Code2 },
      { id: "skills", label: "Skills", icon: Sparkles },
      { id: "certs-education", label: "Certificates & Education", icon: Award },
    ],
  },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const TOP_LEVEL_IDS = NAV_ITEMS.map((n) => n.id);

const EXPERIENCE_PROJECTS = [
  {
    id: "ecms",
    title: "Employee Complaint Management System (ECMS)",
    tag: "Internship · Bonanza Satrangi",
    accent: "blue",
    icon: Users,
    blurb: "An internal complaint tracker built for a real company, login to reporting.",
    description:
      "A Flask + Oracle Database platform built during my internship at Bonanza Satrangi — role-based login for employees and IT/admin, a complaint submission form with category, priority, and file attachments, live status tracking, dashboards with complaint stats, and reports exportable to PDF or Excel across flexible date-range filters.",
    tech: ["Flask", "Oracle Database", "oracledb", "ReportLab", "openpyxl", "Jinja2"],
    highlight: "Role-based dashboards with PDF/Excel export reporting",
    demoUrl: "",
    githubUrl: "https://github.com/Realmaryambano/Employee-Complaint-Management-System",
    image: "images/ecms.png",
  },
  {
    id: "gift-voucher",
    title: "Gift Voucher Report Generation System",
    tag: "Internship · Bonanza Satrangi",
    accent: "teal",
    icon: Award,
    blurb: "Excel in, Oracle in between, branded PDF vouchers out.",
    description:
      "An internal voucher management tool built during my internship — authorized users upload voucher batches via Excel straight into an Oracle database, then generate branded, multi-page PDF voucher reports by batch number or a specific voucher-code range, powered by JasperReports wired into a Flask + Java 21 backend.",
    tech: ["Flask", "Oracle Database", "JasperReports", "Java 21", "pandas", "openpyxl"],
    highlight: "JasperReports + Java 21 wired straight into Flask",
    demoUrl: "",
    githubUrl: "https://github.com/Realmaryambano/gift-voucher-report-generation-system",
    image: "images/gift-voucher.png",
  },
  {
    id: "retail-chatbot",
    title: "Retail Sales AI Chatbot",
    tag: "Internship · Bonanza Satrangi",
    accent: "coral",
    icon: Bot,
    blurb: "Ask plain-English questions, get instant retail sales answers.",
    description:
      "An AI-powered Streamlit dashboard built during my internship for Bonanza Satrangi's retail sales data — ask plain-English questions and get instant answers on top stores, best-selling categories, and daily sales trends, powered by an LLM layered on top of Pandas-driven analytics and data visualization.",
    tech: ["Python", "NLP", "Streamlit", "Pandas", "Data Visualization"],
    highlight: "Plain-English querying over live retail sales data",
    demoUrl: "",
    githubUrl: "https://github.com/Realmaryambano/Retail-Sales-AI-Chatbot",
    image: "images/projects/retail-chatbot.jpg",
  },
];

const PROJECTS = [
  {
    id: "mariame",
    title: "Mariame Plants Ecosystem",
    tag: "Freelance · E-commerce",
    accent: "teal",
    icon: Leaf,
    blurb: "A full botanical storefront, built solo, top to bottom. A complete e-commerce experience.",
    description:
      "A complete e-commerce platform for a plant brand — product catalog with category filters, session-based cart, and a checkout flow that persists orders straight to a database. Every purchase auto-generates a branded PDF invoice, and Resend fires off order + contact-form emails the moment they land.",
    tech: ["Flask", "SQLAlchemy", "SQLite", "ReportLab", "Resend API", "HTML5/CSS3"],
    highlight: "Live on Vercel with a dark, responsive UI",
    demoUrl: "https://mariame-plants.vercel.app/",
    githubUrl: "https://github.com/Realmaryambano/mariame-plants",
    image: "images/plants.png",
  },
  {
    id: "analytics",
    title: "E-Commerce Analytics & ML Dashboard",
    tag: "Data Science",
    accent: "violet",
    icon: BarChart3,
    blurb: "Scraped it, cleaned it, modeled it, shipped a dashboard.",
    description:
      "An end-to-end pipeline: Selenium scrapes live e-commerce listings, Pandas/NumPy handle the cleanup and EDA, PCA trims the noise, and Scikit-learn models the pricing patterns. All of it surfaces in an interactive Streamlit dashboard with Plotly charts for digging into product and price trends.",
    tech: ["Python", "Selenium", "Scikit-learn", "Streamlit", "Plotly"],
    highlight: "Interactive Plotly visualizations, live-filterable",
    githubUrl: "https://github.com/Realmaryambano/E-Commerce-Product-Analytics-Machine-Learning-Dashboard",
    image: "images/analytics.png",
  },
  {
    id: "payroll-hub",
    title: "Enterprise Payroll Hub",
    tag: "Production-Ready Web App",
    accent: "amber",
    icon: Wallet,
    blurb: "A production-ready payroll system, from clock-in to compliant payslip.",
    description:
      "A production-ready enterprise payroll management web application — automated payslip generation, attendance tracking, and configurable corporate salary structures, built with a modern Next.js + TypeScript stack and styled with Tailwind CSS for a clean, responsive admin experience.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    highlight: "Automated payslips + configurable corporate pay structures",
    demoUrl: "",
    githubUrl: "https://github.com/Realmaryambano/enterprise-payroll-hub",
    image: "images/projects/payroll-hub.jpg",
  },
  {
    id: "all-versions-of-women",
    title: "All Versions of Women",
    tag: "TypeScript · Private Repo",
    accent: "violet",
    icon: Sparkles,
    blurb: "A TypeScript project exploring the many facets of womanhood.",
    description:
      "A TypeScript-built project centered on the many versions and facets of womanhood. It's a private repository, so the code isn't public — reach out for more details on what's inside.",
    tech: ["TypeScript", "React"],
    highlight: "Private repo — details available on request",
    demoUrl: "",
    githubUrl: "https://github.com/Realmaryambano/all-versions-of-women",
    image: "images/projects/all-versions-of-women.jpg",
  },
  {
    id: "birthday-site",
    title: "Happy Birthday, Dear Shemaa",
    tag: "Creative Coding",
    accent: "pink",
    icon: Gift,
    blurb: "A handcrafted multi-page birthday scrapbook, built for a friend.",
    description:
      "A handcrafted multi-page birthday scrapbook website built with HTML, CSS, and JavaScript to celebrate a friend's birthday — animations, memories, and personalized designs woven into a warm, playful multi-page experience.",
    tech: ["HTML5", "CSS3", "JavaScript", "Animations"],
    highlight: "Playful multi-page scrapbook with custom animations",
    demoUrl: "",
    githubUrl: "https://github.com/Realmaryambano/Happy-Birthday-Dear-Shemaa",
    image: "images/projects/birthday-site.jpg",
  },
  {
    id: "bu-clone",
    title: "Bahria University Website Clone",
    tag: "Frontend",
    accent: "blue",
    icon: Globe,
    blurb: "A pixel-chasing, fully responsive rebuild from scratch.",
    description:
      "A multi-page static rebuild of the university site — responsive layouts, interactive components, and cross-browser polish, done with an eye for clean UI/UX fundamentals.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    highlight: "Fully responsive, multi-page, zero frameworks",
    demoUrl: "https://bahriauniversityclone.netlify.app/",
    githubUrl: "https://github.com/Realmaryambano/Bahria-University-Website-Clone",
    image: "images/bahria.png",
  },
];

const EDUCATION = [
  { school: "Bahria University, Karachi Campus", degree: "Bachelor of Computer Science", period: "Sep 2023 — Dec 2027", note: "Currently in progress" },
  { school: "Bahria College NORE 1, Karachi", degree: "Intermediate in Computer Science", period: "Sep 2021 — Jul 2023", note: "Position Holder" },
];

const EXPERIENCE = {
  company: "Bonanza Satrangi",
  role: "IT Intern",
  period: "Jul 2026 — Aug 2026",
  description: "Worked on internal tools for complaint management and voucher reporting, using Flask and Oracle Database. Developed role-based dashboards and automated report generation.",
};

const SKILLS = [
  { group: "Languages", items: ["Python", "C++","React", "JavaScript", "TypeScript", "Java", "HTML", "CSS", "Tailwind CSS"] },
  { group: "Web & Backend", items: ["Flask", "Django", "Next.js", "SQLAlchemy", "Jinja2", "REST APIs", "Resend API"] },
  { group: "Databases", items: ["Oracle Database", "PostgreSQL","MongoDB", "MySQL", "SQLite", "SQL Server", "MS Access"] },
  { group: "AI & ML", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow"] },
  { group: "Reporting & Tools", items: ["ReportLab", "Visual Studio Code", "JasperReports", "openpyxl", "Git", "GitHub", "Jupyter"] },
];

const CERTS = [
  { title: "NCEAC-HEC Generative AI Training", org: "Pak Angels · Cohort 3", detail: "Top Performer — 97.25% final score. Generative AI, advanced Python, AI application development.", icon: Sparkles, accent: "violet" },
  { title: "DataCamp Full Scholarship", org: "Bahria University Developer Society", detail: "One full year of Data Science & Analytics tracks — data analysis, Python, machine learning.", icon: Award, accent: "teal" },
  { title: "Governor Sindh GenAI, Web3 & Metaverse Initiative", org: "2023 — Present", detail: "Agentic AI, advanced Python, TypeScript, Next.js, Tailwind CSS.", icon: Code2, accent: "amber" },
  { title: "Code in Dark & Speed Programming", org: "Bahria University", detail: "Competition certificates for fast, no-autocomplete, under-pressure coding.", icon: Users, accent: "coral" },
];

// Big scrollable year strip above the Certificates & Education timeline.
const TIMELINE_YEARS = [2021, 2022, 2023, 2024, 2025, 2026, 2027];

const STATS = [
  { label: "Projects shipped", value: 56, suffix: "+", icon: Rocket },
  { label: "LinkedIn followers", value: 3000, suffix: "+", icon: Users },
  { label: "Certifications earned", value: 10, suffix: "+", icon: Award },
  { label: "Top-performer score", value: 97, suffix: "%", icon: Sparkles },
  { label: "Databases wrangled", value: 5, suffix: "+", icon: Database },
];

const TESTIMONIALS = [
  {
    quote: "Working with Maryam was an excellent experience from start to finish. She took the time to understand exactly what I needed, communicated clearly throughout the project, and was always open to feedback and improvements. What impressed me most was her ability to turn a general idea into a polished, functional, and professional-looking solution. She was reliable, detail-oriented, and genuinely invested in delivering quality work rather than simply completing the task. I would definitely recommend Maryam to anyone looking for a skilled and dedicated developer.",
    name: "Daniel Anderson",
    role: "Freelance client",
  },
  {
    quote: "Maryam has demonstrated impressive dedication, curiosity, and consistency in her work. She approaches technical challenges with a problem-solving mindset and is not afraid to explore new technologies when a project requires them. Her ability to learn quickly and apply what she learns to real-world projects is one of her strongest qualities. She also pays close attention to the user experience and overall quality of her work. I have been particularly impressed by her growth as a developer and her willingness to continuously improve her skills.",
    name: "Muhammad Ali Khan",
    role: "Mentor · Instructor",
  },
  {
    quote: "Working alongside Maryam was a great experience. She is someone who takes responsibility for her work and makes sure that tasks are completed properly rather than simply checking them off a list. She brings creative ideas to the table, communicates well with the team, and is always willing to help when someone is facing a technical challenge. Her combination of technical ability, attention to detail, and positive attitude made collaboration much easier. I would be happy to work with her again on future projects.",
    name: "Samia Abubakar",
    role: "Teammate · Colleague",
  },
  {
    quote: "Maryam is a highly motivated and talented developer who consistently demonstrates a strong commitment to learning and professional growth. She has a solid foundation in full-stack development and AI-related technologies and has an impressive ability to transform ideas into practical, well-designed applications. Her work reflects both technical knowledge and creativity, while her willingness to take on challenges shows strong potential for continued growth. I would confidently recommend Maryam to any team or client looking for someone who is hardworking, adaptable, and passionate about building meaningful technology solutions.",
    name: "James Mitchell",
    role: "LinkedIn recommendation",
  },
];

const TICKER_TAGS = [
  "Python", "Flask", "Django", "Next.js", "TypeScript", "Oracle Database",
  "Scikit-learn", "TensorFlow", "Open to freelance", "97.25% Top Performer",
  "REST APIs", "Machine Learning", "SQL Server", "JasperReports",
];
const TICKER_TAGS_2 = [
  "Full-Stack Developer", "Karachi, Pakistan", "Data Science", "Generative AI",
  "Pandas · NumPy", "E-commerce Builds", "Bahria University", "Freelancer",
  "Report Automation", "AI Enthusiast",
];

const HERO_TAGS = [
  { label: "Python", top: "2%", left: "-14%", rot: -8, accent: "teal" },
  { label: "Flask", top: "78%", left: "-10%", rot: 6, accent: "coral" },
  { label: "AI / ML", top: "8%", left: "88%", rot: 9, accent: "violet" },
  { label: "Next.js", top: "84%", left: "80%", rot: -7, accent: "amber" },
  { label: "Oracle DB", top: "44%", left: "94%", rot: 4, accent: "blue" },
  { label: "Freelance", top: "50%", left: "-18%", rot: -4, accent: "pink" },
];

// Small ambient icons scattered through non-hero sections so the whole
// page feels illustrated rather than just the hero.
const DRIFT_ICON_SETS = {
  about: [
    { Icon: Code2, top: "8%", left: "6%", accent: "violet", size: 18 },
    { Icon: Sparkles, top: "70%", left: "2%", accent: "coral", size: 16 },
    { Icon: Database, top: "18%", left: "94%", accent: "teal", size: 18 },
    { Icon: Rocket, top: "75%", left: "92%", accent: "amber", size: 18 },
  ],
  contact: [
    { Icon: Mail, top: "10%", left: "4%", accent: "violet", size: 18 },
    { Icon: Sparkles, top: "80%", left: "8%", accent: "amber", size: 16 },
    { Icon: Globe, top: "15%", left: "92%", accent: "teal", size: 18 },
    { Icon: Phone, top: "78%", left: "94%", accent: "coral", size: 16 },
  ],
};

const SOCIALS = [
  { label: "GitHub", value: "github.com/Realmaryambano", href: "https://github.com/Realmaryambano", icon: FaGithub },
  { label: "LinkedIn", value: "linkedin.com/in/realmaryambano", href: "https://linkedin.com/in/realmaryambano", icon: FaLinkedin },
  { label: "Email", value: "maryambano.official@gmail.com", href: "mailto:maryambano.official@gmail.com", icon: Mail },
  { label: "Phone", value: "+92 333 2119480", href: "tel:+923332119480", icon: Phone },
];

const RESUME_HREF = "/resume.pdf"; // host Maryam_Bano_Resume.pdf here (e.g. Next.js /public folder) or swap for your hosted link

/* ---------------------------------------------------------------------- */
/* HOOKS                                                                   */
/* ---------------------------------------------------------------------- */

function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "", variant = "up", as: Tag = "div", ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${inView ? "reveal--in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function SplitHeadline({ text, className = "", as: Tag = "h2" }) {
  const [ref, inView] = useInView(0.35);
  const tokens = text.match(/\*[^*]+\*|\S+/g) || [];
  return (
    <Tag ref={ref} className={`split-headline ${className}`}>
      {tokens.map((tok, i) => {
        const accent = tok.startsWith("*") && tok.endsWith("*");
        const label = accent ? tok.slice(1, -1) : tok;
        return (
          <span className="split-headline__mask" key={i}>
            <span
              className={`split-headline__word ${inView ? "split-headline__word--in" : ""} ${accent ? "split-headline__word--accent" : ""}`}
              style={{ transitionDelay: inView ? `${i * 55}ms` : "0ms" }}
            >
              {label}
            </span>
            {i < tokens.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
}

function Marquee({ items, speed = 26, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className={`marquee__track ${reverse ? "marquee__track--reverse" : ""}`} style={{ animationDuration: `${speed}s` }}>
        {doubled.map((t, i) => (
          <span className="marquee__item" key={i}>
            <span className="marquee__dot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// Ambient floating icons dropped into the background of a section.
function DriftIcons({ set }) {
  const icons = DRIFT_ICON_SETS[set] || [];
  return (
    <div className="drift-icons" aria-hidden="true">
      {icons.map((d, i) => (
        <span
          key={i}
          className={`drift-icon accent-${d.accent}`}
          style={{ top: d.top, left: d.left, animationDelay: `${i * 0.9}s` }}
        >
          <d.Icon size={d.size} />
        </span>
      ))}
    </div>
  );
}

// Animated count-up number, triggers once the stat card scrolls into view.
function CountUp({ value, suffix = "", duration = 1400 }) {
  const [ref, inView] = useInView(0.5);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return (
    <span ref={ref} className="stat-card__num">
      {display}{suffix}
    </span>
  );
}

// Image with graceful fallback to the original dashed placeholder if the
// dummy path 404s (handy while the real images/ folder is still empty).
function ImageOrPlaceholder({ src, alt, icon: Icon = ImagePlus, label, className = "", imgClassName = "" }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={className}>
        <Icon size={22} />
        <span>{label}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={imgClassName}
      onError={() => setFailed(true)}
    />
  );
}

/* ---------------------------------------------------------------------- */
/* MAIN COMPONENT                                                          */
/* ---------------------------------------------------------------------- */

export default function Portfolio() {
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeItem, setActiveItem] = useState(null); // { type: 'project', data }
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const rawPos = useRef({ x: -100, y: -100 });
  const navLinksRef = useRef(null);
  const navItemRefs = useRef({});
  const closeTimer = useRef(null);
  const yearRowRefs = useRef({});

  const jumpToYear = useCallback((year) => {
    const keys = Object.keys(yearRowRefs.current).map(Number);
    if (!keys.length) return;
    const nearest = keys.reduce((a, b) => (Math.abs(b - year) < Math.abs(a - year) ? b : a));
    const el = yearRowRefs.current[nearest];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("timeline__row--pulse");
    setTimeout(() => el.classList.remove("timeline__row--pulse"), 1100);
  }, []);

  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
      setScrolled(scrollTop > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const move = (e) => { rawPos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const tick = () => {
      setCursorPos((prev) => ({
        x: prev.x + (rawPos.current.x - prev.x) * 0.18,
        y: prev.y + (rawPos.current.y - prev.y) * 0.18,
      }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setActiveItem(null); setMenuOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeItem || menuOpen ? "hidden" : "";
  }, [activeItem, menuOpen]);

  // scrollspy
  useEffect(() => {
    const sections = TOP_LEVEL_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const updateIndicator = useCallback(() => {
    const el = navItemRefs.current[activeSection];
    const container = navLinksRef.current;
    if (el && container) {
      const c = container.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setIndicator({ left: r.left - c.left, width: r.width, opacity: 1 });
    }
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    setOpenDropdown(null);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleCardTilt = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 12).toFixed(2)}deg`);
    el.style.setProperty("--tx", `${(px * 6).toFixed(2)}px`);
    el.style.setProperty("--ty2", `${(py * 6).toFixed(2)}px`);
  };
  const resetTilt = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--tx", `0px`);
    el.style.setProperty("--ty2", `0px`);
  };

  const hoverProps = {
    onMouseEnter: () => setCursorHover(true),
    onMouseLeave: () => setCursorHover(false),
  };

  const openDemo = (e, url) => {
    e.stopPropagation();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const heroLetters = "Maryam Bano".split("");

  return (
    <div className={`site ${isDark ? "theme-dark" : "theme-light"}`}>
      <StyleBlock />

      <div
        className={`cursor-ring ${cursorHover ? "cursor-ring--hover" : ""}`}
        style={{ transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)` }}
        aria-hidden="true"
      />
      <div className="progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />

      {/* ============ NAV ============ */}
      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <button className="nav__brand" onClick={() => scrollTo("home")} {...hoverProps}>
          <span className="nav__brand-mark">MB</span>
          <span className="nav__brand-name">Maryam Bano</span>
        </button>

        <nav className="nav__links" ref={navLinksRef}>
          <span
            className="nav__indicator"
            style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width, opacity: indicator.opacity }}
          />
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              className="nav__item"
              onMouseEnter={() => {
                clearTimeout(closeTimer.current);
                if (item.children) setOpenDropdown(item.id);
              }}
              onMouseLeave={() => {
                closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
              }}
            >
              <button
                ref={(el) => (navItemRefs.current[item.id] = el)}
                className={`nav__link ${activeSection === item.id ? "nav__link--active" : ""}`}
                onClick={() => scrollTo(item.id)}
                {...hoverProps}
              >
                {item.label}
                {item.children && <ChevronDown size={13} className={`nav__chevron ${openDropdown === item.id ? "nav__chevron--open" : ""}`} />}
              </button>

              {item.children && (
                <div className={`nav__dropdown ${openDropdown === item.id ? "nav__dropdown--open" : ""}`}>
                  {item.children.map((child) => {
                    const Icon = child.icon;
                    return (
                      <button key={child.id} className="nav__dropdown-item" onClick={() => scrollTo(child.id)} {...hoverProps}>
                        <Icon size={15} />
                        <span>{child.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="nav__icon-btn" href="https://github.com/Realmaryambano" target="_blank" rel="noreferrer" aria-label="GitHub" {...hoverProps}>
            <FaGithub size={16} />
          </a>
          <a className="nav__icon-btn" href="https://linkedin.com/in/realmaryambano" target="_blank" rel="noreferrer" aria-label="LinkedIn" {...hoverProps}>
            <FaLinkedin size={16} />
          </a>
          <a className="nav__resume-btn" href={RESUME_HREF} download {...hoverProps}>
            <Download size={14} />
            <span>Resume</span>
          </a>
          <button className="theme-toggle" onClick={() => setTheme(isDark ? "light" : "dark")} aria-label="Toggle color theme" {...hoverProps}>
            <span className="theme-toggle__icon spin-in" key={theme}>{isDark ? <Moon size={16} /> : <Sun size={16} />}</span>
          </button>
          <button className="nav__burger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <ChevronDown size={0} />
            <span className="nav__burger-lines"><span /><span /><span /></span>
          </button>
        </div>
      </header>

      {/* ============ MOBILE FULLSCREEN MENU ============ */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <button className="mobile-menu__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X size={22} />
        </button>
        <div className="mobile-menu__list">
          {NAV_ITEMS.map((item, i) => (
            <div className="mobile-menu__group" key={item.id} style={{ transitionDelay: menuOpen ? `${i * 60 + 80}ms` : "0ms" }}>
              <button className="mobile-menu__link" onClick={() => scrollTo(item.id)}>{item.label}</button>
              {item.children && (
                <div className="mobile-menu__children">
                  {item.children.map((child) => (
                    <button key={child.id} className="mobile-menu__child" onClick={() => scrollTo(child.id)}>
                      <child.icon size={14} /> {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mobile-menu__footer">
          <a href="https://github.com/Realmaryambano" target="_blank" rel="noreferrer"><FaGithub size={18} /></a>
          <a href="https://linkedin.com/in/realmaryambano" target="_blank" rel="noreferrer"><FaLinkedin size={18} /></a>
          <a href={RESUME_HREF} download className="mobile-menu__resume"><Download size={15} /> Resume</a>
        </div>
      </div>

      <main>
        {/* ============ HOME / HERO ============ */}
        <section id="home" className="hero">
          <div className="hero__blob hero__blob--1" aria-hidden="true" />
          <div className="hero__blob hero__blob--2" aria-hidden="true" />
          <div className="hero__blob hero__blob--3" aria-hidden="true" />

          <div className="hero__grid">
            <div className="hero__text">
              <p className="hero__eyebrow"><span className="dot dot--teal" /> Available for freelance &amp; internships</p>

              <h1 className="hero__name">
                {heroLetters.map((ch, i) => (
                  <span key={i} className="hero__letter" style={{ animationDelay: `${i * 40}ms` }}>
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
              </h1>

              <p className="hero__role">
                Full-Stack Web Developer <span className="hero__sep">·</span> AI &amp; ML Enthusiast{" "}
                <span className="hero__sep">·</span> Freelancer
              </p>

              <p className="hero__pitch">
                I build things end to end — carts that check out, dashboards that make sense of
                messy data, and reports that generate themselves. CS undergrad by day, freelance
                developer by night, certified generative-AI nerd in between.
              </p>

              <div className="hero__cta">
                <button className="btn btn--primary" onClick={() => scrollTo("projects")} {...hoverProps}>
                  See my work <ArrowUpRight size={16} />
                </button>
                <a className="btn btn--gradient" href={RESUME_HREF} download {...hoverProps}>
                  <Download size={15} /> Download Resume
                </a>
              </div>

              <div className="hero__socials">
                {SOCIALS.slice(0, 2).map((s) => {
                  const Icon = s.icon;
                  return (
                    <a key={s.label} className="hero__social-btn" href={s.href} target="_blank" rel="noreferrer" {...hoverProps}>
                      <Icon size={17} />
                      <span>{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="hero__visual">
              <div className="hero__photo-frame">
                <ImageOrPlaceholder
                  src={IMAGES.heroPhoto}
                  alt="Maryam Bano"
                  label="Add your photo"
                  className="hero__photo-placeholder"
                  imgClassName="hero__photo-img"
                />
                <div className="hero__photo-ring" aria-hidden="true" />
              </div>
              {HERO_TAGS.map((t, i) => (
                <span
                  key={t.label}
                  className={`hero__tag accent-${t.accent}`}
                  style={{ top: t.top, left: t.left, "--rot": `${t.rot}deg`, animationDelay: `${i * 0.5}s` }}
                  aria-hidden="true"
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          <button className="hero__scroll-cue" onClick={() => scrollTo("about")} aria-label="Scroll down" {...hoverProps}>
            <span>scroll</span>
            <ArrowDown size={14} className="bounce" />
          </button>
        </section>

        <Marquee items={TICKER_TAGS} speed={30} />
        <Marquee items={TICKER_TAGS_2} speed={34} reverse />

        {/* ============ STATS BAND ============ */}
        <section className="stats-band" aria-label="Quick stats">
          <div className="stats-band__grid">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={i * 90} variant="scale" className="stat-card">
                  <span className="stat-card__icon"><Icon size={20} /></span>
                  <CountUp value={s.value} suffix={s.suffix} />
                  <span className="stat-card__label">{s.label}</span>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ============ ABOUT ============ */}
        <section id="about" className="section theme-violet">
          <DriftIcons set="about" />
          <Reveal className="section__label">
            <span className="eyebrow-chip eyebrow-chip--violet">About</span>
          </Reveal>
          <div className="about__grid">
            <div className="about__visual-col">
              <SplitHeadline className="section__title" text="A developer who'd rather *ship something* than talk about shipping it." />
              <Reveal delay={80} variant="scale" className="about__photo">
                <ImageOrPlaceholder
                  src={IMAGES.aboutPhoto}
                  alt="Maryam Bano at work"
                  label="Add a photo of you at work"
                  className="about__photo-placeholder"
                  imgClassName="about__photo-img"
                />
              </Reveal>
              <Reveal delay={160} className="about__facts">
                <div className="fact"><MapPin size={15} /><span>Based in Karachi, Pakistan</span></div>
                <div className="fact"><Code2 size={15} /><span>Python · Flask · Scikit-learn · TensorFlow · Next.js · React</span></div>
                <div className="fact"><Sparkles size={15} /><span>97.25% — Generative AI Top Performer</span></div>
              </Reveal>
            </div>
            <Reveal delay={120} className="about__body">
<p>
  Hi, I’m Maryam Bano — a Full-Stack Developer, AI/ML enthusiast, and creative
  technologist passionate about turning ideas into modern, meaningful, and
  visually engaging digital experiences. I enjoy combining technology with
  creativity to build solutions that are not only functional, but also intuitive
  and memorable.
</p>

<p>
  I’ve built 50+ websites and applications. My work ranges from full-stack
  platforms and enterprise systems to data-driven applications, automation,
  and AI/ML projects. I’m currently focusing on expanding my expertise in
  Data Science, Artificial Intelligence, and Machine Learning.
</p>

<p>
  Technology, however, is only one side of me. I’m also a novelist, writer,
  YouTuber, video editor, graphic designer, and vlogger. I love exploring
  different forms of art and creativity.
</p>

<p>
  I hold a Bachelor’s degree in Computer Science from Bahria University Karachi,
  following my intermediate studies in Computer Science at Bahria College
  Karachi, where I was among the top scorers in my department. Along the way,
  I’ve continued learning through certifications, courses, competitions,
  hackathons, internships, and hands-on projects.
</p>

<p>
  I also enjoy sharing what I learn. With a community of 3,000+ LinkedIn
  followers, I regularly share knowledge, experiences, opportunities, and
  lessons from my journey to help and inspire others in tech.
</p>


              <div className="about__gallery">
                <ImageOrPlaceholder
                  src={IMAGES.aboutWork1}
                  alt="Work photo 1"
                  label="Add work photo 1"
                  className="about__gallery-tile"
                  imgClassName="about__gallery-img"
                />
                <ImageOrPlaceholder
                  src={IMAGES.aboutWork2}
                  alt="Work photo 2"
                  label="Add work photo 2"
                  className="about__gallery-tile"
                  imgClassName="about__gallery-img"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section id="experience" className="section section--alt theme-coral">
          <Reveal className="section__label">
            <span className="eyebrow-chip eyebrow-chip--coral">Experience</span>
          </Reveal>
          <SplitHeadline className="section__title" text="Time spent *building for real teams.*" />
          <Reveal delay={90}><p className="section__sub">Hands-on internship work — shipping systems people at the company actually use.</p></Reveal>

          <div className="timeline" style={{ marginTop: 24 }}>
            <Reveal>
              <div className="timeline__row">
                <div className="timeline__marker timeline__marker--coral"><Briefcase size={16} /></div>
                <div className="timeline__content">
                  <div className="timeline__top">
                    <h4>{EXPERIENCE.role} · {EXPERIENCE.company}</h4>
                    <span className="timeline__period">{EXPERIENCE.period}</span>
                  </div>
                  <p className="timeline__exp-desc">{EXPERIENCE.description}</p>
                  <span className="pill pill--amber" style={{ marginBottom: 20, display: "inline-block" }}>2-month internship</span>

                  <div className="projects-grid" style={{ marginTop: 4 }}>
                    {EXPERIENCE_PROJECTS.map((proj, i) => {
                      const Icon = proj.icon;
                      return (
                        <Reveal key={proj.id} delay={i * 90} className="reveal-card">
                          <button
                            className={`project-card accent-${proj.accent}`}
                            onMouseMove={handleCardTilt}
                            onMouseLeave={(e) => { resetTilt(e); setCursorHover(false); }}
                            onMouseEnter={() => setCursorHover(true)}
                            onClick={() => setActiveItem({ type: "project", data: proj })}
                          >
                            <div className="project-card__glow" />
                            <div className="project-card__media">
                              <ImageOrPlaceholder
                                src={proj.image}
                                alt={proj.title}
                                icon={Icon}
                                label={proj.tag}
                                className="project-card__media-placeholder"
                                imgClassName="project-card__media-img"
                              />
                              <span className="project-card__media-hint"><ArrowUpRight size={13} /> View project</span>
                            </div>
                            <div className="project-card__top">
                              <span className="project-card__icon"><Icon size={22} /></span>
                              <span className="project-card__tag">{proj.tag}</span>
                            </div>
                            <h3 className="project-card__title">{proj.title}</h3>
                            <p className="project-card__blurb">{proj.blurb}</p>
                            <div className="project-card__tags">
                              {proj.tech.slice(0, 3).map((t, ti) => (
                                <span key={t} className="mini-tag" style={{ transitionDelay: `${ti * 70 + 120}ms` }}>{t}</span>
                              ))}
                            </div>
                            <div className="project-card__foot">
                              <span
                                className="project-card__open"
                                onClick={(e) => openDemo(e, proj.githubUrl)}
                                role="button"
                                tabIndex={0}
                              >
                                <span>Open on GitHub</span><ArrowUpRight size={15} />
                              </span>
                              <span className="demo-pill demo-pill--disabled">
                                <Play size={11} /> No live demo
                              </span>
                            </div>
                          </button>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ TECHNOLOGY ============ */}
        <section id="technology" className="section section--alt theme-teal section--pro">
          <Reveal className="section__label">
            <span className="eyebrow-chip eyebrow-chip--teal">Technology</span>
          </Reveal>
          <SplitHeadline className="section__title" text="The engineering side, laid out plainly." />
          <Reveal delay={90}><p className="section__sub">Full-stack development, applied AI, and the systems I've shipped.</p></Reveal>

          <div id="ai-engineering" className="pro-intro-grid">
            <Reveal className="pro-intro-card" variant="up">
              <span className="pro-intro-card__icon"><Cpu size={20} /></span>
              <h3>AI Engineering</h3>
              <p>
                Comfortable across the applied ML pipeline — data cleaning and EDA with Pandas/NumPy,
                model training with Scikit-learn and TensorFlow, and integrating generative AI into
                production-style applications. Certified Top Performer (97.25%) in a Generative AI
                cohort covering advanced Python and AI application development.
              </p>
            </Reveal>
            <Reveal id="fullstack" className="pro-intro-card" delay={100} variant="up">
              <span className="pro-intro-card__icon"><Layers size={20} /></span>
              <h3>Full-Stack Development</h3>
              <p>
                End-to-end ownership: Flask and Django backends, Oracle/SQL Server/SQLite databases,
                and everything from auth and role-based dashboards to automated PDF/Excel reporting.
                Freelance work adds the front end of that — cart flows, checkout, and deployment.
              </p>
            </Reveal>
          </div>

          <div id="projects" className="tech-block">
            <Reveal className="creative-block__head" variant="left"><Code2 size={18} /> <h3>Projects</h3></Reveal>
            <Reveal delay={40}><p className="section__sub" style={{ marginBottom: 24 }}>Click a card for the full story, or jump straight to the live demo.</p></Reveal>
            <div className="projects-grid">
              {PROJECTS.map((proj, i) => {
                const Icon = proj.icon;
                return (
                  <Reveal key={proj.id} delay={(i % 3) * 80} className="reveal-card">
                    <button
                      className={`project-card accent-${proj.accent}`}
                      onMouseMove={handleCardTilt}
                      onMouseLeave={(e) => { resetTilt(e); setCursorHover(false); }}
                      onMouseEnter={() => setCursorHover(true)}
                      onClick={() => setActiveItem({ type: "project", data: proj })}
                    >
                      <div className="project-card__glow" />
                      <div className="project-card__media">
                        <ImageOrPlaceholder
                          src={proj.image}
                          alt={proj.title}
                          icon={Icon}
                          label={proj.tag}
                          className="project-card__media-placeholder"
                          imgClassName="project-card__media-img"
                        />
                        <span className="project-card__media-hint"><ArrowUpRight size={13} /> View project</span>
                      </div>
                      <div className="project-card__top">
                        <span className="project-card__icon"><Icon size={22} /></span>
                        <span className="project-card__tag">{proj.tag}</span>
                      </div>
                      <h3 className="project-card__title">{proj.title}</h3>
                      <p className="project-card__blurb">{proj.blurb}</p>
                      <div className="project-card__tags">
                        {proj.tech.slice(0, 3).map((t, ti) => (
                          <span key={t} className="mini-tag" style={{ transitionDelay: `${ti * 70 + 120}ms` }}>{t}</span>
                        ))}
                      </div>
                      <div className="project-card__foot">
                        <span
                          className="project-card__open"
                          onClick={(e) => openDemo(e, proj.githubUrl)}
                          role="button"
                          tabIndex={0}
                        >
                          <span>Open on GitHub</span><ArrowUpRight size={15} />
                        </span>
                        <span
                          className={`demo-pill ${proj.demoUrl ? "" : "demo-pill--disabled"}`}
                          onClick={(e) => openDemo(e, proj.demoUrl)}
                          role="button"
                          tabIndex={0}
                        >
                          <Play size={11} /> {proj.demoUrl ? "Live demo" : "Demo soon"}
                        </span>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div id="skills" className="tech-block skills-block">
            <Reveal className="creative-block__head" variant="left"><Sparkles size={18} /> <h3>Skills</h3></Reveal>
            <div className="skills-fly" aria-hidden="true">
              {["</>", "AI", "SQL", "API", "{ }", "λ"].map((w, i) => (
                <span key={w} className="skills-fly__word" style={{ animationDelay: `${i * 1.3}s` }}>{w}</span>
              ))}
            </div>
            <div className="skills-grid">
              {SKILLS.map((group, i) => (
                <Reveal key={group.group} delay={i * 70} className="skill-group">
                  <h4>{group.group}</h4>
                  <div className="skill-pills">
                    {group.items.map((s) => <span key={s} className="skill-pill">{s}</span>)}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div id="certs-education" className="tech-block">
            <Reveal className="creative-block__head" variant="left"><Award size={18} /> <h3>Certificates &amp; Education</h3></Reveal>
            <Reveal delay={40}><p className="section__sub" style={{ marginBottom: 8 }}>Scroll or tap a year to jump straight to it.</p></Reveal>

            <div className="years-scroll" aria-label="Jump to a year in the timeline">
              {TIMELINE_YEARS.map((y) => (
                <button key={y} type="button" className="year-chip" onClick={() => jumpToYear(y)}>
                  {y}
                </button>
              ))}
            </div>

            <div className="timeline">
              {EDUCATION.map((ed, i) => (
                <Reveal key={ed.school} delay={i * 90}>
                  <div className="timeline__row" ref={(el) => (yearRowRefs.current[i === 0 ? 2023 : 2021] = el)}>
                    <div className="timeline__marker"><GraduationCap size={16} /></div>
                    <div className="timeline__content">
                      <div className="timeline__top"><h4>{ed.school}</h4><span className="timeline__period">{ed.period}</span></div>
                      <p className="timeline__degree">{ed.degree}</p>
                      {ed.note && <span className="pill pill--amber">{ed.note}</span>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="certs-grid">
              {CERTS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.title} delay={i * 70} className={`cert-card accent-${c.accent}`}>
                    <span className="cert-card__icon"><Icon size={20} /></span>
                    <h4>{c.title}</h4>
                    <p className="cert-card__org">{c.org}</p>
                    <p className="cert-card__detail">{c.detail}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section id="testimonials" className="section section--alt theme-amber">
          <div className="testimonials__inner">
            <Reveal className="section__label"><span className="eyebrow-chip eyebrow-chip--amber">Testimonials</span></Reveal>
            <SplitHeadline className="section__title" text="Nice things *people have said.*" />
            <Reveal delay={90}><p className="section__sub">    Numbers can tell a story, but words carry the emotion, trust, and impact behind it.</p></Reveal>
            <div className="testimonials-grid">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={(i % 2) * 90} className="testimonial-card">
                  <MessageSquareQuote size={22} className="testimonial-card__quote-icon" />
                  <div className="testimonial-card__stars">
                    {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={13} fill="currentColor" />)}
                  </div>
                  <p className="testimonial-card__text">{t.quote}</p>
                  <div className="testimonial-card__who">
                    <span className="testimonial-card__avatar">{t.name.slice(0, 1)}</span>
                    <span>
                      <strong>{t.name}</strong>
                      <span className="testimonial-card__role">{t.role}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="section section--contact theme-violet">
          <DriftIcons set="contact" />
          <Reveal className="section__label"><span className="eyebrow-chip eyebrow-chip--coral">Contact</span></Reveal>
          <SplitHeadline className="section__title section__title--big" text="Got a project? *Let's build it.*" />
          <Reveal delay={100}><p className="section__sub">Freelance, internships, or just talking shop about Oracle databases — I read everything.</p></Reveal>

          <div className="socials-grid">
            {SOCIALS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={i * 60}>
                  <a className="social-card" href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" {...hoverProps}>
                    <span className="social-card__icon"><Icon size={18} /></span>
                    <span className="social-card__text"><strong>{s.label}</strong><span>{s.value}</span></span>
                    <ExternalLink size={14} className="social-card__ext" />
                  </a>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={260} className="contact__resume">
            <a className="btn btn--gradient" href={RESUME_HREF} download {...hoverProps}>
              <Download size={16} /> Download my resume
            </a>
          </Reveal>
        </section>

        <footer className="footer">
          <div className="footer__top">
            <div className="footer__brand">
              <span className="footer__brand-mark">MB</span>
              <div>
                <strong>Maryam Bano</strong>
                <p>Full-stack developer &amp; AI enthusiast — building things end to end, one shipped project at a time.</p>
              </div>
            </div>

            <div className="footer__col">
              <h5>Explore</h5>
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)}>{item.label}</button>
              ))}
            </div>

            <div className="footer__col">
              <h5>Connect</h5>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{s.label}</a>
              ))}
            </div>

            <div className="footer__col footer__cta">
              <h5>Got a project in mind?</h5>
              <p>I read every message — freelance work, internships, or just to talk shop.</p>
              <button className="btn btn--gradient" onClick={() => scrollTo("contact")} {...hoverProps}>
                Let's talk <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <span>Designed &amp; built by Maryam Bano · {new Date().getFullYear()}</span>
            <button className="to-top" onClick={() => scrollTo("home")} aria-label="Back to top" {...hoverProps}>
              <ChevronUp size={16} />
            </button>
          </div>
        </footer>
      </main>

      {/* ============ MODAL ============ */}
      {activeItem && activeItem.type === "project" && (
        <div className="modal-backdrop" onClick={() => setActiveItem(null)}>
          <div className={`modal accent-${activeItem.data.accent}`} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal__close" onClick={() => setActiveItem(null)} {...hoverProps} aria-label="Close"><X size={18} /></button>
            <div className="modal__media">
              <ImageOrPlaceholder
                src={activeItem.data.image}
                alt={activeItem.data.title}
                icon={activeItem.data.icon}
                label={activeItem.data.tag}
                className="modal__media-placeholder"
                imgClassName="modal__media-img"
              />
            </div>
            <span className="modal__icon"><activeItem.data.icon size={26} /></span>
            <span className="project-card__tag">{activeItem.data.tag}</span>
            <h3 className="modal__title">{activeItem.data.title}</h3>
            <p className="modal__desc">{activeItem.data.description}</p>
            <div className="modal__highlight"><Sparkles size={14} /><span>{activeItem.data.highlight}</span></div>
            <div className="modal__tech">
              {activeItem.data.tech.map((t, ti) => (
                <span key={t} className="skill-pill modal__tech-pill" style={{ animationDelay: `${ti * 60 + 150}ms` }}>{t}</span>
              ))}
            </div>
            <div className="modal__actions">
              {activeItem.data.demoUrl ? (
                <a className="btn btn--gradient modal__link" href={activeItem.data.demoUrl} target="_blank" rel="noreferrer" {...hoverProps}>
                  <Play size={15} /> Live Demo
                </a>
              ) : (
                <span className="btn btn--muted modal__link">
                  <Play size={15} /> Demo coming soon
                </span>
              )}
              <a className="btn btn--outline modal__link" href={activeItem.data.githubUrl} target="_blank" rel="noreferrer" {...hoverProps}>
                <FaGithub size={16} /> Code on GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* STYLES                                                                  */
/* ---------------------------------------------------------------------- */

function StyleBlock() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

      .site {
        --font-display: 'Fraunces', ui-serif, Georgia, serif;
        --font-body: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        --font-mono: 'JetBrains Mono', ui-monospace, monospace;

        --coral: #ff6b6b;
        --teal: #06d6a0;
        --amber: #ffc145;
        --violet: #7c5cfc;
        --pink: #ff6fa5;
        --blue: #4d9de0;
        --section-accent: var(--violet);
        --container-w: 1320px;

        position: relative;
        font-family: var(--font-body);
        color: var(--text);
        background: var(--bg);
        min-height: 100vh;
        overflow-x: hidden;
        scroll-behavior: smooth;
        transition: background 0.4s ease, color 0.4s ease;
      }
      .site.theme-light {
        --bg: #fbf7ff; --bg-alt: #f1e9ff; --surface: #ffffff;
        --text: #1b1330; --text-muted: #5c5370;
        --border: rgba(27, 19, 48, 0.14);
        --shadow: 0 20px 45px rgba(90, 60, 160, 0.14);
        --amber-text: color-mix(in srgb, var(--amber) 78%, black);
      }
      .site.theme-dark {
        --bg: #0f0b1e; --bg-alt: #17112c; --surface: #241c40;
        --text: #f6f2ff; --text-muted: #bcb2d9;
        --border: rgba(244, 239, 255, 0.2);
        --shadow: 0 20px 45px rgba(0, 0, 0, 0.55);
        --amber-text: color-mix(in srgb, var(--amber) 88%, white);
      }

      .site * { box-sizing: border-box; }
      .site a { color: inherit; text-decoration: none; }
      .site button { font-family: inherit; cursor: pointer; }
      .theme-violet { --section-accent: var(--violet); }
      .theme-coral { --section-accent: var(--coral); }
      .theme-amber { --section-accent: var(--amber); }
      .theme-teal { --section-accent: var(--teal); }

      @media (min-width: 900px) { .site, .site button, .site a { cursor: none; } }

      .cursor-ring {
        position: fixed; top: 0; left: 0; width: 26px; height: 26px;
        margin-left: -13px; margin-top: -13px; border-radius: 50%;
        border: 1.5px solid var(--violet); pointer-events: none; z-index: 9999;
        transition: width .2s ease, height .2s ease, margin .2s ease, background .2s ease, border-color .2s ease;
        display: none;
      }
      @media (min-width: 900px) { .cursor-ring { display: block; } }
      .cursor-ring--hover { width: 52px; height: 52px; margin-left: -26px; margin-top: -26px; background: rgba(124, 92, 252, 0.12); border-color: var(--coral); }

      .progress-bar { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--coral), var(--violet), var(--teal)); z-index: 10000; transition: width .1s linear; }

      /* ---------- NAV ---------- */
      .nav {
        position: sticky; top: 0; z-index: 500;
        display: flex; align-items: center; justify-content: space-between;
        padding: 16px 32px;
        background: color-mix(in srgb, var(--bg) 72%, transparent);
        backdrop-filter: blur(14px);
        border-bottom: 1px solid transparent;
        transition: background .3s ease, border-color .3s ease, padding .3s ease, box-shadow .3s ease;
      }
      .nav--scrolled { border-bottom-color: var(--border); padding: 10px 32px; box-shadow: 0 8px 30px rgba(90,60,160,0.08); }

      .nav__brand { display: flex; align-items: center; gap: 10px; background: none; border: none; color: var(--text); }
      .nav__brand-mark {
        width: 36px; height: 36px; border-radius: 11px;
        display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, var(--violet), var(--coral), var(--amber));
        background-size: 200% 200%;
        color: white; font-family: var(--font-display); font-weight: 700; font-size: 14px;
        transition: transform .3s cubic-bezier(.34,1.56,.64,1);
        animation: gradientShift 6s ease infinite;
      }
      @keyframes gradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      .nav__brand:hover .nav__brand-mark { transform: rotate(-8deg) scale(1.1); }
      .nav__brand-name { font-family: var(--font-display); font-weight: 600; font-size: 16px; display: none; }
      @media (min-width: 640px) { .nav__brand-name { display: inline; } }

      .nav__links { position: relative; display: none; gap: 2px; }
      @media (min-width: 900px) { .nav__links { display: flex; } }
      .nav__indicator { position: absolute; bottom: -2px; height: 2.5px; border-radius: 2px; background: linear-gradient(90deg, var(--coral), var(--violet)); transition: transform .35s cubic-bezier(.65,0,.35,1), width .35s cubic-bezier(.65,0,.35,1), opacity .3s ease; }
      .nav__item { position: relative; }
      .nav__link {
        display: flex; align-items: center; gap: 4px;
        background: none; border: none; color: var(--text-muted);
        font-size: 14px; font-weight: 500; padding: 10px 14px; border-radius: 999px;
        transition: color .2s ease, background .2s ease;
      }
      .nav__link:hover { color: var(--text); background: var(--bg-alt); }
      .nav__link--active { color: var(--text); font-weight: 600; }
      .nav__chevron { transition: transform .25s ease; }
      .nav__chevron--open { transform: rotate(180deg); }

      .nav__dropdown {
        position: absolute; top: calc(100% + 8px); left: 0;
        background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
        padding: 8px; min-width: 220px; box-shadow: var(--shadow);
        display: flex; flex-direction: column; gap: 2px;
        opacity: 0; visibility: hidden; transform: translateY(-6px) scale(.98);
        transition: opacity .22s ease, transform .22s cubic-bezier(.34,1.56,.64,1), visibility .22s;
        z-index: 50;
      }
      .nav__dropdown--open { opacity: 1; visibility: visible; transform: translateY(0) scale(1); }
      .nav__dropdown-item {
        display: flex; align-items: center; gap: 10px;
        background: none; border: none; color: var(--text);
        font-size: 13.5px; padding: 9px 12px; border-radius: 10px; text-align: left;
        transition: background .18s ease, transform .18s ease, color .18s ease;
      }
      .nav__dropdown-item:hover { background: var(--bg-alt); color: var(--violet); transform: translateX(3px); }

      .nav__actions { display: flex; align-items: center; gap: 8px; }
      .nav__icon-btn {
        width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--border); background: var(--surface);
        display: none; align-items: center; justify-content: center; color: var(--text);
        transition: transform .25s cubic-bezier(.34,1.56,.64,1), color .2s ease, border-color .2s ease;
      }
      @media (min-width: 720px) { .nav__icon-btn { display: flex; } }
      .nav__icon-btn:hover { transform: translateY(-3px) rotate(-6deg); color: var(--violet); border-color: var(--violet); }

      .nav__resume-btn {
        display: none; align-items: center; gap: 6px;
        padding: 9px 16px; border-radius: 999px; font-size: 13px; font-weight: 600;
        background: linear-gradient(135deg, var(--violet), var(--coral));
        color: white;
        transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease;
      }
      @media (min-width: 900px) { .nav__resume-btn { display: flex; } }
      .nav__resume-btn:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 10px 24px rgba(124,92,252,0.35); }

      .theme-toggle {
        width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border); background: var(--surface);
        display: flex; align-items: center; justify-content: center; color: var(--text); overflow: hidden;
      }
      .spin-in { animation: spinIn .4s ease; display: flex; }
      @keyframes spinIn { from { transform: rotate(-90deg) scale(0.4); opacity: 0; } to { transform: rotate(0) scale(1); opacity: 1; } }

      .nav__burger { display: flex; align-items: center; justify-content: center; background: none; border: none; padding: 6px; color: var(--text); }
      .nav__burger-lines { display: flex; flex-direction: column; gap: 4px; width: 20px; }
      .nav__burger-lines span { display: block; height: 2px; border-radius: 2px; background: currentColor; }
      @media (min-width: 900px) { .nav__burger { display: none; } }

      /* ---------- MOBILE FULLSCREEN MENU ---------- */
      .mobile-menu {
        position: fixed; inset: 0; z-index: 3000;
        background: var(--bg);
        display: flex; flex-direction: column;
        padding: 24px;
        opacity: 0; visibility: hidden; transform: translateY(-12px);
        transition: opacity .3s ease, transform .3s ease, visibility .3s;
      }
      .mobile-menu--open { opacity: 1; visibility: visible; transform: translateY(0); }
      @media (min-width: 900px) { .mobile-menu { display: none; } }
      .mobile-menu__close { align-self: flex-end; background: none; border: none; color: var(--text); padding: 8px; }
      .mobile-menu__list { display: flex; flex-direction: column; gap: 4px; margin-top: 20px; overflow-y: auto; }
      .mobile-menu__group { opacity: 0; transform: translateX(-14px); transition: opacity .4s ease, transform .4s ease; }
      .mobile-menu--open .mobile-menu__group { opacity: 1; transform: translateX(0); }
      .mobile-menu__link { display: block; width: 100%; text-align: left; background: none; border: none; color: var(--text); font-family: var(--font-display); font-size: 26px; font-weight: 600; padding: 10px 0; }
      .mobile-menu__children { display: flex; flex-direction: column; gap: 2px; padding-left: 14px; margin-bottom: 8px; }
      .mobile-menu__child { display: flex; align-items: center; gap: 8px; background: none; border: none; color: var(--text-muted); font-size: 14.5px; padding: 8px 0; text-align: left; }
      .mobile-menu__footer { display: flex; align-items: center; gap: 16px; padding-top: 16px; border-top: 1px solid var(--border); margin-top: auto; }
      .mobile-menu__footer a { color: var(--text); }
      .mobile-menu__resume { display: flex; align-items: center; gap: 6px; margin-left: auto; background: linear-gradient(135deg, var(--violet), var(--coral)); color: white; padding: 10px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; }

      /* ---------- HERO ---------- */
      .hero { position: relative; min-height: 92vh; display: flex; flex-direction: column; justify-content: center; padding: 40px clamp(20px, 5vw, 56px) 70px; overflow: hidden; }
      .hero__blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: .35; z-index: 0; animation: floaty 12s ease-in-out infinite; }
      .hero__blob--1 { width: 340px; height: 340px; background: var(--violet); top: -80px; right: -60px; }
      .hero__blob--2 { width: 260px; height: 260px; background: var(--teal); bottom: 10%; left: -80px; animation-delay: -4s; }
      .hero__blob--3 { width: 200px; height: 200px; background: var(--coral); top: 40%; right: 30%; animation-delay: -8s; opacity: .25; }
      @keyframes floaty { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-30px) scale(1.08); } }

      .hero__grid { position: relative; z-index: 1; display: grid; gap: 50px; max-width: var(--container-w); margin: 0 auto; width: 100%; }
      @media (min-width: 980px) { .hero__grid { grid-template-columns: 1.25fr 0.75fr; align-items: center; } }

      .hero__eyebrow { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); margin: 0 0 20px; }
      .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--teal); animation: pulse 2s ease-in-out infinite; }
      @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .3; } }

      .hero__name { font-family: var(--font-display); font-weight: 700; font-size: clamp(42px, 7.5vw, 92px); line-height: 0.95; margin: 0 0 20px; letter-spacing: -0.02em; }
      .hero__letter {
        display: inline-block;
        background-image: linear-gradient(100deg, var(--text) 30%, var(--violet) 65%, var(--coral) 100%);
        -webkit-background-clip: text; background-clip: text; color: transparent;
        animation: letterIn .6s cubic-bezier(.34,1.56,.64,1) both;
        transition: transform .25s cubic-bezier(.34,1.56,.64,1);
      }
      .hero__letter:hover { transform: translateY(-10px) rotate(-6deg) scale(1.05); }
      @supports not (background-clip: text) {
        .hero__letter { color: var(--text); }
      }
      @keyframes letterIn { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

      .hero__role { font-size: clamp(15px, 2vw, 19px); font-weight: 500; color: var(--text); margin: 0 0 18px; }
      .hero__sep { color: var(--violet); margin: 0 4px; }
      .hero__pitch { max-width: 540px; font-size: 16px; line-height: 1.6; color: var(--text-muted); margin: 0 0 30px; }

      .hero__cta { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 24px; }
      .btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; border-radius: 999px; font-size: 14px; font-weight: 600; border: 1px solid transparent; transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease, background .25s ease; }
      .btn--primary { background: var(--text); color: var(--bg); }
      .btn--primary:hover { transform: translateY(-3px) rotate(-1deg); box-shadow: var(--shadow); }
      .btn--gradient { background: linear-gradient(135deg, var(--coral), var(--violet)); background-size: 160% 160%; color: white; }
      .btn--gradient:hover { transform: translateY(-3px) rotate(1deg) scale(1.02); box-shadow: 0 14px 30px rgba(124,92,252,0.35); background-position: 100% 0; }
      .btn--outline { background: var(--surface); color: var(--text); border: 1.5px solid var(--border); }
      .btn--outline:hover { border-color: var(--violet); color: var(--violet); transform: translateY(-3px); box-shadow: var(--shadow); }
      .btn--muted { background: var(--border); color: var(--text-muted); cursor: not-allowed; }

      .hero__socials { display: flex; gap: 10px; flex-wrap: wrap; }
      .hero__social-btn { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: var(--text-muted); border: 1px solid var(--border); padding: 9px 14px; border-radius: 999px; background: var(--surface); transition: transform .2s ease, color .2s ease, border-color .2s ease; }
      .hero__social-btn:hover { transform: translateY(-2px); color: var(--violet); border-color: var(--violet); }

      .hero__scroll-cue { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; background: none; border: none; color: var(--text-muted); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; width: fit-content; margin: 40px auto 0; }
      .bounce { animation: bounce 1.6s ease-in-out infinite; }
      @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

      .hero__visual { position: relative; display: flex; align-items: center; justify-content: center; min-height: 260px; }
      .hero__photo-frame { position: relative; width: 220px; height: 220px; }
      @media (min-width: 640px) { .hero__photo-frame { width: 270px; height: 270px; } }
      .hero__photo-placeholder {
        width: 100%; height: 100%; border-radius: 42% 58% 63% 37% / 45% 40% 60% 55%;
        background: linear-gradient(150deg, color-mix(in srgb, var(--violet) 26%, var(--surface)), color-mix(in srgb, var(--coral) 22%, var(--surface)));
        border: 2px dashed var(--border);
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
        color: var(--text-muted); font-size: 12px; font-family: var(--font-mono);
        animation: blobMorph 10s ease-in-out infinite;
        box-shadow: var(--shadow);
      }
      .hero__photo-img {
        width: 100%; height: 100%; object-fit: cover;
        border-radius: 42% 58% 63% 37% / 45% 40% 60% 55%;
        box-shadow: var(--shadow);
        animation: blobMorph 10s ease-in-out infinite;
      }
      @keyframes blobMorph {
        0%, 100% { border-radius: 42% 58% 63% 37% / 45% 40% 60% 55%; }
        50% { border-radius: 60% 40% 38% 62% / 55% 62% 38% 45%; }
      }
      .hero__photo-ring { position: absolute; inset: -14px; border-radius: 50%; border: 1.5px dashed color-mix(in srgb, var(--violet) 50%, transparent); animation: spin 30s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }

      .hero__tag {
        position: absolute; z-index: 2; display: none; align-items: center;
        font-family: var(--font-mono); font-size: 12px; padding: 7px 14px; border-radius: 999px;
        background: var(--surface); border: 1px solid var(--border); color: var(--card-accent, var(--text));
        box-shadow: var(--shadow); pointer-events: none; animation: chipFloat 7s ease-in-out infinite; transform: rotate(var(--rot));
      }
      @media (min-width: 1180px) { .hero__tag { display: inline-flex; } }
      @keyframes chipFloat { 0%, 100% { transform: translateY(0) rotate(var(--rot)); } 50% { transform: translateY(-16px) rotate(calc(var(--rot) * -1)); } }

      /* ---------- STATS BAND ---------- */
      .stats-band { padding: 50px clamp(20px, 5vw, 56px); max-width: var(--container-w); margin: 0 auto; }
      .stats-band__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
      @media (min-width: 720px) { .stats-band__grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); } }
      .reveal--scale { transform: scale(.85); }
      .stat-card {
        background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
        padding: 22px 18px; display: flex; flex-direction: column; align-items: flex-start; gap: 6px;
        transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease, border-color .3s ease;
      }
      .stat-card:hover { transform: translateY(-5px); box-shadow: var(--shadow); border-color: var(--violet); }
      .stat-card__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: color-mix(in srgb, var(--violet) 18%, transparent); color: var(--violet); margin-bottom: 4px; }
      .stat-card__num { font-family: var(--font-display); font-weight: 700; font-size: 30px; }
      .stat-card__label { font-size: 12.5px; color: var(--text-muted); }

      /* ---------- DRIFT ICONS ---------- */
      .drift-icons { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
      .drift-icon {
        position: absolute; display: flex; align-items: center; justify-content: center;
        width: 40px; height: 40px; border-radius: 12px; background: var(--surface);
        border: 1px solid var(--border); box-shadow: var(--shadow);
        animation: driftFloat 8s ease-in-out infinite; opacity: .8;
      }
      @keyframes driftFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-18px) rotate(8deg); } }

      /* ---------- SECTIONS ---------- */
      .section { position: relative; padding: 100px clamp(20px, 5vw, 56px); max-width: var(--container-w); margin: 0 auto; }
      .section::before {
        content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
        width: 64px; height: 3px; border-radius: 3px;
        background: linear-gradient(90deg, var(--coral), var(--violet), var(--teal));
        opacity: .6;
      }
      .section--alt { background: var(--bg-alt); max-width: 100%; }
      .section--alt > * { max-width: var(--container-w); margin-left: auto; margin-right: auto; }
      .section--contact { padding-bottom: 60px; }

      .reveal { opacity: 0; transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1), filter .7s ease; }
      .reveal--up { transform: translateY(28px); }
      .reveal--left { transform: translateX(-28px); }
      .reveal--scale { transform: scale(.85); filter: blur(2px); }
      .reveal--in { opacity: 1; transform: translate(0,0) scale(1); filter: blur(0); }

      .eyebrow-chip {
        display: inline-flex; align-items: center; gap: 10px;
        font-family: var(--font-mono); font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
        padding: 9px 20px; border-radius: 999px; border: 1.5px solid var(--border); color: var(--text-muted); margin-bottom: 24px;
      }
      .eyebrow-chip::before { content: ''; width: 22px; height: 2px; border-radius: 2px; background: currentColor; }
      .eyebrow-chip--violet { border-color: var(--violet); color: var(--violet); background: color-mix(in srgb, var(--violet) 12%, transparent); }
      .eyebrow-chip--teal { border-color: var(--teal); color: var(--teal); background: color-mix(in srgb, var(--teal) 12%, transparent); }
      .eyebrow-chip--amber { border-color: var(--amber); color: var(--amber-text); background: color-mix(in srgb, var(--amber) 16%, transparent); }
      .eyebrow-chip--coral { border-color: var(--coral); color: var(--coral); background: color-mix(in srgb, var(--coral) 12%, transparent); }

      .split-headline { overflow: visible; }
      .split-headline__mask { display: inline-block; overflow: hidden; vertical-align: top; }
      .split-headline__word { display: inline-block; transform: translateY(115%) rotate(4deg); opacity: 0; transition: transform .65s cubic-bezier(.16,1,.3,1), opacity .5s ease; }
      .split-headline__word--in { transform: translateY(0) rotate(0deg); opacity: 1; }
      .split-headline__word--accent { color: var(--section-accent); font-style: italic; }

      .section__title { font-family: var(--font-display); font-weight: 600; font-size: clamp(28px, 4vw, 44px); line-height: 1.15; max-width: 780px; margin: 0 0 16px; color: var(--text); }
      .section__title--big { font-size: clamp(34px, 5.5vw, 58px); }
      .section__sub { color: var(--text-muted); font-size: 16px; max-width: 560px; margin: 0 0 40px; }

      /* ---------- ABOUT ---------- */
      .about__grid { display: grid; gap: 40px; margin-top: 30px; position: relative; z-index: 1; }
      @media (min-width: 900px) { .about__grid { grid-template-columns: 0.9fr 1.1fr; } }
      .about__visual-col { display: flex; flex-direction: column; }
      .about__photo { margin-top: 8px; }
      .about__photo-placeholder {
        aspect-ratio: 4/3; width: 100%; border-radius: 24px; border: 2px dashed var(--border);
        background: linear-gradient(150deg, color-mix(in srgb, var(--violet) 20%, var(--surface)), color-mix(in srgb, var(--coral) 16%, var(--surface)));
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
        color: var(--text-muted); font-size: 12.5px; font-family: var(--font-mono); text-align: center; padding: 20px;
        transition: transform .3s cubic-bezier(.34,1.56,.64,1), border-color .3s ease, background .4s ease, color .3s ease;
      }
      .about__photo-placeholder:hover { transform: scale(1.02) rotate(-1deg); border-color: var(--violet); color: var(--violet); background: linear-gradient(150deg, color-mix(in srgb, var(--violet) 34%, var(--surface)), color-mix(in srgb, var(--coral) 28%, var(--surface))); }
      .about__photo-img { aspect-ratio: 4/3; width: 100%; border-radius: 24px; object-fit: cover; display: block; box-shadow: var(--shadow); transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
      .about__photo-img:hover { transform: scale(1.02) rotate(-1deg); }
      .about__facts { display: flex; flex-direction: column; gap: 12px; margin-top: 22px; }
      .fact { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text); background: var(--surface); border: 1px solid var(--border); padding: 10px 14px; border-radius: 12px; width: fit-content; transition: transform .2s ease, border-color .2s ease; }
      .fact:hover { transform: translateX(4px); border-color: var(--violet); }
      .about__body p { color: var(--text-muted); line-height: 1.75; font-size: 16px; margin: 0 0 16px; }
      .about__gallery { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px; }
      .about__gallery-tile {
        aspect-ratio: 4/3; border-radius: 16px; border: 2px dashed var(--border);
        background: linear-gradient(150deg, color-mix(in srgb, var(--teal) 14%, var(--surface)), var(--bg-alt));
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
        color: var(--text-muted); font-size: 11px; font-family: var(--font-mono); text-align: center; padding: 10px;
        transition: transform .3s cubic-bezier(.34,1.56,.64,1), border-color .3s ease, color .3s ease, background .3s ease;
      }
      .about__gallery-tile:hover { transform: translateY(-4px) rotate(1deg); border-color: var(--teal); color: var(--teal); background: linear-gradient(150deg, color-mix(in srgb, var(--teal) 26%, var(--surface)), var(--bg-alt)); }
      .about__gallery-img { aspect-ratio: 4/3; border-radius: 16px; object-fit: cover; display: block; width: 100%; transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
      .about__gallery-img:hover { transform: translateY(-4px) rotate(1deg); }

      /* ---------- CREATIVE / TECH BLOCKS ---------- */
      .tech-block { margin-top: 56px; }
      .creative-block__head { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; color: var(--section-accent); }
      .creative-block__head h3 { font-family: var(--font-display); font-size: 22px; margin: 0; color: var(--text); }

      /* ---------- TECHNOLOGY (professional tone) ---------- */
      .section--pro .creative-block__head h3 { font-family: var(--font-body); font-weight: 700; }
      .pro-intro-grid { display: grid; gap: 18px; margin-top: 10px; margin-bottom: 10px; }
      @media (min-width: 720px) { .pro-intro-grid { grid-template-columns: 1fr 1fr; } }
      .pro-intro-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px; transition: transform .2s ease, box-shadow .2s ease; }
      .pro-intro-card:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
      .pro-intro-card__icon { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 12px; background: color-mix(in srgb, var(--teal) 20%, transparent); color: var(--teal); margin-bottom: 12px; }
      .pro-intro-card h3 { font-size: 17px; margin: 0 0 8px; font-family: var(--font-body); font-weight: 700; color: var(--text); }
      .pro-intro-card p { color: var(--text-muted); font-size: 14px; line-height: 1.65; margin: 0; }

      /* ---------- BIG SCROLLABLE YEARS ---------- */
      .years-scroll {
        display: flex; gap: 30px; overflow-x: auto; padding: 6px 4px 20px; margin-top: 6px;
        scroll-snap-type: x proximity;
        -webkit-mask-image: linear-gradient(90deg, transparent, black 3%, black 97%, transparent);
        mask-image: linear-gradient(90deg, transparent, black 3%, black 97%, transparent);
      }
      .years-scroll::-webkit-scrollbar { height: 5px; }
      .years-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 999px; }
      .year-chip {
        flex: 0 0 auto; scroll-snap-align: center; background: none; border: none; padding: 4px 2px;
        font-family: var(--font-display); font-weight: 700; line-height: 1;
        font-size: clamp(30px, 5vw, 54px); color: transparent;
        -webkit-text-stroke: 1.4px var(--text-muted); text-stroke: 1.4px var(--text-muted);
        transition: color .3s ease, -webkit-text-stroke-color .3s ease, transform .3s cubic-bezier(.34,1.56,.64,1);
      }
      .year-chip:hover, .year-chip:focus-visible {
        color: var(--section-accent); -webkit-text-stroke: 1.4px var(--section-accent);
        transform: translateY(-8px) scale(1.04);
      }

      /* ---------- TIMELINE ---------- */
      .timeline { margin-top: 24px; display: flex; flex-direction: column; }
      .timeline__row { display: grid; grid-template-columns: 40px 1fr; gap: 20px; padding-bottom: 40px; position: relative; }
      .timeline__row:not(:last-child)::before { content: ''; position: absolute; left: 19px; top: 40px; bottom: -4px; width: 2px; background: var(--border); }
      .timeline__marker { width: 40px; height: 40px; border-radius: 50%; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; color: var(--violet); z-index: 1; transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
      .timeline__marker--coral { color: var(--coral); }
      .timeline__row:hover .timeline__marker { transform: scale(1.15) rotate(8deg); }
      .timeline__row--pulse .timeline__marker { animation: markerPulse 1.1s ease; border-color: var(--violet); }
      @keyframes markerPulse {
        0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--violet) 55%, transparent); }
        70% { box-shadow: 0 0 0 18px transparent; }
        100% { box-shadow: 0 0 0 0 transparent; }
      }
      .timeline__top { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; margin-bottom: 6px; }
      .timeline__top h4 { font-family: var(--font-body); font-weight: 700; font-size: 17px; margin: 0; color: var(--text); }
      .timeline__period { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
      .timeline__degree { color: var(--text-muted); margin: 0 0 10px; }
      .timeline__exp-desc {
        color: var(--text-muted); font-size: 15.5px; line-height: 1.7;
        margin: 2px 0 18px; max-width: 620px; text-align: left;
      }
      .pill { display: inline-block; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 999px; }
      .pill--amber { background: color-mix(in srgb, var(--amber) 28%, transparent); color: var(--amber-text); }

      .exp-grid { display: grid; gap: 16px; margin-top: 14px; }
      @media (min-width: 720px) { .exp-grid { grid-template-columns: 1fr 1fr; } }
      .exp-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 18px; transition: transform .25s ease, box-shadow .25s ease; }
      .exp-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
      .exp-card h5 { margin: 0 0 10px; font-size: 15px; font-weight: 700; color: var(--text); }
      .exp-card ul { margin: 0; padding-left: 18px; color: var(--text-muted); font-size: 13.5px; line-height: 1.7; }

      /* ---------- PROJECTS ---------- */
      .projects-grid { display: grid; grid-template-columns: 1fr; gap: 22px; margin-top: 18px; }
      @media (min-width: 640px) { .projects-grid { grid-template-columns: 1fr 1fr; } }
      @media (min-width: 1000px) { .projects-grid { grid-template-columns: 1fr 1fr 1fr; } }

      .project-card {
        --rx: 0deg; --ry: 0deg; --tx: 0px; --ty2: 0px;
        position: relative; width: 100%; text-align: left; background: var(--surface); border: 1px solid var(--border);
        border-radius: 22px; padding: 24px; display: flex; flex-direction: column; gap: 12px; min-height: 220px;
        transform: perspective(700px) rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--tx), var(--ty2));
        transition: transform .15s ease-out, box-shadow .3s ease, border-color .3s ease; overflow: hidden;
      }
      .project-card:hover { box-shadow: var(--shadow); border-color: var(--card-accent); }
      .project-card__glow { position: absolute; inset: -40%; background: radial-gradient(circle at 30% 20%, var(--card-accent) 0%, transparent 60%); opacity: 0; transition: opacity .35s ease; pointer-events: none; }
      .project-card:hover .project-card__glow { opacity: .16; }

      /* Framed-mat treatment: the media block is a tinted card in the project's
         accent color, and the actual screenshot sits inset on top of it with its
         own rounded corners + shadow — like a photo in a mount. This keeps every
         card the same overall shape no matter the screenshot's own aspect ratio,
         without the harsh crops of edge-to-edge cover or the empty space of contain. */
      .project-card__media {
        margin: -24px -24px 4px -24px; aspect-ratio: 16/10; overflow: hidden; border-radius: 20px 20px 0 0;
        position: relative; padding: 14px;
        background:
          radial-gradient(circle at 22% 18%, color-mix(in srgb, var(--card-accent) 24%, transparent), transparent 60%),
          linear-gradient(150deg, color-mix(in srgb, var(--card-accent) 16%, var(--bg-alt)), var(--bg-alt));
        display: flex; align-items: center; justify-content: center;
      }
      .project-card__media-img {
        width: 100%; height: 100%; object-fit: cover; object-position: center;
        display: block; border-radius: 12px;
        box-shadow: 0 10px 24px color-mix(in srgb, var(--card-accent) 22%, transparent), 0 1px 0 color-mix(in srgb, var(--border) 60%, transparent);
        transition: transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .3s ease;
      }
      .project-card:hover .project-card__media-img { transform: scale(1.02); box-shadow: 0 16px 32px color-mix(in srgb, var(--card-accent) 32%, transparent); }
      .project-card__media-hint {
        position: absolute; z-index: 2; left: 24px; bottom: 24px;
        display: inline-flex; align-items: center; gap: 5px;
        font-family: var(--font-mono); font-size: 11px; font-weight: 600;
        padding: 7px 12px; border-radius: 999px; color: white;
        background: color-mix(in srgb, var(--card-accent) 80%, black 6%);
        box-shadow: 0 6px 16px color-mix(in srgb, var(--card-accent) 40%, transparent);
        opacity: 0; transform: translateY(8px);
        transition: opacity .3s ease, transform .3s cubic-bezier(.34,1.56,.64,1);
        pointer-events: none;
      }
      .project-card:hover .project-card__media-hint { opacity: 1; transform: translateY(0); }
      .project-card__media-placeholder {
        width: 100%; height: 100%; position: relative; overflow: hidden; border-radius: 12px;
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
        background:
          radial-gradient(circle at 28% 22%, color-mix(in srgb, var(--card-accent) 38%, transparent), transparent 58%),
          linear-gradient(150deg, color-mix(in srgb, var(--card-accent) 22%, var(--bg-alt)), color-mix(in srgb, var(--card-accent) 5%, var(--bg-alt)));
        color: var(--text-muted); font-family: var(--font-mono); font-size: 11.5px;
        transition: background .4s ease, color .3s ease;
      }
      .project-card__media-placeholder::before {
        content: '';
        position: absolute; inset: 0;
        background-image: radial-gradient(color-mix(in srgb, var(--card-accent) 30%, transparent) 1.2px, transparent 1.2px);
        background-size: 18px 18px;
        opacity: .55;
      }
      .project-card__media-placeholder svg {
        position: relative; z-index: 1; width: 22px; height: 22px; padding: 14px; box-sizing: content-box;
        border-radius: 50%; background: color-mix(in srgb, white 18%, var(--card-accent) 22%);
        color: var(--card-accent); box-shadow: 0 10px 22px color-mix(in srgb, var(--card-accent) 35%, transparent);
        transition: transform .3s cubic-bezier(.34,1.56,.64,1);
      }
      .project-card:hover .project-card__media-placeholder svg { transform: scale(1.08) rotate(-6deg); }
      .project-card__media-placeholder span {
        position: relative; z-index: 1; font-weight: 600; letter-spacing: .03em; text-align: center;
        font-size: 11px; padding: 6px 14px; border-radius: 999px; max-width: 82%;
        background: color-mix(in srgb, var(--surface) 78%, transparent); backdrop-filter: blur(6px);
        border: 1px solid color-mix(in srgb, var(--card-accent) 32%, transparent); color: var(--text);
      }

      .accent-coral { --card-accent: var(--coral); }
      .accent-teal { --card-accent: var(--teal); }
      .accent-amber { --card-accent: var(--amber); }
      .accent-violet { --card-accent: var(--violet); }
      .accent-pink { --card-accent: var(--pink); }
      .accent-blue { --card-accent: var(--blue); }

      .project-card__top { display: flex; align-items: center; justify-content: space-between; }
      .project-card__icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: color-mix(in srgb, var(--card-accent) 20%, transparent); color: var(--card-accent); transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
      .project-card:hover .project-card__icon { transform: rotate(-10deg) scale(1.08); }
      .project-card__tag { font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); }
      .project-card__title { font-family: var(--font-display); font-size: 21px; font-weight: 600; margin: 0; color: var(--text); }
      .project-card__blurb { color: var(--text-muted); font-size: 14px; line-height: 1.5; margin: 0; flex-grow: 1; }
      .project-card__tags { display: flex; flex-wrap: wrap; gap: 6px; }
      .mini-tag { font-family: var(--font-mono); font-size: 10.5px; padding: 4px 9px; border-radius: 999px; background: color-mix(in srgb, var(--card-accent) 16%, transparent); color: var(--card-accent); opacity: 0; transform: translateY(6px) scale(.92); transition: opacity .4s cubic-bezier(.34,1.56,.64,1), transform .4s cubic-bezier(.34,1.56,.64,1); }
      .reveal--in .mini-tag { opacity: 1; transform: translateY(0) scale(1); }
      .project-card__foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 8px; }
      .project-card__open { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--card-accent); transition: gap .25s ease; }
      .project-card:hover .project-card__open { gap: 10px; }
      .demo-pill {
        display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono);
        font-size: 10.5px; font-weight: 700; padding: 6px 11px; border-radius: 999px;
        background: var(--text); color: var(--bg);
        transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s ease, background .2s ease;
      }
      .demo-pill:hover { transform: translateY(-2px) scale(1.04); background: var(--card-accent); color: white; box-shadow: 0 8px 18px color-mix(in srgb, var(--card-accent) 45%, transparent); }
      .demo-pill--disabled { background: var(--border); color: var(--text-muted); cursor: default; }
      .demo-pill--disabled:hover { transform: none; box-shadow: none; background: var(--border); color: var(--text-muted); }

      /* ---------- SKILLS ---------- */
      .skills-block { position: relative; }
      .skills-fly { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; display: none; }
      @media (min-width: 900px) { .skills-fly { display: block; } }
      .skills-fly__word {
        position: absolute; right: 4%; font-family: var(--font-display); font-weight: 700; font-style: italic;
        font-size: clamp(26px, 3vw, 40px); color: var(--section-accent); opacity: 0.1;
        animation: skillsFly 16s linear infinite;
      }
      .skills-fly__word:nth-child(1) { top: 4%; }
      .skills-fly__word:nth-child(2) { top: 20%; right: 14%; }
      .skills-fly__word:nth-child(3) { top: 38%; right: 2%; }
      .skills-fly__word:nth-child(4) { top: 55%; right: 18%; }
      .skills-fly__word:nth-child(5) { top: 72%; right: 6%; }
      .skills-fly__word:nth-child(6) { top: 88%; right: 22%; }
      @keyframes skillsFly {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.08; }
        50% { transform: translateY(-22px) rotate(-4deg); opacity: 0.2; }
      }
      .skills-grid { margin-top: 18px; display: grid; gap: 18px; position: relative; z-index: 1; }
      .skill-group { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 18px 22px; transition: border-color .25s ease, transform .25s ease; }
      .skill-group:hover { border-color: var(--section-accent); transform: translateX(4px); }
      @media (min-width: 780px) { .skill-group { display: grid; grid-template-columns: 190px 1fr; align-items: center; gap: 18px; } }
      .skill-group h4 { font-family: var(--font-body); font-weight: 700; font-size: 15px; margin: 0 0 12px; color: var(--text); }
      @media (min-width: 780px) { .skill-group h4 { margin-bottom: 0; } }
      .skill-pills { display: flex; flex-wrap: wrap; gap: 8px; }
      .skill-pill { font-family: var(--font-mono); font-size: 12.5px; padding: 7px 13px; border-radius: 999px; background: var(--surface); border: 1px solid var(--border); color: var(--text); transition: transform .2s cubic-bezier(.34,1.56,.64,1), background .2s ease, color .2s ease; }
      .skill-pill:hover { transform: translateY(-3px) rotate(-2deg); background: var(--teal); color: white; border-color: var(--teal); }

      /* ---------- CERTS ---------- */
      .certs-grid { margin-top: 30px; display: grid; gap: 18px; grid-template-columns: 1fr; }
      @media (min-width: 700px) { .certs-grid { grid-template-columns: 1fr 1fr; } }
      .cert-card { background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--card-accent); border-radius: 16px; padding: 20px; transition: transform .25s ease, box-shadow .25s ease; }
      .cert-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); }
      .cert-card__icon { display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 10px; background: color-mix(in srgb, var(--card-accent) 20%, transparent); color: var(--card-accent); margin-bottom: 12px; }
      .cert-card h4 { font-family: var(--font-body); font-weight: 700; font-size: 15.5px; margin: 0 0 4px; color: var(--text); }
      .cert-card__org { font-family: var(--font-mono); font-size: 11.5px; color: var(--text-muted); margin: 0 0 10px; }
      .cert-card__detail { font-size: 13.5px; color: var(--text-muted); line-height: 1.6; margin: 0; }

      /* ---------- MARQUEE ---------- */
      .marquee { width: 100%; overflow: hidden; padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--bg-alt); -webkit-mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent); mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent); }
      .marquee__track { display: flex; width: max-content; gap: 32px; animation: marqueeScroll linear infinite; }
      .marquee__track--reverse { animation-direction: reverse; }
      .marquee:hover .marquee__track { animation-play-state: paused; }
      @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .marquee__item { display: flex; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); white-space: nowrap; padding-right: 32px; border-right: 1px solid var(--border); }
      .marquee__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--coral); flex-shrink: 0; }

      /* ---------- TESTIMONIALS ---------- */
      .testimonials__inner { position: relative; z-index: 1; }
      .testimonials-grid { display: grid; grid-template-columns: 1fr; gap: 18px; margin-top: 14px; }
      @media (min-width: 640px) { .testimonials-grid { grid-template-columns: 1fr 1fr; } }
      .testimonial-card {
        background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 24px;
        display: flex; flex-direction: column; gap: 12px; transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
      }
      .testimonial-card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: var(--amber); }
      .testimonial-card__quote-icon { color: var(--amber-text); opacity: .8; }
      .testimonial-card__stars { display: flex; gap: 2px; color: var(--amber); }
      .testimonial-card__text { color: var(--text-muted); font-size: 14.5px; line-height: 1.6; margin: 0; flex-grow: 1; font-style: italic; text-align: justify; text-justify: inter-word; hyphens: auto; }
      .testimonial-card__who { display: flex; align-items: center; gap: 10px; margin-top: 4px; }
      .testimonial-card__avatar {
        width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, var(--violet), var(--coral)); color: white; font-weight: 700; font-size: 13px;
      }
      .testimonial-card__who strong { display: block; font-size: 13.5px; color: var(--text); }
      .testimonial-card__role { font-size: 12px; color: var(--text-muted); font-family: var(--font-mono); }

      /* ---------- CONTACT ---------- */
      .socials-grid { margin-top: 30px; display: grid; gap: 14px; grid-template-columns: 1fr; position: relative; z-index: 1; }
      @media (min-width: 700px) { .socials-grid { grid-template-columns: 1fr 1fr; } }
      .social-card { display: flex; align-items: center; gap: 14px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 16px 18px; transition: transform .25s cubic-bezier(.34,1.56,.64,1), border-color .25s ease; }
      .social-card:hover { transform: translateY(-3px) scale(1.01); border-color: var(--violet); }
      .social-card__icon { width: 38px; height: 38px; border-radius: 10px; background: var(--bg-alt); display: flex; align-items: center; justify-content: center; color: var(--violet); flex-shrink: 0; }
      .social-card__text { display: flex; flex-direction: column; gap: 2px; flex-grow: 1; }
      .social-card__text strong { font-size: 14px; color: var(--text); }
      .social-card__text span { font-size: 12.5px; color: var(--text-muted); font-family: var(--font-mono); }
      .social-card__ext { color: var(--text-muted); flex-shrink: 0; }
      .contact__resume { margin-top: 30px; position: relative; z-index: 1; }

      .footer-bottom { display: flex; align-items: center; justify-content: space-between; padding: 24px clamp(20px, 5vw, 56px) 40px; max-width: var(--container-w); margin: 0 auto; color: var(--text-muted); font-size: 12.5px; font-family: var(--font-mono); flex-wrap: wrap; gap: 12px; border-top: 1px solid var(--border); }
      .footer { border-top: 1px solid var(--border); background: var(--bg-alt); margin-top: 20px; }
      .footer__top {
        display: grid; gap: 32px; grid-template-columns: 1fr; max-width: var(--container-w); margin: 0 auto;
        padding: 56px clamp(20px, 5vw, 56px) 30px;
      }
      @media (min-width: 760px) { .footer__top { grid-template-columns: 1.4fr 1fr 1fr 1.2fr; } }
      .footer__brand { display: flex; gap: 14px; align-items: flex-start; }
      .footer__brand-mark {
        width: 38px; height: 38px; border-radius: 12px; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, var(--violet), var(--coral), var(--amber));
        background-size: 200% 200%; animation: gradientShift 6s ease infinite;
        color: white; font-family: var(--font-display); font-weight: 700; font-size: 14px;
      }
      .footer__brand strong { display: block; font-family: var(--font-display); font-size: 17px; color: var(--text); margin-bottom: 6px; }
      .footer__brand p { color: var(--text-muted); font-size: 13.5px; line-height: 1.6; margin: 0; max-width: 260px; }
      .footer__col { display: flex; flex-direction: column; gap: 10px; }
      .footer__col h5 { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-muted); margin: 0 0 4px; }
      .footer__col button, .footer__col a { background: none; border: none; text-align: left; color: var(--text); font-size: 14px; padding: 2px 0; width: fit-content; transition: color .2s ease, transform .2s ease; }
      .footer__col button:hover, .footer__col a:hover { color: var(--violet); transform: translateX(3px); }
      .footer__cta p { color: var(--text-muted); font-size: 13px; line-height: 1.6; margin: 0 0 6px; }
      .footer__cta .btn { width: fit-content; padding: 10px 18px; font-size: 13px; }

      .to-top { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--border); background: var(--surface); color: var(--text); display: flex; align-items: center; justify-content: center; transition: transform .25s ease; }
      .to-top:hover { transform: translateY(-3px); }

      /* ---------- MODAL ---------- */
      .modal-backdrop { position: fixed; inset: 0; background: rgba(10, 6, 20, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 20px; z-index: 2000; animation: fadeIn .25s ease; }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .modal { position: relative; width: 100%; max-width: 560px; max-height: 85vh; overflow-y: auto; background: var(--surface); border: 1px solid var(--border); border-top: 4px solid var(--card-accent); border-radius: 24px; padding: 32px; animation: popIn .35s cubic-bezier(.34,1.56,.64,1); }
      @keyframes popIn { from { opacity: 0; transform: scale(.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      .modal__close { position: absolute; top: 18px; right: 18px; width: 32px; height: 32px; border-radius: 50%; background: var(--bg-alt); border: none; color: var(--text); display: flex; align-items: center; justify-content: center; transition: transform .2s ease; z-index: 2; }
      .modal__close:hover { transform: rotate(90deg); }
      .modal__media {
        margin: -32px -32px 20px -32px; aspect-ratio: 16/9; overflow: hidden; position: relative;
        padding: 16px; display: flex; align-items: center; justify-content: center;
        background:
          radial-gradient(circle at 22% 18%, color-mix(in srgb, var(--card-accent, var(--violet)) 24%, transparent), transparent 60%),
          linear-gradient(150deg, color-mix(in srgb, var(--card-accent, var(--violet)) 16%, var(--bg-alt)), var(--bg-alt));
      }
      .modal__media-img {
        width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;
        border-radius: 14px;
        box-shadow: 0 12px 28px color-mix(in srgb, var(--card-accent, var(--violet)) 24%, transparent);
      }
      .modal__media-placeholder {
        width: 100%; height: 100%; position: relative; overflow: hidden; border-radius: 14px;
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
        background:
          radial-gradient(circle at 28% 22%, color-mix(in srgb, var(--card-accent, var(--violet)) 38%, transparent), transparent 58%),
          linear-gradient(150deg, color-mix(in srgb, var(--card-accent, var(--violet)) 22%, var(--bg-alt)), color-mix(in srgb, var(--card-accent, var(--violet)) 6%, var(--bg-alt)));
        color: var(--text-muted); font-family: var(--font-mono); font-size: 12px; text-align: center; padding: 20px;
      }
      .modal__media-placeholder::before {
        content: '';
        position: absolute; inset: 0;
        background-image: radial-gradient(color-mix(in srgb, var(--card-accent, var(--violet)) 30%, transparent) 1.2px, transparent 1.2px);
        background-size: 18px 18px;
        opacity: .5;
      }
      .modal__media-placeholder svg {
        position: relative; z-index: 1; width: 24px; height: 24px; padding: 15px; box-sizing: content-box;
        border-radius: 50%; background: color-mix(in srgb, white 18%, var(--card-accent, var(--violet)) 22%);
        color: var(--card-accent, var(--violet)); box-shadow: 0 10px 22px color-mix(in srgb, var(--card-accent, var(--violet)) 35%, transparent);
      }
      .modal__media-placeholder span {
        position: relative; z-index: 1; font-weight: 600; letter-spacing: .03em;
        font-size: 11.5px; padding: 6px 14px; border-radius: 999px; max-width: 82%;
        background: color-mix(in srgb, var(--surface) 78%, transparent); backdrop-filter: blur(6px);
        border: 1px solid color-mix(in srgb, var(--card-accent, var(--violet)) 32%, transparent); color: var(--text);
      }
      .modal__icon { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 14px; background: color-mix(in srgb, var(--card-accent, var(--amber)) 20%, transparent); color: var(--card-accent, var(--amber)); margin-bottom: 14px; }
      .modal__title { font-family: var(--font-display); font-size: 26px; margin: 10px 0 14px; color: var(--text); }
      .modal__desc { color: var(--text-muted); line-height: 1.7; font-size: 15px; margin: 0 0 18px; }
      .modal__highlight { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--card-accent, var(--amber)); background: color-mix(in srgb, var(--card-accent, var(--amber)) 14%, transparent); padding: 10px 14px; border-radius: 12px; margin-bottom: 18px; }
      .modal__tech { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
      .modal__tech-pill { animation: tagPop .45s cubic-bezier(.34,1.56,.64,1) backwards; }
      @keyframes tagPop { from { opacity: 0; transform: translateY(8px) scale(.85); } to { opacity: 1; transform: translateY(0) scale(1); } }
      .modal__actions { display: flex; gap: 12px; flex-wrap: wrap; }
      .modal__link { width: fit-content; }

      @media (prefers-reduced-motion: reduce) { .site * { animation: none !important; transition: none !important; } }
    `}</style>
  );
}