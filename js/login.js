//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    //Funcion target cuando el usuario hace submit del login form.
    //el usuario es redirigido al index.html, se le pone una Cookie con logeado que le va a permitir no ser
    //redirigido a login por x tiempo establecido como expire
    document.getElementById("loginFormId").addEventListener("submit", (e) => {
        e.preventDefault()
        const user = document.getElementById("inputUser").value
        setCookie("loged","true",20)
        localStorage.setItem("user",String(user))
        //document.cookie = `username=${user};`
        
        alert("Welcome to e-mercado: " + user)
        window.location.replace("index.html")
        
        
    })
           
});