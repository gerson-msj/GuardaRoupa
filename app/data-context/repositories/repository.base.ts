import DbContext from "../db.context.ts";

export default abstract class RepositoryBase {
    protected dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext;
    }

    
}