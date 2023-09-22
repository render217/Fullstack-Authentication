import * as yup from "yup";

/**
 * @param {yup.Schema} schema
 * */
const validator = async (schema, data) => {
  let errors = [];
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (err) {
    if (err.name === "ValidationError") {
      errors = [...err.errors];
    }
  }
  return { errors };
};

export default validator;
