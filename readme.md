# SWG Skill Calculator 🌟

A web-based skill calculator for Star Wars Galaxies (SWG) that replicates the classic Kodan's ProfCalc interface. Plan your character builds across multiple professions with real-time validation and point tracking.

![SWG Skill Calculator Screenshot](docs/images/screenshot.png)

## Features ✨

- **Classic Interface**: 3-column layout matching Kodan's ProfCalc
- **Multi-Profession Support**: Select skills across multiple professions
- **Real-time Validation**: Prerequisites checking and 250-point budget tracking
- **Complete Data Support**: Works with full SWG CONSTANTS.js files (9,400+ skills)
- **Build Persistence**: Save/load builds locally
- **Export Functionality**: Generate HTML reports of your builds
- **Accumulated Stats**: Live display of Experience, Skill Mods, Abilities, Titles, and Schematics

## Quick Start 🚀

### Option 1: Use GitHub Pages (Recommended)
Visit: [https://[your-username].github.io/swg-skill-calculator](https://[your-username].github.io/swg-skill-calculator)

### Option 2: Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/swg-skill-calculator.git
   cd swg-skill-calculator
   ```

2. Open `index.html` in your web browser
   - No build process required!
   - Works offline

3. Load your `CONSTANTS.js` file using the "Load CONSTANTS.js" button

## Usage Guide 📖

### Basic Workflow
1. **Load Data**: Click "Load CONSTANTS.js" and select your game data file
2. **Select Profession**: Choose from Basic, Elite, Force Sensitive, or Jedi professions
3. **Build Skills**: Click skills in the tree (prerequisites are enforced automatically)
4. **Track Points**: Monitor your 250-point budget in the right panel
5. **Save Build**: Use Save/Load buttons for build persistence
6. **Export**: Generate HTML reports of your completed builds

### Controls
- **Reset**: Clear all selections and start fresh
- **Save**: Store current build in browser localStorage
- **Load**: Restore previously saved build
- **Export**: Download build as HTML file
- **Force Refresh**: Debug tool to refresh data display
- **Debug Abilities**: Analyze ability data (development tool)

## Data File Format 📄

The calculator expects a `CONSTANTS.js` file with the following structure:

```javascript
export const PROFESSIONS = {
    basic: ["Artisan", "Brawler", "Entertainer", ...],
    elite: ["Architect", "Armorsmith", ...],
    forceSensitive: ["Combat Prowess", ...],
    jedi: ["Lightsaber", "Powers", ...]
};

export const ALL_PROFESSIONS = {
    profession_key: {
        master: "skill_id",
        branch_1: { skills: [...], links: [...] },
        branch_2: { skills: [...], links: [...] },
        branch_3: { skills: [...], links: [...] },
        branch_4: { skills: [...], links: [...] },
        novice: "skill_id",
        novice_links: [...]
    }
};

export const SKILLS = {
    skill_id: {
        title: "Skill Name",
        skillPoints: 5,
        preReqs: ["prereq_skill_id"],
        xp: { id: "type", cost: 1000 },
        skillModifiers: { mod_name: value },
        commands: ["ability1", "ability2"],
        schematics: ["schematic1"]
    }
};
```

## Development 🛠️

### Project Structure
```
swg-skill-calculator/
├── index.html          # Main application (single file)
├── README.md           # Documentation
├── LICENSE             # MIT License
├── .gitignore          # Git ignore file
├── docs/               # Documentation assets
│   └── images/         # Screenshots
├── data/               # Sample data files
│   └── CONSTANTS.js    # Example data file
└── archive/            # Previous versions
```

### Key Functions
- `loadDataFile()` - Parses CONSTANTS.js upload
- `renderSkillTree()` - Displays profession skill tree
- `toggleSkill()` - Handles skill selection/deselection
- `updateAccumulatedData()` - Aggregates stats across selected skills
- `isValidAbility()` - Filters malformed ability entries

### Known Issues 🐛
- Some ability entries from CONSTANTS.js may contain malformed data
- Title filtering needs refinement for skill-specific titles

### Debugging
Press F12 to open browser console and look for:
- `=== ABILITIES DEBUG ===` messages
- Skill data parsing information
- Validation warnings

## Contributing 🤝

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Areas for Improvement
- [ ] Auto-prerequisite selection (click Master → auto-select tree)
- [ ] Build templates for common character types
- [ ] Species stat bonuses integration
- [ ] Mobile responsive improvements
- [ ] Advanced search/filtering
- [ ] Community build sharing

## Browser Support 🌐

- Chrome/Edge (Recommended)
- Firefox
- Safari
- No Internet Explorer support

## License 📜

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Original Kodan's ProfCalc for design inspiration
- SWG community for continued support
- All contributors to this project

## Links 🔗

- [Live Demo](https://[your-username].github.io/swg-skill-calculator)
- [Report Issues](https://github.com/[your-username]/swg-skill-calculator/issues)
- [SWG Community Discord](https://discord.gg/swg)

---

Made with ❤️ for the SWG community