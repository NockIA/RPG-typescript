import { Character,ManaUser } from "../Character.ts";

export class Mage extends Character implements ManaUser{
    private spelName = "Magic Attack"
    public currentMana = 100
    private manaMax = 100
    readonly manaCost = 0.2

    constructor(){
        super("Mage")
    }

    specialAttack(targets: Character[]) { // spel that ignores defense and use mana
        const target = Character.ChooseTarget(targets)
        target.takeDammage(this.dmgBasicAttack)
        this.useMana(this.manaCost)
        console.log(`${this.name} use ${this.spelName}`)
        if(target.currentPV === 0){
            console.log(`The ${this.name} destroyed ${target.name}`)
        }else{
            console.log(`The ${this.name} use ${this.spelName} inflicted 100 dammage to the ${targets[0].name}`)
        }
        prompt("Press 'Enter' to continue")
        console.clear()
    }

    restoreMana(percOfMana : number): void{ // percOfMana must be > 0 and <1
        this.currentMana += this.manaMax * percOfMana
        if(this.currentMana >= this.manaMax){
            if(this.currentMana > this.manaMax){
                this.currentMana = this.manaMax
            }
            console.log(`The ${this.name}'s mana is full`)
        }else{
            console.log(`The ${this.name} has now ${this.currentMana} mana`)
        }
    }

    // this method is not private 'cause the ghost can remove mana of a manauser
    useMana(percOfMana : number) : void{ // percOfMana must be > 0 and <1
        this.currentMana -= this.manaMax * percOfMana
        if(this.currentMana <= 0){
            console.log(`The ${this.name} has no more mana`)
            this.currentMana = 0
        }else{
            console.log(`The ${this.name} has now ${this.currentMana} mana`)
        }
    }

    isManaUser(): boolean {
        return true
    }

    getManaStat(): number[] {
        return [this.currentMana,this.manaCost*this.manaMax,this.manaMax]
    }
}
