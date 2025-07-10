import { FreshContext } from "$fresh/server.ts";
import { StateData } from "../app/App.ts";

export const handler = [
    function defineStateMiddleware(_req: Request, ctx: FreshContext<StateData>) {
        ctx.state.menu = {}; 
        ctx.state.titulo = "Guarda-Roupa";
        return ctx.next();      
    }
];

// export async function handler(
//   _req: Request,
//   ctx: FreshContext<State>, // Neste ponto o middleware definiu a estrutura de State.
// ) {
//   console.log("Middleware 01");
//   ctx.state.menu = {}; 
//   return await ctx.next();
// }