import { Character } from "../Character.ts";

export class Warrior extends Character{
    constructor(){
        super("Warrior")
    }
    specialAttack(_targets: Character[]) {
        // this method will never be called
    }
}