import BoardDTO from "./dto/BoardDTO";

export default interface BoardService {

  register(boardDTO: BoardDTO): string;
  find(boardId: string): BoardDTO ;
  findByName(boardName:string): BoardDTO[];
  findByClubName(clubName: string): BoardDTO | null;
  modify(board: BoardDTO): void;
  remove(boardId: string): void;
}

