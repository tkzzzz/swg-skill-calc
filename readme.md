# SWG Skill Calculator 🌟

A **customizable**, modern skill calculator for Star Wars Galaxies (SWG) that supports multiple server configurations. Built with a Node.js backend and clean architecture, it allows different SWG servers (Legends, Restoration, etc.) to easily customize skill points, professions, and game mechanics.

![SWG Skill Calculator Screenshot](docs/images/screenshot.png)

## Features ✨

- **Multi-Server Support**: Easy configuration for different SWG servers
- **Modern Architecture**: RESTful API backend with JSON data storage
- **Customizable Settings**: 
  - Skill point limits (250, 300, etc.)
  - Profession availability
  - Experience rates
  - Skill costs and modifications
- **Classic Interface**: Professional UI matching Kodan's ProfCalc
- **Complete Data**: All 767 skills and 52 professions from SWG
- **Multiple Deployment Options**: Host online, run locally, or generate static files
- **Real-time Validation**: Prerequisites and point budget tracking
- **Build Management**: Save, load, and export character builds

## Quick Start 🚀

### Option 1: Hosted Version (Recommended)
```bash
# Clone the repository
git clone https://github.com/tkzzzz/swg-skill-calc.git
cd swg-skill-calc

# Install dependencies
npm install

# Start the server
npm start

# Open http://localhost:3000 in your browser
```

### Option 2: Static Export (No Server Required)
```bash
npm run build:static
# Opens a standalone HTML file that works offline
```

### Option 3: Deploy to Railway/Vercel
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

Click the button above or see [deployment guide](docs/deployment.md)

## Server Configuration 🔧

### Customizing for Your Server

Create a new configuration file in `data/server-configs/yourserver.json`:

```json
{
  "serverName": "Your SWG Server",
  "description": "Custom configuration for our server",
  "settings": {
    "maxSkillPoints": 300,
    "experienceMultiplier": 1.5,
    "enableAllProfessions": true
  },
  "skillOverrides": {
    "science_medic_master": {
      "skillPoints": 10
    }
  },
  "professionOverrides": {
    "disabledProfessions": ["jedi_defender"]
  }
}
```

Then access your configuration:
- Hosted: `http://yoursite.com/?server=yourserver`
- Local: `http://localhost:3000/?server=yourserver`

### Available Configurations

- **default**: Base SWG settings (250 skill points)
- **legends**: SWG Legends configuration
- **restoration**: SWG Restoration settings
- **basilisk**: SWGEmu Basilisk settings

## API Documentation 📡

The calculator provides a RESTful API for integration:

```bash
# Get all professions
GET /api/professions

# Get skills for a profession
GET /api/skills?profession=medic

# Search across all data
GET /api/search?q=master

# Get server configuration
GET /api/config

# Switch server configuration
POST /api/config/legends
```

See [API Documentation](docs/api.md) for full details.

## Development 🛠️

### Project Structure
```
swg-skill-calc/
├── src/
│   ├── server/              # Backend API (Node.js + Fastify)
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   └── config/          # Server configuration
│   ├── client/              # Frontend application
│   │   ├── components/      # Web Components
│   │   ├── styles/          # CSS files
│   │   └── utils/           # Helper functions
│   └── shared/              # Shared code
├── data/
│   ├── base-game/           # Core SWG data (JSON)
│   │   ├── professions.json # 52 professions
│   │   ├── skills.json      # 767 skills
│   │   └── species.json     # 10 species
│   └── server-configs/      # Server customizations
├── scripts/                 # Build and utility scripts
├── docs/                    # Documentation
└── legacy/                  # Previous version (reference)
```

### Development Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Key Technologies
- **Backend**: Node.js, Fastify, JSON data storage
- **Frontend**: Web Components, ES6+ JavaScript
- **Styling**: CSS Grid, CSS Custom Properties
- **Deployment**: Docker, Railway, Vercel compatible

### Development Roadmap
See [DEVELOPMENT-ROADMAP.md](DEVELOPMENT-ROADMAP.md) for the complete development plan across 6 sessions.

## Contributing 🤝

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How to Add Your Server Configuration

1. Fork this repository
2. Create `data/server-configs/yourserver.json`
3. Submit a pull request
4. Your server config will be available to all users!

### Areas for Improvement
- [ ] Complete UI matching the screenshot design
- [ ] Auto-prerequisite selection
- [ ] Build templates and sharing
- [ ] Species stat integration
- [ ] Mobile responsive design
- [ ] Admin panel for live configuration
- [ ] PostgreSQL support for larger deployments

## Current Status 🚧

**Completed (Sessions 1-2):**
- ✅ Modern backend architecture
- ✅ Data extraction from CONSTANTS.js
- ✅ RESTful API with full data access
- ✅ Server configuration system
- ✅ Basic test interface

**In Progress (Session 3+):**
- 🔄 Professional UI implementation
- 🔄 Web Components for skill trees
- 🔄 Full calculator functionality
- 🔄 Deployment automation

## Browser Support 🌐

- Chrome/Edge (Recommended)
- Firefox
- Safari
- Mobile browsers (responsive design coming)

## License 📜

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Original Kodan's ProfCalc for design inspiration
- SWG community for continued support
- All contributors to this project

## Links 🔗

- [Repository](https://github.com/tkzzzz/swg-skill-calc)
- [Report Issues](https://github.com/tkzzzz/swg-skill-calc/issues)
- [Development Roadmap](DEVELOPMENT-ROADMAP.md)

---

Made with ❤️ for the SWG community | 🤖 Developed with Claude Code assistance