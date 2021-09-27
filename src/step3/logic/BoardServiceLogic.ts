import SocialBoard from "../../step1/entity/board/SocialBoard";
import TravelClub from "../../step1/entity/club/TravelClub";
import BoardService from "../service/BoardService";
import MapStorage from "./storage/MapStorage";
import BoardDTO from "../service/dto/BoardDTO";

export default class BoardServiceLogic implements BoardService{

  boardMap: Map<string, SocialBoard>;
  clubMap: Map<string, TravelClub >;


  constructor() {
    this.boardMap = MapStorage.getInstance().boardMap;
    this.clubMap = MapStorage.getInstance().clubMap;
  }

  register(boardDTO: BoardDTO): string {

    const boardId = boardDTO.boardId;
    const targetBoard = this.boardMap.get(boardId);

    if(targetBoard){
      throw new Error('Board already exists ->'+ targetBoard.name);
    }

    const clubFound = this.clubMap.get(boardId);

    if(!clubFound){
      throw new Error('No such club with id: '+boardId);
    }

    const adminMembership = clubFound.getMembershipBy(boardDTO.adminEmail);

    if(!adminMembership){
      throw new Error('In the club, No such member email --> '+ boardDTO.adminEmail);
    }

    const board =boardDTO.toBoard();
    this.boardMap.set(boardId,board);

    return boardId;
  }

  find(boardId: string): BoardDTO {

    const board = this.boardMap.get(boardId);

    if (!board){
      throw new Error('No such board with id --> '+ boardId);
    }
    return BoardDTO.fromEntity(board);
  }

  findByName(boardName: string): BoardDTO[] {

    const boards = Array.from(this.boardMap.values());

    if(!boards){
      throw new Error('No boards in the storage')
    }

    const boardDTOs = boards.filter(board => board.name === boardName)
      .map(board=>BoardDTO.fromEntity(board));

    if (!boardDTOs.length){
      throw new Error('No such board with name --> '+ boardName);
    }

    return boardDTOs;
  }

  findByClubName(clubName: string): BoardDTO | null {

    const clubs = Array.from(this.clubMap.values());

    const foundClub = clubs.find((club)=>club.name === clubName);

    if(!foundClub){
      throw new Error ('No such club with name : '+ clubName);
    }

    const board = this.boardMap.get(foundClub.getId());

    return board ? BoardDTO.fromEntity(board) : null;
  }

  modify(boardDTO: BoardDTO): void {

    const boardId = boardDTO.boardId;
    const targetBoard = this.boardMap.get(boardId);

    if(!targetBoard){
      throw Error ('No such board with ti -0-> '+ boardId);
    }

    this.boardMap.set(boardId, boardDTO.toBoard());
  }

  remove(boardId: string): void {

    const foundBoard = this.boardMap.get(boardId);

    if(!foundBoard) {
      throw new Error('No such board id -->' + boardId);
    }
    this.boardMap.delete(boardId);
  }
}

