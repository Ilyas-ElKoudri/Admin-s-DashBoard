# Contributing to Admin's Dashboard

Thank you for considering contributing to this project! This document provides guidelines for contributing to the Admin's Dashboard e-commerce management system.

## 🚀 How to Contribute

### Reporting Issues

1. Check if the issue already exists
2. Use the issue template to report bugs
3. Provide clear reproduction steps
4. Include environment details (.NET version, OS, browser)

### Submitting Changes

1. **Fork the Repository**
   ```bash
   git clone https://github.com/Ilyas-ElKoudri/Admin-s-DashBoard.git
   cd Admin-s-DashBoard
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Test your changes thoroughly

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: brief description of changes"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Wait for review

## 📋 Development Guidelines

### Backend (.NET Core)

- Follow C# coding conventions
- Use meaningful variable and method names
- Add XML documentation comments for public APIs
- Write unit tests for new features
- Use async/await for I/O operations
- Follow SOLID principles

### Frontend (JavaScript)

- Use ES6+ features
- Write clean, readable code
- Add comments for complex logic
- Test across different browsers
- Ensure responsive design

### Database

- Create migrations for schema changes
- Test migrations both up and down
- Document any manual SQL scripts

## 🧪 Testing

- Test your changes locally before submitting
- Ensure backend API works with Swagger
- Test frontend functionality in the browser
- Check responsive design on different screen sizes
- Verify dark mode functionality

## 💬 Code Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, changes will be merged
4. Your contribution will be acknowledged

## 📝 Commit Message Guidelines

Use clear and descriptive commit messages:

- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for modifications to existing features
- `Remove:` for removed features
- `Refactor:` for code refactoring
- `Docs:` for documentation changes

Example: `Add: user authentication endpoint`

## 🎯 Pull Request Guidelines

- Keep PRs focused and small
- One feature/fix per PR
- Update documentation if needed
- Add tests for new features
- Ensure CI/CD passes

## ❓ Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Review existing documentation
- Check the README for setup instructions

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Keep discussions professional

Thank you for contributing! 🙏
