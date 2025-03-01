# Contributing to hono-routing-controller

We are excited that you're interested in contributing to the `hono-routing-controller` project! This guide will help you get started with contributing to the project. Whether you're submitting a bug fix, a new feature, or an improvement, we appreciate your help!

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Code of Conduct](#code-of-conduct)
- [Issue Reporting](#issue-reporting)
- [Pull Request Process](#pull-request-process)
- [Development Setup](#development-setup)

## How to Contribute

We welcome contributions from the community! To contribute, follow these steps:

1. **Fork the Repository**  

   First, fork the repository by clicking the "Fork" button at the top right of the repo page.

2. **Clone Your Fork**  

    Clone your fork to your local machine:
    ```bash
    git clone https://github.com/hasib-devs/hono-routing-controller.git
    cd hono-routing-controller
    ```
3. **Create a New Branch**

   Always create a new branch for your feature or fix:
   ```
   git checkout -b feat/your-feature-name
   ```

   always use semantic branch name.
    - feat
    - fix
    - docs
    - style
    - refactor
    - perf
    - test
    - build
    - ci
    - chore
    - revert
    - merge

4. **Commit Your Changes**

   Write clear and concise commit messages:
   ```bash
   git commit -m "Add feature/bugfix description"
   ```
5. **Push to Your Fork**

   Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**

   After pushing your changes, go to the original repository and create a pull request (PR) from your fork.

## Code of Conduct
We follow a Code of Conduct in this project. By participating, you are expected to honor the code of conduct and engage with the community respectfully.

## Issue Reporting
If you encounter a bug or have an idea for a new feature, feel free to open an issue. Please include:

A clear description of the problem or feature request.
Steps to reproduce the issue, if applicable.
Any relevant log or error messages.
Information about your environment (e.g., Node.js version, operating system).

## Pull Request Process
We use the following steps for accepting pull requests:

1. **Ensure Tests Pass**

   All tests must pass before we can merge your PR.

2. **Code Review**

   Once you submit your PR, a maintainer will review it and may suggest changes.

3. **Merge**

   Once your PR is approved, it will be merged into the main branch.

**Please ensure your PR follows these guidelines:**

- Write clear and concise commit messages.
- Keep the changes focused on a single issue or feature.
- If adding new features, consider writing tests to cover them.
- Ensure that existing functionality and tests remain unaffected.

## Development Setup
To set up your local environment for development:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/hasib-devs/hono-routing-controller.git
   ```

2. **Install Dependencies**

   Install the required dependencies:
   ```bash
   pnpm install
   ```

3. **Start Development**

   To run the application locally during development:
   ```bash
   pnpm dev
   ```
   
4. **Build**

   To create a production build of the application:
   ```bash
   pnpm build
   ```

5. **Run Tests**

   To run the test suite and ensure everything is working:
   ```bash
   pnpm test
   ```
___
Thanks for your contributions to the hono-routing-controller project!
___