# Welcome to the Americana Stack Tutorial

## Tutorial Outiline
### Lecture: Version control: git, GitHub, issues & PRs, etiquette for FOSS projects, mention CI/CD but don’t teach
### Exercise:
   - Initial Git client configuration (set username and email, sign in to GitHub)
   - Fork the [tutorial repo](https://github.com/nasa-gcn/americana-stack-tutorial)
   - Make a branch
   - Make a PR, review someone else’s!
   - Merge it!
### Lecture: Modern JavaScript: modules, JavaScript on the server, the NPM ecosystem, types, JSX
### Tutorial: Remix routing, React components, server and client side builds.
   - Routes, <Link>. Nested routing
   - JSX: Forms, fun with USWDS components, accessibility attributes, etc.
   - Loaders
      - Calling an external API with Web Fetch (see https://astroquery.readthedocs.io/en/latest/ for some astronomy web services we can call. Note https://astroquery.readthedocs.io/en/latest/heasarc/heasarc.html)
      - Retrieving data from DynamoDB
   - Actions
      - Writing data to DynamoDB
   - Nested routes, dynamic routes (e.g. index of database entities & detail view)
   - Advanced: fetchers, optimistic UI?
### Lecture: Cloud basics: cloud computing (instances vs. containers vs. functions), databases (document vs. relational + Prisma), message queues, infrastructure as code
- Tutorial: deploy your application to AWS!
- Lecture: How this all fits together in GCN

## Tutorial Contents
- Take some astronomical transient submitted via a form (time, ra, dec, error radius)
- query HEASARC to find all previous observations of that location on the sky.
- They results could be written to a dynamoDB for all the sources or observations ever taken that are consistent with that transient.


## Prerequisites

- Create a [GitHub account](https://github.com)
- Install, on your own computer:
   - [VS Code](https://code.visualstudio.com/download)
   - [Node.js](https://nodejs.org/en/download)
   - [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
   - [Slack](https://slack.com/downloads/)

## Development

The following command will run two processes during development when using Architect as your server.

- Your Architect server sandbox
- The Remix development server

```sh
$ npm run dev
```

Your file changes are watched, and assets are rebuilt upon change.

Open up [http://localhost:3333](http://localhost:3333) and you should be ready to go!


## Deploying

Before you can deploy, you'll need to do some setup with AWS:

- First [install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- Then [follow the Architect setup instructions](https://arc.codes/docs/en/guides/get-started/detailed-aws-setup).

If you make it through all of that, you're ready to deploy!

1. build the app for production:

   ```sh
   npm run build
   ```

2. Deploy with `arc`

   ```sh
   arc deploy production
   ```

You're in business!
