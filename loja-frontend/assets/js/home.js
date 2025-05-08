async function adicionarAoCarrinho(productId, quantity) {
    console.log("ID do produto:", productId);
    if (!productId) {
        alert("ID do produto é indefinido!");
        return;
    }

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
    } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
        alert("Erro ao adicionar ao carrinho");
    }
}
