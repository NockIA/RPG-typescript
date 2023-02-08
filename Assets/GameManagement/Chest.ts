import {Character} from "../Characters/Character.ts"
import { Ether } from "../Inventory/Ether.ts"
import { HalfStar } from "../Inventory/HalfStar.ts"
import { PieceOfStar } from "../Inventory/PieceOfStar.ts"
import { Potion } from "../Inventory/Potion.ts"
import { PlayerInventory} from "../Inventory/PlayerInventory.ts"
import { DisplayTools } from "../Display/DisplayTools.ts"

type charactersType = "Mage" | "Priest" | "Warrior" | "Paladin" | "Barbaric" | "Thief" | "Zombie" | "Vampire" | "Wyvern" | "Ghost" | "Gargoyle" | "Boss";

export class Chest {
    private characters: string[] = ["Mage", "Pretre", "Guerrier", "Paladin", "Barbare", "Voleur"]
    private charactersPeek: charactersType[] = [];
    private isTrapped= Boolean(Math.round(Math.random()));
    private displayTools = new DisplayTools
    
    constructor(playerTeam : Character[], inventory : PlayerInventory){
        this.menuChest(playerTeam, inventory)
    }

    private menuChest(listCharacter :Character[], inventory : PlayerInventory){
        console.log("Welcome to the chest room ! \nYou will have to select a character to open the chest.\n" )
        let count = 1
        listCharacter.forEach(element => {
            if (element.currentPV > 0) {
                console.log(`\tCharacter N°${count} : ${element.name} is alive` )
            } else {
                console.log(`\tCharacter N°${count} : ${element.name} is dead` )
            } 
            this.displayTools.displayHP([element],"",[])
            count++
        });
        this.displayTools.displayHP([],"",[]);
        this.displayTools.displayCloseChest()
        let choice : string | null   = prompt(`Which character do you want to select ? Select his number :`)
        let valid= true
        while (valid) {
            if (choice === null || isNaN(parseInt(choice))){
                console.log("This is not an existing feature !" );
                choice = prompt(`Try again to select a character :`)
            }else {
                if ((parseInt(choice) < 1 ) || (parseInt(choice) > listCharacter.length )){
                    console.log("This is not an existing feature !"  );
                    choice  = prompt(`Try again to select a character :`)
                } else if (listCharacter[parseInt(choice)-1].currentPV == 0){
                    console.log("This character is already dead !" );
                    choice = prompt(`Try again to select a character :`)
                } else {
                    this.openChest(listCharacter[parseInt(choice)-1],inventory)
                    valid = false
                }
            } 
        }
        prompt("Press 'Enter' to continue")
    }

    private makeDamages(character :Character){
        const damages= 20
        character.currentPV -= damages
        console.log(`The chest was trapped ! ${character.name} has taken ${damages} damage`)
    }

    private giveItem(Inventory :PlayerInventory){
        const allItems = [new Potion(), new PieceOfStar(), new HalfStar(), new Ether()]
        const currentIndexItem = Math.floor(Math.random() * 4)
        Inventory.addItems([allItems[currentIndexItem]])
        console.log(`The chest was not trapped. \nYou got a ${allItems[currentIndexItem].pp} ${allItems[currentIndexItem].name} !`); 
    }
    
    private openChest(characterSelected :Character , playerInventory :PlayerInventory){
        console.clear()
        console.log(`${characterSelected.name} is opening the chest ...`);
        this.displayTools.displayHP([],"", []);
        if (this.isTrapped) {
            this.displayTools.displayOpenChest()
            this.makeDamages(characterSelected);
        } else {
            this.displayTools.displayOpenChest()
            this.giveItem(playerInventory);   
        }
    }
}