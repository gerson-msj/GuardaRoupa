import { useRef, useEffect } from "preact/hooks";
import CadastroData from "../../app/controllers/login/cadastro.data.ts";

export default function CadastroIsland(args: { data: CadastroData }) {


  const nomeRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const exibirSenhaRef = useRef<HTMLInputElement>(null);

  const resetClick = () => {
    nomeRef.current?.focus();
  }

  const exibirSenhaChange = () => {
    if (senhaRef.current)
      senhaRef.current.type = exibirSenhaRef.current?.checked ?? false ? "text" : "password";;
  }

  useEffect(() => {
    exibirSenhaChange();
  }, []);

  return (
    <form id="form" method="POST" class="form form-login">

      <div>
        <label for="nome">Nome de Usuário</label>
        <input type="text" id="nome" name="nome" autocomplete="off" value={args.data.Nome} ref={nomeRef} />
      </div>
      <div>
        <label for="senha">Senha</label>
        <input type="password" id="senha" name="senha" autocomplete="new-password" value={args.data.Senha} ref={senhaRef} />
      </div>
      <div>
        <label for="exibirSenha">Exibir senha</label>
        <input type="checkbox" id="exibirSenha" name="exibirSenha" checked={args.data.ExibirSenha} ref={exibirSenhaRef} onChange={exibirSenhaChange} />
      </div>
      <div>
        <button type="submit" id="cadastrar" >Cadastrar</button>
        <button type="reset" id="limpar" onClick={resetClick}>Limpar</button>
      </div>

    </form>
  );
}