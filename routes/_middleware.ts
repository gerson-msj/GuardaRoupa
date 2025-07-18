import { FreshContext } from "$fresh/server.ts";
import { StateData } from "../app/controllers/state.data.ts";
import AuthService from "../app/services/auth.service.ts";



export const handler = [
    function antes(req: Request, ctx: FreshContext<StateData>) {
        if (ctx.destination == "route") {
            ctx.state.menu = {};
            ctx.state.titulo = "Guarda-Roupa";

            const url = new URL(req.url);

            if (url.pathname == "/") {
                /**
                 * Verificar se tem token
                 * Verificar se é válido
                 * Se válido, redirecionar para /home
                 * Se inválido, excluir.
                 */

                const token = AuthService.obterToken(req);
                if(token) {
                    console.log("token", token);
                }
                
            }

            if (url.pathname !== "/login" && url.pathname !== "/login/cadastro") {
                /**
                 * Verificar se tem token
                 * Se não tem
                 *  Redirecionar para raiz
                 * Verificar se é valido
                 * Se válido
                 *  Adicionar o IdUsuario ao state
                 *  Adicionar a Iminência de expiração
                 * Se inválido 
                 *  excluir e redirecionar para raiz
                 */
            }
        }

        return ctx.next();
    },
    async function depois(req: Request, ctx: FreshContext<StateData>) {
        const response = await ctx.next();
        if (ctx.destination == "route") {
            response.headers.set("Set-Cookie", "MiddlewarePost=value");
            /**
             * Se iminente de expiração e response ok
             *  Renovar token (gerar um novo com base no id e retornar)
             */
        }

        return response;
    },


];

// export async function handler(
//   _req: Request,
//   ctx: FreshContext<State>, // Neste ponto o middleware definiu a estrutura de State.
// ) {
//   console.log("Middleware 01");
//   ctx.state.menu = {};
//   return await ctx.next();
// }