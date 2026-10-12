#!/usr/bin/env bash
# Assemble les pages statiques : en-tête + contenu partagé + pied de page.
#   version classique -> racine de maquette-kloto1/
#   version 2         -> maquette-kloto1/v2/
# Usage : bash _src/build.sh
set -euo pipefail
cd "$(dirname "$0")/.."

pages="index a-propos actualites contact"
declare -A TITLE=(
  [index]="Commune de Kloto 1 | Mairie de Kpalimé (maquette)"
  [a-propos]="À propos | Commune de Kloto 1"
  [actualites]="Actualités | Commune de Kloto 1"
  [contact]="Contact | Commune de Kloto 1"
)
declare -A DESC=(
  [index]="Maquette du site de la mairie de Kloto 1 (Kpalimé) : démarches, actualités, services."
  [a-propos]="La commune de Kloto 1, la décentralisation au Togo, les cantons et les chiffres clés."
  [actualites]="Les actualités, annonces et avis de la commune de Kloto 1."
  [contact]="Coordonnées, horaires et formulaire de contact de la mairie de Kloto 1."
)

build() { # $1 = dossier des gabarits, $2 = dossier de sortie, $3 = préfixe des images
  for page in $pages; do
    {
      sed -e "s~{{TITLE}}~${TITLE[$page]}~" -e "s~{{DESC}}~${DESC[$page]}~" -e "s~{{PAGE}}~$page~g" "_src/$1/header.html"
      sed -e "s~src=\"assets/~src=\"$3assets/~g" "_src/pages/$page.html"
      cat "_src/$1/footer.html"
    } | sed \
      -e "s~<li data-nav=\"$page\" class=\"~<li data-nav=\"$page\" class=\"current-menu-item ~" \
      -e "s~<li data-nav=\"$page\">~<li data-nav=\"$page\" class=\"current-menu-item\">~" \
      -e "s~\(<li data-nav=\"$page\"[^>]*><a \)~\1aria-current=\"page\" ~" \
      > "$2/$page.html"
    echo "  $2/$page.html"
  done
}

echo "Version classique :"; build v1 . ""
if [ -f _src/v2/header.html ]; then echo "Version 2 :"; build v2 v2 "../"; fi
