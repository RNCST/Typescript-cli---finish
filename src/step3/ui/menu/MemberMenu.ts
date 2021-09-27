import {question} from "readline-sync";
import MemberConsole from "../console/MemberConsole";

export default class MemberMenu {
  memberConsole:MemberConsole;

  constructor() {
    this.memberConsole = new MemberConsole();
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
          this.memberConsole.register();
          break;
        case 2:
          this.memberConsole.find();
          break;
        case 3:
          this.memberConsole.modify();
          break;
        case 4:
          this.memberConsole.remove();
          break;
        case 0:
          return;

        default:
          console.log('Choose Again!');
      }
    }
  }
  displayMenu():void {

    console.log('......................');
    console.log(' [Member Menu] ');
    console.log('......................');
    console.log(' 1. Register');
    console.log(' 2. Find');
    console.log(' 3. Modify');
    console.log(' 4. Remove');
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

