const { sequelize } = require('../../src/app/models')

module.exports = () => {
    Promise.all(Object.keys(sequelize.models).map(model => {
        sequelize.models[model].destroy({ force: true, truncate: true })
    }))
}