# Introduction to Version Control and Collaboration with Git and GitHub

## Understanding Git

Much of this is quoted from the [Git Book](https://git-scm.com/book/en/v2)

### What is Git?

Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. Git thinks of its data more like a series of snapshots of a miniature filesystem. With Git, every time you commit, or save the state of your project, Git basically takes a picture of what all your files look like at that moment and stores a reference to that snapshot. If files have not changed, Git doesn’t store the file again, just a link to the previous identical file it has already stored.

### Key Concepts in Git

- Repositories

  - A repository is a data structure that stores metadata for a set of files or directory structure. Some of the metadata that a repository contains includes, among other things, a historical record of changes in the repository, a set of commit objects, and a set of references to commit objects, called heads.
  - The main purpose of a repository is to store a set of files, as well as the history of changes made to those files.

- Commits

  - Commits can be thought of as snapshots along the timeline of a Git project. These snapshots contain the current contents of the index and the given log message describing the changes. The content to be committed can be specified in several ways:

    - by using `git-add` to incrementally "add" changes to the index before using the commit command (Note: even modified files must be "added");

    - by using `git-rm` to remove files from the working tree and the index, again before using the commit command;

    - by listing files as arguments to the commit command (without `--interactive` or `--patch switch`), in which case the commit will ignore changes staged in the index, and instead record the current content of the listed files (which must already be known to Git);

    - by using the -a switch with the commit command to automatically "add" changes from all known files (i.e. all files that are already listed in the index) and to automatically "rm" files in the index that have been removed from the working tree, and then perform the actual commit;

    - by using the `--interactive` or `--patch` switches with the commit command to decide one by one which files or hunks should be part of the commit in addition to contents in the index, before finalizing the operation. See the “Interactive Mode” section of `git-add` to learn how to operate these modes.

  - More information: [git-commit](https://git-scm.com/docs/git-commit)

- Branching and Merging

  - Branching means you diverge from the main line of development and continue to do work without messing with that main line. In most cases the main line of development is the main/master branch.

  - Merging is how git integrates the changes made from one branch into a target branch. The result contains the combined history of both sources.

### Basic Git Workflow

#### [Initializing a Repository](https://github.com/git-guides/git-init)

There are a couple options for starting a new repository: `git init` and `git clone`.

- `git init`: One Person Starting a New Repository Locally

  - Your project may already exist locally, but it doesn't have Git yet. This is only run once

  - Once you have initialized the repository, create a remote repository somewhere like GitHub.com.

  - Add the remote URL to your local git repository:

         git remote add origin <URL>

    This stores the remote URL under a more human-friendly name, origin.

  - Shape your history into at least one commit:

         git add .
         git commit -m "First Commit"

  - Once you have at least one commit, you can push to the remote and set up the tracking relationship for good:

         git push -u origin master

- `git clone`: The Remote Already Exists

  If the repository already exists on a remote, you would choose to git clone and not git init.

#### Making Changes and Committing

A typical workflow for making changes and commiting them to a repo would be the following:

- Make a new branch:

      git branch <branch_name>

- Switch to the new branch:

      git checkout <branch_name>

- Or at the same time:

      git checkout -b <branch_name>

- Add changes and commit

      git add <...>
      git commit -m "A brief message about the changes"

- Push your local changes to the remote repository

      git push

#### Reviewing History and Reverting Changes

In Git, reviewing history and reverting changes are essential tasks for managing the codebase effectively:

1.  Reviewing History with Git:

    Git provides tools to review the history of a repository. Commands for reviewing history include:

    - `git log`: Displays a chronological list of commits, showing commit messages, authors, dates, and unique identifiers (hashes).
    - `git show <commit-hash>`: Shows the changes introduced by a specific commit, allowing you to inspect the modifications in detail.
    - `git diff <commit1>..<commit2>`: Compares two commits, highlighting the differences between them.

2.  Reverting Changes with Git:
    Sometimes, it becomes necessary to undo specific changes in a repository. Git provides various methods to revert changes safely:

    - `git revert <commit-hash>`: Creates a new commit that undoes the changes introduced by the specified commit. This maintains a clean history and is ideal for public repositories.
    - `git reset`: Resets the repository to a previous state, effectively removing commits from history. Be cautious with this command, as it can lead to data loss and is suitable for private/local repositories.
    - `git checkout`: Discards changes in the working directory and reverts files to a previous state.

Remember, reviewing history and reverting changes are critical tasks, and understanding the potential consequences is essential to avoid unintended data loss or conflicts. Always make sure to back up your work and use version control judiciously to maintain a reliable and organized codebase.

## Introduction to GitHub

### Overview of GitHub

GitHub, Inc. is a platform and cloud-based service for software development and version control using Git, allowing developers to store and manage their code. It provides the distributed version control of Git plus access control, bug tracking, software feature requests, task management, continuous integration, and wikis for every project.

### Creating a GitHub Account

Navigate to https://github.com/ to sign up for a new github account.

### Setting up a Repository on GitHub

Once signed in, navigate to https://github.com/new or click the Create New dropdown button (the one with a plus sign and a down arrow) in the nav bar on github.

### Cloning Repositories and Working with Remote Repositories

We will focus on the SSH method to clone the repo.

Once you have installed git and created a GitHub account:

1.  **Generate and Add SSH Key to Your GitHub Account**:

    [Read more here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

    - Open a terminal (Command Prompt on Windows, Terminal on macOS/Linux).
    - Generate a new SSH key using the command:

            ssh-keygen -t ed25519 -C "your_email@example.com"

    - Press Enter to confirm the default file location and set a passphrase (or leave it empty for no passphrase).

    - Start the SSH agent using:

            eval "$(ssh-agent -s)"

    - Add your private key to the SSH agent:

            ssh-add ~/.ssh/id_ed25519

1.  **Copy Your SSH Public Key**:

    - Display your public key:

            cat ~/.ssh/id_ed25519.pub

    - Copy the entire key displayed in the terminal.

1.  **Add SSH Key to GitHub**:

    [Read more here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?platform=windows)

    - Log in to your GitHub account.
    - Click on your profile picture in the top-right corner, and then select "Settings."
    - In the left sidebar, click on "SSH and GPG keys."
    - Click on the "New SSH key" button.
    - Give your key a title (e.g., "Personal Laptop") and paste your copied SSH public key into the "Key" field.
    - Click the "Add SSH key" button.

1.  **Find the Repository to Clone**:

    - Log in to your GitHub account.
    - Navigate to the repository you want to clone. You can search for repositories or access them directly through their URLs.

1.  **Clone the Repository with SSH**:

    - On the repository page, locate the green "Code" button.
    - Click on the button to reveal a dropdown menu.
    - Make sure "SSH" is selected and click the clipboard icon to copy the SSH URL.

1.  **Open a Terminal (Command Prompt) and Navigate to the Directory Where You Want to Clone the Repository**:

1.  **Clone the Repository**:

    - In the terminal, type `git clone` followed by a space.
    - Paste the copied SSH URL.
    - Press Enter. This will initiate the cloning process using SSH.

Congratulations! You've successfully cloned a repository from GitHub to your local machine using the SSH method. You can now work with the code, make changes, and collaborate with others using Git and GitHub.

## Collaborating with Git and GitHub

### Working with Issues

**GitHub Issues** is a feature within GitHub that allows users to track, manage, and collaborate on tasks, enhancements, bugs, and other discussions related to a software project or repository. It serves as a way to facilitate communication and organization among contributors, developers, and users of a project.

GitHub Issues provides a centralized platform for discussing and addressing various aspects of a project, such as feature requests, bug reports, design decisions, and general discussions.

Users can comment on issues to provide more context, updates, or solutions and subscribe to receive notifications about updates to specific issues.

**Creating Issues**

1. **Navigate to the Repository**:

   - Log in to your GitHub account.
   - Go to the repository where you want to create the issue. You can either search for the repository or access it through your profile or organization page.

1. **Access the Issues Tab**:

   - Once you're in the repository, click on the "Issues" tab near the top of the repository's page.

1. **Create a New Issue**:

   - On the "Issues" page, click the green "New Issue" button.

   1. **Provide Issue Details**:

      - In the "Title" field, enter a concise and descriptive title for the issue.
      - In the "Leave a comment" box, provide a detailed description of the issue. Explain what the problem is, what you're trying to accomplish, or what feedback you're providing.
      - You can use the formatting toolbar above the comment box to format text, add links, insert images, and more.

   1. **Labels and Assignees (Optional)**:

      - **Labeling**: Issues can be labeled with tags to categorize and organize them (e.g., "bug," "enhancement," "documentation").

      - **Assignees**: Issues can be assigned to specific contributors or team members responsible for addressing them.

   1. **Milestones (Optional)**:

      - Groups of related issues can be grouped under milestones, helping to track progress toward specific goals.

      - If your repository uses milestones to track progress, you can associate the issue with a milestone.

1. **Submit the Issue**:

   - Once you've filled in the necessary information, click the green "Submit new issue" button at the bottom of the page.

1. **Confirmation and Discussion**:

   - After submitting the issue, it will be created and added to the list of issues in the repository.
   - You can now engage in discussions, provide updates, and collaborate with other contributors and users in the comment section of the issue.

Remember, creating a clear and detailed issue helps others understand the problem or request and facilitates effective collaboration within the GitHub community. Make sure to provide relevant context, steps to reproduce the issue (if applicable), and any additional information that might be helpful to address the matter effectively.

**Linking Issues to Commits**

Issues are often linked to pull requests (PRs), allowing for seamless integration between discussions and code changes. PRs can reference issues, and the status of an issue can be automatically updated when the related PR is merged. The full list of keywords can be found [here](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).

**Community Engagement**: GitHub Issues can also serve as a way for project maintainers to engage with the user community, gather feedback, and address concerns.

### Pull Requests (PRs)

Pull Requests (PRs) are a collaborative feature that allows developers to propose changes from their branches to be merged into a target branch, enabling efficient code review, discussion, and collaboration among team members before incorporating the changes into the main codebase. PRs provide a structured way to manage and discuss code changes, fostering a controlled and organized workflow in software development.

**Creating PRs**

PRs can be created on GitHub.com, with GitHub Desktop, in GitHub Codespaces, on GitHub Mobile, and when using GitHub CLI.

**Reviewing PRs**

When reviewing pull requests (PRs), several important points should be considered to ensure thorough and effective code evaluation. Here are key points to keep in mind:

1. **Understand the Context**: Familiarize yourself with the purpose of the changes, the problem being addressed, and the overall goal of the pull request.

2. **Code Quality**: Assess the code for clarity, readability, and adherence to coding standards. Ensure variable names, comments, and formatting are consistent and maintainable.

3. **Functionality and Logic**: Verify that the changes function as intended and do not introduce new bugs or regressions. Evaluate the logic and ensure it aligns with the project's requirements.

4. **Testing**: Check if appropriate tests have been added or updated to cover the changes. Verify that existing tests still pass and that new code is adequately tested.

5. **Performance**: Consider the impact of the changes on performance. Ensure that resource usage, response times, and scalability remain acceptable.

6. **Security**: Assess the code for potential security vulnerabilities or risks. Look for areas where user input may not be properly sanitized or validated.

7. **Documentation**: Review any new documentation, including code comments, README files, and user-facing documentation. Ensure that it is accurate, complete, and clear.

8. **Comments and Feedback**: Provide constructive feedback that helps the contributor understand any suggested improvements. Focus on actionable suggestions rather than just pointing out issues.

9. **Scope and Design**: Evaluate whether the changes align with the project's design and architecture. Consider long-term maintainability and extensibility.

10. **Dependencies**: Check if the changes impact or are impacted by other parts of the codebase. Ensure that the changes integrate smoothly with existing functionality.

11. **Code Review Tools**: Utilize code review tools and linting to automate and enhance the review process, catching common issues and maintaining consistency.

12. **Communication**: Engage in respectful and clear communication with the contributor. Address questions and concerns promptly and ensure a collaborative atmosphere.

13. **Testing the PR**: If feasible, test the pull request locally to validate its functionality and to provide more accurate feedback.

14. **Respect the Author's Intent**: While suggesting improvements, respect the original author's intent and approach. Provide alternatives rather than imposing drastic changes.

15. **Approval and Merging**: Once satisfied with the changes, approve the PR or indicate any final changes required before merging. Ensure that the PR aligns with project guidelines and practices.

Effective pull request reviews promote code quality, knowledge sharing, and teamwork within a development team, ultimately leading to a more robust and reliable codebase.

**Merging PRs and Handling Conflicts**

Merging PRs is often a single button click. When a PR is approved, individuals with the appropriate permissions may merge the commit into the target branch through the PR page.

Resolving conflicts during PR merging addresses situations where incompatible changes have been made in both the source and target branches.

## Etiquette for FOSS Projects

### Introduction to FOSS (Free and Open Source Software)

Free and open-source software (FOSS) is a term used to refer to groups of software consisting of both free software and open-source software where anyone is freely licensed to use, copy, study, and change the software in any way, and the source code is openly shared so that people are encouraged to voluntarily improve the design of the software. There are many educational and social benefits to contributing to open source software.

### Best Practices for Contributing to FOSS Projects

1. Understanding the Project's Guidelines

   Familiarize yourself with the project's goals, guidelines, and coding standards. Read the documentation and contribute in alignment with the project's objectives.

   Open source projects usually contain the following types of documentation:

   **README**: The README is the instruction manual that welcomes new community members to the project. It explains why the project is useful and how to get started.

   **CONTRIBUTING**: Whereas READMEs help people use the project, contributing docs help people contribute to the project. It explains what types of contributions are needed and how the process works. While not every project has a CONTRIBUTING file, its presence signals that this is a welcoming project to contribute to.

   **CODE_OF_CONDUCT**: The code of conduct sets ground rules for participants’ behavior associated and helps to facilitate a friendly, welcoming environment. While not every project has a CODE_OF_CONDUCT file, its presence signals that this is a welcoming project to contribute to.

   There might be additional documentation, such as tutorials, walkthroughs, or governance policies, especially on bigger projects.

1. Respectful Communication and Collaborative Behavior

   Kindness is key. Be patient while awaiting feedback or code reviews. Respond to comments respectfully and engage in constructive discussions. Understand that maintainers are often volunteers with limited time. Be considerate in your interactions and avoid unnecessary demands. Be open to feedback and willing to make changes based on reviewers' suggestions. Constructive criticism helps improve the quality of your contributions.

1. Providing Clear and Useful Contributions

   Contributions of any size should serve towards making the project better as a whole. It is best to avoid making minor changes "just because" (ie. changes made because you like them better that don't otherwise serve a purpose).

   If your contribution introduces new features, update or create relevant documentation to ensure users understand how to use the new functionality.

   Write clear and concise commit messages that explain the purpose of the change. This helps reviewers and future maintainers understand the context.

1. Acknowledging Licensing and Copyright

   By definition, every open source project must have an open source license. If the project does not have a license, it is not open source. Ensure that your contributions respect the project's licensing terms and that you have the necessary rights to contribute the code.

### Additional Resources

https://github.com/freeCodeCamp/how-to-contribute-to-open-source

https://opensource.guide/

## Continuous Integration and Continuous Deployment (CI/CD)

GitHub CI/CD (Continuous Integration/Continuous Deployment) is an automated workflow and integration service embedded within GitHub repositories. It enables developers to automatically build, test, and deploy code changes to different environments, ensuring code quality and accelerating the software development lifecycle. By automating these processes, GitHub CI/CD enhances collaboration, reduces manual errors, and facilitates the seamless delivery of updates to applications and services.
