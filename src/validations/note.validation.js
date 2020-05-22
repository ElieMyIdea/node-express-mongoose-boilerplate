const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createNote = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getNotes = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    isEnabled: Joi.boolean(),
    isFavorite: Joi.boolean(),
  }),
};

const getNote = {
  params: Joi.object().keys({
    noteId: Joi.string().custom(objectId),
  }),
};

// TODO: Add a toggleFavorite / toggleActivation ?
const updateNote = {
  params: Joi.object().keys({
    noteId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      isEnabled: Joi.boolean(),
      isFavorite: Joi.boolean(),
    })
    .min(1),
};

const deleteNote = {
  params: Joi.object().keys({
    noteId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
