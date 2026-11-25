# Odyssée Pinball — installer l'appli

## 1. Mettre en ligne (GitHub Pages, gratuit)
1. Sur github.com : **New repository** → nom `odyssee-pinball` → **Public** → Create.
2. **Add file → Upload files** → glisser TOUT le contenu de ce dossier (index.html, manifest.webmanifest, sw.js, le dossier icons) → **Commit changes**.
3. **Settings → Pages** → Source : *Deploy from a branch* → Branch : `main` / `(root)` → **Save**.
4. Attendre ~1 minute. L'adresse sera : `https://TON-PSEUDO.github.io/odyssee-pinball/`

## 2. Installer sur le téléphone
- **Android (Chrome)** : ouvrir l'adresse → menu ⋮ → **Installer l'application** (ou « Ajouter à l'écran d'accueil »).
- **iPhone (Safari)** : ouvrir l'adresse → bouton Partager → **Sur l'écran d'accueil**.

L'appli s'ouvre en plein écran, fonctionne hors connexion, et garde l'écran allumé pendant la partie.

## 3. Mettre à jour (nouvelles tables)
Remplacer `index.html` sur GitHub (Upload files → Commit). L'appli prend la nouvelle version à la prochaine ouverture avec du réseau.
Si un jour une icône change : modifier la ligne `VERSION` dans `sw.js` (ex. `odyssee-v2`).
