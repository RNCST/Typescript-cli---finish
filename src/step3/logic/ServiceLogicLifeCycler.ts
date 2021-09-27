import ServiceLifeCycler from "../service/ServiceLifeCycler";
import BoardService from "../service/BoardService";
import ClubService from "../service/ClubService";
import MemberService from "../service/MemberService";
import PostingService from "../service/PostingService";
import ClubServiceLogic from "./ClubServiceLogic";
import MemberServiceLogic from "./MemberServiceLogic";
import BoardServiceLogic from "./BoardServiceLogic";
import PostingServiceLogic from "./PostingServiceLogic";
import CommentService from "../../step4/service/CommentService";
import CommentServiceLogic from "../../step4/logic/CommentServiceLogic";

export default class ServiceLogicLifeCycler implements  ServiceLifeCycler{

  private static lifeCycler : ServiceLifeCycler ;

  clubService: ClubService | null;
  memberService : MemberService | null;
  boardService : BoardService | null;
  postingService: PostingService | null;
  commentService: CommentService | null;


  private constructor() {
    //
    this.clubService = null;
    this.memberService = null;
    this.boardService = null;
    this.postingService = null;
    this.commentService = null;

  }

  public static shareInstance(): ServiceLifeCycler{

    if(!this.lifeCycler) {
      this.lifeCycler = new ServiceLogicLifeCycler();
    }

    return this.lifeCycler;
  }


  createClubService(): ClubService {

    if(!this.clubService){
      this.clubService = new ClubServiceLogic()
    }

    return this.clubService;
  }

  createMemberService(): MemberService {
    //
    if (!this.memberService) {
      this.memberService = new MemberServiceLogic();
    }
    return this.memberService;
  }

  createBoardService(): BoardService {
    //
    if (!this.boardService) {
      this.boardService = new BoardServiceLogic();
    }
    return this.boardService;
  }

  createPostingService(): PostingService {
    //
    if (!this.postingService) {
      this.postingService = new PostingServiceLogic();
    }
    return this.postingService;
  }

  createCommentService(): CommentService{

    if(!this.commentService){
      this.commentService = new CommentServiceLogic();
    }
    return this.commentService;

}


}

