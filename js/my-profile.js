const fileInput = document.querySelector('input[type="file"]');
const preview = document.querySelector('img.preview');
const reader = new FileReader();


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {  
    fileInput.addEventListener('change', handleSelected);
    renderProfile()
});


function saveData(){
    let name =document.getElementById("inputName").value;
    let lastName = document.getElementById("inputLastname").value;
    let age = document.getElementById("inputAge").value;
    let email = document.getElementById("inputEmail").value;
    let tel = document.getElementById("inputContact").value;
    let img = reader.result 

    let data = {name,lastName,age,email,tel,img}
    localStorage.setItem("profileData", JSON.stringify(data))
    renderProfile()
    
}

function renderProfile(){
    let object = localStorage.getItem("profileData");
    let parsedObj = JSON.parse(object)
    let {name,lastName,age,email,tel,img} = parsedObj;
    
    // insertar los datos en el perfil al cargar
    document.getElementById("insertName").innerHTML = name;
    document.getElementById("insertLastname").innerHTML = lastName;
    document.getElementById("insertAge").innerHTML = age;
    document.getElementById("insertEmail").innerHTML = email;
    document.getElementById("insertTel").innerHTML = tel;

    //insertar los datos actuales en el input para modificar
    document.getElementById("inputName").value = name;
    document.getElementById("inputLastname").value = lastName;
    document.getElementById("inputAge").value = age;
    document.getElementById("inputEmail").value = email;
    document.getElementById("inputContact").value = tel;
    document.getElementById("previewId").src = img;

}

//funciones FileReader
function handleEvent() {
    preview.src = reader.result;
}

function addListeners(reader) {
    reader.addEventListener('loadend', handleEvent);
}

function handleSelected(e) {
    
    const selectedFile = fileInput.files[0];
    if (selectedFile) {
        addListeners(reader);
        reader.readAsDataURL(selectedFile);
    }
}



