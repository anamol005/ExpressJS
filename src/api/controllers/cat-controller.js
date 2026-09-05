import {listAllCats, findCatById, addCat} from '../models/cat-model.js';

const getCats = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);

  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  const cat = addCat(req.body);

  res.status(201);
  res.json(cat);
};

const putCat = (req, res) => {
  res.json({message: 'Cat item updated.'});
};

const deleteCat = (req, res) => {
  res.json({message: 'Cat item deleted.'});
};

export {getCats, getCatById, postCat, putCat, deleteCat};
