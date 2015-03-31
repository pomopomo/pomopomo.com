module.exports = {
  status: 'default',
  mongoose: {
    uri: process.env.MONGO_URL || 'mongodb://localhost/pomopomo'
  },
  api: {
    version: 1
  },
  server: {
    port: process.env.PORT || 7666 //POMO
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:7666/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  }
};