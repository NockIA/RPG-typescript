import { Character } from "../../Characters/Character.ts"
import { game } from "../../../main.ts"
import { DisplayTools } from "../../Display/DisplayTools.ts"
import { FightManagement } from "./FightManagement.ts";
import { Boss } from "../../Characters/Monsters/Boss.ts";
import { Item } from "../../Inventory/Item.ts";
import jsonFile from "../../Display/characterCapacity.json" assert { type: "json" };

export class DoFightTools{
    private displayTools = new DisplayTools()
    private docCharacter = jsonFile

    // manage monster action
    monsterAction(playerTeam :Character[], monsterTeam :Character[], orderOfChar :Character[], currentLap :number){
        const herosAlive : Character[] = game.livingCharacters(playerTeam)
        let target : Character | null= null
        if(orderOfChar[currentLap].name === "Boss"){
            this.displayTools.displayHP(playerTeam,"fight",monsterTeam);
            Boss.WhichAttack() ? orderOfChar[currentLap].specialAttack(herosAlive):target = this.chooseMonsterTarget(herosAlive)
        }else{
            target = this.chooseMonsterTarget(herosAlive)
            this.displayTools.displayHP(playerTeam,"fight",monsterTeam);
        }
        if(target !== null){
            orderOfChar[currentLap].basicAttack(target)
        }
        console.clear()
        return currentLap
    }

    // manage when the player will do a basic attack
    heroBasicAttack(playerTeam :Character[], monsterTeam :Character[], orderOfChar :Character[], currentLap :number){
        const target = Character.ChooseTarget(monsterTeam)//This function will return the target that the player choose
        console.clear()
        this.displayTools.displayHP(playerTeam,"fight",monsterTeam);
        orderOfChar[currentLap].basicAttack(target) 
    }

    // manage when the player will do a specialAttack
    heroSpecialAttack(playerTeam :Character[], monsterTeam :Character[], orderOfChar :Character[], currentLap :number) :number{
        console.clear()
        let targets : Character[] = []
        if(["Paladin","Barbaric","Mage","Warrior"].includes(orderOfChar[currentLap].name)){
            targets = game.livingCharacters(monsterTeam)
            console.clear()
        }else if (orderOfChar[currentLap].name === "Priest"){// spel for the Mage
            targets = playerTeam
        }
        this.displayTools.displayHP(playerTeam,"fight",monsterTeam)
        orderOfChar[currentLap].specialAttack(targets)
        return currentLap
    }

    inventoryCheck(playerTeam :Character[], monsterTeam :Character[], currentLap :number) :number{
        console.clear()
        this.displayTools.displayHP(playerTeam,"fight",monsterTeam)
        let item : Item | undefined | string = undefined
        while(item === undefined){
            item = game.inventory.DisplayChooseItem()
        }
        if (typeof item === "string"){
            console.clear()
        } else{
            const Caract = game.inventory.ChooseTheCharacter(playerTeam,item)
            game.inventory.useItems(Caract, item)
            prompt("Press 'Enter' to continue")
        }
        return currentLap-1
    }

    giveInfoSelectedCharact(orderOfChar :Character[], currentLap :number) :number{
        console.clear() 
        // deno-lint-ignore no-explicit-any
        console.log((this.docCharacter as any)[orderOfChar[currentLap].name])
        currentLap -= 1
        prompt("Press 'Enter' to continue")
        console.clear()
        return currentLap
    }
    
    // method that determines the order of the fight
    getOrder(playerTeam :Character[], orderOfChar :Character[], monsterTeam :Character[] ){
        for(const c of playerTeam){
            orderOfChar.push(c)
        }
        for(const c of monsterTeam){
            orderOfChar.push(c)
        }
        let copy = orderOfChar
        const result : Character[] = []
        while(result.length != orderOfChar.length){
            const tmp : Character[] = []
            let bestSpeed : Character = copy[0]
            for(const c of copy){
                if(c.speedAttack > bestSpeed.speedAttack){
                    tmp.push(bestSpeed)
                    bestSpeed = c
                }else{
                    if(c != bestSpeed){
                        tmp.push(c)
                    }
                }
            }
            result.push(bestSpeed)
            copy = tmp
        }
        return result
    }

    // method that check if one side has won
    checkEnd(playerTeam :Character[], monsterTeam :Character[]): boolean{
        const tab : Character[][]= [playerTeam, monsterTeam]
        let totalLife= 0
        for (const team of tab){
            totalLife = 0
            for (const character of team){
                totalLife += character.currentPV
            }
            if (totalLife==0 && team===playerTeam){
                game.playerWin = false
                return true
            } else if (totalLife==0 && team===monsterTeam){
                console.clear()
                console.log("You destroyed these monsters")
                game.playerWin = true
                prompt("Press 'Enter' to continue")
                return true
            }
        }
        return false
    }

    chooseMonsterTarget(targets : Character[]) : Character{ // method that choose a target for the monster
        let IndexLowCaract = 0
        for(let i =0; i<targets.length;i++){
            if(targets[IndexLowCaract].currentPV>targets[i].currentPV){
                IndexLowCaract = i
            }
        }
        const chance = [2,1,2,2,1,2,2,2,2,2] // representation of the random atck of the monster (20% lower/ 80%random)
        let choice : number = Math.floor(Math.random() * 9)
        if(chance[choice]===1){
            return targets[IndexLowCaract]
        }else{
            choice = Math.floor(Math.random()*(targets.length-1))
            return targets[choice]
        }
    }

    // method that will inflicted damages to the impactedChracter if he is in fire or in poison
    damageOverTime(impactedCharcacter:Character, playerTeam :Character[], monsterTeam :Character[]):boolean{
        console.clear()
        if(FightManagement.characterInFire.includes(impactedCharcacter)){
            impactedCharcacter.takeDammage(40)
            const index = FightManagement.characterInFire.indexOf(impactedCharcacter)
            FightManagement.characterInFire.splice(index,1)
            this.displayTools.displayHP(playerTeam,"fight", monsterTeam);
            if(impactedCharcacter.currentPV ===0){
                console.log(`The ${impactedCharcacter.name} died in the flames`)
                return true
            }else{
                console.log(`By extingishing his flames the ${impactedCharcacter.name} take 40 dammages`)
            }
            prompt("Press 'Enter' to continue")
            console.clear()
        }
        if(FightManagement.characterInPoison.includes(impactedCharcacter)){
            impactedCharcacter.takeDammage(50)
            const index = FightManagement.characterInPoison.indexOf(impactedCharcacter)
            FightManagement.characterInPoison.splice(index,1)
            this.displayTools.displayHP(playerTeam,"fight", monsterTeam);
            if(impactedCharcacter.currentPV ===0){
                console.log(`The ${impactedCharcacter.name} died of poison`)
                return true
            }else{
                console.log(`By spitting out the poison the ${impactedCharcacter.name} take 40 dammages`)
            }
            prompt("Press 'Enter' to continue")
            console.clear()
        }
        return false
    }
}