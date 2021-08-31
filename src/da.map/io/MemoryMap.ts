import Board from "../../entity/board/Board";
import Comment from "../../entity/board/Comment";
import Posting from "../../entity/board/Posting";
import Club from "../../entity/club/Club";
import ClubMember from "../../entity/club/ClubMember";


export default class MemoryMap {

  private static uniqueInstance: MemoryMap;

  clubMap: Map<string, Club>;
  memberMap: Map<string, ClubMember>;
  boardMap: Map<string, Board>;
  postingMap: Map<string, Posting>;
  commentMap: Map<string, Comment>;
  autoIdMap: Map<string, number>;


  constructor() {
    this.clubMap = new Map<string, Club>();
    this.memberMap = new Map<string, ClubMember>();
    this.boardMap = new Map<string, Board>();
    this.postingMap = new Map<string, Posting>();
    this.commentMap = new Map<string, Comment>();
    this.autoIdMap = new Map<string, number>();
  }
    public static getInstance():MemoryMap {

    if(this.uniqueInstance === undefined){
      this.uniqueInstance = new MemoryMap();
    }

    return this.uniqueInstance;
  }
}

