# Welcome to the Americana Stack Tutorial

## Prerequisites

- Create a [GitHub account](https://github.com)
- Install, on your own computer:
  - [VS Code](https://code.visualstudio.com/download)
  - [Node.js](https://nodejs.org/en/download)
  - [Slack](https://slack.com/downloads/)

## Tutorial Outiline

- [Git Lecture](./syllabus/git-lecture.md)
- [Git Exercise](./syllabus/git-exercise.md)
- [Modern JavaScript Lecture](./syllabus/modern-javascript.md)
- [Web Dev Exercise](./syllabus/web-dev-exercise.md)
- [Cloud Basics Lecture](./syllabus/cloud-basics-lecture.md)
- [Tutorial Walkthrough](./syllabus/tutorial-walkthrough.md)

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
