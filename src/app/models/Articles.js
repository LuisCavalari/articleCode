module.exports = (sequelize, dataTypes) => {
    const Articles = sequelize.define('Articles', {
        name: dataTypes.STRING(1000),
        description: dataTypes.STRING(1000),
        content: dataTypes.TEXT,
        image: dataTypes.STRING(1000)
    })
    Articles.associate = function(models){
        Articles.belongsTo(models.Users, { foreignKey: 'user_id' , as:'user' })
        Articles.belongsTo(models.Categories, { foreignKey: 'categorie_id' , as: 'categorie' })
    }
    return Articles
}