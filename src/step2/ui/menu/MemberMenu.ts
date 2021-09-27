import {question} from "readline-sync";
import MemberConsole from "../console/MemberConsole";

export default class MemberMenu {


  memberConsole:MemberConsole;

  constructor() {
    this.memberConsole = new MemberConsole();
  }
  showMenu():void {
    let inputnumber = 0;

    while(true) {
      this.displayMenu();
      inputnumber = this.selectMenu(0,4);
      switch (inputnumber){
        case 1:
          this.memberConsole.registerMember();
          break;
        case 2:
          this.memberConsole.findMember();
          break;
        case 3:
          this.memberConsole.modifyMember();
          break;
        case 4:
          this.memberConsole.removeMember();
          break;
        case 0:
          return;
        default:
          console.log('invalid num choose again..');
      }
    }
  }

  displayMenu(): void{
    //
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

