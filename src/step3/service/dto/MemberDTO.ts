import ClubMembership from "../../../step1/entity/club/ClubMembership";
import Address from "../../../step1/entity/club/Address";
import ClubMembershipDTO from "./ClubMembershipDTO";
import CommunityMember from "../../../step1/entity/club/CommunityMember";

export default class MemberDTO {

  email: string = '';
  name: string = '';
  nickName: string='';
  phoneNumber: string = '';
  birthDay: string = '';

  addresses: Address[] = [];
  membershipList: ClubMembershipDTO[] = [];


  constructor(email: string, name: string, phoneNumber: string) {

    this.setEmail(email);
    this.name = name;
    this.phoneNumber = phoneNumber;
  }

  static fromEntity(member: CommunityMember) : MemberDTO {

    const memberDTO = new MemberDTO(
      member.email, member.name, member.phoneNumber
    )
    memberDTO.nickName = member.nickName;
    memberDTO.birthDay = member.birthDay;
    memberDTO.addresses = member.addresses;

    for (const membership of member.membershipList) {

      memberDTO.membershipList.push(ClubMembershipDTO.fromEntity(membership));
    }
    return memberDTO;
  }

  toMember(): CommunityMember{

    const member = new CommunityMember(this.email, this.name, this.phoneNumber);

    member.nickName = this.nickName;
    member.birthDay = this.birthDay;

    for ( const membershipDTO of this.membershipList){
      member.membershipList.push(membershipDTO.toMembership());
    }

    return member;
  }

  setEmail(email: string): void {
    //
    if (!this.isValidEmailAddress(email)) {
      throw new Error('이메일 형식이 잘못되었습니다 ----> ' + email);
    }
    this.email = email;
  }

  isValidEmailAddress(email: string): boolean {
    //
    const ePattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";

    return !!email.match(ePattern);

  }

}

