
$(document).ready(function(){

    var categories = [];
    var types = [];
    var products = [];

//////////////////////////////////// populate categories and filter types
   function writeCategories(categories){
   		$("#typesButton").prop('disabled', true);

        var catString = "";
        for(var i=0; i<categories.length; i++){
            catString += `<li id="categories-${categories[i].id}"><a class="catListClass">${categories[i].name}</a></li>`;
        }
        $("#categoriesList").append(catString);
    }

$("body").on("click", ".catListClass", function(){ 
	var categoryType = $(this).parent().attr("id");
	var categoryNumber = categoryType.split("categories-");
	var filteredTypes = [];
		for (var x = 0; x < types.length; x++) {
			if (types[x].category_id == categoryNumber[1]) {
				filteredTypes.push(types[x]);
		}
	}
	writeTypes(filteredTypes);
});

//////////////////////////////// populate types dropdown, filter products to write DOM
    function writeTypes(types){
    	$("#typesButton").prop('disabled', false);

        var typeString = "";
        for(var i=0; i<types.length; i++){
            typeString += `<li id="types-${types[i].id}"><a class="typeListClass">${types[i].name}</a></li>`;
        }
        $("#typesList").append(typeString);
    }

$("body").on("click", ".typeListClass", function(){ 
	var typeID = $(this).parent().attr("id");
	var typeNumber = typeID.split("types-");
	var filteredProducts = [];
		for (var a = 0; a < products.length; a++) {
			if (products[a].type == typeNumber[1]) {
				filteredProducts.push(products[a]);
		}
	}
	writeDOM(filteredProducts);
});

//////////////////////////////////////// card creator
    function writeDOM(products){
    	var productString = "";
    	for(var i=0; i<products.length; i++) {
    		productString += `<div class="container col-md-4 type-${products[i].type} category-${products[i].category}">`;
    		productString += `<div class="thumbnail"><img src="${products[i].image}" alt="${products[i].name}">`;
      		productString += `<div class="caption"><h3>${products[i].name}</h3><p>${products[i].description}</p>`;
       //buttons: <p><a href="#" class="btn btn-danger" role="button">Boom</a> <a href="#" class="btn btn-warning" role="button">Bang</a></p>
      		productString += `</div></div></div>`;
    	}
    	$("#products").append(productString);
    }

/////////////////////////////////xhr request and data parsing
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

///////////////////////////////////////////crafting promise package for DOM
categoriesJSON().then(function(results){
	results.forEach(function(myCategories){
		categories.push(myCategories);
	});
	writeCategories(categories);
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

});