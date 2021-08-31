import DateUtil from "../../util/DateUtil";
import Entity from "../Entity";

export default class Posting implements Entity{

    usId: string = '';
    title: string = '';
    writerEmail : string = '';
    contents:string = '';
    writtenDate: string = '';
    readCount: number = 0;

    boardId: string ='';
    sequence: number = 0;

    constructor(postingId: string, boardId: string, title: string, writerEmail: string, contents: string) {
        this.usId = postingId;
        this.title = title;
        this.writerEmail = writerEmail;
        this.contents = contents;
        this.boardId = boardId;
        this.writtenDate = DateUtil.today();
      }
    getId(): string {
        return this.boardId;
    }

      get nextCommentId(): string {


        return `${this.usId} : ${this.sequence++}`;
      }
}