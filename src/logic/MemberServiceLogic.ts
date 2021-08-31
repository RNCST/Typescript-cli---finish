import MemberService from '../service/MemberService';
import MemberStore from '../store/MemberStore';
import ClubStoreMapLifeCycler from "../da.map/ClubStoreMapLifeCycler";
import MemberDTO from "../service/dto/MemberDTO";
import {question} from "readline-sync";


class MemberServiceLogic implements MemberService {
    //
    memberStore: MemberStore;

    constructor() {
      //
      this.memberStore = ClubStoreMapLifeCycler.getInstance().requestMemberStore();
    }

    register(memberDTO: MemberDTO): void {
      //
      const email = memberDTO.email;
      const foundMember = this.memberStore.retrieve(email);

      if (foundMember) {
        throw new Error('Member already exist the member email: ' + foundMember.email);
      }
      this.memberStore.create(memberDTO.toMember());

    }

    find(memberEmail: string): MemberDTO {
      //
      const foundMember = this.memberStore.retrieve(memberEmail);

      if (!foundMember) {
        throw new Error('No such member with email: ' + memberEmail);
      }
      return MemberDTO.fromEntity(foundMember);
    }

    findByName(memberName: string): MemberDTO[] {
      //
      const members = this.memberStore.retrieveByName(memberName);

      if (!members) {
        throw new Error('No such member with name: ' + memberName);
      }

      return members.map((targetMember) => MemberDTO.fromEntity(targetMember));
    }

    modify(memberDTO: MemberDTO): void {
      //
      const memberCheck = this.memberStore.retrieve(memberDTO.email);

      if (!memberCheck) {
        throw new Error('No such member with email: ' + memberDTO.email);
      }

      if (!memberDTO.name) {
        memberDTO.name = 'nullName';
      }

      if (!memberDTO.nickName) {
        memberDTO.nickName = 'nullNickName';
      }

      if (!memberDTO.phoneNumber) {
        memberDTO.phoneNumber = '000-000-0000'
      }

      if (!memberDTO.birthDay) {
        memberDTO.birthDay = '1993-09-28'
      }
      console.log('\n modi member info ')
      console.log('before', memberCheck.email, memberCheck.name, memberCheck.nickName, memberCheck.phoneNumber, memberCheck.birthDay);
      console.log('after', memberDTO.email, memberDTO.name, memberDTO.nickName, memberDTO.phoneNumber, memberDTO.birthDay);
      if (question('Enter to modi, "0" to return') === '0'){return;}

      this.memberStore.update(memberDTO.toMember());
    }

    remove(memberId: string): void {
      //
      if (!this.memberStore.exists(memberId)) {
        throw new Error('No such member with email: ' + memberId);
      }
      this.memberStore.delete(memberId);

    }

}
export default MemberServiceLogic;
