angular.module("sistemaManutencao").service("storageAPI", function ( STORAGE_KEYS) {
    this.getLocalUser=function(){
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr==null){
            return null;
        }else{
            return JSON.parse(usr);
        }
    };
    this.setLocalUser=function(obj){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }else{
            localStorage.setItem(STORAGE_KEYS.localUser,JSON.stringify(obj));
        }
    };
});