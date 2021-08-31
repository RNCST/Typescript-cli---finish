import ClubStoreLifeCycler from "../store/ClubStoreLifeCycler";
import BoardStore from "../store/BoardStore";
import ClubStore from "../store/ClubStore";
import CommentStore from "../store/CommentStore";
import MemberStore from "../store/MemberStore";
import PostingStore from "../store/PostingStore";
import BoardMapStore from "./BoardMapStore";
import ClubMapStore from "./ClubMapStore";
import CommentMapStore from "./CommentMapStore";
import MemberMapStore from "./MemberMapStore";
import PostingMapStore from "./PostingMapStore";

export default class ClubStoreMapLifeCycler implements ClubStoreLifeCycler{

  private static lifeCycler :ClubStoreLifeCycler;

  clubStore: ClubStore | null;
  memberStore: MemberStore | null;
  boardStore: BoardStore | null;
  postingStore: PostingStore | null;
  commentStore: CommentStore | null;

  private constructor() {

    this.clubStore = null;
    this.memberStore = null;
    this.boardStore = null;
    this.postingStore = null;
    this.commentStore = null;
  }

  public static getInstance(): ClubStoreLifeCycler{

    if(!this.lifeCycler){
      this.lifeCycler = new ClubStoreMapLifeCycler();
    }
    return this.lifeCycler;
  }

  requestBoardStore(): BoardStore {

    if (!this.boardStore) {
      this.boardStore = new BoardMapStore();
    }
    return this.boardStore;
  }

  requestClubStore(): ClubStore {

    if (!this.clubStore) {
      this.clubStore = new ClubMapStore();
    }
    return this.clubStore;
  }

  requestCommentStore(): CommentStore {

    if (!this.commentStore) {
      this.commentStore = new CommentMapStore();
    }
    return this.commentStore;
  }

  requestMemberStore(): MemberStore {

    if (!this.memberStore) {
      this.memberStore = new MemberMapStore();
    }
    return this.memberStore;
  }

  requestPostingStore(): PostingStore {

    if (!this.postingStore) {
      this.postingStore = new PostingMapStore();
    }
    return this.postingStore;
  }

}

