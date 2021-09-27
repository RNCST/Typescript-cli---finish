import ClubMembershipDTO from "./ClubMembershipDTO";
import DateUtil from "../../../util/DateUtil";
import TravelClub from "../../../step1/entity/club/TravelClub";

export default class TravelClubDTO {


  usId: string ='';
  name: string ='';
  intro: string = '';
  foundationDay: string = '';

  membershipList:ClubMembershipDTO[] = [];

  constructor(name: string, intro: string) {
    this.name = name;
    this.intro = intro;
    this.foundationDay = DateUtil.today();
  }

  static fromEntity(club: TravelClub): TravelClubDTO {
    //
    const clubDto = new TravelClubDTO(club.name, club.intro);

    clubDto.usId = club.usId;
    clubDto.foundationDay = club.foundationDate;

    for (const membership of club.membershipList) {
      //
      clubDto.membershipList.push(ClubMembershipDTO.fromEntity(membership));
    }

    return clubDto;
  }

  toTravelClub(): TravelClub {
    //
    const travelClub = new TravelClub(this.name, this.intro);

    travelClub.usId = this.usId;
    travelClub.foundationDate = this.foundationDay;

    for (const membershipDTO of this.membershipList) {
      //
      travelClub.membershipList.push(membershipDTO.toMembership());
    }
    return travelClub;
  }
}

