function vacio(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value
    if (email.length == 0 || password.length ==0 ){
        return true
    }else{
        return false
    }    

}

document.getElementById("botonIngreso").addEventListener("click", function(){
    console.log(vacio())
    if (!vacio()){
        localStorage.setItem("email", document.getElementById('email').value)
        window.location = "portada.html"
}else{
    alert('Por favor ingrese email y contraseña para ingresar al sitio')
}
})