import ClubService from "../../service/ClubService";
import BoardService from "../../service/BoardService";
import ServiceLogicLifeCycler from "../../logic/ServiceLogicLifeCycler";
import TravelClubDTO from "../../service/dto/TravelClubDTO";
import BoardDTO from "../../service/dto/BoardDTO";
import {question} from "readline-sync";

export default class BoardConsole {

  clubService: ClubService;
  boardService: BoardService;

  constructor() {
    //
    this.clubService = ServiceLogicLifeCycler.shareInstance().createClubService();
    this.boardService = ServiceLogicLifeCycler.shareInstance().createBoardService();
  }

  findClub(): TravelClubDTO |null {

    let clubFound = null;

    while (true) {
      const clubName = question('\n club name to find (0.Member menu): ');

      if (clubName === '0') {
        break;
      }

      try {
        clubFound = this.clubService.findByName(clubName);
        console.log('\n> Found club: ', clubFound);
        break;
      }
      catch (e:any) {
        console.error(`Error: ${e.message}`);
      }
      clubFound = null;
    }
    return clubFound;
  };

  register(): void {

    while (true) {
      const targetClub = this.findClub();

      if (!targetClub) {
        return;
      }

      const boardName = question('\n board name to register (0.Board menu): ');

      if (boardName === '0') {
        return;
      }
      const adminEmail = question('\n admin member\'s email: ');

      try {
        const newBoardDto = new BoardDTO(targetClub.usId, boardName, adminEmail);

        this.boardService.register(newBoardDto);
        console.log('\n> Registered board: ', newBoardDto);
      }
      catch (e:any) {
        console.error(`Error: ${e.message}`);
      }
    }
  }

  findByName(): void {

    const boardName = question('\n board name to find (0.Board menu): ');

    if (boardName === '0') {
      return;
    }

    try {
      const boardDTOs = this.boardService.findByName(boardName);

      let index = 0;

      for (const boardDTO of boardDTOs) {
        console.log(`\n [${index}] `, boardDTO);
        index++;
      }
    }
    catch (e:any) {
      console.error(`Error: ${e.message}`);
    }
  }

  findOne(): BoardDTO | null {

    let boardFound = null;

    while (true) {
      //
      const clubName = question('\n club name to find a board (0.Board menu): ');

      if (clubName === '0') {
        break;
      }

      try {
        boardFound = this.boardService.findByClubName(clubName);
        if (boardFound) {
          console.log('\n> Found club: ', boardFound);
        }
        break;
      }
      catch (e:any) {
        console.error(`Error: ${e.message}`);
      }
    }
    return boardFound;
  }

  modify(): void {

    const targetBoard = this.findOne();

    if (!targetBoard) {
      return;
    }

    const newBoardName = question('\n new board name to modify (0.Board menu, Enter. no change): ');

    if (newBoardName === '0') {
      return;
    }
    targetBoard.name = newBoardName;

    const newAdminEmail = question('\n new admin member\'s email (Enter. no change): ');

    targetBoard.adminEmail = newAdminEmail;

    try {
      this.boardService.modify(targetBoard);
      console.log('\n> Modified board: ', targetBoard);
    }
    catch (e:any) {
      console.error(`Error: ${e.message}`);
    }
  }

  remove(): void {
    const targetBoard = this.findOne();

    if (!targetBoard) {
      return;
    }

    const confirmStr = question('Remove this board? (Y:yes, N:no): ');

    if (confirmStr.toLowerCase() === 'y' || confirmStr.toLowerCase() === 'yes') {
      console.log('\n> Removing a board --> ' + targetBoard.name);
      this.boardService.remove(targetBoard.boardId);
    }
    else {
      console.log('\n> Remove cancelled, your board is safe. -->' + targetBoard.name);
    }

  }

}

