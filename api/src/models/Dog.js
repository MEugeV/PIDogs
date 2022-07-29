const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        nameValidation(value) {
          if(!(/^[A-Z áéíóúüñ]+$/i.test(value))) {
            throw new Error ("The name of the breed must not contain numbers or special characters")
          }
        }
      }
    },
    image: {
      type: DataTypes.TEXT,
      validate: {
        // isUrl: true
        isUrlorImg(value) {
          { if(!(/^((ftp|http|https):\/\/)?([A-z-]+)\.([A-z]{2,})/.test(value) || /^data:image\/jpeg;/.test(value) )) {throw new Error ("The link must be an URL o ar jpeg data:image")}}
        } // || /[\t\h]+|(^$)/.test(value)  ya no hace falta porque lo envio en el post, pero porque desisti del default value aquí? xq toma que el valor es null. va default value si no le envio directamente el campo...
      },
      // defaultValue: "https://thumbs.dreamstime.com/b/perro-del-signo-de-interrogaci%C3%B3n-104207739.jpg"
    },
    min_height: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 15
      } 

    },
    max_height: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
        max: 105,
        isGreaterTanMinHeight(value) { if(parseInt(value) <= parseInt(this.min_height)) {throw new Error ("max_height should be greater than min_height")}} //parseFloat(value)>parseFloat(this.min_height) this.getDataValue()
    }},
    min_weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
        // notContains: ',',
        min: 0.17
      } 
    },
    max_weight: {  
      //me deja null el valor si escribo un caracter o una letra..... aunque valide que no sea nulo lo deja nulo..
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
        // notContains: ',',
        max: 150,
        isGreaterThanMinWeight(value) {if(parseInt(value)<=parseInt(this.min_weight)) throw new Error("max_weight should be greater than min_weight")}
    }
    },
    life_span: {
      type: DataTypes.STRING,
      validate: {
        // is:/^[0-9]{1,4}(-[0-9]{1,4})?$/ || /[\t\h]+|(^$)/,
        isNumberOrRange(value) {
          { if(!(/^[0-9]{1,4}(-[0-9]{1,4})?$/.test(value) || /[\t\h]+|(^$)/.test(value) )) {throw new Error ("Enter the years of life span, or the range of years of life span.")}}
        },
        minValue(value){if(value.split("-")[0]<5 && "">0) throw new Error("Minimum life span should be greater than 4 years old")}, //agrego mayor que cero para que no me tome que "" es menor que 5
        maxValue(value){if((value.split("-")[1] || value.split("-")[0] )> 20) throw new Error("Maximum life span should be smaller than 21 years old")},
        maxGreaterThanMin(value){if(parseInt(value.split("-")[1])<=parseInt(value.split("-")[0])) throw new Error("Maximum life span should be greater than minimun life span")},

      },
      // set(value){this.setDataValue("life_span", value +" years")}
    }
  },
  {timestamps: false});
};
