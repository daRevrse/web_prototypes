# Dream Africa — maquette de refonte (HTML/CSS)

Proposition de refonte de trois pages du site [dreamafrica.africa](https://www.dreamafrica.africa),
en conservant la direction artistique WordPress existante (navy `#00255B` / orange `#FF5409`,
titres capitales, filets « ••• ——— », bandeaux pleine largeur).

## Livrables

| Fichier | Contenu |
| --- | --- |
| `index.html` | Accueil v2 — **hero vidéo** + **section partenaires** |
| `about.html` | À propos v2 — sommaire collant, constats numérotés, équipe, parcours |
| `partenaires.html` | **Nouvelle page** — 12 fiches partenaires filtrables + niveaux de partenariat |
| `assets/css/dreamafrica.css` | Design system complet (tokens, composants, responsive) |
| `assets/js/dreamafrica.js` | Interactions vanilla, sans dépendance (~7 ko) |
| `assets/img/` | Visuels extraits des captures fournies |
| `assets/video/` | **Dossier à remplir** — voir ci-dessous |

## Lancer en local

```bash
python -m http.server 5178
```

Puis ouvrir <http://localhost:5178/index.html>.
(Ouvrir les fichiers en `file://` fonctionne aussi.)

## Activer le hero vidéo

Le hero fonctionne en deux temps :

1. **Par défaut** : un diaporama Ken Burns de 4 photos (fondu + zoom lent) s'affiche.
2. **Dès qu'une vidéo démarre réellement**, elle passe au premier plan (fondu de 1,4 s) et le
   diaporama disparaît.

Pour l'activer, déposer le fichier ici :

```
assets/video/hero.mp4      (+ hero.webm en option)
```

Ou pointer directement la médiathèque WordPress dans `index.html` :

```html
<source src="https://dreamafrica.africa/wp-content/uploads/2026/02/ma-video.mp4" type="video/mp4">
```

Aucune modification de CSS ou de JS n'est nécessaire. Si la vidéo est absente, bloquée par le
navigateur (autoplay refusé) ou en erreur, le diaporama reste affiché : **le hero ne casse jamais**.
Recommandations : 1920×1080, 8–15 s en boucle, < 4 Mo, sans son utile (le bouton son reste dispo).

## ⚑ Contenu de démonstration

Les **12 partenaires** de `partenaires.html` (noms, monogrammes, villes, dates, descriptions) sont
**inventés** pour valider la mise en page. Un encart visible le signale en haut de page. À remplacer
par les partenaires réels avant toute mise en ligne, puis supprimer le bloc `.demo-note`.

Les logos sont des **monogrammes CSS** (2 lettres sur fond de marque) : ils tiennent la maquette sans
logo réel et peuvent être remplacés un par un par une vraie image sans toucher au reste.

## Design system

**Couleurs** — échantillonnées au pixel sur les captures du site actuel :

| Rôle | Hex |
| --- | --- |
| Navy (marque) | `#00255B` |
| Orange (marque) | `#FF5409` |
| Orange clair (bandeau hotline) | `#FF8853` |
| Ambre / rouge / bordeaux / vert (kente du logo) | `#FF8A00` `#C00000` `#780026` `#96BC07` |

**Typographie** — le site actuel utilise Roboto ; la maquette monte en gamme sans quitter le registre
institutionnel :

- **Archivo** (400→900) : titres capitales, boutons, chiffres
- **Karla** : texte courant
- **Caveat** : baseline manuscrite (reprise de la signature du footer)

**Motifs signature**

- `.kente` — bande tissée 7 px reprenant les couleurs du logo, en séparateur de sections
- `.rule` — le filet « ••• ——— » du site actuel, systématisé
- `.arrow-list` — la puce flèche ronde du site actuel
- `.pt-card::before` — dégradé kente qui se déploie au survol des fiches partenaires

## Ce qui change par rapport à l'existant

**Accueil**
- Hero vidéo plein écran (remplace le collage d'images figé) : titre, baseline manuscrite,
  accroche, double CTA et contrôles son/pause. Sous 960 px les contrôles remontent en haut à
  droite pour laisser la place aux CTA pleine largeur.
- Bandeau hotline retravaillé (le bouton REGISTER n'est plus coupé)
- Nouvelle **section partenaires** : bandeau logos défilant + 3 fiches en avant + lien vers la page
- Cartes programmes numérotées avec texte descriptif et zoom au survol
- Section Ouidah 2027 en split navy/photo pleine hauteur
- Compteurs animés sur les chiffres
- Nav resserrée à 7 entrées, bouton « S'inscrire » orange sorti du menu

**À propos**
- En-tête de page avec fil d'ariane (au lieu d'un simple titre sur fond blanc)
- Sommaire latéral collant avec suivi de la position de lecture
- Constats en 6 cartes numérotées ; mission en citation pleine largeur sur navy
- Équipe en fiches portrait ; objectifs en grille d'icônes ; valeurs en pastilles
- Nouveau bloc **chronologie** (2021 → 2027) et renvoi vers la page partenaires

**Partenaires (nouveau)**
- Bandeau chiffres, filtres par domaine (7 filtres, compteur de résultats)
- 12 fiches : monogramme, ancienneté, description, tags, ville
- 3 niveaux de partenariat + formulaire de contact dédié

## Accessibilité & robustesse

- Contraste texte courant `#41506A` sur blanc ≈ 7,6:1 (AA/AAA)
- `prefers-reduced-motion` respecté (animations neutralisées, diaporama figé)
- Navigation clavier : lien d'évitement, `:focus-visible` ambre, `aria-current`, `aria-pressed`,
  `aria-expanded` sur le burger, `Échap` ferme le menu
- Les animations d'apparition sont conditionnées à la classe `.js` : **sans JavaScript, tout le
  contenu reste visible**
- Aucun débordement horizontal vérifié à 375 / 768 / 1280 / 1440 px

## Portage WordPress

Les blocs sont pensés pour retomber sur des sections Elementor :

| Bloc maquette | Équivalent Elementor |
| --- | --- |
| `.hero` | Section avec *Background type: Video* (le CSS du scrim est réutilisable tel quel) |
| `.kente` | Divider ou section de 7 px avec le `repeating-linear-gradient` |
| `.marquee` | Loop Carousel, ou le CSS conservé tel quel dans un widget HTML |
| `.pt-card` | Loop Grid sur un CPT `partenaire` (champs : nom, domaine, ville, année, description) |
| `.filters` | Taxonomy Filter Elementor Pro sur la taxonomie `domaine` |
| Formulaires (`data-demo`) | Contact Form 7 / WPForms — les deux formulaires (inscription, partenaire) sont des maquettes : le bouton affiche une confirmation factice puis se réinitialise |

Les couleurs et polices sont centralisées dans les *custom properties* en haut de
`assets/css/dreamafrica.css` : les reporter dans les réglages globaux du thème suffit.
