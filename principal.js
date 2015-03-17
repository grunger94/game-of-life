$(document).ready(function()
{
    dimensionaCanvas();
    muestraInicio();
    setCeldas();
    setVecinosCeldas();
    
    $('#grid').one("click", tick);
}); 