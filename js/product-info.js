let productInfoObj = {}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL)
    .then(function(resultObj){
        if (resultObj.status === "ok"){
            ShowProduct(resultObj.data)
            productInfoObj = resultObj.data
        }
    return getJSONData(PRODUCTS_URL) ;
    })
    .then( (result) => {
        if(result.status === "ok"){
            showRelatedProducts(result.data,productInfoObj)
        }

    })

    //Fetchear comentarios y mostrarlos
    getJSONData(PRODUCT_INFO_COMMENTS_URL)
    .then((result) => {
        if(result.status === "ok"){
            showComments(result.data)
        }
    })
    //eventListener del subbmit para el comentario
    document.getElementById("postCommentId").addEventListener("submit", (e) => {

        e.preventDefault()

        let score = document.getElementById("starsId").value 
        let comment = document.getElementById("commentId").value 
        
        if(comment.replace(/\s/g, "") === ""){
            
            let htmlContentToAppend =   `<div class="border border-danger bg-danger text-white p-3 mt-1 mb-1 text-center" >
                                    Por favor, escribe un comentario valido
                                 </div>`;
            
            let div = document.createElement("div")
            div.innerHTML = htmlContentToAppend;
            document.getElementById("errorMess").innerHTML = htmlContentToAppend;

        }else{
            postComment(score,comment)
            document.getElementById("commentId").value = ""
            document.getElementById("errorMess").innerHTML = ""
        }
    })
    
});


//Muestra parte principal con galeria de imagenes y un card con info del producto
function ShowProduct(productObj){
    let htmlCardToAppend = ""
    let htmlMainImgToAppend = ""
    let htmlImgGroupToAppend = ""


    let card = document.getElementById("insertProductCard");
    let mainImg = document.getElementById("mainImgId");
    let imgGroup = document.getElementById("imgGroup");

    let {name,description, cost, currency,soldCount,category,images,relatedProducts} = productObj
    showDescription(description)
    htmlCardToAppend = `<div class="card h-100" >
    <small class="text-muted mb-3 mt-3 ml-3">${category} autos | Vendidos ${soldCount} </small>
    <div class="card-body">
      <h3 class="card-text font-weight-bold mb-5">${name}</h3>
      <p class="card-text font-weight-bold "> ${currency} ${cost}</p>
      
      <form action="#" class="mt-5" >
      <div class="mb-3">
        <label for="" class="form-label"  >Consulta al vendedor:</label>
        <textarea class="form-control"  rows="3" placeholder="Escribe tu consulta...<ficticio de relleno>" ></textarea>
      </div>
      
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Enviar consulta</button>
      </div>
    </form>
    </div>`

    htmlMainImgToAppend = ` <img class="d-block w-100 rounded" id="mainImg" src="./${images[0]}">`

    for(image of images){
        htmlImgGroupToAppend += `<img class="d-block w-100 rounded mb-3 " onmouseenter="changeMainImage(this)"
        onmouseleave="mouseLeave(this)" src="./${image}">`

    }
    imgGroup.innerHTML = htmlImgGroupToAppend;
    mainImg.innerHTML = htmlMainImgToAppend;
    card.innerHTML = htmlCardToAppend;


}

//muestra productos relacionados
function showRelatedProducts(productsArray,productObj){
    let htmlToAppend = "";
    
    for(item of productObj.relatedProducts){
        
        if(productsArray[item] !== undefined){
            let {name,description,cost,currency,imgSrc,soldCount} = productsArray[item];

            htmlToAppend += `<div class="card ml-2" style="width: 18rem;"  onmouseenter="mouseEnter(this)"
            onmouseleave="mouseLeave(this)">
            <img src="./${imgSrc}" class="card-img-top" alt="Fiat way">
            <small class="text-muted mb-3 mt-3 ml-3"> Vendidos ${soldCount} </small>
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${description}</p>
              <p class="card-text font-weight-bold">${currency} ${cost}</p>
              <a href="#" class="btn btn-primary">see more...</a>
            </div>
          </div>`
        }
    }
    
    document.getElementById("insertRecommended").innerHTML = htmlToAppend;

}

//muestra descripcion
function showDescription(description){
    htmlToAppend = `<p class="text-center">${description}</p>`;

    document.getElementById("insertdescription").innerHTML = htmlToAppend;
}


//generador de estrellas
function starsGenerator(score){
    
    let startsToAppend = ""
        for(let i=0 ; i<5 ; i++){
            if(i < score){
                startsToAppend +=`<span class="fa fa-star checked"></span>`
            }else{
                startsToAppend +=`<span class="fa fa-star "></span>`
            }
        }
        return startsToAppend
}

//muestra comentarios
function showComments(comments){
    htmlToAppend = ""

    for(comment of comments){
        let {score, description,user,dateTime} = comment;
       
        let startsToAppend = starsGenerator(score);
        
        htmlToAppend += `<div class="mb-2">
        <div>${startsToAppend}</div>
        <p class="font-weight-bold fas fa-user"> ${user} Said:</p>
        <p>${description}</p>
        <small class="text-muted mb-3 mt-3 ml-3">${dateTime}</small>
      </div>
      <hr>`
    }

    document.getElementById("insertComments").innerHTML = htmlToAppend;
}

//agrega el nuevo comentario
function postComment(score,comment){
    let htmlToAppend = "";

    let startsToAppend = starsGenerator(score)
    let div = document.createElement("div")
    let user = localStorage.getItem("user")

    let date = new Date()
    options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        
      };
    let dateFormated = new Intl.DateTimeFormat('en-CA', options).format(date)

    htmlToAppend += `<div class="mb-2">
        <div>${startsToAppend}</div>
        <p class="font-weight-bold">${user} Said:</p>
        <p>${comment}</p>
        <small class="text-muted mb-3 mt-3 ml-3">${dateFormated}</small>
      </div>
      <hr>`
    div.innerHTML = htmlToAppend;
    document.getElementById("insertComments").appendChild(div)

}


//cambia imagen principal de galeria
function changeMainImage(e){
    e.classList.add("border","border-primary");
   
    document.getElementById("mainImg").src = e.src
    
}

//funcionalidad secundaria de estilos
function mouseEnter(e){
    e.classList.add("border","border-primary");
}

function mouseLeave(e){
    e.classList.remove("border");
    e.classList.remove("border-primary");

}