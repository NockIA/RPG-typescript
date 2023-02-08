import { FightManagement } from "../../GameManagement/Fight/FightManagement.ts";
import { Character } from "../Character.ts";


export class Wyvern extends Character{
    private attackName = "Flame Breath"

    constructor(){
        super("Wyvern")
    }

    public basicAttack(target : Character): void{
        target.takeDammage(this.dmgBasicAttack) 
        console.log(`${this.name} use ${this.attackName} :\n${target.name} took ${this.dmgBasicAttack} damages`)
        if(target.currentPV > 0){
            console.log(`${target.name} will take 40 damages to extinguish the flames`)
            FightManagement.characterInFire.push(target)// when a character is in this array, when it's his turn to play the character takes damages of fire
        }else{
            console.log(`${target.name} burned to death`)
        }
        prompt("Press 'Enter' to continue")
        console.clear()
    }
}