$(document).ready(function(){

    var explosives = [];

    function writeDOM(){
        var domString = "";
        for(var i=0; i<explosives.length; i++){
            domString += `<h1>${explosives[i].name}</h1>`;
        }
        $("#promises").append(domString);
    }


///xhr request and data parsing
var categoriesJSON = function(){
	return new Promise(function(resolve, reject){
		$.ajax("./db/categories.json").done(function(data1){
			resolve(data1.categories);
		}).fail(function(error1){
			reject(error1);
		});
	});
};

var productsJSON = function(){
	return new Promise(function(resolve, reject){
		$.ajax("./db/products.json").done(function(data2){
			resolve(data2.products);
		}).fail(function(error2){
			reject(error2);
		});
	});
};

var typesJSON = function(){
	return new Promise(function(resolve, reject){
		$.ajax("./db/types.json").done(function(data3){
			resolve(data3.types);
		}).fail(function(error3){
			reject(error3);
		});
	});
};

//crafting promise package for DOM
	Promise.all([categoriesJSON(), productsJSON(), typesJSON()])
		.then(function(resultz){
			console.log("resultz", resultz);
			resultz.forEach(function(ajaxCalls){
				ajaxCalls.forEach(function(dino){
					explosives.push(dino);
				});
			});
			writeDOM();
		});
});