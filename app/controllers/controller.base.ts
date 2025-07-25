import { FreshContext } from "$fresh/server.ts";
import DbContext from "../data-context/db.context.ts";
import { StateData } from "./state.data.ts";

export default abstract class ControllerBase<TData> {

    protected req: Request;
    protected ctx: FreshContext<StateData, TData>;
    protected state: StateData;
    protected dbContext: DbContext;
    protected userId?: number;
    protected url: URL;
    private errMsg: string[] = [];
    protected get hasError() { return this.errMsg.length > 0 };

    protected httpStatusSeeOther = 303;
    protected httpStatusBadRequest = 400;

    protected abstract configState(): void;

    constructor(req: Request, ctx: FreshContext<StateData, TData>) {
        this.req = req;
        this.url = new URL(this.req.url);
        this.ctx = ctx;
        this.state = this.ctx.state;
        this.dbContext = new DbContext(this.state.idUsuario ?? 0);
        this.configState();
    }

    public static redirect(location: string, headers?: Headers): Response {
        headers ??= new Headers();
        headers.set("Location", location);
        const httpStatusSeeOther = 303;
        return new Response(null, { status: httpStatusSeeOther, headers: headers });
    }

    protected redirect(location: string, headers?: Headers): Response {
        return ControllerBase.redirect(location, headers);
    }

    protected addError(error: Error | string | string[] | unknown) {
        if (Array.isArray(error) && error.every(e => typeof e === "string")) {
            this.errMsg.push(...error);
        } else if (error instanceof Error) {
            this.errMsg.push(error.message);
        } else if (typeof error === "string") {
            this.errMsg.push(error);
        } else {
            this.errMsg.push("Houve uma falha no servidor.");
        }

        this.state.errMsg = this.errMsg;
    }


}