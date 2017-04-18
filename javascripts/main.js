
$(document).ready(function(){

    var categories = [];
    var types = [];
    var products = [];


//////////////////////////////////// drop down maker and filter
        function filterCategories() {
        	console.log("wooo");
	// 	$("#categories-0").click(console.log("cat0hey")); {
	// 	// 	console.log("cat0");
	// 	// } else if ($("#categories-1")) {
	// 	// 	console.log("cat1");
	// 	// } else if ($("#categories-2")) {
	// 	// 	console.log("cat2");
	// 	}
	 }


   function writeCategories(categories){
        var catString = "";
        for(var i=0; i<categories.length; i++){
            catString += `<li id="#categories-${categories[i].id}" role="button" data-toggle="modal">${categories[i].name}</li>`;
        }
        $("#categories").append(catString);
        $("#categories-0").click(function(){ console.log("ahh"); filterCategories(); return false; });
    }


    function writeTypes(types){
        var typeString = "";
        for(var i=0; i<types.length; i++){
            typeString += `<li><a href="#types-${types[i].id}" onclick="${filterTypes()}">${types[i].name}</a></li>`;
        }
        $("#types").append(typeString);
    }

    function filterTypes() {
		console.log("hey types");
	}

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
	writeDOM(products);
});

typesJSON().then(function(results){
	results.forEach(function(myTypes){
		types.push(myTypes);
	});
	writeTypes(types);
});

});