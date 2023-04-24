const {Dog} = require('../db')

const postDog = async (req,res) => {
    const { image, name, height, weight, temperament, life_span } = req.body

  try {
     
       if(image && name && height && weight && temperament && life_span ){
           const [dog, created] = await Dog.findOrCreate({
               where: { name: name },
               defaults: {
                   
                   image: image,
                   height: height,
                   weight: weight, 
                   temperament: temperament,
                   life_span: life_span,
                }
            });
         
      if(created){
            res.status(200).json(dog)
      }else{
            res.status(200).json('Una raza de perro con ese nombre ya existe')
      }
       } else{

           res.status(400).json('Los datos son insuficientes')
       }
    
       
    } catch (error) {
        res.status(500).json({error});
    }
}


module.exports = {
    postDog
}