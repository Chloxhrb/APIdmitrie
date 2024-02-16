const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config(); //dans ce fichier on utilise les variable de fichier.env

const app = express(); // la constante app est notre serveur

const PORT = process.env.PORT; // va prendre le port choisus dans le .env

// bodyparser : dit a notre serveur que toute les données utilisé sont des donnée type json
// Cors : Protocole de browser, va verifier et dire a l'utilisteur que notre site est safe ( le ptit cadenas)

app.use(express.urlencoded({extended: true})) // permet a postman d'envoyer des donné sur notre serveur
app.use(express.json()); //va utiliser Bodyparser
app.use(cors()); // va utiliser CORS
mongoose.connect("mongodb://127.0.0.1:27017/valorant"); // Va utiliser le CONNECTION dans .env

const agentrouter = require("./routes/agentRouter");
const abilityrouter = require("./routes/abilityRouter"); //importer nos routes
const userRouter = require("./routes/userRouter");
const auth = require("./middlewares/auth");

app.get("/", (req, res) => {
  res.send("Welcome to Valorant API !! ");
}); // envoie un msg sur la page

app.use("/agent", auth, agentrouter);
app.use("/ability", abilityrouter); // utilise nos routes importer plus haut
app.use("/auth", userRouter)

app.listen(PORT, () => console.log(`Serveur en ecoute sur le PORT ${PORT}`));
// va utiliser le port choisis dans le .env
