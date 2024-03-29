// const sequelize = require("sequelize")
const  {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define ("temperament", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true,      
            allowNull: false,
              },
        name: {
            type: DataTypes.STRING,   
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        }
    },
    {timestamps: false}
    )
}
 