module.exports = () => ({
  db_user: process.env.DB_USER || '',
  db_host: process.env.DB_HOST || '',
  db_password: process.env.DB_PASSWORD || '',
  db_name: process.env.DB_NAME || '',
  persistence: process.env.PERSISTENCE || ''
})