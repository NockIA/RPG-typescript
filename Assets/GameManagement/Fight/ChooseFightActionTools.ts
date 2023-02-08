import { game } from "../../../main.ts";
import { Character } from "../../Characters/Character.ts";
import { DisplayTools } from "../../Display/DisplayTools.ts";
import { GameManager } from "../GameManager.ts";


export class ChooseFightActionTools{
    displayTools :DisplayTools = new DisplayTools();
    
    possibleChoice(orderOfChar :Character[], currentLap :number) :string[]{// method that allow to us to know which method to call
        let canSpel = true;
        if(orderOfChar[currentLap].isManaUser()){
            if(orderOfChar[currentLap].getManaStat()[0] < orderOfChar[currentLap].getManaStat()[1]){
                canSpel = false
            }
        }else if(orderOfChar[currentLap].name === "Warrior"){
            canSpel = false
        }
        const possibleChoice = canSpel ? ["1","2","i"] : ["1","i"]
        if(game.inventory.listItem.length !== 0){
            possibleChoice.push("3")
        }
        console.clear()
        return possibleChoice
    }

    // case where the character can do  everything
    canSpelAndInventory(orderOfChar: Character[], currentLap: number, playerTeam: Character[], monsterTeam: Character[]) :string|null{
        let answer :string|null
        console.log("\t2. Special Attack\n\t3. Check your inventory\n")
        console.log("Enter << i >> if you want more informations on this characters");
        answer = prompt("Choose your action : ")
        while(!GameManager.verifyAnswer(answer,["1","2","3","i"])){
            console.clear()
            this.displayTools.displayHP(playerTeam,"fight",monsterTeam);
            console.log(`The ${orderOfChar[currentLap].name} can do something \n`)
            console.log(" \t1. Basic Attack\n \t2. Special Attack\n \t3. Check your inventory")
            answer = prompt("You must write the number of your action : ")
        }
        return answer
    }

    // case where the character can't check his inventory
    canSplelNoInventory(orderOfChar: Character[], currentLap: number, playerTeam: Character[], monsterTeam: Character[]) :string|null{
        let answer :string|null;
        console.log("\t2. Special Attack\n\n(Your inventory is empty)\n")
        console.log("Enter << i >> if you want more informations on this characters");
        answer = prompt("Choose your action : ")
        while(!GameManager.verifyAnswer(answer,["1","2","i"])){
            console.clear()
            this.displayTools.displayHP(playerTeam,"fight",monsterTeam)
            console.log(`The ${orderOfChar[currentLap].name} can do something \n`)
            console.log("\t1. Basic Attack\n \t2. Special Attack\n\n(Your inventory is empty)\n")
            answer = prompt("You must write the number of your action : ")
        }
        return answer
    }

    // case where the character can't spel
    cantSpelButInventory(orderOfChar: Character[], currentLap: number, playerTeam: Character[], monsterTeam: Character[]){
        let answer :string|null;
        console.log("\t2. Check your inventory\n")
        orderOfChar[currentLap].name === "Warrior" ? console.log("Warrior doesn't have a special attack"):console.log(`The ${orderOfChar[currentLap].name} character doesn't have enough mana for a special attack\n`)
        answer = prompt("Choose your action : ")
        console.log("Enter << i >> if you want more informations on this characters");
        while(!GameManager.verifyAnswer(answer,["1","2","i"])){
            console.clear()
            this.displayTools.displayHP(playerTeam,"fight",monsterTeam)
            console.log(`The ${orderOfChar[currentLap].name} can do something \n`)
            console.log("\t1. Basic Attack\n\t2. Check your inventory\n\n")
            orderOfChar[currentLap].name === "Warrior" ? console.log("Warrior doesn't have a special attack\n"):console.log(`The ${orderOfChar[currentLap].name} character doesn't have enough manafor a special attack\n`)
            answer = prompt("You must write the number of your action : ")
        }
        return answer === "2" ? "3":answer
    }

    // case where the character can't do anything other than a basic attack
    cantSpelAndInventory(orderOfChar: Character[], currentLap: number, playerTeam: Character[], monsterTeam: Character[]){
        let answer :string|null;
        orderOfChar[currentLap].name === "Warrior" ? console.log("Warrior doesn't have a special attack"):console.log(`The ${orderOfChar[currentLap].name} character doesn't have enough mana for a special attack\n`)
        console.log("Your inventory is empty\n")
        console.log("Enter << i >> if you want more informations on this characters");
        answer = prompt("Choose your action : ")
        while(!GameManager.verifyAnswer(answer,["1","i"])){
            console.clear()
            this.displayTools.displayHP(playerTeam,"fight",monsterTeam);
            console.log(`The ${orderOfChar[currentLap].name} can do something \n`)
            console.log("\t1. Basic Attack\n")
            orderOfChar[currentLap].name === "Warrior" ? console.log("Warrior doesn't have a special attack"):console.log(`The ${orderOfChar[currentLap].name} character doesn't have enough mana for a special attack\n`)
            console.log("Your inventory is empty")
            answer = prompt("You must write the number of your action : ")
        }
        return answer
    }
}