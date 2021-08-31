import ClubMember from "../entity/club/ClubMember";



interface MemberStore {
    //
    create(member: ClubMember): string;
    retrieve(email: string): ClubMember | null;
    retrieveByName(Name: string): ClubMember[];
    update(member: ClubMember): void;
    delete(email: string): void;

    exists(email: string): boolean;
}
export default MemberStore;
