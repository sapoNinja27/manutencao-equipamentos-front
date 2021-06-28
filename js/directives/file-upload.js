//diretiva criada para atualizar o icone do usuario no change da imagem, não esta sendo utilizada pois da de usar a diretiva geral de ng model pra isso
angular.module("sistemaManutencao").directive('fileUpload', function(usuarioService,storageAPI,localUserAPI) {
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
                        localUserAPI.atualizarImagem(data.data.imagem)
                    })
                })
                .catch(function(){
                     
                })
          });
      }
  };
});