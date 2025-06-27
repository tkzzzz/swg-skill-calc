# Contributing to SWG Skill Calculator

First off, thank you for considering contributing to the SWG Skill Calculator! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please be respectful and considerate in all interactions.

## How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues to avoid duplicates.

**When reporting a bug, include:**
- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Browser and OS information
- CONSTANTS.js file version (if relevant)

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:
- A clear and descriptive title
- Step-by-step description of the suggested enhancement
- Explanation of why this enhancement would be useful
- Mockups or examples if applicable

### Pull Requests 🔀

1. **Fork the repository** and create your branch from `main`
2. **Name your branch** descriptively: `feature/auto-prerequisites` or `fix/ability-filter`
3. **Make your changes** following the coding standards
4. **Test thoroughly** in multiple browsers
5. **Update documentation** if needed
6. **Submit the PR** with a clear description

## Development Process

### Setting Up Your Environment

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/[your-username]/swg-skill-calculator.git
   cd swg-skill-calculator
   ```

2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Open `index.html` in your browser to test

### Coding Standards

#### JavaScript
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code patterns
- Use console.log sparingly (remove before PR)

```javascript
// Good
function calculateTotalSkillPoints(selectedSkills) {
    let total = 0;
    selectedSkills.forEach(skillId => {
        const skill = SKILLS[skillId];
        if (skill) total += skill.skillPoints;
    });
    return total;
}

// Avoid
function calc(s) {
    let t = 0;
    s.forEach(id => {
        if (SKILLS[id]) t += SKILLS[id].skillPoints;
    });
    return t;
}
```

#### HTML/CSS
- Maintain the SWG color scheme
- Keep responsive design in mind
- Use semantic HTML elements
- Follow BEM naming for new CSS classes

### Testing Checklist

Before submitting a PR, ensure:
- [ ] Code works with sample data
- [ ] Code works with full CONSTANTS.js file
- [ ] No console errors in Chrome, Firefox, Safari
- [ ] Skill selection/deselection works correctly
- [ ] Save/Load functionality intact
- [ ] Export generates valid HTML
- [ ] Mobile layout still functional

### Commit Messages

Use clear, descriptive commit messages:
- `feat: Add auto-prerequisite selection`
- `fix: Remove numeric entries from abilities list`
- `docs: Update README with new features`
- `style: Improve mobile responsive layout`
- `refactor: Simplify skill validation logic`

## Priority Areas for Contribution

### High Priority 🔴
1. **Ability Filter Fix**: Improve filtering to remove all malformed entries
2. **Auto-Prerequisites**: Click master skill → select entire tree
3. **Mobile UX**: Better touch interactions and responsive design

### Medium Priority 🟡
1. **Build Templates**: Pre-made builds for common archetypes
2. **Search Function**: Find skills by name or effect
3. **Skill Comparison**: Compare two builds side-by-side
4. **Undo/Redo**: Action history for skill selection

### Nice to Have 🟢
1. **Animations**: Smooth transitions for skill selection
2. **Keyboard Shortcuts**: Quick navigation
3. **Build Sharing**: URL-based build sharing
4. **Theme Options**: Dark/light mode toggle

## Questions?

Feel free to:
- Open an issue for discussion
- Reach out on the SWG community Discord
- Check existing issues and PRs for context

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

Thank you for helping make the SWG Skill Calculator better! May the Force be with you! 🌟