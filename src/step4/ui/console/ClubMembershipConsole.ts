import { question } from 'readline-sync';
import ClubMembership from '../../../step1/entity/club/ClubMembership';
import RoleInClub from '../../../step1/entity/club/RoleInClub';
import ClubService from '../../service/ClubService';
import ClubMembershipDTO from '../../service/dto/ClubMembershipDTO';
import TravelClubDTO from '../../service/dto/TravelClubDTO';
import ServiceLogicLifeCycler from "../../logic/ServiceLogicLifeCycler";
import ServiceLifeCycler from "../../service/ServiceLifeCycler";



class ClubMembershipConsole {

    currentClub: TravelClubDTO | null = null;

    clubService: ClubService;

    constructor() {
      //
      const serviceFactory: ServiceLifeCycler = ServiceLogicLifeCycler.shareInstance();

      this.clubService = serviceFactory.createClubService();
    }

    hasCurrentClub(): boolean {
      //
      return this.currentClub !== null;
    }

    requestCurrentClubName(): string | null {
      //
      let clubName = null;

      if (this.hasCurrentClub() && this.currentClub) {
        clubName = this.currentClub.name;
      }
      return clubName;
    }

    findClub(): void {
      //
      let clubFound = null;

      while (true) {
        //
        const clubName = question('\n club name to find (0.Membership menu): ');

        if (clubName === '0') {
          break;
        }

        try {
          clubFound = this.clubService.findByName(clubName);
          console.log('\n> Found club: ', clubFound);
          break;

        }
        catch (e: any) {
          console.error(`Error: ${e.message}`);
        }
        clubFound = null;
      }
      this.currentClub = clubFound;
    }

    add(): void {
      //
      if (!this.hasCurrentClub()) {
        //
        console.log('> No target club yet. Find target club first.');
        return;
      }

      const email = question('\n member\'s email to add (0.Member menu): ');

      if (email === '0') {
        return;
      }

      const memberRole = question(' President|Member: ');

      try {
        if (this.currentClub) {
          const clubMembership = new ClubMembership(this.currentClub.usId, email);
          const clubMembershipDto = new ClubMembershipDTO(clubMembership.clubId, clubMembership.memberEmail);

          clubMembershipDto.role = memberRole as RoleInClub;

          this.clubService.addMembership(clubMembershipDto);
          const finishAdd = question(`\n> Add a member[email:${email}] in club[name:${this.currentClub.name}]`);
        }
      }
      catch (e: any) {
        console.error(`Error: ${e.message}`);
      }

    }

    find(): void {
      //
      if (!this.hasCurrentClub()) {
        //
        console.log('> No target club yet. Find target club first.');
        return;
      }


      while (true) {
        const memberEmail = question('\n email to find (0.Membership menu): ');

        if (memberEmail === '0') {
          break;
        }

        try {
          if (this.currentClub) {
            const membershipDto = this.clubService.findMembershipIn(this.currentClub.usId, memberEmail);

            console.log('\n> Found membership information: ', membershipDto);
          }
        }
        catch (e: any) {
          console.error(`Error: ${e.message}`);
        }
      }
    }

    findOne(): ClubMembershipDTO | null {
      //
      let membershipDto = null;

      while (true) {
        const memberEmail = question('\n member email to find (0.Membership menu): ');

        if (memberEmail === '0') {
          break;
        }

        try {
          if (this.currentClub) {
            membershipDto = this.clubService.findMembershipIn(this.currentClub.usId, memberEmail);
            console.log('\n> Found memberhsip information: ', membershipDto);
          }
          break;
        }
        catch (e: any) {
          console.error(`Error: ${e.message}`);
        }
      }
      return membershipDto;
    }

    modify(): void {
      //
      if (!this.hasCurrentClub()) {
        //
        console.log('\n> No target club yet. Find target club first.');
        return;
      }

      const targetMembership = this.findOne();

      if (!targetMembership) {
        return;
      }

      const newRole = question('new President|Member (0.Memebrship menu, Enter. no change): ');

      if (newRole === '0') {
        return;
      }

      if (newRole) {
        targetMembership.role = newRole as RoleInClub;
      }
      const clubId = targetMembership.clubId;

      this.clubService.modifyMembership(clubId, targetMembership);

      const modifyMembership = this.clubService.findMembershipIn(clubId, targetMembership.memberEmail);

      console.log('\n> Modified membership information: ', modifyMembership);
    }

    remove(): void {
      //
      if (!this.hasCurrentClub()) {
        //
        console.log('> No target club yet. Find target club first.');
        return;
      }

      const targetMembership = this.findOne();

      if (!targetMembership) {
        return;
      }

      const confirmStr = question('Remove this member in the club? (Y:yes, N:no): ');

      if (confirmStr.toLowerCase() === 'y' || confirmStr.toLowerCase() === 'yes') {
        //
        console.log('\n> Removing a memberhsip -->' + targetMembership.memberEmail);
        if (this.currentClub) {
          this.clubService.removeMembership(this.currentClub.usId, targetMembership.memberEmail);
        }
      }
    }

}
export default ClubMembershipConsole;
