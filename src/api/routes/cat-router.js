import express from 'express';
import {body} from 'express-validator';

import {upload, createThumbnail} from '../../middlewares/upload.js';
import {authenticateToken} from '../../middlewares/authentication.js';
import {validationErrors} from '../../middlewares/error-handlers.js';

import {
  getCat,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter
  .route('/')
  .get(getCat)
  .post(
    upload.single('cat'),
    body('cat_name')
      .trim()
      .notEmpty()
      .withMessage('cat name is required')
      .isLength({min: 3, max: 50})
      .withMessage('cat name must be 3-50 characters'),
    body('weight')
      .notEmpty()
      .withMessage('weight is required')
      .isFloat()
      .withMessage('weight must be a number'),
    body('owner')
      .notEmpty()
      .withMessage('owner is required')
      .isInt()
      .withMessage('owner must be an integer'),
    body('birthdate')
      .notEmpty()
      .withMessage('birthdate is required')
      .isDate()
      .withMessage('birthdate must be a valid date'),
    validationErrors,
    createThumbnail,
    postCat
  );

catRouter.route('/user/:id').get(getCatsByUserId);

catRouter
  .route('/:id')
  .get(getCatById)
  .put(
    authenticateToken,
    body('cat_name')
      .optional()
      .trim()
      .isLength({min: 3, max: 50})
      .withMessage('cat name must be 3-50 characters'),
    body('weight').optional().isFloat().withMessage('weight must be a number'),
    body('owner').optional().isInt().withMessage('owner must be an integer'),
    body('birthdate')
      .optional()
      .isDate()
      .withMessage('birthdate must be a valid date'),
    validationErrors,
    putCat
  )
  .delete(authenticateToken, deleteCat);

export default catRouter;
