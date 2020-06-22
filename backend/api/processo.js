const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const fs = require('fs');

module.exports = app => {


    const { existsOrError } = app.api.validacao

    const save = (req, res) => {

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token, authSecret);
        const processos = { ...req.body };
        processos.matricula = decodedToken.matricula;
        processos.certificado = req.body.filename;
        delete processos.filename;

        try {
            existsOrError(processos.atividade, 'Atividade não informada')
            existsOrError(processos.descricao, 'Descricao não informada')
            existsOrError(processos.horas, 'Minutos não informados')
            existsOrError(processos.certificado, 'Certificado não informado')
        } catch (msg) {
            res.status(400).send(msg)
        }

        app.db('processos')
            .insert(processos)
            .then(processos => res.json(processos))
            .catch((err) => console.log(err));

    }

    const remove = async (req,res) => {
        try {
            const rowsDeleted = await app.db('processos')
                .where({ p_id: req.params.p_id }).del()

            try {
                existsOrError(rowsDeleted, 'Processo não foi encontrado.')
            } catch (msg) {
                return console.log(msg)
            }

            res.status(204).send()
        } catch (msg) {
            console.log(msg)
        }
    }


    const get = (req, res) => {
        app.db('processos')
            .then(processos => res.json(processos))
            .catch(err => res.status(500).send(err))
    }

    const getId = (req, res) => {
        app.db('processos')
            .max('p_id')
            .then(response => res.json(response[0]))
            .catch(err => res.status(500).send(err))
    }
    const getMat = (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token, authSecret);
        var matricula = decodedToken.matricula;
        app.db('processos')
            .select('p_id','atividade','descricao','horas','certificado')
            .where({ matricula })
            .then(processos => res.json(processos))
            .catch((err) => console.log(err));
    }
    const getMatAD = (req, res) => {
        var matricula = req.params.matricula;
        app.db('processos')
            .where({ matricula })
            .then(processos => res.json(processos))
            .catch((err) => console.log(err));
    }

    return { save, remove, get, getMat, getMatAD, getId}
}