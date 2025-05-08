app.controller('ProductController', function ($scope, $http) {
    $scope.product = {};
    $scope.products = [];
    $scope.cart = [];


    $scope.addProduct = function () {
        if ($scope.product.name && $scope.product.price) {
            $http.post('http://localhost:3000/products', $scope.product, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    alert("Produto adicionado com sucesso!");
                    $scope.product = {};
                    $scope.getProducts();
                })
                .catch(function (error) {
                    alert("Erro ao adicionar produto.");
                    console.error(error);
                });
        } else {
            alert("Preencha todos os campos obrigatórios!");
        }
    };


    $scope.getProducts = function () {
        $http.get('http://localhost:3000/products')
            .then(function (response) {
                console.log('Produtos recebidos:', response.data);
                $scope.products = response.data;
            })
            .catch(function (error) {
                alert("Erro ao buscar produtos.");
                console.error(error);
            });
    };



    $scope.adicionarAoCarrinho = function (product) {
        $scope.cart.push(product);
        alert(product.name + " adicionado ao carrinho!");
    };


    $scope.getProducts();
});
