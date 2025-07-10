import { getElement, ViewModelEffect } from "../../../App.ts";

class ViewModel  {

  private nome = getElement<HTMLInputElement>("nome");
  private senha = getElement<HTMLInputElement>("senha");
  private exibirSenha = getElement<HTMLInputElement>("exibirSenha");
  private limpar = getElement<HTMLButtonElement>("limpar");

  constructor() {
    this.exibirSenha.addEventListener("change", () => this.alterarExibirSenha());
    this.limpar.addEventListener("click", () => this.nome.focus());
    this.alterarExibirSenha();
  }

  alterarExibirSenha() {
    this.senha.type = this.exibirSenha.checked ? "text" : "password";
  }

}

export const CadastroComponentViewModel: ViewModelEffect = {
    Use() {
        new ViewModel();
    },
}