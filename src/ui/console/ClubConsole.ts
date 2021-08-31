import { question } from "readline-sync";
import Club from "../../entity/club/Club";
import ServiceLogicLifeCycler from "../../logic/ServiceLogicLifeCycler";
import ClubService from "../../service/ClubService";
import TravelClubDTO from "../../service/dto/TravelClubDTO";

export class ClubConsole{
    clubService: ClubService;

    constructor() {
      //
      this.clubService = ServiceLogicLifeCycler.shareInstance().createClubService();
    }

    register(): void {
      //
      const clubName = question('\n club name (0.Club Menu): ');

      if (clubName === '0') {
        return;
      }

      const clubIntro = question(' club intro (0.Club menu): ');

      if (clubIntro === '0') {
        return;
      }

      try {
        //
        const club = new Club(clubName, clubIntro);
        const clubDto = new TravelClubDTO(clubName, clubIntro);

        this.clubService.register(clubDto);
        console.log('\n> Registered Club: ', clubDto);
      }
      catch (e) {
        if(e instanceof Error)
        //
        console.error(`Error: ${e.message}`);
      }
    }

    find(): TravelClubDTO | null {
      //
      let clubFound = null;

      while (true) {
        //
        const clubName = question('\n club name to find (0.Club menu): ');

        if (clubName === '0') {
          break;
        }

        try {
          clubFound = this.clubService.findByName(clubName);
          console.log('\n> Found club: ', clubFound);
        }
        catch (e) {
          if(e instanceof Error)
          console.error(`Error: ${e.message}`);
        }
      }

      return clubFound;
    }

    findOne(): TravelClubDTO | null {
      //
      let clubFound = null;

      while (true) {
        //
        const clubName = question('\n club name to find (0.Club menu): ');

        if (clubName === '0') {
          break;
        }

        try {
          clubFound = this.clubService.findByName(clubName);
          console.log('\n> Found club: ', clubFound);
          break;
        }
        catch (e) {
          if(e instanceof Error)
          console.error(`Error: ${e.message}`);
        }
      }
      return clubFound;
    }

    modify(): void {
      //
      const targetClub = this.findOne();

      if (!targetClub) {
        return;
      }

      const newName = question('\n New club name (0.Club menu, Enter. no change): ');

      if (newName === '0') {
        return;
      }
      if (newName) {
        targetClub.name = newName;
      }

      const newIntro = question(' New club intro (Enter. no change): ');

      if (newIntro) {
        targetClub.intro = newIntro;
      }

      try {
        this.clubService.modify(targetClub);
        console.log('\n> Modified club: ', targetClub);
        question();
      }
      catch (e) {
        if(e instanceof Error)
        console.error(`Error: ${e.message}`);
      }
    }

    remove(): void {
      //
      const targetClub = this.findOne();

      if (!targetClub) {
        return;
      }

      const confirmStr = question('Removing this club? (Y:yes, N:no): ');

      if (confirmStr.toLowerCase() === 'y' || confirmStr.toLowerCase() === 'yes') {
        this.clubService.remove(targetClub.usId);
        console.log('\n> Removing a club --> ' + targetClub.name);
      }
      else {
        console.log('\n> Remove cancelled, your club is safe. --> ' + targetClub.name);
      }
    }

}