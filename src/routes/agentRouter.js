const express = require("express");
const router = express.Router(); // express contients deja les router
const { CreateAgent, getallagents } = require("../controllers/agentController");

// post = creer - get = voir - put = modifier - delete = supprimer
router.post("/createagent", CreateAgent); // pas de maj dans l'url
router.get("/all", getallagents); //je dis a mon api d'afficher tout mes agent de ma base de donnée quand on va sur localhost:2110/agent/all

module.exports = router;
