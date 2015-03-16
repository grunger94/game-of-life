var velocidad_refrescado = 500;
var porciento_celdas_vivas = 0.5;
var cuantas_x = 20;
var cuantas_y = null;

var contador_x = -1;
var contador_y = -1;
var contador_i = -1;

var ancho_celda = null;
var alto_celda = null;

var celdas = {};
var alrededores = [[-1, -1], [0, -1], [1, -1],[-1, 0], [1, 0],[-1, 1], [0, 1], [1, 1]];

var grid = $("#grid");
var contexto = grid[0].getContext("2d");

var Celda = function(x, y, vivo)
{
    this.x = x;
    this.y = y;
    this.key = (x+'_'+y);
    this.vivo = vivo;
    this.nuevo_status = false;
    this.vecinos = false;
}

function set_celdas()
{
    recorre_xy(agregar_celda);
}

function set_vecinos_celdas()
{
    recorre_xy(obtiene_vecinos);
}

function tick()
{
    setInterval(itera_juego, velocidad_refrescado);
}

function itera_array(arr, funcion_a_ejecutar, parametros)
{
    $("#i").on("click", recorre_i);
    contador_i = -1;
    $("#i").trigger("click", [arr, funcion_a_ejecutar, parametros]);
}

function recorre_xy(funcion_a_ejecutar)
{
    $("#x").on("click", recorre_x);
    $("#y").on("click", recorre_y);
    contador_x = contador_y = -1;
    $("#x").trigger("click", funcion_a_ejecutar);
}

function recorre_x(evento, funcion_a_ejecutar)
{        
    contador_x++;
    es_fin_x[contador_x == cuantas_x](funcion_a_ejecutar);
}
    
function recorre_y(evento, funcion_a_ejecutar)
{       
    contador_y++;
    es_fin_y[contador_y == cuantas_y](funcion_a_ejecutar);
}

function recorre_i(evento, arr, funcion_a_ejecutar, parametros)
{        
    contador_i++;
    es_fin_array[contador_i == arr.length](arr, funcion_a_ejecutar, parametros);
}
    
function siguiente_ciclo_x(funcion_a_ejecutar)
{
    contador_y = -1;
    $("#x").trigger("click", funcion_a_ejecutar);
}
    
function siguiente_ciclo_y(funcion_a_ejecutar)
{
    var temporal = [];
    itera_array(parametros[funcion_a_ejecutar.name], interpreta_parametros, temporal);
    funcion_a_ejecutar.apply(this, temporal);
    $("#y").trigger("click", funcion_a_ejecutar);
}

function interpreta_parametros(parametro, temporal)
{
    agrega_a_array(temporal, tipos_parametro[parametro.tipo](parametro));
}

function siguiente_ciclo_array(arr, funcion_a_ejecutar, parametros)
{
    var parametros_funcion = [arr[contador_i], parametros];
    funcion_a_ejecutar.apply(this, parametros_funcion);
    $("#i").trigger("click", [arr, funcion_a_ejecutar, parametros]);
}

function termina_ciclo_x()
{
    $("#x, #y").off("click");
}

function termina_ciclo_array()
{
    $("#i").off("click");
}

function itera_y(funcion_a_ejecutar)
{
    $("#y").trigger("click", funcion_a_ejecutar);
}

function agregar_celda(x, y)
{    
    return existe_celda[obtiene_celda(x, y)](x, y);
}

function obtiene_celda(x, y)
{   
    return es_objeto[celdas[x+'_'+y] != undefined](x, y);
}

function crea_celda(x, y)
{
    celdas[x+'_'+y] = new Celda(x, y, Math.random() <= porciento_celdas_vivas);
    return celdas[x+'_'+y];
}

function retorna_celda(x, y)
{
    return celdas[x+'_'+y];
}

function obtiene_vecinos(celda)
{
    return existe_vecino_celda[!!celda.vecinos](celda);
}

function agrega_vecinos(celda)
{
    celda.vecinos = new Array;
    itera_array(alrededores, agrega_celda_vecina, celda);
    return celda.vecinos;
}

function retorna_vecinos(celda)
{
    return celda.vecinos;
}

function agrega_celda_vecina(posicion_vecino, celda)
{
    var vecino = obtiene_celda((celda.x + posicion_vecino[0]), (celda.y + posicion_vecino[1]));
    es_vecino[!!vecino](celda.vecinos, vecino);
}

function agrega_a_array(arr, elemento)
{
    arr.push(elemento);
}

function obtiene_vecinos_vivos(celda)
{
    var vecinos = $.grep(obtiene_vecinos(celda), function(celda){ return celda.vivo });
    return vecinos.length;
}

function ejecuta_parametro_funcion(parametro)
{          
    var temporal = [];
    itera_array(parametro.parametros, agrega_a_array_valor_dom, temporal);
    return parametro.valor.apply(this, temporal);
}

function agrega_a_array_valor_dom(parametro, temporal)
{
    agrega_a_array(temporal, window[parametro]);
}

function obtiene_valor_variable(parametro)
{
    return window[parametro.valor];
}

function dos_vecinos(vivo)
{
    return Number(vivo);
}

function cero()
{
    return 0;
}

function uno()
{
    return 1;
}

function falso()
{
    return false;
}

function nuevo_estatus_celda(celda)
{
    var vecinos_vivos = obtiene_vecinos_vivos(celda);  
    celda.nuevo_status = evaluador_vecinos[vecinos_vivos](celda.vivo);
}

function aplica_reglas()
{
    recorre_xy(nuevo_estatus_celda);
}    

function itera_juego()
{
    limpia_canvas();
    aplica_reglas();
    dibuja();
}

function dibuja()
{
    recorre_xy(dibuja_celda);
}

function dibuja_celda(celda)
{
    contexto.strokeStyle = '#007466';
    es_celda_viva[celda.vivo](celda);
    celda.vivo = !!celda.nuevo_status;
}

function colorea_celda(celda)
{
    contexto.fillStyle = '#007466';
    contexto.fillRect((celda.x * ancho_celda), (celda.y * alto_celda), ancho_celda, alto_celda);
}

function borra_celda(celda)
{
    contexto.fillStyle = 'white';
    contexto.clearRect((celda.x * ancho_celda), (celda.y * alto_celda), ancho_celda, alto_celda);
}

function dimensiona_canvas()
{
    var ancho_ventana = $(window).width();
    var alto_ventana  = $(window).height();
    actualiza_medidas(ancho_ventana, alto_ventana); 
}

function actualiza_medidas(ancho_ventana, alto_ventana)
{
    grid.attr("width",  ancho_ventana);
    grid.attr("height", alto_ventana);
    ancho_celda = alto_celda = (ancho_ventana / cuantas_x);
    cuantas_y = Math.floor(alto_ventana / alto_celda);
}

function limpia_canvas()
{
    contexto.clearRect(0, 0, grid.width(), grid.height());
}

function muestra_inicio()
{
    var x = contexto.canvas.width / 2;
    var y = contexto.canvas.height / 2;
    texto_bienvenida(x, y);
}

function texto_bienvenida(x, y)
{
    contexto.textAlign = "center";
    contexto.font = "bold 20px Arial";
    contexto.fillText("Let's run this thing!", x, y);
    contexto.fillText("To start, click anywhere in the window", (x-10), (y+20));
}