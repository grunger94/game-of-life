$(document).ready(function()
{
    dimensiona_canvas();
    muestra_inicio();
    set_celdas();
    set_vecinos_celdas();
    
    $('#grid').one("click", tick);
}); 