import MemberStore from "./MemberStore";
import ClubStore from "./ClubStore";
import BoardStore from "./BoardStore";
import PostingStore from "./PostingStore";
import CommentStore from "./CommentStore";

interface ClubStoreLifeCycler {

  requestMemberStore(): MemberStore;
  requestClubStore(): ClubStore;
  requestBoardStore(): BoardStore;
  requestPostingStore(): PostingStore;
  requestCommentStore(): CommentStore;

}

export default ClubStoreLifeCycler;
