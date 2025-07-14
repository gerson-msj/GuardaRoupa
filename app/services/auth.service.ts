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

    static async obterHeaders(idUsuario: number): Promise<Headers>;
    static async obterHeaders(idUsuario: number, location: string): Promise<Headers>;
    static async obterHeaders(idUsuario: number, location: string = "/home"): Promise<Headers> {       
        
        const cryptService = new CryptService();
        const token = await cryptService.criarToken(idUsuario);
        const headers = new Headers();
        headers.set("Set-Cookie", `token=$${token}; Path=/; HttpOnly; Max-Age=604800`); // Cookie de uma semana.
        if(location)
            headers.set("Location", location);
        
        return headers;
    }
}