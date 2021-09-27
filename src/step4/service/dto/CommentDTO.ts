import DateUtil from "../../../util/DateUtil";
import Comment from "../../../step1/entity/board/Comment";
import Posting from "../../../step1/entity/board/Posting";

export default class CommentDTO {

  usId: string ='';
  writer: string = '';
  contents: string = '';
  writtenDate: string = '';

  constructor(writer: string, contents: string) {

    this.writer = writer;
    this.contents = contents;
    this.writtenDate = DateUtil.today();
  }

  static fromEntity(comment: Comment): CommentDTO {

    const commentDTO = new CommentDTO(
      comment.writer, comment.contents);
    commentDTO.writtenDate = comment.writtenDate;
    commentDTO.usId = comment.usId;
    return commentDTO;
  }

  get commentDTOInfo(): string {

    return `Comment id : ${this.usId}, writer : ${this.writer},
    contents: ${this.contents}, written date: ${this.writtenDate}`
  }
  toCommentInPosting(posting: Posting): Comment{

    const comment = new Comment(posting.nextCommentId, this.writer, this.contents, posting.getId());
    comment.writtenDate = this.writtenDate;
    return comment;
  }
}

