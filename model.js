import { Schema , model } from "mongoose"

const baladeSchema = new Schema({
    model : String ,
    jour : Number ,
    concerné : {
        prenom : String ,
        nom : String ,
    }


const balade = model("balade", baladeSchema) ;

export { balade } ;