import Entity from "../../Entity";
import DateUtil from "../../../util/DateUtil";
import CommunityMember from "../club/CommunityMember";
import TravelClub from "../club/TravelClub";

export default class SocialBoard implements Entity{

  clubId: string='';
  sequence: number =0 ;
  name: string = '';
  adminEmail: string = '';
  createDate: string ='';


  constructor(clubId: string, name: string, adminEmail: string) {
    this.clubId = clubId;
    this.name = name;
    this.adminEmail = adminEmail;
    this.createDate = DateUtil.today();
  }

  static new() {

    return new SocialBoard('', '', '');
  }

  getId(): string {
    return this.clubId;
  }

  get nextPostingId(): string {
    return `${this.clubId} + ${++this.sequence}`;
  }

  static getSample(club: TravelClub): SocialBoard {

    const member = CommunityMember.getSample();

    const board = new SocialBoard(club.usId, club.name, member.email);

    board.createDate = '2011.11.11';

    return board;
  }


}