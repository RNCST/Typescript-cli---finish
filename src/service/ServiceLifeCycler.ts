import ClubService from "./ClubService";
import MemberService from "./MemberService";
import BoardService from "./BoardService";
import PostingService from "./PostingService";
import CommentService from "./CommentService";

export default interface ServiceLifeCycler {

  createClubService(): ClubService;

  createMemberService(): MemberService;

  createBoardService(): BoardService;

  createPostingService(): PostingService;

  createCommentService(): CommentService;


}

