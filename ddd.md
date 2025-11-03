## 🧩 1. Contexto do domínio

O domínio é o **gerenciamento de estoque**, com foco em:

* rastrear produtos individualmente;
* controlar níveis mínimos de estoque;
* gerar alertas automáticos;
* acompanhar histórico de vendas e de estoque;
* automatizar ordens de compra com base em demanda;
* integração com fornecedores.

Portanto, estamos dentro de um **domínio logístico / operacional** voltado para **controle e otimização de estoque e compras**.

---

## 🧱 2. Entidades de domínio

Abaixo, listamos as **entidades centrais** e seus principais atributos (conceituais, não técnicos):

| Entidade                                    | Descrição                                                              | Atributos principais                                                                               |
| ------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Produto (Product)**                       | Representa um item único no estoque.                                   | `id`, `nome`, `sku`, `cor`, `tamanho`, `preço`, `quantidadeAtual`, `quantidadeMinima`, `categoria` |
| **Estoque (Inventory)**                     | Representa o estado atual do estoque e seu histórico de movimentações. | `id`, `produtoId`, `quantidade`, `dataAtualizacao`, `localizacao`                                  |
| **Movimentação de Estoque (StockMovement)** | Registra entradas e saídas de produtos do estoque.                     | `id`, `produtoId`, `tipo` (entrada/saída), `quantidade`, `data`, `origem/destino`, `referência`    |
| **Venda (Sale)**                            | Registra transações de venda de produtos.                              | `id`, `produtoId`, `quantidadeVendida`, `valorTotal`, `dataVenda`, `canalVenda`                    |
| **Fornecedor (Supplier)**                   | Representa empresas que fornecem produtos para reposição.              | `id`, `nome`, `email`, `prazoEntrega`, `produtosDisponíveis`                                       |
| **Ordem de Compra (PurchaseOrder)**         | Pedido feito ao fornecedor para reposição de estoque.                  | `id`, `fornecedorId`, `produtos`, `status`, `dataPedido`, `dataEntregaPrevista`, `valorTotal`      |
| **Alerta (Alert)**                          | Notificação gerada quando o estoque atinge o mínimo.                   | `id`, `produtoId`, `tipo`, `mensagem`, `data`, `status`, `meioEnvio` (email, sistema)              |

---

## ⚙️ 3. Casos de uso (ações do sistema)

A partir das necessidades descritas pelo **Domain Expert**, podemos derivar os **casos de uso** do sistema, agrupando-os por contexto.

### 📦 Contexto: Gestão de Produtos

* **Cadastrar produto** → criar um novo item no sistema com atributos (nome, SKU, tamanho, cor etc.).
* **Atualizar informações do produto** → editar atributos, preços, ou parâmetros de estoque mínimo.
* **Consultar produto** → buscar informações detalhadas de um produto específico.
* **Listar produtos** → exibir todos os produtos com filtros (estoque baixo, por categoria etc.).
* **Definir quantidade mínima de estoque** → configurar o nível mínimo que dispara alertas.

---

### 📊 Contexto: Controle de Estoque

* **Registrar entrada de produto (compra ou devolução)**.
* **Registrar saída de produto (venda ou perda)**.
* **Consultar estoque atual** → visualizar quantidades e status por produto.
* **Gerar histórico de movimentação de estoque** → visualizar todas as entradas e saídas com data.
* **Monitorar níveis de estoque** → verificar produtos com quantidade abaixo do mínimo.

---

### 🔔 Contexto: Alertas e Notificações

* **Gerar alerta de estoque baixo** → quando `quantidadeAtual <= quantidadeMinima`.
* **Enviar alerta por e-mail ou notificação no sistema**.
* **Registrar histórico de alertas enviados**.

---

### 💰 Contexto: Vendas e Relatórios

* **Registrar venda** → atualizar estoque e armazenar dados da transação.
* **Gerar relatório de vendas** → mostrar quantidade vendida, lucro e produtos mais vendidos.
* **Visualizar histórico de vendas por período** → identificar tendências e sazonalidades.
* **Gerar análise de tendências de estoque** → prever produtos que precisam de reposição.

---

### 🧾 Contexto: Ordens de Compra

* **Criar ordem de compra automaticamente** → baseada em produtos com estoque abaixo do mínimo.
* **Gerenciar ordens de compra (CRUD)** → criar, editar, cancelar, confirmar entrega.
* **Acompanhar status da ordem de compra** → pendente, enviada, entregue.
* **Calcular valor total do pedido** → somar custos dos produtos solicitados.
* **Integrar ordem de compra com fornecedores** → envio automático e atualização de status.

---

### 🤝 Contexto: Fornecedores

* **Cadastrar fornecedor** → registrar nome, contato, prazos e produtos fornecidos.
* **Consultar fornecedor** → exibir dados e pedidos recentes.
* **Atualizar informações de fornecedor**.
* **Receber atualizações automáticas sobre prazos de entrega** → integração externa via API.

---

## 🧠 4. Relações entre entidades (visão conceitual)

```
Fornecedor ---< Ordem de Compra >--- Produto ---< Estoque
                                    |
                                    +---< Venda
                                    |
                                    +---< Alerta
```

* **Um Fornecedor** fornece **vários Produtos**.
* **Um Produto** tem um **estoque atual** e **múltiplas movimentações** (entradas/saídas).
* **Uma Venda** reduz o estoque do produto.
* **Uma Ordem de Compra** aumenta o estoque do produto quando entregue.
* **Um Alerta** está vinculado a um Produto e é disparado quando a quantidade cai abaixo do mínimo.

---

## 💡 5. Casos de uso estratégicos (valor de negócio)

Esses são os **casos de uso de alto valor** (core business):

1. **Monitorar estoque e emitir alertas automaticamente.**
2. **Gerar ordens de compra automáticas com base nas tendências de venda.**
3. **Fornecer relatórios analíticos de vendas e estoque.**
4. **Integrar com fornecedores para automação da reposição.**

Esses quatro representam o **core do domínio** e podem formar o **bounded context principal: “Inventory Management”**.

---

## 🧾 6. Resumo final

### 🧩 Entidades

* Produto
* Estoque
* Movimentação de Estoque
* Venda
* Fornecedor
* Ordem de Compra
* Alerta

### ⚙️ Casos de Uso

1. Cadastrar / Atualizar / Consultar produtos
2. Definir quantidade mínima de estoque
3. Registrar entrada e saída de produtos
4. Consultar estoque atual e histórico
5. Gerar e enviar alertas de estoque baixo
6. Registrar vendas e gerar relatórios
7. Analisar histórico e tendências de vendas
8. Criar ordens de compra automaticamente
9. Integrar e atualizar informações de fornecedores
10. Gerar relatórios consolidados de estoque e vendas
