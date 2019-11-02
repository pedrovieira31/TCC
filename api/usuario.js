const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validacao

    const senhacriptografada = senha => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    const save = async (req, res) => {
        const usuario = { ...req.body }
        if (req.params.id) usuario.id = req.params.id
        if (!req.originalUrl.startsWith('/usuarios')) usuario.admin = false
        if (!req.usuario || req.usuario.admin) usuario.admin = false
        try {
            existsOrError(usuario.nome, 'Nome não informado')
            existsOrError(usuario.matricula, 'Matricula não informada')
            existsOrError(usuario.email, 'E-mail não informado')
            existsOrError(usuario.senha, 'Senha não informada')
            existsOrError(usuario.confirmarsenha, 'Confirmação de Senha inválida')
            equalsOrError(usuario.senha, usuario.confirmarsenha, 'Senhas Diferentes')
            const userFromDB = await app.db('usuarios')
                .where({ matricula: usuario.matricula }).first()
            if (!usuario.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }

        } catch (msg) {
            return res.status(400).send(msg)
        }
        usuario.senha = senhacriptografada(usuario.senha)
        delete usuario.confirmarsenha
        if (usuario.id) {
            app.db('usuarios')
                .update(usuario)
                .where({ id: usuario.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('usuarios')
                .insert(usuario)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const get = (req, res) => {
        app.db('usuarios')
            .select('matricula', 'nome', 'email')
            .then(usuario => res.json(usuario))
            .catch(err => res.status(500).send(err))
    }
    const getId = (req,res) => {
        app.db('usuarios')
            .select('matricula','nome','email')
            .where({matricula:req.params.matricula})
            .first()
            .then(usuario=> res.json(usuario))
            .catch(err => res.status(500).send(err))
    }
    return { save, getId,get }
}