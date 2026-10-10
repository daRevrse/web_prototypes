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
