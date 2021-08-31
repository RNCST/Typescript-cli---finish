
import MemoryMap from "./io/MemoryMap";
import ClubStore from "../store/ClubStore";
import {question} from "readline-sync";
import Club from "../entity/club/Club";

export default class ClubMapStore implements ClubStore {

  clubMap: Map<string, Club>;
  autoIdMap: Map<string, number>;

  constructor() {

    this.clubMap = MemoryMap.getInstance().clubMap;
    this.autoIdMap = MemoryMap.getInstance().autoIdMap;

  }

  create(club: Club): string {

    const targetClub = this.clubMap.get(club.getId());

    if (targetClub) {
      throw new Error(`Club already exists with id : ${targetClub}`);
    }

    const className = Club.name;

    try {
      if (this.autoIdMap.get(className) === undefined) {
        this.autoIdMap.set(className, Number(club.getId()));
      }
      let keySequence = this.autoIdMap.get(className);
      if (keySequence !== undefined) {
        const autoId = keySequence.toString();
        club.setAutoId(autoId);

        this.autoIdMap.set(className, ++keySequence);

      }
      this.clubMap.set(club.getId(), club);

    } catch (e) {
      if(e instanceof Error)
      console.error(`Error => ${e.message}`);
    }

    return club.getId();
  }

  retrieve(clubId: string): Club | null {

    return this.clubMap.get(clubId) || null;
  }

  retrieveByName(name: string): Club | null {

    const clubs = Array.from(this.clubMap.values());

    if (!clubs.length) {
      return null;
    }

    return clubs.find(club => club.name === name) || null;
  }

  delete(clubId: string): void {

    this.clubMap.delete(clubId);
  }

  update(club: Club): void {

    this.clubMap.set(club.getId(), club);
  }

  exists(clubId: string): boolean {
    return this.clubMap.get(clubId) !== undefined;
  }


}

