# Carte OSM Galilée

Ce projet est une application web interactive utilisant React, Leaflet pour la cartographie, et SQLite pour la gestion des données. Elle permet de visualiser et de gérer une liste d'écoles sur une carte OpenStreetMap.

J'ai repris le projet pour aider les prochains élèves de terminale avec leurs voeux pour parcoursup et aussi au cas ou ils veulent voir à quoi ressemble du code en utilisation réelle

## Prérequis

Vous devez avoir **Bun** installé sur votre machine. 
Bun c'est un runtime JavaScript qui remplace Node.js et npm.

### Installation de Bun

#### Sur Linux (Debian / Ubuntu)
Ouvrez un terminal et exécutez :
```bash
curl -fsSL https://bun.sh/install | bash
# Redémarrez votre terminal ou exécutez source ~/.bashrc ou zshrc si vous utilisez zsh
```

#### Sur Windows
Ouvrez PowerShell et exécutez :
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

## Installation du Projet

1. Clonez le projet :
   ```bash
   git clone https://github.com/DavidPauvert/Carte-OSM-Galilee.git
   ```
2. Naviguez dans le dossier du projet :
   ```bash
   cd rewrite_react
   ```
3. Installez les dépendances :
   ```bash
   bun install
   ```

## Configuration

Un fichier `.env` est utilisé pour configurer le mot de passe administrateur et la sécurité des jetons (JWT). Par défaut, le fichier contient :
```env
ADMIN_PASSWORD=admin123
JWT_SECRET=a_very_secret_key_change_me_in_production
```
Vous pouvez modifier `ADMIN_PASSWORD` pour changer le mot de passe de l'interface d'ajout d'écoles.

Ce fichier doit être à la racine du projet, le reste est géré tout seul

## Initialisation de la Base de Données

Avant de lancer l'application pour la première fois, vous devez remplir la base de données SQLite avec les données initiales (écoles et marqueurs) :

```bash
bun scripts/RemplissageDonneesInitiales.ts
```
Cette commande créera un fichier `data.db` à la racine du projet contenant les 66 écoles par défaut.

## Utilisation

### Mode Développement
Pour lancer le serveur avec rechargement automatique :
```bash
bun dev
```
L'application sera accessible sur `http://localhost:3000` (ou le port indiqué dans le terminal).

### Mode Production
Pour construire et lancer l'application en mode optimisé (Quand vous le ferez tourner sur votre serveur) :
```bash
bun run build
bun start
```

## Gestion des Écoles

1. Rendez-vous sur la page **"Écoles"**.
2. Cliquez sur le bouton **"Admin"** en haut à droite.
3. Entrez le mot de passe configuré dans le fichier `.env` (par défaut : `admin123`).
4. Un formulaire apparaîtra pour vous permettre d'ajouter de nouvelles écoles sur la carte et dans la liste.

(À l'avenir je vais tenter d'ajouter un appel à l'API de parcoursup pour automatiser le tout)

## Structure du Projet

- `src/index.ts` : Serveur backend (Bun) et API.
- `src/App.tsx` : Structure de l'application frontend.
- `src/pages/` : Pages de l'application (Accueil, Écoles, etc.).
- `data.db` : Base de données SQLite (générée après initialisation).
- `scripts/` : Scripts de maintenance et d'initialisation.
