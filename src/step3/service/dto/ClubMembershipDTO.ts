import RoleInClub from "../../../step1/entity/club/RoleInClub";
import DateUtil from "../../../util/DateUtil";
import ClubMembership from "../../../step1/entity/club/ClubMembership";

export default class ClubMembershipDTO {

  clubId: string= '';
  memberEmail: string = '';
  role: RoleInClub = RoleInClub.Member;
  joinDate: string = '';


  constructor(clubId: string, memberEmail: string) {
    this.clubId = clubId;
    this.memberEmail = memberEmail;
    this.joinDate = DateUtil.today();
  }

  static fromEntity(membership: ClubMembership): ClubMembershipDTO{
    const membershipDTO = new ClubMembershipDTO(
      membership.clubId,membership.memberEmail
    )

    membershipDTO.role = membership.role;
    membershipDTO.joinDate = membership.joinDate;

    return membershipDTO;
  }

  toMembership(): ClubMembership {

    const membership = new ClubMembership(
      this.clubId, this.memberEmail
    )
    membership.role = this.role;
    membership.joinDate = this.joinDate;

    return membership;
  }


}

