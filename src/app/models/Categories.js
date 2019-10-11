module.exports = (sequelize, dataTypes) => {
    const Categories = sequelize.define('Categories', {
        name: dataTypes.STRING(1000),
    })
    Categories.associate = function(models){
        Categories.hasMany(models.Articles)
        Categories.belongsTo(models.Categories)
    }
    return Categories
}