export default class Posting {

    usId: string = '';
    title: string = '';
    writerEmail : string = '';
    content:string = '';
    writtenDate: string = '';
    readCount: number = 0;

    constructor(postingId: string, boardId: string, title: string, writerEmail: string, contents: string) {
        this.usId = postingId;
        this.title = title;
        this.writerEmail = writerEmail;
        this.contents = contents;
        this.boardId = boardId;
        this.writtenDate = DateUtil.today();
      }
}