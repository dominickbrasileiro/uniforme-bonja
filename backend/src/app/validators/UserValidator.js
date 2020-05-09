const { celebrate, Joi, Segments } = require('celebrate');

const ENROLLMENT_REGEX = /(^20[0, 1][0-9]+)|(^2020[0-9]+)/;
const CLASS_REGEX = /3[A,B,C]/;

module.exports = {
  store: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      enrollment: Joi.string().required().length(8).regex(ENROLLMENT_REGEX),
      group: Joi.string().required().length(2).regex(CLASS_REGEX),
    }),
  }),
};
