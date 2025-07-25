import { useRef } from "preact/hooks";
import LoginData from "../../app/controllers/login/login.data.ts";

export default function LoginIsland(args: { data: LoginData }) {

  const nomeRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);

  const resetClick = () => {
    nomeRef.current?.focus();
  }

  return (
    <form id="form" method="POST" class="form form-login">

      <div>
        <label for="nome">Nome de Usuário</label>
        <input type="text" id="nome" name="nome" autocomplete="username" value={args.data.Nome} ref={nomeRef} />
      </div>
      <div>
        <label for="senha">Senha</label>
        <input type="password" id="senha" name="senha" autocomplete="current-password" value={args.data.Senha} ref={senhaRef} />
      </div>
      <div>
        <button type="submit" id="entrar" >Entrar</button>
        <button type="reset" id="limpar" onClick={resetClick}>Limpar</button>
      </div>

    </form>
  );
}