import { question } from "readline-sync";
import Board from "../../entity/board/Board";
import ServiceLogicLifeCycler from "../../logic/ServiceLogicLifeCycler";
import BoardService from "../../service/BoardService";
import ClubService from "../../service/ClubService";
import BoardDTO from "../../service/dto/BoardDTO";
import TravelClubDTO from "../../service/dto/TravelClubDTO";
import BoardView from "../view/BoardView";

export default class BoardConsole{
    clubService: ClubService;
    boardService: BoardService;

    constructor() {
      //
      this.clubService = ServiceLogicLifeCycler.shareInstance().createClubService();
      this.boardService = ServiceLogicLifeCycler.shareInstance().createBoardService();
    }

    findClub(): TravelClubDTO | null {
      //
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
        catch (e) {
          if(e instanceof Error)
          console.error(`Error: ${e.message}`);
        }
        clubFound = null;
      }
      return clubFound;
    }

    register(): void {
      //
      const targetclub = this.findClub();

      if (!targetclub) {
        return;
      }

      const boardName = question('\n Board name to register (0.Board menu): ');

      if (boardName === '0') {
        return;
      }
      const adminEmail = question(' Admin member\'s email: ');
      const newBoard = new Board(targetclub.usId, boardName, adminEmail);

      try {
        const newBoardDto = new BoardDTO(newBoard.clubId, newBoard.name, newBoard.adminEmail);

        this.boardService.register(newBoardDto);
        console.log('\n> Registered board: ', newBoardDto);
      }
      catch (e) {
        if(e instanceof Error)
        console.error(`Error: ${e.message}`);
      }
    }

    findByName(): void {
      //
      const boardName = question('\n Board name to find (0.Board menu): ');

      if (boardName === '0') {
        return;
      }

      try {
        const boardDTOs = this.boardService.findByName(boardName);

        let index = 0;

        for (const boardDTO of boardDTOs) {
          console.log(`\n [${index}]`, boardDTO);
          index++;
        }
      }
      catch (e) {
        if(e instanceof Error)
        console.error(`Error: ${e.message}`);
      }
    }

    findOne(): BoardDTO | null {
      //
      let boardFound = null;

      while (true) {
        //
        const clubName = question('\n club name to find a board (0.Board menu): ');

        if (clubName === '0') {
          break;
        }

        try {
          boardFound = this.boardService.findByClubName(clubName);
          console.log('\n> Found club: ', boardFound);
          break;
        }
        catch (e) {
          if(e instanceof Error)
          console.error(`Error: ${e.message}`);
        }
      }
      return boardFound;
    }

    findAll(): void {
      let boards = this.boardService.findAll();
      let inputNumber = 0;
      console.clear();
      console.log('......................');
      console.log(' Board List ==>');
      for (let idx in boards) {
        let menuNumber = parseInt(idx) + 1;
        console.log('   ' + menuNumber + '. ' + boards[idx].name);
      }
      console.log('......................');
      console.log(' 0. Previous');
      console.log('......................');
      inputNumber = this.selectBoardNumber(boards.length);

      if (inputNumber == 0) {
        return;
      }

      let selectBoard = boards[inputNumber - 1];
      let boardView = new BoardView(selectBoard);
      boardView.showMenu();
    }

    selectBoardNumber(boardSize: number): number {
      //
      const answer = question('Select Board number : ');
      const boardNumber = parseInt(answer);
      if (boardNumber >= 0 && boardNumber <= boardSize) {
        return boardNumber;
      }
      else {
        console.log('it\'s a invalid number -> ' + boardNumber);
        return -1;
      }
    }

    modify(): void {
      //
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
        console.log('\n> Modified member: ', targetBoard);
      }
      catch (e) {
        if(e instanceof Error)
        console.error(`Error: ${e.message}`);
      }
    }

    remove(): void {
      //
      const targetBoard = this.findOne();

      if (!targetBoard) {
        return;
      }

      const confirmStr = question('Remove this board? (Y:yes, N:no): ');

      if (confirmStr.toLowerCase() === 'y' || confirmStr.toLowerCase() === 'yes') {
        //
        console.log('\n> Removing a board --> ' + targetBoard.name);
        this.boardService.remove(targetBoard.clubId);
      }
      else {
        console.log('\n> Remove cancelled, your board is safe. -->' + targetBoard.name);
      }
    }
}