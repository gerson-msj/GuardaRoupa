import { FreshContext } from "$fresh/server.ts";
import DbContext from "../../data-context/db.context.ts";
import { StateData } from "../state.data.ts";
import { IDataBase } from "./data.base.ts";

export default abstract class ControllerBase<TData extends IDataBase> {
    
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

    protected redirect(headers: Headers): Response {
        return new Response(null, { status: this.httpStatusSeeOther, headers: headers });
    }
}