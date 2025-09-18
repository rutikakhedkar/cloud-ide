app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.redirect("/dashboard")
);

app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
app.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => res.redirect("/dashboard")
);
