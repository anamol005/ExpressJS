import express from 'express';
import {body} from 'express-validator';

import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/error-handlers.js';

import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('email')
      .trim()
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email must be valid'),
    body('username')
      .trim()
      .notEmpty()
      .withMessage('username is required')
      .isLength({min: 3, max: 20})
      .withMessage('username must be 3-20 characters')
      .isAlphanumeric()
      .withMessage('username must contain only letters and numbers'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('password is required')
      .isLength({min: 8})
      .withMessage('password must be at least 8 characters'),
    validationErrors,
    postUser
  );

userRouter
  .route('/:id')
  .get(getUserById)
  .put(
    authenticateToken,
    body('name')
      .optional()
      .trim()
      .isLength({min: 2, max: 50})
      .withMessage('name must be 2-50 characters'),
    body('username')
      .optional()
      .trim()
      .isLength({min: 3, max: 20})
      .withMessage('username must be 3-20 characters')
      .isAlphanumeric()
      .withMessage('username must contain only letters and numbers'),
    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('email must be valid'),
    body('password')
      .optional()
      .trim()
      .isLength({min: 8})
      .withMessage('password must be at least 8 characters'),
    body('role')
      .optional()
      .trim()
      .isIn(['user', 'admin'])
      .withMessage('role must be user or admin'),
    validationErrors,
    putUser
  )
  .delete(authenticateToken, deleteUser);

export default userRouter;
