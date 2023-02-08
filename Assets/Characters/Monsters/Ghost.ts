import { Character, ManaUser } from "../Character.ts";


export class Ghost extends Character{
    private attackName = "Spectral Strike"

    constructor(){
        super("Ghost")
    }

    public basicAttack(target : Character){
        const dammage = this.dmgBasicAttack - target.defense
        target.takeDammage(dammage)
        console.log();
        if(target.currentPV === 0){
            console.log(`The ${this.name} use ${this.attackName} and destroyed ${target.name}`)
        }else{
            console.log(`The ${this.name} use ${this.attackName} and inflicted ${dammage} dammage to the ${target.name}`)
            if(target.isManaUser()){// case where it's a manauser who is target
                console.log(`The ${this.name} sucked mana from the ${target.name}`);
                (target as unknown as ManaUser).useMana((target as unknown as ManaUser).manaCost)
            }
        }
        prompt("Press 'Enter' to continue")
        console.clear()
    }
}