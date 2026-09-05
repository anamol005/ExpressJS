import {listAllUsers, findUserById, addUser} from '../models/user-model.js';

const getUsers = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const user = addUser(req.body);

  res.status(201);
  res.json(user);
};

const putUser = (req, res) => {
  res.json({message: 'User item updated.'});
};

const deleteUser = (req, res) => {
  res.json({message: 'User item deleted.'});
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
