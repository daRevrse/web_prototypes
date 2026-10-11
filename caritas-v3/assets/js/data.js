/* Caritas Africa — données reprises de caritas-africa.org (septembre 2026).
   Rien n'est inventé : textes, noms, dates et documents viennent du site et de ses PDF. */

const SITE = "https://caritas-africa.org";
const UP = SITE + "/wp-content/uploads";

const LINKS = {
  don: SITE + "/donations/donation/",
  signaler: SITE + "/signaler-dabus/",
  sauvegarde: SITE + "/protection-contre-les-abus-et-lexploitation/",
  harcelement: SITE + "/politique-anti%e2%80%90harcelement-de-caritas-africa/",
  emplois: SITE + "/emplois-et-appels-doffres/",
  actualites: SITE + "/blog/",
  approche: SITE + "/programme-a2p-diro/",
  khub: "https://k-hub.caritas-africa.org/",
  communaute: "https://community.caritas-africa.org/",
  dgroups: "https://dgroups.io/g/km4change",
  europaKm: "https://www.caritas.eu/knowledge-management/",
  contact: SITE + "/contact/",
};

/* Les six zones du réseau et leur coordination (Commission régionale 2023–2027) */
const ZONES = [
  { id: "recowa", code: "RECOWA-CERAO", region: "Afrique de l'Ouest", caritas: "Caritas Sierra Leone", person: "M. Aloysius KAMARA", role: "Directeur national et coordonnateur de la zone RECOWA-CERAO" },
  { id: "aceac", code: "ACEAC", region: "Afrique centrale, Grands Lacs", caritas: "Caritas Rwanda", person: "RP Oscar KAGIMBURA", role: "Secrétaire général et coordonnateur de la zone ACEAC" },
  { id: "acerac", code: "ACERAC", region: "Afrique centrale", caritas: "Caritas Cameroun", person: "Fr. Barthélémy Arnaud Géraldin NKOA OWONO", role: "Directeur national et coordonnateur de la zone ACERAC" },
  { id: "amecea", code: "AMECEA", region: "Afrique de l'Est", caritas: "Caritas Malawi", person: "Mme Chimwemwe NDHLOVU", role: "Directrice nationale et coordonnatrice de la zone AMECEA" },
  { id: "imbisa", code: "IMBISA", region: "Afrique australe", caritas: "Caritas Mozambique", person: "M. Santos GOTINE", role: "Secrétaire général de Caritas Mozambique, coordonnateur de la zone IMBISA et vice-président de la Commission régionale" },
  { id: "cedoi", code: "CEDOI-M", region: "Océan Indien", caritas: "Caritas Comores", person: "M. Ibrahim SAID", role: "Secrétaire exécutif national et coordonnateur de la zone CEDOI-M" },
];

const COMMISSION = {
  mandat: "Mai 2023 – 2027",
  president: { name: "Mgr Pierre CIBAMBO NTAKOBAJIRA", role: "Président" },
  vice: { name: "M. Santos GOTINE", role: "Vice-président", note: "Secrétaire général de Caritas Mozambique, coordonnateur de la zone IMBISA" },
  tresorier: { name: "M. AHOUANYE Philippe Yaovi", role: "Trésorier", note: "Caritas Africa" },
};

/* Secrétariat exécutif régional — organigramme d'octobre 2025 */
const TEAM = [
  { group: "Coordination", people: [
    { name: "Mme DABIRE / Lucy Esipila", role: "Coordinatrice régionale", country: "Kenya" },
    { name: "Mme SIMTAYA WINGA Béatrice", role: "Assistante exécutive", country: "Togo" },
  ]},
  { group: "Finances, administration et ressources humaines", people: [
    { name: "Mme DJALOGUE Y. Solange ép. YENTOUGLI", role: "Responsable finances, administration et ressources humaines", country: "Togo" },
    { name: "M. KOKOU Barnabé Senam Agbegnigan", role: "Financier, responsable de la trésorerie", country: "Togo" },
    { name: "M. ADOGOU Pacôme", role: "Financier, comptabilité générale, reporting et analyse", country: "Togo" },
    { name: "M. AMOUZOUVI David", role: "Financier, en charge du système d'information", country: "Togo" },
    { name: "M. BLUCKTOR Romuald", role: "Agent d'appui aux opérations", country: "Togo" },
  ]},
  { group: "Programmes", people: [
    { name: "M. NAMA Bassekoa Innocent", role: "Responsable des programmes", country: "Burkina Faso" },
    { name: "Sr BAGAYANG Linda Abakasa", role: "Chargée du développement institutionnel", country: "Nigeria" },
    { name: "M. MULUME Carsterns", role: "Chargé des affaires humanitaires et de la réduction des risques de catastrophes", country: "Malawi" },
    { name: "M. CHIBAMBA Wesley", role: "Chargé des politiques et du plaidoyer", country: "Zambie" },
    { name: "Mme SIMAKAMPA Getrude", role: "Chargée du suivi, de l'évaluation, de la redevabilité et de l'apprentissage", country: "Zambie" },
  ]},
  { group: "Services essentiels", people: [
    { name: "M. ESHUN Koffi", role: "Chauffeur", country: "Togo" },
    { name: "M. SAMATI Gabriel", role: "Jardinier", country: "Togo" },
  ]},
];

const VALUES = [
  ["Compassion", "Face à la pauvreté et à la souffrance dans le monde, la réponse fondamentale de Caritas est la compassion enracinée dans l'amour. Caritas refuse d'accepter la souffrance de ses frères et sœurs et prend des mesures pour soulager cette souffrance."],
  ["Espérance", "L'espérance de Caritas est inspirée par la foi chrétienne et par la force et l'ingéniosité de ses partenaires et des personnes qu'elle sert. Sachant que l'espérance chrétienne n'est pas passive, Caritas croit qu'en travaillant ensemble, un monde meilleur peut et doit être atteint afin que tous puissent jouir de la plénitude de la vie."],
  ["Dignité", "Caritas considère les pauvres comme des êtres humains dignes et non comme des objets de pitié sans espérance, et travaille avec eux pour leur construire un avenir meilleur. Caritas croit à la dignité intrinsèque de chaque personne et à l'égalité entre les hommes et les femmes, et travaille avec toutes les personnes sans distinction de race, de sexe, de religion ou de politique."],
  ["Option préférentielle pour les pauvres", "Caritas estime que la prise en charge des personnes moins bien loties est la responsabilité de chacun. Une attention préférentielle doit être accordée aux personnes vulnérables et marginalisées, dont les besoins et les droits font l'objet d'une attention particulière aux yeux de Dieu."],
  ["Justice", "Caritas estime que l'on ne peut pas faire don de quelque chose qu'une personne devrait déjà avoir de droit. Caritas conteste les structures économiques, sociales, politiques et culturelles qui s'opposent à une société juste."],
  ["Solidarité", "Caritas s'efforce de renforcer la solidarité avec les pauvres, en voyant le monde à travers leurs yeux et en reconnaissant l'interdépendance de l'humanité."],
  ["Coopération et communion fraternelles", "Caritas établit des liens entre les communautés du monde entier, en reconnaissant que tous reçoivent et donnent. Caritas travaille au sein et au-delà de la famille catholique en recherchant la justice pour changer le monde en mieux."],
  ["Gestion de l'environnement", "Caritas croit que la planète et toutes ses ressources sont confiées à l'humanité et cherche à agir de manière responsable sur le plan environnemental, en véritable intendant de la création."],
  ["Intégrité", "Caritas croit à l'adhésion aux principes moraux et à la centralité de l'honnêteté et de la sincérité personnelle, et encourage la cohérence entre nos pensées, notre jugement, nos choix et nos actions."],
  ["Éthique", "Caritas encourage la réflexion sur ce qui est moralement bon ou mauvais, juste ou faux, et l'évaluation de l'impact des activités humaines sur ceux avec qui nous partageons la planète et sur les générations futures. Cette réflexion est guidée par les enseignements sociaux de l'Église."],
  ["Transparence et responsabilité", "Caritas estime que tous les individus ont un rôle à jouer pour contribuer au bien commun, par une transparence réciproque dans les affaires et la société. Par son plaidoyer, Caritas promeut une culture de la transparence et de la responsabilité, au niveau des personnes comme des organisations."],
];

/* Bibliothèque : chaque publication, ses langues et ses PDF */
const PUBS = [
  { id: "cadre", type: "strategie", year: 2024, date: "2024", title: "Cadre stratégique 2024–2030", sub: "Building together resilient communities in Africa", cover: "cadre-strategique-2024-2030.jpg", files: { en: UP + "/2024/04/CARITAS-AFRICA-STRATEGIC-FRAMEWORK-2024-2030-web.pdf" } },
  { id: "cooperation", type: "publication", year: 2024, date: "Mars 2024", title: "La coopération fraternelle dans le contexte de la localisation et de la décolonisation", sub: "Repenser l'aide humanitaire et l'aide au développement en Afrique", cover: "cooperation-fraternelle-fr.jpg", files: { fr: UP + "/2024/05/LA-COOPERATION-FRATERNELLE-DANS-LE-CONTEXTE-DE-LA-LOCALISATION-ET-DE-LA-DECOLONISATION.pdf", en: UP + "/2024/05/FRATERNAL-COOPERATION-IN-THE-CONTEXT-OF-LOCALISATION-AND-DECOLONISATION.pdf", pt: UP + "/2024/05/A-COOPERACAO-FRATERNA-NO-CONTEXTO-DA-LOCALIZACAO-E-DA-DESCOLONIZACAO.pdf" } },
  { id: "amour", type: "publication", year: 2024, date: "20 mai 2024", title: "L'Amour est un multiplicateur de ressources", sub: "Réflexions de Lucy Afandi Esipila, Secrétaire exécutive régionale", cover: "amour-multiplicateur.jpg", files: { fr: UP + "/2024/05/LAmour-est-un-multiplicateur-de-Ressources.pdf" } },
  { id: "leadership", type: "publication", year: 2024, date: "4 mai 2024", title: "Reflections on the Caritas Leadership Training", sub: "Par Lucy Afandi Esipila, coordinatrice régionale", cover: "leadership-training.jpg", files: { en: UP + "/2024/05/Reflections-on-the-Caritas-Leadership-Training.pdf" } },
  { id: "cartographie", type: "publication", year: 2024, date: "2024", title: "Cartographie des compétences et des connaissances du personnel dans différents pays d'Afrique", sub: "", cover: "cartographie-competences.jpg", files: { fr: UP + "/2024/06/Cartographie-des-competences.pdf" } },
  { id: "r2023", type: "rapport", year: 2023, date: "2023", title: "Rapport annuel 2023", sub: "", cover: "rapport-2023.jpg", files: { en: UP + "/2024/04/2023-annual-report-English-web.pdf" } },
  { id: "r2022", type: "rapport", year: 2022, date: "2022", title: "Rapport annuel 2022", sub: "", cover: "rapport-2022.jpg", files: { en: UP + "/2024/04/Caritas-Africa-Annual-Report-2022.pdf" } },
  { id: "r2021", type: "rapport", year: 2021, date: "2021", title: "Rapport annuel 2021", sub: "", cover: "rapport-2021.jpg", files: { fr: UP + "/2024/04/Caritas-Africa-Rapport-Annuel-2021.FR_VF.pdf" } },
  { id: "r2020", type: "rapport", year: 2020, date: "2020", title: "Rapport annuel 2020", sub: "", cover: "rapport-2020.jpg", files: { fr: UP + "/2024/04/Caritas-Africa.-Rapport-annuel-2020_FR.pdf", en: UP + "/2024/04/Caritas-Africa.-Annual-report-2020_EN.pdf" } },
  { id: "r2019", type: "rapport", year: 2019, date: "2019", title: "Rapport annuel 2019", sub: "", cover: "rapport-2019.jpg", files: { fr: UP + "/2024/04/Caritas-Africa-Rapport-annuel-2019.pdf", en: UP + "/2024/04/Caritas-Africa-2019-Annual-Report-07-September-2020_compressed.pdf" } },
  { id: "r2018", type: "rapport", year: 2018, date: "2018", title: "Rapport annuel 2018", sub: "", cover: "rapport-2018.jpg", files: { fr: UP + "/2024/04/CA-Rapport-annuel-2018-final-120819.pdf", en: UP + "/2024/04/2018-Annual-Report-17102019.pdf" } },
  { id: "r2017", type: "rapport", year: 2017, date: "2017", title: "Rapport annuel 2017", sub: "", cover: "rapport-2017.jpg", files: { fr: UP + "/2023/02/CARapportannuel2017.pdf", en: UP + "/2023/02/CA2017AnnualReport.pdf", pt: UP + "/2023/02/CARelatorioanual2017.pdf" } },
  { id: "r2016", type: "rapport", year: 2016, date: "2016", title: "Rapport annuel 2016", sub: "", cover: "rapport-2016.jpg", files: { fr: UP + "/2023/02/CArapportannuel2016.pdf", en: UP + "/2023/02/CAannualreport2016.pdf", pt: UP + "/2023/02/CARelatorioanualde2016.pdf" } },
  { id: "r2011", type: "rapport", year: 2015, date: "2011–2015", title: "Rapport 2011–2015", sub: "", cover: "rapport-2011-2015.jpg", files: { fr: UP + "/2023/02/Caritas-Africa-Rapport-2011-2015.pdf", en: UP + "/2023/02/2011-2015-Caritas-Africa-Report.pdf" } },
  { id: "r2014", type: "rapport", year: 2014, date: "2014", title: "Rapport annuel 2014", sub: "", cover: "rapport-2014.jpg", files: { fr: UP + "/2023/02/Rapport-2014-de-Caritas-Africa.pdf", en: UP + "/2023/02/2014CaritasAfricaReport.pdf" } },
  { id: "r2013", type: "rapport", year: 2013, date: "2013", title: "Rapport annuel 2013", sub: "", cover: "rapport-2013.jpg", files: { fr: UP + "/2023/02/Caritas_Africa_Rapport_2013.pdf", en: UP + "/2023/02/2013_Caritas_Africa_Report.pdf" } },
];

const TYPE_LABEL = { rapport: "Rapport annuel", strategie: "Cadre stratégique", publication: "Publication" };
const LANG_LABEL = { fr: "Français", en: "English", pt: "Português" };

/* Déclarations et actualités récentes (catégories Actualités / Plaidoyer) */
const NEWS = [
  { date: "2025-11-10", type: "Déclaration", lang: "EN", title: "AU-EU summit joint statement", url: SITE + "/au-eu-summit-joint-statement/" },
  { date: "2025-11-10", type: "Déclaration", lang: "FR", title: "Déclaration de Dakar, version finale", url: SITE + "/dakar-declaration-finale-version-fr/" },
  { date: "2025-10-07", type: "Réseau", lang: "EN", title: "Caritas Nigeria, 15th anniversary", url: SITE + "/caritas-nigeria-15th-anniversary/" },
  { date: "2025-09-18", type: "Déclaration", lang: "FR", title: "Déclaration conjointe pour la 111ᵉ Journée mondiale du migrant et du réfugié", url: SITE + "/declaration-conjointe-a-loccasion-de-la-111eme-journee-mondiale-du-migrant-et-du-refugiedans-le-cadre-du-jubile-des-migrants-et-du-monde-missionnaire-4-5-octobre-2025/" },
];

/* Emplois et appels d'offres récents */
const JOBS = [
  { date: "2026-05-29", type: "Offre d'emploi", title: "Termes de référence : recrutement d'un auditeur interne", url: SITE + "/termes-de-reference-recrutement-auditeur-interne/" },
  { date: "2026-05-29", type: "Offre d'emploi", title: "Recrutement d'un consultant auditeur interne", url: SITE + "/recrutement-consultant-auditeur-interne/" },
  { date: "2026-05-12", type: "Appel à manifestation d'intérêt", title: "Recrutement d'une société informatique pour la transition vers Microsoft 365 et les services gérés", url: SITE + "/avis-a-manifestation-dinteret-3/" },
  { date: "2026-05-11", type: "Offre d'emploi", title: "Recrutement d'un consultant spécialiste web", url: SITE + "/recrutement-dun-consultant-specialiste-web/" },
];

/* ---------- Actualités, déclarations et publications (relevées sur caritas-africa.org, octobre 2026) ---------- */
const NEWS_ALL = [
  { date: "2025-11-18", kind: "publication", type: "Publication", lang: "FR", title: "Caritas Africa en une page", sub: "Présentation de Caritas Africa, aussi disponible en anglais.", url: SITE + "/caritas-africa-one-pager/", pdf: UP + "/2025/11/Caritas-Africa-One-Pager-FR_compressed.pdf" },
  { date: "2025-11-10", kind: "declaration", type: "Déclaration", lang: "FR", title: "Déclaration de Dakar, version finale", sub: "Aussi disponible en anglais.", url: SITE + "/dakar-declaration-finale-version-fr/", pdf: UP + "/2025/11/Dakar-Declaration-finale-Fr.pdf" },
  { date: "2025-11-10", kind: "declaration", type: "Déclaration", lang: "FR", title: "Déclaration de Mumemo", sub: "Aussi disponible en anglais.", url: SITE + "/declaration-de-mumemo-fr/", pdf: UP + "/2025/11/Declaration-de-Mumemo-fr-1.pdf" },
  { date: "2025-11-10", kind: "declaration", type: "Déclaration", lang: "FR", title: "Déclaration de Kinshasa (2012)", sub: "Republiée par Caritas Africa en novembre 2025.", url: SITE + "/declaration-de-kinshasa-2012/", pdf: UP + "/2025/11/Declaration-de-Kinshasa-2012.pdf" },
  { date: "2025-11-10", kind: "declaration", type: "Déclaration", lang: "EN", title: "AU-EU summit joint statement", sub: "« In this Jubilee Year 2025, a special year of forgiveness and reconciliation… »", url: SITE + "/au-eu-summit-joint-statement/", pdf: UP + "/2025/11/AU-EU-summit-joint-statement-1.pdf" },
  { date: "2025-10-07", kind: "reseau", type: "Réseau", lang: "EN", title: "Caritas Nigeria, 15th anniversary", sub: "La brochure anniversaire de Caritas Nigeria.", url: SITE + "/caritas-nigeria-15th-anniversary/", pdf: UP + "/2025/10/Caritas-Nigeria-@-15-Anniversary-Brochure.pdf" },
  { date: "2025-09-18", kind: "declaration", type: "Déclaration", lang: "FR", title: "Déclaration conjointe pour la 111ᵉ Journée mondiale du migrant et du réfugié", sub: "« Les personnes migrantes et réfugiées, missionnaires de paix, bâtisseuses de ponts et porteuses d'espoir. »", url: SITE + "/declaration-conjointe-a-loccasion-de-la-111eme-journee-mondiale-du-migrant-et-du-refugiedans-le-cadre-du-jubile-des-migrants-et-du-monde-missionnaire-4-5-octobre-2025/", pdf: "" },
  { date: "2025-08-28", kind: "reseau", type: "Partenariat", lang: "FR", title: "Caritas Africa et Caritas Europa, des années de partenariat", sub: "Aussi disponible en anglais.", url: SITE + "/caritas-africa-et-caritas-europa-des-annees-de-partenariat-aout-2025/", pdf: "" },
  { date: "2025-07-01", kind: "communique", type: "Communiqué", lang: "FR", title: "Caritas Africa répond aux fausses allégations de propriété", sub: "Une affaire juridique en cours d'examen au Kenya.", url: SITE + "/caritas-africa-responds-to-false-ownership-claims/", pdf: "" },
  { date: "2025-03-10", kind: "declaration", type: "Déclaration", lang: "EN", title: "Journée internationale des femmes, 8 mars 2025", sub: "Déclaration de Caritas Africa, en anglais.", url: SITE + "/commemoration-of-international-womens-day-iwd-8th-march-2025/", pdf: UP + "/2025/03/IWD-2025-Caritas-Africa-Statement.pdf" },
  { date: "2025-03-06", kind: "publication", type: "Publication", lang: "FR", title: "Note d'orientation du Jubilé de Caritas", sub: "Aussi disponible en anglais et en espagnol.", url: SITE + "/caritas-jubilee-guidance-note/", pdf: UP + "/2025/03/Caritas-Jubilee-Guidance-Note-FR.pdf" },
  { date: "2025-01-17", kind: "reseau", type: "Réseau", lang: "EN", title: "Décès de Sir Samuel Zan Akologo", sub: "Annonce de Caritas Africa, en anglais.", url: SITE + "/death-announcement-sir-samuel-zan-akologo/", pdf: UP + "/2025/01/Death-Announcement-Sir-Samuel-Zan-Akologo.pdf" },
  { date: "2024-04-04", kind: "communique", type: "Communiqué", lang: "FR", title: "Fermeture du bureau auxiliaire de Caritas Africa à Nairobi", sub: "Lettre aux partenaires, aussi disponible en portugais.", url: SITE + "/fermeture-du-bureau-auxiliaire-de-caritas-africa-a-nairobi/", pdf: UP + "/2024/04/20240403-Partenaires-Fermeture-du-bureau-auxiliaire-de-Caritas-Africa-a-Nairobi-CIAAS.pdf" },
  { date: "2023-06-08", kind: "programme", type: "Programme", lang: "FR", title: "Lutte contre la pauvreté : Caritas Africa fait le bilan du programme APPROCHE", sub: "Assemblée des parties prenantes à Lomé, du 29 mai au 1ᵉʳ juin 2023.", url: SITE + "/lutte-contre-la-pauvrete-caritas-africa-fait-le-bilan-du-programme-approche/", pdf: "" },
  { date: "2022-09-02", kind: "reseau", type: "Réseau", lang: "FR", title: "Caritas Africa accompagne la dynamisation de la zone CEDOI-M", sub: "Réunion des Caritas nationales de la zone au Séminaire Inter-Îles de Beau Bassin, à Maurice.", url: SITE + "/renforcement-des-capacites-du-reseau-caritas-africa-au-sein-des-zones-caritas-africa-accompagne-la-dynamisation-de-la-zone-des-conferences-episcopales-des-iles-de-locean-indien-e/", pdf: "" },
  { date: "2022-03-16", kind: "programme", type: "Programme", lang: "FR", title: "Assemblée des parties prenantes du programme APPROCHE à Brazzaville", sub: "Mot de Mgr Nicodème Barrigah, archevêque de Lomé, président du Comité de veille stratégique.", url: SITE + "/mot-de-s-e-mgr-nicodeme-barrigah-archeveque-de-lome-togo-president-du-comite-de-veille-strategique-cvs-du-programme-approche-a-la-ceremonie-douverture-de-lapp-du-programme-app/", pdf: "" },
  { date: "2021-07-09", kind: "programme", type: "Programme", lang: "FR", title: "Pour une culture de la sauvegarde dans le réseau Caritas en Afrique", sub: "", url: SITE + "/pour-une-culture-de-la-sauvegarde-dans-le-reseau-caritas-en-afrique/", pdf: "" },
  { date: "2021-05-19", kind: "reseau", type: "Réseau", lang: "FR", title: "Caritas Côte d'Ivoire se forme à la sauvegarde", sub: "Formation du 11 au 13 mai 2021 à Yamoussoukro.", url: SITE + "/caritas-cote-divoire-se-forme-a-la-sauvegarde/", pdf: "" },
  { date: "2021-05-14", kind: "programme", type: "Programme", lang: "FR", title: "Projet RECHANGE : apprentissages pour progresser", sub: "Le livret de capitalisation du projet.", url: SITE + "/projet-rechange-apprentissages-pour-progresser/", pdf: UP + "/2023/02/Livret-de-capitalisation-RECHANGE.pdf" },
  { date: "2021-04-14", kind: "programme", type: "Programme", lang: "FR", title: "Clôture du projet RECHANGE : les acteurs se sont retrouvés à Lomé", sub: "", url: SITE + "/cloture-du-projet-rechange-les-acteurs-se-sont-retrouves-a-lome/", pdf: "" },
];
const NEWS_KINDS = { declaration: "Déclarations", reseau: "Réseau et partenariats", communique: "Communiqués", publication: "Publications", programme: "Programmes" };

/* ---------- Emplois, consultances et appels d'offres (relevés sur caritas-africa.org, octobre 2026) ---------- */
const JOBS_ALL = [
  { date: "2026-05-29", kind: "emploi", type: "Offre d'emploi", title: "Termes de référence : recrutement d'un auditeur interne", langs: ["FR"], url: SITE + "/termes-de-reference-recrutement-auditeur-interne/" },
  { date: "2026-05-29", kind: "emploi", type: "Offre d'emploi", title: "Recrutement d'un consultant auditeur interne", langs: ["FR"], url: SITE + "/recrutement-consultant-auditeur-interne/" },
  { date: "2026-05-12", kind: "offres", type: "Avis à manifestation d'intérêt", title: "Recrutement d'une société informatique pour la transition vers Microsoft 365 et les services gérés à long terme", langs: ["FR", "EN"], url: SITE + "/avis-a-manifestation-dinteret-3/" },
  { date: "2026-05-11", kind: "consultance", type: "Consultance", title: "Recrutement d'un consultant spécialiste web", langs: ["FR", "EN"], url: SITE + "/recrutement-dun-consultant-specialiste-web/" },
  { date: "2026-05-08", kind: "offres", type: "Termes de référence", title: "Formation du personnel de Caritas Africa et acquisition de KoboToolbox et MS Project", langs: ["FR"], url: SITE + "/tdr_formation-du-staff-de-caritas-africa-et-acquistion-de-kobotoolbox_msproject/" },
  { date: "2025-12-06", kind: "emploi", type: "Offre d'emploi", title: "Recrutement d'un agent d'appui aux opérations", langs: ["FR"], url: SITE + "/recrutement-agent-dappui-aux-operations/" },
  { date: "2025-09-22", kind: "consultance", type: "Consultance", title: "Note de politique sur le rôle de Caritas Africa et de ses organisations membres dans la promotion du leadership et de l'inclusion des jeunes", langs: ["FR", "EN"], url: SITE + "/consultant-pour-lelaboration-dune-note-de-politique-policy-brief-sur-le-role-de-caritas-afrique-et-de-ses-organisations-membres-dans-la-promotion-du-leadership-et-de-lincl/" },
  { date: "2025-08-19", kind: "consultance", type: "Consultance", title: "Politique de renforcement des systèmes informatiques de Caritas Africa", langs: ["FR", "EN"], url: SITE + "/consultance-pour-le-developpement-dune-politique-de-renforcement-des-systemes-informatiques-pour-caritas-africa/" },
  { date: "2025-08-01", kind: "consultance", type: "Consultance", title: "Note de politique : le rôle de Caritas dans l'influence des politiques publiques en Afrique (2023–2025)", langs: ["FR", "EN"], url: SITE + "/consultance-pour-developper-une-note-de-politique-sur-le-role-de-caritas-dans-linfluence-des-politiques-publiques-en-afrique-2023-2025/" },
  { date: "2025-07-02", kind: "offres", type: "Appel d'offres", title: "Acquisition de logiciels pour Caritas Africa", langs: ["FR", "EN"], url: SITE + "/appel-doffre-pour-lacquisition-de-logiciels-pour-caritas-africa/" },
  { date: "2025-04-16", kind: "offres", type: "Appel d'offres", title: "Acquisition d'un serveur pour Caritas Africa", langs: ["FR", "EN"], url: SITE + "/appel-doffre-pour-lacquisition-dun-serveur-pour-caritas-africa/" },
  { date: "2025-03-05", kind: "emploi", type: "Offre d'emploi", title: "Regional Advocacy & Campaign Lead (Africa), campagne du Jubilé « Turn Debt into Hope »", langs: ["EN"], url: SITE + "/regional-advocacy-campaign-lead-africa/" },
  { date: "2024-08-20", kind: "consultance", type: "Consultance", title: "Note d'orientation sur les initiatives de leadership pour accroître la représentation des femmes dans les espaces de décision du réseau", langs: ["FR", "EN"], url: SITE + "/appel-a-consultation-note-dorientation-sur-les-initiatives-de-leadership-visant-a-accroitre-la-representation-des-femmes-dans-les-espaces-de-prise-de-decision-au-sein-du-reseau-caritas-africa/" },
  { date: "2024-08-07", kind: "consultance", type: "Consultance", title: "Politique de protection des données (divulgation d'informations) de Caritas Africa", langs: ["FR", "EN"], url: SITE + "/appel-a-candidatures-demande-de-consultance-pour-lelaboration-de-la-politique-de-protection-des-donnees-divulgation-dinformations-de-caritas-africa/" },
  { date: "2024-07-26", kind: "emploi", type: "Offre d'emploi", title: "Responsable de programmes", langs: ["FR", "EN", "PT"], url: SITE + "/avis-de-vacance-de-poste/" },
  { date: "2024-04-05", kind: "emploi", type: "Offre d'emploi", title: "Assistant administratif et logistique, à temps partiel", langs: ["FR", "EN"], url: SITE + "/annonce-de-poste-vacant-intitule-du-poste-assistant-administratif-et-logistique/" },
  { date: "2024-04-05", kind: "emploi", type: "Offre d'emploi", title: "Chargé du développement institutionnel et du renforcement des capacités, à Lomé", langs: ["FR", "EN"], url: SITE + "/avis-de-vacance-de-poste-charge-du-developpement-institutionnel-et-du-renforcement-des-capacites-2/" },
  { date: "2024-04-04", kind: "consultance", type: "Consultance", title: "Élaboration de la stratégie humanitaire de Caritas Africa", langs: ["FR", "EN"], url: SITE + "/appel-a-consultance-pour-lelaboration-de-la-strategie-humanitaire-de-caritas-africa/" },
];
const JOB_KINDS = { emploi: "Offres d'emploi", consultance: "Consultances", offres: "Appels d'offres et avis" };

/* ---------- Le programme APPROCHE et le projet RECHANGE ---------- */
const APPROCHE_STEPS = [
  { date: "Mars 2021", text: "Première rencontre du Comité de veille stratégique (CVS) du programme." },
  { date: "Mars 2021", text: "Signature des contrats avec les 17 Caritas nationales et transfert des fonds." },
  { date: "Juin 2021", text: "Première Assemblée des parties prenantes (APP), à distance." },
  { date: "Mars 2022", text: "APP de Brazzaville, ouverte par Mgr Nicodème Barrigah, archevêque de Lomé et président du CVS." },
  { date: "Mai – juin 2023", text: "APP de clôture à Lomé : « Programme APPROCHE : bilan, leçons, perspectives »." },
];
const RECHANGE_MEMBERS = ["Caritas Burundi", "Caritas Congo", "Caritas Congo ASBL (RDC)", "Caritas Rwanda", "Caritas Sénégal", "OCDI Caritas Togo"];

/* Nom complet des conférences épiscopales qui donnent leur nom aux zones (cadre stratégique 2024–2030, organigramme du réseau) */
const ZONE_FULL = {
  aceac: "Association des Conférences Épiscopales de l'Afrique Centrale",
  acerac: "Association des Conférences Épiscopales de la Région de l'Afrique Centrale",
  amecea: "Association of Member Episcopal Conferences in Eastern Africa",
  cedoi: "Conférences Épiscopales des Îles de l'Océan Indien et de Madagascar",
  imbisa: "Inter-Regional Meeting of the Bishops of Southern Africa",
  recowa: "Conférence Épiscopale Régionale de l'Afrique de l'Ouest",
};
