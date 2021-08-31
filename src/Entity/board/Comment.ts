import DateUtil from "../../util/DateUtil";
import Entity from "../Entity";

export default class Comment implements Entity{
    usId: string = '';
    writer: string = '';
    contents: string = '';
    writtenDate: string = '';

    postingId: string = '';

    constructor(usId: string, writer: string, contents: string, postingId: string) {

        this.usId = usId;
        this.writer = writer;
        this.contents = contents;
        this.postingId = postingId;
        this.writtenDate = DateUtil.today();
    }
    getId(): string {
        return this.usId;
    }

    

}