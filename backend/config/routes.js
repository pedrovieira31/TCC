const admin = require('./admin')

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

    app.route('/cadastro')
        .put(app.api.usuario.save)
        .get(app.api.processo.get)

    app.route('/cadastroAtividade')
        .post(app.api.processo.save)

    app.route('/home')
        .get(app.api.processo.getMat)

    app.route('/admin')
        .get(app.api.processo.get)
        .delete(app.api.processo.remove)

    app.route('/stats')

        .get(app.api.stat.get)
}