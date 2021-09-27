import BoardConsole from "../console/BoardConsole";
import PostingMenu from "./PostingMenu";
import {question} from "readline-sync";

export default class BoardMenu {

  boardConsole: BoardConsole;
  postingMenu: PostingMenu;

  constructor() {

    this.boardConsole = new BoardConsole();
    this.postingMenu = new PostingMenu();
  }

  showMenu(): void {

    let inputNumber = 0;

    while (true) {
      //
      this.displayMenu();
      inputNumber = this.selectMenu(0,5);

      switch (inputNumber) {
        //
        case 1:
          this.boardConsole.register();
          break;
        case 2:
          this.boardConsole.findByName();
          break;
        case 3:
          this.boardConsole.modify();
          break;
        case 4:
          this.boardConsole.remove();
          break;
        case 5:
          this.postingMenu.showMenu();
        case 0:
          return;

        default:
          console.log('Choose Again!');
      }
    }
  }
  displayMenu(): void {

    console.log('......................');
    console.log(' [Board Menu] ');
    console.log('......................');
    console.log(' 1. Register a board');
    console.log(' 2. Find boards by name');
    console.log(' 3. Modify a board');
    console.log(' 4. Remove a board');
    console.log('......................');
    console.log(' 5. Posting Menu');
    console.log('......................');
    console.log(' 0. Previous');
    console.log('......................');
  }
  selectMenu(numberRangeBottom:number, numberRangeTop:number): number {

    const answer = question('Select menu number');
    const menuNumber = parseInt(answer);

    if (menuNumber >= numberRangeBottom && menuNumber <= numberRangeTop) {
      return menuNumber
    } else {
      console.log('invalid number => ' + menuNumber);
      return -1;
    }
  }



}

