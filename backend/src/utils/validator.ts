import Joi from "joi";

const validator =
  <T>(schema: Joi.ObjectSchema<T>) =>
  (payload: T) => {
    return schema.validate(payload, { abortEarly: false });
  };

export { validator };
