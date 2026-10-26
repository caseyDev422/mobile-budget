import * as bcrypt from "bcrypt";

const checkPassword = async (userInputPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(userInputPassword, hashedPassword);
}

export default checkPassword;