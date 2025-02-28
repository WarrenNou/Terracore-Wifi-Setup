#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const http = require('http');

// Define configuration
const config = {
  serverPort: 5123,
  appName: 'Terracore-Wifi-Setup'
};

// Set public path for static files
const publicPath = path.join(__dirname, 'docs');

// Initialize Express
const express = require('express');
const app = express();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/', express.static(publicPath));

// Add app name to response headers
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', config.appName);
  next();
});

// Start server
const server = http.createServer(app).listen(config.serverPort, () => {
  console.log(`${config.appName} server running at http://localhost:${config.serverPort}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});