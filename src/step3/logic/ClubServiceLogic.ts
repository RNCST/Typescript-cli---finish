import ClubService from "../service/ClubService";
import TravelClub from "../../step1/entity/club/TravelClub";
import CommunityMember from "../../step1/entity/club/CommunityMember";
import MapStorage from "./storage/MapStorage";
import ClubMembershipDTO from "../service/dto/ClubMembershipDTO";
import TravelClubDTO from "../service/dto/TravelClubDTO";
import ClubMembership from "../../step1/entity/club/ClubMembership";
import RoleInClub from "../../step1/entity/club/RoleInClub";

export default class ClubServiceLogic  implements ClubService{


  clubMap: Map<string, TravelClub>;
  memberMap: Map<string,CommunityMember>;
  autoIdMap : Map<string, number>;

  constructor() {

    this.clubMap = MapStorage.getInstance().clubMap;
    this.memberMap = MapStorage.getInstance().memberMap;
    this.autoIdMap = MapStorage.getInstance().autoIdMap;
  }

  register(clubDTO: TravelClubDTO): void {

    const foundClub = this.retrieveByName(clubDTO.name);

    if (foundClub) {
      throw new Error('Club already exists with name:' + foundClub.name);
    }
    const club = clubDTO.toTravelClub();
    const className = TravelClub.name;

    if ('getId' in club || 'setAutoId' in club) {
      if (this.autoIdMap.get(className) === undefined) {
        this.autoIdMap.set(className, Number(club.getId()));
      }

      let keySequence = this.autoIdMap.get(className);

      if (keySequence !== undefined) {
        const autoId = keySequence.toString();

        club.setAutoId(autoId);
        this.autoIdMap.set(className, ++keySequence);
      }
    }

    this.clubMap.set(club.getId(), club);

    clubDTO.usId = club.getId();


  }

  find(clubId: string): TravelClubDTO | null {

    const foundClub = this.clubMap.get(clubId);

    if (!foundClub) {
      throw new Error('No such club with id --> ' + clubId);
    }
    return TravelClubDTO.fromEntity(foundClub);
  }

  findByName(name: string): TravelClubDTO {

    const foundClub = this.retrieveByName(name);

    if (!foundClub) {
      throw new Error('No such club with name --> ' + name);
    }
    return TravelClubDTO.fromEntity(foundClub);
  }

  modify(clubDTO: TravelClubDTO): void {

    const clubId = clubDTO.usId;

    const targetClub = this.clubMap.get(clubId);

    if (!targetClub) {
      throw new Error('No such club with id --> ' + clubDTO.usId);
    }

    if (clubDTO.name) {
      targetClub.name = clubDTO.name;
    }
    if (clubDTO.intro) {
      targetClub.intro = clubDTO.intro ;
    }

    this.clubMap.set(clubId, clubDTO.toTravelClub());
  }

  remove(clubId: string): void {

    if (!this.clubMap.get(clubId)) {
      throw new Error('No such club with id --> ' + clubId);
    }
    this.clubMap.delete(clubId);

  }

  addMembership(membershipDTO: ClubMembershipDTO): void {

    const memberId = membershipDTO.memberEmail;

    const foundMember = this.memberMap.get(memberId);

    if (!foundMember) {
      throw new Error('No such member with email --> ' + memberId);
    }

    const clubId = membershipDTO.clubId;
    const foundClub = this.clubMap.get(clubId);

    if (!foundClub) {
      throw new Error('No such club with id: ' + membershipDTO.clubId);
    }

    const membership = foundClub.membershipList.find((membership) => memberId === membership.memberEmail);

    if (membership) {
      throw new Error('Member already exists in the club --> ' + memberId);
    }

    // add membership
    const clubMembership = membershipDTO.toMembership();

    foundClub.membershipList.push(clubMembership);
    this.clubMap.set(clubId, foundClub);

    foundMember.membershipList.push(clubMembership);
    this.memberMap.set(memberId, foundMember);

  }

  findMembership(clubId: string, memberId: string): ClubMembershipDTO | null {
    const foundClub = this.clubMap.get(clubId);
    let membership = null;

    if (foundClub) {
      membership = this.getMembershipOfClub(foundClub, memberId);
    }

    return membership ? ClubMembershipDTO.fromEntity(membership) : membership;
  }

  modifyMembership(clubId: string, membershipDTO: ClubMembershipDTO): void {

    const targetEmail = membershipDTO.memberEmail;
    const newRole = membershipDTO.role;

    const targetClub = this.clubMap.get(clubId);

    if (targetClub) {
      const membershipOfClub = this.getMembershipOfClub(targetClub, targetEmail);

      membershipOfClub.role = newRole as RoleInClub;
    }

    const targetMember = this.memberMap.get(targetEmail);

    if (targetMember) {
      targetMember.membershipList.filter(membershipOfMember => membershipOfMember.clubId === clubId)
        .map(membershipOfMember => membershipOfMember.role = newRole);

      this.memberMap.set(targetMember.getId(), targetMember);
    }
  }


  removeMembership(clubId: string, memberId: string): void {
    const foundClub = this.clubMap.get(clubId);
    const foundMember = this.memberMap.get(memberId);

    if (foundClub && foundMember) {
      const clubMembership = this.getMembershipOfClub(foundClub, memberId);

      foundClub.membershipList.splice(clubMembership.clubId.indexOf(clubId), 1);
      foundMember.membershipList.splice(clubMembership.memberEmail.indexOf(memberId), 1);

      //this.clubMap.set(clubId, foundClub);
      //this.memberMap.set(foundMember.name, foundMember);
    }

  }

  retrieveByName(name:string ): TravelClub | null {

    const clubs =Array.from(this.clubMap.values());

    if(!clubs){
      return null;
    }
    return clubs.find(club => club.name === name) || null;
  }

  getMembershipOfClub(club: TravelClub, memberId: string): ClubMembership{

    for(const membership of club.membershipList){
      if (memberId === membership.memberEmail){
        return membership;
      }
    }
    throw new Error(`No such member[${memberId}] in club [${club.name}]`);
  }






}

