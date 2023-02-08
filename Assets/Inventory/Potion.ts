import { Character } from "../Characters/Character.ts";
import { Item } from "./Item.ts";

export class Potion extends Item{
    protected _name = "potion"
    protected _pp = "🧪"
    protected percOfHeal = 0.5
    
    beUse(character : Character){
        character.beHealed(this.percOfHeal)
    }
}