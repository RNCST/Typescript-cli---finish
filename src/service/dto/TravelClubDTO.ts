import Club from '../../entity/club/Club';
import DateUtil from '../../util/DateUtil';
import ClubMembershipDTO from './ClubMembershipDTO';


class TravelClubDTO {
    //
    usId: string = '';
    name: string = '';
    intro: string = '';
    foundationDay: string = '';

    membershipList: ClubMembershipDTO[] = [];

    constructor(name: string, intro: string) {
      //
      this.name = name;
      this.intro = intro;
      this.foundationDay = DateUtil.today();
    }

    static fromEntity(club: Club): TravelClubDTO {
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

    toTravelClub(): Club {
      //
      const travelClub = new Club(this.name, this.intro);

      travelClub.usId = this.usId;
      travelClub.foundationDate = this.foundationDay;

      for (const membershipDto of this.membershipList) {
        //
        travelClub.membershipList.push(membershipDto.toMembership());
      }
      return travelClub;
    }

}
export default TravelClubDTO;
