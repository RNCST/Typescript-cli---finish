import DateUtil from "../../../util/DateUtil";
import SocialBoard from "../../../step1/entity/board/SocialBoard";

export default class BoardDTO {

  boardId: string='';
  name: string='';
  adminEmail: string = '';
  createDate :string='';


  constructor(boardId: string, name: string, adminEmail: string) {
    this.boardId = boardId;
    this.name = name;
    this.adminEmail = adminEmail;
    this.createDate = DateUtil.today();
  }

  static fromEntity(board: SocialBoard): BoardDTO{

    const boardDTO = new BoardDTO(
      board.clubId, board.name, board.adminEmail
    )
    boardDTO.createDate = board.createDate;

    return boardDTO;
  }

  toBoard(): SocialBoard {

    const socialBoard = new SocialBoard(
      this.boardId, this.name, this.adminEmail
    )
    socialBoard.createDate = this.createDate;
    return socialBoard;
  }


}

