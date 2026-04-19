import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

const NAV_LINKS = ["Home", "About", "Projects", "Skills", "Contact"];

interface Project {
  title: string;
  desc: string;
  tags: string[];
  github: string;
  color: string;
}

interface Skill {
  name: string;
  level: number;
}

interface InterestItem {
  icon: string;
  title: string;
  desc: string;
}

const PROJECTS: Project[] = [
  {
    title: "AI Stethoscope",
    desc: "An AI-powered stethoscope system designed to assist in heart and lung sound analysis.",
    tags: ["React", "Python", "OpenAI API", "Datasets"],
    github: "https://github.com/earljohnobanana/Ai-Stethoscope.git",
    color: "#4ecca3",
  },
  {
    title: "CloudVault",
    desc: "A modern, responsive Cloud Storage Dashboard Web App built using HTML, CSS, and Vanilla JavaScript.",
    tags: ["HTML", "CSS", "Vanilla JavaScript"],
    github: "https://github.com/earljohnobanana/CloudVault.git",
    color: "#7c83fd",
  },
  {
    title: "FlowDesk",
    desc: "FlowDesk is a modern, elegant, and interactive web-based project management dashboard.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/earljohnobanana/FlowDesk.git",
    color: "#f7b731",
  },
  {
    title: "File-Organizer",
    desc: "A Python application that organizes files in a folder into subfolders automatically.",
    tags: ["Python", "FastAPI"],
    github: "https://github.com",
    color: "#ff6b6b",
  },
  {
    title: "Weather-Prediction",
    desc: "A complete machine learning system to predict tomorrow's weather using historical weather data.",
    tags: ["Python", "HTML", "Algorithm", "Datasets", "AI"],
    github: "https://github.com/earljohnobanana/Weather-Prediction.git",
    color: "#4ecca3",
  },
  {
    title: "TaskManager",
    desc: "A full-stack To-Do List app using Laravel, React, and Inertia.js. Users can add, edit, delete, and mark tasks as completed.",
    tags: ["React", "HTML", "Inertia.js", "Laravel"],
    github: "https://github.com/earljohnobanana/TaskManager.git",
    color: "#7c83fd",
  },
];

const SKILLS: Record<string, Skill[]> = {
  Frontend: [
    { name: "React", level: 45 },
    { name: "TypeScript", level: 35 },
    { name: "HTML & CSS", level: 70 },
    { name: "Tailwind", level: 30 },
  ],
  Backend: [
    { name: "Python", level: 60 },
    { name: "Laravel", level: 50 },
    { name: "Node.js", level: 30 },
    { name: "FastAPI", level: 40 },
  ],
  Tools: [
    { name: "Git & GitHub", level: 65 },
    { name: "Docker", level: 20 },
    { name: "VS Code", level: 95 },
    { name: "REST APIs", level: 70 },
  ],
};

function useInView(threshold = 0.15): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Navbar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,17,21,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
      padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#4ecca3", letterSpacing: "-0.5px" }}>
          {"<Dev />"}
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
                color: active === link.toLowerCase() ? "#4ecca3" : "rgba(255,255,255,0.55)",
                textDecoration: "none", transition: "color 0.25s",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#fff"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = active === link.toLowerCase() ? "#4ecca3" : "rgba(255,255,255,0.55)"}
            >{link}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg, #0f1115 0%, #12151b 50%, #0f1115 100%)",
    }}>
      <div style={{
        position: "absolute", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(78,204,163,0.07) 0%, transparent 70%)",
        top: "10%", left: "5%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,131,253,0.06) 0%, transparent 70%)",
        bottom: "10%", right: "5%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{
        textAlign: "center", zIndex: 1, padding: "0 1.5rem",
        opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(32px)",
        transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          display: "inline-block", padding: "6px 18px", borderRadius: 100,
          background: "rgba(78,204,163,0.1)", border: "1px solid rgba(78,204,163,0.25)",
          marginBottom: "1.5rem",
          opacity: mounted ? 1 : 0, transition: "all 0.9s 0.1s ease",
        }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#4ecca3", letterSpacing: "0.08em", fontWeight: 500 }}>
            AVAILABLE FOR WORK
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          color: "#fff", margin: "0 0 0.75rem", lineHeight: 1.05, letterSpacing: "-2px",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          Earl John Obañana
        </h1>

        <h2 style={{
          fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
          color: "rgba(255,255,255,0.45)", margin: "0 0 1.5rem", letterSpacing: "0.02em",
          opacity: mounted ? 1 : 0, transition: "all 0.9s 0.2s ease",
        }}>
          Computer Engineer & Aspiring Web Developer
        </h2>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)",
          maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.75,
          opacity: mounted ? 1 : 0, transition: "all 0.9s 0.25s ease",
        }}>
          Building clean, fast, and intelligent digital products. I bridge the gap between design and engineering with a focus on developer experience.
        </p>

        <div style={{
          display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap",
          opacity: mounted ? 1 : 0, transition: "all 0.9s 0.3s ease",
        }}>
          <CTAButton href="#projects" primary={true}>View Projects</CTAButton>
          <CTAButton href="#contact" primary={false}>Contact Me</CTAButton>
        </div>
      </div>
    </section>
  );
}

function CTAButton({ href, primary, children }: { href: string; primary: boolean; children: ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <a href={href} style={{
      fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15,
      padding: "13px 30px", borderRadius: 12, textDecoration: "none",
      display: "inline-block", transition: "all 0.3s ease", letterSpacing: "0.01em",
      background: primary ? (hover ? "#3db88f" : "#4ecca3") : "transparent",
      color: primary ? "#0f1115" : hover ? "#fff" : "rgba(255,255,255,0.65)",
      border: primary ? "none" : "1px solid rgba(255,255,255,0.15)",
      transform: hover ? "translateY(-2px)" : "translateY(0)",
      boxShadow: primary && hover ? "0 8px 30px rgba(78,204,163,0.25)" : "none",
    }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >{children}</a>
  );
}

function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement | null>} style={{ padding: "8rem 2rem", background: "#12151b" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-32px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <Label>About Me</Label>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "#fff", margin: "1rem 0 1.5rem", lineHeight: 1.15, letterSpacing: "-1px" }}>
            Building with code, driven by purpose
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
            I'm a Computer Engineering graduate and aspiring web developer passionate about building applications for the web. I focus on full-stack development, API design, and creating practical, user-focused solutions using modern technologies.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "1.25rem"  }}>
            I have built personal projects using technologies such as React, Laravel, and Python, which help me strengthen my understanding of modern web development and software engineering fundamentals.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>

            I'm continuously improving my skills through hands-on projects, certifications, and self-learning, with a focus on problem-solving and building real-world applications.

            I am continuously learning through personal projects and certifications to improve my skills in modern web technologies, software development, and problem-solving.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
            Currently learning through coursework, certifications, and side projects to improve my skills in modern web development and full-stack development.

          </p>
        </div>

        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(32px)", transition: "all 0.8s 0.15s cubic-bezier(0.16,1,0.3,1)" }}>
          {([
            { icon: "⚡", title: "Aspiring Web Developer", desc: "Passionate about building responsive and efficient web applications while continuously improving my development skills." },

            { icon: "🤖", title: "Emerging Technologies", desc: "Interested in AI and modern tech trends, with ongoing learning in intelligent systems and APIs." },,
            { icon: "🚀", title: "Project Building", desc: "Developing real-world applications such as dashboards, automation tools, and full-stack web systems." },
            { icon: "🎨", title: "UI Development", desc: "Designing and building responsive user interfaces with attention to usability and user experience." },
            { icon: "📚", title: "Continuous Learning", desc: "Consistently improving skills through personal projects, research, and exploring new web technologies." },

            { icon: "🤖", title: "Emerging Technologies", desc: "nterested in AI and modern tech trends, with ongoing learning in intelligent systems and APIs." },
            { icon: "🛠️", title: "Programming & Development", desc: "Focused on building full-stack projects while improving code quality, structure, and problem-solving skills."},
          ] as InterestItem[]).map((item, i) => (
            <InterestCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InterestCard({ item }: { item: InterestItem }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", gap: "1rem", alignItems: "flex-start",
        background: hover ? "rgba(78,204,163,0.05)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hover ? "rgba(78,204,163,0.2)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16, padding: "1.25rem", marginBottom: "1rem",
        transition: "all 0.35s ease", cursor: "default",
        transform: hover ? "translateX(6px)" : "translateX(0)",
      }}>
      <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
      <div>
        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", margin: "0 0 6px" }}>{item.title}</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.65 }}>{item.desc}</p>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [ref, inView] = useInView(0.05);
  return (
    <section id="projects" ref={ref as React.RefObject<HTMLElement | null>} style={{ padding: "8rem 2rem", background: "#0f1115" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <Label>Projects</Label>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "#fff", margin: "1rem 0 1rem", letterSpacing: "-1px" }}>
            Things I've Built
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 480, margin: "0 auto" }}>
            A selection of projects spanning web apps, APIs, and AI-powered tools.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, i, inView }: { project: Project; i: number; inView: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "#1a1e26" : "#161920",
        border: `1px solid ${hover ? project.color + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 20, padding: "1.75rem",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: inView ? (hover ? "translateY(-10px)" : "translateY(0)") : "translateY(32px)",
        opacity: inView ? 1 : 0,
        transitionDelay: inView ? `${i * 0.07}s` : "0s",
        boxShadow: hover ? `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px ${project.color}30` : "none",
        cursor: "default", display: "flex", flexDirection: "column",
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: project.color + "18",
        border: `1px solid ${project.color}30`,
        marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ width: 16, height: 16, borderRadius: 4, background: project.color, opacity: 0.9 }} />
      </div>

      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", margin: "0 0 0.6rem", letterSpacing: "-0.3px" }}>{project.title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: "0 0 1.25rem", flex: 1 }}>{project.desc}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
        {project.tags.map((tag: string) => (
          <span key={tag} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
            padding: "4px 10px", borderRadius: 6,
            background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.02em",
          }}>{tag}</span>
        ))}
      </div>

      <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
        color: project.color, textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
        opacity: hover ? 1 : 0.6, transition: "opacity 0.3s",
      }}>
        <span>View on GitHub</span>
        <span style={{ fontSize: 16 }}>→</span>
      </a>
    </div>
  );
}

function SkillsSection() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" ref={ref as React.RefObject<HTMLElement | null>} style={{ padding: "8rem 2rem", background: "#12151b" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <Label>Skills</Label>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "#fff", margin: "1rem 0", letterSpacing: "-1px" }}>
            What I Work With
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {Object.entries(SKILLS).map(([category, skills], ci) => (
            <div key={category}
              style={{
                background: "#161920", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 20, padding: "1.75rem",
                opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)",
                transition: `all 0.7s ${ci * 0.12}s cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1.5rem" }}>{category}</h3>
              {skills.map((skill, si) => (
                <SkillBar key={si} skill={skill} inView={inView} delay={ci * 0.12 + si * 0.08} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, inView, delay }: { skill: Skill; inView: boolean; delay: number }) {
  const colors: Record<number, string> = { 90: "#4ecca3", 80: "#7c83fd", 70: "#f7b731", 60: "#ff6b6b" };
  const color = Object.entries(colors).reverse().find(([lvl]) => skill.level >= Number(lvl))?.[1] || "#4ecca3";
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{skill.name}</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{skill.level}%</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 100, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 100, background: `linear-gradient(90deg, ${color}cc, ${color})`,
          width: inView ? `${skill.level}%` : "0%",
          transition: `width 1s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
        }} />
      </div>
    </div>
  );
}

interface ContactCardProps {
  href: string;
  icon: string;
  label: string;
  value: string;
  color: string;
  hover: boolean;
  setHover: (v: boolean) => void;
}

function ContactSection() {
  const [ref, inView] = useInView();
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement | null>} style={{ padding: "8rem 2rem", background: "#0f1115" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <Label>Contact</Label>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "#fff", margin: "1rem 0 1.25rem", letterSpacing: "-1px" }}>
            Let's Work Together
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 480, margin: "0 auto 3rem" }}>
            I'm open to freelance projects, internships, and full-time opportunities. Drop me a message and I'll get back to you within 24 hours.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <ContactCard href="mailto:earlj4541@gmail.com" icon="✉️" label="Email" value="earlj4541@gmail.com" color="#4ecca3" hover={hover1} setHover={setHover1} />
            <ContactCard href="https://github.com/earljohnobanana" icon="⬡" label="GitHub" value="github.com/earljohnobanana" color="#7c83fd" hover={hover2} setHover={setHover2} />
            <ContactCard href="tel:+639564139075" icon="📱" label="Phone" value="+63 956 413 9075" color="#22c55e" hover={hover3} setHover={setHover3} />
            <ContactCard href="https://www.linkedin.com/in/earl-john-oba%C3%B1ana-6426163a9/" icon="💼" label="LinkedIn" value="linkedin.com/in/earl-john-obañana" color="#0a66c2" hover={hover4} setHover={setHover4} />
          </div>

          <div style={{ marginTop: "3.5rem", padding: "2.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20 }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", margin: "0 0 0.5rem" }}>Open to opportunities</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.7 }}>
              Available for remote roles, internships, and freelance collaborations in web development and AI engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ href, icon, label, value, color, hover, setHover }: ContactCardProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? color + "12" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hover ? color + "35" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16, padding: "1.25rem 2rem", textDecoration: "none",
        display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4,
        transition: "all 0.35s ease", transform: hover ? "translateY(-5px)" : "translateY(0)",
        minWidth: 200,
      }}>
      <span style={{ fontSize: 18, marginBottom: 4 }}>{icon}</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>{label}</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: hover ? color : "rgba(255,255,255,0.65)", fontWeight: 500, transition: "color 0.3s" }}>{value}</span>
    </a>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "2rem", background: "#0d1014", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)", margin: 0 }}>
        © 2025 Earl John Obañana · Built with React & precision ✦
      </p>
    </footer>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "inline-block", padding: "5px 14px", borderRadius: 100, background: "rgba(78,204,163,0.08)", border: "1px solid rgba(78,204,163,0.2)" }}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#4ecca3", letterSpacing: "0.1em", fontWeight: 600 }}>
        {typeof children === "string" ? children.toUpperCase() : children}
      </span>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const h = () => {
      const sections = NAV_LINKS.map(l => l.toLowerCase());
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(s); break; }
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0f1115; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #12151b; }
        ::-webkit-scrollbar-thumb { background: #2a2e38; border-radius: 3px; }
        @media (max-width: 768px) {
          #about > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          nav div:last-child { gap: 1rem !important; }
          nav div:last-child a { font-size: 13px !important; }
        }
      `}</style>
      <Navbar active={active} />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
