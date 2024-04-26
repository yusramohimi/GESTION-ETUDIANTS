class Stagiaire{
    constructor(code, nom, note, filiere,groupe,matiere){
        this.code = code,
        this.nom = nom,
        this.note = note,
        this.filiere = filiere,
        this.groupe = groupe,
        this.matiere = matiere

    }
}



// declaration 
let stagiaires = []

const stagiaire1 = new Stagiaire(2,"Mohimi",8,"tdm","DD105",["POO"])
const stagiaire2 = new Stagiaire(3,"Mohimi2",17,"tdm","DD104",["JAVASCRIPT","POO"])
const stagiaire3 = new Stagiaire(4,"Mohimi3",6,"tdi","DD105",["PHP","POO","JAVASCRIPT"])
const stagiaire4 = new Stagiaire(5,"Mohimi4",18,"tri","DD106",["POO"])
stagiaires.push(stagiaire1)
stagiaires.push(stagiaire2)
stagiaires.push(stagiaire3)
stagiaires.push(stagiaire4)


const form = document.getElementById("form");
const code = document.getElementById("id");
const nom = document.getElementById("nom");
const note = document.getElementById("note");
const groupe = document.getElementById("groupe");

let indice_stagiaire_selectionner ;


// events 

document.getElementById("ajouter").addEventListener('click',ajouter)
document.getElementById("save").addEventListener('click',enregistrer)

// functions

function ajouter(e){
    e.preventDefault();
    let valider = validation()
    if(valider == true){
        let filiere =  document.querySelector("input[name='filiere']:checked");

        let matieres = []
        let matiere =  document.querySelectorAll("input[name='matiere']:checked");
        console.log(matiere.length)
        for (let i = 0 ; i < matiere.length ; i++){
            matieres.push(matiere[i].value)
        }


        let stagiaire = new Stagiaire(code.value, nom.value, note.value, filiere.value,groupe.value,matieres)
        stagiaires.push(stagiaire)
        console.log(stagiaires)

        //appel de la fonction afficher_data 
        afficher_data()
    }
    
}




//fonction pour la validation en js sachant que les champs id nom et note sont obligatoire
function validation(){
    let valid = true;
    if(code.value.trim() === ""){
        document.getElementById("id-error").textContent = "Le champ ID est obligatoire !"
        valid = false
    }else{
        document.getElementById("id-error").textContent = ""
    }

    if(nom.value.trim() === ""){
        document.getElementById("nom-error").textContent = "Le champ NOM est obligatoire !"
        valid = false
    }else{
        document.getElementById("nom-error").textContent = ""
    }

    if(note.value.trim() ===""){
        document.getElementById("note-error").textContent = "Le champ NOTE est obligatoire !"
        valid = false
    }else{
        document.getElementById("note-error").textContent = ""
    }

    return valid
}



function afficher_data(){
    let content = ""
    for(let i = 0 ; i < stagiaires.length ; i++){
        let decision = "";
        let redoublant_class ="";
        if (stagiaires[i].note >= 14){
            decision = " Admis (Bien)"
            redoublant_class = "admis-bien"
        }else if (stagiaires[i].note > 10 && stagiaires[i].note < 14){
            decision = " Admis"
        }else if (stagiaires[i].note < 10){
            decision = "Redoublant"
            redoublant_class = "redoublant"
        }
        content +=
        `<tr>
            <th>${stagiaires[i].code}</th>
            <td class="${redoublant_class}"> ${stagiaires[i].nom}</td>
            <td>${stagiaires[i].note}</td>
            <td>${stagiaires[i].filiere}</td>
            <th>${stagiaires[i].groupe}</th>
            <th>${stagiaires[i].matiere.length} matieres</th>
            <th>${decision}</th>
            <td><button class="btn-supprimer" onclick="supprimer_stagiaire(event)" id="${i}">Supprimer</button> 
                <button class="btn-modifier" onclick = "modifier_stagiaire(event)" id="${i}">modifier</button>
            </td>
            
        </tr>`;
    }
    document.getElementById("tdata").innerHTML = content;

    // meilleure note
    let liste_note = stagiaires.map(function(itemValue){
        return itemValue.note;
    }) 

    let best_note = Math.max(...liste_note)
    document.getElementById("best-note").textContent = best_note

    
    
}

function supprimer_stagiaire(event){
    event.preventDefault();
    console.log(event.currentTarget.id) //l indice du stagiaire 
    let stagiaireSelectionner = stagiaires[event.currentTarget.id].code
    if(confirm("Voulez-vous vraiment supprimer ce stagiaire ?")){
        stagiaires = stagiaires.filter(function(itemValue){
        
        return itemValue.code !== stagiaireSelectionner
        })
            // rafraichissement de la table html
        afficher_data(); 
    }else{
        alert("Suppression annulée.")
    }
    

}



function modifier_stagiaire(event){
    indice_stagiaire_selectionner = event.currentTarget.id
    let stagiaireSelectionner = stagiaires[indice_stagiaire_selectionner]
    event.preventDefault();
    code.value = stagiaireSelectionner.code ;
    nom.value = stagiaireSelectionner.nom;
    note.value = stagiaireSelectionner.note;
    groupe.value = stagiaireSelectionner.groupe;

    let rd_filiere =  document.querySelectorAll("input[name='filiere']")
   
    for (let i = 0 ; i < rd_filiere.length ; i++){
        console.log(rd_filiere[0].value)
        if(rd_filiere[i].value == stagiaireSelectionner.filiere){
            rd_filiere[i].checked = true;
        }
    }

    let cb_matiere =  document.querySelectorAll("input[name='matiere']");
    
    for( let i = 0 ; i < cb_matiere.length ; i++){
        // decocher tous les checked
        cb_matiere[i].checked = false ;

        //mise à jour des checkbox
        
        for (let j = 0 ; j < stagiaireSelectionner.matiere.length ; j++){
            if(cb_matiere[i].value == stagiaireSelectionner.matiere[j]){
                cb_matiere[i].checked = true;
            }
        }
    }
}


function enregistrer(event){
    event.preventDefault();
    let filiere =  document.querySelector("input[name='filiere']:checked");
    let matieres = []
    let matiere =  document.querySelectorAll("input[name='matiere']:checked");
    console.log(matiere.length)
    for (let i = 0 ; i < matiere.length ; i++){
        matieres.push(matiere[i].value)
    }
    stagiaires[indice_stagiaire_selectionner].code = code.value;
    stagiaires[indice_stagiaire_selectionner].nom = nom.value;
    stagiaires[indice_stagiaire_selectionner].note = note.value;
    stagiaires[indice_stagiaire_selectionner].groupe = groupe.value;
    stagiaires[indice_stagiaire_selectionner].filiere = filiere.value;
    stagiaires[indice_stagiaire_selectionner].matiere= matieres;

    afficher_data()
}