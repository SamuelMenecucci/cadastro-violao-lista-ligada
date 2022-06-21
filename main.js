import { Violao } from "./Violao.js";
import promptSync from "prompt-sync";
// import { ListaLigada } from "./ListaLigada";

const prompt = promptSync();

const menu = [
  "[0] Listar Violões",
  "[1] Adicionar Novo Violão",
  "[2] Remover Violão",
  "[3] Procurar Violão",
  "[4] Importar Dados",
  "[5] Exportar Dados",
  "[6] Atualizar Violão",
  "[L] Limpar a tela",
  "[X] Sair do Programa",
];

let novoViolao = new Violao();

let opcao;

do {
  console.log("MENU DE OPÇÕES", "\n=================");
  console.log(menu);
  opcao = prompt("Opção: ").toLowerCase();

  switch (opcao) {
    case "0":
      novoViolao.ListarVioloes();
      break;

    case "1":
      novoViolao.AdicionarViolao();
      break;

    case "2":
      novoViolao.RemoverViolao();
      break;

    case "3":
      novoViolao.ProcurarViolao();
      break;

    case "4":
      await novoViolao.importarDados();
      break;

    case "5":
      await novoViolao.exportarDados();
      break;

    case "6":
      await novoViolao.atualizarDados();
      break;

    case "l":
      novoViolao.LimparTela();
      break;

    case "x":
      console.log("Até mais!");
      break;

    default:
      console.log("\n Opção Incorreta! \n");
      break;
  }
} while (opcao !== "x");
