# Git Exercise

## Initial Git client configuration (set username and email, sign in to GitHub)

### Verify Git is installed:

`git -v`

### GitHub sign in/up

### Git config:

- Open Git Bash (for Windows, should be included with git installation) or terminal

- Set your username:

  `git config --global user.name "Your Name"`

- Set your email (same email used to sign in to GitHub):

  `git config --global user.email "YOUR_EMAIL"`

### Generate ssh keys:

- Enter the following in git bash or terminal:

  `ssh-keygen -t ed25519 -C "your_email@example.com"`

- Press enter on the prompts that follow to save the key to the default location

- Add the key to the SSH Agent

  `eval "$(ssh-agent -s)"`

  Mac:

  `ssh-add --apple-use-keychain ~/.ssh/id_ed25519`

  Windows:

  `ssh-add ~/.ssh/id_ed25519`

- Open https://github.com/settings/keys and click the New SSH Key button

- Give the key a title and paste your public key in the key field

- Click Add SSH Key

## Fork the [tutorial repo](https://github.com/nasa-gcn/americana-stack-tutorial)

- Navigate to the tutorial repo in your browser of choice

- Click the Fork button

- Click Create Fork to create a new repo in your account

## Clone your new Repo to your machine

- In your new repo, click the '<> Code' button

- Under the Clone header, click the copy button to copy the url

- Open or switch to a terminal window and navigate to the directory where you want your repo to exist. Then enter:

  `git clone <your copied url>`

## Make a branch

- `git checkout -b <branch name>`

## Make a PR, review someone else’s!

- Make some changes

- Add all your changes

  `git add .`

  Create a new commit

  `git commit -m <Your commit message>`

  Push it out

  `git push`

## Merge it!
