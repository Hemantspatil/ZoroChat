import jwt from 'jsonwebtoken'

export const generateToken = async(userId, res) =>{

const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: "7d"
})

res.cookie("jwt", token, {
    maxAge: 7 *24 *60*60 * 1000,
    httpOnly : true, //prevent attacks xss or something research
    sameSite: "strict", //prevent attacks
    secure: process.env.NODE_ENV != 'development'
});

return token;

}