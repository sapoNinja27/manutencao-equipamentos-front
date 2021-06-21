angular.module("sistemaManutencao").directive('file', function(usuarioService,storageAPI,localUserAPI) {
  return {
      require:"ngModel",
      restrict: 'A',
      link: function($scope, el, attrs, ngModel){
          el.bind('change', function(event){
              var files = event.target.files;
              ngModel.$setViewValue(files);
              $scope.$apply();
          });
      }
  };
});