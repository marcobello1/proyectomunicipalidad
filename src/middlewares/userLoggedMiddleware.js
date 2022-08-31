function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    let usuario = req.session.loggedUser;
    if (usuario) {
        res.locals.isLogged = true;
    }
    next();
  }
  
  module.exports = userLoggedMiddleware;
  