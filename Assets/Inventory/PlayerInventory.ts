import { Character } from "../Characters/Character.ts"
import { PieceOfStar } from "./PieceOfStar.ts"
import { Potion } from "./Potion.ts"
import { Ether } from "./Ether.ts"
import { Item } from "./Item.ts";
import { GameManager } from "../GameManagement/GameManager.ts"
import jsonFile from "../Display/itemInfos.json" assert { type: "json" };

export class PlayerInventory{
    private docItem = jsonFile
    public listItem: Item[] = []

    constructor(){
        this.addItems([new Potion(), new Ether(), new PieceOfStar()])
    }
    
    addItems(allItems:Item[]){
        for(const i of allItems){
            this.listItem.push(i)
        }
    }

    useItems(character: Character, item : Item){
        const newListItem : Item[] = []
        for(const i of this.listItem){
            if(item === i){
                item.beUse(character)
            }else{
                newListItem.push(i)
            }
        }
        this.listItem = newListItem
    }

    DisplayChooseItem():Item|undefined|string{
        const valideAnswers : string[]=[(this.listItem.length+1).toString(),"potion","ether","piece","half"]
        for(let i = 1; i <= this.listItem.length; i++){
            console.log(`${i}. ${this.listItem[i-1].pp} ${this.listItem[i-1].name}`)
            valideAnswers.push(i.toString())
        }
        let answer = prompt(`Choose your Item(if you want infos of items enter:\npotion,ether,piece or half) \nor enter ${(this.listItem.length+1).toString()} to return: `)
        while(!GameManager.verifyAnswer(answer,valideAnswers)){
            answer = prompt("\nyou must enter the number of your Item :")
        }
        switch (answer){
            case (this.listItem.length+1).toString():
                return "return";
            case "potion":
                console.log(this.docItem["Potion"]);
                break;
            case "ether":
                console.log(this.docItem["Ether"]);
                break;
            case "piece":
                console.log(this.docItem["PieceOfStar"]);
                break;
            case "half":
                console.log(this.docItem["HalfStar"]);
                break;
            default:
                if(typeof answer === "string"){
                    const choice = parseInt(answer)
                    for(let i = 1; i<=this.listItem.length;i++){
                        if(choice===i){
                            return this.listItem[i-1]
                        }
                    }
                }
        }
    }

    ChooseTheCharacter(targets:Character[],item : Item):Character{
        let i = 1
        const valideAnswers : string[] = []
        for (const t of targets){
            console.log(`${i}. ${t.name}\n`)
            valideAnswers.push((i).toString())
            i++
        }
        let target = null
        while(target === null){
            target = prompt("Please enter the number of your target : ")
            if (target !== null){
                if(!GameManager.verifyAnswer(target,valideAnswers)){
                    target = null
                }else{
                    if(targets[parseInt(target)-1].currentPV===0 && !item.canRes){
                        console.log(`The ${item.name} can't resurrect a character`)
                        target = null
                    }
                }
            }
        }
        return targets[parseInt(target)-1]
    }
}
