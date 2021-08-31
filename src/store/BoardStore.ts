import Board from "../entity/board/Board";


interface BoardStore {

  create(board: Board):string;
  retrieve(boardId: string): Board | null;
  retrieveByName(name: string): Board[];
  retrieveAll(): Board[];
  update(board: Board): void;
  delete(boardId: string): void;

  exists(boardId: string): boolean;
}
export default BoardStore;