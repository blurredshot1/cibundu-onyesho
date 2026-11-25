# Chibundu Onyesoh — Website Rules

The rules this site was built to. Reuse them as a master prompt for any future change.

## 1. Role
Act as a precision frontend developer and UI/UX designer. Follow the supplied layout images as closely as possible: structure, proportions, hierarchy, palette, typography, spacing, card shapes, icons and overall feel. Match the layout before adding any extra flourish.

## 2. Tech stack (strict)
- Standard **HTML5, CSS3 and vanilla JavaScript** only (`script.js`).
- **No** React, TypeScript, Tailwind, Node or build tools, and no external UI frameworks.
- The only external resource is the Google Fonts stylesheet (Playfair Display, Inter, Caveat). It falls back to system fonts if offline.

## 3. Multi-page structure
Seven separate pages, linked with normal anchor tags. Never merge them into one scrolling page or hide them behind tabs.

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About |
| `research.html` | Research & Publications |
| `clinical-practice.html` | Clinical Practice |
| `mhpss-trauma.html` | MHPSS & Trauma Work |
| `podcast.html` | The Clinician's Notebook |
| `contact.html` | Contact |

The header, navigation, card/banner style and footer are identical on all 7 pages (one shared `styles.css`).

## 4. Shared `script.js` handles
1. Active navigation link for the current page.
2. Mobile menu toggle (collapses at 1320px and below).
3. `research.html`: publication filtering (year and theme), Read More, and Copy Citation.
4. `podcast.html`: theme-card selection and platform links.
5. `contact.html`: form validation and submission feedback.

## 5. Portrait rules
- Main hero/profile portrait: the supplied portrait of Chibundu Onyesoh (glasses, suit / formal attire), at `assets/portrait.jpg`.
- Keep his exact facial features and natural skin tones. **No alteration**, retouching, recolouring or AI regeneration.

## 6. Podcast rules
Link **strictly** to:
- Spotify: https://open.spotify.com/show/6DYUCFAEyVnPZNM1DqdTa2
- Apple Podcasts: https://podcasts.apple.com/ke/podcast/the-clinicians-notebook/id1857935850

**Never** include unsupported external media icons, links or references anywhere on the site.

## 7. Content
- **Home**: headline, credentials ("Clinical Psychologist | Researcher | MHPSS Specialist"), trauma recovery and psychosocial resilience focus across East and West Africa, areas of focus, selected publications, podcast bar, collaboration CTA.
- **About**: biography across Nigeria (Ibadan) and East Africa (Kenya, South Sudan); PhD Candidate in Clinical Psychology at Daystar University; University of Ibadan; training (The Life Care Initiative, UNINETTUNO, James Lind Institute); approaches (REBT, NLP, EFT/TFT tapping); assessment tools (WAIS-IV, WISC-IV/V, Stanford-Binet, Raven's, MMPI-2/3, PAI, MCMI-IV, projectives).
- **Research**: 2025 Ibadan mental health and risky sexual behaviour; 2025 alcoholism help-seeking among Luo and Luhya women (with Maud Mulwa and Dr. Caroline Ayuya Muaka); 2024 gender violence and adolescent self-esteem in Turkana County; 2024 challenges to precision public health in Nigeria.
- **Clinical Practice**: Nuru Counselling Centre (Daystar), Chiromo Hospital Group, The Life Care Initiative, Detention Action; therapy, trauma/grief/substance support, assessments.
- **MHPSS & Trauma**: humanitarian and psychosocial work in Kenya, Nigeria, South Sudan; NGO/institutional consulting; GBV and youth resilience; speaking topics.
- **Podcast**: Spotify and Apple Podcasts only; themes (trauma & resilience; grief, burnout and caregiving fatigue; everyday clinical reflections).
- **Contact**: collaboration, consulting, speaking, media and clinical inquiry form.

## 8. Accuracy rule
Only state facts the client has supplied. Do not invent dates, roles, statistics or email addresses. Anything unconfirmed must be flagged for the owner rather than published as fact.

## 9. Execution checklist (run before every hand-off)
- [ ] Desktop and mobile both look right (no sideways scroll at 390, 820, 1100 or 1440px).
- [ ] Every link and image path resolves; no missing assets.
- [ ] Search the code for unsupported external media platforms: none must appear.
- [ ] Active nav highlights correctly on all 7 pages.
- [ ] Filters, citation copy, theme cards, form validation and the mobile menu all work.

## 10. Owner to-do list (placeholders)
1. **Portrait**: replace `assets/portrait.jpg` with the original high-resolution photo (the current file is cropped from the layout mock-up).
2. **Photos**: `assets/hero-*.jpg`, `theme-*.jpg` and `region-*.jpg` are also cropped from the mock-ups. Swap in original high-resolution images, keeping the file names.
3. **Contact form**: at the top of `script.js`, set `formEndpoint` (for example a Formspree URL) or `contactEmail`. Until one is set, the form validates but tells the visitor it isn't connected yet.
4. **Social links** (`contact.html`): LinkedIn, ResearchGate and Google Scholar currently point to each site's home page. Replace them with the real profile URLs.
5. **Citations** (`research.html`): confirm author order, volume and page details before publishing.
6. **CV**: the About page's "Request CV" button goes to the contact form. Link it to a PDF if you want a direct download.
7. **Privacy Policy / Terms of Use**: the footer links point to the contact page until real pages exist.
