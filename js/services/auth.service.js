angular.module("sistemaManutencao").factory("authAPI", function (http, config) {
	var _authenticate = function (creds) {
		return http.post(config.baseUrl + "/login",creds,
        {
            observe: 'response',
            responseType: 'text'
        });
	};
    var _successfulLogin= function (authorizationValue){
        let tok = authorizationValue.substring(7);
        let user={
            token:tok,
            email: this.jwtHelperService.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }
    // authenticate(creds : CredenciaisDTO) {
    //     return this.http.post(
    //         `${API_CONFIG.baseUrl}/login`, 
    //         creds,
    //         {
    //             observe: 'response',
    //             responseType: 'text'
    //         });
    // }
    // refreshToken() {
    //     return this.http.post(
    //         `${API_CONFIG.baseUrl}/auth/refresh_token`, 
    //         {},
    //         {
    //             observe: 'response',
    //             responseType: 'text'
    //         });
    // }
    
    // logout(){
    //     this.storage.setLocalUser(null);
    // }
    // checkUser(){
    //     return this.storage.getLocalUser();
    // }
	return {
		authenticate: _authenticate,
        successfulLogin:_successfulLogin
	};
});