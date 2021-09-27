import MemberDTO from "./dto/MemberDTO";

export default interface MemberService {

  register(memberDTO: MemberDTO): void ;
  find(memberEmail: string):MemberDTO;
  findByName(memberName: string): MemberDTO[];
  modify(memberDTO: MemberDTO): void;
  remove(memberEmail: string): void;

}

