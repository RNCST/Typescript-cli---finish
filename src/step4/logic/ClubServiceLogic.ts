import ClubMembership from '../../step1/entity/club/ClubMembership';
import RoleInClub from '../../step1/entity/club/RoleInClub';
import TravelClub from '../../step1/entity/club/TravelClub';
import ClubService from '../service/ClubService';
import ClubStore from '../store/ClubStore';
import MemberStore from '../store/MemberStore';
import ClubStoreMapLifeCycler from "../da.map/ClubStoreMapLifeCycler";
import TravelClubDTO from "../service/dto/TravelClubDTO";
import ClubMembershipDTO from "../service/dto/ClubMembershipDTO";
import {question} from "readline-sync";


class ClubServiceLogic implements ClubService {
    //
    clubStore: ClubStore;
    memberStore: MemberStore;

    constructor() {
      //
      this.clubStore = ClubStoreMapLifeCycler.getInstance().requestClubStore();
      this.memberStore = ClubStoreMapLifeCycler.getInstance().requestMemberStore();
    }

    register(clubDTO: TravelClubDTO): void {
      //
      const foundClub = this.clubStore.retrieveByName(clubDTO.name);

      if (foundClub) {
        throw new Error('Club already exists with name: ' + clubDTO.name);
      }
      const club = clubDTO.toTravelClub();
      const clubId = this.clubStore.create(club);

      clubDTO.usId = clubId;
    }

    find(clubId: string): TravelClubDTO {
      //
      const foundClub = this.clubStore.retrieve(clubId);

      if (!foundClub) {
        throw new Error('No such club with name: ' + clubId);
      }
      return TravelClubDTO.fromEntity(foundClub);

    }

    findByName(name: string): TravelClubDTO {
      //
      const foundClub = this.clubStore.retrieveByName(name);

      if (!foundClub) {
        throw new Error('No such club with name: ' + name);
      }
      return TravelClubDTO.fromEntity(foundClub);

    }

    modify(clubDto: TravelClubDTO): void {
      //
      const clubNameOverLabCheck = this.clubStore.retrieveByName(clubDto.name);

      if (clubNameOverLabCheck) {
        throw new Error('Club already exists with name: ' + clubDto.name);
      }

      const clubIdCheck = this.clubStore.retrieve(clubDto.usId);

      if (!clubIdCheck) {
        throw new Error('No such club with id: ' + clubDto.usId);
      }

      // if (clubDto.name) {
      //   targetClub.name = clubDto.name
      // }
      // if (clubDto.intro) {
      //   targetClub.intro = clubDto.intro;
      // }
      console.log(clubIdCheck.name + '=========> ' + clubDto.name);
      console.log(clubIdCheck.intro + '=========> ' + clubDto.intro);
      question('modified info here ')

      this.clubStore.update(clubDto.toTravelClub());
    }

    remove(clubId: string): void {
      //
      if (!this.clubStore.exists(clubId)) {
        throw new Error('No such club with id: ' + clubId);
      }
      this.clubStore.delete(clubId);
    }

    // Membership
    addMembership(membershipDto: ClubMembershipDTO): void {
      //
      const memberId = membershipDto.memberEmail;

      const foundMember = this.memberStore.retrieve(memberId);

      if (!foundMember) {
        throw new Error('No such member with email: ' + memberId);
      }

      const foundClub = this.clubStore.retrieve(membershipDto.clubId);

      if (!foundClub) {
        throw new Error('No such club with id: ' + membershipDto.clubId);
      }

      const membership = foundClub.membershipList.find((membership) =>
        memberId === membership.memberEmail);

      if (membership) {
        throw new Error('Member already exists in the club -->' + memberId);
      }

      // add membership
      const clubMembership = membershipDto.toMembership();

      foundClub.membershipList.push(clubMembership);
      this.clubStore.update(foundClub);

      foundMember.membershipList.push(clubMembership);
      this.memberStore.update(foundMember);
    }

    findMembershipIn(clubId: string, memberId: string): ClubMembershipDTO | null {
      //
      const foundClub = this.clubStore.retrieve(clubId);
      let membership = null;

      if (foundClub) {
        membership = this.getMembershipIn(foundClub, memberId);
      }

      return membership ? ClubMembershipDTO.fromEntity(membership) : membership;
    }

    modifyMembership(clubId: string, membershipDto: ClubMembershipDTO): void {
      //
      const targetEmail = membershipDto.memberEmail;
      const newRole = membershipDto.role;

      const targetClub = this.clubStore.retrieve(clubId);

      if (targetClub) {
        const membershipOfClub = this.getMembershipIn(targetClub, targetEmail);

        membershipOfClub.role = newRole as RoleInClub;
        this.clubStore.update(targetClub);
      }

      const targetMember = this.memberStore.retrieve(targetEmail);

      if (targetMember) {
        targetMember.membershipList.filter(membershipOfMember => membershipOfMember.clubId === clubId)
                                   .map(membershipOfMember => membershipOfMember.role = newRole);

        this.memberStore.update(targetMember);
      }

    }

    removeMembership(clubId: string, memberId: string): void {
      //
      const foundClub = this.clubStore.retrieve(clubId);
      const foundMember = this.memberStore.retrieve(memberId);

      if (foundClub && foundMember) {
        const clubMembership = this.getMembershipIn(foundClub, memberId);

        foundClub.membershipList.splice(clubMembership.clubId.indexOf(clubId), 1);
        foundMember.membershipList.splice(clubMembership.memberEmail.indexOf(memberId), 1);

        this.clubStore.update(foundClub);
        this.memberStore.update(foundMember);
      }

    }

    private getMembershipIn(club: TravelClub, memberEmail: string): ClubMembership {
      //
      for (const membership of club.membershipList) {
        if (memberEmail === membership.memberEmail) {

          return membership;
        }
      }
      throw new Error(`No such member[${memberEmail}] in club [${club.name}]`);
    }

}
export default ClubServiceLogic;
