import { FreshContext } from "$fresh/server.ts";
import DbContext from "../../DataContext/DbContext.ts";
import { BaseData } from "./BaseData.ts";
import { StateData } from "../StateData.ts";

export default abstract class BaseController<TData extends BaseData> {
    
    protected req: Request;
    protected ctx: FreshContext<StateData, TData>;
    protected state: StateData;
    protected dbContext: DbContext;
    protected userId?: number;
    
    protected httpStatusSeeOther = 303;
    protected httpStatusBadRequest = 400;

    protected abstract configState(): void;
   
    constructor(req: Request, ctx: FreshContext<StateData, TData>) {
        this.req = req;
        this.ctx = ctx;
        this.state = this.ctx.state;
        this.dbContext = new DbContext();
        this.configState();
    }
}