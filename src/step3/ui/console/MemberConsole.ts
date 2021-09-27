import MemberService from "../../service/MemberService";
import ServiceLogicLifeCycler from "../../logic/ServiceLogicLifeCycler";
import {question} from "readline-sync";
import MemberDTO from "../../service/dto/MemberDTO";

export default class MemberConsole {

  memberService: MemberService;

  constructor() {

    this.memberService = ServiceLogicLifeCycler.shareInstance().createMemberService();
  }

  register(): void {

    while (true) {

      const email = question('\n new member\'s email (0.Member menu): ');

      if (email === '0') {
        return;
      }

      const name = question(' name: ');
      const phoneNumber = question(' phone number: ');
      const nickName = question(' nickname: ');
      const birthday = question(' birthday(yyyy.mm.dd): ');

      try {
        const newMember = new MemberDTO(email, name, phoneNumber);

        newMember.nickName = nickName;
        newMember.birthDay = birthday;

        this.memberService.register(newMember);
        console.log('\n> Registered member: ', newMember);
      }
      catch (e:any) {
        console.error(`Error: ${e.message}`);
      }
    }
  }

  find(): void{

    while (true) {
      //
      const email = question('\n member\'s email (0.Member menu): ');

      if (email === '0') {
        return;
      }

      try {
        const memberFound = this.memberService.find(email);

        console.log('\n> Found member: ', memberFound);
      }
      catch (e:any) {
        console.error(`Error: ${e.message}`);
      }
    }
  }

  findOne(): MemberDTO | null {

    let memberFound = null;

    while (true) {
      //
      const email = question('\n member\'s email to find (0.Member menu): ');

      if (email === '0') {
        return null;
      }

      try {
        memberFound = this.memberService.find(email);
        console.log('\n> Found member : ', memberFound);
        break;

      }
      catch (e:any) {
        console.error(`Error: ${e.message}`);
      }
    }

    return memberFound;


  }

  modify(): void {

    const targetMember = this.findOne();

    if (!targetMember) {
      return;
    }

    const newName = question('\n new name (Enter. no change): ');
    const newPhoneNumber = question(' new phone number (Enter. no change): ');
    const newNickName = question(' new nickname (Enter. no change): ');
    const newBirthDay = question(' new birthday(yyyy.mm.dd) (Enter. no change: )');

    try {
      const newMember = new MemberDTO(targetMember.email, newName, newPhoneNumber);

      newMember.nickName = newNickName;
      newMember.birthDay = newBirthDay;

      this.memberService.modify(newMember);
      console.log('\n> Modified member: ', newMember);
    }
    catch (e:any) {
      console.error(`Error: ${e.message}`);
    }
  }

  remove(): void {

    const targetMember = this.findOne();

    if (!targetMember) {
      return;
    }

    const confirmStr = question('Remove this club? (Y:yes, N:no): ');

    if (confirmStr.toLowerCase() === 'y' || confirmStr.toLowerCase() === 'yes') {
      console.log('\n> Removing a club --> ' + targetMember.name);
      this.memberService.remove(targetMember.email);
    }
    else {
      console.log('\n> Remove cancelled, your club is safe. --> ' + targetMember.name);
    }
  }


}

