import bcrypt from "bcrypt";

export default {
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  },
};
