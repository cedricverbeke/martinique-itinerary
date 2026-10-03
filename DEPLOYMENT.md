# Déploiement sur Netlify via GitHub

## 1. Mettre le projet sur GitHub

1. Ouvrez le projet dans VS Code.
2. Si ce n'est pas déjà un dépôt Git, initialisez-le :
   - Ouvrez le terminal dans VS Code (Terminal > New Terminal)
   - Tapez : `git init`
   - Puis : `git add .`
   - Puis : `git commit -m "Projet prêt pour Netlify"`
3. Créez un dépôt sur GitHub (github.com > New repository).
4. Suivez les instructions de GitHub pour pousser le projet :
   ```
   git remote add origin https://github.com/VOTRE-UTILISATEUR/VOTRE-REPO.git
   git branch -M main
   git push -u origin main
   ```

> **Important :** le fichier `.env` est ignoré par Git (présent dans `.gitignore`).
> Il ne sera jamais sur GitHub. C'est normal et voulu.

## 2. Connecter Netlify à GitHub

1. Allez sur [netlify.com](https://netlify.com) et connectez-vous.
2. Cliquez sur **Add new site** > **Import an existing project**.
3. Choisissez **GitHub** et autorisez Netlify à accéder à vos dépôts.
4. Sélectionnez votre dépôt.

Netlify détectera automatiquement :
- **Build command :** `npm run build`
- **Publish directory :** `dist`

Ces valeurs sont déjà configurées dans le fichier `netlify.toml`.

## 3. Configurer les variables d'environnement sur Netlify

Avant de lancer le premier build, ajoutez ces deux variables :

1. Dans Netlify, allez dans **Site settings** > **Environment variables**.
2. Cliquez sur **Add a variable** et ajoutez :

   | Key | Value |
   |-----|-------|
   | `VITE_SUPABASE_URL` | `https://ipabfocaggfyjnehohze.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | (la clé qui se trouve dans votre fichier `.env`) |

3. Cliquez sur **Save**.

> La clé API Gemini (`GEMINI_API_KEY`) et la liste des modèles (`GEMINI_MODELS`)
> restent sur Supabase. Elles ne vont **pas** sur Netlify.

## 4. Déployer

1. Cliquez sur **Deploy site**.
2. Netlify construit le site et vous donne une URL (ex: `https://mon-site-xyz.netlify.app`).
3. À chaque `git push` sur GitHub, Netlify reconstruit et met à jour le site automatiquement.

## Récapitulatif des secrets

| Secret | Où il vit | Pourquoi |
|--------|-----------|----------|
| `GEMINI_API_KEY` | Supabase (Edge Function secrets) | Clé API Gemini, utilisée par le serveur |
| `GEMINI_MODELS` | Supabase (Edge Function secrets) | Liste des modèles Gemini (optionnel) |
| `VITE_SUPABASE_URL` | Netlify (env vars) + fichier `.env` local | URL pour contacter Supabase |
| `VITE_SUPABASE_ANON_KEY` | Netlify (env vars) + fichier `.env` local | Clé publique pour authentifier les appels |

Les deux variables `VITE_*` sont publiques par conception. Elles permettent
au navigateur de parler à Supabase mais ne donnent aucun accès privilégié.
