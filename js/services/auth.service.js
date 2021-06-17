angular.module("sistemaManutencao").service("authAPI", function ( $http,config,storageAPI) {

	this.authenticate = function (creds) {
		return $http.post(config.baseUrl + "/login",creds);
	};
    this.successfulLogin= function (authorizationValue,usuario){
        let tok = authorizationValue.substring(7);
        let perfil=""
        usuario.perfil.forEach(p => {
            if(p=="ADMIN" ){
                perfil="ADMIN"
            }else{
                if(perfil!="ADMIN" ){
                    perfil=usuario.perfil
                }
            }
        });
        let user={
            token:tok,
            perfil:perfil,
            nome:usuario.nome,
            id:usuario.id,
            profilePicture:usuario.imagem
        };
        storageAPI.setLocalUser(user);
        return user
    }
    this.atualizarImagem= function (usuario){
        
        let user={
            token:usuario.token,
            perfil:usuario.perfil,
            nome:usuario.nome,
            id:usuario.id,
            profilePicture:usuario.profilePicture
        };
        storageAPI.setLocalUser(user);
    }
    this.refreshToken=function() {
        return $http.post(config.baseUrl + "/auth/refresh_token",{},);
    }
    
    this.logout=function(){
        this.storageAPI.setLocalUser(null);
    }
    this.checkUser=function(){
        return this.storageAPI.getLocalUser();
    }

});