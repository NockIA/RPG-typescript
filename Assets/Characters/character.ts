import jsonFile from "./characterStats.json" assert { type: "json" };
import { game } from "../../main.ts";
import { GameManager } from "../GameManagement/GameManager.ts";

type charactersType = "Mage" | "Priest" | "Warrior" | "Paladin" | "Barbaric" | "Thief" | "Zombie" | "Vampire" | "Wyvern" | "Ghost" | "Gargoyle" | "Boss";

export interface ManaUser {// interface for mage and priest
    currentMana:number
    manaCost:number
    restoreMana(percOfMana : number) : void;
    useMana(percOfMana : number) : void;
}

export abstract class Character{
    readonly name : string
    readonly PVmax:  number
    readonly speedAttack:  number
    public currentPV:  number
    readonly defense:  number
    readonly dmgBasicAttack:  number
    readonly team: string // "hero" or "monster"
    readonly pp: string; // this is the emoji that represent the character

    constructor(name: charactersType){
        const stats = jsonFile[name]
        this.name = name
        this.pp = stats[0]
        this.team = stats[1]
        this.PVmax = parseInt(stats[2])
        this.speedAttack = parseInt(stats[3])
        this.defense = parseInt(stats[5])
        this.dmgBasicAttack = parseInt(stats[4])
        this.currentPV = this.PVmax
    }

    basicAttack(target : Character){ // method that will do a basic attack on a target
        const totalDamage = this.dmgBasicAttack - target.defense
        target.takeDammage(totalDamage)
        console.log();
        if(target.currentPV === 0){
            console.log(`The ${this.name} destroyed ${target.name}`)
        }else{
            console.log(`The ${this.name} inflicted ${totalDamage} dammage to the ${target.name}`)
        }
        prompt("Press 'Enter' to continue")
        console.clear()
    }

    takeDammage(dammage : number){ // the character takes damages
        this.currentPV -= dammage
        if(this.currentPV <= 0){
            this.currentPV = 0
        }
    }

    specialAttack(_targets: Character[]):void{}// method that will be overwritten by the hero classes but not by monster classes

    beHealed(percentage:number){ // the character is heal
        if(this.currentPV === this.PVmax){
            console.log("You just tried to heal a character who is full life")
            return
        }
        const totalLifeGain = this.PVmax*percentage
        if(totalLifeGain + this.currentPV < this.PVmax){
            this.currentPV += totalLifeGain
        }else{
            this.currentPV = this.PVmax
        }
        console.log(`The ${this.name} has now ${this.currentPV} HP`)
    }
    revive(percOfPV : number){ // the character is resurected
        if(this.currentPV === 0){
            this.currentPV = this.PVmax*percOfPV
            console.log(`The ${this.name} has been resurected and has now ${this.currentPV} HP`)
        }
    }

    // the next 4 methods will be overwritten on mana users (mage,priest)
    restoreMana(_percOfMana : number){
        console.log(`The ${this.name} has no mana, ${this.name} eat the ether and it had no effect`)
    }

    useMana(_percOfMana : number){
        console.log(`The ${this.name} has no mana`)
    }

    isManaUser() : boolean{
        return false
    }

    getManaStat() : number[] {
        return [0,0,0]
    }

    static ChooseTarget(targets : Character[]) : Character{ // method that allow to the player to choose a target
        const targetsAlive :Character[] = game.livingCharacters(targets)
        if(targetsAlive.length === 1){
            return targetsAlive[0]
        }
        const valideAnswer:string[] = []
        let i = 1
        console.log();
        for (const t of targetsAlive){
            console.log(`\t${i}. ${t.name}`)
            valideAnswer.push(i.toString())
            i++
        }
        console.log();
        let target = prompt(`Please 'Enter' the number of your target: `) 
        while(!GameManager.verifyAnswer(target,valideAnswer)){
            target = prompt("Please 'Enter' a valide number : ")
        }
        return targetsAlive[parseInt((target as string))-1]
    }
}