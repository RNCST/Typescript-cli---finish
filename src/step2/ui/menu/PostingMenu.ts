import PostingConsole from "../console/PostingConsole";
import {question} from "readline-sync";

export default class PostingMenu {

  postingConsole: PostingConsole;

  constructor() {

    this.postingConsole = new PostingConsole();
  }

  showMenu(): void {
    let selectNumber = 0;

    while (true) {
      this.displayMainMenu();
      selectNumber = this.selectMenu(0,6);
      switch (selectNumber) {
        case 1:
          this.postingConsole.findBoard();
          break;
        case 2:
          this.postingConsole.registerPosting();
          break;
        case 3:
          this.postingConsole.findByBoardId();
          break;
        case 4:
          this.postingConsole.findPosting();
          break;
        case 5:
          this.postingConsole.modifyPosting();
          break;
        case 6:
          this.postingConsole.removePosting();
          break;
        case 0:
          return;
        default:
          console.log('wrong number. choose again.');
      }
    }

  }

  displayMainMenu(): void {
    console.log('......................');
    console.log(' [Posting Menu]');
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

