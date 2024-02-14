const Agent = require("../models/agentModel"); // lui donner le chemin du schema
const Ability = require("../models/abilityModel"); // chemin ability

const CreateAgent = async (req, res) => {
  try {
    const { nomAgent, descriptionAgent, abilite, imageAgent } = req.body; // const destructuré

    const agent = new Agent({nomAgent, descriptionAgent, abilite, imageAgent}); // pour creer un nouvel agent
    await agent.save(); //Attend la fin de la creation de l'agent pour le sauvegarder
  } catch (error) {
    res.status(500).send(error.message); //s'il arrive pas a creer l'agent il enverra l'erreur 500 avce un msg d'erreur qui est deja definit
  }
}; // function asymc avec Les 2 parametre req et res obligatoirement

// mon controller va TRY de faire quelque chose si ca marche pas il va Catch l'erreur

const getallagents = async (req, res) => {
  try {
    const agents = await Agent.find().populate("Ability"); // va chercher les agents et va renvoyer les agents qui sont dans la base de données
    res.json(agents);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { CreateAgent, getallagents };
