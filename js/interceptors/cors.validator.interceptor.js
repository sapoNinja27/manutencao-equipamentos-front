angular.module("sistemaManutencao").factory("authInterceptor", function ($q,storageAPI,config) {
	return {
        request: function(url) {
            localUser = storageAPI.getLocalUser();
            let N = config.baseUrl.length;
            let requestToApi = url.url.substring(0,N) == config.baseUrl;
            if(localUser !=null  && requestToApi){
                url.headers["Authorization"] = "Bearer " + localUser.token
                return $q.when(url);
            }else{
                return $q.when(url);
            }
        }
	};
});

