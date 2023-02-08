import { Character } from "../Character.ts";
import { game } from "../../../main.ts";
import { HalfStar } from "../../Inventory/HalfStar.ts";
import { Ether } from "../../Inventory/Ether.ts";
import { PieceOfStar } from "../../Inventory/PieceOfStar.ts";
import { Potion } from "../../Inventory/Potion.ts";

export class Thief extends Character{
    private spelName = "Carjacking"
    constructor(){
        super("Thief")
    }
    specialAttack(_targets: Character[]) {
        const chance = Math.random() // random number between 0 and 1
        console.log(`${this.name} use ${this.spelName}`)
        switch (true){
            case chance <= 0.05:
                game.inventory.addItems([new HalfStar()])
                console.log("Thief still an ⭐ Half star and add it to your inventory")
                break
            case chance <= 0.15 && chance > 0.05:
                game.inventory.addItems([new Ether()])
                console.log("Thief still an 💊 ether and add it to your inventory")
                break
            case chance <= 0.3 && chance > 0.15:
                game.inventory.addItems([new PieceOfStar()])
                console.log("Thief still a ✨ piece of star and add it to your inventory")
                break
            case chance <= 0.6 && chance > 0.3:
                game.inventory.addItems([new Potion()])
                console.log("Thief still a 🧪 potion and add it to your inventory")
                break
            default:
                console.log("Unfortunately Thief didn't still anything")
        }
        prompt("Press 'Enter' to continue")
        console.clear()
    }
}