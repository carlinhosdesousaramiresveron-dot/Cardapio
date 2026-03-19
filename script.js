const produtos = [
  {nome: "Arroz + feijão + carne", preco: 15, categoria: "Refeições"},
  {nome: "Feijoada", preco: 12, categoria: "Refeições"},
  {nome: "Sopa", preco: 12, categoria: "Refeições"},

  {nome: "Pão completo", preco: 4, categoria: "Lanches"},
  {nome: "Coxinha", preco: 3, categoria: "Lanches"},
  {nome: "Coxinha + suco", preco: 5, categoria: "Lanches"},

  {nome: "Café", preco: 2, categoria: "Bebidas"},
  {nome: "Suco", preco: 2, categoria: "Bebidas"}
];

let carrinho = [];

function carregarMenu() {
  const menu = document.getElementById("menu");

  const categorias = [...new Set(produtos.map(p => p.categoria))];

  categorias.forEach(cat => {
    const div = document.createElement("div");
    div.className = "categoria";

    div.innerHTML = `<h2>${cat}</h2>`;

    produtos
      .filter(p => p.categoria === cat)
      .forEach(prod => {
        const item = document.createElement("div");
        item.className = "item";

        item.innerHTML = `
          <strong>${prod.nome}</strong><br>
          R$ ${prod.preco}
          <br>
          <button onclick="adicionar('${prod.nome}', ${prod.preco})">Adicionar</button>
        `;

        div.appendChild(item);
      });

    menu.appendChild(div);
  });
}

function adicionar(nome, preco) {
  carrinho.push({nome, preco});
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  lista.innerHTML = "";

  let total = 0;

  carrinho.forEach(item => {
    total += item.preco;
    const li = document.createElement("li");
    li.textContent = item.nome;
    lista.appendChild(li);
  });

  totalEl.textContent = "Total: R$ " + total;
}

function finalizarPedido() {
  let mensagem = "Pedido:%0A";

  carrinho.forEach(item => {
    mensagem += "- " + item.nome + "%0A";
  });

  const total = carrinho.reduce((s, i) => s + i.preco, 0);
  mensagem += "%0ATotal: R$ " + total;

  const numero = "5599999999999"; // COLOCA O NÚMERO DA TUA TIA

  window.open(`https://wa.me/${numero}?text=${mensagem}`);
}

carregarMenu();
