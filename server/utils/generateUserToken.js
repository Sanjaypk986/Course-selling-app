import jwt from 'jsonwebtoken'
export const generateUserToken = (email)=>{
    const token = jwt.sign({ email:email, role:'user' }, process.env.JWT_KEY ); //role is used to identify
    return token;
}