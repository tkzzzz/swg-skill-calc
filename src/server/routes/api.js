/**
 * API Routes - Define all the endpoints for accessing game data
 * 
 * These routes handle:
 * - Getting profession data
 * - Getting skill data
 * - Getting species data
 * - Managing server configurations
 * 
 * All routes are prefixed with /api (configured in app.js)
 */

const dataService = require('../services/data-service');

/**
 * Register all API routes
 * @param {Object} fastify - Fastify instance
 * @param {Object} options - Route options
 */
async function apiRoutes(fastify, options) {
  
  /**
   * GET /api/professions
   * Get all professions with optional filtering
   */
  fastify.get('/professions', async (request, reply) => {
    try {
      const { includeDisabled = false, category } = request.query;
      
      // Get professions from data service
      let professions = dataService.getProfessions(includeDisabled);
      
      // Filter by category if requested
      if (category) {
        const filtered = {};
        Object.keys(professions).forEach(id => {
          if (professions[id].category === category) {
            filtered[id] = professions[id];
          }
        });
        professions = filtered;
      }
      
      return {
        success: true,
        count: Object.keys(professions).length,
        data: professions
      };
      
    } catch (error) {
      throw error;
    }
  });

  /**
   * GET /api/professions/:id
   * Get a specific profession by ID
   */
  fastify.get('/professions/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const profession = dataService.getProfession(id);
      
      if (!profession) {
        reply.status(404);
        return {
          success: false,
          error: `Profession '${id}' not found`
        };
      }
      
      return {
        success: true,
        data: profession
      };
      
    } catch (error) {
      throw error;
    }
  });

  /**
   * GET /api/skills
   * Get all skills with optional filtering
   */
  fastify.get('/skills', async (request, reply) => {
    try {
      const { profession, search } = request.query;
      
      let skills = dataService.getSkills();
      
      // Filter by profession if requested
      if (profession) {
        const filtered = {};
        Object.keys(skills).forEach(id => {
          if (id.includes(profession)) {
            filtered[id] = skills[id];
          }
        });
        skills = filtered;
      }
      
      // Search by title if requested
      if (search) {
        const searchLower = search.toLowerCase();
        const filtered = {};
        Object.keys(skills).forEach(id => {
          const skill = skills[id];
          if (skill.title && skill.title.toLowerCase().includes(searchLower)) {
            filtered[id] = skill;
          }
        });
        skills = filtered;
      }
      
      return {
        success: true,
        count: Object.keys(skills).length,
        data: skills
      };
      
    } catch (error) {
      throw error;
    }
  });

  /**
   * GET /api/skills/:id
   * Get a specific skill by ID
   */
  fastify.get('/skills/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const skill = dataService.getSkill(id);
      
      if (!skill) {
        reply.status(404);
        return {
          success: false,
          error: `Skill '${id}' not found`
        };
      }
      
      return {
        success: true,
        data: skill
      };
      
    } catch (error) {
      throw error;
    }
  });

  /**
   * GET /api/species
   * Get all species
   */
  fastify.get('/species', async (request, reply) => {
    try {
      const species = dataService.getSpecies();
      
      return {
        success: true,
        count: Object.keys(species).length,
        data: species
      };
      
    } catch (error) {
      throw error;
    }
  });

  /**
   * GET /api/config
   * Get current server configuration
   */
  fastify.get('/config', async (request, reply) => {
    try {
      const config = dataService.getServerConfig();
      
      return {
        success: true,
        data: config
      };
      
    } catch (error) {
      throw error;
    }
  });

  /**
   * GET /api/config/available
   * Get list of available server configurations
   */
  fastify.get('/config/available', async (request, reply) => {
    try {
      const configs = await dataService.getAvailableConfigs();
      
      return {
        success: true,
        count: configs.length,
        data: configs
      };
      
    } catch (error) {
      throw error;
    }
  });

  /**
   * POST /api/config/:name
   * Switch to a different server configuration
   */
  fastify.post('/config/:name', async (request, reply) => {
    try {
      const { name } = request.params;
      
      // Reload data service with new configuration
      await dataService.loadServerConfig(name);
      
      return {
        success: true,
        message: `Switched to ${name} configuration`,
        data: dataService.getServerConfig()
      };
      
    } catch (error) {
      throw error;
    }
  });

  /**
   * GET /api/stats
   * Get statistics about the loaded data
   */
  fastify.get('/stats', async (request, reply) => {
    try {
      const professions = dataService.getProfessions(true);
      const skills = dataService.getSkills();
      const species = dataService.getSpecies();
      const config = dataService.getServerConfig();
      
      // Calculate some interesting stats
      const stats = {
        totalProfessions: Object.keys(professions).length,
        totalSkills: Object.keys(skills).length,
        totalSpecies: Object.keys(species).length,
        professionsByCategory: {},
        averageSkillCost: 0,
        maxSkillPoints: config.settings?.maxSkillPoints || 250,
        serverName: config.serverName || 'Unknown'
      };
      
      // Count professions by category
      Object.values(professions).forEach(prof => {
        const category = prof.category || 'unknown';
        stats.professionsByCategory[category] = (stats.professionsByCategory[category] || 0) + 1;
      });
      
      // Calculate average skill cost
      const skillCosts = Object.values(skills).map(s => s.skillPoints || 0);
      stats.averageSkillCost = Math.round(
        skillCosts.reduce((a, b) => a + b, 0) / skillCosts.length
      );
      
      return {
        success: true,
        data: stats
      };
      
    } catch (error) {
      throw error;
    }
  });

  /**
   * GET /api/search
   * Global search across all data
   */
  fastify.get('/search', async (request, reply) => {
    try {
      const { q } = request.query;
      
      if (!q || q.length < 2) {
        return {
          success: false,
          error: 'Search query must be at least 2 characters'
        };
      }
      
      const searchLower = q.toLowerCase();
      const results = {
        professions: [],
        skills: [],
        species: []
      };
      
      // Search professions
      const professions = dataService.getProfessions();
      Object.values(professions).forEach(prof => {
        if ((prof.displayName && prof.displayName.toLowerCase().includes(searchLower)) ||
            (prof.description && prof.description.toLowerCase().includes(searchLower))) {
          results.professions.push(prof);
        }
      });
      
      // Search skills
      const skills = dataService.getSkills();
      Object.values(skills).forEach(skill => {
        if (skill.title && skill.title.toLowerCase().includes(searchLower)) {
          results.skills.push(skill);
        }
      });
      
      // Search species
      const species = dataService.getSpecies();
      Object.values(species).forEach(spec => {
        if (spec.displayName && spec.displayName.toLowerCase().includes(searchLower)) {
          results.species.push(spec);
        }
      });
      
      return {
        success: true,
        query: q,
        results: results,
        totalResults: results.professions.length + results.skills.length + results.species.length
      };
      
    } catch (error) {
      throw error;
    }
  });
}

module.exports = apiRoutes;