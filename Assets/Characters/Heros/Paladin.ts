import { Character } from "../Character.ts";

export class Paladin extends Character{
    private spelName = "holy attack"

    constructor(){
        super("Paladin")
    }
    specialAttack(targets: Character[]) { //
        console.log(`Paladin use ${this.spelName}`)
        for(const t of targets){
            const totalDamage = (this.dmgBasicAttack-t.defense)*0.4
            t.takeDammage(totalDamage) 
            if(t.currentPV === 0){
                console.log(`The ${this.name} destroyed ${t.name}`)
            }else{
                console.log(`${t.name} took ${totalDamage} damage`)
            }
        }
        prompt("Press 'Enter' to continue")
        console.clear()
    }
}