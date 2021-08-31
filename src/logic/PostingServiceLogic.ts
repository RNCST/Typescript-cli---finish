import PostingService from '../service/PostingService';
import BoardStore from '../store/BoardStore';
import ClubStore from '../store/ClubStore';
import PostingStore from '../store/PostingStore';
import PostingDTO from "../service/dto/PostingDTO";
import ClubStoreMapLifeCycler from "../da.map/ClubStoreMapLifeCycler";


class PostingServiceLogic implements PostingService {
  //
  boardStore: BoardStore;
  postingStore: PostingStore;
  clubStore: ClubStore;

  constructor() {
    //
    this.boardStore = ClubStoreMapLifeCycler.getInstance().requestBoardStore();
    this.postingStore = ClubStoreMapLifeCycler.getInstance().requestPostingStore();
    this.clubStore = ClubStoreMapLifeCycler.getInstance().requestClubStore();
  }

  register(boardId: string, postingDto: PostingDTO): string {
    //
    const foundClub = this.clubStore.retrieve(boardId);

    if (!foundClub) {
      throw new Error('No such club with id --> ' + boardId);
    }

    const membership = foundClub.getMembershipBy(postingDto.writerEmail);

    if (!membership) {
      throw new Error('In the club, No such member with admin\'s email --> ' + postingDto.writerEmail);
    }

    const foundBoard = this.boardStore.retrieve(boardId);

    if (!foundBoard) {
      throw new Error('No such board with id --> ' + boardId);
    }

    return this.postingStore.create(postingDto.toPostingInBoard(foundBoard));
  }

  find(postingId: string): PostingDTO {
    //
    const foundPosting = this.postingStore.retrieve(postingId);

    if (!foundPosting) {
      throw new Error('No such posting with id: ' + postingId);
    }
    return PostingDTO.fromEntity(foundPosting);
  }

  findByBoardId(boardId: string): PostingDTO[] {
    //
    const foundBoard = this.boardStore.retrieve(boardId);
    if (!foundBoard) {
      throw new Error('No such board with id --> ' + boardId);
    }

    return this.postingStore.retrieveByBoardId(boardId).map(posting => PostingDTO.fromEntity(posting));
  }

  modify(postingDto: PostingDTO): void {
    //
    const postingId = postingDto.usId;

    const targetPosting = this.postingStore.retrieve(postingId);

    if (!targetPosting) {
      throw new Error('No such posting with id : ' + postingId);
    }

    if (postingDto.title) {
      postingDto.title = targetPosting.title;
    }

    if (postingDto.contents) {
      postingDto.contents = targetPosting.contents;
    }

    this.postingStore.update(postingDto.toPostingIn(postingId, targetPosting.boardId));
  }

  remove(postingId: string): void {
    //
    if (!this.postingStore.retrieve(postingId)) {
      throw new Error('No such posting with id: ' + postingId);
    }
    this.postingStore.delete(postingId);

  }

}
export default PostingServiceLogic;
