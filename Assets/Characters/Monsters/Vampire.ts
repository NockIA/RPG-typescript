import { Character } from "../Character.ts";


export class Vampire extends Character{
    private attackName ="Bloodthirst"

    constructor(){
        super("Vampire")
    }

    public basicAttack(target:Character){
        const dammage = this.dmgBasicAttack - target.defense
        target.takeDammage(dammage)
        console.log();
        if(target.currentPV === 0){
            console.log(`The ${this.name} use ${this.attackName} and destroyed ${target.name}`)
        }else{
            console.log(`The ${this.name} use ${this.attackName} and inflicted ${dammage} dammage to the ${target.name}`)
        }
        if(this.currentPV < this.PVmax){
            console.log(`The bite heals the ${this.name} :`)
            this.beHealed(0.2) // vampire heal himself
        }
        prompt("Press 'Enter' to continue")
        console.clear()
    }
}