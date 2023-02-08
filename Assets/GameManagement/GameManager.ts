import { PlayerInventory} from "../Inventory/PlayerInventory.ts";
import { StartMenu } from "../Display/MenuStart.ts";
import { Room } from "./Room.ts";
import { Character } from "../Characters/Character.ts";
import { game } from "../../main.ts";
import { DisplayTools } from "../Display/DisplayTools.ts";

export class GameManager{
    private _charactersSelected: Character[] = [];
    private _inventory: PlayerInventory = new PlayerInventory(); 
    private newStartMenu: StartMenu = new StartMenu();
    private _currentLevel = 1; 
    private _playerWin = false;
    private displayTools = new DisplayTools()

    get inventory(){
        return this._inventory
    }
    set inventory(inventory :PlayerInventory){
        this._inventory = inventory
    }
    get currentLevel(){
        return this._currentLevel
    }
    get charactersSelected(){
        return this._charactersSelected
    }
    get playerWin(){
        return this._playerWin
    }
    set playerWin(playerWin :boolean){
        this._playerWin = playerWin;
    }

    public play(){
        console.clear()
        this._charactersSelected = this.newStartMenu.start()
        for (let i = 1; i<6; i++){
            const Nroom = new Room()
            Nroom.chooseRoom();
            if(!this.playerWin){
                console.log();
                this.displayTools.displayLooseMessage()
                break
            }
            console.clear()
            this._currentLevel++
        }
        let again :string | null
        if(this.playerWin){
            console.log();
            this.displayTools.displayWinMessage()
            again = prompt("\n1- Play again \n2- Leave\nEnter your choice")
            while(!GameManager.verifyAnswer(again,["1","2"])){
                console.clear()
                console.log("Please enter a valid answer\n")
                again = prompt("Congrats you have won !!\n\n1- Play again \n2- Leave")
            }
        }else{
            again = prompt("\n1- Play again \n2- Leave\nEnter your choice")
            while(!GameManager.verifyAnswer(again,["1","2"])){
                console.clear()
                console.log("Please enter a valid answer\n")
                again = prompt("1- Play again \n2- Leave")
            }
        }
        if(again === "1"){
            game.resetGame()
        }
    }

    livingCharacters(characters : Character[]) :Character[]{
        const res = []
        for(const c of characters) {
            if(c.currentPV > 0){
                res.push(c)
            }
        }
        return res
    }

    static verifyAnswer(answer : string|null,answersAllowed : string[]): boolean{
        for(const a of answersAllowed){
            if(a === answer){
                return true
            }
        }
        return false
    }

    private resetGame(){
        this._charactersSelected = [];
        this.inventory = new PlayerInventory();
        this.newStartMenu = new StartMenu();
        this._currentLevel = 1;
        this.playerWin = false
        this.play()
    }
}
