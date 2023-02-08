import { Character } from "../Characters/Character.ts";
import { Item } from "./Item.ts";

export class Ether extends Item{
    protected percOfHeal = 0.5 // here this var represent the percOfMana
    protected _name = "ether"
    protected _pp  = "💊"

    beUse(character : Character){
        character.restoreMana(this.percOfHeal)
    }
}