/*-----------------------------------VARIABLES-------------------------------*/
var SPEED = 500;
var ALIVECELLS = 0.5;

var CELLSINX = 20;
var CELLSINY = null;

var CELLWIDTH = null;
var CELLHEIGHT = null;

var CELLS = {};
var DIRECTIONS = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], 
[1, 1]];

var GRID = $("#grid");
var CONTEXT = GRID[0].getContext("2d");

var COUNTERX = -1;
var COUNTERY = -1;
var COUNTERARRAY = -1;

/*-----------------------------------CLASSES---------------------------------*/

var TRUTHY = function() {};
var FALSY = function() {};

var CELL = function(x, y, alive) {
    this.x = x;
    this.y = y;
    this.key = (x + '_' + y);
    this.alive = alive;
    this.nextStatus = new FALSY;
    this.neighbours = new FALSY;
}

/*----------------------------------FUNCTIONS--------------------------------*/

function setCells() {
    loopXY(addCell);
}

function setNeighbourCells() {
    loopXY(getNeighbours);
}

function tick() {
    setInterval(refreshGame, SPEED);
}

function loopArray(arr, functionToExecute, args) {
    $("#i").on("click", nextItem);
    COUNTERARRAY = -1;
    $("#i").trigger("click", [arr, functionToExecute, args]);
}

function loopXY(functionToExecute) {
    $("#x").on("click", loopX);
    $("#y").on("click", loopY);
    COUNTERX = COUNTERY = -1;
    $("#x").trigger("click", functionToExecute);
}

function loopX(e, functionToExecute) {        
    COUNTERX ++;
    isEndX[COUNTERX == CELLSINX](functionToExecute);
}
    
function loopY(e, functionToExecute) {       
    COUNTERY ++;
    isEndY[COUNTERY == CELLSINY](functionToExecute);
}

function nextItem(e, arr, functionToExecute, args) {        
    COUNTERARRAY ++;
    isArrayEnd[COUNTERARRAY == arr.length](arr, functionToExecute, args);
}
    
function nextX(functionToExecute) {
    COUNTERY = -1;
    $("#x").trigger("click", functionToExecute);
}

function nextY(functionToExecute) {
    $("#y").trigger("click", functionToExecute);
}

function arrayMap(arr, functionToExecute, args) {
    var functionArguments = [arr[COUNTERARRAY], args];
    functionToExecute.apply(this, functionArguments);
    $("#i").trigger("click", [arr, functionToExecute, args]);
}

function executeFunction(functionToExecute) {
    var tmp = [];
    loopArray(args[functionToExecute.name], getArgumentsValues, tmp);
    functionToExecute.apply(this, tmp);
    $("#y").trigger("click", functionToExecute);
}

function getArgumentsValues(arg, tmp) {
    addToArray(tmp, argumentTypes[arg.type](arg));
}

function endLoopX() {
    $("#x, #y").off("click");
}

function endArrayLoop() {
    $("#i").off("click");
}

function addCell(x, y) {    
    var instance = getCell(x, y);
    return cellAction[! (instance instanceof FALSY)](x, y);
}

function getCell(x, y) {   
    var isCell = CELLS[x + '_' + y] instanceof CELL;
    return cellExists[isCell](x, y);
}

function createCell(x, y) {
    CELLS[x + '_' + y] = new CELL(x, y, Math.random() <= ALIVECELLS); 
}

function returnCell(x, y) {
    return CELLS[x + '_' + y];
}

function getNeighbours(cell) {
    return neighbourExists[! (cell.neighbours instanceof FALSY)](cell);
}

function addNeighbours(cell) {
    cell.neighbours = [];
    loopArray(DIRECTIONS, addNeighbourCell, cell);
    return cell.neighbours;
}

function returnNeighbours(cell) {
    return cell.neighbours;
}

function addNeighbourCell(direction, cell) {
    var neighbour = getCell((cell.x + direction[0]), (cell.y + direction[1]));
    isNeighbour[neighbour instanceof CELL](cell.neighbours, neighbour);
}

function addToArray(arr, item) {
    arr.push(item);
}

function getAliveNeighbours(cell) {
    var neighbours = $.grep(getNeighbours(cell), function(cell){ 
        return cell.alive 
    });
    return neighbours.length;
}

function executeFunctionArgument(arg) {          
    var tmp = [];
    loopArray(arg.args, addValueToArray, tmp);
    return arg.value.apply(this, tmp);
}

function addValueToArray(arg, tmp) {
    addToArray(tmp, window[arg]);
}

function getVariableValue(arg) {
    return window[arg.value];
}

function twoNeighbours(alive) {
    return getBooleanInstance[alive]();
}

function truthy() {
    return new TRUTHY;
}

function falsy() {
    return new FALSY;
}

function nextStatusCell(cell) {
    var aliveNeighbours = getAliveNeighbours(cell);
    var instance = lives[aliveNeighbours](cell.alive);
    cell.nextStatus = instance;
}

function applyGameRules() {
    loopXY(nextStatusCell);
}    

function refreshGame() {
    clearCanvas();
    applyGameRules();
    drawGame();
}

function drawGame() {
    loopXY(drawCell);
}

function drawCell(cell) {
    CONTEXT.strokeStyle = '#007466';
    chooseColor[cell.alive](cell);
    cell.alive = cell.nextStatus instanceof TRUTHY;
}

function colorCell(cell) {
    CONTEXT.fillStyle = '#007466';
    CONTEXT.fillRect((cell.x * CELLWIDTH), (cell.y * CELLHEIGHT), CELLWIDTH, 
    CELLHEIGHT);
}

function setCanvas() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    resize(windowWidth, windowHeight); 
}

function resize(windowWidth, windowHeight) {
    GRID.attr("width",  windowWidth);
    GRID.attr("height", windowHeight);
    CELLWIDTH = CELLHEIGHT = (windowWidth / CELLSINX);
    CELLSINY = Math.floor(windowHeight / CELLHEIGHT);
}

function clearCanvas() {
    CONTEXT.clearRect(0, 0, GRID.width(), GRID.height());
}

function startView() {
    var x = CONTEXT.canvas.width / 2;
    var y = CONTEXT.canvas.height / 2;
    displayWelcomeText(x, y);
}

function displayWelcomeText(x, y) {
    CONTEXT.textAlign = "center";
    CONTEXT.font = "bold 20px Arial";
    CONTEXT.fillText("Let's run this thing!", x, (y - 10));
    CONTEXT.fillText("To start, click anywhere in the window", x, (y + 10));
}