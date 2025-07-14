import DbContext from "../../DataContext/DbContext.ts";

export default abstract class BaseService {
    protected dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext;
    }
}