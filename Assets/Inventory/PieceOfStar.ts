import { Character } from "../Characters/Character.ts";
import { Item } from "./Item.ts";

export class PieceOfStar extends Item{
    protected percOfHeal = 0.2
    protected _name = "piece of star"
    protected _pp = "✨"
    protected _canRes = true

    beUse(character : Character){
        if(character.currentPV === 0){
            character.revive(this.percOfHeal)
        }else{
            character.beHealed(0.5)
        }
    }


}