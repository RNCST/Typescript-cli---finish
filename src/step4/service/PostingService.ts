import PostingDTO from "./dto/PostingDTO";

interface PostingService {
    //
    register(boardId: string, postingDTO: PostingDTO): string;
    find(postingId: string): PostingDTO;
    findByBoardId(boardId: string): PostingDTO[];
    modify(postingDTO: PostingDTO): void;
    remove(postingId: string): void;
}
export default PostingService;
