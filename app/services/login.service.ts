export default class LoginService {

    static obterLoginCadastroBaseData(formData: FormData): { nome: string, senha: string, errMsgs: string[] } {
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

}