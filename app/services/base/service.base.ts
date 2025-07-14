import DbContext from "../../data-context/db.context.ts";

export default abstract class ServiceBase {
    protected dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext;
    }
}