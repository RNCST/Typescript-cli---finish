import DateUtil from "../../util/DateUtil";
import Entity from "../Entity";

export default class Board implements Entity{


    clubId: string ='';
    sequence: number = 0;
    name: string = '';
    adminEmail: string = '';
    createDate: string = '';

    constructor(clubId: string, name: string, adminEmail: string){

        this.clubId = clubId;
        this.name = name;
        this.adminEmail = adminEmail;
        this.createDate = DateUtil.today();

    }   
    getId(): string {

        return this.clubId;
    }

    static new() {


    return new Board('','','');
    }

    get nextPostingId(): string {
        return `${this.clubId} + ${++this.sequence}`;
    }

    
}