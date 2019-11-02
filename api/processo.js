module.exports = app => {
    const { existsOrError } = app.api.validacao

    const save = (req, res) => {
        const processo = { ...req.body }
        if(req.params.id) processo.id = req.params.id

        try {
            existsOrError(processo.atividade, 'Atividade não informada')
            existsOrError(processo.matricula, 'Matricula não informada')
            existsOrError(processo.descricao, 'Descricao não informada')
            existsOrError(processo.horas, 'Minutos não informados')
            existsOrError(processo.certificado, 'Certificado não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(processo.id) {
            app.db('processos')
                .update(processo)
                .where({ id: processo.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('processos')
                .insert(processo)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('processos')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
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
            .select('id','atividade','matricula','descricao','horas','certificado','validacao')
            .then(processos => res.json(processos))
            .catch(err => res.status(500).send(err))
    }
    const getMat = (req,res) => {
        app.db('processos')
            .select('id','atividade','matricula','descricao','horas','certificado','validacao')
            .where({matricula:req.params.matricula})
            .then(processos => res.json(processos))
            .catch(err => res.status(500).send(err))
    }

    return{save,remove,get,getMat}
}