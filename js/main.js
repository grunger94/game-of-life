$(document).ready(function() {
    setCanvas();
    startView();
    setCells();
    setNeighbourCells();
    
    $('#grid').one("click", tick);
}); 