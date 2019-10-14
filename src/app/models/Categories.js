module.exports = (sequelize, dataTypes) => {
    const Categories = sequelize.define('Categories', {
        name: dataTypes.STRING(1000),
    })
    Categories.associate = function(models){
        Categories.hasMany(models.Articles,{ as: 'articles'})
        Categories.belongsTo(models.Categories, { foreignKey: 'parent_id', as:'parent' })
    }
    return Categories
}