'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('Categories',{
     id:{
       type: Sequelize.INTEGER,
       allowNull:false,
       primaryKey:true,
       autoIncrement:true,
     },
     name:{
       type: Sequelize.STRING,
       allowNull:false,
     },
     parent_id:{
       type: Sequelize.INTEGER,
      
       references:{
         model: 'Categories',
         key: 'id'
       }
     },
     createdAt:{
      type: Sequelize.DATE
     },
     updatedAt:{
       type: Sequelize.DATE
     }

   })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Categories')
  }
};
