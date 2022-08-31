function guestMiddleware (req,res,next) {
    let usuario = req.session.loggedUser;
    console.log("el usuario es");
    console.log(usuario)
    if (usuario.tipousuario === "usuario") {
        res.redirect('/users/algosaliomal')
    }
next();
}
module.exports= guestMiddleware;