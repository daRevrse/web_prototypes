---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["qui-sommes-nous.html","ressources.html"]
---

## Scope

Redesign proposal for caritas-africa.org as a static prototype: Accueil (index.html), Qui sommes-nous (qui-sommes-nous.html), Ressources (ressources.html). Mode: Persuade for the home, Read for Qui sommes-nous, Operate for Ressources (find and download a document).

## Audience and job

Partners and funders (credibility, reports, governance), the 46 national Caritas (resources, network), individual donors (give), candidates and providers (jobs, tenders). Everyone must also find "Signaler un abus" in one click. Proof: real statutes, mission, vision, 11 values, governance and team names, 16 real publications with PDFs, real statements and tenders with dates. No invented impact figures; the live site's "162 personnel et bénévoles" is an error and is not reused.

## Direction contract

THESIS: The category standard for an institutional NGO, played straight at the craft of the Caritas family (Caritas Internationalis, CAFOD, Trócaire) and MSF / ICRC: documentary photo, plain institutional voice, donation and safeguarding always visible, documents one click away. It refuses the broken WordPress template (raw shortcodes, orphan counters, stock megaphones) and any decorative religious costume.

OWN-WORLD: White ground, ink #17181A, one Caritas red #7C0800 taken from the logo (brand, primary actions, rules), stone band #F3F2EF, dark ink footer. Libre Franklin for everything structural (700 to 800 headings, tight tracking); Source Serif 4 only for scripture and the institutional quotes. Near-square geometry: 2px radius on buttons and fields, photos unrounded. Thin rules and red 3px top rules as the section device, no cards with shadows. Authored line icons at 1.75 stroke.

STORY: The visitor learns in one screen that Caritas Africa is the Church's social ministry coordinating 46 national Caritas from Lomé, sees real people and real documents, and finds their door: give, discover the network, read the reports, apply to a tender, report abuse.

FIRST VIEWPORT: Dark utility bar (Signaler un abus, Emplois et appels d'offres, Contact, FR/EN/PT). White header: logo left, five-item nav with a "Qui sommes-nous" dropdown (jobs and tenders live in the utility bar, amended after the finish review so the nav stays short), red "Faire un don" button right. Hero split 1.15fr / 0.85fr: left, the tagline "Cheminer ensemble pour une Afrique, Terre d'espérance" at clamp(2.5rem, 1.2rem + 3.3vw, 4.1rem) in Franklin 800 (amended from 4.6vw so "Cheminer ensemble" holds one line in the copy column), one lead sentence, red primary "Faire un don" and secondary "Découvrir notre réseau"; right, the 2018 annual report photo of children at a water pump, full bleed to the viewport edge, credited. A facts strip closes the hero inside the first viewport at 1280x800 and 1440x900, with four verified facts (1995 Matola, 46 Caritas in 46 countries, 1 of 7 regions of Caritas Internationalis, Lomé secretariat).

SIGNATURE: the network explorer (six ecclesial zones as tabs, each showing its coordinating Caritas and coordinator, the active tab marked by a sliding red rule) and the Ressources library (type and language filters with a live count, each publication offering its FR / EN / PT PDFs). Motion grammar: ease-out cubic-bezier(0.23,1,0.32,1); press scale 0.97 at 160ms; dropdown 180ms scaling from its trigger; tab rule slides 240ms; one load moment, the hero photo revealing by clip-path from the right; reduced motion keeps opacity only.

FORM: canon (the NGO category standard, user-chosen standing exit), references Caritas / CAFOD / Trócaire and MSF / ICRC; seed key 3be1c9ad.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Member country list per zone is not published on the live site: the explorer shows zones, coordinating Caritas and coordinators only.
- Donation, news, tender and abuse-report pages are out of scope: they link to the live site.
- EN/PT versions do not exist in the prototype: the language switch says so.
