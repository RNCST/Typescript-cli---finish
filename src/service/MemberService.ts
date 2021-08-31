import MemberDTO from "./dto/MemberDTO";


interface MemberService {
    //
    register(memberDTO: MemberDTO): void;
    find(memberId: string): MemberDTO;
    findByName(memberName: string): MemberDTO[];
    modify(memberDTO: MemberDTO): void;
    remove(memberId: string): void;
}
export default MemberService;
