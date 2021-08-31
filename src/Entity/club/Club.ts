import AutoIdEntity from "../AutoIdEntity";
import ClubMembership from "./ClubMembership";

 export default class Club implements AutoIdEntity{

    private readonly MINIMUM_NAME_LENGTH: number = 3;
    private readonly MINIMUM_INTRO_LENGTH: number = 10;

    usId : string = '';
    name : string = '';
    intro: string = '';
    foundationDate: string = '';

    boardId: string = '';
    membershipList: ClubMembership[] = [];


    constructor(name:string, intro:string){
        this.name = name;
        this.intro = intro;
    }

     getId(): string {
         return this.usId;
     }
     setAutoId(autoId: string): void {
         
        this.usId=autoId;
     }

    getMembershipBy(email: string): ClubMembership|null {

        if(!email){
            return null;
        }

        let clubMembership;

        for (clubMembership of this.membershipList) {
            if(email === clubMembership.memberEmail){
                return clubMembership;
            }
        }
        return null;
    }

    setName(name:string) : void {
        if(name.length<this.MINIMUM_NAME_LENGTH){
            throw new Error(`\n> name should be longer than `+ this.MINIMUM_NAME_LENGTH);
        }
        this.name = name;
    }

    setIntro(intro:string): void {
        if(intro.length<this.MINIMUM_INTRO_LENGTH){
            throw new Error(`\n> intro should be longer than `+ this.MINIMUM_INTRO_LENGTH);
        }
        this.intro = intro;
    }
    
    
}