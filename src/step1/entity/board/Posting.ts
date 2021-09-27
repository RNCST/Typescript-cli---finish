import Entity from "../../Entity";
import DateUtil from "../../../util/DateUtil";
import SocialBoard from "./SocialBoard";
import CommunityMember from "../club/CommunityMember";

export default class Posting implements Entity{

  usId: string = '';
  title: string = '';
  writerEmail:string = '';
  contents: string = '';
  writtenDate: string ='';
  readCount: number = 0;

  boardId: string ='';
  sequence: number = 0;


  constructor(postingId: string, boardId: string, title: string, writerEmail: string, contents: string) {
    this.usId = postingId;
    this.title = title;
    this.writerEmail = writerEmail;
    this.contents = contents;
    this.boardId = boardId;
    this.writtenDate = DateUtil.today();
  }

  getId(): string {
    return this.usId;
  }

  get nextCommentId(): string {
    return `${this.usId} : ${this.sequence++}`;
  }

  static getSample(board: SocialBoard): Posting[] {

    const postings = [];
    let postingUsId = board.nextPostingId;
    console.log(postingUsId);
    const leader = CommunityMember.getSample();
    const leaderPosting = new Posting(postingUsId, board.getId(),
      'sample leader title',leader.email,'sample leader content');
    leaderPosting.usId = postingUsId;
    postings.push(leaderPosting)

    postingUsId = board.nextPostingId;

    const member = CommunityMember.getSample();
    const memberPosting = new Posting(postingUsId , board.getId(),
      'sample member title', member.email, 'sample member content');

    memberPosting.usId = postingUsId;
    postings.push(memberPosting);

    return postings;
  }

}