import { FreshContext } from "$fresh/server.ts";
import ControllerBase from "../app/controllers/controller.base.ts";
import { StateData } from "../app/controllers/state.data.ts";
import AuthService from "../app/services/auth.service.ts";
import CryptService from "../app/services/crypt.service.ts";



export const handler = [
    async function antes(req: Request, ctx: FreshContext<StateData>) {
        ctx.state.menu = {};
        ctx.state.titulo = "Guarda-Roupa";

        // Se na estrutura de rota (páginas), futuramente adicionar api.
        if (ctx.destination == "route") {
            const url = new URL(req.url);
            const removeToken = "token=''; Path=/; HttpOnly; Max-Age=0";

            // Se em root
            if (url.pathname == "/") {

                const token = AuthService.obterToken(req);
                const tokenValido = await AuthService.tokenValido(token);
                // Se token é válido, redireciona para home.
                if (tokenValido) {
                    return ControllerBase.redirect("/home");
                    // se tem token, mas não é valido, limpa o token.
                } else if (token) {
                    const result = await ctx.next();
                    result.headers.set("Set-Cookie", removeToken);
                    return result;
                }

                // Se fora da estrutura de login
            } else if (!url.pathname.startsWith("/login")) {

                const token = AuthService.obterToken(req);

                // Sem cookie, redireciona para raiz.
                if (!token)
                    return ControllerBase.redirect("/");

                const tokenValido = await AuthService.tokenValido(token);
                // Se token válido, obtém usuário e indicação de renovação.
                if (tokenValido) {
                    ctx.state.idUsuario = CryptService.tokenSub<number>(token);
                    ctx.state.renovarToken = CryptService.tokenExpirado(token, 2);
                    // Se inválido, remove o token e redireciona para raiz.
                } else {
                    const headers = new Headers();
                    headers.set("Set-Cookie", removeToken);
                    return ControllerBase.redirect("/", headers);
                }
            }
        }

        return ctx.next();
        
    },
    async function depois(req: Request, ctx: FreshContext<StateData>) {

        try {

            if (ctx.destination == "notFound") {
                const url = new URL(req.url);
                ctx.state.menu = { "/": "Retornar para a página inicial." };
                ctx.state.titulo = `${url.pathname} ???`;
            }

            const response = await ctx.next();

            // Se na rota, com usuário autorizado, indicação de renovação de token e response ok.
            if (ctx.destination == "route" && ctx.state.idUsuario && ctx.state.renovarToken && response.ok) {
                // Adiciona uma atualização ao token.
                await AuthService.comporHeaders(ctx.state.idUsuario, 7, response.headers);
            }

            return response;

        } catch (error) {
            const url = new URL(req.url);
            ctx.state.menu = { "/": "Retornar para a página inicial." };
            ctx.state.titulo = `${url.pathname} quebrou!`;
            throw (error as Error);
        }

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