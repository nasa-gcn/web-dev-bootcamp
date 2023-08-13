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

      [default]
      aws_access_key_id=paste-access-key-id-here
      aws_access_key_id=paste-secret-access-key-id-here

3.  Complete multi-factor authentication for the CLI. We have include the shell script [awsmfa.sh](awsmfa.sh) that you can use. In your terminal, run the command `source syllabus/cloud-basics/awsmfa.sh` and enter the token code from your MFA device. The output should look like this:

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
