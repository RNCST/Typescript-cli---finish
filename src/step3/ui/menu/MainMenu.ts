import {question} from "readline-sync";
import MemberMenu from "./MemberMenu";
import ClubMenu from "./ClubMenu";
import BoardMenu from "./BoardMenu";

export default class MainMenu {

  clubMenu:ClubMenu;
  memberMenu:MemberMenu;
  boardMenu:BoardMenu;

  constructor() {

    this.clubMenu = new ClubMenu();
    this.memberMenu = new MemberMenu();
    this.boardMenu= new BoardMenu();
  }

  showMenu():void {

    let inputNumber = 0;

    while (true) {
      //
      this.displayMenu();
      inputNumber = this.selectMenu(0,4);

      switch (inputNumber) {
        //
        case 1:
          this.clubMenu.showMenu();
          break;
        case 2:
          this.memberMenu.showMenu();
          break;
        case 3:
          this.boardMenu.showMenu();
          break;
        case 0:
          this.exitProgram();
        default:
          console.log('Choose Again!');
      }
    }
  }

  displayMenu():void{
    console.log('......................');
    console.log(' [Main Menu] ');
    console.log('......................');
    console.log(' 1. Club Menu');
    console.log(' 2. Member Menu');
    console.log(' 3. Board Menu');
    console.log('......................');
    console.log(' 0. Exit Program');
    console.log('......................');
  }

  selectMenu(numberRangeBottom: number, numberRangeTop: number): number {

    const answer = question('Select menu number');
    const menuNumber = parseInt(answer);

    if (menuNumber >= numberRangeBottom && menuNumber <= numberRangeTop) {
      return menuNumber
    } else {
      console.log('invalid number => ' + menuNumber);
      return -1;
    }
  }

  exitProgram(): void {

    console.log(``);
    process.exit(0);
  }
}

