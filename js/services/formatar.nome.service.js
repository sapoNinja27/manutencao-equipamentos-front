//adiciona 1 letra maiuscula e a partir de 1 espaço, impede adição de valores invalidos
angular.module("sistemaManutencao").service("formatadorAPI", function () {
    this.formatar=function (frase) {
        frase=frase.replace(/[^A-Za-z çâêîôûãõ]+/g, "");
        let caps = frase.split(" ")
        for(let i = 0; i < caps.length;i++){
            caps[i]=caps[i].substring(0,1).toUpperCase()+caps[i].substring(1);
        }
        for(let i = 0; i < caps.length;i++){
            if(i==0){
                frase=caps[i];
            }else{
                frase+=" "+caps[i];
            }
        }
        return frase;
      }
});