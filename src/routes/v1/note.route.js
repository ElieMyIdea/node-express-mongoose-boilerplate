const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const noteValidation = require('../../validations/note.validation');
const noteController = require('../../controllers/note.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(noteValidation.createNote), noteController.createNote)
  // .post(auth('manageNotes'), validate(noteValidation.createNote), noteController.createNote)
  .get(validate(noteValidation.getNotes), noteController.getNotes);

router
  .route('/:noteId')
  .get(validate(noteValidation.getNote), noteController.getNote)
  .patch(validate(noteValidation.updateNote), noteController.updateNote)
  .delete(validate(noteValidation.deleteNote), noteController.deleteNote);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management and retrieval
 */

/**
 * @swagger
 * path:
 *  /notes:
 *    post:
 *      summary: Create a note
 *      description: Anyone can create notes.
 *      tags: [Notes]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - description
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *              example:
 *                title: Sample note
 *                description: My sample note description
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Note'
 *    get:
 *      summary: Get all notes
 *      description: Anyone can retrieve all notes.
 *      tags: [Notes]
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Note'
 */

/**
 * @swagger
 * path:
 *  /notes/{id}:
 *    get:
 *      summary: Get a note
 *      description: Anyone can fetch a note.
 *      tags: [Notes]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Note id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Note'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a note
 *      description: Anyone can update a note.
 *      tags: [Notes]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Note id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *              example:
 *                title: My new note name
 *                description: My updated note description
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Note'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a note
 *      description: Anyone can delete a note.
 *      tags: [Notes]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Note id
 *      responses:
 *        "200":
 *          description: No content
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
