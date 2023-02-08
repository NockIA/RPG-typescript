import { Character, ManaUser } from "../Character.ts";

export class Priest extends Character implements ManaUser{
    private spelName = "Heal"
    public currentMana = 100
    private manaMax = 100
    readonly manaCost = 0.4

    constructor(){
        super("Priest")
    }

    specialAttack(targets: Character[]) { //here targets is the playerTeam
        console.log("Choose the caracter to heal")
        const target = Character.ChooseTarget(targets)
        if (typeof target !== "string"){
            this.useMana(this.manaCost)
            target.beHealed(0.5)
            console.log(`${this.name} use ${this.spelName}`)
            if(target.currentPV === target.PVmax){
                console.log(`The ${this.name} restored all ${this.name===target.name ? "his HP":"HP of the"+target.name}`)
            }else{
                console.log(`The ${this.name} restored ${target.PVmax *0.25} ${this.name===target.name ? "of his HP":"HP of the"+target.name}`)
            }
            prompt("Press 'Enter' to continue")
            console.clear()
        }
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