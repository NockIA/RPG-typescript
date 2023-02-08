import { Character } from "../Character.ts";


export class Zombie extends Character{
    private attackName = "Necrotic Touch"

    constructor(){
        super("Zombie")
    }
    
    public basicAttack(target : Character){
        const dammage = this.dmgBasicAttack - target.defense
        target.takeDammage(dammage)
        console.log();
        if(target.currentPV === 0){
            console.log(`The ${this.name} use ${this.attackName} and destroyed ${target.name}`)
        }else{
            console.log(`The ${this.name} use ${this.attackName} and inflicted ${dammage} dammage to the ${target.name}`)
        }
        prompt("Press 'Enter' to continue")
        console.clear()
    }
}