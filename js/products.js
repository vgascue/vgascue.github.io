let productsArray = [];
let min = undefined;
let max = undefined;
//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let product = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + '-' + product.currency + String(product.cost) +`</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + String(product.soldCount) + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; 
    }
}
//Funcion que devuelve una string con el nombre de la categoria segun el id que le des
 function categoria(catID){
    if (catID == 101){
        return "Autos"
    }else{
        if(catID == 102){
            return "Juguetes"
        }else{
            return "Muebles"
        }
    }
 }

 //Funcion que filtra una array segun el costo, y devuelve una array con los productos cuyo costo este dentro del rango que le des (min, max)
function filtrar(array, min, max){
    let ArrayFiltrada = [];
    for(let i = 0; i < array.length; i++){ 
        let product = array[i];
        if (!(product.cost < min) && !(product.cost > max)){
            ArrayFiltrada.push(array[i])
        }
    }
    return ArrayFiltrada
}

//Funcion que limpia el listado
function limpiar(){
    document.getElementById('prod-list-container').innerHTML='';
}

function ordenar(array, criterio){
    return array.sort(criterio)
    
}

function PrecioAsc(a,b){
return a.cost - b.cost; 
}

function PrecioDesc(a,b){
    return b.cost - a.cost
}

function Relevancia(a,b){
    return b.soldCount - a.soldCount 
}

    document.addEventListener("DOMContentLoaded", function(){
        const LIST_URL = "https://japceibal.github.io/emercado-api/cats_products/" + localStorage.getItem("catID") + ".json";
        guardar = "Verás aquí todos los productos de la categoría "+  categoria(localStorage.getItem("catID"));
        document.getElementById('subtituloCategoria').innerHTML = guardar;
        getJSONData(LIST_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {   productsArray = resultObj.data.products;
                showProductsList(productsArray);
            }
        });
        document.getElementById('filtrar').addEventListener('click', function(){
             min = document.getElementById('minimo').value;
             console.log(min)
             max = document.getElementById('maximo').value;
            limpiar()
             showProductsList(filtrar(productsArray, min,max))
        })
        document.getElementById('limpiar').addEventListener('click', function(){
            limpiar()
            showProductsList(productsArray)
        })
        document.getElementById('Pascendente').addEventListener('click', function(){
            limpiar()
            showProductsList(ordenar(productsArray, PrecioDesc))
        })
        document.getElementById('Pdescendente').addEventListener('click', function(){
            limpiar()
            showProductsList(ordenar(productsArray, PrecioAsc))
        })
        document.getElementById('Relevancia').addEventListener('click', function(){
            limpiar()
            showProductsList(ordenar(productsArray, Relevancia))
        })
    });