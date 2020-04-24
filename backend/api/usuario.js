const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validacao

    const senhacriptografada = senha => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }

    const save = async (req, res) => {
        const usuario = { ...req.body };
        if (req.params.id) usuario.matricula = req.params.id
        if (!req.originalUrl.startsWith('/usuarios')) usuario.admin = false
        if (!req.usuario || !req.usuario.admin) usuario.admin = false

        let userFromDb = null;
        try {
            existsOrError(usuario.nome, 'Nome não informado')
            existsOrError(usuario.matricula, 'Matricula não informada')
            existsOrError(usuario.senha, 'Senha não informada')
            existsOrError(usuario.confirmarsenha, 'Confirmação de Senha inválida')
            equalsOrError(usuario.senha, usuario.confirmarsenha, 'Senhas Diferentes')
            existsOrError(usuario.email, 'E-mail não informado')
            userFromDB = await app.db('usuarios')
            .where({ matricula: usuario.matricula }).first();
            if (userFromDb && usuario.matricula === userFromDb.matricula) {
                existsOrError(userFromDB, 'Usuário já cadastrado');
            }

        } catch (msg) {
            return res.status(400).send(msg)
        }
        console.log(usuario);
        usuario.senha = senhacriptografada(usuario.senha)
        delete usuario.confirmarsenha

        await app.db('usuarios')
                .insert(usuario)
                .then(_ => res.status(200).send(usuario))
                .catch(err => {
                    console.log(err);
                   return res.status(500).send(err)
                });
    }
    const get = (req, res) => {
        app.db('usuarios')
            .select('matricula', 'nome', 'email')
            .whereNull('deleted_at')
            .then(usuario => res.json(usuario))
            .catch(err => res.status(500).send(err))
    }
    const getMat = (req,res) => {
        app.db('usuarios')
            .select('matricula')
            .where({matricula:req.params.matricula})
            .whereNull('deleted_at')
            .first()
            .then(usuario=> res.json(usuario))
            .catch(err => res.status(500).send(err))
    }
    return { save, getMat,get }
}