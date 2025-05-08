const app = angular.module('lojaApp', []);

app.controller('LoginController', function ($scope, $http) {
    $scope.login = function () {
        const user = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        $http.post('http://localhost:3000/auth/login', user)
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                alert('Login realizado com sucesso!');
                const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                modal.hide();
            })
            .catch(error => {
                alert('Usuário ou senha incorretos.');
                console.error(error);
            });
    };
});
