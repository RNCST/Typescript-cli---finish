import DateUtil from "../../../util/DateUtil";
import Posting from "../../../step1/entity/board/Posting";
import SocialBoard from "../../../step1/entity/board/SocialBoard";

export default class PostingDTO {

  usId: string = '';
  title: string = '';
  writerEmail: string = '';
  contents: string = '';
  writtenDate: string = '';
  readCount: number = 0;


  constructor(title: string, writerEmail: string, contents: string) {
    this.title = title;
    this.writerEmail = writerEmail;
    this.contents = contents;
    this.writtenDate = DateUtil.today();
  }
  get postingDTOInfo(): string {

    return `PostingId, title, writer email, readCount, written date , contents =>
    \n
    ${this.usId},${this.title},${this.writerEmail},${this.readCount},${this.writtenDate},${this.contents}
    `;
  }
  static fromEntity(posting: Posting): PostingDTO {

    const postingDTO = new PostingDTO(
      posting.title,posting.writerEmail,posting.contents
    )

    postingDTO.usId = posting.usId;
    postingDTO.writtenDate = posting.writtenDate;
    postingDTO.readCount = posting.readCount;

    return postingDTO;
  }

  toPostingInBoard(board: SocialBoard):Posting {

    const posting = new Posting(board.nextPostingId, board.getId(), this.title,
    this.writerEmail,this.contents);

    posting.writtenDate = this.writtenDate;
    posting.readCount = this.readCount;

    return posting;
  }

  toPostingIn(postingId: string, boardId: string): Posting{

    const board =SocialBoard.new();
    const posting = new Posting(postingId, boardId, this.title, this.writerEmail, this.contents)

    posting.writtenDate = this.writtenDate;
    posting.readCount = this.readCount;

    return posting;
  }
}

