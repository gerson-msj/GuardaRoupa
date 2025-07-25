export default class LoginData {
    public Nome: string;
    public Senha: string;

    constructor();
    constructor(nome: string, senha: string);
    constructor(nome: string = "", senha: string = "") {
        this.Nome = nome;
        this.Senha = senha;
    }

}