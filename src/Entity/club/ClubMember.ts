import Entity from "../Entity";
import Address from "./Address";
import ClubMembership from "./ClubMembership";

export default class ClubMember implements Entity{

    email: string = '';
    name: string = '';
    nickName:string = '';
    phoneNumber: string = '';
    birthDay:string = '';

    addresses: Address[] = [];
    membershipList : ClubMembership[] = [];

    
    constructor(email:string, name: string, phoneNumber: string ){
        this.email=email;
        this.name=name;
        this.phoneNumber=phoneNumber;
    }
    getId(): string {
        return this.email;
    }

    static new() {

        return new ClubMember('','','');
    }

    
    
}