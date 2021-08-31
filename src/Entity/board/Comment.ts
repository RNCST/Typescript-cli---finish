export default class Comment {
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
        this.writtenDate = 
    }

}