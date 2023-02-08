import { Character } from "../Characters/Character.ts";
import jsonFile from "./characterCapacity.json" assert { type: "json" };
import { Mage } from "../Characters/Heros/Mage.ts"
import { Priest } from "../Characters/Heros/Priest.ts"
import { Warrior } from "../Characters/Heros/Warrior.ts"
import { Paladin } from "../Characters/Heros/Paladin.ts"
import { Barbaric } from "../Characters/Heros/Barbaric.ts";
import { Thief } from "../Characters/Heros/Thief.ts"
import { GameManager } from "../GameManagement/GameManager.ts";
export class StartMenu{
    private heroCharacters: Character[] = [new Mage(), new Priest(), new Warrior(), new Paladin(), new Barbaric(), new Thief()]
    private docChract = jsonFile
    private team: Character[] = [];
    private numberChoice = 0
    private teamList: string[] = []
    start(): Character[]{
        console.log(`\n	|		Welcome to our rpg		|
		the goal is to survive all the rooms
     there are 2 rooms of fights against monsters (3 monsters)
	2 rooms of chests (either drop an item or take dmgs)
			and a boss fight
	|		   GOOD LUCK !  	        |\n\n`);
        prompt("Press 'Enter' to select your characters");
        console.clear()
        return this.getCharacterChoice()
    }

    private displayRules(){
        console.log("To choose a character enter his number\nCreate a team of 3\nThe characters are :\n\t1- Mage\n\t2- Priest\n\t3- Warrior\n\t4- Paladin\n\t5- Barbaric\n\t6- Thief\nIf you want more information about a character enter << character number >> + i")
    }

    private getCharacterChoice(): Character[]{
        this.displayRules()
        while (this.team.length < 3)
        {
            const choice = prompt("Peek a characters :")
            if (GameManager.verifyAnswer(choice, ["1","2","3","4","5","6","1i","2i","3i","4i","5i","6i"]) && choice!==null){
                if (!isNaN(parseInt(choice, 10))){
                    this.numberChoice = parseInt(choice, 10)
                }
                if (choice.length == 1){
                    if (!this.team.includes(this.heroCharacters[this.numberChoice-1])){
                        this.selectCharcacter(this.heroCharacters[this.numberChoice-1])
                    } else {
                        console.log("You have already chosen this character")
                    }
                } else if (choice.length == 2){
                    const NumberPeek = parseInt(choice[0], 10)
                        // deno-lint-ignore no-explicit-any
                        console.log((this.docChract as any)[this.heroCharacters[NumberPeek-1].name])
                }
            }else{
                console.log("This is not an existing feature ");
            }
        }       
        return this.team
    }      

    private selectCharcacter(charact: Character){
        this.team.push(charact)
        this.teamList.push(charact.name)
        console.log(`You have peek ${charact.name}, your team is composed of ${this.teamList} and you still have to choose ${3-this.team.length} character(s)`);   
    }   
}