/**
 * SWG Skill Calculator - Main Server Application
 * 
 * This is the heart of our backend. It creates a web server that:
 * 1. Serves our game data through API endpoints
 * 2. Handles different server configurations
 * 3. Serves the frontend files
 * 
 * We're using Fastify because it's fast and easy to understand
 */

// Import required libraries
const fastify = require('fastify');
const path = require('path');
const cors = require('@fastify/cors');
const staticFiles = require('@fastify/static');

// Import our custom modules (we'll create these next)
const dataService = require('./services/data-service');
const apiRoutes = require('./routes/api');

/**
 * Create and configure the server
 * @returns {Object} Fastify server instance
 */
async function createServer() {
  // Create a new Fastify instance with helpful logging
  const server = fastify({
    logger: true
  });

  // Register CORS plugin - this allows the frontend to talk to our API
  // even when they're on different ports during development
  await server.register(cors, {
    origin: true, // Allow all origins during development
    credentials: true
  });

  // Register static file serving - this serves our HTML, CSS, and JS files
  await server.register(staticFiles, {
    root: path.join(__dirname, '..', 'client'),
    prefix: '/' // Files will be available at root URL
  });

  // Initialize our data service - this loads all the game data
  await dataService.initialize();

  // Register our API routes with a /api prefix
  await server.register(apiRoutes, { prefix: '/api' });

  // Add a simple health check endpoint
  server.get('/health', async (request, reply) => {
    return { 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      dataLoaded: dataService.isLoaded()
    };
  });

  // Error handler - catches any errors and sends friendly responses
  server.setErrorHandler((error, request, reply) => {
    server.log.error(error);
    
    // Send appropriate error response
    reply.status(error.statusCode || 500).send({
      error: true,
      message: error.message || 'Internal server error',
      statusCode: error.statusCode || 500
    });
  });

  return server;
}

/**
 * Start the server
 */
async function start() {
  try {
    // Create the server
    const server = await createServer();
    
    // Get port from environment or use default
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '0.0.0.0';
    
    // Start listening for requests
    await server.listen(port, host);
    
    console.log(`🚀 SWG Skill Calculator server is running!`);
    console.log(`📡 API available at: http://localhost:${port}/api`);
    console.log(`🌐 Frontend will be at: http://localhost:${port}`);
    console.log(`❤️  Health check at: http://localhost:${port}/health`);
    console.log(`\n✨ Ready to serve the galaxy!\n`);
    
  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server if this file is run directly
if (require.main === module) {
  start();
}

// Export for testing purposes
module.exports = { createServer };