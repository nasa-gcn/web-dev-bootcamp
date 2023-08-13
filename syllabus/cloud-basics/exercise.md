# Cloud Basics Exercise: Deploying your Site to AWS

In this exercise, you will deploy a Remix application on [Amazon Web Services (AWS)](https://aws.amazon.com).

Note that the instructions here are valid for Linux, UNIX, and macOS, but not Windows.

## Set Up AWS CLI Access on Your Computer

The [AWS Command Line Interface (CLI)](https://aws.amazon.com/cli/) allows you to interact with AWS services from your command line. Pretty much anything that you can do in the AWS Console, you can do from the command line too. We'll use the AWS CLI to deploy your site.

1.  If you are a workshop participant, then you should have received instructions for signing in to the AWS Console from NASA's [Science Managed Cloud Environment (SMCE)](https://smce.nasa.gov). Follow those instructions to complete your first sign-in, reset your password, and configure a multi-factor authentication (MFA) device.

2.  Create an access key for use with the AWS CLI.

    - In the AWS Console, open the account dropdown menu in the top-right corner of the screen (the menu with your username in it) and select `Security credentials`.

    - Scroll down on the page until you see the box titled `Access keys`. Tap the `Create access key` button.

    - Under `Use case`, select `Command Line Interface (CLI)`. Scroll to the bottom of the form and check the box labeled `I understand the above recommendation and want to proceed to create an access key.` Tap the `Next` button.

    - On the next screen, tap the `Create access key` button.

    - On the next screen, you will see a generated access key and secret access key. Copy these values.

    - With your favorite text editor, create a file with the path `~/.aws/credentials` and paste the access key and secret access key into it. The contents of the file should look like this:

      ```
      [default]
      aws_access_key_id=paste-access-key-id-here
      aws_access_key_id=paste-secret-access-key-id-here
      ```

3.  Complete multi-factor authentication for the CLI. We have include the shell script [awsmfa.sh](awsmfa.sh) that you can use. In your terminal, run the command `source syllabus/cloud-basics/awsmfa.sh` and enter the token code from your MFA device. The output should look like this:

    ```
    $ source syllabus/cloud-basics/awsmfa.sh
    User Name: sally-ride
    MFA Device: google-authenticator-on-iphone
    🔑 Enter your MFA code now:
    Your session expires at 2023-08-14T09:34:49+00:00
    Setting the following environment variables in your shell:
    ARC_AWS_CREDS
    AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY
    AWS_SESSION_TOKEN
    ```

    You will need to re-run this script in any shell in which you want to use the AWS CLI to interact with your SMCE AWS account, or every time that your session expires.

## Build and Deploy the App

1.  **Very important**: All of the workshop participants are logging in (as separate users) to a _single AWS account_. To avoid overwriting other student's apps, _it is essential that you change the name of the application_.

    - Edit the file called `app.arc` in the root of this project.

    - You will find a section that looks like this:

      ```
      @app
      remix-architect-app
      ```

      Replace the text `remix-architect-app` with something unique --- for example, your initials and your favorite food.

      (This text sets the name of the CloudFormation template.)

2.  Make sure that you are _not_ running the local dev server: if you are running `npm run dev` in any terminal, then kill it.

3.  If you are switching from dev mode to deployment, then run the following command to delete some dev files that just add bloat when you are deploying (chiefly, [esbuild metafiles](https://esbuild.github.io/api/#metafile)):

        npm run clean

4.  Run the following command to compile and bundle the code for deployment:

        npm run build

5.  Run the following command to generate the project's CloudFormation template and deploy it to AWS:

        npm run deploy

    After a few minutes, the command should finish, and look roughly like this:

    ```
    $ npm run deploy

    > deploy
    > arc deploy --no-hydrate --prune --production

            App ⌁ skr-pork-chops
          Region ⌁ us-east-1
        Profile ⌁ Set via environment
        Version ⌁ Architect 10.13.3
            cwd ⌁ /Users/skride/web-dev-bootcamp

    ⚬ Deploy Creating new private deployment bucket: skr-pork-chops-cfn-deployments-f93c2
    ⚬ Deploy Initializing deployment
      | Stack ... SkrPorkChopsProduction
      | Bucket .. skr-pork-chops-cfn-deployments-f93c2
    ⚬ Deploy Created deployment templates
    ✓ Deploy Generated CloudFormation deployment
    ⚬ Deploy Deploying static assets...
    ✓ Deploy Static asset fingerprinting enabled
    ✓ Deploy Orphaned file pruning enabled
    ...
    ✓ Deploy Deployed 99 static assets from build/static/
    ✓ Deploy Deployed & built infrastructure
    ✓ Success! Deployed app in 123.259 seconds

        https://l5oxh39q1o.execute-api.us-east-1.amazonaws.com
    ```

    The URL will differ for each participant. Open the URL in a browser. You should see your site live!

6.  To study the generated CloudFormation template, look at the generated file `sam.yaml` in the root of your project. Compare the contents of `sam.yaml` with the actual resources that you see in the AWS Console!
