// ==========================================================================
// YS ENTERTAINMENT — main script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated stat counters ---------- */
  const statEls = document.querySelectorAll('.stat__num');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => statObserver.observe(el));

  /* ---------- Portfolio metric bars ---------- */
  const fillEls = document.querySelectorAll('.metric__fill');
  const fillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.style.width = target.dataset.fill + '%';
        fillObserver.unobserve(target);
      }
    });
  }, { threshold: 0.4 });
  fillEls.forEach(el => fillObserver.observe(el));

  /* ---------- Service detail modal ---------- */
  const serviceDetails = {
    seo: {
      title: 'Search Engine Optimization (SEO)',
      body: 'We fix the technical and content issues stopping search engines from ranking you, then build toward the keywords your customers actually type.',
      points: ['Technical & on-page audit', 'Keyword & competitor research', 'Content structure fixes', 'Local SEO / Google Business Profile']
    },
    sem: {
      title: 'Search Engine Marketing (SEM)',
      body: 'Paid search campaigns on Google and Bing, structured around cost-per-lead targets and built to be optimized weekly, not left running blind.',
      points: ['Campaign & keyword structure', 'Ad copy & extensions', 'Conversion tracking setup', 'Weekly bid & budget optimization']
    },
    smo: {
      title: 'Social Media Optimization (SMO)',
      body: 'We tune your profiles, bios, formats and posting patterns so each platform\'s algorithm works in your favor.',
      points: ['Profile & bio optimization', 'Content format strategy', 'Hashtag & discovery tuning', 'Posting cadence planning']
    },
    smm: {
      title: 'Social Media Marketing (SMM)',
      body: 'Organic content plus paid social campaigns that build an audience on Instagram, TikTok, Facebook and LinkedIn — then convert it.',
      points: ['Content calendar', 'Paid social campaigns', 'Community management', 'Performance reporting']
    },
    content: {
      title: 'Content Marketing',
      body: 'Blog posts, video scripts and short-form content built around what your customers are actually searching for, not what\'s trending this week.',
      points: ['Content strategy & calendar', 'SEO-driven blog writing', 'Short-form video scripts', 'Repurposing across channels']
    },
    email: {
      title: 'Email Marketing',
      body: 'Welcome flows, newsletters and win-back sequences written to be opened, read, and clicked — not marked as spam.',
      points: ['Welcome & onboarding flows', 'Newsletter design & copy', 'Segmentation & automation', 'Deliverability checks']
    },
    web: {
      title: 'Web Design & Development',
      body: 'Fast, mobile-first websites and landing pages designed around conversion, not just aesthetics.',
      points: ['Landing page design & build', 'Mobile-first, fast-loading', 'Conversion-focused layout', 'Basic SEO setup included']
    }
  };

  const modal = document.getElementById('serviceModal');
  const modalContent = document.getElementById('modalContent');

  const openModal = (key) => {
    const data = serviceDetails[key];
    if (!data) return;
    modalContent.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.body}</p>
      <ul>${data.points.map(p => `<li>${p}</li>`).join('')}</ul>
    `;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.s-card__more').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.target));
  });
  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- Contact form (client-side only) ----------
     To make this form actually deliver emails once deployed,
     connect it to a form backend such as Formspree, Netlify Forms,
     or Getform — see README.md for a 2-minute setup guide.
  ------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = 'Thanks — this form needs a backend (see README) to actually send. For now, email us directly at hello@ysentertainment.com.';
    contactForm.reset();
  });

  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterForm.reset();
    newsletterForm.querySelector('input').placeholder = 'Thanks — connect a backend to store this!';
  });

});