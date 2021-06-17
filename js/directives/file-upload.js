angular.module("sistemaManutencao").directive('fileUpload', function(usuarioService,storageAPI,authAPI) {
  return {
      require:"ngModel",
      restrict: 'A',
      link: function($scope, el, attrs, ngModel){
          el.bind('change', function(event){
              var files = event.target.files;
              var file = files[0];
              var user=storageAPI.getLocalUser();
              usuarioService.uploadPicture(user.id,file)
                .then(function(data){
                    usuarioService.getUsuarioById(user.id).then(function(data){
                        var userAux=data.data;
                        user.profilePicture=userAux.imagem;
                        authAPI.atualizarImagem(user)
                    })
                })
                .catch(function(error){
                    console.log(error)   
                })
          });
      }
  };
});