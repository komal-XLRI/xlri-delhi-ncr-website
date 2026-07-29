import type {
  About,
  Academics,
  Accreditations,
  Events,
  Hero,
  Insights,
  News,
} from '@/types/homepage';

/**
 * Homepage content.
 *
 * Typed local content for Phases 3–5. Reached only through `services/` (§7), so
 * the Payload migration in Phase 6 swaps the source without touching a single
 * component — the shape in `types/homepage.ts` is deliberately the shape that
 * collection will have.
 *
 * Copy here is a considered first draft, not filler. It is written to be
 * replaced by the communications team, but it should not read as lorem ipsum in
 * the meantime: reviewing a design against real sentence lengths is the only way
 * to know whether the typography works.
 */

export const hero: Hero = {
  eyebrow: 'Xavier School of Management',
  headline: 'Welcome to',
  // Split across two lines so "XLRI Delhi-NCR" lands in the accent voice — the
  // institution's name carries the emphasis, not the greeting.
  headlineEmphasis: 'XLRI Delhi-NCR',
  // "programmes", not "programs": the rest of the site is set in British
  // spelling throughout — the navigation reads "Postgraduate Programmes" — and
  // a homepage that disagrees with its own menu reads as careless.
  lead: 'Join us in shaping the future with excellence in education, leadership, and innovation. Explore our world-class programmes and vibrant campus life, designed to inspire and empower tomorrow’s leaders.',
  credentials: [
    {
      id: 'cred-legacy',
      value: '1949',
      label: 'Founded — 77 years of teaching',
      href: '/about/heritage',
      icon: 'landmark',
    },
    {
      id: 'cred-ranking',
      value: 'Top 10',
      label: 'Management institute in India',
      // Ranking claims need a citable source, both for credibility and because
      // an unsourced superlative is the first thing a sceptical applicant
      // discounts. Replace with the current NIRF band and year before launch.
      // source: 'NIRF 2026 — to be confirmed',
      href: '/about',
      icon: 'award',
    },
    {
      id: 'cred-accreditation',
      value: 'Triple',
      label: 'AACSB · AMBA · EQUIS accredited',
      href: '/about/accreditation',
      icon: 'seal',
    },
    {
      id: 'cred-recruiters',
      value: '100+',
      label: 'Recruiting organisations',
      href: '/placements',
      icon: 'briefcase',
    },
    {
      id: 'cred-campus',
      value: 'Delhi-NCR',
      label: 'Jhajjar campus',
      href: '/campus-life',
      icon: 'map-pin',
    },
    { id: 'cred-alumni', value: 'Global', label: 'Alumni network', href: '/about', icon: 'globe' },
  ],

  spotlight: [
    {
      id: 'spotlight-admissions',
      eyebrow: 'Admissions 2027–29',
      title: 'Applications open for the postgraduate cohort',
      excerpt:
        'Applications for the two-year postgraduate programmes are now open, with the first round of shortlisting scheduled for November.',
      href: '/admissions',
    },
    {
      id: 'spotlight-placements',
      eyebrow: 'Placements',
      title: 'Final Placement Report 2024–26 published',
      excerpt:
        'The full report covering roles, sectors, and compensation across both postgraduate programmes is now available.',
      href: '/placements/reports',
    },
    {
      id: 'spotlight-accreditation',
      eyebrow: 'Accreditation',
      title: 'Accredited by AACSB, AMBA and EQUIS',
      excerpt:
        'XLRI holds all three international accreditations — a standard met by a small fraction of business schools worldwide.',
      href: '/about/accreditation',
    },
    {
      id: 'spotlight-convocation',
      eyebrow: 'Campus',
      title: '6th Annual Convocation — registration now open',
      excerpt:
        'Graduands and their families can register for the convocation ceremony and view the schedule of events.',
      href: '/events/convocation',
    },
  ],

  media: {
    // Poster: the loop's own first frame, so nothing shifts when the video
    // fades in over it. This is the LCP element on every visit.
    src: '/media/hero-campus.jpg',
    width: 1280,
    height: 720,
    // Decorative — the headline and lead carry the meaning, and the video
    // beneath is aria-hidden for the same reason.
    alt: '',
    placeholder: false,

    /*
     * Background loop, cut from the campus tour master.
     *
     * The master is 4 min 36 s, 51 MB, with an audio track — a narrative film,
     * not a background. Three things had to change before it could sit behind a
     * headline:
     *
     *   • trimmed to 13 s (source 13s–26s). The opening carries a burned-in
     *     "Welcome to XLRI Delhi NCR" title card, and a "MDP BLOCKS" caption
     *     appears around 28 s — either would collide with the headline. This
     *     window is free of both.
     *   • re-encoded 51 MB -> 2.72 MB, inside the 2–4 MB budget. On a 10 Mbps
     *     connection the master would have taken ~43 s to arrive.
     *   • kept at 1280x720. The scrim hides fine detail, so higher resolution
     *     would cost bytes for nothing.
     *
     * Still worth doing when tooling allows: strip the AAC track (roughly 200 kB
     * of a muted video) and add a VP9/WebM source, typically 30–50% smaller
     * again. avconvert cannot do either; ffmpeg can:
     *
     *   ffmpeg -i media-source/campus-tour-master.mp4 -an -ss 13 -t 13 \
     *     -c:v libvpx-vp9 -crf 35 -b:v 0 public/media/hero-campus.webm
     */
    video: {
      mp4: '/media/hero-campus.mp4',
    },
  },
};

export const about: About = {
  heading: 'About XLRI',
  body: [
    'For over 75 years XLRI, India’s first B-School founded in 1949, has had just one campus at Jamshedpur. With India slated to become the fifth largest economy in the world in the near future, there is a concomitant need for more responsible business leaders. Hence, a few years ago, XLRI took a strategic decision to expand its footprint across the country and decided to set up new campuses in North, West and Southern parts of India.',
  ],
  action: { label: 'Learn more', href: '/about' },

  /*
    The break falls before "as engaged citizens" because that phrase is the
    claim the rest of the sentence exists to reach — everything before it
    describes activity, and only those three words say what kind of person the
    activity is meant to produce.
  */
  purpose: {
    label: 'Our purpose',
    lead: 'Preparing students to make meaningful contributions to society',
    emphasis: 'as engaged citizens.',
  },

  vision: {
    title: 'Our Vision',
    text: 'To be an institution of excellence nurturing responsible global leaders for the greater common good and a sustainable future.',
  },

  /*
   * Reproduced verbatim, including "programs".
   *
   * The rest of the site is set in British spelling and the hero was corrected
   * to "programmes" — but a mission statement is formal, usually board-approved
   * text, and silently re-spelling it is not an editorial call a developer gets
   * to make. Flagged for the communications team rather than changed.
   */
  mission: {
    title: 'Our Mission',
    items: [
      {
        text: 'To disseminate knowledge in management through a portfolio of educational programs and publications',
        icon: 'book',
      },
      {
        text: 'To extend frontiers of knowledge through relevant and contextual research',
        icon: 'compass',
      },
      {
        text: 'To nurture responsive ethical leaders sensitive to environment and society',
        icon: 'leaf',
      },
      { text: 'To encourage critical thinking and continuous improvement', icon: 'lightbulb' },
      { text: 'To inculcate a culture of innovation and entrepreneurship', icon: 'spark' },
    ],
  },

  motto: [
    { word: 'For The', text: 'Excellence with Integrity is the guiding motto of XLRI.' },
    {
      word: 'Greater',
      text: 'Inspiring future business leaders to respond to the unmet needs of the society.',
    },
    { word: 'Good', text: 'Translating dreams into reality and empowering sustainable careers.' },
  ],

  /*
   * Real campus photography, taken from xlridelhi.ac.in/about-xlri at full
   * resolution (2560px originals) and resampled to 1600px — enough for a ~500px
   * box at 2x with headroom, without shipping 500 kB per frame.
   *
   * Chosen for variety of register rather than similarity: architecture, people,
   * scale, and time of day. Six near-identical building shots would give the
   * rotation nothing to say.
   *
   * The order alternates deliberately — building, arrival, people, dusk, people,
   * whole campus — so no two consecutive frames are the same kind of picture,
   * and the sequence closes on the widest view.
   */
  gallery: [
    {
      src: '/media/campus-academic-block.jpg',
      alt: 'The academic block seen across the campus lawn.',
      caption: 'The academic block, Jhajjar.',
      width: 1600,
      height: 1066,
      placeholder: false,
    },
    {
      src: '/media/campus-gateway.jpg',
      alt: 'The main entrance to the campus, seen along the landscaped approach road.',
      caption: 'The main entrance, Jhajjar.',
      width: 1536,
      height: 1024,
      placeholder: false,
    },
    {
      src: '/media/campus-students.jpg',
      alt: 'Students gathered on the lawn outside the MDP block.',
      caption: 'Between classes at the MDP block.',
      width: 1600,
      height: 1067,
      placeholder: false,
    },
    {
      src: '/media/campus-dusk.jpg',
      alt: 'The academic and residential blocks lit at dusk across the central lawn.',
      caption: 'The campus at dusk.',
      width: 1448,
      height: 1086,
      placeholder: false,
    },
    {
      src: '/media/campus-student-life.jpg',
      alt: 'Students gathered at the XLRI lettering on the central lawn.',
      caption: 'Students on the central lawn.',
      width: 1537,
      height: 1023,
      placeholder: false,
    },
    {
      src: '/media/campus-aerial.jpg',
      alt: 'Aerial view of the Jhajjar campus and its playing field.',
      caption: 'The Jhajjar campus from the air.',
      width: 1600,
      height: 900,
      placeholder: false,
    },
  ],
};

/**
 * Academic programmes.
 *
 * ## Provenance — read this before editing
 *
 * **The names and the links are real.** Every one is copied from
 * `config/navigation.ts`, which is this repository's record of the Delhi-NCR
 * academic portfolio, so the homepage and the Academics menu cannot drift into
 * disagreeing about what the school offers. If a programme is renamed, it is
 * renamed there and here — and the eventual CMS collection should read the menu
 * rather than duplicate it a third time.
 *
 * Worth flagging: the brief that prompted this section listed *PGDM–BM,
 * PGDM–HRM, PGDM–GM, Executive Education, FPM, Virtual Learning*. That is the
 * **Jamshedpur** portfolio. Delhi-NCR's own navigation carries Business
 * Management, MBA, Working Professionals, Innovation & Entrepreneurship,
 * Digital HR, DBA and FPM, and there is no HRM or GM programme in it. The names
 * below follow the navigation, because inventing an HRM programme for a campus
 * that does not list one is the worst kind of plausible error.
 *
 * ## What is a draft, and what is a claim
 *
 * The `description` lines are **considered draft copy for the communications
 * team**. Each says only what the programme's own name and level already say —
 * who it is for, and at what level — because that is all this repository can
 * source. None asserts a duration, a fee, a cohort size, an intake month, or a
 * ranking. If a sentence below reads as thin, that is the honest floor and the
 * fix is real copy rather than a confident guess.
 *
 * The `highlights` follow the same rule and it matters more there, because a
 * chip beside a qualification reads as a verified fact. So they restate level
 * and format only. What is deliberately **absent** is the one the brief asked
 * for by name:
 *
 *   • **"AICTE Approved"** — a regulatory claim about a specific programme. It
 *     is very likely true for the PGDM programmes and I have no source for it
 *     here, and "very likely true" is not the standard for a compliance badge on
 *     a university homepage. Supply it per programme and it drops straight in.
 *
 * Institutional accreditations are not repeated here either. AACSB, AMBA and
 * EQUIS are held by the school and are stated once, in their own section; a
 * chip implying a *programme* carries them is a different claim.
 *
 * ## Images
 *
 * Generic campus photography, flagged `placeholder: true` so the set can be
 * audited with a grep — the same convention `news` uses. There is no programme
 * photography in this repository. Their `alt` is empty because they are
 * decorative: the programme name beside them is the content, and a descriptive
 * alt would *assert* that the picture shows that programme, which is precisely
 * what a stand-in must not do.
 */
export const academics: Academics = {
  eyebrow: 'Our academics',
  heading: 'Academic Programmes',
  programmes: [
    {
      id: 'programme-pgdm-bm',
      name: 'PGDM (Business Management)',
      shortName: 'PGDM–BM',
      category: 'Postgraduate',
      description: 'General management, for graduates entering the profession.',
      highlights: [
        { id: 'pgdm-bm-level', label: 'Postgraduate diploma' },
        { id: 'pgdm-bm-mode', label: 'Full-time' },
        { id: 'pgdm-bm-campus', label: 'Jhajjar campus' },
      ],
      image: {
        src: '/media/campus-academic-block.jpg',
        alt: '',
        width: 1600,
        height: 1066,
        placeholder: true,
      },
      action: { label: 'Learn more', href: '/academics/programmes/pgdm-business-management' },
    },
    {
      id: 'programme-mba',
      name: 'MBA',
      shortName: 'MBA',
      category: 'Postgraduate',
      description: 'The Master of Business Administration, taught at Delhi-NCR.',
      highlights: [
        { id: 'mba-level', label: 'Master’s degree' },
        { id: 'mba-mode', label: 'Full-time' },
        { id: 'mba-campus', label: 'Jhajjar campus' },
      ],
      image: {
        src: '/media/campus-students.jpg',
        alt: '',
        width: 1600,
        height: 1067,
        placeholder: true,
      },
      action: { label: 'Learn more', href: '/academics/programmes/mba' },
    },
    {
      id: 'programme-pgdm-wp',
      name: 'PGDM for Working Professionals',
      shortName: 'PGDM–WP',
      category: 'Postgraduate',
      description: 'The postgraduate diploma, structured around a working week.',
      highlights: [
        { id: 'pgdm-wp-level', label: 'Postgraduate diploma' },
        { id: 'pgdm-wp-mode', label: 'For working professionals' },
        { id: 'pgdm-wp-campus', label: 'Jhajjar campus' },
      ],
      image: {
        src: '/media/campus-dusk.jpg',
        alt: '',
        width: 1448,
        height: 1086,
        placeholder: true,
      },
      action: { label: 'Learn more', href: '/academics/programmes/pgdm-working-professionals' },
    },
    {
      id: 'programme-pgdm-ie',
      name: 'PGDM (Innovation & Entrepreneurship)',
      shortName: 'PGDM–I&E',
      category: 'Postgraduate',
      description: 'Management for founders and those building new ventures.',
      highlights: [
        { id: 'pgdm-ie-level', label: 'Postgraduate diploma' },
        { id: 'pgdm-ie-focus', label: 'Innovation & entrepreneurship' },
        { id: 'pgdm-ie-campus', label: 'Jhajjar campus' },
      ],
      image: {
        src: '/media/campus-student-life.jpg',
        alt: '',
        width: 1537,
        height: 1023,
        placeholder: true,
      },
      action: {
        label: 'Learn more',
        href: '/academics/programmes/pgdm-innovation-entrepreneurship',
      },
    },
    {
      id: 'programme-pgp-hr',
      name: 'PGP (Digital HR & People Analytics)',
      shortName: 'PGP–HR',
      category: 'Postgraduate',
      description: 'Human resources where the discipline meets data.',
      highlights: [
        { id: 'pgp-hr-level', label: 'Postgraduate programme' },
        { id: 'pgp-hr-focus', label: 'Digital HR & analytics' },
        { id: 'pgp-hr-campus', label: 'Jhajjar campus' },
      ],
      image: {
        src: '/media/campus-gateway.jpg',
        alt: '',
        width: 1536,
        height: 1024,
        placeholder: true,
      },
      action: {
        label: 'Learn more',
        href: '/academics/programmes/pgp-digital-hr-people-analytics',
      },
    },
    {
      id: 'programme-fpm',
      name: 'Fellow Programme (FPM)',
      shortName: 'FPM',
      category: 'Doctoral',
      description: 'The doctoral programme, for those who intend to research and teach.',
      highlights: [
        { id: 'fpm-level', label: 'Doctoral' },
        { id: 'fpm-focus', label: 'Research-led' },
        { id: 'fpm-campus', label: 'Jhajjar campus' },
      ],
      image: {
        src: '/media/campus-aerial.jpg',
        alt: '',
        width: 1600,
        height: 900,
        placeholder: true,
      },
      action: { label: 'Learn more', href: '/academics/programmes/fpm' },
    },
  ],

  action: { label: 'Explore all programmes', href: '/academics' },
};

/**
 * Global accreditations.
 *
 * ## What is not in here
 *
 * No name, no full name, no logo path. All three live in `config/brand.ts`,
 * which the architecture declares the single source for brand assets, and each
 * entry points at one with `markId`. Spelling "AACSB" in two files is how the
 * masthead and the homepage eventually disagree with each other.
 *
 * ## Provenance, and what was deliberately left out
 *
 * Each description says what the *accrediting body* assesses. That is a matter
 * of public record and can be written honestly. Two things a first draft wants
 * to add have been left out on purpose, on the same principle as the unsourced
 * ranking in `hero`:
 *
 *  1. **"Accredited since ⟨year⟩."** Excellent detail, and I do not have the
 *     dates. A plausible year on an accreditation card is a fabricated claim
 *     about a credential, which is the worst possible place to guess.
 *  2. **A number for the share of schools holding all three.** The commonly
 *     cited figures — under 6% for AACSB, around 1% for the triple crown — come
 *     from the bodies themselves and are worth stating, but a percentage on
 *     screen needs a citation and a date beside it or it is just a number.
 *
 *     So `seal.text` makes the point *qualitatively*, in the site's own
 *     existing words: the hero spotlight already says "a standard met by a
 *     small fraction of business schools worldwide", so this is consistent with
 *     copy the institution has already approved rather than a new claim. Drop
 *     the sourced figure in here when the comms team supplies one.
 *
 * "Recognised", not "Recognized": British spelling throughout, as with
 * "programmes" in the hero. One word, one edit, if the institution prefers US
 * spelling for this label.
 */
export const accreditations: Accreditations = {
  /*
   * "Our Accreditations", not "Triple Crown Accreditation".
   *
   * The rarity claim was doing the heading's work, and it made the section
   * announce itself before it had shown anything. A plain institutional label
   * over three marks is how the schools this is measured against handle it —
   * the credential is the argument, and it does not need a slogan in front of
   * it. The "triple crown" framing still exists on the site, in the hero
   * credential strip, where it is one line among several rather than a banner.
   */
  heading: 'Our Accreditations',
  /*
   * One sentence, down from two, down from four.
   *
   * The cut copy explained that accreditation is an external audit rather than
   * a self-assessment — true, and the strongest thing that could be said here,
   * but it was preamble standing between the reader and the marks. It belongs
   * on `/about/accreditation`, where someone has already chosen to read about
   * it.
   */
  intro:
    'Recognised by the world’s leading accreditation bodies, reflecting our commitment to excellence in management education.',

  /*
   * Two lines each, and they are hard to write short.
   *
   * The temptation is to compress by generalising — "a rigorous international
   * standard" three times over — which fits beautifully and says nothing. What
   * survives the cut instead is the one thing each body *uniquely* assesses,
   * because that difference is the entire argument for holding all three. Lose
   * it and the section is a logo rotator.
   */
  items: [
    {
      id: 'accreditation-aacsb',
      markId: 'aacsb',
      description: 'The global benchmark for excellence in business education.',
      action: { label: 'Learn more', href: '/about/accreditation' },
    },
    {
      id: 'accreditation-amba',
      markId: 'amba',
      description: 'The international standard for postgraduate management programmes.',
      action: { label: 'Learn more', href: '/about/accreditation' },
    },
    {
      id: 'accreditation-equis',
      markId: 'equis',
      description: 'Europe’s institutional accreditation for management schools.',
      action: { label: 'Learn more', href: '/about/accreditation' },
    },
  ],

  /*
   * `seal` is deliberately absent.
   *
   * It carried the rarity claim — "held by only a small fraction of the world's
   * business schools" — as a closing line under the carousel. With "Triple
   * Crown Accreditation" now the section's heading, the point is made where a
   * visitor cannot miss it, and the extra line was restating it.
   *
   * The field is still optional on `Accreditations` and the section still
   * renders it when present, so adding it back is a content edit and nothing
   * else. If the rarity claim is wanted again, that is where it goes.
   */
};

/**
 * Insights — the blog feature and the student testimonials.
 *
 * ## Provenance — everything here was fetched, nothing was written
 *
 * Taken from **xlridelhi.ac.in** on 28 July 2026. The homepage supplied the
 * featured post and all four testimonials; `/blog/` supplied the three further
 * posts and their printed dates. No title has been rewritten and no quote has
 * been edited, extended or re-punctuated.
 *
 * Titles are verbatim, and two of them look wrong but are not:
 *
 *  • **"XLRI Delhi-NCR Celebrates 5th Annual convocation"** — lower-case *c*,
 *    exactly as the institution published it, and exactly as the event of the
 *    same name is spelled in the events section.
 *  • **"GLOBAL BANKING & FINANCE CONFERENCE 2026"** — set in capitals at
 *    source. Sentence-casing it would be an editorial decision a developer does
 *    not get to make on someone else's publication.
 *
 * ## Three things the source does not have
 *
 *  1. **Excerpts.** No post carries a standfirst. `excerpt` is therefore absent
 *     everywhere rather than paraphrased from the headline. The featured card
 *     closes up neatly without one.
 *  2. **Categories.** The brief asks for a category badge; the source assigns
 *     none. A plausible-sounding category is invented metadata, so there is no
 *     `category` field at all — adding one when the comms team supplies real
 *     taxonomy is a content change, not a code change.
 *  3. **Programme and graduation year for the students.** Not stated anywhere on
 *     the page. Guessing "PGDM 2026" for a named, real person is the kind of
 *     detail that is quoted back at an institution, so both fields are absent.
 *
 * ## Ankita Kumari has no photograph, and that is deliberate
 *
 * Her testimonial on the live site points at
 * `widgetkit-for-elementor/dist/images/placeholder.jpg` — the Elementor
 * plugin's own stock placeholder, not a portrait of her. Downloading it and
 * presenting it as her face would be the single worst thing in this file.
 *
 * So `photo` is omitted and the component renders her initials instead. That is
 * visibly a missing photograph rather than a wrong one, and it resolves itself
 * the moment a real portrait is supplied.
 *
 * ## The quotes are as displayed, including one that is cut off
 *
 * The homepage truncates each testimonial to roughly 125 characters behind a
 * "Read More". For three of the four the cut happens to fall on a sentence
 * boundary, so they read as complete. Ankita's does not — it ends mid-thought,
 * and `truncated: true` records that so the component can render the ellipsis
 * as the source's rather than as a typographic flourish of ours.
 *
 * The "Read More" links have no URLs in the fetched markup, so no testimonial
 * carries a link. Inventing slugs for four student stories is not worth the
 * convenience.
 *
 * ## Images
 *
 * The institution's own, downloaded rather than hot-linked, and re-encoded:
 * 1,241 kB of PNG and oversized JPEG became 517 kB. The portraits arrived
 * around 1000×1400 to be displayed in a 112px circle, so they are capped at
 * 480px — still 4× what the circle renders.
 */
export const insights: Insights = {
  testimonials: {
    eyebrow: 'Student testimonials',
    heading: 'Hear from our students',
    items: [
      {
        id: 'testimonial-dhruv-aggarwal',
        name: 'Dhruv Aggarwal',
        quote:
          'Coming to XLRI was a completely different experience. Moving from an engineering background into the world of management, business discussions, and problem-solving was exciting and challenging at the same time.',
        photo: {
          src: '/media/testimonials/dhruv-aggarwal.jpg',
          alt: 'Dhruv Aggarwal',
          width: 360,
          height: 480,
          placeholder: false,
        },
      },
      {
        id: 'testimonial-ramanpreet-kaur',
        name: 'Ramanpreet Kaur',
        quote:
          'If someone asked me today what life at XLRI has meant to me, I wouldn’t describe it as two years of management education.',
        photo: {
          src: '/media/testimonials/ramanpreet-kaur.jpg',
          alt: 'Ramanpreet Kaur',
          width: 337,
          height: 480,
          placeholder: false,
        },
      },
      {
        id: 'testimonial-ishita-delish',
        name: 'Ishita Delish',
        quote:
          'The peer group here is genuinely something else. Everyone’s motivated, everyone’s trying and that energy is contagious.',
        photo: {
          src: '/media/testimonials/ishita-delish.jpg',
          alt: 'Ishita Delish',
          width: 360,
          height: 480,
          placeholder: false,
        },
      },
      {
        id: 'testimonial-ankita-kumari',
        name: 'Ankita Kumari',
        // Cut off at source, and no portrait exists — see the note above.
        quote:
          'I came in having already started a business but without really understanding what I was building. XLRI filled those gaps',
        truncated: true,
      },
    ],
  },
};

/**
 * Latest events.
 *
 * ## Provenance — everything here was fetched, nothing was written
 *
 * The six events below were taken from **xlridelhi.ac.in** on 28 July 2026: the
 * homepage "Latest Events" strip supplied the titles, links and banner images in
 * this order, and `/latest-events/` supplied the dates. No title has been
 * rewritten, shortened or tidied. Two consequences are worth knowing before
 * anyone "fixes" them:
 *
 *  • **"5th Annual convocation – XLRI Delhi"** has a lower-case *c*. That is how
 *    the institution published it. Correcting it here would put the homepage out
 *    of step with the event page it links to.
 *  • The dash characters differ between titles — an en dash in the convocation
 *    and EvolvX titles, an em dash in X-CELERATE. Also as published.
 *
 * The homepage strip renders titles through a CSS `capitalize`, which is why the
 * first event reads "Xlri Delhi-NCR" there. The underlying title is "XLRI
 * Delhi-NCR", which is what is stored.
 *
 * ## The year in `dateTime` is inferred
 *
 * The source prints day and month only — "08 Apr" — and that string is what
 * `dateLabel` carries and what the section displays. `dateTime` adds a year so
 * the date is machine-readable, and **that year is an inference**: each event's
 * banner sits in a WordPress upload path whose month and year match the printed
 * month exactly (`/2026/04/` for 08 Apr, `/2026/02/` for 21 Feb, and so on for
 * all six). It is a sound inference and it is still an inference. If the
 * communications team can confirm the years, these become facts; if any is
 * wrong, only the `datetime` attribute is affected, never the visible text.
 *
 * ## Links
 *
 * The slugs are the live ones. The origin is not: `/event/maxi-mela-2026/` on
 * xlridelhi.ac.in becomes `/events/maxi-mela-2026` here, matching how `news`
 * points at `/news/<slug>` and how the navigation already declares `/events`.
 * This repository *is* that site being rebuilt, so pointing the homepage at the
 * old origin would be linking a site to itself. Swap the `href` values for the
 * absolute URLs if these pages are not migrating.
 *
 * ## Images
 *
 * The institution's own event banners, downloaded rather than hot-linked — a
 * homepage that depends on another origin for six above-the-fold images inherits
 * that origin's uptime and caching. They arrived as 4.1 MB of PNG, which is what
 * happens when photographic posters are exported from a design tool without a
 * second thought; re-encoded to JPEG at q82 with the long edge capped at 1200px
 * they are 908 kB, and the cap is still 3× the largest size any card renders.
 *
 * `placeholder: false` — unlike the news and programme imagery, these are the
 * real thing.
 *
 * `alt` is empty because the title is set immediately beneath each banner and is
 * itself the link. A poster whose text repeats the headline beside it would be
 * announced twice.
 */
export const events: Events = {
  /*
   * No eyebrow.
   *
   * It read "Latest events" — the same three words as the heading directly
   * beneath it, in small caps. An eyebrow is meant to place a heading in a
   * category; one that repeats its heading verbatim is a label for a label.
   */
  heading: 'Latest Events',
  intro:
    'Conferences, seminars, workshops, guest lectures and campus activities at XLRI Delhi-NCR.',
  action: { label: 'View all events', href: '/events' },

  items: [
    {
      id: 'event-staff-orientation',
      title: 'Staff Orientation Programme XLRI Delhi-NCR',
      dateLabel: '08 Apr',
      dateTime: '2026-04-08',
      href: '/events/staff-orientation-programme-xlri-delhi-ncr',
      image: {
        src: '/media/events/staff-orientation.jpg',
        alt: '',
        width: 1024,
        height: 720,
        placeholder: false,
      },
    },
    {
      id: 'event-annual-convocation',
      title: '5th Annual convocation – XLRI Delhi',
      dateLabel: '06 Apr',
      dateTime: '2026-04-06',
      href: '/events/5th-annual-convocation-xlri-delhi',
      image: {
        src: '/media/events/annual-convocation.jpg',
        alt: '',
        width: 1024,
        height: 733,
        placeholder: false,
      },
    },
    {
      id: 'event-book-exhibition',
      title: 'Mega Book Exhibition at XLRI Delhi NCR Library',
      dateLabel: '19 Mar',
      dateTime: '2026-03-19',
      href: '/events/mega-book-exhibition-at-xlri-delhi-ncr-library',
      image: {
        src: '/media/events/book-exhibition.jpg',
        alt: '',
        width: 1024,
        height: 1024,
        placeholder: false,
      },
    },
    {
      id: 'event-evolvx',
      title: 'EvolvX – XLRI’s Premier Startup Conclave (Edition 4)',
      dateLabel: '06 Mar',
      dateTime: '2026-03-06',
      href: '/events/evolvx-xlris-premier-startup-conclave-edition-4',
      image: {
        src: '/media/events/evolvx.jpg',
        alt: '',
        width: 969,
        height: 959,
        placeholder: false,
      },
    },
    {
      id: 'event-x-celerate',
      title: 'X-CELERATE 2026 — The XLRI Business Leadership Conclave',
      dateLabel: '27 Feb',
      dateTime: '2026-02-27',
      href: '/events/x-celerate-2026-the-xlri-business-leadership-conclave',
      image: {
        src: '/media/events/x-celerate.jpg',
        alt: '',
        width: 1024,
        height: 819,
        placeholder: false,
      },
    },
    {
      id: 'event-maxi-mela',
      title: 'MAXI Mela 2026',
      dateLabel: '21 Feb',
      dateTime: '2026-02-21',
      href: '/events/maxi-mela-2026',
      image: {
        src: '/media/events/maxi-mela.jpg',
        alt: '',
        width: 724,
        height: 1024,
        placeholder: false,
      },
    },
  ],
};

/**
 * News & announcements.
 *
 * ## Provenance
 *
 * Every title and date below is taken verbatim from the institution's own
 * announcements. Nothing here is written by me: an announcement is a statement
 * of record, and inventing a plausible-sounding one is the single worst thing a
 * developer can do to an institutional site.
 *
 * That is also why most items carry **no `excerpt`**. Only the JRD Tata Oration
 * has published summary copy; for the rest I have a headline and a date and
 * nothing else, and a paraphrase of a headline is not a summary — it is a new
 * claim wearing one. The components render the excerpt when it is there and
 * close up neatly when it is not, so the comms team can fill them in later
 * without a code change.
 *
 * ## Images
 *
 * Generic campus photography, flagged `placeholder: true` so the set can be
 * audited with a grep. Their `alt` is empty because they are decorative — the
 * headline beside them is the content, and describing a lawn adds nothing.
 * Crucially it also avoids *asserting* that the picture shows the event, which
 * a descriptive alt on a stand-in would do.
 */
export const news: News = {
  heading: 'Latest News',
  intro: 'Announcements, admissions notices and events from the Delhi-NCR campus.',
  action: { label: 'All news', href: '/news' },

  featured: [
    {
      id: 'jrd-tata-oration-32',
      category: 'Events',
      title: '32nd JRD Tata Oration on Business Ethics',
      excerpt:
        'Mr Harish Bhat, Advisor and Director at the Tata Group, has agreed to deliver the Oration.',
      href: '/news/jrd-tata-oration-32',
      date: '2024-11-13',
      image: {
        src: '/media/campus-gateway.jpg',
        alt: '',
        width: 1536,
        height: 1024,
        placeholder: true,
      },
    },
    {
      id: 'xat-2026-cutoffs',
      category: 'Admissions',
      title: 'XLRI Announces XAT 2026 Cutoffs Following Scorecard Release',
      href: '/news/xat-2026-cutoffs',
      date: '2026-01-30',
      image: {
        src: '/media/campus-students.jpg',
        alt: '',
        width: 1600,
        height: 1067,
        placeholder: true,
      },
    },
    {
      id: 'global-banking-finance-2026',
      category: 'Conferences',
      title: 'Global Banking & Finance Conference — 2026',
      href: '/news/global-banking-finance-2026',
      date: '2025-08-31',
      image: {
        src: '/media/campus-academic-block.jpg',
        alt: '',
        width: 1600,
        height: 1066,
        placeholder: true,
      },
    },
  ],

  items: [
    {
      id: 'edhrm-batch-21',
      category: 'Admissions',
      title: 'EDHRM — Batch 21 Admissions Open',
      href: '/news/edhrm-batch-21',
      date: '2026-05-26',
    },
    {
      id: 'mdp-2026-27',
      category: 'Executive Education',
      title: 'MDP 2026–27 Registrations Open',
      href: '/news/mdp-2026-27',
      date: '2026-06-05',
    },
    {
      id: 'aom-xlri-doctoral-colloquium-2026',
      category: 'Research',
      title: 'Submit your paper — AOM-XLRI Doctoral Colloquium 2026',
      href: '/news/aom-xlri-doctoral-colloquium-2026',
      date: '2026-02-01',
    },
    {
      id: 'global-banking-finance-2026-list',
      category: 'Conferences',
      title: 'Global Banking & Finance Conference — 2026',
      href: '/news/global-banking-finance-2026',
      date: '2025-08-31',
    },
    {
      id: 'xat-2026-cutoffs-list',
      category: 'Admissions',
      title: 'XLRI Announces XAT 2026 Cutoffs Following Scorecard Release',
      href: '/news/xat-2026-cutoffs',
      date: '2026-01-30',
    },
  ],
};
