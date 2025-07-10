import { useEffect } from "preact/hooks";
import CadastroData from "../../../app/Pages/Login/Cadastro/CadastroData.ts";
import { CadastroComponentViewModel } from "../../../app/Pages/Login/Cadastro/CadastroComponentViewModel.ts";

export default function CadastroComponent(args: { data: CadastroData }) {

  useEffect(CadastroComponentViewModel.Use, []);

  return (
    <form method="POST">
      <div>
        <label for="nome">Nome de Usuário</label>
        <input type="text" id="nome" name="nome" autocomplete="off" value={args.data.Nome} />
      </div>
      <div>
        <label for="senha">Senha</label>
        <input type="password" id="senha" name="senha" autocomplete="new-password" value={args.data.Senha} />
      </div>
      <div>
        <label for="exibirSenha">Exibir senha</label>
        <input type="checkbox" id="exibirSenha" name="exibirSenha" checked={args.data.ExibirSenha} />
      </div>
      <div>
        <button type="submit" id="cadastrar">Cadastrar</button>
        <button type="reset" id="limpar">Limpar</button>
      </div>
    </form>
  );
}

