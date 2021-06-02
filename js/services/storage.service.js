angular.module("sistemaManutencao").service("storageAPI", function ($http, config) {
	
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