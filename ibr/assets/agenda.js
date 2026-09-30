/* Agenda d'Ibiza Bliss Resort — source unique pour la page Soirées & activités
   et pour la réservation (type « Soirée ou activité »).

   Pour annoncer un événement : ajouter une entrée dans `evenements`.
     - date : 'AAAA-MM-JJ', ou null si la date n'est pas encore connue (« Bientôt »)
     - les événements passés restent visibles dans l'onglet « Passés »
   Rendez-vous réguliers : `hebdo` (jour : 0 = dimanche … 4 = jeudi, 5 = vendredi).

   Plus tard, ce fichier peut être remplacé par un appel au back-office (même structure). */
window.IBR_AGENDA = {
  hebdo: [
    { id: 'soiree-jeudi', jour: 4, titre: 'Soirée du jeudi', resume: 'Soirée festive, folklorique et musicale sur le site.' },
    { id: 'soiree-vendredi', jour: 5, titre: 'Soirée du vendredi', resume: 'Soirée festive, folklorique et musicale sur le site.' },
  ],
  evenements: [
    { id: 'promenade-nautique', titre: 'Promenade nautique', date: null, image: 'assets/img/galerie/min/activites-06.jpg' },
    { id: 'danses-2025-07-25', titre: 'Soirées de danses de formes', date: '2025-07-25', image: 'assets/img/galerie/min/activites-03.jpg' },
    { id: 'excursion-2025-07-18', titre: 'Excursion à Kpalimé et Aného', date: '2025-07-18', image: 'assets/img/galerie/min/activites-02.jpg' },
    { id: 'cinema-2025-07-08', titre: 'Cinéma plein air', date: '2025-07-08', image: 'assets/img/galerie/min/activites-05.jpg' },
    { id: 'jazz-2025-07-06', titre: 'Festival de jazz', date: '2025-07-06', image: 'assets/img/galerie/min/activites-01.jpg' },
  ],
};
