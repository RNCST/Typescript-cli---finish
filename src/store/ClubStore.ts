import Club from "../entity/club/Club";

interface ClubStore {
    //
    create(club: Club): string;
    retrieve(clubId: string): Club | null;
    retrieveByName(name: string): Club | null;
    update(club: Club): void;
    delete(clubId: string): void;

    exists(clubId: string):boolean;

}
export default ClubStore;
