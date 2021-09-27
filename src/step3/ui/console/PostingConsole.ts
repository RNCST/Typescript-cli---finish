import BoardDTO from "../../service/dto/BoardDTO";
import BoardService from "../../service/BoardService";
import PostingService from "../../service/PostingService";
import ServiceLogicLifeCycler from "../../logic/ServiceLogicLifeCycler";
import {question} from "readline-sync";
import PostingDTO from "../../service/dto/PostingDTO";

export default class PostingConsole {

  currentBoard: BoardDTO |null =null;


  boardService: BoardService;
  postingService: PostingService;

  constructor() {

    const serviceFactory = ServiceLogicLifeCycler.shareInstance();

    this.boardService = serviceFactory.createBoardService();
    this.postingService = serviceFactory.createPostingService();
  }

  hasCurrentBoard(): boolean {

    return this.currentBoard !== null;
  }

  requestCurrentBoardName(): string | null {

    if( this.currentBoard){
      return this.currentBoard.name;
    }else {
      return null;
    }
  }

  findBoard() : void {

    while (true) {
      const clubName = question('input BoardName to find( 0.Previous');
      if (clubName === '0'){
        break;
      }
      try{
        let boardFound = this.boardService.findByClubName(clubName);
        console.log('\n> Found board : ', boardFound);
        boardFound = null;
        break;
      }
      catch (e:any) {
        console.error(`Error: ${e.message}`);
      }
    }
  }

  register(): void {

    if(!this.currentBoard){

      console.log(`\n> No taret board, find board first`);
      return;
    }

    while (true) {
      const postingTitle = question('posting title (0.Previous')

      if(postingTitle ==='0'){
        return;
      }
      const writerEmail = question('posting writerEmail: ');
      const postingContents = question('posting contents');

      try {
        const postingDTO = new PostingDTO(postingTitle,writerEmail,postingContents);

        postingDTO.usId = this.postingService.register(this.currentBoard.boardId, postingDTO);
        console.log('\n> Registered a posting --> ', postingDTO);

      }catch (e:any){
        console.error(`ERROR : ${e.message}`);
      }
    }
  }

  findByBoardId(): void {

    if (!this.currentBoard) {
      //
      console.log('\n> No target club yet. Find target club first.');
      return;
    }

    try {
      const postings = this.postingService.findByBoardId(this.currentBoard.boardId);

      let index = 0;

      for (const postingDto of postings) {
        console.log(`[${index}] , ` + postingDto.postingDTOInfo);
        index++;
      }
    }
    catch (e:any) {
      console.error(`Error: ${e.message}`);
    }

  }

  find():void {

    if (!this.currentBoard) {
      //
      console.log('> No target club yet. Find target club first.');
      return;
    }

    let postingDto = null;

    while (true) {
      const postingId = question('\n posting id to find (0.Posting menu): ');

      if (postingId === '0') {
        break;
      }

      try {
        postingDto = this.postingService.find(postingId);
        console.log('\n> Found posting: ', postingDto);
      }
      catch (e:any) {
        console.error(`Error: ${e.message}`);
      }
    }
  }

  findOne():PostingDTO | null{

    if (!this.currentBoard) {
      //
      console.log('> No target club yet. Find target club first.');
      return null;
    }

    let postingDto = null;

    while (true) {
      const postingId = question('\n posting id to find (0.Posting menu): ');

      if (postingId === '0') {
        break;
      }

      try {
        postingDto = this.postingService.find(postingId);
        console.log('\n> Found posting: ', postingDto);
        break;
      }
      catch (e:any) {
        console.error(`Error: ${e.message}`);
      }
      postingDto = null;
    }
    return postingDto;
  }

  modify(): void {
    const targetPosting = this.findOne();

    if (!targetPosting) {
      return;
    }

    const newTitle = question('\n new posting title (0.Posting menu, Enter. no change): ');

    if (newTitle === '0') {
      return;
    }
    targetPosting.title = newTitle;

    const contents = question(' new posting contents (Enter. no change): ');
    targetPosting.contents = contents;

    try {
      this.postingService.modify(targetPosting);
      console.log('\n> Modified Posting : ', targetPosting);
    }
    catch (e:any) {
      console.error(`Error: ${e.message}`);
    }
  }

  remove(): void {

    const targetPosting = this.findOne();

    if (!targetPosting) {
      return;
    }

    const confirmStr = question('Remove this posting in the board? (Y:yes, N:no): ');

    if (confirmStr.toLowerCase() === 'y' || confirmStr.toLowerCase() === 'yes') {
      //
      console.log('\n> Removing a posting -->' + targetPosting.title);
      this.postingService.remove(targetPosting.usId);
    }
    else {
      console.log('\n> Remove cancelled, the posting is safe --> ' + targetPosting.title);
    }
  }
}

