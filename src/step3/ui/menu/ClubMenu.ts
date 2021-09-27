import {question} from "readline-sync";
import ClubConsole from "../console/ClubConsole";
import ClubMembershipMenu from "../../../step3/ui/menu/ClubMembershipMenu";

export default class ClubMenu {

  clubConsole:ClubConsole;
  clubMembershipMenu:ClubMembershipMenu;

  constructor() {
    this.clubConsole = new ClubConsole();
    this.clubMembershipMenu = new ClubMembershipMenu();
  }

  showMenu():void {

    let inputNumber = 0;

    while (true) {
      //
      this.displayMenu();
      inputNumber = this.selectMenu(0,5);

      switch (inputNumber) {
        //
        case 1:
          this.clubConsole.register();
          break;
        case 2:
          this.clubConsole.find();
          break;
        case 3:
          this.clubConsole.modify();
          break;
        case 4:
          this.clubConsole.remove();
          break;
        case 5:
          this.clubMembershipMenu.showMenu();
          break;
        case 0:
          return;

        default:
          console.log('Choose Again!');
      }
    }
  }
  displayMenu():void{
    console.log('......................');
    console.log(' [Travel Club Menu]');
    console.log('......................');
    console.log(' 1. Register');
    console.log(' 2. Find');
    console.log(' 3. Modify');
    console.log(' 4. Remove');
    console.log('......................');
    console.log(' 5. Membership Menu');
    console.log('......................');
    console.log(' 0. Previous');
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
}

