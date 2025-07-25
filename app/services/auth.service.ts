import CryptService from "./crypt.service.ts";

export default class AuthService {

    static obterLoginCadastroData(formData: FormData): { nome: string, senha: string, errMsgs: string[] } {
        let nome = formData.get("nome") as string;
        let senha = formData.get("senha") as string;
        const errMsgs: string[] = [];
        nome = nome.toLowerCase().trim();
        senha = senha.trim();

        if (nome == "")
            errMsgs.push("O <b>Nome</b> informado é inválido.");

        if (senha == "")
            errMsgs.push("A <b>Senha</b> informada é inválida.");

        return { nome, senha, errMsgs };
    }

    /**
     * Cria ou adiciona a um header um cookie contendo um JWT.
     * @param idUsuario Identificação do usuário, para compor o sub do JWT.
     * @param expDias Dias até a expiração do JWT e do Cookie, valor padrão de 7 dias.
     * @param headers Headers existente, se não for informado um novo será criado.
     * @returns Headers.
     */
    static async comporHeaders(idUsuario: number, expDias: number = 7, headers?: Headers): Promise<Headers> {
        headers ??= new Headers();
        const token = await CryptService.criarToken(idUsuario, expDias);
        const maxAge = expDias * 24 * 60 * 60; // dias em segundos.
        headers.set("Set-Cookie", `token=${token}; Path=/; HttpOnly; Max-Age=${maxAge}`);
        return headers;
    }

    /**
     * Obtém o JWT a partir dos cookies de uma Request.
     * @param req Request
     * @returns JWT, se existir.
     */
    static obterToken(req: Request): string | undefined {
        const cookies = req.headers.get("cookie");
        const cookieToken = cookies?.split(";").find(c => c.trim().startsWith("token="));
        return cookieToken?.split("=").slice(1).join("=");
    }

    static async tokenValido(token?: string) : Promise<boolean> {
        try {
            if(!token)
                return false;    

            const tokenValido = await CryptService.tokenValido(token);
            const tokenExpirado = CryptService.tokenExpirado(token);
            return tokenValido && !tokenExpirado;
        } catch (error) {
            console.error(`Falha em AuthService.tokenValido(token: ${token})`, error);
            return false;
        }
    }
}