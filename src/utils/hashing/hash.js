import bcrypt from "bcrypt";

const hash = async (plain) => {
    return await bcrypt.hash(plain, parseInt(process.env.SALT));
}
const compareHash = async (plain, hashed) => {
    return await bcrypt.compare(plain, hashed);
}
export {
    hash,
    compareHash
}