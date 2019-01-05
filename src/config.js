const config = {
  port: process.env.PORT || 8080,
  bodyLimit: '100mb',
  corsHeaders: ['Link', 'Jwt'],
  dbName: process.env.DB_NAME || 'api-sensor-dashboard',
  dbHost: process.env.DB_HOST || 'localhost:27017',
  sensorsHost: process.env.SENSORS_HOST || 'localhost:8081',
  sensorsPassword: process.env.SENSORS_PASSWORD,
  sensorsInterval: parseInt(process.env.SENSORS_INTERVAL) || 600000,
  password: process.env.ADMIN_PASSWORD,
};

export default config;
