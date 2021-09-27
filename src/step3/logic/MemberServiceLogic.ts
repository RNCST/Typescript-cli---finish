import MemberService from "../service/MemberService";
import MemberDTO from "../service/dto/MemberDTO";
import CommunityMember from "../../step1/entity/club/CommunityMember";
import MapStorage from "./storage/MapStorage";

export default class MemberServiceLogic implements MemberService{

  memberMap: Map<string, CommunityMember>;
  
  constructor() {
    this.memberMap = MapStorage.getInstance().memberMap;
  }

  register(memberDTO: MemberDTO): void {
    
    const memberEmail = memberDTO.email;
    
    const foundMember = this.memberMap.get(memberEmail);
    
    if(foundMember){
      throw new Error('Member already exist' + foundMember);
    }
    this.memberMap.set(memberEmail, memberDTO.toMember());
  }
  
  
  find(memberEmail: string): MemberDTO {

    const foundMember = this.memberMap.get(memberEmail);

    if (!foundMember) {
      throw new Error('No such member with email --> ' + memberEmail
      );
    }
    return MemberDTO.fromEntity(foundMember);
  }
  

  findByName(memberName: string): MemberDTO[] {
    
    const members =Array.from(this.memberMap.values());
    
    if(!members){
      return [];
    }
    
    return members.filter(member => member.name === memberName)
      .map(targetMember => MemberDTO.fromEntity(targetMember));
  }

  modify(memberDTO: MemberDTO): void {

    const memberEmail = memberDTO.email;

    const targetMember = this.memberMap.get(memberEmail);

    if (!targetMember) {
      throw new Error('No such member with email: ' + memberEmail);
    }

    if (memberDTO.name) {
      memberDTO.name = targetMember.name;
    }

    if (memberDTO.nickName) {
      memberDTO.nickName = targetMember.nickName;
    }

    if (memberDTO.birthDay) {
      memberDTO.phoneNumber = targetMember.phoneNumber;
    }

    if (memberDTO.birthDay) {
      memberDTO.birthDay = targetMember.birthDay;
    }

    this.memberMap.set(memberEmail, memberDTO.toMember());
  }



  remove(memberEmail: string): void {

    if (!this.memberMap.get(memberEmail)) {
      throw new Error('No such member with email: ' + memberEmail);
    }
    this.memberMap.delete(memberEmail);
  }


}

