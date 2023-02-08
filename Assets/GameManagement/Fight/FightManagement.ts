import { Character } from "../../Characters/Character.ts"
import { DisplayTools } from "../../Display/DisplayTools.ts";
import { ChooseFightActionTools } from "./ChooseFightActionTools.ts";
import { DoFightTools } from "./DoFightTools.ts";

export class FightManagement{
    private playerTeam :Character[]
    private monsterTeam :Character[]
    private orderOfChar :Character[] = []
    static characterInFire :Character[] = []
    static characterInPoison :Character[] = []
    private currentLap = 0
    private doFightTools :DoFightTools = new DoFightTools()
    private chooseFightActionTools :ChooseFightActionTools = new ChooseFightActionTools()
    private displayTools = new DisplayTools()

    constructor(playerTeam: Character[], enemies : Character[]){
        this.playerTeam = playerTeam
        this.monsterTeam = enemies
        this.doFightTools = new DoFightTools()
        this.orderOfChar = this.doFightTools.getOrder(this.playerTeam, this.orderOfChar, this.monsterTeam)
        console.log("You have just entered a fight room. \nYour opponents are :")
        for(const m of this.monsterTeam){
            console.log(`\t- ${m.name}`)
        }
        prompt("Press 'Enter' to start the fight")
        console.clear()
        this.doFight()
    }

    // manage fight
    private doFight(){
        while(!this.doFightTools.checkEnd(this.playerTeam, this.monsterTeam)){
            if(this.orderOfChar[this.currentLap].currentPV > 0){ // only an alive caracter can do something
                if(!this.doFightTools.damageOverTime(this.orderOfChar[this.currentLap], this.playerTeam, this.monsterTeam)){// laps dammage (fire , poison)
                    if(this.orderOfChar[this.currentLap].team === "hero"){//verify if it's the turn of the player to do something
                        const answer = this.chooseFightAction() // This function will return the valid answer that the player choose
                        switch (answer){
                            case "1" :
                                {
                                    this.doFightTools.heroBasicAttack(this.playerTeam, this.monsterTeam, this.orderOfChar, this.currentLap)
                                    break
                                }
                            case "2" : 
                                {
                                    this.doFightTools.heroSpecialAttack(this.playerTeam, this.monsterTeam, this.orderOfChar, this.currentLap)
                                    break
                                }
                            case "3" : 
                                {
                                    this.currentLap = this.doFightTools.inventoryCheck(this.playerTeam, this.monsterTeam, this.currentLap)
                                    break
                                }
                            case "i" : 
                                {
                                    this.currentLap = this.doFightTools.giveInfoSelectedCharact(this.orderOfChar, this.currentLap)
                                    break
                                }
                        }
                    }else{ 
                        this.doFightTools.monsterAction(this.playerTeam, this.monsterTeam, this.orderOfChar, this.currentLap)
                    }
                }
                
            }
            this.currentLap++
            if(this.currentLap>= this.orderOfChar.length){
                this.currentLap -= this.orderOfChar.length
            }
        }
        FightManagement.characterInFire = []
        FightManagement.characterInPoison = []
    }   

    private chooseFightAction() : string | null{ // func that allow to the player to choose his action
        const possibleChoice = this.chooseFightActionTools.possibleChoice(this.orderOfChar, this.currentLap)
        this.displayTools.displayHP(this.playerTeam,"fight",this.monsterTeam)
        console.log(`\nThe ${this.orderOfChar[this.currentLap].name} can do something \n`) 
        console.log("\t1. Basic Attack")
        switch (true){
            case possibleChoice.includes("2") && possibleChoice.includes("3"):
                return this.chooseFightActionTools.canSpelAndInventory(this.orderOfChar, this.currentLap, this.playerTeam, this.monsterTeam)
            case possibleChoice.includes("2") && !possibleChoice.includes("3"):
                return this.chooseFightActionTools.canSplelNoInventory(this.orderOfChar, this.currentLap, this.playerTeam, this.monsterTeam)
            case !possibleChoice.includes("2") && possibleChoice.includes("3"):
                return this.chooseFightActionTools.cantSpelButInventory(this.orderOfChar, this.currentLap, this.playerTeam, this.monsterTeam)
            default:
                return this.chooseFightActionTools.cantSpelAndInventory(this.orderOfChar, this.currentLap, this.playerTeam, this.monsterTeam)
        }
    }
}
