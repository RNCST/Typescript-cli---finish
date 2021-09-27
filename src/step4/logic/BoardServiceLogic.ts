import BoardService from '../service/BoardService';
import BoardStore from '../store/BoardStore';
import ClubStore from '../store/ClubStore';
import BoardDTO from "../service/dto/BoardDTO";
import ClubStoreMapLifeCycler from "../da.map/ClubStoreMapLifeCycler";
import {question} from "readline-sync";


class BoardServiceLogic implements BoardService {
    //
    boardStore: BoardStore;
    clubStore: ClubStore;

    constructor() {
      //
      this.boardStore = ClubStoreMapLifeCycler.getInstance().requestBoardStore();
      this.clubStore = ClubStoreMapLifeCycler.getInstance().requestClubStore();
    }

    register(boardDTO: BoardDTO): string {
      //
      const boardId = boardDTO.clubId;
      const targetBoard = this.boardStore.retrieve(boardId);

      if (targetBoard) {
        throw new Error('Board already exists in the club --> ' + targetBoard.name);
      }

      const clubFound = this.clubStore.retrieve(boardId);

      if (!clubFound) {
        throw new Error('No such club with id: ' + boardId);
      }

      const adminEmail = clubFound.getMembershipBy(boardDTO.adminEmail);

      if (!adminEmail) {
        throw new Error('In the club, No such member with admin\'s email --> ' + boardDTO.adminEmail);
      }
      // console.log(boardDTO);
      // console.log(boardDTO.toBoard())
      // question('service logic console');
      return this.boardStore.create(boardDTO.toBoard());

    }

    find(boardId: string): BoardDTO {
      //
      const board = this.boardStore.retrieve(boardId);

      if (!board) {
        throw new Error('No such board with id --> ' + boardId);
      }
      return BoardDTO.fromEntity(board);

    }

    findByName(boardName: string): BoardDTO[] {
      //
      const boards = this.boardStore.retrieveByName(boardName);

      if (!boards.length) {
        throw new Error('No such board with name --> ' + boardName);
      }

      return boards.map(board => BoardDTO.fromEntity(board));
    }

    findAll(): BoardDTO[] {
      //
      const boards = this.boardStore.retrieveAll();
      return boards.map(board => BoardDTO.fromEntity(board));
    }

  findByClubName(clubName: string): BoardDTO | null {
      //
      const foundClub = this.clubStore.retrieveByName(clubName);

      if (!foundClub) {
        throw new Error('No such club with name: ' + clubName);
      }

      const board = this.boardStore.retrieve(foundClub.getId());

      return board ? BoardDTO.fromEntity(board) : null;

    }

    modify(boardDto: BoardDTO): void {
      //
      const boardId = boardDto.clubId;
      const targetBoard = this.boardStore.retrieve(boardId);

      if (!targetBoard) {
        throw new Error('No such board with id --> ' + boardDto.clubId);
      }

      if (!boardDto.name) {
        boardDto.name = 'nullBoardName'
      }

      if (!boardDto.adminEmail) {
        throw new Error('adminEmail shouldn\'t null' + boardDto.adminEmail);
      }

      const foundClub = this.clubStore.retrieve(boardDto.clubId);

      if (!foundClub) {
        throw new Error('No such club with id --> ' + boardDto.clubId);
      }

      const membership = foundClub.getMembershipBy(boardDto.adminEmail);

      if (!membership) {
        throw new Error('In the club, No such member with admin\'s email --> ' + boardDto.adminEmail);
      }

      this.boardStore.update(boardDto.toBoard());
    }

    remove(boardId: string): void {
      //
      const foundBoard = this.boardStore.retrieve(boardId);

      if (!foundBoard) {
        throw new Error('No such board with id --> ' + boardId);
      }
      this.boardStore.delete(boardId);


    }

}
export default BoardServiceLogic;
