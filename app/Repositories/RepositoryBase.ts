import { DbContext } from "../App.ts";

export default abstract class RepositoryBase {
    protected appContext: DbContext;

    constructor(appContext: DbContext) {
        this.appContext = appContext;
        this.appContext.openDb();
    }

    
}