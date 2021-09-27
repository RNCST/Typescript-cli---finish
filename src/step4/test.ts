import TravelClubDTO from "./service/dto/TravelClubDTO";
import MemberDTO from "./service/dto/MemberDTO";
import ServiceLogicLifeCycler from "./logic/ServiceLogicLifeCycler";
import ClubMembershipDTO from "./service/dto/ClubMembershipDTO";
import MainMenu from "./ui/menu/MainMenu";
import {question} from "readline-sync";
import BoardDTO from "./service/dto/BoardDTO";
import SocialBoard from "../step1/entity/board/SocialBoard";
import PostingDTO from "./service/dto/PostingDTO";


const lifeCycler = ServiceLogicLifeCycler.shareInstance();
const clubService = lifeCycler.createClubService();
const memberService = lifeCycler.createMemberService();

//sampleClub sampleMember,..
for (let i = 1; i < 10; i++) {
    let sampleMemberDTO = new MemberDTO
    (`test${i}@test${i}.co.kr`, `tm${i}`, `010-0000-000${i}`);
    let sampleClubDTO = new TravelClubDTO
    (`test${i}`, `test${i} intro intro`);
    memberService.register(sampleMemberDTO);
    clubService.register(sampleClubDTO);
    // console.log(`sample ${i} save ok `);
}
console.log('sampleClub add ok ')
//sampleClubMembership...
for (let i = 0; i < 9; i++) {
    clubService.addMembership(new ClubMembershipDTO(`${i}`, `test1@test1.co.kr`));
    clubService.addMembership(new ClubMembershipDTO(`${i}`, `test2@test2.co.kr`));
}
console.log('sampleClubMembership add ok ')

//sampleBoard...
for (let i = 0; i < 9; i++) {
    let sampleBoard = new SocialBoard(`${i}`, `boardName${i}`, 'test1@test1.co.kr');

    let sampleBoardDTO = new BoardDTO(sampleBoard.clubId, sampleBoard.name, sampleBoard.adminEmail);

    ServiceLogicLifeCycler.shareInstance().createBoardService().register(sampleBoardDTO);
}
console.log('sampleBoard add ok ')

//samplePosting
for (let i = 0; i < 9; i++) {
    let samplePostingDTO1 = new PostingDTO(`samplePostingTitle-${i}`,'test1@test1.co.kr'
        ,`sampleContents-${i}`);
    let samplePostingDTO2 = new PostingDTO(`samplePostingTitle-${i}`,'test2@test2.co.kr'
        ,`sampleContents-${i}`);
    ServiceLogicLifeCycler.shareInstance().createPostingService().register(
        `${i}`,samplePostingDTO1 );
    ServiceLogicLifeCycler.shareInstance().createPostingService().register(
        `${i}`,samplePostingDTO2 );
}
console.log('samplePosting add ok ');

console.log('\n clubName = club0~8 ')
console.log('\n memberEmail test1@test1.co.kr, test2@test2.co.kr')
question('all sample ok "enter" to start');
// aa
const mainMenu = new MainMenu();

mainMenu.showMenu();
