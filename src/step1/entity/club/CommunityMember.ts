import ClubMembership from "./ClubMembership";
import Address from "./Address";

export default class CommunityMember {

  email: string ='';
  name: string = '';
  nickName: string = '';
  phoneNumber: string = '';
  birthDay: string='';

  addresses: Address[] = [];
  membershipList : ClubMembership[] = [];


  constructor(email: string, name: string, phoneNumber: string) {
    this.email = email;
    this.name = name;
    this.phoneNumber = phoneNumber;
  }

  static new() {

    return new CommunityMember('','','');
  }

  getId(): string {
    return this.email;
  }

  static getSample(): CommunityMember {

    const member = new CommunityMember(
      'test@test.co.kr','test','01201010'
    )
    member.nickName = 'sample';
    member.birthDay = '2001.09.23';
    member.addresses.push(Address.getHomeAddressSample());

    return member;

  }
}
