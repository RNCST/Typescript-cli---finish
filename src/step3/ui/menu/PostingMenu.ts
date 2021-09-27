import PostingConsole from "../console/PostingConsole";
import {question} from "readline-sync";

export default class PostingMenu {
  //
  postingConsole: PostingConsole;

  constructor() {
    //
    this.postingConsole = new PostingConsole();
  }

  showMenu(): void {
    //
    let inputNumber = 0;

    while (true) {
      //
      this.displayMainMenu();
      inputNumber = this.selectMenu(0,6);

      switch (inputNumber) {
        //
        case 1:
          this.postingConsole.findBoard();
          break;
        case 2:
          this.postingConsole.register();
          break;
        case 3:
          this.postingConsole.findByBoardId();
          break;
        case 4:
          this.postingConsole.find();
          break;
        case 5:
          this.postingConsole.modify();
          break;
        case 6:
          this.postingConsole.remove();
          break;
        case 0:
          return;

        default:
          console.log('Choose Again!');
      }
    }
  }

  displayMainMenu(): void {
    //
    console.log('\n');
    console.log('......................');
    if (this.postingConsole.hasCurrentBoard()) {
      console.log(' Posting menu for[' + this.postingConsole.requestCurrentBoardName() + ']');
    }
    else {
      console.log(' [Posting Menu]');
    }
    console.log('......................');
    console.log(' 1. Find a board');
    console.log(' 2. Register a posting');
    console.log(' 3. Find postings in the board');
    console.log(' 4. Find a posting');
    console.log(' 5. Modify a posting');
    console.log(' 6. Remove a posting');
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