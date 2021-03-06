module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } })
            .then(stat => {
                const defaultStat = {
                    usuarios: 0,
                    atividades: 0,
                    processos: 0
                }
                res.json(stat || defaultStat)
            })
    }

    return { Stat, get }
}