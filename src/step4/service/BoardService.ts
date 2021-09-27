import BoardDTO from "./dto/BoardDTO";

interface BoardService {
    //
    register(boardDTO: BoardDTO): string;
    find(boardId: string): BoardDTO;
    findByName(boardName: string): BoardDTO[];
    findAll(): BoardDTO[];
    findByClubName(clubName: string): BoardDTO | null;
    modify(board: BoardDTO): void;
    remove(boardId: string): void;
}
export default BoardService;
