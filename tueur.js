/*tueur en serie : Jason est en cavale caché dans une foret. Il a 100pts de vie.

Equipe de choc : caracteristiques, proba de mourir/mettre des degats/mourrir en mettant des dégats. 
5 survivants (généré aléatoirement d'un tableau de prénoms) avec une caractéristique généré aléatoirement.

Le tueur doit attaquer :
soit le survivant meurt
soit le survivant esquive et inflige 10 pts de degats
soit le survivant inflige 15 points de degats mais meurt

Pour chaque action, un message est attendu (Jason a tué x, x a esquivé et a infligé x degats, x est mort, x est mort mais inglige x dégats).

La partie finie quand les survivants ont tué Jason ou que le tueur a tué tout les survivants. A la fin, les morts sont affichés."use strict";
*/


"use strict";

let caractéristiques = ["rabbin", "blonde", "sportif", "nerd", "handicapé moteur"]  // tableau des caractéristiques des survivants
let prenoms = ["Chamber", "Reyna", "Neon", "Yoru", "Raze"] // tableau des prénoms des survivants
let stats = [[0.2, 0.6, 0.2], [0.3, 0.5, 0.2], [0.1, 0.4, 0.5], [0.4, 0.2, 0.4], [0.3, 0.4, 0.3]] // tableau des probabilité d'utiliser les différentes attaques
let joueurs = []  // tableau dans lequel sera ajouté les objets Personnage de la classe Personnage
let survivantsMorts = []    // tableau des survivants morts
let tueur = ["Jason", 60]  // variable qui définit le pseudo et les points de vie du tueur (60 au lieu de 100 parce que sinon Jason gagne presque toujours)


class Personnage { //création d'une class qui permet de créer un objet "Personnage" qui contient les 5 caractéristiques ci dessous

    constructor(nom, caractéristique, probaDead, probaDmg, probaDmgDead) {
        this.nom = nom
        this.caractéristique = caractéristique
        this.probaDead = probaDead
        this.probaDmg = probaDmg
        this.probaDmgDead = probaDmgDead

    }
}

function combat() { // création de la fonction "combat"
    let affichageMort = ""

    if (joueurs.length >= 1 && tueur[1] > 0) {
        let chiffreSurvivantAleatoire = Math.floor(Math.random() * joueurs.length)
        let survivantCible = joueurs[chiffreSurvivantAleatoire]
        attaqueTueur(survivantCible, chiffreSurvivantAleatoire)
        

    } else if (joueurs.length >= 1 && tueur[1] <= 0) {

        for (let i = 0; i < survivantsMorts.length; i++) {
            let test = survivantsMorts[i]

            if(survivantsMorts.length!=1){
                if (test == survivantsMorts[survivantsMorts.length - 1]) {
                    affichageMort += " et "+test+"..." // affichageMort = affichageMort + "et " + test + "."
    
                } else if (test == survivantsMorts[survivantsMorts.length - 2]) {
                    affichageMort += test  // affichage = affichage + test + " "
                } 
                
                else {
                    affichageMort += test+", "
                }
            }else{
                affichageMort += test+"."
            }
        }
        if(!affichageMort) {
            console.log("Jason est mort ! Aucun survivant n'est mort ce soir...") // permet de ne pas afficher la phrase "Mais RIP à..." si aucun survivant ne meurt
        } else{
        console.log("Jason est mort ! Mais RIP à", affichageMort) 
        }
    } else if (joueurs.length == 0 && tueur[1] > 0) {
        console.log("Jason a gagné, il ne reste plus aucun survivant. Il lui reste "+tueur[1]+" points de vie !")

    } else if (joueurs.length == 0 && tueur[1] <= 0) {
        console.log("Tous le monde est mort..."+ affichageMort+" Il ne reste aucun survivant et Jason aussi c'est ciao ! ")
    }

}

function attaqueTueur(survivantCible, chiffreSurvivantAleatoire) {
    let valeurAleatoire = Math.random()

    if (valeurAleatoire < survivantCible["probaDead"]) {
        console.log("Jason a tué", survivantCible["nom"])
        survivantsMorts.push(survivantCible["nom"])
        joueurs.splice(chiffreSurvivantAleatoire, 1)

      } else if (valeurAleatoire < survivantCible["probaDead"] + survivantCible["probaDmg"]) {
        console.log(survivantCible["nom"],"esquive et met 10 dégâts à Jason !")
        tueur[1] -= 10

      } else  { 
        console.log(survivantCible["nom"] ,"se sacrifie et met 15 dégâts à Jason !")
        tueur[1] -= 15
        survivantsMorts.push(survivantCible["nom"])
        joueurs.splice(chiffreSurvivantAleatoire, 1)
      }


    console.log("Survivants morts :", survivantsMorts)
    
    combat()

};


// pour chaque prenom dans le tableau prenoms, une caractéristique et des stats aléatoires vont être misent chacune dans une variable.
prenoms.forEach(nom => { 
    let a = Math.floor(Math.random() * caractéristiques.length) // a étant l'index de la caractéristique choisit aléatoirement
    let caractéristique = caractéristiques.splice(a, 1) // prend un élément du tableau à l'index a et retire cet élément pour éviter les doublons entre les 5 survivants 

    let b = Math.floor(Math.random() * stats.length)  // b étant l'index de la mini liste stats choisit aléatoirement
    let statPerso = stats.splice(b, 1)  // prend un élément du tableau à l'index b et retire cet élément pour éviter les doublons entre les 5 survivants 

    let joueur = new Personnage(nom, caractéristique, statPerso[0][0], statPerso[0][1], statPerso[0][2]) // créer un objet Personnage avec caractéristique et stats aléatoire
    joueurs.push(joueur) // ajoute cet objet Personnage dans la liste "joueurs"

})

combat() // appel la fonction "combat"
