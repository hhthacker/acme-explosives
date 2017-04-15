$(document).ready(function(){

    var categories = [];
    var types = [];
    var products = [];

    function writeCategories(){
        var categoriesString = "";
        console.log(explosives, "boom");
        for(var i=0; i<explosives.length; i++){
            categoriesString += `<li><a href="#">${explosives[i].name}</a></li>`;
        }
        $("#categories").append(categoriesString);
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
// 	Promise.all([categoriesJSON(), productsJSON(), typesJSON()])
// 		.then(function(resultz){
// 			console.log("resultz", resultz);
// 			resultz.forEach(function(ajaxCalls){
// 				ajaxCalls.forEach(function(boom){
// 					explosives.push(boom);
// 				});
// 			});
// 			writeCategories();
// 		});
// });



categoriesJSON().then(function(results){
	results.forEach(function(myCategories){
		categories.push(myCategories);
	});
});


productsJSON().then(function(results){
	results.forEach(function(myProducts){
		products.push(myProducts);
	});
});

typesJSON().then(function(results){
	results.forEach(function(myTypes){
		types.push(myTypes);
	});
});

console.log("movement types", types);
console.log("movement categories", categories);
console.log("movement products", products);


});
