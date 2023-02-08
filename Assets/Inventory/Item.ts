import { Character } from "../Characters/Character.ts";

export abstract class Item{
    protected _pp  = ""
    protected _name = ""
    protected percOfHeal = 0 // in perc
    protected _canRes = false // can revive or not

    abstract beUse(character :Character):void;
    
    get name(){
        return this._name
    }
    get canRes(){
        return this._canRes
    }
    get pp(){
        return this._pp
    }
}