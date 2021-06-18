angular.module("sistemaManutencao").service("localUserAPI", function (storageAPI,authAPI) {
	this.atualizarImagem= function (img){
        let user= storageAPI.getLocalUser();
        user.imagem=img;
        storageAPI.setLocalUser(user);
    }
    this.atualizarNome= function (nome){
        let user= storageAPI.getLocalUser();
        user.nomeNormal=nome;
        storageAPI.setLocalUser(user);
    }
    this.atualizarNick= function (usuario){
        let user= storageAPI.getLocalUser();
        authAPI.authenticate(usuario).then(function (data) {
            user.nome=usuario.nome;
            user.token=data.headers("Authorization").substring(7);
            storageAPI.setLocalUser(user);
		}).catch(function(){
            
        });
    }
});