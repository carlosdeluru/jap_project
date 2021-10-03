const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


//funcion para extraer la ubicacion actual de la URL 
//y extraer el nombre del archivo. es decir: "login.html", "index.html"... 
let currentLocation = () => {
  let pathArray = window.location.href.split("/")
  return pathArray[pathArray.length - 1]
}

//funcion que chequea el Cookie si el usiario esta logeado cada vez que carga una nueva pagina.
// Si no esta logeado y no esta ubicado en login.html lo redirige a la misma con un alert
let checkLogin = () => { 
  
  if(sessionStorage.getItem("loged") === null && (currentLocation() != "login.html")){
    window.location.replace("login.html")
    alert("Please, Login")
  }else{
    document.getElementById("userId").innerHTML = `<div class="dropdown">
    <button class="btn btn-primary  dropdown-toggle fas fa-user" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         ${localStorage.getItem("user")}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
      <a class="dropdown-item" href="cart.html">Mi carrito</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#" onclick="cerrarSesion()">Cerrar sesión</a>
    </div>
  </div>`;
  }
}

function cerrarSesion(){
  sessionStorage.removeItem("loged");
  localStorage.removeItem("user")
  window.location.replace("login.html")
}

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

checkLogin()

});

