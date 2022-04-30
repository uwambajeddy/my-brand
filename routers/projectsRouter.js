import express from 'express';
import { protect, restrictedTo } from '../controllers/authController.js';
import {
  getProjects,
  createProject,
  getProject,
  deleteProject,
  updateProject,
  resizeProjectPhoto,
  uploadProjectImage
} from '../controllers/projectsController.js';

const router = express.Router();

router
  .route('/:id')
  .get(getProject)
  .patch(protect, restrictedTo('admin'), uploadProjectImage, resizeProjectPhoto, updateProject)
  .delete(protect, restrictedTo('admin'), deleteProject);

router
  .route('/')
  .get(getProjects)
  .post(protect, restrictedTo('admin'), uploadProjectImage, resizeProjectPhoto, createProject);

/**
 * @swagger
 * /api/v1/projects:
 *  get:
 *    summary: Use to request all projects
 *    tags:
 *      - projects
 *    responses:
 *      '200':
 *        description: The All projects description
 *
 * @swagger
 * /api/v1/projects:
 *    post:
 *      summary: Use to create a project
 *      consumes:
 *        - multipart/form-data
 *      tags:
 *         - projects
 *      parameters:
 *        - name: image
 *          in: formData
 *          description: Project image
 *          required: true
 *          type: file
 *        - name: title
 *          in: formData
 *          description: Project title
 *          required: true
 *          type: string
 *        - name: link
 *          in: formData
 *          description: Project link
 *          required: true
 *          type: string
 *      responses:
 *        '201':
 *          description: Successfully created project
 *
 * @swagger
 * /api/v1/projects/{id}:
 *    get:
 *      summary: Use to return a project by id
 *      tags:
 *         - projects
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  This is the project id
 *          required: true
 *      responses:
 *        '200':
 *          description: The project description with id
 *          content:
 *             application/json
 * 
 * @swagger
 * /api/v1/projects/{id}:
 *    patch:
 *      summary: Use to update a project
 *      tags:
 *         - projects
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: path
 *          name: id
 *          description:  This is the project id
 *          required: true
 *        - name: image
 *          in: formData
 *          description: Project image
 *          required: true
 *          type: file
 *        - name: title
 *          in: formData
 *          description: Project title
 *          required: true
 *          type: string
 *        - name: link
 *          in: formData
 *          description: Project link
 *          required: true
 *          type: string
 *      responses:
 *        '200':
 *               description: Successfully updated project
 *
 * @swagger
 * /api/v1/projects/{id}:
 *    delete:
 *      summary: Use to delete a project
 *      tags:
 *         - projects
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Use to delete a project with id
 *          required:
 *               -id
 *          schema:
 *               type: string
 *      responses:
 *        '204':
 *               description: Successfully deleted project
 */

export default router;
