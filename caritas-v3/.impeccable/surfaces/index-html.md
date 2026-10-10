---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["qui-sommes-nous.html","ressources.html"]
---

## Scope

Third redesign proposal (v3) for caritas-africa.org at `/caritas-v3/`: Accueil (index.html, Persuade, fully immersive), Qui sommes-nous (qui-sommes-nous.html, Read, quieter motion), Ressources (ressources.html, Operate, quieter motion). v1 (`/caritas/`) and v2 (`/caritas-v2/`) stay untouched; v3 must give the client a clearly different third choice.

## Audience and job

Partners and funders (credibility, reports, governance), the 46 national Caritas (resources, network), individual donors (give), candidates and providers (jobs, tenders). "Signaler un abus" one click away everywhere. Proof: real photographs from Caritas Africa's own reports (credited), statutes, mission, vision, values, governance, publications with PDFs, statements and tenders with dates. No invented impact figures. Keeps the user's WhatsApp button (number to be confirmed) and flag language switch.

## Direction contract

THESIS: The NGO category standard in its third canonical register, the immersive scroll story of large NGOs' interactive reports (charity: water, UNHCR Global Trends, WFP Stories, MSF / ICRC long-forms): the home page is told as chapters the visitor scrolls through, each chapter with its own scroll-driven device, ending on a clear call to act. It refuses v1's static report page and v2's campaign homepage with carousel.

OWN-WORLD: Chapters alternate a warm night ground #120F0E with white text and a white day ground with ink #18130F; Caritas red #7C0800 as full fields (the act chapter, primary buttons) and a lighter red for marks on night. Epilogue 800–900 for display and UI, set large and tight in sentence case; Literata (optical sizes) for reading text, leads and scripture. Full-bleed credited documentary photographs; square geometry; a thin red reading-progress rule and a chapter rail; no cards, no eyebrows.

STORY: The visitor opens on one woman drawing water under a wide sky, reads "Cheminer ensemble pour une Afrique, Terre d'espérance", then scrolls through who Caritas Africa is, the network of 46 national Caritas in six zones, what it does, the APPROCHE programme, its mission and vision, its news, its reports, and closes on a red chapter that asks them to give, partner or report abuse.

FIRST VIEWPORT: Slim opaque night header (Caritas Africa's official white logo set directly on night, amended from a white plate because the white version is a brand asset and reads cleanly on night; chapters menu, flags FR/EN/PT, "Signaler un abus", red "Faire un don"). Night ground; left, the title "Cheminer ensemble pour une Afrique, Terre d'espérance" in Epilogue 900 up to 6rem, one Literata lead, red "Faire un don" and a "Commencer le récit" link; right, the 2022 report cover photograph in a tall inset window. Scrolling expands the window to full-bleed while the title lifts away and the opening sentence appears over the photo.

SIGNATURE: one device per chapter, all driven directly by scroll position (no autoplay): expanding photo window (opening); word-by-word ink fill of the lead (who we are); pinned giant numeral counting to 46 then the six zones lighting in turn (network); pinned horizontal track of four action photographs (what we do); sticky photo with stepped figures (APPROCHE); line-by-line scripture reveal over a full-bleed photo (mission). Reduced motion: everything static and unpinned, numbers at final value. Motion grammar: scroll-mapped transforms, opacity and clip-path only; UI ease-out cubic-bezier(0.23,1,0.32,1), presses 0.97 at 160ms.

FORM: canon (the category standard, user-chosen standing exit, fourth time; v3 register = immersive NGO story), references charity: water, UNHCR Global Trends, WFP Stories, MSF / ICRC long-forms; seed key a76f50aa.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- WhatsApp number: the link uses the secretariat landline; Caritas Africa must confirm a WhatsApp number.
- The live donation page is broken; "Faire un don" leads to the red act chapter, whose button links to it.
- Member country list per zone is not published: the network chapter shows zones, coordinating Caritas and coordinators only.
- EN/PT versions do not exist in the prototype: the language switch says so.
