import {question} from "readline-sync";
import ClubMembershipMenu from "./ClubMembershipMenu";
import ClubConsole from "../console/ClubConsole";

export default class ClubMenu {

  clubMembershipMenu: ClubMembershipMenu;
  clubConsole: ClubConsole;

  constructor() {
    this.clubMembershipMenu = new ClubMembershipMenu();
    this.clubConsole = new ClubConsole();

  }

  showMenu() {
    let inputnumber = 0;
    while (true) {
      this.displayMenu();
      inputnumber = this.selectMenu(0, 5)
      switch (inputnumber) {
        case 1:
          this.clubConsole.registerClub();
          break;
        case 2:
          this.clubConsole.findClub();
          break;
        case 3:
          this.clubConsole.modifyClub();
          break;
        case 4:
          this.clubConsole.removeClub();
          break;
        case 5:
          this.clubMembershipMenu.showMenu();
          break;
        case 0:
          return;
        default:
          console.log('wrong number choose again.');

      }
    }
  }

  displayMenu() {
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

