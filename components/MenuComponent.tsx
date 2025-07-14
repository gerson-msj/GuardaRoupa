
export default function MenuComponent(args: { titulo: string, menu: Record<string, string> }) {
  const menu: [string, string][] = Object.entries(args.menu);
  return (
    <>
      <h1>{args.titulo}</h1>
      <nav>
        {menu.map(([key, value], index) => {
          const separador = index < menu.length - 1 ? "|" : "";
          return (
            <>
              <a href={key}>{value}</a>
              {separador}
            </>
          );
        })}
      </nav>
    </>
  );
}

export const MENU_COMPLETO = {
  "/cadastro": "Cadastrar",
  "/consulta": "Consultar",
};

export const MENU_HOME = {
  "/": "Voltar",
};
