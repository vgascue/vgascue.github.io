let productsArray = [];

function setearProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function MostrarInfo(Producto){
    let htmlContentToAppend = "";
    htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row" id=)>
                <div class="col">
                    <div class="d-flex w-100 justify-content-center">
                        <div class="mb-1">
                        <h1>`+ Producto.name + `</h1> 
                        <h4> Precio </h4> 
                        <p>`+ Producto.cost +`</p> 
                        <h4> Descripción </h4> 
                        <p>`+ Producto.description +`</p> 
                        <h4> Categoría </h4> 
                        <p>`+ Producto.category +`</p> 
                        <h4> Cantidad de vendidos </h4> 
                        <p>`+ Producto.soldCount +`</p> 
                        <h4> Imágenes ilustrativas </h4> 
                        `

        for(let i = 0; i < Producto.images.length; i++){
            htmlContentToAppend +=`
            <img src="` + Producto.images[i] + `" alt="product image" class="img-thumbnail" style="width: 18rem">
    `} 
        htmlContentToAppend+=`</div>
                            </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("Producto").innerHTML = htmlContentToAppend; 
}

function MostrarComentarios(Comentarios){
    let htmlContentToAppend = '';
    for (let i =0; i < Comentarios.length; i++){
        htmlContentToAppend += ` 
        <div class="list-group-item list-group-item-action">
    <div class="row" >
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h4>`
                + Comentarios[i].user + `-` + Comentarios[i].dateTime + `-`
                
        for(j=0;j<Comentarios[i].score;j++){ 
            htmlContentToAppend+=
            `<span class="fa fa-star checked"></span>`}

        for(j=0; j<(5-Comentarios[i].score); j++){
            htmlContentToAppend+=
            `<span class="fa fa-star"></span>`
        }
        htmlContentToAppend +=`</h4>
                <p> `+ Comentarios[i].description +`</p> 
            </div>
        </div>
</div>
</div>
</div>
    `}
    document.getElementById("Comentarios").innerHTML += htmlContentToAppend; 
}

function AñadirComentario(comentario){
    let htmlContentToAppend = '';
    htmlContentToAppend += ` 
        <div class="list-group-item list-group-item-action">
    <div class="row" >
        <div class="col">
            <div class="d-flex w-100 justify-content-center">
                <div class="mb-1">
                <h4>`
                + comentario.user + `-` + comentario.dateTime + `-`
                
        for(j=0;j<comentario.score;j++){ 
            htmlContentToAppend+=
            `<span class="fa fa-star checked"></span>`}

        for(j=0; j<(5-comentario.score); j++){
            htmlContentToAppend+=
            `<span class="fa fa-star"></span>`
        }
        htmlContentToAppend +=`</h4>
                <p> `+ comentario.description +`</p> 
            </div>
        </div>
</div>
</div>
</div>`
document.getElementById("Comentarios").innerHTML += htmlContentToAppend; 

}
function MostrarProdRelacionados(Producto){
    htmlContentToAppend='';
    htmlContentToAppend+=`
    <div id="carouselRelatedProd" class="carousel slide" data-bs-ride="carousel" width='12rem' height='12rem' wrap="true">
    <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselRelatedProd" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    `
    for (let i=1;i<Producto.relatedProducts.length;i++){
        htmlContentToAppend+=`
      <button type="button" data-bs-target="#carouselRelatedProd" data-bs-slide-to="${String(i)}" aria-label="Slide ${String(i)}"></button>
    </div>`;
    }
    htmlContentToAppend+=`<div class="carousel-inner">
    <div class="carousel-item active" onclick=setearProdID(${Producto.relatedProducts[0].id})>
      <img src="${Producto.relatedProducts[0].image}" class="img-thumbnail" style="width: 35rem">
      <div class="carousel-caption d-none d-md-block">
        <h5>${Producto.relatedProducts[0].name}</h5>
      </div>
    </div>`

    for(let i = 1; i < Producto.relatedProducts.length; i++){
        htmlContentToAppend +=`
        <div class="carousel-item" onclick=setearProdID(${Producto.relatedProducts[i].id})>
      <img src="${Producto.relatedProducts[i].image}" class="img-thumbnail" style="width: 35rem">
      <div class="carousel-caption d-none d-md-block">
        <h5>${Producto.relatedProducts[i].name}</h5>
      </div>`
    } 
    htmlContentToAppend+= `</div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>
                  </div>`
    document.getElementById('prodRelacionados').innerHTML+= htmlContentToAppend;

}

document.addEventListener("DOMContentLoaded", function(){
    const InfoProducto = "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("prodID") + ".json";
    const ComentariosProducto = "https://japceibal.github.io/emercado-api/products_comments/" + localStorage.getItem("prodID") + ".json";
    let userID = localStorage.getItem('email');
    document.getElementById('user').innerHTML += `<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${userID}
        </a>
        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
          <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
          <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
          <li><a class="dropdown-item" href="index.html">Cerrar sesión</a></li>
        </ul>
      </li>
    </ul>
  </div>`;
    getJSONData(InfoProducto).then(function(resultObj){
        if (resultObj.status === "ok"){   
            Producto = resultObj.data;
            MostrarInfo(Producto);
            MostrarProdRelacionados(Producto)
        }
    })
    getJSONData(ComentariosProducto).then(function(resultObj){
        if (resultObj.status === "ok"){   
            Comentarios = resultObj.data;
            MostrarComentarios(Comentarios);
        }
    })
    document.getElementById('EnviarComentario').addEventListener('click', function () {
         const comentarioNuevo = {
             user: '',
             score: 0,
             dateTime: '',
             description: ''
         };
         var hoy = new Date();
         comentarioNuevo.user = localStorage.getItem('email');
         comentarioNuevo.score = document.getElementById('scoreProd').value;
         comentarioNuevo.description = document.getElementById('descripcion').value;
         comentarioNuevo.dateTime = hoy.getFullYear() + '-' + hoy.getMonth() + '-' + hoy.getDay() + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
         AñadirComentario(comentarioNuevo)
         
     })
     

})

