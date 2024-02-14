const mongoose = require('mongoose'); // dire qu'on utilise mongoose 
const agentSchema = new mongoose.Schema ({
    nomAgent : String ,
    descriptionAgent : String ,
    abilite : [{type : mongoose.Schema.Types.ObjectId, ref : "Ability"}] , //array d'abilité qui sont des id de nos abilités
    imageAgent : String // image = String(url)

})// dire qu'on cree un schema de mongodb

module.exports = mongoose.model ("Agent", agentSchema)

//si je veux creer un autre schema pour arme je devrai faire dans un autre ficher dans models 