const admin = require('./admin')

module.exports = app =>{
    app.post('/cadastrar', app.api.usuario.save)
    app.post('/login', app.api.auth.login)
    app.post('/validarToken', app.api.auth.validarToken)

    app.route('/usuarios')
        .get(app.api.usuario.get)
    app.route('/usuarios/:matricula')
        .all(app.config.passport.authenticate())
        .put(app.api.usuario.save)
        .get(app.api.processo.get)

    app.route('/processo')
        .post(app.api.processo.save)
        .get(app.api.atividade.get)

    app.route('/admin')
        .get(app.api.processo.get)
        .delete(app.api.processo.remove)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}