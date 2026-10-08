import React, { useEffect, useState } from "react";
import "./App.css";
import BodyFatCalculator from "./BodyFatCalculator";

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2200&q=90",

  personalTraining:
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1400&q=85",

  pt:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=85",

  diet:
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=85",

  supplements:
    "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=1400&q=85",
};

const VIBES_INSTAGRAM =
  "https://www.instagram.com/vibesfitness_snr/";

const AMIT_INSTAGRAM =
  "https://www.instagram.com/amitchauhan7788/";

// Gym location (latitude, longitude)
const GYM_LAT = 31.532571;
const GYM_LNG = 76.888143;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${GYM_LAT},${GYM_LNG}`;

// Optional: add your numbers to show Call / WhatsApp buttons automatically.
// Example: const PHONE = "+919876543210";
const PHONE = "+918580909278";
const WHATSAPP = "918580909278";
const DISPLAY_NUMBER = "+91 85809 09278";

const SESSION_GOALS = [
  "Weight loss",
  "Muscle gain",
  "Strength training",
  "General fitness",
  "Not sure yet",
];

const EMPTY_SESSION_FORM = {
  name: "",
  contact: "",
  email: "",
  goal: "",
  date: "",
  time: "",
  message: "",
};

const MARQUEE = [
  "PERSONAL TRAINING",
  "PT COACHING",
  "CUSTOM DIET PLANS",
  "SUPPLEMENT GUIDANCE",
  "STRENGTH",
  "CONSISTENCY",
];

const STEPS = [
  {
    number: "01",
    title: "Talk to Amit",
    description:
      "Share your goal, current fitness level and daily routine so training starts from where you actually are.",
  },
  {
    number: "02",
    title: "Get Your Plan",
    description:
      "Receive a structured training approach, with diet and supplement guidance if you need it.",
  },
  {
    number: "03",
    title: "Train & Progress",
    description:
      "Train with guidance, stay consistent and keep improving step by step.",
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Personal Training",
    shortTitle: "PERSONAL TRAINING",
    description:
      "Focused one-on-one training designed around your body, goals, fitness level and progress.",
    image: IMAGES.personalTraining,
    tag: "1-ON-1",
  },
  {
    number: "02",
    title: "PT Coaching",
    shortTitle: "PT COACHING",
    description:
      "Structured personal coaching with proper exercise guidance, consistency and progressive training.",
    image: IMAGES.pt,
    tag: "COACHING",
  },
  {
    number: "03",
    title: "Custom Diet Plans",
    shortTitle: "CUSTOM DIET",
    description:
      "A practical nutrition plan built around your individual fitness goals and daily routine.",
    image: IMAGES.diet,
    tag: "NUTRITION",
  },
  {
    number: "04",
    title: "Supplements",
    shortTitle: "SUPPLEMENTS",
    description:
      "Guidance on supplements to support your training and nutrition routine.",
    image: IMAGES.supplements,
    tag: "SUPPORT",
  },
];

const STATS = [
  {
    value: "17+",
    label: "Years Experience",
  },
  {
    value: "50+",
    label: "Clients Trained",
  },
  {
    value: "04",
    label: "Fitness Services",
  },
  {
    value: "100%",
    label: "Personal Focus",
  },
];

const FAQS = [
  {
    question: "Do I need previous gym experience?",
    answer:
      "No. Training can be adjusted according to your current fitness level, experience and goals.",
  },
  {
    question: "What does personal training include?",
    answer:
      "Personal training focuses on structured workouts, exercise guidance and a training approach built around your individual goals.",
  },
  {
    question: "Can I get a custom diet plan?",
    answer:
      "Yes. Custom diet plans are available as part of the fitness and nutrition services.",
  },
  {
    question: "Do you provide supplement guidance?",
    answer:
      "Yes. Supplement guidance is available to help you understand what may fit into your training and nutrition routine.",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [sessionForm, setSessionForm] = useState(EMPTY_SESSION_FORM);

  // Scroll state: navbar style, progress bar, back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(y > 40);
      setShowTop(y > 700);
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock page scroll while the mobile menu or booking drawer is open + close on Escape
  useEffect(() => {
    document.body.style.overflow = menuOpen || sessionOpen ? "hidden" : "";

    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSessionOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, sessionOpen]);

  // Reveal-on-scroll animation
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("js-reveal");
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ---------- Book a personal session ----------
  const openSession = (e) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
    setSessionOpen(true);
  };

  const closeSession = () => setSessionOpen(false);

  const updateSessionField = (field) => (e) =>
    setSessionForm((prev) => ({ ...prev, [field]: e.target.value }));

  const sendSessionToWhatsApp = (e) => {
    e.preventDefault();

    const { name, contact, email, goal, date, time, message } = sessionForm;

    const text = `New Personal Session Request
Name: ${name}
Contact: ${contact}
Email: ${email || "-"}
Goal: ${goal || "-"}
Preferred Date: ${date || "-"}
Preferred Time: ${time || "-"}
Message: ${message || "-"}`;

    window.open(
      `https://wa.me/${WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );

    setSessionForm(EMPTY_SESSION_FORM);
    setSessionOpen(false);
  };

  const todayISO = new Date().toISOString().split("T")[0];

  return (
    <div className="app">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      {/* ================= NAVBAR ================= */}
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <a href="#top" className="logo" onClick={closeMenu} aria-label="Vibes Fitness home">
          <img
            src="/logo.webp"
            alt="Vibes Fitness logo"
            className="logo-img"
            width="52"
            height="52"
          />
          <span className="logo-text">
            VIBES <b>FITNESS</b>
          </span>
        </a>

        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#about" onClick={closeMenu}>
            About
          </a>

          <a href="#services" onClick={closeMenu}>
            Services
          </a>

          <a href="#amit" onClick={closeMenu}>
            Coach
          </a>

          <a href="#process" onClick={closeMenu}>
            Process
          </a>

          <a href="#calculator" onClick={closeMenu}>
            Calculator
          </a>

          <a href="#faq" onClick={closeMenu}>
            FAQ
          </a>

          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>

          <a href="#contact" onClick={openSession}>
            Book a Session
          </a>

          <a
            href={AMIT_INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="nav-cta"
            onClick={closeMenu}
          >
            Instagram ↗
          </a>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <header
        id="top"
        className="hero"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(0,0,0,0.88) 0%,
              rgba(0,0,0,0.65) 42%,
              rgba(0,0,0,0.18) 100%
            ),
            url(${IMAGES.hero})
          `,
        }}
      >
        <div className="hero-noise"></div>

        <div className="hero-content">
          <p className="eyebrow">
            VIBES FITNESS <span>/</span> PERSONAL TRAINING
          </p>

          <h1>
            BUILD
            <br />
            <span>YOUR</span>
            <br />
            STRONGEST
            <br />
            <b>SELF.</b>
          </h1>

          <p className="hero-description">
            Personal training, PT coaching, custom diet plans and
            supplement guidance — built around you.
          </p>

          <div className="hero-actions">
            <a href="#services" className="btn btn-primary">
              Explore Services <span>↗</span>
            </a>

            <a href="#contact" className="btn btn-outline" onClick={openSession}>
              Book a Personal Session
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="scroll-indicator">
            <span className="scroll-line"></span>
            <span>SCROLL TO EXPLORE</span>
          </div>

          <div className="hero-location">
            <span className="status-dot"></span>
            PERSONAL TRAINING
          </div>
        </div>
      </header>

      {/* ================= MARQUEE ================= */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map(
            (item, i) => (
              <span key={i}>
                {item} <i>✦</i>
              </span>
            )
          )}
        </div>
      </div>

      {/* ================= INTRO ================= */}
      <section id="about" className="intro-section">
        <div className="section-container">
          <div className="intro-grid">
            <div className="section-label">
              <span>01</span>
              ABOUT VIBES
            </div>

            <div className="intro-content reveal">
              <h2>
                TRAIN WITH
                <br />
                <span>PURPOSE.</span>
              </h2>

              <p className="large-copy">
                Fitness is not about following someone else's routine.
                It's about finding what works for you and building the
                discipline to keep going.
              </p>

              <p>
                Vibes Fitness focuses on personalized training and
                practical fitness support. Whether your goal is getting
                stronger, improving your fitness or transforming your
                routine, your training should be built around you.
              </p>

              <a href="#services" className="text-link">
                VIEW SERVICES <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats-section">
        <div className="stats-container">
          {STATS.map((stat) => (
            <div className="stat reveal" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ================= AMIT HERO ================= */}
      <section id="amit" className="amit-hero">
        <div className="amit-image">
          <img src="/amit.webp" alt="Amit Chauhan" />
        </div>

        <div className="amit-overlay"></div>

        <div className="amit-content">
          <p className="eyebrow light">
            MEET YOUR COACH <span>/</span> VIBES FITNESS
          </p>

          <h2>
            AMIT
            <br />
            <span>CHAUHAN.</span>
          </h2>

          <div className="amit-line"></div>

          <div className="amit-info">
            <div>
              <strong>17+</strong>
              <span>YEARS EXPERIENCE</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>CLIENTS TRAINED</span>
            </div>
          </div>

          <p className="amit-description">
            With over 17 years of experience in fitness and training,
            Amit Chauhan focuses on helping clients train with structure,
            consistency and purpose.
          </p>

          <a
            href={AMIT_INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="amit-instagram"
          >
            @amitchauhan7788 <span>↗</span>
          </a>
        </div>

        <div className="amit-corner-text">
          <span>17+ YEARS</span>
          <span>OF EXPERIENCE</span>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="services-section">
        <div className="section-container">
          <div className="services-header">
            <div className="section-label">
              <span>02</span>
              WHAT WE OFFER
            </div>

            <div>
              <h2>
                BUILT AROUND
                <br />
                <span>YOUR GOALS.</span>
              </h2>

              <p>
                No unnecessary programs. Just focused fitness services
                designed to support your training and lifestyle.
              </p>
            </div>
          </div>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <article className="service-card reveal" key={service.number}>
                <div className="service-image">
                  <img src={service.image} alt={service.title} />

                  <div className="service-number">
                    {service.number}
                  </div>

                  <div className="service-tag">{service.tag}</div>
                </div>

                <div className="service-content">
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <a href="#contact" className="service-link" onClick={openSession}>
                    GET STARTED <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRAINING STATEMENT ================= */}
      <section className="statement-section">
        <div className="statement-inner">
          <p className="eyebrow">THE VIBES APPROACH</p>

          <h2>
            CONSISTENCY
            <br />
            <span>BEATS</span>
            <br />
            PERFECTION.
          </h2>

          <div className="statement-bottom">
            <p>
              Train consistently. Eat with purpose. Stay disciplined.
              Keep improving.
            </p>

            <a href="#contact" className="btn btn-primary" onClick={openSession}>
              START TRAINING <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="process" className="process-section">
        <div className="section-container">
          <div className="section-label reveal">
            <span>03</span>
            HOW IT WORKS
          </div>

          <h2 className="process-title reveal">
            THREE STEPS.
            <br />
            <span>ZERO GUESSWORK.</span>
          </h2>

          <div className="process-grid">
            {STEPS.map((step) => (
              <div className="process-card reveal" key={step.number}>
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BODY FAT CALCULATOR ================= */}
      <BodyFatCalculator onBook={openSession} />

      {/* ================= FAQ ================= */}
      <section id="faq" className="faq-section">
        <div className="section-container">
          <div className="faq-grid">
            <div>
              <div className="section-label">
                <span>05</span>
                FAQ
              </div>

              <h2>
                GOT
                <br />
                <span>QUESTIONS?</span>
              </h2>

              <p className="faq-intro">
                Everything you need to know before getting started.
              </p>
            </div>

            <div className="faq-list">
              {FAQS.map((faq, index) => (
                <div
                  className={`faq-item ${
                    activeFaq === index ? "active" : ""
                  }`}
                  key={faq.question}
                >
                  <button
                    className="faq-question"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? null : index)
                    }
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">
                      {activeFaq === index ? "−" : "+"}
                    </span>
                  </button>

                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section id="contact" className="contact-section">
        <div className="contact-bg"></div>

        <div className="contact-content">
          <p className="eyebrow light">READY TO START?</p>

          <h2>
            YOUR
            <br />
            <span>TIME IS NOW.</span>
          </h2>

          <p>
            Take the first step toward a stronger and more consistent
            fitness routine.
          </p>

          <div className="contact-buttons">
            <a
              href="#contact"
              className="btn btn-primary"
              onClick={openSession}
            >
              BOOK A PERSONAL SESSION <span>↗</span>
            </a>

            <a
              href={AMIT_INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline light-button"
            >
              MESSAGE AMIT <span>↗</span>
            </a>

            <a
              href={VIBES_INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline light-button"
            >
              VIBES FITNESS INSTAGRAM
            </a>

            {WHATSAPP && (
              <a
                href={`https://wa.me/${WHATSAPP.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline light-button"
              >
                WHATSAPP
              </a>
            )}

            {PHONE && (
              <a
                href={`tel:${PHONE}`}
                className="btn btn-outline light-button"
              >
                CALL NOW
              </a>
            )}

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline light-button"
            >
              FIND THE GYM <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="logo logo-footer" aria-label="Vibes Fitness home">
              <img
                src="/logo.webp"
                alt="Vibes Fitness logo"
                className="logo-img"
                width="72"
                height="72"
                loading="lazy"
              />
              <span className="logo-text">
                VIBES <b>FITNESS</b>
              </span>
            </a>

            <p>
              Personal training.
              <br />
              Real consistency.
              <br />
              Better you.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <span className="footer-heading">NAVIGATION</span>

              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#amit">Coach</a>
              <a href="#calculator">Calculator</a>
              <a href="#faq">FAQ</a>
            </div>

            <div>
              <span className="footer-heading">SOCIAL</span>

              <a
                href={AMIT_INSTAGRAM}
                target="_blank"
                rel="noreferrer"
              >
                Amit Instagram
              </a>

              <a
                href={VIBES_INSTAGRAM}
                target="_blank"
                rel="noreferrer"
              >
                Vibes Fitness
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} VIBES FITNESS</span>

          <span>TRAIN HARD. STAY CONSISTENT.</span>

          <a href="#top">BACK TO TOP ↑</a>
        </div>

        <p className="footer-credit">
          Developed by{" "}
          <a
            href="https://portfolio-tffl.onrender.com/"
            target="_blank"
            rel="noreferrer"
          >
            Divanshu
          </a>
        </p>
      </footer>

      {/* ================= MOBILE STICKY CTA ================= */}
      <div className={`mobile-cta ${scrolled ? "show" : ""}`}>
        <a
          href="#contact"
          className="mobile-cta-main"
          onClick={openSession}
        >
          BOOK A SESSION <span>↗</span>
        </a>

        {PHONE ? (
          <a href={`tel:${PHONE}`} className="mobile-cta-side">
            CALL
          </a>
        ) : (
          <a href="#services" className="mobile-cta-side">
            SERVICES
          </a>
        )}
      </div>

      <a
        href="#top"
        className={`back-top ${showTop ? "show" : ""}`}
        aria-label="Back to top"
      >
        ↑
      </a>

      {/* ================= BOOK A PERSONAL SESSION ================= */}
      <div
        className={`session-overlay ${sessionOpen ? "show" : ""}`}
        onClick={closeSession}
      />

      <aside
        className={`session-drawer ${sessionOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Book a personal session"
        aria-hidden={!sessionOpen}
      >
        <div className="session-drawer-head">
          <h3>Book a personal session</h3>

          <button
            type="button"
            className="session-close"
            onClick={closeSession}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="session-note">
          Fill this in and we'll continue on WhatsApp at{" "}
          <a href={`tel:${PHONE}`}>{DISPLAY_NUMBER}</a>.
        </p>

        <form className="session-form" onSubmit={sendSessionToWhatsApp}>
          <label>
            Name
            <input
              type="text"
              required
              value={sessionForm.name}
              onChange={updateSessionField("name")}
            />
          </label>

          <label>
            Contact number
            <input
              type="tel"
              required
              value={sessionForm.contact}
              onChange={updateSessionField("contact")}
            />
          </label>

          <label>
            Email (optional)
            <input
              type="email"
              value={sessionForm.email}
              onChange={updateSessionField("email")}
            />
          </label>

          <label>
            Your goal
            <select
              value={sessionForm.goal}
              onChange={updateSessionField("goal")}
            >
              <option value="">Select a goal</option>
              {SESSION_GOALS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          <div className="session-row">
            <label>
              Preferred date
              <input
                type="date"
                min={todayISO}
                value={sessionForm.date}
                onChange={updateSessionField("date")}
              />
            </label>

            <label>
              Preferred time
              <input
                type="time"
                value={sessionForm.time}
                onChange={updateSessionField("time")}
              />
            </label>
          </div>

          <label>
            Message
            <textarea
              rows="3"
              value={sessionForm.message}
              onChange={updateSessionField("message")}
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Send request <span>→</span>
          </button>
        </form>
      </aside>
    </div>
  );
}

export default App;