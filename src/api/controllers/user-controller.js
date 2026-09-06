import bcrypt from 'bcrypt';

import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getUsers = async (req, res) => {
  const users = await listAllUsers();
  res.json(users);
};

const getUserById = async (req, res, next) => {
  const user = await findUserById(req.params.id);

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    next(error);
    return;
  }

  res.json(user);
};

const postUser = async (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);

  const result = await addUser(req.body);

  if (!result) {
    const error = new Error('Unable to add user');
    error.status = 400;
    next(error);
    return;
  }

  res.status(201).json({
    message: 'New user added.',
    result,
  });
};

const putUser = async (req, res, next) => {
  const loggedInUser = res.locals.user;

  if (
    loggedInUser.role !== 'admin' &&
    loggedInUser.user_id !== Number(req.params.id)
  ) {
    const error = new Error('Forbidden');
    error.status = 403;
    next(error);
    return;
  }

  if (loggedInUser.role !== 'admin') {
    delete req.body.role;
  }

  const result = await modifyUser(req.body, req.params.id);

  if (!result) {
    const error = new Error('User not found');
    error.status = 404;
    next(error);
    return;
  }

  res.json({message: 'User item updated.'});
};

const deleteUser = async (req, res, next) => {
  const loggedInUser = res.locals.user;

  if (
    loggedInUser.role !== 'admin' &&
    loggedInUser.user_id !== Number(req.params.id)
  ) {
    const error = new Error('Forbidden');
    error.status = 403;
    next(error);
    return;
  }

  const result = await removeUser(req.params.id);

  if (!result) {
    const error = new Error('User not found');
    error.status = 404;
    next(error);
    return;
  }

  res.json({message: 'User item deleted.'});
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
