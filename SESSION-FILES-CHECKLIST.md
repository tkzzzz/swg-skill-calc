# Session Files Checklist

This document tracks which files need to be created in each development session to manage usage limits effectively.

## Session 1: Foundation Setup

### Files to Create:
- [ ] `package.json` - Project configuration and dependencies
- [ ] `scripts/extract-data.js` - Tool to convert CONSTANTS.js to JSON
- [ ] `data/base-game/professions.json` - Core profession definitions
- [ ] `data/base-game/skills.json` - All skill data in JSON format
- [ ] `data/base-game/species.json` - Species information
- [ ] `data/server-configs/default.json` - Base server configuration
- [ ] `.gitignore` - Files to ignore in version control
- [ ] `src/shared/constants.js` - Shared constants between client/server

### Folders to Create:
- [ ] `src/` (main source code)
- [ ] `src/server/` (backend code)
- [ ] `src/client/` (frontend code)
- [ ] `src/shared/` (common code)
- [ ] `data/` (game data)
- [ ] `data/base-game/` (core game data)
- [ ] `data/server-configs/` (server-specific configs)
- [ ] `data/schemas/` (validation schemas)
- [ ] `scripts/` (build/utility scripts)
- [ ] `docs/` (documentation)
- [ ] `legacy/` (backup of old files)

### Key Commands:
```bash
npm install
node scripts/extract-data.js
```

---

## Session 2: Backend API

### Files to Create:
- [ ] `src/server/app.js` - Main server application
- [ ] `src/server/routes/api.js` - API route definitions
- [ ] `src/server/services/data-service.js` - Data loading and caching
- [ ] `src/server/middleware/cors.js` - Cross-origin request handling
- [ ] `src/server/middleware/error-handler.js` - Error handling middleware
- [ ] `src/server/config/server-config.js` - Server configuration

### Dependencies to Add:
- `fastify` - Web server framework
- `@fastify/cors` - CORS support
- `@fastify/static` - Static file serving

### Key Commands:
```bash
npm run dev:server
curl http://localhost:3000/api/professions
```

---

## Session 3: Frontend Components

### Files to Create:
- [ ] `src/client/index.html` - New main page
- [ ] `src/client/app.js` - Main application logic
- [ ] `src/client/components/profession-list.js` - Profession selection component
- [ ] `src/client/components/skill-tree.js` - Skill tree display component
- [ ] `src/client/components/skill-points-tracker.js` - Points tracking component
- [ ] `src/client/utils/api.js` - API communication helper
- [ ] `src/client/utils/dom.js` - DOM manipulation helpers
- [ ] `src/client/utils/state.js` - Application state management

### Key Commands:
```bash
npm run dev:client
open http://localhost:3000
```

---

## Session 4: UI Styling

### Files to Create:
- [ ] `src/client/styles/main.css` - Main layout and typography
- [ ] `src/client/styles/components.css` - Component-specific styles
- [ ] `src/client/styles/variables.css` - CSS custom properties
- [ ] `src/client/styles/layout.css` - Grid and layout styles
- [ ] `src/client/styles/responsive.css` - Mobile/tablet responsiveness
- [ ] `src/client/assets/favicon.ico` - Site icon

### Key Features:
- Three-panel layout matching screenshot
- Professional color scheme
- Hover and selection states
- Responsive design

---

## Session 5: Configuration System

### Files to Create:
- [ ] `src/server/config/config-manager.js` - Configuration loading and merging
- [ ] `data/server-configs/legends.json` - SWG Legends configuration
- [ ] `data/server-configs/restoration.json` - SWG Restoration configuration
- [ ] `data/server-configs/basilisk.json` - SWG Basilisk configuration
- [ ] `data/schemas/config.schema.json` - JSON schema for config validation
- [ ] `src/client/components/server-selector.js` - Server selection UI
- [ ] `src/server/routes/config.js` - Configuration API endpoints

### Key Features:
- URL parameter server selection
- Config validation and error handling
- Dynamic UI updates based on server settings

---

## Session 6: Deployment & Documentation

### Files to Create:
- [ ] `Dockerfile` - Container configuration
- [ ] `railway.json` - Railway deployment configuration
- [ ] `docker-compose.yml` - Local development with Docker
- [ ] `docs/deployment.md` - Deployment instructions
- [ ] `docs/configuration.md` - Server configuration guide
- [ ] `docs/development.md` - Developer setup guide
- [ ] `scripts/build-static.js` - Static HTML export script
- [ ] `scripts/deploy.js` - Deployment automation
- [ ] `.dockerignore` - Docker build exclusions
- [ ] `README.md` - Updated project README

### Key Commands:
```bash
npm run build
npm run deploy:railway
npm run build:static
```

---

## File Size Estimates

### Session 1 (Foundation): ~2,500 lines
- Large JSON data files from CONSTANTS.js conversion
- Basic project structure

### Session 2 (Backend): ~800 lines  
- Server setup and API endpoints
- Focused on functionality over volume

### Session 3 (Frontend): ~1,200 lines
- Component structure and basic logic
- API integration

### Session 4 (Styling): ~1,500 lines
- CSS for professional appearance
- Responsive design rules

### Session 5 (Configuration): ~600 lines
- Configuration management
- Server-specific JSON files

### Session 6 (Deployment): ~400 lines
- Deployment configurations
- Documentation files

**Total Estimated: ~7,000 lines of code**

---

## Usage Management Strategy

### Per Session Limits:
- **Code Generation**: Focus on 1-2 major files per session
- **Explanations**: Detailed but concise comments in code
- **Testing**: Clear step-by-step verification instructions

### Cross-Session Coordination:
- Each session references previous work
- Clear handoff documentation between sessions
- Incremental testing to catch issues early

### Emergency Files:
If usage limit hit mid-session, prioritize these essential files:
1. **Session 1**: `package.json` and `extract-data.js`
2. **Session 2**: `app.js` and `data-service.js`
3. **Session 3**: `index.html` and `app.js`
4. **Session 4**: `main.css`
5. **Session 5**: `config-manager.js`
6. **Session 6**: `Dockerfile` and deployment docs

---

## Session Success Criteria

Each session should result in:
1. **Visible Progress**: Something new you can see/test
2. **Complete Functionality**: Each piece works independently
3. **Clear Next Steps**: Obvious what Session N+1 should do
4. **Good Documentation**: Comments explain the "why" not just "what"
5. **Easy Testing**: Simple commands to verify everything works

This checklist ensures we stay organized and make steady progress toward the final customizable SWG Skill Calculator.