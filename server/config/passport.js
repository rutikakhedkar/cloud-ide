const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user-model');

// --- Google OAuth Strategy ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile?.emails?.[0]?.value || `no-email-${profile.id}@google.com`;
      const name= profile?.displayName
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile?.id,
          email:email,
          name:name,
        });
      }
      // Return user object only
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// --- GitHub OAuth Strategy ---
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value || `no-email-${profile.id}@github.com`;
      const name=profile?.displayName
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        user = await User.create({
          githubId: profile.id,
          email:email,
          name:name
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

module.exports = passport;
