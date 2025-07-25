# SWG Skill Calculator - Development Roadmap

This document provides a detailed plan for building the new customizable SWG Skill Calculator across multiple coding sessions.

## Overview for Non-Coders

**What we're building**: A modern, customizable version of your SWG skill calculator that different servers can easily configure and deploy.

**Why this approach**: 
- Makes it easy for server admins to customize (just edit JSON files)
- Allows hosting on services like Railway or running locally
- Creates a professional interface matching the screenshot you provided
- Enables community contributions via GitHub

## Session-by-Session Breakdown

### Session 1: Foundation Setup
**Goal**: Extract current data and set up project structure
**Time Estimate**: 1 hour
**What you'll see**: New folder structure and JSON data files

#### Tasks:
1. **Create new folder structure** (5 minutes)
   - Make `src/`, `data/`, `scripts/` folders
   - Move current files to `legacy/` folder

2. **Extract CONSTANTS.js data** (30 minutes)
   - Run script to convert JavaScript data to JSON format
   - Create separate files for professions, skills, species
   - Validate data is complete and correct

3. **Set up package.json** (15 minutes)
   - Define project dependencies (Node.js libraries we'll use)
   - Create npm scripts for development commands
   - Add project metadata

4. **Create first server config** (10 minutes)
   - Make `default.json` with current settings (250 skill points, all professions)
   - Document what each setting does

#### Files Created:
- `data/base-game/professions.json` (profession definitions)
- `data/base-game/skills.json` (all skill data)
- `data/base-game/species.json` (species information)
- `data/server-configs/default.json` (base configuration)
- `package.json` (project setup)
- `scripts/extract-data.js` (conversion tool)

#### Testing:
- Verify JSON files are valid (no syntax errors)
- Check that all original data is present
- Confirm folder structure matches plan

---

### Session 2: Backend API
**Goal**: Create server that can serve data dynamically
**Time Estimate**: 1.5 hours  
**What you'll see**: Working API you can test in browser

#### Tasks:
1. **Basic server setup** (30 minutes)
   - Install Fastify (web server library)
   - Create main app.js file
   - Set up basic error handling

2. **Data loading service** (45 minutes)
   - Create service to load JSON files
   - Add caching for better performance
   - Handle missing files gracefully

3. **API endpoints** (15 minutes)
   - `/api/professions` - list all professions
   - `/api/skills` - get all skills
   - `/api/config` - get server configuration

#### Files Created:
- `src/server/app.js` (main server)
- `src/server/routes/api.js` (API endpoints)
- `src/server/services/data-service.js` (data loading)

#### Testing:
- Start server with `npm run dev:server`
- Visit `http://localhost:3000/api/professions` in browser
- Verify JSON data is returned correctly

---

### Session 3: Frontend Components
**Goal**: Create reusable UI components
**Time Estimate**: 1.5 hours
**What you'll see**: Individual parts of the interface working

#### Tasks:
1. **Basic HTML structure** (30 minutes)
   - Create new index.html with proper layout
   - Set up CSS Grid for three-panel design
   - Add basic styling to match screenshot

2. **Profession list component** (45 minutes)
   - Component to display profession categories
   - Handle selection states (basic, elite, etc.)
   - Connect to API data

3. **Skill tree component** (15 minutes)
   - Basic structure for displaying skill trees
   - Placeholder for skill boxes
   - Branch layout preparation

#### Files Created:
- `src/client/index.html` (new main page)
- `src/client/components/profession-list.js` (profession selector)
- `src/client/components/skill-tree.js` (skill tree display)
- `src/client/utils/api.js` (API communication helper)

#### Testing:
- Open new index.html in browser
- Verify profession list displays correctly
- Check that API calls work (using developer tools)

---

### Session 4: UI Styling and Layout
**Goal**: Make interface look like the screenshot
**Time Estimate**: 2 hours
**What you'll see**: Professional-looking interface matching target design

#### Tasks:
1. **Main layout CSS** (60 minutes)
   - Three-panel grid layout
   - Color scheme matching screenshot
   - Responsive design for different screen sizes

2. **Component styling** (45 minutes)
   - Style profession buttons with selection states
   - Skill box styling with proper spacing
   - Right panel layout for skill points and data

3. **Interactive states** (15 minutes)
   - Hover effects for buttons
   - Selection highlighting
   - Loading states for API calls

#### Files Created:
- `src/client/styles/main.css` (main layout)
- `src/client/styles/components.css` (component styles)
- `src/client/styles/variables.css` (color/spacing constants)

#### Testing:
- Compare interface to screenshot
- Test on different browser sizes
- Verify all interactive elements work

---

### Session 5: Configuration System
**Goal**: Enable server-specific customization
**Time Estimate**: 1 hour
**What you'll see**: Ability to switch between different server configurations

#### Tasks:
1. **Configuration manager** (30 minutes)
   - Service to load and merge server configs
   - Handle config validation and errors
   - Support for config switching

2. **Server configuration files** (20 minutes)
   - Create configs for SWG Legends, Restoration
   - Document common customization options
   - Add validation schemas

3. **Frontend config integration** (10 minutes)
   - URL parameter support (`?server=legends`)
   - Config selection interface
   - Dynamic UI updates based on config

#### Files Created:
- `src/server/config/config-manager.js` (config handling)
- `data/server-configs/legends.json` (SWG Legends config)
- `data/server-configs/restoration.json` (Restoration config)
- `data/schemas/config.schema.json` (validation rules)

#### Testing:
- Switch between different server configs
- Verify skill point limits change
- Test config validation with invalid data

---

### Session 6: Deployment and Documentation
**Goal**: Make project ready for hosting and distribution
**Time Estimate**: 1 hour
**What you'll see**: Deployed version and complete documentation

#### Tasks:
1. **Deployment setup** (30 minutes)
   - Create Dockerfile for containerization
   - Railway.json for easy Railway deployment
   - Build scripts for production

2. **Documentation** (20 minutes)
   - Deployment guide for different platforms
   - Configuration guide for server admins
   - Development guide for contributors

3. **Static export option** (10 minutes)
   - Script to generate offline HTML version
   - Bundle all assets into single file
   - Test offline functionality

#### Files Created:
- `Dockerfile` (containerization)
- `railway.json` (Railway deployment config)
- `docs/deployment.md` (deployment guide)
- `docs/configuration.md` (server setup guide)
- `scripts/build-static.js` (offline version generator)

#### Testing:
- Deploy to Railway successfully
- Test local installation process
- Verify static export works offline

## Key Benefits of This Approach

### For You (Designer):
- **Visual Progress**: Each session shows clear improvements
- **Manageable Chunks**: Never overwhelming amount of code at once
- **Clear Testing**: Specific steps to verify each part works
- **Backup Safety**: Old version stays intact until new one is proven

### For Server Operators:
- **Easy Customization**: Edit simple JSON files instead of complex JavaScript
- **Multiple Options**: Can host online or run locally
- **Community Sharing**: Share configurations via GitHub
- **Professional Look**: Matches expectations from screenshot

### For Developers:
- **Modern Stack**: Uses current best practices
- **Maintainable**: Clean separation of concerns
- **Extensible**: Easy to add new features later
- **Well-Documented**: Clear instructions for contributions

## Success Metrics

After each session, you should be able to:

1. **Session 1**: See JSON files with your game data
2. **Session 2**: Get data from API in browser
3. **Session 3**: See basic interface components working
4. **Session 4**: Interface looks like the screenshot
5. **Session 5**: Switch between different server configs
6. **Session 6**: Deploy live version and share with others

## Next Steps

When you're ready to start, we'll begin with Session 1: Foundation Setup. This involves creating the folder structure and extracting your current data into the new JSON format.

Each session will include:
- **Detailed explanations** of what each file does
- **Step-by-step instructions** for testing
- **Troubleshooting tips** for common issues
- **Visual confirmation** that everything is working

The goal is to make this as smooth as possible for someone with design experience but limited coding background.