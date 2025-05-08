let cart = [];


document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(data => {
            console.log("Produtos recebidos:", data);
            renderProducts(data);
        })
        .catch(error => {
            console.error("Erro ao carregar produtos:", error);
        });
});


function renderProducts(products) {
    const produtosContainer = document.getElementById("produtos-container");

    if (!produtosContainer) {
        console.error("Elemento 'produtos-container' não encontrado!");
        return;
    }

    produtosContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("produto-card");


        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="produto-img">
            <h3>${product.name}</h3>
            <p>R$ ${product.price}</p>
            <button onclick="adicionarAoCarrinho(${product.id}, 1)">Adicionar ao Carrinho</button>
        `;

        produtosContainer.appendChild(productElement);
    });
}


async function adicionarAoCarrinho(productId, quantity) {
    try {
        const response = await fetch("http://localhost:3000/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId, quantity })
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: Não foi possível adicionar ao carrinho`);
        }

        const data = await response.json();
        console.log("Item adicionado ao carrinho:", data);
        carregarCarrinho();
    } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
        alert("Erro ao adicionar ao carrinho");
    }
}


async function carregarCarrinho() {
    try {
        const response = await fetch("http://localhost:3000/cart");

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: Não foi possível carregar o carrinho`);
        }

        const data = await response.json();
        renderCart(data);
    } catch (err) {
        console.error("Erro ao carregar o carrinho:", err);
        alert("Ocorreu um erro ao carregar o carrinho. Tente novamente mais tarde.");
    }
}


function renderCart(cartItems) {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item", "d-flex", "justify-content-between", "mb-3");

        itemElement.innerHTML = `
            <div>
                <h5>${item.product.name}</h5>
                <p>Preço: R$ ${item.product.price.toFixed(2)}</p>
                <p>Quantidade: ${item.quantity}</p>
            </div>
            <div>
                <button class="btn btn-danger" onclick="removeItem(${item.id})">Remover</button>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
        total += item.product.price * item.quantity;
    });

    const cartTotal = document.getElementById("cart-total");
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
}


function removeItem(id) {
    fetch(`http://localhost:3000/cart/${id}`, { method: "DELETE" })
        .then(() => carregarCarrinho())
        .catch(err => console.error("Erro ao remover item:", err));
}


function clearCart() {
    fetch("http://localhost:3000/cart", { method: "DELETE" })
        .then(() => carregarCarrinho())
        .catch(err => console.error("Erro ao limpar carrinho:", err));
}

document.addEventListener("DOMContentLoaded", carregarCarrinho);
