import MemberStore from "../store/MemberStore";
import CommunityMember from "../../step1/entity/club/CommunityMember";
import MemoryMap from "./io/MemoryMap";

export default class MemberMapStore implements MemberStore{

  memberMap: Map<string,CommunityMember>;

  constructor() {
    this.memberMap = MemoryMap.getInstance().memberMap;
  }

  create(member: CommunityMember): string {

    const targetMember = this.memberMap.get(member.getId());

    if(targetMember){
      throw new Error(`\n> Member already exists...+ ${member.email} `)
    }

    this.memberMap.set(member.getId(),member);
    return member.getId();
  }

  retrieve(email: string): CommunityMember | null {

    return this.memberMap.get(email)|| null;
  }

  retrieveByName(name: string): CommunityMember[] {

    const members = Array.from(this.memberMap.values());
    return members.filter(member => member.name===name);
  }

  update(member: CommunityMember): void {

    this.memberMap.set(member.getId(),member);
  }

  delete(email: string): void {

    this.memberMap.delete(email);
  }

  exists(email: string): boolean {

    return this.memberMap.get(email) !== undefined;
  }


}

