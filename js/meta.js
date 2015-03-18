var args = {
    "addCell": [{
        "type": "variable", 
        "value": "COUNTERX"
    }, 
    {
        "type": "variable", 
        "value": "COUNTERY"
    }],
    "getNeighbours": [{
        "type": "function", 
        "value": getCell, 
        "args": ["COUNTERX", "COUNTERY"]
    }],
    "nextStatusCell": [{
        "type": "function", 
        "value": getCell, 
        "args": ["COUNTERX", "COUNTERY"]
    }],
    "drawCell": [{
        "type": "function", 
        "value": getCell, 
        "args": ["COUNTERX", "COUNTERY"]
    }]
};

var argumentTypes = {"function": executeFunctionArgument, "variable": getVariableValue};
var lives = {0: falsy, 1: falsy, 2: twoNeighbours, 3: truthy, 4: falsy, 5: falsy, 6: falsy, 7: falsy, 8: falsy};
var isEndX = {true: endLoopX, false: nextY};
var isEndY = {true: nextX, false: executeFunction};
var isArrayEnd = {true: endArrayLoop, false: arrayMap};
var cellExists = {true: returnCell, false: falsy};
var cellAction = {true: returnCell, false: createCell};
var chooseColor = {true: colorCell, false: falsy};
var neighbourExists = {true: returnNeighbours, false: addNeighbours};
var isNeighbour = {true: addToArray, false: falsy};
var getBooleanInstance = {true: truthy, false: falsy};