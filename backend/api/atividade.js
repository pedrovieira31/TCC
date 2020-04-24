module.exports = app =>{
    const {existsOrError,notExistsOrError} = app.api.validacao

    const save = async (req,res) => {
        const atividade = {...req.body}
        if(req.params.id) atividade.codigo = req.params.id
        try{
            existsOrError(atividade.codigo, 'Código não informado')
            existsOrError(atividade.horasTotais, 'Minutos não informados')
            existsOrError(atividade.descricao, 'Descrição não informada')
             const atividadeDB = await app.db('atividades')
        }catch(msg){
            return res.status(400).send(msg)
        } 
            app.db('atividades')
                .insert(atividade)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))

        }
    const get = async (req,res) => {
        app.db('atividades')
            .then(atividade => res.json(atividade))
            .catch(err => res.status(500).send(err))
    }
    return{save,get}
}