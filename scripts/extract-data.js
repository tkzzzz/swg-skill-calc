#!/usr/bin/env node

/**
 * Data Extraction Script
 * 
 * This script converts the existing CONSTANTS.js file into organized JSON files
 * that are easier to manage and customize for different servers.
 * 
 * What this script does:
 * 1. Reads the CONSTANTS.js file from the archive folder
 * 2. Parses the JavaScript data into proper objects
 * 3. Separates data into logical categories (professions, skills, species)
 * 4. Writes clean JSON files that are easy to edit
 * 5. Creates a default server configuration
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting data extraction from CONSTANTS.js...');

// File paths
const CONSTANTS_PATH = path.join(__dirname, '..', 'archive', 'CONSTANTS.js');
const BASE_GAME_DIR = path.join(__dirname, '..', 'data', 'base-game');
const SERVER_CONFIGS_DIR = path.join(__dirname, '..', 'data', 'server-configs');

/**
 * Read and parse the CONSTANTS.js file
 * We need to safely extract JavaScript data without executing potentially harmful code
 */
function loadConstantsData() {
  try {
    console.log('📖 Reading CONSTANTS.js file...');
    
    if (!fs.existsSync(CONSTANTS_PATH)) {
      throw new Error(`CONSTANTS.js not found at: ${CONSTANTS_PATH}`);
    }

    // Read the file content
    let fileContent = fs.readFileSync(CONSTANTS_PATH, 'utf8');
    
    // Remove export statements to make it runnable
    fileContent = fileContent.replace(/export\s+const\s+/g, 'global.');
    
    // Create a safe evaluation context
    const context = { global: {} };
    
    // Use Function constructor for safer evaluation than eval()
    const executeCode = new Function('global', fileContent);
    executeCode(context.global);
    
    console.log('✅ Successfully parsed CONSTANTS.js');
    return context.global;
    
  } catch (error) {
    console.error('❌ Error reading CONSTANTS.js:', error.message);
    console.log('💡 Make sure the CONSTANTS.js file exists in the archive folder');
    process.exit(1);
  }
}

/**
 * Extract profession data into a clean structure
 */
function extractProfessions(data) {
  console.log('🔧 Extracting profession data...');
  
  const professions = {};
  
  // Process each profession category
  if (data.PROFESSIONS) {
    Object.keys(data.PROFESSIONS).forEach(category => {
      data.PROFESSIONS[category].forEach(professionName => {
        const professionId = professionName.toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        professions[professionId] = {
          id: professionId,
          displayName: professionName,
          category: category,
          description: `${professionName} profession from Star Wars Galaxies`
        };
      });
    });
  }
  
  // Add skill tree data if available
  if (data.ALL_PROFESSIONS) {
    Object.keys(data.ALL_PROFESSIONS).forEach(professionKey => {
      const treeData = data.ALL_PROFESSIONS[professionKey];
      
      // Find matching profession
      const profession = Object.values(professions).find(p => 
        professionKey.includes(p.id) || p.id.includes(professionKey.split('_').pop())
      );
      
      if (profession) {
        profession.skillTree = treeData;
      } else {
        // Create profession entry if it doesn't exist
        professions[professionKey] = {
          id: professionKey,
          displayName: professionKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          category: 'unknown',
          skillTree: treeData
        };
      }
    });
  }
  
  console.log(`✅ Extracted ${Object.keys(professions).length} professions`);
  return professions;
}

/**
 * Extract skill data into a clean structure
 */
function extractSkills(data) {
  console.log('🔧 Extracting skill data...');
  
  const skills = {};
  
  if (data.SKILLS) {
    Object.keys(data.SKILLS).forEach(skillId => {
      const skillData = data.SKILLS[skillId];
      
      skills[skillId] = {
        id: skillId,
        title: skillData.title || (data.SKILL_TITLE && data.SKILL_TITLE[skillId]) || '',
        skillPoints: skillData.skillPoints || 0,
        prerequisites: skillData.preReqs || [],
        experience: skillData.xp || { type: '', cost: 0 },
        skillModifiers: skillData.skillModifiers || {},
        commands: skillData.commands || [],
        schematics: skillData.schematics || []
      };
    });
  }
  
  console.log(`✅ Extracted ${Object.keys(skills).length} skills`);
  return skills;
}

/**
 * Extract species data
 */
function extractSpecies(data) {
  console.log('🔧 Extracting species data...');
  
  const species = {};
  
  if (data.ALL_SPECIES) {
    data.ALL_SPECIES.forEach(speciesId => {
      species[speciesId] = {
        id: speciesId,
        displayName: speciesId.charAt(0).toUpperCase() + speciesId.slice(1).replace(/_/g, ' '),
        description: `${speciesId} species from Star Wars Galaxies`
      };
    });
  }
  
  console.log(`✅ Extracted ${Object.keys(species).length} species`);
  return species;
}

/**
 * Create default server configuration
 */
function createDefaultConfig() {
  console.log('🔧 Creating default server configuration...');
  
  return {
    serverName: "Default SWG Configuration",
    description: "Base Star Wars Galaxies skill calculator settings",
    version: "1.0.0",
    settings: {
      maxSkillPoints: 250,
      maxProfessions: null,
      experienceMultiplier: 1.0,
      enableAllProfessions: true,
      enableAllSpecies: true
    },
    skillOverrides: {
      // Example: Override specific skills for this server
      // "science_medic_master": {
      //   "skillPoints": 10
      // }
    },
    professionOverrides: {
      // Example: Disable specific professions
      // "disabledProfessions": ["jedi_lightsaber"]
    },
    customization: {
      title: "SWG Skill Calculator",
      theme: "classic",
      features: {
        saveBuilds: true,
        exportBuilds: true,
        shareBuilds: false
      }
    }
  };
}

/**
 * Write JSON file with pretty formatting
 */
function writeJsonFile(filepath, data) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Main extraction process
 */
function main() {
  try {
    // Load the original data
    const constantsData = loadConstantsData();
    
    // Extract different data types
    const professions = extractProfessions(constantsData);
    const skills = extractSkills(constantsData);
    const species = extractSpecies(constantsData);
    const defaultConfig = createDefaultConfig();
    
    // Write JSON files
    console.log('💾 Writing JSON files...');
    
    writeJsonFile(path.join(BASE_GAME_DIR, 'professions.json'), professions);
    writeJsonFile(path.join(BASE_GAME_DIR, 'skills.json'), skills);
    writeJsonFile(path.join(BASE_GAME_DIR, 'species.json'), species);
    writeJsonFile(path.join(SERVER_CONFIGS_DIR, 'default.json'), defaultConfig);
    
    // Create a summary file for reference
    const summary = {
      extractionDate: new Date().toISOString(),
      sourceFile: 'archive/CONSTANTS.js',
      professionCount: Object.keys(professions).length,
      skillCount: Object.keys(skills).length,
      speciesCount: Object.keys(species).length,
      filesCreated: [
        'data/base-game/professions.json',
        'data/base-game/skills.json', 
        'data/base-game/species.json',
        'data/server-configs/default.json'
      ]
    };
    
    writeJsonFile(path.join(BASE_GAME_DIR, 'extraction-summary.json'), summary);
    
    console.log('🎉 Data extraction completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - ${summary.professionCount} professions`);
    console.log(`   - ${summary.skillCount} skills`);
    console.log(`   - ${summary.speciesCount} species`);
    console.log(`   - Files created in data/ folder`);
    console.log('');
    console.log('✨ You can now view the extracted data in the data/ folder');
    console.log('🔍 Next: Run "npm install" to install dependencies');
    
  } catch (error) {
    console.error('❌ Extraction failed:', error.message);
    process.exit(1);
  }
}

// Run the extraction if this script is called directly
if (require.main === module) {
  main();
}

module.exports = { main, extractProfessions, extractSkills, extractSpecies };