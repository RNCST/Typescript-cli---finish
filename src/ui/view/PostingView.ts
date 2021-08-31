import CommentService from "../../service/CommentService";
import PostingDTO from "../../service/dto/PostingDTO";

import {question} from "readline-sync";
import CommentDTO from "../../service/dto/CommentDTO";
import ServiceLogicLifeCycler from "../../logic/ServiceLogicLifeCycler";

export default class PostingView {

  posting: PostingDTO;
  commentService: CommentService;

  constructor(inputPosting: PostingDTO) {
    this.posting = inputPosting;
    this.commentService
      = ServiceLogicLifeCycler.shareInstance().createCommentService();
  }

  showMenu(): void {
    //
    let inputNumber = 0;
    while (true) {
      this.displayMainMenu();
      inputNumber = this.selectMenu();
      switch (inputNumber) {
        case 1:
          this.registerComment();
          break;
        case 2:
          this.findAllComments();
          break;
        case 0:
          return;
        default:
          console.log('Choose Again!');
      }
    }
  }

  displayMainMenu(): void {
    console.clear();
    console.log('......................');
    console.log(' [Posting Detail]');
    console.log('   title: ' + this.posting.title);
    console.log('   writer: ' + this.posting.writerEmail);
    console.log('   contents: ' + this.posting.contents);
    console.log('   written date: ' + this.posting.writtenDate);
    console.log('......................');
    console.log(' 1. Register a comment');
    console.log(' 2. Find All comments');
    console.log('......................');
    console.log(' 0. Previous');
    console.log('......................');
  }

  registerComment(): void {

    const writer = question('comment writer : ');
    const contents = question('comment contents: ');
    const commentDTO = new CommentDTO(writer, contents);
    commentDTO.usId = this.commentService.register(this.posting.usId,
      commentDTO);
    console.log(`'\n> Registered a comment --> `, commentDTO);
  }

  findAllComments(): void {

    let comments = this.commentService.findByPostingId(this.posting.usId);
    let inputNumber = 0;
    console.clear();
    console.log('......................');
    console.log(' [Posting : ' + this.posting.title + '] ');
    console.log('......................');
    console.log('  Comments ==>');
    for (let idx in comments) {
      console.log(' ' + comments[idx].contents);
    }
    console.log('......................');
    console.log(' 0. Previous');
    console.log('......................');
    inputNumber = this.selectKey();
    if (inputNumber == 0) {
      return;
    }
  }

  selectKey(): number {
    const answer = question('select number : ');
    const key = parseInt(answer);
    if (key == 0) {
      return key;
    } else {
      console.log(`it\'s a invalid number --> ${key}`)
      return -1;
    }

  }

  selectMenu():number {
    //
    const answer = question('Select number : ');
    const menuNumber = parseInt(answer);

    if (menuNumber >= 0 && menuNumber <= 2) {
      return menuNumber;
    } else {
      console.log('it\'s a invalid number -> ' + menuNumber);
      return -1;
    }
  }
}

