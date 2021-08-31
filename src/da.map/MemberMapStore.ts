import ClubMember from "../entity/club/ClubMember";
import MemberStore from "../store/MemberStore";

import MemoryMap from "./io/MemoryMap";

export default class MemberMapStore implements MemberStore{

  memberMap: Map<string,ClubMember>;

  constructor() {
    this.memberMap = MemoryMap.getInstance().memberMap;
  }

  create(member: ClubMember): string {

    const targetMember = this.memberMap.get(member.getId());

    if(targetMember){
      throw new Error(`\n> Member already exists...+ ${member.email} `)
    }

    this.memberMap.set(member.getId(),member);
    return member.getId();
  }

  retrieve(email: string): ClubMember | null {

    return this.memberMap.get(email)|| null;
  }

  retrieveByName(name: string): ClubMember[] {

    const members = Array.from(this.memberMap.values());
    return members.filter(member => member.name===name);
  }

  update(member: ClubMember): void {

    this.memberMap.set(member.getId(),member);
  }

  delete(email: string): void {

    this.memberMap.delete(email);
  }

  exists(email: string): boolean {

    return this.memberMap.get(email) !== undefined;
  }


}

