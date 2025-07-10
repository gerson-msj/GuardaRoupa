import { Handlers } from "$fresh/server.ts";
import UsuarioService from "../../../Services/UsuarioService.ts";
import { DbContext, StateData } from "../../../App.ts";
import CadastroData from "./CadastroData.ts";
import CryptService from "../../../Services/CryptService.ts";

export const CadastroHandler: Handlers<CadastroData, StateData> = {
    GET(_, ctx) {
        configState(ctx.state);
        const data: CadastroData = {
            Nome: "",
            Senha: "",
            ExibirSenha: false
        };

        return ctx.render(data);
    },

    async POST(req, ctx) {
        configState(ctx.state);

        const appContext = new DbContext();
        const usuarioService = new UsuarioService(appContext);
        const cryptoService = new CryptService();

        const formData = await req.formData();
        const data = getData(formData);

        try {
            const id = await usuarioService.novoUsuario(data);
            const token = await cryptoService.criarToken(id);
            const headers = new Headers();
            headers.set("Set-Cookie", `token=$${token}; Path=/; HttpOnly; Max-Age=604800`); // Cookie de uma semana.
            headers.set("Location", "/");
            return new Response(null, { status: 303, headers: headers });
        } catch (error) {

            console.log("Erro:", error);
            if (error instanceof Error)
                data.Error = error;
            else
                data.Error = new Error("Houve uma falha no servidor");

            return ctx.render(data, { status: 401 });

        } finally {
            appContext.closeDb();
        }
    }
};

function configState(state: StateData) {
    state.titulo = "Cadastro";
    state.menu = { "/": "Voltar" };
}

function getData(formData: FormData): CadastroData {
    return {
        Nome: formData.get("nome") as string,
        Senha: formData.get("senha") as string,
        ExibirSenha: formData.has("exibirSenha")
    };
}