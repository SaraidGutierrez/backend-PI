var axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds'
require('dotenv').config();
const { Dog } = require('../db');
const {
    x_api_key
  } = process.env;




  const getAllDogs = async (req, res) => {
    try {
        
      const arry1 = await getAllDogsAPI();
      const arry2 = await getAllDogsBD();
     
   

      const respuesta = arry1.concat(arry2);
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(500).json( error.message );
    }
  };

const getAllDogsAPI = async (req,res) =>{
    try {
       
        const {data} = await axios.get(`${URL}?${x_api_key}`)
        
       
        const obj = filterDataAPI(data)
        return obj
    } catch (error) {
        return error.message
    }
}

const getAllDogsBD = async () => {
    try {
      const data = await Dog.findAll({raw:true});
      
      if (data) {
        return data;
      }
    } catch (error) {
      return { message: error.message };
    }
  };

function filterDataAPI (data){
    
    

    let arrayAPI = data.map(perro=> {return {
        id: perro.id, 
        name: perro.name, 
        image: perro.image.url, 
        temperament: perro.temperament ? perro.temperament.split(", ") : perro.temperament,
        height: perro.height.metric,
        weight : perro.weight.metric,
        life_span: perro.life_span}})


    return arrayAPI
}


module.exports = {getAllDogs}



