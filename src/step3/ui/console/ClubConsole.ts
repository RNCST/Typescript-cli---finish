import ClubService from "../../service/ClubService";
import ServiceLogicLifeCycler from "../../logic/ServiceLogicLifeCycler";
import TravelClubDTO from "../../service/dto/TravelClubDTO";
import {question} from "readline-sync";
import TravelClub from "../../../step1/entity/club/TravelClub";

export default class ClubConsole {

  clubService: ClubService;

  constructor() {

    this.clubService = ServiceLogicLifeCycler.shareInstance().createClubService();
  }

  register(): void {

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
      const club = new TravelClub(clubName, clubIntro);
      const clubDTO = new TravelClubDTO(club.name, club.intro);

      this.clubService.register(clubDTO);
      console.log('\n> Registered Club: ', clubDTO);
    }
    catch (e:any) {
      //
      console.error(`Error: ${e.message}`);
    }
  }
  find():void {

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
      catch (e:any) {
        console.error(`Error: ${e.message}`);
      }
    }
  }

  findOne(): TravelClubDTO | null{
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
      catch (e:any) {
        console.error(`Error: ${e.message}`);
      }
    }
    return clubFound;
  }

  modify(): void {

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
    }
    catch (e:any) {
      console.error(`Error: ${e.message}`);
    }
  }

  remove(): void {

    const targetClub = this.findOne();

    if (!targetClub) {
      return;
    }

    const confirmStr = question('Removing this club? (Y:yes, N:no): ');

    if (confirmStr.toLowerCase() === 'y' || confirmStr.toLowerCase() === 'yes') {
      console.log('\n> Removing a club --> ' + targetClub.name);
      this.clubService.remove(targetClub.usId);
    }
    else {
      console.log('\n> Remove cancelled, your club is safe. --> ' + targetClub.name);
    }
  }



}

