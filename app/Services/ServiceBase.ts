import { DbContext } from "../App.ts";

export default abstract class ServiceBase {
    protected appContext: DbContext;

    constructor(appContext: DbContext) {
        this.appContext = appContext;
    }
}