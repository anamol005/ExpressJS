import {addCat, findCatById, listAllCats} from '../models/cat-model.js';

const getCat = (req, res) => {
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
  console.log('Form data:', req.body);
  console.log('Uploaded file:', req.file);

  if (!req.file) {
    res.status(400).json({message: 'Cat image is required.'});
    return;
  }

  const cat = {
    ...req.body,
    filename: req.file.filename,
  };

  const result = addCat(cat);

  res.status(201).json({
    message: 'New cat added.',
    result,
  });
};

const putCat = (req, res) => {
  res.json({message: 'Cat item updated.'});
};

const deleteCat = (req, res) => {
  res.json({message: 'Cat item deleted.'});
};

export {getCat, getCatById, postCat, putCat, deleteCat};
