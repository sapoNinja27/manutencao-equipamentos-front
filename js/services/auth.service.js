angular.module("sistemaManutencao").service("authAPI", function ( $http,config,storageAPI) {

	this.authenticate = function (creds) {
		return $http.post(config.baseUrl + "/login",creds);
	};
    this.successfulLogin= function (authorizationValue){
        let tok = authorizationValue.substring(7);
        let user={
            token:tok,
            perfis:null,
            nome:null,
            id:null
            // email: jwtHelper.decodeToken(tok)
        };
        storageAPI.setLocalUser(user);
    }
    this.atualizarUsuario=function(usuario){
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
            token:storageAPI.getLocalUser().token,
            perfil:perfil,
            nome:usuario.nome,
            id:usuario.id
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