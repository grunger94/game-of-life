/*---------------------------------------------VARIABLES------------------------------------------*/
var velocidadRefrescado   = 500;
var porcientoCeldasVivas = 0.5;
var cuantasX = 20;
var cuantasY = null;
var contadorI = -1;

var anchoCelda = null;
var altoCelda  = null;

var alrededores = [[-1, -1], [0, -1], [1, -1],[-1, 0], [1, 0],[-1, 1], [0, 1], [1, 1]];

var celdas = {};
var grid   = $("#grid");
var contexto = grid[0].getContext("2d");

var contadorX = -1;
var contadorY = -1;

/*-----------------------------------------------CLASES--------------------------------------------*/

var Verdadero = function(){}
var Falso     = function(){}

var Celda = function(x, y, vivo)
{
    this.x = x;
    this.y = y;
    this.key = (x+'_'+y);
    this.vivo = vivo;
    this.nuevoEstatus = new Falso;
    this.vecinos = new Falso;
}

/*---------------------------------------------FUNCIONES------------------------------------------*/

function setCeldas()
{
    recorreXY(agregarCelda);
}

function setVecinosCeldas()
{
    recorreXY(obtieneVecinos);
}

function tick()
{
    setInterval(iteraJuego, velocidadRefrescado);
}

function iteraArray(arr, funcionAEjecutar, parametros)
{
    $("#i").on("click", recorreI);
    contadorI = -1;
    $("#i").trigger("click", [arr, funcionAEjecutar, parametros]);
}

function recorreXY(funcionAEjecutar)
{
    $("#x").on("click", recorreX);
    $("#y").on("click", recorreY);
    contadorX = contadorY = -1;
    $("#x").trigger("click", funcionAEjecutar);
}

function recorreX(e, funcionAEjecutar)
{        
    contadorX++;
    esFinX[contadorX == cuantasX](funcionAEjecutar);
}
    
function recorreY(e, funcionAEjecutar)
{       
    contadorY++;
    esFinY[contadorY == cuantasY](funcionAEjecutar);
}

function recorreI(e, arr, funcionAEjecutar, parametros)
{        
    contadorI++;
    esFinArray[contadorI == arr.length](arr, funcionAEjecutar, parametros);
}
    
function siguienteCicloX(funcionAEjecutar)
{
    contadorY = -1;
    $("#x").trigger("click", funcionAEjecutar);
}
    
function siguienteCicloY(funcionAEjecutar)
{
    var temporal = [];
    iteraArray(parametros[funcionAEjecutar.name], interpretaParametros, temporal);
    funcionAEjecutar.apply(this, temporal);
    $("#y").trigger("click", funcionAEjecutar);
}

function interpretaParametros(parametro, temporal)
{
    agregaAArray(temporal, tiposParametro[parametro.tipo](parametro));
}

function siguienteCicloArray(arr, funcionAEjecutar, parametros)
{
    var parametrosFuncion = [arr[contadorI], parametros];
    funcionAEjecutar.apply(this, parametrosFuncion);
    $("#i").trigger("click", [arr, funcionAEjecutar, parametros]);
}

function terminaCicloX()
{
    $("#x, #y").off("click");
}

function terminaCicloArray()
{
    $("#i").off("click");
}

function iteraY(funcionAEjecutar)
{
    $("#y").trigger("click", funcionAEjecutar);
}

function agregarCelda(x, y)
{    
    var instancia = obtieneCelda(x, y);
    return accionCelda[!(instancia instanceof Falso)](x, y);
}

function obtieneCelda(x, y)
{   
    var esCelda = celdas[x+'_'+y] instanceof Celda;
    return decideExisteCelda[esCelda](x, y);
}

function creaCelda(x, y)
{
    celdas[x+'_'+y] = new Celda(x, y, Math.random() <= porcientoCeldasVivas); 
}

function retornaCelda(x, y)
{
    return celdas[x+'_'+y];
}

function obtieneVecinos(celda)
{
    return existeVecinoCelda[!(celda.vecinos instanceof Falso)](celda);
}

function agregaVecinos(celda)
{
    celda.vecinos = [];
    iteraArray(alrededores, agregaCeldaVecina, celda);
    return celda.vecinos;
}

function retornaVecinos(celda)
{
    return celda.vecinos;
}

function agregaCeldaVecina(posicionVecino, celda)
{
    var vecino = obtieneCelda((celda.x + posicionVecino[0]), (celda.y + posicionVecino[1]));
    decideEsVecino[vecino instanceof Celda](celda.vecinos, vecino);
}

function agregaAArray(arr, elemento)
{
    arr.push(elemento);
}

function obtieneVecinosVivos(celda)
{
    var vecinos = $.grep(obtieneVecinos(celda), function(celda){ return celda.vivo });
    return vecinos.length;
}

function ejecutaParametroFuncion(parametro)
{          
    var temporal = [];
    iteraArray(parametro.parametros, agregaAArrayValorDom, temporal);
    return parametro.valor.apply(this, temporal);
}

function agregaAArrayValorDom(parametro, temporal)
{
    agregaAArray(temporal, window[parametro]);
}

function obtieneValorVariable(parametro)
{
    return window[parametro.valor];
}

function dosVecinos(vivo)
{
    return instanciaBooleana[vivo]();
}

function verdadero()
{
    return new Verdadero;
}

function falso()
{
    return new Falso;
}

function nuevoEstatusCelda(celda)
{
    var vecinosVivos = obtieneVecinosVivos(celda);
    var instancia = vive[vecinosVivos](celda.vivo);
    celda.nuevoEstatus = instancia;
}

function aplicaReglas()
{
    recorreXY(nuevoEstatusCelda);
}    

function iteraJuego()
{
    limpiaCanvas();
    aplicaReglas();
    dibuja();
}

function dibuja()
{
    recorreXY(dibujaCelda);
}

function dibujaCelda(celda)
{
    contexto.strokeStyle = '#007466';
    decideColorCelda[celda.vivo](celda);
    celda.vivo = celda.nuevoEstatus instanceof Verdadero;
}

function coloreaCelda(celda)
{
    contexto.fillStyle = '#007466';
    contexto.fillRect((celda.x * anchoCelda), (celda.y * altoCelda), anchoCelda, altoCelda);
}

function borraCelda(celda)
{
    contexto.fillStyle = 'white';
    contexto.clearRect((celda.x * anchoCelda), (celda.y * altoCelda), anchoCelda, altoCelda);
}

function dimensionaCanvas()
{
    var anchoVentana = $(window).width();
    var altoVentana  = $(window).height();
    actualizaMedidas(anchoVentana, altoVentana); 
}

function actualizaMedidas(anchoVentana, altoVentana)
{
    grid.attr("width",  anchoVentana);
    grid.attr("height", altoVentana);
    anchoCelda = altoCelda = (anchoVentana / cuantasX);
    cuantasY = Math.floor(altoVentana / altoCelda);
}

function limpiaCanvas()
{
    contexto.clearRect(0, 0, grid.width(), grid.height());
}

function muestraInicio()
{
    var x = contexto.canvas.width / 2;
    var y = contexto.canvas.height / 2;
    textoBienvenida(x, y);
}

function textoBienvenida(x, y)
{
    contexto.textAlign = "center";
    contexto.font = "bold 20px Arial";
    contexto.fillText("Let's run this thing!", x, (y-10));
    contexto.fillText("To start, click anywhere in the window", x, (y+10));
}
