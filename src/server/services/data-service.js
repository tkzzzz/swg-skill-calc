/**
 * Data Service - Loads and manages all game data
 * 
 * This service is responsible for:
 * 1. Loading JSON data files from disk
 * 2. Caching data in memory for fast access
 * 3. Merging base game data with server configurations
 * 4. Providing easy access to data for our API
 */

const fs = require('fs').promises;
const path = require('path');

class DataService {
  constructor() {
    // Cache for loaded data
    this.data = {
      professions: {},
      skills: {},
      species: {},
      serverConfig: {},
      loaded: false
    };
    
    // Paths to our data files
    this.paths = {
      baseGame: path.join(__dirname, '..', '..', '..', 'data', 'base-game'),
      serverConfigs: path.join(__dirname, '..', '..', '..', 'data', 'server-configs')
    };
  }

  /**
   * Initialize the service by loading all data
   */
  async initialize() {
    console.log('📚 Loading game data...');
    
    try {
      // Load base game data
      await this.loadBaseGameData();
      
      // Load default server configuration
      await this.loadServerConfig('default');
      
      this.data.loaded = true;
      console.log('✅ All game data loaded successfully!');
      
    } catch (error) {
      console.error('❌ Failed to load game data:', error);
      throw error;
    }
  }

  /**
   * Load all base game data files
   */
  async loadBaseGameData() {
    // Load professions
    const professionsPath = path.join(this.paths.baseGame, 'professions.json');
    const professionsData = await this.loadJsonFile(professionsPath);
    this.data.professions = professionsData;
    console.log(`  ✓ Loaded ${Object.keys(professionsData).length} professions`);

    // Load skills
    const skillsPath = path.join(this.paths.baseGame, 'skills.json');
    const skillsData = await this.loadJsonFile(skillsPath);
    this.data.skills = skillsData;
    console.log(`  ✓ Loaded ${Object.keys(skillsData).length} skills`);

    // Load species
    const speciesPath = path.join(this.paths.baseGame, 'species.json');
    const speciesData = await this.loadJsonFile(speciesPath);
    this.data.species = speciesData;
    console.log(`  ✓ Loaded ${Object.keys(speciesData).length} species`);
  }

  /**
   * Load a specific server configuration
   * @param {string} configName - Name of the server config (e.g., 'default', 'legends')
   */
  async loadServerConfig(configName) {
    const configPath = path.join(this.paths.serverConfigs, `${configName}.json`);
    
    try {
      const configData = await this.loadJsonFile(configPath);
      this.data.serverConfig = configData;
      console.log(`  ✓ Loaded server config: ${configName}`);
      
      // Apply any server-specific overrides
      this.applyServerOverrides(configData);
      
    } catch (error) {
      console.warn(`  ⚠️  Could not load config ${configName}, using default`);
      // If specific config fails, try to load default
      if (configName !== 'default') {
        await this.loadServerConfig('default');
      }
    }
  }

  /**
   * Apply server-specific overrides to the base game data
   * @param {Object} config - Server configuration object
   */
  applyServerOverrides(config) {
    // Apply skill overrides if they exist
    if (config.skillOverrides) {
      Object.keys(config.skillOverrides).forEach(skillId => {
        if (this.data.skills[skillId]) {
          // Merge the override with the base skill data
          this.data.skills[skillId] = {
            ...this.data.skills[skillId],
            ...config.skillOverrides[skillId]
          };
        }
      });
    }

    // Apply profession overrides if they exist
    if (config.professionOverrides && config.professionOverrides.disabledProfessions) {
      config.professionOverrides.disabledProfessions.forEach(professionId => {
        if (this.data.professions[professionId]) {
          this.data.professions[professionId].disabled = true;
        }
      });
    }
  }

  /**
   * Load and parse a JSON file
   * @param {string} filepath - Path to the JSON file
   * @returns {Object} Parsed JSON data
   */
  async loadJsonFile(filepath) {
    try {
      const fileContent = await fs.readFile(filepath, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Failed to load ${filepath}:`, error.message);
      throw error;
    }
  }

  /**
   * Get all professions
   * @param {boolean} includeDisabled - Whether to include disabled professions
   * @returns {Object} Professions data
   */
  getProfessions(includeDisabled = false) {
    if (!includeDisabled) {
      // Filter out disabled professions
      const enabledProfessions = {};
      Object.keys(this.data.professions).forEach(id => {
        if (!this.data.professions[id].disabled) {
          enabledProfessions[id] = this.data.professions[id];
        }
      });
      return enabledProfessions;
    }
    return this.data.professions;
  }

  /**
   * Get a specific profession by ID
   * @param {string} professionId - The profession ID
   * @returns {Object|null} Profession data or null if not found
   */
  getProfession(professionId) {
    return this.data.professions[professionId] || null;
  }

  /**
   * Get all skills
   * @returns {Object} Skills data
   */
  getSkills() {
    return this.data.skills;
  }

  /**
   * Get a specific skill by ID
   * @param {string} skillId - The skill ID
   * @returns {Object|null} Skill data or null if not found
   */
  getSkill(skillId) {
    return this.data.skills[skillId] || null;
  }

  /**
   * Get all species
   * @returns {Object} Species data
   */
  getSpecies() {
    return this.data.species;
  }

  /**
   * Get current server configuration
   * @returns {Object} Server configuration
   */
  getServerConfig() {
    return this.data.serverConfig;
  }

  /**
   * Get available server configurations
   * @returns {Array} List of available config names
   */
  async getAvailableConfigs() {
    try {
      const files = await fs.readdir(this.paths.serverConfigs);
      return files
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));
    } catch (error) {
      console.error('Failed to list server configs:', error);
      return ['default'];
    }
  }

  /**
   * Check if data is loaded
   * @returns {boolean} Whether data is loaded
   */
  isLoaded() {
    return this.data.loaded;
  }

  /**
   * Reload all data (useful for development)
   */
  async reload() {
    this.data.loaded = false;
    await this.initialize();
  }
}

// Create a singleton instance
const dataService = new DataService();

module.exports = dataService;