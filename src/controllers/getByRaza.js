const axios = require('axios');
const { Op } = require('sequelize');
const { Dog } = require('../db');

require('dotenv').config();
const { x_api_key } = process.env;
const URL = 'https://api.thedogapi.com/v1/breeds/search?q=';

const getByRaza = async (req, res) => {
  const { name } = req.query;

  try {
    const arry1 = await getByRazaAPI(name);
    const arry2 = await getByRazaBD(name);
    const respuesta = arry1.concat(arry2);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(500).json({ message: 'No se encontraron coincidencias con esa raza' });
  }
};

const getByRazaAPI = async (name) => {
  try {
    const { data } = await axios.get(`${URL}${name}&api_key=${x_api_key}`);
    const objs = filterDataAPI(data);
    return objs;
  } catch (error) {
    return { message: error };
  }
};

const getByRazaBD = async (name) => {
  try {
    const data = await Dog.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    if (data) {
      return data;
    }
  } catch (error) {
    return { message: error.message };
  }
};

function filterDataAPI(data) {
  const arrayAPI = data.map((perro) => {
    let url;
    if (perro.reference_image_id) {
      url = `https://cdn2.thedogapi.com/images/${perro.reference_image_id}.jpg`;
    }

    return {
      id: perro.id,
      ...(url && { image: url }),
      name: perro.name,
      temperament: perro.temperament ? perro.temperament.split(", ") : perro.temperament,
      height: perro.height.metric,
      weight: perro.weight.metric,
      life_span: perro.life_span,
      bread_for: perro.bread_for,
      bread_group: perro.bread_group,
      origin: perro.origin,
    };
  });

  return arrayAPI;
}

module.exports = { getByRaza };
