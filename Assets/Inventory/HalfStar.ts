import { Character } from "../Characters/Character.ts";
import { Item } from "./Item.ts";

export class HalfStar extends Item{
    protected percOfHeal = 0.5;
    protected _name = "half star";
    protected _pp = "⭐";
    protected _canRes = true;
    
    beUse(character : Character){
        if(character.currentPV === 0){
            character.revive(this.percOfHeal);
        }else{
            character.beHealed(1);
        }
    }
}