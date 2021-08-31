import CommentService from "../service/CommentService";
import CommentDTO from "../service/dto/CommentDTO";
import PostingStore from "../store/PostingStore";
import CommentStore from "../store/CommentStore";
import ClubStoreMapLifeCycler from "../da.map/ClubStoreMapLifeCycler";

export default class CommentServiceLogic implements CommentService{

  popstingStore: PostingStore;
  commentStore: CommentStore;

  constructor() {

    this.popstingStore = ClubStoreMapLifeCycler.getInstance().requestPostingStore();
    this.commentStore = ClubStoreMapLifeCycler.getInstance().requestCommentStore();
  }
  register(postingId: string, commentDTO: CommentDTO): string {

    const foundPosting = this.popstingStore.retrieve(postingId);

    if (!foundPosting){
      throw new Error('No such posting --> '+ postingId);
    }

    return this.commentStore.create(commentDTO.toCommentInPosting(foundPosting));
  }
  find(commentId: string): CommentDTO {

    const foundComment = this.commentStore.retrieve(commentId);

    if(!foundComment){
      throw new Error(`No such comment with id : ${commentId}`);
    }
    return CommentDTO.fromEntity(foundComment);
  }

  findByPostingId(postingId: string): CommentDTO[] {

    const foundPosting = this.popstingStore.retrieve(postingId);

    if(!foundPosting){
      throw new Error(`No such posting with id --> ` + postingId);
    }
    return this.commentStore.retrieveByPostingId(postingId)
      .map(comment => CommentDTO.fromEntity(comment));
  }

  modify(commentDTO: CommentDTO): void {

    const commentId = commentDTO.usId;
    const targetComment = this.commentStore.retrieve(commentId);
    if(!targetComment){
      throw new Error(`No such comment with id : ${commentId}`);
    }
    if(commentDTO.contents){
      targetComment.contents = commentDTO.contents;
    }

    this.commentStore.update(targetComment);
  }

  remove(commentId: string): void {

    if(!this.commentStore.retrieve(commentId)){
      throw new Error(`No such comment with id: ${commentId}`);
    }
    this.commentStore.delete(commentId);
  }


}

