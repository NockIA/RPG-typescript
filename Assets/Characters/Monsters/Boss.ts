import { Character } from "../Character.ts";

export class Boss extends Character{
    private attackName = "Earthquake"
    
    constructor(){
        super("Boss")
    }

    specialAttack(targets: Character[]) { // same attack as the paladin
        console.log(`${this.name} use ${this.attackName} !!`)
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
    }

    // method that determines which attack is do (basic or special)
    static WhichAttack():boolean{ // return true if it's the special attack that will be used
        const choice = Math.random()
        return choice>0.7
    }
}