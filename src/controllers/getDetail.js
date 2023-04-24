var axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds/'
require('dotenv').config();
const {
    x_api_key
  } = process.env;


const getDetailAPI = async (idRaza) =>{
   
    
    try {
       
        const {data} = await axios.get(`${URL}${idRaza}?api_key=${x_api_key}`)
        const obj = filterDataAPI(data)
        
        return obj
        
    } catch (error) {
        return ({message: error});
    }
}




const { Dog } = require("../db");

const getDetailBD= async (idRaza) => {

    
    try {
        
        const data = await Dog.findOne({ where: { id: idRaza}});
        return data
        
    } catch (error) {
        return({ message: error });
    }
};


const getDetail = async (req, res)=>{
    const { idRaza } = req.params;
    try {
        if(idRaza.length>6){
            const objeto = await getDetailBD(idRaza)
            res.status(200).json(objeto)
        }else{
            const objeto2 = await getDetailAPI(idRaza)
         
            res.status(200).json(objeto2)
        }


    } catch (error) {
        res.status(500).json({ message: error });
    }
}

function filterDataAPI (data){
    let url;
    if (data.reference_image_id) {
      url = `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`;
    }

    return {
      id: data.id,
      ...(url && { image: url }),
      name: data.name,
      temperament: data.temperament,
      height: data.height.metric,
      weight: data.weight.metric,
      life_span: data.life_span,
      bread_for: data.bread_for,
      bread_group: data.bread_group,
      origin: data.origin,
      
    };
  
        
}


module.exports = {getDetail, getDetailBD}