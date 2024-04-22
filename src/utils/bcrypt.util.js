import bcrypt from "bcrypt";
const saltRounds = 10;

export const encryptPassword = async (plainPassword) => {
  try {
    const hashPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashPassword;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const comparePassword = async (hashPassword, plainPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashPassword);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
