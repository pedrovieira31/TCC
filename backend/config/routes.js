const admin = require('./admin')
var multer = require('multer')
// import axios from "axios";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})
var upload = multer({ storage: storage });
module.exports = app =>{
    app.post('/cadastro', app.api.usuario.save)
    app.post('/login', app.api.auth.login)
    app.post('/validarToken', app.api.auth.validarToken)

    app.route('/usuarios')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.usuario.get))

    app.route('/usuarios')
        .all(app.config.passport.authenticate())
        .post(app.api.auth.login)
        .put(app.api.usuario.save)
        .get(app.api.usuario.getMat)
        .get(app.api.processo.getMat)

    app.route('/processo')
        .put(app.api.usuario.save)
        .get(app.api.usuario.getMat)

    app.post('/cadastroAtividade',upload.single('certificado'), app.api.processo.save,app.api.processo.getID)

    app.route('/home')
    .get(app.api.processo.getMat)

    app.route('/admin')
        .get(app.api.usuario.get)
        .delete(app.api.processo.remove)
        
    app.route('/aluno/:matricula')    
        .get(app.api.usuario.getInfo)
    
    app.route('/admin/aluno/:matricula')
        .get(app.api.processo.getMatAD)

    app.route('/admin/aluno/:ID')
        .delete(app.api.processo.remove)

    app.route('/stats')
        .get(app.api.stat.get)
}