
import { customAlphabet } from 'nanoid'
export const generateCode = (length = 4)=>{
    const nanoid = customAlphabet('1234567890abcdef', 5)();
    return nanoid;
}
