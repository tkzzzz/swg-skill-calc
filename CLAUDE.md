# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **customizable** Star Wars Galaxies (SWG) Skill Calculator that replicates and enhances Kodan's ProfCalc interface. The project supports multiple server configurations (SWG Legends, Restoration, etc.) with easy deployment options for both hosted and local use.

**TARGET USER**: Designer with limited coding experience who needs detailed explanations and incremental changes.

## New Architecture (In Development)

We are migrating from a static HTML/JS approach to a modern, configurable system:

### Current State (Legacy)
- Single HTML file with embedded JavaScript
- Static CONSTANTS.js data file
- No server customization options
- Manual file loading required

### Target State (New System)
- **Backend**: Node.js API with configurable data serving
- **Frontend**: Modern component-based UI matching screenshot design
- **Data**: JSON-based configuration system for different SWG servers
- **Deployment**: Multiple options (Railway hosted, local server, static export)

## Project Structure (New)

```
swg-skill-calc/
├── src/
│   ├── server/              # Backend API (Node.js + Fastify)
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   └── config/          # Server configuration
│   ├── client/              # Frontend components
│   │   ├── components/      # UI components (Web Components)
│   │   ├── styles/          # CSS files
│   │   └── utils/           # Helper functions
│   └── shared/              # Common code between client/server
├── data/                    # Game data (JSON format)
│   ├── base-game/           # Core SWG data (immutable)
│   │   ├── professions.json # Profession definitions
│   │   ├── skills.json      # Individual skill data
│   │   └── species.json     # Species information
│   ├── server-configs/      # Server-specific overrides
│   │   ├── legends.json     # SWG Legends configuration
│   │   ├── restoration.json # SWG Restoration configuration
│   │   └── default.json     # Default/base configuration
│   └── schemas/             # Data validation schemas
├── scripts/                 # Build and setup scripts
├── docs/                    # Documentation for developers
└── legacy/                  # Old files (for reference during migration)
```

## Development Approach

### Session-Based Development
Due to usage limits, development will be broken into focused sessions:

1. **Session 1**: Data extraction and structure setup
2. **Session 2**: Basic backend API development  
3. **Session 3**: Frontend component creation
4. **Session 4**: UI styling and layout
5. **Session 5**: Configuration system implementation
6. **Session 6**: Deployment setup and testing

### Beginner-Friendly Guidelines
- **Small Changes**: Each session makes 1-2 focused improvements
- **Detailed Explanations**: Every change includes "why" and "how it works"
- **Visual Progress**: Each session shows visible improvements
- **Backup Strategy**: Keep old files until new system is proven
- **Testing Steps**: Clear instructions for testing each change

## Key Features (Target)

### Server Customization
- **Skill Points**: Configurable total (250 default, but servers may use 300+)
- **XP Rates**: Server-specific experience multipliers
- **Profession Availability**: Enable/disable certain professions per server
- **Skill Modifications**: Override individual skill costs or effects
- **Species Options**: Different species available per server

### Multi-Deployment Support
- **Hosted Version**: Deploy to Railway/Vercel with URL like `swgcalc.com/?server=legends`
- **Local Server**: `npm start` runs local version with full customization
- **Static Export**: Generate offline HTML file for distribution

### Enhanced UI (Based on Screenshot)
- **Left Panel**: Profession categories with visual selection states
- **Center Panel**: Detailed skill trees with proper branch visualization
- **Right Panel**: Skill points tracking and accumulated data display
- **Advanced Features**: Search, filtering, species selection

## Data Structure (New Approach)

### Why JSON Instead of CONSTANTS.js?
- **Easier to Edit**: JSON is more beginner-friendly than JavaScript
- **Validation**: Can check for errors automatically
- **Server Configs**: Easy to create different server variations
- **Version Control**: Better tracking of data changes in Git
- **API Friendly**: Direct loading without JavaScript parsing

### Example Data Structure
```json
// data/base-game/professions.json
{
  "medic": {
    "id": "medic",
    "displayName": "Medic", 
    "category": "basic",
    "description": "Healing and medical support profession"
  }
}

// data/server-configs/legends.json  
{
  "serverName": "SWG Legends",
  "maxSkillPoints": 250,
  "skillOverrides": {
    "science_medic_master": {
      "skillPoints": 10
    }
  }
}
```

## Development Commands (Target)

```bash
# Setup (one-time)
npm install                    # Install dependencies
npm run setup                  # Initialize data files

# Development
npm run dev                    # Start development server
npm run dev:client             # Frontend only (for UI work)
npm run dev:server             # Backend only (for API work)

# Building
npm run build                  # Build for production
npm run build:static           # Create offline HTML version

# Deployment
npm run deploy:railway         # Deploy to Railway
npm run deploy:local           # Setup for local hosting
```

## Migration Strategy

### Phase 1: Foundation (Sessions 1-2)
- Extract current CONSTANTS.js data to JSON files
- Create basic Node.js backend to serve data
- Maintain current UI while building new backend

### Phase 2: Frontend Rebuild (Sessions 3-4)  
- Create new UI components matching screenshot
- Implement responsive layout
- Connect to new backend API

### Phase 3: Configuration (Sessions 5-6)
- Add server configuration system
- Implement deployment options
- Testing and documentation

## Files to Create (Development Sessions)

This list helps manage development across multiple sessions:

### Session 1 Files:
- `scripts/extract-data.js` (convert CONSTANTS.js to JSON)
- `data/base-game/professions.json`
- `data/base-game/skills.json`
- `data/server-configs/default.json`
- `package.json` (project setup)

### Session 2 Files:
- `src/server/app.js` (main server file)
- `src/server/routes/api.js` (API endpoints)
- `src/server/services/data-service.js` (data loading)

### Session 3 Files:
- `src/client/index.html` (new main page)
- `src/client/components/profession-list.js`
- `src/client/components/skill-tree.js`

### Session 4 Files:
- `src/client/styles/main.css` (new styling)
- `src/client/styles/components.css`
- `src/client/app.js` (main application logic)

### Session 5 Files:
- `src/server/config/config-manager.js`
- `data/server-configs/legends.json`
- `data/server-configs/restoration.json`

### Session 6 Files:
- `Dockerfile` (for deployment)
- `railway.json` (Railway configuration)
- `docs/deployment.md`

## Code Style Guidelines (Updated)

- **Modern JavaScript**: ES2020+ features with clear explanations
- **Component-Based**: Small, reusable pieces
- **Beginner Comments**: Explain complex logic thoroughly
- **Consistent Naming**: Clear, descriptive variable/function names
- **Error Handling**: Graceful fallbacks with user-friendly messages
- **Progressive Enhancement**: Works without JavaScript for basic features

## Testing Approach (Updated)

- **Manual Testing**: Clear step-by-step instructions for each feature
- **Browser Compatibility**: Chrome, Firefox, Safari testing
- **Local vs Hosted**: Test both deployment scenarios  
- **Configuration Testing**: Verify different server configs work
- **Data Validation**: Ensure JSON files are valid and complete