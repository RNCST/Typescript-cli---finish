import BoardStore from "../store/BoardStore";
import MemoryMap from "./io/MemoryMap";
import {question} from "readline-sync";
import Board from "../entity/board/Board";

export default class BoardMapStore implements BoardStore{

  boardMap: Map<string, Board>;

  constructor() {

    this.boardMap = MemoryMap.getInstance().boardMap;
  }

  create(board: Board): string {

    const targetBoard = this.boardMap.get(board.getId());
    // console.log(board)
    // console.log(board.getId());
    // console.log(this.boardMap)
    // console.log(this.boardMap.get(board.getId()))

    if(targetBoard){
      throw new Error(`\n> board already exists... + ${board.getId()}`);
    }
    else {
      this.boardMap.set(board.getId(), board);
    }
    // console.log(board.getId());
    // question('BoardMapStore create check');
    return board.getId();
  }

  retrieve(boardId: string): Board | null {

    // console.log(boardId)
    // console.log(this.boardMap);
    // console.log(this.boardMap.get(boardId));
    // question('BoardMapStore retrieve check');
    return this.boardMap.get(boardId) || null;
  }

  retrieveByName(name: string): Board[] {

    const boards = Array.from(this.boardMap.values());
    return boards.filter(board => board.name === name);
  }

  retrieveAll(): Board[] {

    return Array.from(this.boardMap.values());
  }

  update(board: Board): void {

    this.boardMap.set(board.getId(), board);
  }


  delete(boardId: string): void {

    this.boardMap.delete(boardId);
  }

  exists(boardId: string): boolean {

    return this.boardMap.get(boardId) !== undefined;
  }




}

