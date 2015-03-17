var parametros = 
{
    "agregar_celda":       [{"tipo": "variable", "valor": "contador_x"}, {"tipo": "variable", "valor": "contador_y"}],
    "obtiene_vecinos":     [{"tipo": "funcion", "valor": obtiene_celda, "parametros": ["contador_x", "contador_y"]}],
    "nuevo_estatus_celda": [{"tipo": "funcion", "valor": obtiene_celda, "parametros": ["contador_x", "contador_y"]}],
    "dibuja_celda":        [{"tipo": "funcion", "valor": obtiene_celda, "parametros": ["contador_x", "contador_y"]}]
};

var tipos_parametro     =  {"funcion": ejecuta_parametro_funcion, "variable": obtiene_valor_variable};
var evaluador_vecinos   =  {0: falso, 1: falso, 2: dos_vecinos, 3: verdadero, 4: falso, 5: falso, 6: falso, 7: falso, 8: falso};

var es_fin_x            =  {true: termina_ciclo_x,     false: itera_y};
var es_fin_y            =  {true: siguiente_ciclo_x,   false: siguiente_ciclo_y};
var es_fin_array        =  {true: termina_ciclo_array, false: siguiente_ciclo_array};
var decide_existe_celda =  {true: retorna_celda,       false: falso};
var accion_celda        =  {true: retorna_celda,       false: crea_celda};
var decide_color_celda  =  {true: colorea_celda,       false: falso};
var existe_vecino_celda =  {true: retorna_vecinos,     false: agrega_vecinos};
var decide_es_vecino    =  {true: agrega_a_array,      false: falso};
var instancia_booleana  =  {true: verdadero,           false: falso};