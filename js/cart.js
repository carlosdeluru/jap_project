let articlesList = []

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json')
    .then(function(resultObj){
        if (resultObj.status === "ok"){
            articlesList = resultObj.data.articles
            showTable(resultObj.data.articles)
        }
    })

});

//muestra tabla
function showTable(articles){
    let htmlToAppend = '';
    for(let i=0; i < articles.length; i++){
    
            htmlToAppend += `<tr id="article${i+1}">
                    
                    <td>${productCard(articles[i],i)}</td>
                    <td><input type="number" onchange="sum();" min="1" value="${articles[i].count}" class=" cantValue" step="1"></td>
                    <td><button class="btn btn-danger" onclick="restSubtotal(${i});(e) => {e.preventDefault();}" id="buttonId">&#x2715 delete Product</button></td>
                    <td ><div>$UYU<div id="productSub${i}"></div></div> </td>
                    </tr>`
    }
    document.getElementById("tableId").innerHTML = htmlToAppend;

    sum()
}
// card con la info del producto en fila 1
function productCard(data,id){
    
    let {name,count,unitCost,currency,src} = data;
    if(currency === "USD"){
      unitCost = unitCost * 40;
    }
    let html = `<div class="card mb-3 shadow rounded" style="max-width: 500px; height: 200px; ">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img src="${src}" class="card-img img-fluid border border-primary" style="max-width:100%;
        max-height:100%;"alt="${name}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">$UYU <span class="precio" id="cost${id+1}">${unitCost}</span></p>
        </div>
      </div>
    </div>
  </div>`

  return html
}

//Corrige el subtotal una vez qur un producto es eliminado, llamada desde el boton
function restSubtotal(id){
  
  let subTotal = parseFloat(document.getElementById("subTotalId").innerHTML) 
  let productSub = parseFloat(document.getElementById(`productSub${id}`).innerHTML)

  let newSubtotal = subTotal - productSub;
  document.getElementById("subTotalId").innerHTML = newSubtotal;

  document.getElementById(`article${id+1}`).remove()
  document.getElementById("myForm").reset()
  
  document.getElementById("shipcostId").innerHTML = "Seleccione un metodo de envio..."
  document.getElementById("shipedId").innerHTML = ""

  sum()
}

// suma tanto el subtotal por producto como el costo total
function sum(){
  let precio = document.getElementsByClassName("precio")
  let cantValue = document.getElementsByClassName("cantValue")
  let sumar = 0;
  let subTotal = 0;
  for(let i=0; i<precio.length ; i++){
    console.log("si")
      sumar = parseFloat(precio[i].innerHTML) * parseFloat(cantValue[i].value);
      subTotal += parseFloat(precio[i].innerHTML) * parseFloat(cantValue[i].value);
      document.getElementById(`productSub${i}`).innerHTML = sumar;

  }
  document.getElementById("subTotalId").innerHTML = subTotal
}

//calcula el costo de envio y lo agrega
function calcShipCost(value){
  let cost = document.getElementById("subTotalId").innerText;
  let shipCost = (cost * value) / 100;
  document.getElementById("shipcostId").innerHTML = shipCost 
  document.getElementById("shipedId").innerHTML = parseFloat(cost) + parseFloat(shipCost)
}