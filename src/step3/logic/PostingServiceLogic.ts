import PostingService from "../service/PostingService";
import SocialBoard from "../../step1/entity/board/SocialBoard";
import Posting from "../../step1/entity/board/Posting";
import TravelClub from "../../step1/entity/club/TravelClub";
import PostingDTO from "../service/dto/PostingDTO";
import MapStorage from "./storage/MapStorage";

export default class PostingServiceLogic implements PostingService {

  boardMap: Map<string, SocialBoard>;
  postingMap: Map<string, Posting>;
  clubMap: Map<string, TravelClub>;

  constructor() {

    this.boardMap = MapStorage.getInstance().boardMap;
    this.postingMap = MapStorage.getInstance().postingMap;
    this.clubMap = MapStorage.getInstance().clubMap

  }

  register(boardId: string, postingDTO: PostingDTO): string {

    const foundClub = this.clubMap.get(boardId);

    if (!foundClub) {
      throw  new Error('\n> In the club No such member email -> ' + postingDTO.writerEmail);
    }
    foundClub.getMembershipBy(postingDTO.writerEmail);

    const foundBoard = this.boardMap.get(boardId);

    if (!foundBoard) {
      throw new Error('\n> No such board id --> '+ boardId);
    }
    const newPosting = postingDTO.toPostingInBoard(foundBoard);

    this.postingMap.set(newPosting.getId(), newPosting);

    return newPosting.getId();
  }

  find(postingId: string): PostingDTO {

    const foundPosting = this.postingMap.get(postingId);

    if(!foundPosting){
      throw new Error('\n> No such a posting id: '+ postingId);
    }
    return PostingDTO.fromEntity(foundPosting);
  }

  findByBoardId(boardId: string): PostingDTO[] {

    const foundBoard = this.boardMap.get(boardId);

    if(!foundBoard){
      throw new Error('\n> No such a board with id --> '+ boardId);
    }

    const postings = Array.from(this.postingMap.values());

    return postings.filter(posting => posting.boardId === boardId)
      .map(targetPosting => PostingDTO.fromEntity(targetPosting));
  }

  modify(postingDTO: PostingDTO): void {

    const postingId = postingDTO.usId;

    const targetPosting = this.postingMap.get(postingId);

    if (!targetPosting) {
      throw new Error('\n> no such a posting with id : ' + postingId);
    }

    if(postingDTO.title) {
      postingDTO.title = targetPosting.title;
    }

    if(postingDTO.contents) {
      postingDTO.contents = targetPosting.contents;
    }

    const newPosting = postingDTO.toPostingIn(postingId,targetPosting.boardId);

    this.postingMap.set(postingId, newPosting);
  }

  remove(postingId: string): void {

    if (!this.postingMap.get(postingId)){
      throw new Error('\n> No such a posting with id : ' + postingId);
    }
    this.postingMap.delete(postingId);
  }


}

