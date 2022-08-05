const photo="https://media.istockphoto.com/vectors/cartoon-dog-happy-head-face-silhouette-cute-pooch-character-kawaii-vector-id1055461378?b=1&k=20&m=1055461378&s=170667a&w=0&h=B_CPOp6vXDzAcusxwMzzpqijesUmjtbZU1dbiyGLTzY="

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
      },
      set (value) {
          this.setDataValue("name",value.split(" ").map(el=>el.slice(0,1).toUpperCase()+el.slice(1).toLowerCase()).join(" "))
        }
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: photo,
      validate: {
        isUrlorImg(value) {
          { if(!(/^((ftp|http|https):\/\/)?([A-z-]+)\.([A-z]{2,})/.test(value) || /^data:image\/jpeg;/.test(value) )) {throw new Error ("The link must be an URL o ar jpeg data:image")}}
        } 
      },
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumberOrRange(value) {
          { if(!(/^[0-9.]{1,4}-[0-9.]{1,4}?$/.test(value))) {throw new Error ("Enter the weight range (kgs).")}}
        },
        minWeightValue(value){if(value.split("-")[0]<0.17) throw new Error("Minimum weight should be greater or equal to 0.17 kgs")}, //agrego mayor que cero para que no me tome que "" es menor que 5
        maxWeightValue(value){if((value.split("-")[1] || value.split("-")[0] )> 150) throw new Error("Maximum weigth should be smaller or equal to 150 kgs")},
        maxWeightGreaterThanMin(value){if(parseFloat(value.split("-")[1])<=parseFloat(value.split("-")[0])) throw new Error(`Maximum weight should be greater than minimun weight`)},

      },
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumberOrRange(value) {
          { if(!(/^[0-9.]{1,4}-[0-9.]{1,4}?$/.test(value))) {throw new Error ("Enter the height range (cms)")}}
        },
        minHeightValue(value){if(value.split("-")[0]<15) throw new Error("Minimum height should be greater or equal to 15 cms")},
        maxHeightValue(value){if((value.split("-")[1] || value.split("-")[0] )> 105) throw new Error("Maximum height should be smaller or equal to 105 cms")},
        maxHeightGreaterThanMin(value){if(parseFloat(value.split("-")[1])<=parseFloat(value.split("-")[0])) throw new Error(`Maximum height should be greater than minimun height`)},

      },
    },
    life_span: {
      type: DataTypes.STRING,
      validate: {
        isNumberOrRange(value) {
          { if(!(/^[0-9.]{1,4}(-[0-9.]{1,4})?$/.test(value) || /[\t\h]+|(^$)/.test(value) )) {throw new Error ("Enter the range of life span (years) or the years of life span")}}
        },
        minValue(value){if(value.split("-")[0]<5) throw new Error("Minimum life span should be greater or equal to 5 years old")},
        maxValue(value){if((value.split("-")[1] || value.split("-")[0] )> 20) throw new Error("Maximum life span should be smaller or equal to 20 years old")},
        maxLifeSpanGreaterThanMin(value){if(parseFloat(value.split("-")[1])<=parseFloat(value.split("-")[0])) throw new Error(`Maximum life span should be greater than minimun life span`)},

      },
    }
  },
  {timestamps: false});
};


    // min_height: {
    //   type: DataTypes.FLOAT,
    //   allowNull: false,
    //   validate: {
    //     isNumeric: true,
    //     min: 15
    //   } 

    // },
    // max_height: {
    //   type: DataTypes.FLOAT,
    //   allowNull: false,
    //   validate: {
    //     isNumeric: true,
    //     max: 105,
    //     isGreaterTanMinHeight(value) { if(parseInt(value) <= parseInt(this.min_height)) {throw new Error ("max_height should be greater than min_height")}} //parseFloat(value)>parseFloat(this.min_height) this.getDataValue()
    // }},
    // min_weight: {
    //   type: DataTypes.FLOAT,
    //   allowNull: false,
    //   validate: {
    //     isNumeric: true,
    //     // notContains: ',',
    //     min: 0.17
    //   } 
    // },
    // max_weight: {  
    //   //me deja null el valor si escribo un caracter o una letra..... aunque valide que no sea nulo lo deja nulo..
    //   type: DataTypes.FLOAT,
    //   allowNull: false,
    //   validate: {
    //     isNumeric: true,
    //     // notContains: ',',
    //     max: 150,
    //     isGreaterThanMinWeight(value) {if(parseInt(value)<=parseInt(this.min_weight)) throw new Error("max_weight should be greater than min_weight")}
    // }
    // },