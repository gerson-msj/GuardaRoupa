import DbContext from "../DbContext.ts";

export default abstract class BaseRepository {
    protected dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext;
    }

    
}