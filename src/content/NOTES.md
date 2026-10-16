# Content notes

Editorial notes for the JSON content files: where text came from, what was
checked, and what still needs confirming. They used to be comments in the
TypeScript content modules; JSON cannot hold comments, so they live here,
grouped by file and by the field they describe.

When you change a field that has a note, read the note first, and update or
remove it if it no longer applies.

## Search (meta titles and descriptions)

Every page's `meta.title` and `meta.description` are what search engines show
for it. Two lengths matter:

- **Description: 120–160 characters.** Longer is cut off in results; shorter
  says too little. Say what the page is and who it is for, in plain words.
- **Title: short.** The site adds " | XLRI Delhi-NCR" when the whole fits in
  about 65 characters, and leaves it off when it does not, so a long title is
  shown without the site's name rather than cut. A `meta.title` may be shorter
  than the page's heading (the EMDP programmes' are).

A policy page with no text yet asks search engines not to list it, and is
left out of `/sitemap.xml`, until its text is added.
The sitemap, `robots.txt`, the share card (`public/brand/share-default.jpg`)
and the structured data search engines read are all built from the content,
so there is nothing else to update when a page is added.

## Files (PDFs and videos)

Every document and video the site links to is served from `public/`:
documents under `public/documents/<section>/`, videos under `public/media/`,
with lowercase-kebab names. Link them by their path ("/documents/…"), not
by a full URL.

Nothing is linked from the WordPress site's `/wp-content/uploads/` any more.
Those files were downloaded on 16 October 2026. The two PGDM-IEV videos were
re-encoded to 1080p for the web (the ElevateX recap was 103 MB, over GitHub's
100 MB limit; it is now 19 MB). Old `/wp-content/uploads/…` addresses forward
to the copies: the list is `src/config/legacy-uploads.json`, read by
`next.config.ts`. When a file is replaced, keep its entry there pointing at
the new one.

## about.json

**about**

"About" landing page content.

#### Sources

The Delhi-NCR page (xlridelhi.ac.in/about-xlri/) has two short sections —
"XLRI" and "Delhi-NCR Campus" — and a gallery of campus photographs. Its text
is used verbatim: the founding paragraph leads the hero, the "whole-person"
sentence introduces the navy band, and both campus paragraphs sit in the
campus section. The photographs are its gallery originals (looked up through
the site's media API; the page itself only serves thumbnails), re-encoded
and self-hosted under public/media/about/.

The Jamshedpur layout this follows also needs short headings and card copy
the Delhi page does not have. Those are drawn from Delhi's own published
words elsewhere — the navy band's heading is two of its stated values, the
intro heading condenses its vision statement, and each card quotes the page
it links to — so nothing here is invented.

Jesuit names follow the house style, "Fr. Firstname Surname, SJ".

**heading**

Condensed from the vision statement: "To be an institution of excellence
nurturing responsible global leaders for the greater common good and a
sustainable future."

**heading**

Two of the seven values on Vision & Mission.

## accreditation.json

**accreditation**

"Accreditation" content.

#### Sources

The Delhi-NCR page (xlridelhi.ac.in/about-xlri/accreditation/) carries no
running text — only the AMBA and BGA certificates of January 2025. So the
words here are the certificates' own: what each accredits, when, and the
awarding body's description of itself, transcribed from the documents.

The one sentence that is not on a certificate is the intro, which gives the
terms (five years, AMBA for the third consecutive time). It is XLRI's own
published statement, from the 2025 entry of the Jamshedpur heritage timeline.

Images: the certificates re-encoded at 1092px, and each body's mark cropped
from the head of its certificate — the site has no BGA logo file, and
cropping both keeps the two marks consistent. Each crop was whitened by
scaling every channel so the certificate's paper colour maps to pure white;
without that the cream paper showed as a box on the white card, and
`mix-blend-multiply` cannot remove a tint, only white. Banner: the Delhi campus
photograph already used on Vision & Mission.

## board-of-governors.json

**boardOfGovernors**

"Board of Governors" content.

From the XLRI Jamshedpur page (xlri.ac.in/about/board-of-governors) — one
board governs both campuses. That page fills itself at runtime from XLRI's
CMS (xlri-live.xlri.edu/xlri-cms/template/xlri/board-of-governor); this file
was generated from the same feed, so the people, order and designations match
it exactly. Portraits are the feed's 270×315 originals, self-hosted under
public/media/board-of-governors/.

Two edits to the feed: designations, which arrive as HTML with <br> breaks,
are split into lines; and Jesuit names follow the house style used across
these pages, "Fr. Firstname Surname, SJ", where the feed has "Fr … S.J.".

Membership changes. When it does, update this file from the feed rather than
by hand — or, once Payload lands, from the CMS directly.

## centres/design-of-automobiles.json

**automobileDesignCentre**

Indian School for Design of Automobiles (INDEA).

#### Sources

Everything is from the Delhi-NCR page
(xlridelhi.ac.in/indian-school-for-design-of-automobiles/), verbatim but for
these repairs:

- "The groundbreaking … ceremony … was took place" → "took place".
- "‘Does India Need a Design DNA’?" → "‘Does India Need a Design DNA?’".
- "…from the 1970s.Visitors" — the missing space restored.
- The debate paragraph sets names in Unicode "mathematical bold" letters
  (𝗗𝗿 𝗙𝗿. 𝗞.𝗦. …), which screen readers spell out or skip; they are
  plain text here. "Shri." → "Shri"; the Director's name in the house style.
- The long curriculum paragraph is split where its subject changes, so the
  flagship programme can be set as a callout. No words are changed.

Photographs are the page's own, at full size from the site's media library,
self-hosted under public/media/centres/design-of-automobiles/. The Marcello
Gandini image on the Delhi page has his message set into the picture; here
the photograph is cropped to him and the message is real text.

The press list keeps the Delhi page's order. Its two broken links (stray
"%20"s) are handled: the ET Auto one is repaired, and the BW AutoWorld one
duplicated a working link beside it, so it is dropped. Headlines are the
articles' own titles.

## centres/gender-equality.json

**genderEqualityCentre**

XLRI Centre for Gender Equality & Inclusive Leadership (CGEIL).

#### Sources

Everything is from the Delhi-NCR page
(xlridelhi.ac.in/centre-for-gender-equality-inclusive-leadership/): the
introduction, purpose, structure, news & events, Board of Advisors and
Chairperson, verbatim. Photographs are the page's own — advisor portraits as
published, and news images at their full size from the site's media library
(two, up! SWING and up! SCALE, exist only as the page's 580px thumbnails).
All self-hosted under public/media/centres/gender-equality/.

The people and news data were generated from the page, not retyped. Two
repairs to the source: Sohini Bhattacharyara's biography was split
mid-sentence across three paragraphs and is rejoined; Veena Swarup's closing
sentence was fused onto her last bullet point and is separated.

The four facts in the about strip are each stated in the page's own text —
nothing is added.

## centres/healthcare-management.json

**healthcareCentre**

XLRI Centre for Healthcare Management.

#### Sources

Everything is from the Delhi-NCR page
(xlridelhi.ac.in/xlri-center-for-healthcare-management/). The wording is
the page's own, with these repairs:

- "Center" → "Centre", the spelling the rest of this site (and its
  navigation) uses for every centre.
- "The vision … is position XLRI" → "is to position XLRI".
- "In today’s era. collaborations" → "In today’s era, collaborations".
- "Along-with" → "Along with"; "its’ collaborating institutions" → "its".
- "design cutting programs" → "design cutting-edge programs".
- The long "About" paragraph is split where its subject changes. Its last
  sentence on the Delhi page is a fragment ("It is against this
  backdrop."), which the Mission completes; it is kept as published.

The two lists in the ecosystem panel are lifted, word for word, from the
"About" paragraph that names them.

The photographs are the three on the Delhi page — the Centre's partnership
signings with CMC Vellore, SRIHER and St. John’s — at full size from the
site's media library, self-hosted under
public/media/centres/healthcare-management/.

## centres/public-policy.json

**publicPolicyCentre**

XLRI Centre for Public Policy and Public Affairs (XLCP).

#### Sources

The text is the Delhi-NCR page
(xlridelhi.ac.in/center-for-public-policy-and-public-affairs/), verbatim but
for one typo ("a hub ofgf cutting-edge ideas" → "of"). The Delhi heading
spells it "Center"; the page's own paragraph, and the rest of this site,
spell it "Centre", so the title does too.

The photograph is the one the Delhi page uses as its banner — the "I ♥ XLRI"
lawn in front of the academic blocks — already self-hosted for Vision &
Mission, so it is reused rather than copied.

The facts beside the text are each stated in the paragraphs; nothing is
added.

## directors-desk.json

**directorsDesk**

"From the Director's Desk" content.

Copied verbatim from the current site
(xlridelhi.ac.in/about-xlri/from-the-directors-desk/) — this is the Director's
own message, so it is not ours to edit for house style. The only changes are
structural: the four hallmarks are split out into title and body,
and the sign-off is separated from the body.

Portrait: wp-content/uploads/2026/07/fr-tony.jpg, 900×1200, self-hosted under
public/media/leadership/ so the page has no runtime dependency on the old site.

## executive-education/emdp.json

**emdp**

Executive Education › EMDP.

#### Sources

The Delhi-NCR page (xlridelhi.ac.in/emdp-2/): the introduction and every
programme in its Upcoming and On-going lists, in its order, with their
dates, durations, hours, notes and links. Posters are the page's own,
self-hosted under public/media/executive-education/emdp/.

The three "offerings" restate the introduction's three sentences as
headings over its own words; nothing is added.

#### Repairs to the source

- Titles set in capitals on the Delhi page are in title case here, so the
  list reads as one list.
- "Know More" links that pointed into a trashed folder (`/emdp-2__trashed/…`)
  or that redirect are written as the address they resolve to.
- Most "Apply Now" and "Pay Now" buttons on the Delhi page link to `#respond`
  — the comment form, not a payment or application. Those are left out;
  only working destinations are kept.
- Tracking parameters are stripped from the IPAG links.

Two upcoming programmes (Strategy & Leadership batch 4, Strategic HR
Leadership batch 7) have posters that say "Ongoing"; the Delhi page lists
them as upcoming, and so does this file.

## executive-education/icp.json

**icp**

Executive Education › In-Company Programmes (ICP).

#### Sources

- **Delhi-NCR page** (xlridelhi.ac.in/icp/): the heading and the seven past
  programmes, each with the organisation it was run for. The titles are
  verbatim. The hours, batches and participant counts that the Delhi page
  writes into the titles are lifted out as `details`; nothing is added.
  "Mercedes Benz" is written with its hyphen.
- **Photograph**: the MDP Block on the Delhi-NCR campus, the photograph the
  Delhi page sets beside the list (2560×1707).
- **Contact**: the Delhi-NCR campus phone and email from the Delhi site's
  footer. The Delhi page names no ICP office of its own.

`summary` describes what the page lists. The Delhi page has no intro text,
so it claims nothing beyond the programmes below it.

## executive-education/mdp.json

**mdp**

Executive Education › Management Development Programmes (MDPs).

#### Sources

- **Delhi-NCR page** (xlridelhi.ac.in/mdp/): the heading, tagline, the
  annual-refresh line, the overview and the calendar document, verbatim.
  The calendar (XLRI MDP Calendar 2025–26, 8 pages) is self-hosted under
  public/documents/executive-education/.
- **That calendar**: the at-a-glance figures, the venue split, the
  residential rates, the discount policy and the MDP office contacts. The
  figures were counted from its programme table (84 programmes, May 2025 to
  March 2026), not estimated.
- **Photograph**: the MDP Block on the Delhi-NCR campus, from the Delhi
  site's own Executive Education menu. The media library holds it only at
  500×300; replace it with a larger photograph when one is available.

The four overview pillars are phrases from the overview paragraph, lifted
out as headings over its own words.

Every programme in the 2025–26 calendar has now run. The page says so and
offers the document, rather than listing dates that have passed; replace
the document and the figures when the 2026–27 calendar is published.

## founding-fathers.json

**File**

"Jesuit Founding Fathers" content.

Text and portraits from the XLRI Jamshedpur page
(xlri.ac.in/about/jesuit-founding-fathers), verbatim — it is one history for
both campuses. Portraits are their 270×315 originals re-encoded as JPEG and
self-hosted under public/media/founding-fathers/.

## heritage.json

**heritage**

"Heritage" content.

#### Sources

Text is the Delhi-NCR site's own (xlridelhi.ac.in/heritage/), verbatim, with
two exceptions noted inline. Photographs and the film come from the
Jamshedpur page (xlri.ac.in/about/heritage), which holds the institution's
archive — it is one XLRI history — except the 2020 entry, which uses the
Delhi site's own photograph of the Jhajjar campus.

The timeline entry titles are Jamshedpur's: the Delhi timeline has a year and
a sentence but no title, and the design sets one per slide.

All images self-hosted under public/media/heritage/.

**id**

The Delhi site labels this entry 1969, but its own text — and the
Jamshedpur timeline — date the inauguration to 1962.

## homepage.json

**hero**

Homepage content.

Typed local content for Phases 3–5. Reached only through `services/` (§7), so
the Payload migration in Phase 6 swaps the source without touching a single
component — the shape in `types/homepage.ts` is deliberately the shape that
collection will have.

Copy here is a considered first draft, not filler. It is written to be
replaced by the communications team, but it should not read as lorem ipsum in
the meantime: reviewing a design against real sentence lengths is the only way
to know whether the typography works.

**headlineEmphasis**

Split across two lines so "XLRI Delhi-NCR" lands in the accent voice — the
institution's name carries the emphasis, not the greeting.

**lead**

"programmes", not "programs": the rest of the site is set in British
spelling throughout — the navigation reads "Postgraduate Programmes" — and
a homepage that disagrees with its own menu reads as careless.

**href**

Ranking claims need a citable source, both for credibility and because
an unsourced superlative is the first thing a sceptical applicant
discounts. Replace with the current NIRF band and year before launch.
source: 'NIRF 2026 — to be confirmed',

**src**

Poster: the loop's own first frame, so nothing shifts when the video
fades in over it. This is the LCP element on every visit.

**alt**

Decorative — the headline and lead carry the meaning, and the video
beneath is aria-hidden for the same reason.

**video**

Background loop, cut from the campus tour master.

The master is 4 min 36 s, 51 MB, with an audio track — a narrative film,
not a background. Three things had to change before it could sit behind a
headline:

• trimmed to 13 s (source 13s–26s). The opening carries a burned-in
"Welcome to XLRI Delhi NCR" title card, and a "MDP BLOCKS" caption
appears around 28 s — either would collide with the headline. This
window is free of both.
• re-encoded 51 MB -> 2.72 MB, inside the 2–4 MB budget. On a 10 Mbps
connection the master would have taken ~43 s to arrive.
• kept at 1280x720. The scrim hides fine detail, so higher resolution
would cost bytes for nothing.

Still worth doing when tooling allows: strip the AAC track (roughly 200 kB
of a muted video) and add a VP9/WebM source, typically 30–50% smaller
again. avconvert cannot do either; ffmpeg can:

ffmpeg -i media-source/campus-tour-master.mp4 -an -ss 13 -t 13 \
-c:v libvpx-vp9 -crf 35 -b:v 0 public/media/hero-campus.webm

**purpose**

The break falls before "as engaged citizens" because that phrase is the
claim the rest of the sentence exists to reach — everything before it
describes activity, and only those three words say what kind of person the
activity is meant to produce.

**mission**

Reproduced verbatim, including "programs".

The rest of the site is set in British spelling and the hero was corrected
to "programmes" — but a mission statement is formal, usually board-approved
text, and silently re-spelling it is not an editorial call a developer gets
to make. Flagged for the communications team rather than changed.

**gallery**

Real campus photography, taken from xlridelhi.ac.in/about-xlri at full
resolution (2560px originals) and resampled to 1600px — enough for a ~500px
box at 2x with headroom, without shipping 500 kB per frame.

Chosen for variety of register rather than similarity: architecture, people,
scale, and time of day. Six near-identical building shots would give the
rotation nothing to say.

The order alternates deliberately — building, arrival, people, dusk, people,
whole campus — so no two consecutive frames are the same kind of picture,
and the sequence closes on the widest view.

**academics**

Academic programmes.

#### Provenance — read this before editing

**The names and the links are real.** Every one is copied from
`config/navigation.ts`, which is this repository's record of the Delhi-NCR
academic portfolio, so the homepage and the Academics menu cannot drift into
disagreeing about what the school offers. If a programme is renamed, it is
renamed there and here — and the eventual CMS collection should read the menu
rather than duplicate it a third time.

Worth flagging: the brief that prompted this section listed _PGDM–BM,
PGDM–HRM, PGDM–GM, Executive Education, FPM, Virtual Learning_. That is the
**Jamshedpur** portfolio. Delhi-NCR's own navigation carries Business
Management, MBA, Working Professionals, Innovation & Entrepreneurship,
Digital HR, DBA and FPM, and there is no HRM or GM programme in it. The names
below follow the navigation, because inventing an HRM programme for a campus
that does not list one is the worst kind of plausible error.

#### What is a draft, and what is a claim

The `description` lines are **considered draft copy for the communications
team**. Each says only what the programme's own name and level already say —
who it is for, and at what level — because that is all this repository can
source. None asserts a duration, a fee, a cohort size, an intake month, or a
ranking. If a sentence below reads as thin, that is the honest floor and the
fix is real copy rather than a confident guess.

The `highlights` follow the same rule and it matters more there, because a
chip beside a qualification reads as a verified fact. So they restate level
and format only. What is deliberately **absent** is the one the brief asked
for by name:

• **"AICTE Approved"** — a regulatory claim about a specific programme. It
is very likely true for the PGDM programmes and I have no source for it
here, and "very likely true" is not the standard for a compliance badge on
a university homepage. Supply it per programme and it drops straight in.

Institutional accreditations are not repeated here either. AACSB, AMBA and
EQUIS are held by the school and are stated once, in their own section; a
chip implying a _programme_ carries them is a different claim.

#### Images

Generic campus photography, flagged `placeholder: true` so the set can be
audited with a grep — the same convention `news` uses. There is no programme
photography in this repository. Their `alt` is empty because they are
decorative: the programme name beside them is the content, and a descriptive
alt would _assert_ that the picture shows that programme, which is precisely
what a stand-in must not do.

**accreditations**

Global accreditations.

#### What is not in here

No name, no full name, no logo path. All three live in `config/brand.ts`,
which the architecture declares the single source for brand assets, and each
entry points at one with `markId`. Spelling "AACSB" in two files is how the
masthead and the homepage eventually disagree with each other.

#### Provenance, and what was deliberately left out

Each description says what the _accrediting body_ assesses. That is a matter
of public record and can be written honestly. Two things a first draft wants
to add have been left out on purpose, on the same principle as the unsourced
ranking in `hero`:

1.  **"Accredited since ⟨year⟩."** Excellent detail, and I do not have the
    dates. A plausible year on an accreditation card is a fabricated claim
    about a credential, which is the worst possible place to guess.
2.  **A number for the share of schools holding all three.** The commonly
    cited figures — under 6% for AACSB, around 1% for the triple crown — come
    from the bodies themselves and are worth stating, but a percentage on
    screen needs a citation and a date beside it or it is just a number.

So `seal.text` makes the point _qualitatively_, in the site's own
existing words: the hero spotlight already says "a standard met by a
small fraction of business schools worldwide", so this is consistent with
copy the institution has already approved rather than a new claim. Drop
the sourced figure in here when the comms team supplies one.

"Recognised", not "Recognized": British spelling throughout, as with
"programmes" in the hero. One word, one edit, if the institution prefers US
spelling for this label.

**heading**

"Our Accreditations", not "Triple Crown Accreditation".

The rarity claim was doing the heading's work, and it made the section
announce itself before it had shown anything. A plain institutional label
over three marks is how the schools this is measured against handle it —
the credential is the argument, and it does not need a slogan in front of
it. The "triple crown" framing still exists on the site, in the hero
credential strip, where it is one line among several rather than a banner.

**intro**

One sentence, down from two, down from four.

The cut copy explained that accreditation is an external audit rather than
a self-assessment — true, and the strongest thing that could be said here,
but it was preamble standing between the reader and the marks. It belongs
on `/about-xlri/accreditation`, where someone has already chosen to read about
it.

**items**

Two lines each, and they are hard to write short.

The temptation is to compress by generalising — "a rigorous international
standard" three times over — which fits beautifully and says nothing. What
survives the cut instead is the one thing each body _uniquely_ assesses,
because that difference is the entire argument for holding all three. Lose
it and the section is a logo rotator.

**accreditations (the homepage mark set)**

`seal` is deliberately absent.

It carried the rarity claim — "held by only a small fraction of the world's
business schools" — as a closing line under the carousel. With "Triple
Crown Accreditation" now the section's heading, the point is made where a
visitor cannot miss it, and the extra line was restating it.

The field is still optional on `Accreditations` and the section still
renders it when present, so adding it back is a content edit and nothing
else. If the rarity claim is wanted again, that is where it goes.

**insights**

Insights — the blog feature and the student testimonials.

#### Provenance — everything here was fetched, nothing was written

Taken from **xlridelhi.ac.in** on 28 July 2026. The homepage supplied the
featured post and all four testimonials; `/blog/` supplied the three further
posts and their printed dates. No title has been rewritten and no quote has
been edited, extended or re-punctuated.

Titles are verbatim, and two of them look wrong but are not:

• **"XLRI Delhi-NCR Celebrates 5th Annual convocation"** — lower-case _c_,
exactly as the institution published it, and exactly as the event of the
same name is spelled in the events section.
• **"GLOBAL BANKING & FINANCE CONFERENCE 2026"** — set in capitals at
source. Sentence-casing it would be an editorial decision a developer does
not get to make on someone else's publication.

#### Three things the source does not have

1.  **Excerpts.** No post carries a standfirst. `excerpt` is therefore absent
    everywhere rather than paraphrased from the headline. The featured card
    closes up neatly without one.
2.  **Categories.** The brief asks for a category badge; the source assigns
    none. A plausible-sounding category is invented metadata, so there is no
    `category` field at all — adding one when the comms team supplies real
    taxonomy is a content change, not a code change.
3.  **Programme and graduation year for the students.** Not stated anywhere on
    the page. Guessing "PGDM 2026" for a named, real person is the kind of
    detail that is quoted back at an institution, so both fields are absent.

#### Ankita Kumari has no photograph, and that is deliberate

Her testimonial on the live site points at
`widgetkit-for-elementor/dist/images/placeholder.jpg` — the Elementor
plugin's own stock placeholder, not a portrait of her. Downloading it and
presenting it as her face would be the single worst thing in this file.

So `photo` is omitted and the component renders her initials instead. That is
visibly a missing photograph rather than a wrong one, and it resolves itself
the moment a real portrait is supplied.

#### The quotes are as displayed, including one that is cut off

The homepage truncates each testimonial to roughly 125 characters behind a
"Read More". For three of the four the cut happens to fall on a sentence
boundary, so they read as complete. Ankita's does not — it ends mid-thought,
and `truncated: true` records that so the component can render the ellipsis
as the source's rather than as a typographic flourish of ours.

The "Read More" links have no URLs in the fetched markup, so no testimonial
carries a link. Inventing slugs for four student stories is not worth the
convenience.

#### Images

The institution's own, downloaded rather than hot-linked, and re-encoded:
1,241 kB of PNG and oversized JPEG became 517 kB. The portraits arrived
around 1000×1400 to be displayed in a 112px circle, so they are capped at
480px — still 4× what the circle renders.

**quote**

Cut off at source, and no portrait exists — see the note above.

**events**

The strip's heading, intro and links only, and `count`, how many events it
shows: the events themselves are the newest `count` from `events.json`,
whose section below has their provenance.

**heading**

No eyebrow.

It read "Latest events" — the same three words as the heading directly
beneath it, in small caps. An eyebrow is meant to place a heading in a
category; one that repeats its heading verbatim is a label for a label.

**news**

News & announcements.

#### Provenance

Every title and date below is taken verbatim from the institution's own
announcements. Nothing here is written by me: an announcement is a statement
of record, and inventing a plausible-sounding one is the single worst thing a
developer can do to an institutional site.

That is also why most items carry **no `excerpt`**. Only the JRD Tata Oration
has published summary copy; for the rest I have a headline and a date and
nothing else, and a paraphrase of a headline is not a summary — it is a new
claim wearing one. The components render the excerpt when it is there and
close up neatly when it is not, so the comms team can fill them in later
without a code change.

#### Images

Generic campus photography, flagged `placeholder: true` so the set can be
audited with a grep. Their `alt` is empty because they are decorative — the
headline beside them is the content, and describing a lawn adds nothing.
Crucially it also avoids _asserting_ that the picture shows the event, which
a descriptive alt on a stand-in would do.

## leadership.json

**leadership**

"Leadership & Administration" content.

From the Delhi-NCR page (xlridelhi.ac.in/about-xlri/leadership-administration/):
the three leaders shown at its head, and the full "XLRI Councils & Committees
for 2025-2026" listing beneath them.

#### The committee listing is generated, not retyped

Roughly 250 lines of names — transcribing them by hand would guarantee errors.
They were parsed from the published page and emitted here verbatim, including
its inconsistent capitalisation and spellings ("Sakhhi", "Mukheerjee",
"Srimannarayan" / "Srimannarayana"); correcting a name is the communications
team's call, not ours. The page renders headings in uppercase, so the mixed
case of the source does not show.

Three mechanical changes only: list numbers are dropped (the page renders an
ordered list, which also fixes D1, numbered 1–6, 6, 7, 8, 7, 8 at source); in
D2 "Kapoor" had a Cyrillic “р” in place of the Latin “p”, which would break
search; and Jesuit names follow one house style, "Fr. Firstname Surname, SJ",
where the source mixed "Fr" / "Fr." and "SJ" / "S.J." (the same rule is
applied on From the Director's Desk).

Portraits: the Director's is the one on From the Director's Desk; the Deans'
are the Delhi site's 900×1200 originals re-encoded as JPEG.

## mandatory-disclosure.json

**mandatoryDisclosure**

"Mandatory Disclosure" content.

The Delhi-NCR page (xlridelhi.ac.in/about-xlri/mandatory-disclosure/) is a
title, "XLRI Delhi - NCR", and one embedded PDF — the November 2025
disclosure. It is self-hosted under public/documents/ so the page has no
runtime dependency on the old site.

Only that document is listed, deliberately. The old site's media library also
holds a 2024 disclosure and two AICTE Extension of Approval letters (one
linked from its footer, a newer one not linked anywhere), but this is a
statutory page: which documents belong on it is the institution's call, not
something to infer from what happens to be uploaded. Add an entry here and
the page grows Jamshedpur's tab row automatically.

## placements.json

**File**

Placements.

#### Sources

Everything here is from the Delhi-NCR placement page
(xlridelhi.ac.in/placement/), which carries both seasons on one page under
two tabs. This site splits it into an overview, one page per season and
the archive.

- **Report text** — the introductions, the Director's statements, the "Key
  Highlights" lists and the sector paragraphs — is verbatim. `**…**` marks
  the figures set in bold, as the institute's own placement page does.
- **`headline`** repeats four figures from the text for the stats strip and
  the overview cards; **`recruiters`** is the "highest number of offers"
  line as a list, for the overview.
- **The summer highlights** are headed "Summer Placements 2024" on the
  Delhi page, but their figures are the 2025 process described above
  them, so they are shown under 2025.
- **Photograph** — the 2024–26 batch, the image on the Delhi page.
- **The 2024–26 final report PDF** is from the Delhi media library and is
  self-hosted. The archive documents are linked where the Delhi page links
  them (XLRI's media library); all 29 resolved when the page was built.

`overview.intro` describes what the section covers; it claims nothing
beyond the reports.

## programmes/pgdm-bm.json

**pgdmBm**

PGDM BM — Postgraduate Diploma in Business Management.

#### Sources

- **Delhi-NCR page** (xlridelhi.ac.in/pgdm-bm/): the introduction, the
  photograph, the "BM Courses" document and the "For more information" link,
  verbatim. The document (BM Syllabus 2024–26, 361 pages) is self-hosted
  under public/documents/academics/.
- **Institute page** (xlri.ac.in/academic-programmes/school-of-business/
  pgdbm), which the Delhi page links to for more information: the
  curriculum paragraph and the Programme Design and Requirements areas. The
  course names were checked against Delhi's own BM syllabus, which contains
  them. The institute page lists an "Environment, Society and Governance"
  area with no courses under it; it is shown in the same place, and its
  card points to the BM Courses document rather than inventing courses.
  Area names are in title case here; the institute page sets most in
  capitals and misspells "Managment".

One repair: "on the completion which" → "on the completion of which".

The three facts are stated in the introduction.

## programmes/pgdm-iev.json

**pgdmIev**

PGDM - IEV — Post Graduate Diploma in Management (Innovation,
Entrepreneurship & Venture Development).

#### Sources

Everything is from the Delhi-NCR page
(xlridelhi.ac.in/post-graduate-diploma-in-management-innovation-entrepreneurship-venture-development/),
in its order. Photographs and logos are the page's own, at full size from
the site's media library, self-hosted under public/media/academics/pgdm-iev/.

Kept on the Delhi site, not copied here: the admission prospectus (a 20 MB
PDF) and the two videos (45 MB and 103 MB). They are linked and streamed
from xlridelhi.ac.in, and must move to object storage before that site is
retired.

#### Repairs to the source

- "Postgraduate diploma management in …" → "Postgraduate Diploma in
  Management in …"; "Ventresparx" → "VentureSparX"; "rather for those" →
  "rather than for those"; "infront" → "in front"; "aggrotech" →
  "agritech"; "Stratup" → "startup"; "working of" → "working on"; missing
  spaces after full stops restored; student names capitalised.
- "the singing session of his bestseller" → "signing session".
- The Delhi page repeats the VentureSparX description word for word under
  the InnovateX photograph. That duplicate is dropped: InnovateX appears
  with its photograph and title only.
- Tracking parameters (`?igsh=…`, `?srsltid=…`, `utm_…`) are stripped from
  the startup and student links.

The important dates are the 2026 cycle's, as published. Update them when
the next cycle is announced.

## sustainability-team.json

**sustainabilityTeam**

Sustainability › Team.

#### Sources

The Delhi-NCR page (xlridelhi.ac.in/sustainability-core-team-2/): the core
team with designations, functional areas and profile links, and the Campus
Sustainability Committee, as published — including the "Functional Area"
entries, which this file does not second-guess. The contact address is the
one Delhi's Sustainability menu gives.

Names follow the house style ("Fr. Firstname Surname, SJ"); the Delhi page
writes "Fr. Alwyn Rodrigues S.J.".

Portraits are the page's own, cropped square, self-hosted under
public/media/sustainability/team/. Dr. Sanchayan Nath's is the 900×1200
original from the Delhi media library (the one his Delhi profile uses); the
team page itself shows a 201×163 thumbnail.

Two profile links point at the Delhi site's own faculty pages
(/wps-members/…); they are written as absolute URLs so they keep working
until those profiles move to this site.

## vision-mission.json

**File**

"Vision & Mission" content.

Copied verbatim from the current site (xlridelhi.ac.in/about-xlri/vision-mission/).
These are adopted institutional statements — the PEOs in particular are
accreditation text — so the wording, including "Program", is left exactly as
published rather than brought into house style.

Photographs: the three campus images that page uses as section backgrounds
(wp-content/uploads/2026/05/campus-img-{1,2,3}.png), converted from 2–3 MB
PNGs to ~250 kB JPEGs and self-hosted under public/media/vision-mission/.

**lawn menu**

Alt text is empty on all three: as value photographs they are decorative —
the value's name is set beside them. The hero gives its own alt below.

**headline**

The XLRI tagline, shared with the Jamshedpur page this design follows.

**heroImage**

The dusk photograph leads, so the page does not open on the same picture
the first value (Ethical Conduct) shows directly below it.

## config/notices.json

**Notice**

Notices for the header ticker.

Short, time-sensitive announcements: admission deadlines, exam schedules,
tender notices, results. On Indian institutional sites this is a genuinely
load-bearing channel rather than decoration — it is where visitors expect
urgent information to appear.

Phase 6 moves this to a Payload `Notice` collection with `publishedAt` and
`expiresAt`; the shape below is deliberately the shape that collection will
have, so `services/` can swap the source without touching the component.

Editorial guidance, worth enforcing in the CMS later:
• keep labels under ~90 characters — a ticker is a headline, not a paragraph
• every notice links somewhere; a notice with no destination is a dead end
• expire them. A ticker showing last year's deadline is worse than no ticker

**date**

ISO date. Rendered as a visible qualifier and in the accessible name.

**isNew**

Draws a small "New" badge. Use sparingly or it stops meaning anything.

## config/navigation.json

**File**

THE navigation tree.

Six surfaces render from this one structure (§8.1). It is grounded in the
legacy audit (§16): every section below maps to real content found among the
205 URLs on the current site, so this doubles as the migration target map.

Decisions encoded here:

• **D4 / Q12** — originally eight primary items. Sustainability sits under
_About_, and _News & Events_ took the eighth slot, since events are by far
the more active channel (42 events against 10 posts).

• **D4 revisited** — nine. _Centres_ was promoted from a column inside
Faculty & Research to its own primary item, matching the Delhi-NCR site's
menu, at the client's request (2026-10-07).

• **D4 revisited again** — ten. _Sustainability_ moved from under About to
its own primary item, after Centres, as on the Delhi-NCR site (same day).
Ten was checked at 1280px; see the test in `tests/unit/navigation.test.ts`.

• **Q12, superseded (2026-10-09)** — News & Events was removed from the
bar at the client's request; it had no pages built yet.

• **Q11, superseded (2026-10-09)** — Admissions was a primary item; the
client replaced it with _Giving to XLRI_, last in the bar as on the
Delhi-NCR site. The admission-process links still live under Academics.
Giving's links all leave for xlri.ac.in; the Link primitive marks them
external automatically — see `lib/url.ts`.

• **§16 F2** — Executive Education programmes are listed once each, not once
per cohort. The legacy site mints a new URL per batch
(`…-batch-3`, `…-batch-4`, `…-batch-7`), which fragments its own search
ranking. One programme, one URL; cohorts are data on the record.

Adding a link is a one-line change. Restructuring is a data edit. There is no
navigation markup anywhere that needs to be kept in sync with this file.

**academics menu**

Academics — the Delhi-NCR site's "Academic Programmes" menu (2026-10-08):
its two programmes, each under its school, and the admission process. The
admission links go to the institute site (xlri.ac.in), where that
information is maintained once for both campuses; the Link primitive marks
them external automatically. Library & Resources moved to Campus Life.

**executiveEducation menu**

Executive Education — the Delhi-NCR site's menu (2026-10-08): its three
offerings under XLEAD. Delhi's panel also carries a photograph of the MDP
block; it is left out, as on the other panels.

**facultyResearch menu**

Faculty & Research — the Delhi-NCR site's menu (2026-10-09): its six
links, in its order, as one list.

**centres menu**

Centres — a primary item of its own, as on the Delhi-NCR site, rather than a
column inside Faculty & Research. Lists the five centres in the Delhi menu's
own order. XCEED has its own site, so it links out (the Link primitive marks
it external automatically).

No overview page: the item has no href and no featured "All Centres" card,
so it only opens the panel, and the footer heading is plain text.

**sustainability menu**

Sustainability — a primary item of its own, as on the Delhi-NCR site, at the
client's request (2026-10-07). It sat under About (Q12); the nine links are
the Delhi menu's, in its order. The column heading links to the overview.
Delhi's panel also carries a campus photograph; at the client's request it is
left out here.

**campusLife menu**

Campus Life — the Delhi site's 21 Resources pages, grouped by what a visitor
is looking for rather than listed flat in three columns as on the old
menu: where you study, where you live and eat, where you exercise and get
help, and how you get around. Student Life keeps its own column.

Every link is under `/campus-life/`, named after the Delhi page's slug.

**giving menu**

Giving to XLRI — the Delhi-NCR site's menu (2026-10-09), in its order. Every
link goes to the institute site (xlri.ac.in), where giving is run for both
campuses; the Link primitive marks them external automatically. Like
Centres, the item has no overview page of its own, so it only opens the
panel. It replaced Admissions in the bar at the client's request.

**alumniPortal menu**

Alumni Portal — a plain link, no panel, as on the Delhi-NCR site, where it
sits just before Giving to XLRI. The portal is its own property, so the
Link primitive marks it external automatically.

**utility**

Utility row (Layer 1). Audience shortcuts and cross-property destinations —
the Stanford / Oxford pattern. Kept short: this row competes with the wordmark
for the most valuable pixels on the page.

**policy**

Policy links rendered in the footer on every page.

Note: the Hyperlinking Policy, Disclaimer, Accessibility Statement and Screen
Reader Access links were removed from the footer at the institute's request.
The pages themselves and their entries in `routes.policies` are untouched, so
the destinations still resolve — they are simply no longer surfaced here. If
GIGW §11.2 conformance is re-audited, this is the list to restore.

## policies.json

**File**

Privacy Policy and Terms & Conditions are the institute's, copied word for
word from xlri.ac.in/privacy-policy and xlri.ac.in/terms-n-conditions on
2026-10-16 (only a doubled space was removed). They were written for the
Jamshedpur campus and the institute's app and payment portal, so they name
abin@xlri.ac.in as the privacy contact and Jamshedpur courts for disputes.
If Delhi-NCR publishes its own versions, replace them here. The Copyright
Policy page was removed the same day; the footer's notice reads "Copyright @
{year}, XLRI. All rights reserved." (`footer.copyright` in site.json).

A page's text is `preamble` (opening paragraphs with no heading), then
`sections`, each a `heading` with `paragraphs` and/or `points`, or with
`blocks` (subheadings, paragraphs and lists in order) where it mixes them.
A page with no `sections` shows `emptyNote`.

The Help page describes what this site actually does (menu, search, text
size, contrast, keyboard use, documents); it was written for this site.

**contact**

Address, phone and email are the Delhi-NCR site's own footer details
(xlridelhi.ac.in), October 2026.

## sections.json

**File**

Section home pages. Hubs with `nav` take their groups and links from the
main menu (`config/navigation.json`), so adding a page to the menu adds it
to the hub; only its one-line note needs adding here, under `notes`, keyed
by the link's address. The Students page lists its own `groups`. The intros
and notes are written for this site from each page's own content.

## executive-education/emdp-programmes.json

**File**

One entry per EMDP programme with a page of its own — all fifteen cards on
the EMDP page — keyed by the programme's card id in `emdp.json`. The live
pages are not built alike (one has a syllabus, another two certificates,
another its faculty with biographies), so a programme is an ordered list of
`sections`, each with a `kind` the page knows how to set, in the live page's
order:

- `text` — prose; `features` are titled points beneath it (Applied Business
  Finance's "Holistic new-age curriculum" …).
- `checklist` — ticked cards (why XLRI, who it is for). Points longer than a
  short phrase are set as sentences rather than bold labels.
- `bullets` — a plain list in one card (pedagogy, eligibility, technical
  requirements).
- `highlights` — the blue grid; a `value` is the large figure ("120+").
- `fees` — fee cards (`items`), or the fee as a sentence (`text`) or list
  (`points`) where the live page gives it so.
- `immersion` — campus immersion or visit: `lead`, `paragraphs`, `points`.
- `certificate` — `text` and/or `images`.
- `panel` — a blue panel: alumni status.
- `modules` — a syllabus, one module to a row, opened one at a time.
- `people` — directors or faculty, under the live page's own heading; a
  person has qualifications, a biography, or both.

A section of an unknown kind fails the build. `facts` are the cards in the
right-hand column (`icon`: `clock`, `calendar` or `online`); the one or two
with a `headline` also appear in the hero, as that line. A fact line ending
in a colon ("First Year (Tentative):") is set as a small heading over the
lines after it. An `apply` with no `href` is a closed application: its
`label` ("Application Closed", as on Strategic HR Batch 7) shows where Apply
Now would be, as a notice rather than a link. Where the live page's Apply Now
goes nowhere (`#respond`: Digital HR Batch 7, Strategy & Leadership Batch 3,
Strategic HR Batch 6) there is no `apply`, and where its brochure does
(Global Strategy for Healthcare) there is no `brochure`.

To add another programme: add its entry here, its address to
`EMDP_PROGRAMMES` in `constants/routes.ts`, and a route folder at that
address (copy any programme's and change its `ID`); its EMDP card then links
to the new page by itself.

**Text**

Each live page's own, verbatim (October 2026), including its slips, which are
left for the programme office to correct rather than silently changed:

- Digital HR (Batches 7 and 8): "but to l participate", "skills.Accelerate",
  "strategy,people".
- Strategy & Leadership (Batches 3 and 4): "leadership and, integrating",
  "insights.Through", "academicians,industry".
- Strategic HR Leadership (Batches 6 and 7): "long-term,multi-modal",
  "leadership.The".
- Global Strategy for Healthcare: under "Why This Programme?" the C-Suite
  point reads "Experience a cross-contGain expertise …" — a sentence pasted
  into the middle of another — and the rest of the broken one, "inental
  learning journey …", stands as a seventh point; under "Who Should Enroll?"
  six groups run together into three lines.
- DBA: "INR 13,20000 + GST"; the "Program Highlights - Doctor of Business
  Administration" heading.
- Strategic HR Leadership (Cohort 5): the syllabus's "Cha11enges and
  Stragies", "staffng", "leaming", "Govemance", "Develoment"; the
  "\*Alumni Status" heading.
- Strategy & Leadership (Cohort 2): Module 14's last point stops mid-sentence
  ("… collaboratively brainstorm innovative").

Line breaks inside a point on the live page are joined, and runs of spaces
closed up. Commencement dates are listed in date order (several live pages
put the inauguration first). Batch labels for General Management (Batch 5),
Digital HR (Batch 6) and the two Accredian cohorts come from their posters;
the live pages' text does not give them.

**meta**

Most live pages carry the General Management programme's meta description
("Enhance your leadership skills with XLRI's Executive Program in General
Management …"), so it is used only on General Management's own page; the
others have one written from the page's own facts. Global Strategy for
Healthcare, Applied Business Finance and the two Accredian cohorts have their
own, used verbatim.

**people**

Names, designations, qualifications and biographies are as the live page
gives them; `facultyId` (Dr. Ankit, Dr. Faisal Ahsan, Dr. Munish Kumar
Thakur) supplies only the photograph and the profile link. Where the live
page gives a name with "(XLRI)" or "(SRIHER)" after it, that is the
designation line. Fr. PT Joseph is "Dr. PT Joseph, SJ" on the live pages and
is named here in the house style for Jesuits; his email is left out. The
DBA's and MBA's directors are images with the name and role written on them
(Dr. Santoshkumar Prakash Sangem, Faculty of Finance, XLRI Jamshedpur; Dr.
Ashwani Kumar Goel, Director, French Consortium); the text is typed out here
and the photograph cropped from the image. Photographs of people who are not
on the Full Time Faculty list are in
`public/media/executive-education/emdp-programmes/`.

**Images**

Posters are the EMDP cards' own. The XLEAD VIL certificate is one image
shared by the programmes that show it; the DBA and MBA, Digital
Transformation in Healthcare (XLRI and SRIHER), Applied Business Finance
(XLRI and KPMG) and Global Strategy for Healthcare (XLRI and IAE Paris –
Sorbonne) have their own. The DBA and MBA show the same two certificates as
on the live pages, the second an IPAG MBA degree on both.

## events.json

**File**

Latest Events at `/latest-events`, each event's page at `/event/<slug>` (both
the live site's addresses), and the homepage strip, which shows the newest
few. `page` is the listing's copy, `detail` the event page's, `items` the
events, newest first as the live listing orders them.

**items**

All fourteen events on xlridelhi.ac.in/latest-events (October 2026), titles
verbatim, with one exception: the live listing has "Staff Orientation
Programme Xlri Delhi-NCR"; it is stored as "XLRI", as the homepage strip had
it. `dateLabel` is the date as the listing prints it ("08 Apr"); `dateTime`
adds the year, which the listing does not show. For the six the homepage had,
the year came from the picture's upload folder; for the other eight, from the
publication date of the event's own page on the live site — the same day as
the listing's date for most, a few days off for two. One is worth checking:
the Parliament House visit is published 17 January 2024, and is dated 16
January 2024 here, but its photograph's file name says 23 December 2024 and
it sits in the December 2024 upload folder; if the visit was in January
2025, change its `dateTime` and it moves to the 2025 group.

The live event pages hold only the title — no text and no picture — so the
event page here is the title, the date and the picture whole, with links back
to the list and on to three more events.

**Images**

In `public/media/events/`, downloaded rather than hot-linked, re-encoded to
JPEG with the long edge at most 1024px, turned upright from their EXIF
orientation. `alt` is empty: each picture sits beside its title, which is the
link.

## news.json

**File**

Latest News at `/latest-news`, and each story at the site root
(`/corporate-confluence-2025`), as on the live site. The story route is
`app/[slug]`: every page with a fixed address takes precedence over it, and
only the stories listed here are built, so any other one-segment address is
still a 404. `page` is the listing's copy, `article` the story page's, `items`
the stories, newest first as the live listing orders them.

**items**

All ten stories on xlridelhi.ac.in/latest-news (October 2026). Titles are the
listing's, capitals and all ("GLOBAL BANKING & FINANCE CONFERENCE 2026",
"CORPORATE CONFLUENCE 2025"); the text is the live story's, verbatim, slips
included ("Ceremony , marking", "( Market Solutions)", "degrees diplomas",
"VIsit", "Amitava Banerjee Governance Consultant)", and three MAXI Mela
highlights that stop mid-sentence). The live listing shows no dates; `date`
is each story's publication date. In `p`, `list` and `quote` text,
`**bold**` and `[text](url)` keep the live story's bold and links; links leave
the site and open in a new tab. Where the live story's bold markup was
tangled (the 4th convocation's Chief Guest sentence), the words are kept and
the bold is tidied. The 4th convocation's quotation from Fr. Casimir is set as
a quotation, after the live story's own lead-in. Three stories — Corporate
Confluence 2024, Welcome batch 2024-2026, Convocation 2024 — are a picture
and a title on the live site too, so their pages have no text. ElevateX's is
an excerpt that links to the full article on BW Education.

The homepage's "Latest News" section is not from this file: it still has
its own placeholder stories (`homepage.json`, `news`), linking to `/news/…`
addresses that do not exist.

**Images**

In `public/media/news/`, downloaded rather than hot-linked, re-encoded to
JPEG with the long edge at most 1600px. The first is the listing's picture
and the story's lead; `gallery` holds the rest, in the live story's order.
