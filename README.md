# D'LYR — Site vitrine

Site statique du centre de loisirs VR D'LYR (Colombes) : jeux VR free-roaming, fléchettes connectées, évènements, bar & snack.

## Structure

```
├── index.html              Accueil
├── catalogue.html          Catalogue des expériences VR
├── jeu-*.html              Fiches jeux (9)
├── activites.html          Fléchettes
├── evenements.html         Évènements & privatisation
├── entreprises.html        Team building / séminaires
├── offrir.html             Cartes cadeaux
├── snack-bar.html          Bar & Snack
├── faq.html                FAQ
├── cgv.html, mentions-legales.html, politique-confidentialite.html
├── 404.html                Page introuvable
├── admin.html              CMS admin (édition de contenu, localStorage + content/*.json)
├── css/                    Styles (styles.css = base commune + 1 fichier par page)
├── js/                     Scripts (site.js = shell commun + 1 fichier par page)
├── uploads/                Médias (images, vidéos) — noms ASCII sans espaces
├── worker/                 Worker Cloudflare pour la synchro CMS
├── robots.txt, sitemap.xml
```

## Déploiement

Site 100 % statique : aucun build. Servir la racine telle quelle
(GitHub Pages, Cloudflare Pages, Netlify…).

Note CMS : `js/cms-sync.js` tente de charger `content/*.json` (optionnel,
généré via `admin.html`) ; en son absence le site affiche son contenu par défaut.
