import { FightManagement } from "../../GameManagement/Fight/FightManagement.ts";
import { Character } from "../Character.ts"


export class Gargoyle extends Character{
    private attackName = "Toxic spittle"

    constructor(){
        super("Gargoyle")
    }

    public basicAttack(target :Character){
        target.takeDammage(this.dmgBasicAttack) 
        console.log(`${this.name} use ${this.attackName} :\n${target.name} took ${this.dmgBasicAttack} damages`)
        if(target.currentPV > 0){
            console.log(`${target.name} will take 50 damages to spit out the poison`)
            FightManagement.characterInPoison.push(target)
        }else{
            console.log(`${target.name} died of poison`)
        }
        prompt("Press 'Enter' to continue")
        console.clear()
    }
}