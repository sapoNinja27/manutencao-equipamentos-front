//filtra um valor para rg
angular.module("sistemaManutencao").filter("rg", function () {
	return function (input) {
		rg=input.replace(/[^0-9]+/g, "");
        if(rg.length>2){
            rg=rg.substring(0,2)+"."+rg.substring(2);
        }
        if(rg.length>6){
            rg=rg.substring(0,6)+"."+rg.substring(6);
        }
        if(rg.length>10){
            rg=rg.substring(0,10)+"-"+rg.substring(10);
        }
        if(rg.length>12){
            rg=rg.substring(0,12);
        }
		return rg;
	};
});