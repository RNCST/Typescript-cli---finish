import ClubMenu from "./ClubMenu";
import MemberMenu from "./MemberMenu";
import BoardMenu from "./BoardMenu";
import {question} from "readline-sync";

export default class MainMenu {


  clubMenu:ClubMenu;
  memberMenu:MemberMenu;
  boardMenu:BoardMenu;

  constructor() {

    this.clubMenu = new ClubMenu();
    this.memberMenu = new MemberMenu();
    this.boardMenu = new BoardMenu();
  }

  showMenu(): void {

    let selectNumber = 0;

    while (true){
      this.displayMainMenu();
      selectNumber = this.selectMenu();

      switch (selectNumber){
        case 1:
          this.clubMenu.showMenu();
          break;
        case 2:
          this.memberMenu.showMenu();
          break;
        case 3:
          this.boardMenu.showMenu();
          break;
        case 0 :
          this.exitProgram();
        default:
          console.log('invalid num , choose again')
      }
    }

  }
  displayMainMenu(): void {
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
  selectMenu(): number {

    const answer = question('input menu number');
    const selectMenu = parseInt(answer);

    if(selectMenu>=0||selectMenu<=3){
      return selectMenu;
    }else{
      console.log('plz input valid number');
      return -1;
    }
  }
  exitProgram(): void {

    console.log('bye');
    process.exit(0);
  }
}

