
export default class CadastroData {
    public Nome: string;
    public Senha: string;
    public ExibirSenha: boolean;

    constructor();
    constructor(nome: string, senha: string, exibirSenha: boolean);
    constructor(nome: string = "", senha: string = "", exibirSenha: boolean = false) {
        this.Nome = nome;
        this.Senha = senha;
        this.ExibirSenha = exibirSenha;
    }
}