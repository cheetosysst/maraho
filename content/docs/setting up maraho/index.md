# Setting up Maraho

To run Maraho, you need to have [node](https://nodejs.org/) and [git](https://git-scm.com/) installed. Please look up how to install these softwares on you operating system (Mac, Linux distros, Windows, etc..).

In this section we will be using [Github Actions](https://github.com/features/actions) to deploy on [Github Pages](https://pages.github.com/). Other similar hosting providers should work just fine.

If you decided to use Github Actions, we suggest downloading the official [Github Desktop](https://desktop.github.com/) app or Microsoft's [VSCode](https://code.visualstudio.com/), and login your github account there. Alternatively, you can use the official [Github CLI](https://cli.github.com/) tool or setup [Github authendication](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github) manually.

## Setup

### Download

Navigate to the directory you want in you terminal and clone this repository.

```shell
git clone https://github.com/cheetosysst/maraho --depth=1
cd maraho
npm i
```

Alternatively, you can use npm replacements like pnpm and yarn.

### Configurate

Open this repository in an editor. Edit `./config.js`.

- `name`: The name of the blog. It's displayed on the navbar of the site and in the browser tab title.
- `url`: URL for this site. It's used to generate `sitemap.xml`, which is important for SEO.
- `meta`: Some introduction to the site
- `navbar`: List of links to display on the navbar. We don't automatically generate navbar links for flexability.
- `author`: Information of the sites owner
  - `provider`: Only supports github at the moment.
  - `username`: The owner's username on github.
  - `name`: The owner's name.
  - `twitter`: The owner's twitter id. (optional)
- `repo`:
  - `repos`: a list to display on the index page.

Maraho is not very configurable by default, but I think it is relatively easy to modify if your familiar Next.js and React.

### Preview

To run maraho loaclly (in dev mode), run the following commands:

```shell
npm run dev
```

You can check whether your markdown files are rendered properly after each refresh.

## Content Folder

Create a directory named `content`, it'll be where all the markdown files are stored. The file structure should look like this.

```plaintext
content
├── docs                  // Category "docs"
│   ├── category.json     // Category configuration
│   ├── Never gonna         // Article "Never Gonna"
│   │   ├── article.json    // Article settings
│   │   └── index.md        // Article content
│   ├── Give you up
│   │   ├── article.json
│   │   └── index.md
├── index.md
└── posts                 // Category "posts"
    ├── category.json
    ├── Never gonna
    │   ├── article.json
    │   └── index.md
    └── Let You Down
        ├── article.json
        └── index.md
```

Tools that automates generating new category and article is still WIP, please check out template files for reference.
