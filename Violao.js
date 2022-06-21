import { promises as fs } from "fs";
import promptSync from "prompt-sync";
import { ListaLigada } from "./ListaLigada.js";

const { readFile, writeFile } = fs;

export class Violao {
  _violao = {
    marca: "",
    modelo: "",
    tipo: "",
    ano_fabricacao: 0,
    cutaway: "",
    cor: "",
  };
  opcao = "";
  prompt = promptSync();

  _violoes = [];

  lista = new ListaLigada();

  constructor() {}

  ListarVioloes() {
    if (this._violoes.length == 0) {
      console.log("\n-->Vetor vazio\n");
      return;
    }

    this._violoes = this.lista.imprimir();
  }

  AdicionarViolao() {
    do {
      this._violao.marca = this.prompt("Digite a marca: ").toLowerCase();
    } while (!this._violao.marca || this._violao.marca.length > 30);

    do {
      this._violao.modelo = this.prompt("Digite o modelo: ").toLowerCase();
    } while (!this._violao.modelo || this._violao.modelo.length > 30);

    do {
      this._violao.tipo = this.prompt("Digite o tipo: ").toLowerCase();
    } while (!this._violao.tipo || this._violao.tipo.length > 30);

    do {
      this._violao.ano_fabricacao = +this.prompt(
        "Digite o ano de fabricação: "
      ).toLowerCase();
    } while (
      isNaN(this._violao.ano_fabricacao) ||
      !this._violao.ano_fabricacao
    );

    do {
      this._violao.cutaway = this.prompt("Possui cutaway?: S/N ").toLowerCase();
    } while (this._violao.cutaway !== "s" && this._violao.cutaway !== "n");

    this._violao.cutaway === "s"
      ? (this._violao.cutaway = true)
      : (this._violao.cutaway = false);

    do {
      this._violao.cor = this.prompt(
        "Digite a cor em hexadecimal: "
      ).toLowerCase();
    } while (!this._violao.cor.match("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"));

    this._violoes.push(this._violao);

    this.lista.inserirNoFim(this._violao);

    this._violao = {};

    console.log("\nDados adicionados!\n");

    return;
  }

  RemoverViolao() {
    if (this._violoes.length == 0)
      return console.log("\nVetor vazio! Nenhum violão para excluir\n");

    // console.table(this._violoes);

    // let opcao = +this.prompt("Digite o índice do violão que deseja excluir: ");

    this.lista.imprimir();

    let opcao = +this.prompt("Digite o índice do violão que deseja excluir: ");

    while (opcao < 0 || opcao > this.lista.size || isNaN(opcao)) {
      console.log(
        `\nValor inválido! Digite um valor entre 0 e ${this.lista.size - 1}\n`
      );
      opcao = +this.prompt("Digite o índice do violão que deseja excluir: ");
    }

    this.lista.removerDaPosicao(opcao);

    console.log("\nViolão excluído!\n");
  }

  ProcurarViolao() {
    let filtro;

    do {
      console.log([
        "[0] Marca",
        "[1] Modelo",
        "[2] Tipo",
        "[3] Ano de Fabricação",
        "[4] Cutaway",
        "[5] Cor",
      ]);
      filtro = +this.prompt("Digite sua opção: ");
    } while (filtro < 0 || filtro > 5 || isNaN(filtro));

    switch (filtro) {
      case 0:
        filtro = "marca";
        break;

      case 1:
        filtro = "modelo";
        break;

      case 2:
        filtro = "tipo";
        break;

      case 3:
        filtro = "ano_fabricacao";
        break;

      case 4:
        filtro = "cutaway";
        break;

      case 5:
        filtro = "cor";
        break;
    }

    let value;

    switch (filtro) {
      case "ano_fabricacao":
        do {
          value = +this.prompt(
            `Digite valor de busca para o  ${filtro} `
          ).toLowerCase();
        } while (isNaN(value) || !value);
        break;

      case "cutaway":
        do {
          value = this.prompt(
            `Digite valor de busca para ${filtro}. S/N: `
          ).toLowerCase();
        } while (value !== "s" && value !== "n");
        value === "s" ? (value = true) : (value = false);
        break;

      case "cor":
        do {
          value = this.prompt(
            `Digite o valor para a ${filtro} em hexadecimal: `
          ).toLowerCase();
        } while (!value.match("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"));
        break;

      default:
        do {
          value = this.prompt(
            `Digite o valor de busca para ${filtro} `
          ).toLowerCase();
        } while (!value || value > 30);

        break;
    }

    console.log("\n");

    this.lista.procurar(filtro, value);
  }

  LimparTela() {
    console.clear();
  }

  async importarDados() {
    let data = JSON.parse(await readFile("data.json"));

    this._violoes = data.violao;

    await this.lista.importar();

    console.log("\nDados Importados!\n");

    return;
  }

  async exportarDados() {
    await this.lista.salvar();

    console.log("Dados salvos!");
  }

  async atualizarDados() {
    if (this._violoes.length === 0) {
      return console.log("\nVetor vazio! Nenhum dados para atualizar\n");
    }

    this.lista.imprimir();

    let idx = +this.prompt("Digite o índice do violão que deseja atualizar: ");

    while (idx < 0 || idx > this.lista.size - 1 || isNaN(idx)) {
      console.log(
        `\nValor inválido! Digite um valor entre 0 e ${this.lista.size - 1}!\n`
      );
      idx = +this.prompt("Digite o índice do violão que deseja excluir: ");
    }

    let key;
    let value;

    do {
      console.log([
        "[0] Marca",
        "[1] Modelo",
        "[2] Tipo",
        "[3] Ano de Fabricação",
        "[4] Cutaway",
        "[5] Cor",
      ]);
      key = +this.prompt("Digite o que deseja atualizar:  ");
    } while (key < 0 || key > 5 || isNaN(key));

    switch (key) {
      case 0:
        key = "marca";
        break;

      case 1:
        key = "modelo";
        break;

      case 2:
        key = "tipo";
        break;

      case 3:
        key = "ano_fabricacao";
        break;

      case 4:
        key = "cutaway";
        break;

      case 5:
        key = "cor";
        break;
    }

    switch (key) {
      case "ano_fabricacao":
        do {
          value = +this.prompt(
            `Digite o novo valor para a ${key} `
          ).toLowerCase();
        } while (isNaN(value) || !value);
        break;

      case "cutaway":
        do {
          value = this.prompt(
            `Digite o novo valor para a ${key}. S/N:`
          ).toLowerCase();
        } while (value !== "s" && value !== "n");
        value === "s" ? (value = true) : (value = false);
        break;

      case "cor":
        do {
          value = this.prompt(
            `Digite o novo valor para a ${key} em hexadecimal: `
          ).toLowerCase();
        } while (!value.match("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"));
        break;

      default:
        do {
          value = this.prompt(
            `Digite o novo valor para a ${key} `
          ).toLowerCase();
        } while (!value || value.length > 30);

        break;
    }

    console.log("\n");

    this.lista.atualizar(idx, key, value);

    console.log("Dados atualizados!\n");
  }
}
