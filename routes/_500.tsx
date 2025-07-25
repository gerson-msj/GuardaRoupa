import { PageProps } from "$fresh/server.ts";

export default function Error500Page({ error }: PageProps) {
  return (
    <>
      <div class="texto-destaque">
        <em>
          500 - Erro interno do servidor
        </em>

        <h1>🤔</h1>
        
        <p>{(error as Error).message}</p>
      </div>
    </>
  );
}
