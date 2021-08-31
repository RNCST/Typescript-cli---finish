import DateUtil from "../../util/DateUtil";
import RoleInClub from "./RoleInClub";

export default class ClubMembership {

    clubId: string = '';
    memberEmail: string ='';
    role : RoleInClub = RoleInClub.Member;
    joinDate : string = '';

    constructor(clubId:string, memberEmail:string){
        this.clubId = clubId;
        this.memberEmail = memberEmail;

        this.joinDate = DateUtil.today();
    }
}