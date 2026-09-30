# Delight of Babi — site

**Version retenue : V1 « Maquis solaire »** (`v1/`). C'est celle qu'on fait évoluer.
`v2/` est conservée comme piste écartée, à titre de référence.

Site statique, aucune dépendance à installer : ouvre `v1/index.html`.

```
v1/                 VERSION ACTIVE — index.html, style.css, app.js
v2/                 piste écartée (« Maison d'Abidjan »)
index.html          page de comparaison des deux directions
assets/img/         visuels découpés depuis branding/ + icônes et image de partage
branding/ models/   sources d'origine (inchangées)
```

## Informations validées

- **Adresse** : Tchingua, non loin de l'agence Moov — 57X3+CC2, Lomé
- **Horaires** : tous les jours, 10h00 – 23h00
- **Téléphones** : +228 91 91 03 02 (commandes) · +228 92 53 99 88 (réservations, groupes)
- **Carte** : poulet mayo 3.000 F · attiéké+aloko+poisson/poulet 2.000 F · jollof/riz gras 1.500 F ·
  attiéké poisson 2.000 F · aloko 2.000 F · livraison dès 700 F · formule déjeuner dès 25.000 F/mois

## Commande & réservation

Le vrai système n'est pas dans le périmètre. Le formulaire **ne stocke rien** : il compose le
message et ouvre WhatsApp (`wa.me/22891910302`), le client n'a plus qu'à l'envoyer.
Si le pop-up est bloqué, un lien de secours s'affiche. Une livraison sans quartier renseigné
est refusée avant l'envoi. Le jour où le back existe, il n'y a qu'un `submit` à rebrancher
dans `v1/app.js`.

## Ce qui a été mis en place côté technique

- **Partage** : balises Open Graph + image dédiée `assets/img/og-image.jpg` (1200×630),
  pour que les liens envoyés sur WhatsApp et Facebook affichent une vignette propre.
- **Référencement local** : fiche `Restaurant` en JSON-LD (adresse, horaires, téléphone,
  les 5 plats avec leurs prix en XOF) — c'est ce que Google lit pour la recherche locale.
- **Icônes** : monogramme du logo sur fond orange, en 32 / 180 / 512 px.
- **Accessibilité** : lien d'évitement, anneau de focus visible au clavier sur fond clair
  comme sur fond sombre, ancres décalées pour ne pas passer sous le header collant.
- **Robustesse** : les contenus restent visibles même si le JavaScript ne s'exécute pas.
  Vérifié sans débordement horizontal en 390 px et 1440 px, sans erreur console.

## À compléter avant la mise en ligne

1. **URL absolue de l'image de partage.** `og:image` est en chemin relatif ; une fois le
   domaine connu, mettre l'URL complète et ajouter un `<link rel="canonical">`.
   Un commentaire le rappelle dans `v1/index.html`.
2. **Liens réseaux sociaux** : les boutons FB / IG / TT pointent encore sur `#`.
3. **Photos.** Elles proviennent des affiches, donc en définition limitée, et certaines
   gardent un liseré jaune ou rouge du fond d'origine. De vraies photos des plats et de la
   salle restent le meilleur investissement visuel.
4. **Textes** (histoire de la maison, descriptions des plats) : rédigés d'après les visuels,
   à relire.
