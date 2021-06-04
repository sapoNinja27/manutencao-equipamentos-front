angular.module("sistemaManutencao").service("authAPI", function ( $http,config,storageAPI) {

	this.authenticate = function (creds) {
		return $http.post(config.baseUrl + "/login",creds);
	};
    this.successfulLogin= function (authorizationValue){
        let tok = authorizationValue.substring(7);
        let user={
            token:tok,
            // email: jwtHelper.decodeToken(tok)
        };
        console.log(user)
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