import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
      <Head>
        <title>404 - A página informada não existe! ¯\_(ツ)_/¯</title>
        <a href="/">Voltar para a Home</a>
      </Head>
  );
}
