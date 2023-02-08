import { game } from "../../main.ts";
import { Chest } from "./Chest.ts";
import { Character } from "../Characters/Character.ts";
import { FightManagement } from "./Fight/FightManagement.ts";
import { Zombie } from "../Characters/Monsters/Zombie.ts";
import { Vampire } from "../Characters/Monsters/Vampire.ts";
import { Wyvern } from "../Characters/Monsters/Wyvern.ts";
import { Ghost } from "../Characters/Monsters/Ghost.ts";
import { Gargoyle } from "../Characters/Monsters/Gargoyle.ts";
import { Boss } from "../Characters/Monsters/Boss.ts";

export class Room {
    private teamOfMobs: Character[] = [];
    
    chooseRoom(){
        if (game.currentLevel == 5) {
            new FightManagement(game.charactersSelected,this.createBoss());
        } else if (game.currentLevel % 2 == 0) {
            this.createChest();
        } else {
            new FightManagement(game.charactersSelected,this.createMobs());
        }
    }

    private createMobs() :Character[] {
        const listMobs :number[] = [];
        for (let i = 0; i < 3; i++) {
            const randomMob = Math.floor(Math.random() * 5);
            if (listMobs.includes(randomMob)) {
                i--;
            } else {
                switch (randomMob) {
                    case 0 :
                        this.teamOfMobs.push(new Zombie());
                        break;
                    case 1 :
                        this.teamOfMobs.push(new Vampire());
                        break;
                    case 2 :
                        this.teamOfMobs.push(new Wyvern());
                        break;
                    case 3 :
                        this.teamOfMobs.push(new Ghost());
                        break;
                    default :
                        this.teamOfMobs.push(new Gargoyle());
                }
                listMobs.push(randomMob);
            }
        }
        return this.teamOfMobs
    }

    private createChest(){
        return new Chest(game.charactersSelected,game.inventory)
    }

    private createBoss(){
        const boss = new Boss()
        this.teamOfMobs.push(boss); 
        return this.teamOfMobs
    }
}