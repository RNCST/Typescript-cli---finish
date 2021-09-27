import PostingDTO from "./dto/PostingDTO";

export default interface PostingService {

  register(boardId: string, postingDTO:PostingDTO): string;
  find(postingId: string): PostingDTO;
  findByBoardId(boardId:string):PostingDTO[];
  modify(postingDTO:PostingDTO):void;
  remove(postingId:string):void;
}

