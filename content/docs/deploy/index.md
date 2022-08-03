# Deploying Maraho

Maraho is built with Nextjs, which supports exporting to static files or run with `npm run start` command.

## Running locally or on a server

Follow [Setting up Maraho](/docs/setting&#32;up&#32;maraho) to setup your enviroment, and start your sever with

```shell
npm run start
```

## Static websites

Follow [Setting up Maraho](/docs/setting&#32;up&#32;maraho) to setup your enviroment.

### Github Pages

Github already have a default workflow for Next.js projects, which is included in the repo. Create a new repo on Github, set the repo as your remote origin. The workflow will build and deploy to Github pages.

If you want to use a custom domain, edit `public/CNAME` to your custom domain.
