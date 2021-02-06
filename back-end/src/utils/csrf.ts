import csrf from "csurf";

/* This is casuing issues for the time being
   csrf protection can be worked in later

app.use(csrf());

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((err, req, res, next) => {
  if (err) {
    if (err.code == "EBADCSRFTOKEN") {
      req.session.save(() => res.redirect("/"));
    } else {
      res.sendStatus("404");
    }
  }
}); */
