const ORDER_ASC_BY_PRICE = ">";
const ORDER_DESC_BY_PRICE = "<";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
let fullProductsArray = [] //para version anterior dee filtrado
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL)
    .then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_BY_PROD_COUNT, resultObj.data);
            fullProductsArray = resultObj.data;
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });
    //desafio buscador y filtro entrega 2
    document.getElementById("searchId").addEventListener("input", function(){
        let value = document.getElementById("searchId").value.toUpperCase()

        //let array = fullProductsArray.filter((product) => product.name.toUpperCase().indexOf(value) > -1 || 
        //product.description.toUpperCase().indexOf(value) > -1)
        //currentCategoriesArray = array;
       
        //showProductsList() 
        searchFilter(value)
        
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });

});

//funcion para seleccionar los elementos a procesar y filtrarlos segun el input(value)
function searchFilter(value){
    let htmlContentToAppend = ""

    let productList = document.getElementById("product-list-container");
    let products = productList.getElementsByTagName("a");
    let filteredCounter = 0;
     for(let i = 0; i < products.length; i++){ 
        let text = products[i].getElementsByClassName("search-selector")
        let txtValue = text[0].innerText +" "+ text[1].innerText
        if(txtValue.toUpperCase().includes(value)){
            products[i].style.display = ""
        }else{
            products[i].style.display = "none"
            filteredCounter++;
        }
    }
    if(products.length === filteredCounter){
        htmlContentToAppend =   `<div class="border border-red-500 background-danger text-red-500 p-3 mt-5 text-center" >
                                    Sorry, there is no result with such description...
                                 </div>`;
        document.getElementById("errorMessId").innerHTML = htmlContentToAppend; 
    }else{
        document.getElementById("errorMessId").innerHTML = ""; 

    }
    
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro productos ordenados
    showProductsList();
}

function sortCategories(criteria,array){
    let result = [];
    switch(criteria){
        case ORDER_ASC_BY_PRICE:
            result = array.sort(function(a, b) {
                if ( a.cost < b.cost ){ return -1; }
                if ( a.cost > b.cost ){ return 1; }
                return 0;
            });
            break;
        case ORDER_DESC_BY_PRICE:
            result = array.sort(function(a, b) {
                if ( a.cost > b.cost ){ return -1; }
                if ( a.cost < b.cost ){ return 1; }
                return 0;
            });
            break;
        case ORDER_BY_PROD_COUNT:
            result = array.sort(function(a, b) {
                let aCount = parseInt(a.soldCount);
                let bCount = parseInt(b.soldCount);
    
                if ( aCount > bCount ){ return -1; }
                if ( aCount < bCount ){ return 1; }
                return 0;
            });

        default:
            return array; 
    }
    return result;
}

function showProductsList(){
    let htmlContentToAppend = ""
    
    for( item of currentCategoriesArray){
        
        const {imgSrc,name, description, currency, soldCount, cost} = item;
        if (((minCount == undefined) || (minCount != undefined && parseInt(cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(cost) <= maxCount))){
        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${imgSrc}" alt="${cost}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class=" w-100 justify-content-between">
                        <h4 class="mb-3 search-selector">${name}</h4>
                        <p class="mb-3 search-selector">${description}</p>
                        <p>${currency}-${cost}</p>
                    </div>
                    
                </div>
                <small class="text-muted">${soldCount} artículos vendidos</small>
            </div>
        </a>
        `}
    }
    
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    
}