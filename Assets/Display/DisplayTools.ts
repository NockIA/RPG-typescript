import { Character } from "../Characters/Character.ts";

export class DisplayTools {
    displayHP(heroList : Character[] , asciiArt: string, monsterList : Character[]){
        if (heroList){
            this.displayPvBar(heroList)
        }
        switch (asciiArt) {
            case "fight":
                this.displaySword();
                break;
            default:
                console.log();
        }
        if (monsterList){
            this.displayPvBar(monsterList)
            console.log();
        }
    }

    displayPvBar(listCharacter : Character[]){
        listCharacter.forEach(element => {
            let hpBar= ""
            let indexBar = Math.ceil((element.PVmax - (element.PVmax - element.currentPV)) / 10)            
            for (let index = 0; index < indexBar; index++) {
                hpBar += "\x1b[32m" + "▱ " + '\x1b[0m'
            } 
            while (indexBar < (element.PVmax)/10){
                hpBar += "\x1b[31m" + "▱ " + '\x1b[0m'
                indexBar += 1
            }
            console.log(element.pp ,hpBar ,"\x1b[37m" + Math.round(( element.currentPV * 100) / element.PVmax) + '\x1b[0m', "%" )
            this.displayManaBar(element)
        });
    }

    displayManaBar(character :Character){
        if (character.isManaUser() === true){
            const manaStats = character.getManaStat()
            let manaBar= ""
            let indexBar = Math.ceil((manaStats[2] - (manaStats[2] -  manaStats[0])) / 10)            
            for (let index = 0; index < indexBar; index++) {
                manaBar += "\x1b[34m" + "◉ " + '\x1b[0m'
            } 
            while (indexBar < (manaStats[2])/10){
                manaBar += "\x1b[38;2;0;0;0m" + "◉ " + '\x1b[0m'
                indexBar += 1
            }
            console.log("    ",manaBar ,"\x1b[37m" + Math.round(( manaStats[0] * 100) / manaStats[2]) + '\x1b[0m', "%" )
        } 
    }

    displaySword() {
        console.log(`	
        /|\\  ________________
    O|===|* >________________>
        \\|/ 
        `)
    }

    displayCloseChest() {
        console.log(`
              __________
             /________ /|
            |         | |
            |___; ;___|/|
            |---------| |
            |   ( )   | /
            |._______.|/   
    `)
    }

    displayOpenChest() {
        console.log(`
                ._______.
               /__; ;___/|       
              |         ||
              |_________|/
              /        /|
             /________/ |
            |---------| |
            |   ( )   | /
            |._______.|/
    
    `)
    }

    displayWinMessage(){
        console.log("██╗   ██╗ ██████╗ ██╗   ██╗    ██╗    ██╗ ██████╗ ███╗   ██╗    ██╗")
		console.log("╚██╗ ██╔╝██╔═══██╗██║   ██║    ██║    ██║██╔═══██╗████╗  ██║    ██║")
		console.log(" ╚████╔╝ ██║   ██║██║   ██║    ██║ █╗ ██║██║   ██║██╔██╗ ██║    ██║")
		console.log("  ╚██╔╝  ██║   ██║██║   ██║    ██║███╗██║██║   ██║██║╚██╗██║   ╚═╝")
		console.log("   ██║   ╚██████╔╝╚██████╔╝    ╚███╔███╔╝╚██████╔╝██║ ╚████║    ██╗")
		console.log("   ╚═╝    ╚═════╝  ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═══╝    ╚═╝")
                                                            
    }

    displayLooseMessage(){
        console.log("██╗   ██╗ ██████╗ ██╗   ██╗    ██╗      ██████╗ ███████╗████████╗    ██╗")
		console.log("╚██╗ ██╔╝██╔═══██╗██║   ██║    ██║     ██╔═══██╗██╔════╝╚══██╔══╝    ██║")
		console.log(" ╚████╔╝ ██║   ██║██║   ██║    ██║     ██║   ██║███████╗   ██║       ██║")
		console.log("  ╚██╔╝  ██║   ██║██║   ██║    ██║     ██║   ██║╚════██║   ██║       ╚═╝")
		console.log("   ██║   ╚██████╔╝╚██████╔╝    ███████╗╚██████╔╝███████║   ██║       ██╗")
		console.log("   ╚═╝    ╚═════╝  ╚═════╝     ╚══════╝ ╚═════╝ ╚══════╝   ╚═╝       ╚═╝")
    }
}