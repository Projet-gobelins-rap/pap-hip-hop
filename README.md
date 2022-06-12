# Pap-hip-hop

###  🧐 A propos du projet :
L’objectif de notre projet est de transmettre la culture Hip-hop en s'insérant dans un démarche similaire à celle de l’exposition Hip-hop 360. Nous souhaitons agir face à une certaine méconnaissance du mouvement et de cette culture en montrant sa diversité et ses influences diverses.

Notre expérience consiste à immergé l’utilisateur dans le futur d’un monde alternatif où la culture du Hip-hop n’a pas été transmise. Il incarnera un jeune homme, qui découvrira des archives appartenant à son grand-père. Dans celle-ci, il découvre la richesse d’un mouvement oublié : le Hip-hop ! Un lifestyle autrefois adopté par son grand-père et son crew. Ainsi il partira explorer la ville, il rencontrera des anciens acteurs du mouvement qui lui partageront leur passion dans le but de faire renaître cette culture. Au-delà du fil narratif, l’utilisateur pourra explorer un monde-semi ouvert gorgé de références et de contenus réels liés au Hip-hop et à l’exposition.

### ⚙️ Stack :

#### Partie client :
- [Nuxt.js](https://nuxtjs.org/)
- [Nuxt property decorator](https://github.com/nuxt-community/nuxt-property-decorator)
- [Three.js](https://threejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [GSAP](https://greensock.com/gsap/)
- [Tiny Emitter](https://www.npmjs.com/package/tiny-emitter)

#### Partie serveur :
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/fr/)
- [Socket.io](https://socket.io)

#### Gestion des contenus :

Tous les contenus du site sont gérés dynamiquement depuis un CMS headless ([Prismic](https://prismic.io/)).

url de l'api :
`https://pap-hip-hop.prismic.io/api/v2`

### ✨ Installation

#### ⚠️ Prérequis :
- Node 14
- npm 6

1. Clone le repo

```
https://github.com/Projet-gobelins-rap/pap-hip-hop.git
```
2. Installer les dépendances npm
```
npm install
```
3. Générer le certificat ssl
```
npm run cert
```
4. Lancer l'application
```
npm run start
```

Port utilisé : `` 3001``

### 🛠 Workflow

#### 🔀 Gestion des branches

Afin d'avoir un sytème de branche clair permettant le travail collaboratif, nous avons utilisé les principes de [gitflow](https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow)

Types de branches :
- **master** : version stable 
- **develop** : version de developpement
- **feature/XXX** : developpement d'une feature spécifique
- **fix/XXX** : correction d'un bug spécifique
- **release/XXX** : ajout d'une release

✏️ Convention de nommage des branches :

La convention de nommage utilisé pour nos branches est : **type** / **sujet**

Exemple :
```
feature/websocket-connexion
```

Pour faciliter la lisibilité de nos commits, nous utilisons [Gitmoji](https://gitmoji.dev/).

Nous prefixons chaques commit par un emoji, cela permet d'avoir un historique de nos commits plus visuel. 

#### 🚀 Intégration continue
Nous avons lié notre repo à [Heroku](https://www.heroku.com/), cela nous permet notamment d'avoir une tâche d'intégration continue.

La tâche d'intégration continue se lance automatiquement lorsqu'on push sur la branche master.

Lien de la preprod : [https://pap-hip-hop-site.herokuapp.com](https://pap-hip-hop-site.herokuapp.com)

### 🚧 Roadmap
- [ ] Implementer PM2
- [ ] Gestion du son

