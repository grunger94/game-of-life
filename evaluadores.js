var parametros = 
{
    "agregarCelda":       [{"tipo": "variable", "valor": "contadorX"}, {"tipo": "variable", "valor": "contadorY"}],
    "obtieneVecinos":     [{"tipo": "funcion",  "valor": obtieneCelda, "parametros": ["contadorX", "contadorY"]}],
    "nuevoEstatusCelda":  [{"tipo": "funcion",  "valor": obtieneCelda, "parametros": ["contadorX", "contadorY"]}],
    "dibujaCelda":        [{"tipo": "funcion",  "valor": obtieneCelda, "parametros": ["contadorX", "contadorY"]}]
};

var tiposParametro    =  {"funcion": ejecutaParametroFuncion, "variable": obtieneValorVariable};
var vive              =  {0: falso, 1: falso, 2: dosVecinos, 3: verdadero, 4: falso, 5: falso, 6: falso, 7: falso, 8: falso};

var esFinX            =  {true: terminaCicloX,     false: iteraY};
var esFinY            =  {true: siguienteCicloX,   false: siguienteCicloY};
var esFinArray        =  {true: terminaCicloArray, false: siguienteCicloArray};
var decideExisteCelda =  {true: retornaCelda,      false: falso};
var accionCelda       =  {true: retornaCelda,      false: creaCelda};
var decideColorCelda  =  {true: coloreaCelda,      false: falso};
var existeVecinoCelda =  {true: retornaVecinos,    false: agregaVecinos};
var decideEsVecino    =  {true: agregaAArray,      false: falso};
var instanciaBooleana =  {true: verdadero,         false: falso};