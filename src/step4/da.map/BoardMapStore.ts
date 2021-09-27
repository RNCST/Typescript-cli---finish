import BoardStore from "../store/BoardStore";
import SocialBoard from "../../step1/entity/board/SocialBoard";
import MemoryMap from "./io/MemoryMap";
import {question} from "readline-sync";

export default class BoardMapStore implements BoardStore{

  boardMap: Map<string, SocialBoard>;

  constructor() {

    this.boardMap = MemoryMap.getInstance().boardMap;
  }

  create(board: SocialBoard): string {

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

  retrieve(boardId: string): SocialBoard | null {

    // console.log(boardId)
    // console.log(this.boardMap);
    // console.log(this.boardMap.get(boardId));
    // question('BoardMapStore retrieve check');
    return this.boardMap.get(boardId) || null;
  }

  retrieveByName(name: string): SocialBoard[] {

    const boards = Array.from(this.boardMap.values());
    return boards.filter(board => board.name === name);
  }

  retrieveAll(): SocialBoard[] {

    return Array.from(this.boardMap.values());
  }

  update(board: SocialBoard): void {

    this.boardMap.set(board.getId(), board);
  }


  delete(boardId: string): void {

    this.boardMap.delete(boardId);
  }

  exists(boardId: string): boolean {

    return this.boardMap.get(boardId) !== undefined;
  }




}

