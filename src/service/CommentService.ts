import CommentDTO from "./dto/CommentDTO";

export default interface CommentService {

  register(postingId: string, commentDTO: CommentDTO): string;
  find(commentId: string):CommentDTO;
  findByPostingId(postingId: string): CommentDTO[];
  modify(commentDTO : CommentDTO): void;
  remove(commentId:string):void ;
}

