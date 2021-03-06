let articlesList = []

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json')
    .then(function(resultObj){
        if (resultObj.status === "ok"){
            articlesList = resultObj.data.articles

            showTable(articlesList)
            calcShipCost(5)
        }
    })
    calcShipCost(5)

});

//muestra tabla
function showTable(articles){
    let htmlToAppend = '';
    for(let i=0; i < articles.length; i++){
      let {name,count,unitCost,currency,src} = articles[i];
            if(currency === "USD"){
              unitCost = unitCost * 40;
            }
    
            htmlToAppend += `<tr id="article${i+1}">
                    
                    <td><h5 class="">${name}</h5><img src="${src}" class="img-thumbnail " width="150" height="150" alt="${name}"></td>
                    <td><div>$UYU </div><span class="precio" id="cost${i}">${unitCost}</span></td>
                    <td><div  ><input type="number" onchange="sum();" min="1" class="form-control cantValue" style="width: 100px;"    value="${count}" step="1"></div></td>
                    <td ><div>$UYU <div id="productSub${i}"></div></div> </td>
                    <td><a href="#" class="" onclick="restSubtotal(${i});(e) => {e.preventDefault();}" id="buttonId">&#x2715 delete Product</a></td>
                    </tr>`
    }
    document.getElementById("tableId").innerHTML = htmlToAppend;

    sum()
}

//Corrige el subtotal una vez qur un producto es eliminado, llamada desde el boton
function restSubtotal(id){
  
  let subTotal = parseFloat(document.getElementById("subTotalId").innerHTML) 
  let productSub = parseFloat(document.getElementById(`productSub${id}`).innerHTML)

  let newSubtotal = subTotal - productSub;
  document.getElementById("subTotalId").innerHTML = newSubtotal;

  document.getElementById(`article${id+1}`).remove();
  document.getElementById("myForm").reset();
  
  document.getElementById("shipcostId").innerHTML = "Seleccione un metodo de envio..."
  document.getElementById("shipcostId").classList.add("bg-warning")

  document.getElementById("shipedId").innerHTML = ""

  sum()
}

function showPaymentForm(value){
  if(value === "tarjeta"){
    document.getElementById("tarjetaFormId").style.display = "block";
    document.getElementById("bancId").style.display = "none";

    document.getElementById("paymentMethodsId").style.display = "none";

  }else{
    document.getElementById("tarjetaFormId").style.display = "none";
    document.getElementById("bancId").style.display = "block";

    document.getElementById("paymentMethodsId").style.display = "none";

  }
}

function showPaymentMethods(){
  document.getElementById("bancId").style.display = "none";
  document.getElementById("tarjetaFormId").style.display = "none";

  document.getElementById("paymentMethodsId").style.display = "block";
  document.getElementById("paymentMethodsId").reset();
  document.getElementById("bancId").reset();
  document.getElementById("tarjetaFormId").reset();


  
}
    
// suma tanto el subtotal por producto como el costo total
function sum(){
  let precio = document.getElementsByClassName("precio")
  let cantValue = document.getElementsByClassName("cantValue")
  let sumar = 0;
  let subTotal = 0;
  for(let i=0; i<precio.length ; i++){
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
  document.getElementById("shipcostId").innerHTML = parseFloat(shipCost) 
  document.getElementById("shipedId").innerHTML = parseFloat(cost) + parseFloat(shipCost)
}