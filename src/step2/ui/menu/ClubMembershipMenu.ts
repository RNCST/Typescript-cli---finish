import {question} from "readline-sync";
import ClubMembershipConsole from "../console/ClubMembershipConsole";

export default class ClubMembershipMenu {

  clubMembershipConsole: ClubMembershipConsole;

  constructor() {
    this.clubMembershipConsole = new ClubMembershipConsole();
  }

  showMenu(): void {
    let inputnumber = 0;
    while (true) {
      this.displayMenu();
      inputnumber = this.selectMenu(0, 5)

      switch (inputnumber) {
        case 1:
          this.clubMembershipConsole.findClub();
          break;
        case 2:
          this.clubMembershipConsole.addMembership();
          break;
        case 3:
          this.clubMembershipConsole.findMembership();
          break;
        case 4:
          this.clubMembershipConsole.modifyMembership();
          break;
        case 5:
          this.clubMembershipConsole.removeMembership();
          break;
        case 0:
          return;
        default:
          console.log('invalid num choose again.');
      }

    }

  }

  displayMenu(): void {

    console.log('......................');
    console.log('[Membership Menu]');
    console.log('......................');
    console.log(' 1. Find a club');
    console.log(' 2. Add a membership');
    console.log(' 3. Find a membership');
    console.log(' 4. Modify a membership');
    console.log(' 5. Remove a membership');
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

