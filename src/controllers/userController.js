const User = require("../models/userModel");
const bcrypt = require("bcrypt"); // bcrypt va transformer le mdp de l'user en mdp haché dans la base de donné
const jwt = require("jsonwebtoken"); // jsonwebtoken va stocké toute les info de l'user et va le stocker dans le local storage
const dotenv = require("dotenv");


dotenv.config(); //dans ce fichier on utilise les variable de fichier.env

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // bcrypt va hacher le pwd et 10 est le niveau le plus elever pour hacher le password
    const user = new User({
      userName: req.body.userName,
      password: hashedPassword,
    }); // on dit que le user a besoin du username et du password
    await user.save(); // attend que l'user soit bien creer et ensuite le sauvegarde ds la base de donnée
    res.json(user); // envoie un msg qui dis que c'est bien creer
} catch (error) {
    res.status(500).send(error.message);
  }
};
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName }); //va cherhcer le userName dans les infos qui sont envoyer par une requete
    if (!user) return res.status(404).send("User not found"); // va envoyer un user not find si le user est pas das la base de donnée

    const validpassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); //xompare est une methode de bcrypt qui va comparer le passeword entré par l'user avec celui enregistrer dans la base de donné
    if (!validpassword) return res.status(400).send ("Invalid password"); // va doner un mod inconrrect si le user se trompe dans son password

    const token = jwt.sign({user}, process.env.SECRET_KEY) // le token stock les info du user, on lui dis qu'on a l'obj de user, va crypter l'objet user et on a besoin du secretkey pr le decrypter
    res.json({token}); // { } car c'est un objet
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { registerUser, loginUser };
