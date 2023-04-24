var axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds'
require('dotenv').config();
const {
    x_api_key
  } = process.env;

  const { Temperament} = require('../db.js');
const getTemperaments = async (req,res) =>{
 

    try {
        
        const {data} = await axios.get(`${URL}?${x_api_key}`)
    

        const arrayObjs = await filterData(data);
        const temperamentosPerros =  obtenerTemperamentos(arrayObjs);

 
         temperamentosPerros.forEach(async (temperamento) => {
            await Temperament.findOrCreate({ where: {name: temperamento} });
              });
            const TemperamentosBD = await Temperament.findAll()
            res.status(200).json(TemperamentosBD)
      
            
      } catch (error) {
        res.status(500).json({message: error});
    }
}

function filterData (data){
  
    const temperamentos = data.map(perro=> {return {temperament: perro.temperament, id: perro.id }})
    return temperamentos
}

function obtenerTemperamentos(arrayObjs) {
    let temperamentos = []
    
        arrayObjs.forEach(element => {if(element.temperament !== undefined){
            const temperamentosSeparados = element.temperament.split(",")
            temperamentosSeparados.forEach(temperamento => {
                if (!temperamentos.includes(temperamento)) {
                    temperamentos.push(temperamento);
                }
            });
        }
        }
        );

       
    respuesta = temperamentos.map(temp => temp.trim());
    

       
        return respuesta

    }
  
  
  

  



module.exports = { getTemperaments }