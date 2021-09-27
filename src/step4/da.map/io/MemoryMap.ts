import TravelClub from "../../../step1/entity/club/TravelClub";
import CommunityMember from "../../../step1/entity/club/CommunityMember";
import SocialBoard from "../../../step1/entity/board/SocialBoard";
import Posting from "../../../step1/entity/board/Posting";
import Comment from "../../../step1/entity/board/Comment";

export default class MemoryMap {

  private static uniqueInstance: MemoryMap;

  clubMap: Map<string, TravelClub>;
  memberMap: Map<string, CommunityMember>;
  boardMap: Map<string, SocialBoard>;
  postingMap: Map<string, Posting>;
  commentMap: Map<string, Comment>;
  autoIdMap: Map<string, number>;


  constructor() {
    this.clubMap = new Map<string, TravelClub>();
    this.memberMap = new Map<string, CommunityMember>();
    this.boardMap = new Map<string, SocialBoard>();
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

