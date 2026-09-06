import {
  addCat,
  findCatById,
  findCatsByUserId,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  const cats = await listAllCats();
  res.json(cats);
};

const getCatById = async (req, res, next) => {
  const cat = await findCatById(req.params.id);

  if (!cat) {
    const error = new Error('Cat not found');
    error.status = 404;
    next(error);
    return;
  }

  res.json(cat);
};

const getCatsByUserId = async (req, res) => {
  const cats = await findCatsByUserId(req.params.id);
  res.json(cats);
};

const postCat = async (req, res, next) => {
  console.log('Form data:', req.body);
  console.log('Uploaded file:', req.file);

  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    next(error);
    return;
  }

  const cat = {
    ...req.body,
    filename: req.file.filename,
  };

  const result = await addCat(cat);

  if (!result) {
    const error = new Error('Unable to add cat');
    error.status = 400;
    next(error);
    return;
  }

  res.status(201).json({
    message: 'New cat added.',
    result,
  });
};

const putCat = async (req, res, next) => {
  const result = await modifyCat(req.body, req.params.id, res.locals.user);

  if (!result) {
    const error = new Error('Forbidden');
    error.status = 403;
    next(error);
    return;
  }

  res.json({message: 'Cat item updated.'});
};

const deleteCat = async (req, res, next) => {
  const result = await removeCat(req.params.id, res.locals.user);

  if (!result) {
    const error = new Error('Forbidden');
    error.status = 403;
    next(error);
    return;
  }

  res.json({message: 'Cat item deleted.'});
};

export {getCat, getCatById, getCatsByUserId, postCat, putCat, deleteCat};
