import Comment from "../entity/board/Comment";
import CommentStore from "../store/CommentStore";
import MemoryMap from "./io/MemoryMap";


export default class CommentMapStore implements CommentStore{

  commentMap: Map<string, Comment>;

  constructor() {

    this.commentMap = MemoryMap.getInstance().commentMap;
  }

  create(comment: Comment): string {

    const targetComment = this.commentMap.get(comment.getId());

    if(targetComment){
      throw new Error(`\n> Comment Already exists :${targetComment}`);
    }
    this.commentMap.set(comment.getId(),comment);

    return comment.getId();
  }

  retrieve(commentId: string): Comment | null {

    return this.commentMap.get(commentId) || null;
  }

  retrieveByPostingId(postingId: string): Comment[] {

    const comments = Array.from(this.commentMap.values());
    return comments.filter(comment => comment.postingId === postingId);
  }

  update(comment: Comment): void {

    this.commentMap.set(comment.getId(), comment);
  }

  delete(commentId: string): void {

    this.commentMap.delete(commentId);
  }

  exists(commentId: string): boolean {

    return this.commentMap.get(commentId) !== undefined;
  }





}

