const bcrypt = require('bcrypt')
module.exports = (sequelize, dataTypes) => {
    const Users = sequelize.define('Users', {
        name: dataTypes.STRING,
        email: dataTypes.STRING,
        password_hash: dataTypes.STRING,
        password: dataTypes.VIRTUAL,
    }, {
        hooks: {
            beforeSave: async function (user) {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10)
                    user.password_hash = await bcrypt.hash(user.password, salt)
                }
            }
        }
    })
    Users.associate = function(models){
        Users.hasMany(models.Articles)
    }

    Users.prototype.checkPassword =  function(password){
        return  bcrypt.compare(password,this.password_hash) 
    }
    return Users
}