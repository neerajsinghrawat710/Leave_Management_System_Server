
const dev = {
  "APP_PORT": 4000,
  "NODE_ENV": "dev",
  "MONGO_URL": "mongodb+srv://neerajsinghrawat710:V1O7gEnvBTQWQ7Mm@cluster0.fbqkbgw.mongodb.net/test",
  "JWT_SECRET_KEY": "12@#45_4345Feeic##%@$$$_$536335",
  "SALT": 10,
};

module.exports = {
  apps: [
    {
      name: "Quick_survey_server",
      script: 'server.js',
      autorestart: true,
      watch: true,
      source_map_support: true,
      combine_logs: true,
      exec_mode: 'cluster',
      instances: 1,
      error: './error.log',
      env_dev: dev,
      merge_logs: true,
      broadcast_logs: true,
      max_memory_restart: '300M',
    }
  ]
}
