# api-sensor-dashboard-raspberry

### Environment variables
- **PORT** (default: 8080)
- **DB_NAME** (default: 'api-sensor-dashboard')
- **DB_HOST** (default: 'localhost:27017')
- **ADMIN_PASSWORD** - (*required*) password to access API (password must be then added to each request as a "authentication" header)
- **SENSORS_HOST** - (default: 'localhost:8081')
- **SENSORS_PASSWORD** - will be added to each request as "authentication" header
- **SENSORS_INTERVAL** - (default: '600000' - 10 minutes)


### Run development build
`ADMIN_PASSWORD=foobarbaz npm run dev`

### Run production build
`ADMIN_PASSWORD=foobarbaz npm run start`