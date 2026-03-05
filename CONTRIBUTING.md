# Contributing to Xtensionsvrse

First off, thank you for considering contributing to Xtensionsvrse! It's people like you that make open-source software such a great community to learn, inspire, and create.

By participating in this project, you agree to abide by basic community standards of mutual respect and collaboration.

## 🧠 How Can I Contribute?

### Reporting Bugs

If you find a bug in the source code, you can help us by submitting an issue to our GitHub Repository. Even better, you can submit a Pull Request with a fix.

When filing an issue, please try to include:

- A quick summary and/or background.
- Steps to reproduce the bug.
- What you expected would happen.
- What actually happened.
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work).

### Suggesting Enhancements

If you have a great idea for a new feature or improvement, please submit an issue outlining your proposal! We love discussing new ways to make the platform better.

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through `help-wanted` or `good first issue` labels on our issue tracker.

## 📝 Pull Request Process

1. **Fork the repo** and create your branch from `main`.
2. **Setup your environment:** Ensure you have both the frontend and backend running locally connected to a PostgreSQL database.
3. **Make your changes:** Keep your commits atomic and commit messages clear.
4. **Test your changes:** Ensure that your changes do not break existing functionality (e.g., authentication flows, cart management).
5. **Update Documentation:** If you've changed APIs, added features, or altered the setup process, update the `README.md` accordingly.
6. **Submit:** Open a Pull Request referencing any related issues.

## 💅 Code Style & Guidelines

- **Frontend:** We use Tailwind CSS heavily. Please adhere to the existing class structures and utilize the variables in `src/index.css` (like `--color-primary`, `--color-background-dark`) for theme consistency.
- **Backend:** Keep controllers and routes segregated. Handle errors gracefully and ensure sensitive data (like passwords) are never returned in API payloads.
- **Linting:** Please run any existing formatting/linting scripts before committing to ensure the codebase remains clean.

## ❓ Need Help?

If you're stuck, feel free to ask questions in the Pull Request or Issue thread. We are here to help you get your code across the finish line!
