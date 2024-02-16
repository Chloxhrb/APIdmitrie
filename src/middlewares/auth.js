const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config() ;

//bearer est juste le type de token 
const verifyToken = ( req, res, next ) => {
    tokenHeader = req.headers.authorization
    if (!tokenHeader) {
        return res.status(401).json({message: "accès non authoriser(token manquant)"}) //401 : il n'a pas de token !
    }
    const token = tokenHeader.split(" ")[1] // avec split on divise le notre toker qui est " bearer : jszhdsheffgehhef" nous on veut juste le token "feifeufe" donc on le divise et on met [1] pour dire quel partie on veut recuperer, si on voulais le bearer on aurait mis [0]

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY) // va verifier le token sans le bearer ET on va comparer notre token decoder avec notre secret key ( comme avec le user dans userController)
        req.user = decoded.user // on dis qu'on a un object user et ca sera l'objet user decoder
        next(); // dans index.js on a dis que pour avoir acces aux agents il faut etre authentifier, et next va donner acces a la page agent au user authentifier
    } catch(error){
        console.error("JWT verification failed", error);
        res.status(401).json({message :"token invalid ! "})
    }
}; 

module.exports = verifyToken ;