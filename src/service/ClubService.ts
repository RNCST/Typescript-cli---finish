import TravelClubDTO from "./dto/TravelClubDTO";
import ClubMembershipDTO from "./dto/ClubMembershipDTO";


interface ClubService {
    //
    register(clubDTO: TravelClubDTO): void;
    find(clubId: string): TravelClubDTO | null;
    findByName(name: string): TravelClubDTO;
    modify(clubDTO: TravelClubDTO): void;
    remove(clubId: string): void;

    addMembership(membershipDTO: ClubMembershipDTO): void;
    findMembershipIn(clubId: string, memberId: string): ClubMembershipDTO | null;
    modifyMembership(clubId: string, membershipDTO: ClubMembershipDTO): void;
    removeMembership(clubId: string, memberId: string): void;
}
export default ClubService;
