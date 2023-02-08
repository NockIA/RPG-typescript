import { Character } from "../Character.ts";

export class Barbaric extends Character{
    private spelName = "Berserk"

    constructor(){
        super("Barbaric")
    }
    specialAttack(targets: Character[]) { // this spel works like a basic attack unlike that the player doesn't choose the target
        console.log(`The Barbaric use ${this.spelName} !!!`)
        const choice : number = Math.floor(Math.random() * (targets.length-1))
        const totalDamage = (this.dmgBasicAttack-targets[choice].defense)*1.3
        targets[choice].takeDammage(totalDamage)
        if(targets[choice].currentPV === 0){
            console.log(`The ${this.name} destroyed ${targets[choice].name}`)
        }else{
            console.log(`${targets[choice].name} took ${totalDamage} damage`)
        }
        this.takeDammage(0.2 * this.PVmax) 
        if(this.currentPV === 0){
            console.log(`In a burst of rage the ${this.name} died as he attacked`)
        }else{
            console.log(`While attacking, ${this.name} lost ${0.2 * this.PVmax} HP`)
        }
        prompt("Press 'Enter' to continue")
        console.clear()
    }
}