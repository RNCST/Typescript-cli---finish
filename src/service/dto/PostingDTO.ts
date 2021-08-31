import Board from "../../entity/board/Board";
import Posting from "../../entity/board/Posting";
import DateUtil from "../../util/DateUtil";



class PostingDTO {
    //
    usId: string = '';
    title: string = '';
    writerEmail: string = '';
    contents: string = '';
    writtenDate: string = '';
    readCount: number = 0;

    constructor(title: string, writerEmail: string, contents: string) {
      //
      this.title = title;
      this.writerEmail = writerEmail;
      this.contents = contents;
      this.writtenDate = DateUtil.today();
    }

    static fromEntity(posting: Posting): PostingDTO {
      //
      const postingDto = new PostingDTO(posting.title, posting.writerEmail, posting.contents);

      postingDto.usId = posting.usId;
      postingDto.writtenDate = posting.writtenDate;
      postingDto.readCount = posting.readCount;

      return postingDto;
    }

    get postingDtoInfo(): string {
      //
      return `Posting id: ${this.usId}, title: ${this.title}, writer email: ${this.writerEmail}, read count: ${this.readCount}, written date: ${this.writtenDate}, contents: ${this.contents}`;
    }

    toPostingInBoard(board: Board): Posting {
      //
      const posting = new Posting(board.nextPostingId, board.getId(), this.title, this.writerEmail, this.contents);

      posting.writtenDate = this.writtenDate;
      posting.readCount = this.readCount;

      return posting;
    }

    toPostingIn(postingId: string, boardId: string): Posting {
      //
      const board = Board.new();
      const posting = new Posting(postingId, boardId, this.writerEmail, this.title, this.contents);

      posting.writtenDate = this.writtenDate;
      posting.readCount = this.readCount;

      return posting;
    }

}
export default PostingDTO;
