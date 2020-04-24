module.exports = app => {
    const { existsOrError } = app.api.validacao
    const { contToken } = app.api.auth
    
    const save = (req, res) => {
        const processos = { ...req.body }
        if(req.params.id) processos.id = req.params.id

        try {
            existsOrError(processos.atividade, 'Atividade não informada')
            existsOrError(processos.matricula, 'Matricula não informada')
            existsOrError(processos.descricao, 'Descricao não informada')
            existsOrError(processos.horas, 'Minutos não informados')
            existsOrError(processos.certificado, 'Certificado não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

            app.db('processos')
                .insert(processos)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('processos')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Processo não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }


    const get = (req,res) => {
        app.db('processos')
            .then(processos => res.json(processos))
            .catch(err => res.status(500).send(err))
    }
    

    const getMat = (req,res) => {
        var mat = contToken.matricula;
        app.db('processos')
            .where({mat : matricula})
            .then(processos => res.json(processos))
            .catch((err) => console.log(err));
    }/*
            const getMat = (req, res) => {
                app.db('processos')
                .where({ matricula: req.matricula })
                .first()
                .then(processo => {
                    processo.content = processo.content.toString()
                    return res.json(processo)
                })
                .catch((err) => console.log(err));
        }*/

    return{save,remove,get,getMat}
}