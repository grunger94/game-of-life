var parametros = 
{
    "agregar_celda":       [{"tipo": "variable", "valor": "contador_x"}, {"tipo": "variable", "valor": "contador_y"}],
    "obtiene_vecinos":     [{"tipo": "funcion", "valor": obtiene_celda, "parametros": ["contador_x", "contador_y"]}],
    "nuevo_estatus_celda": [{"tipo": "funcion", "valor": obtiene_celda, "parametros": ["contador_x", "contador_y"]}],
    "dibuja_celda":        [{"tipo": "funcion", "valor": obtiene_celda, "parametros": ["contador_x", "contador_y"]}]
};

var evaluador_vecinos   = {0: cero, 1: cero, 2: dos_vecinos, 3: uno, 4: cero, 5: cero, 6: cero, 7: cero, 8: cero};
var tipos_parametro     = {"funcion": ejecuta_parametro_funcion, "variable": obtiene_valor_variable};

var es_fin_x            = {true: termina_ciclo_x, false: itera_y};
var es_fin_y            = {true: siguiente_ciclo_x, false: siguiente_ciclo_y};
var es_fin_array        = {true: termina_ciclo_array, false: siguiente_ciclo_array};

var es_objeto           = {true: retorna_celda, false: falso};
var existe_celda        = {true: retorna_celda, false: crea_celda};
var es_celda_viva       = {true: colorea_celda, false: falso};
var existe_vecino_celda = {true: retorna_vecinos, false: agrega_vecinos};
var es_vecino           = {true: agrega_a_array, false: falso};