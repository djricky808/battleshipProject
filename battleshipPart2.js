const rs = require('readline-sync');
let setShips
let finished = false;
let x;
let y;
let direction;
let map;

function setup () {
    map = createMap(10);
    shipSetup();
}

function createMap (size) {
    const map = [];
    for (let x = 0; x < size; x++) {
        map[x] = [];
        for (let y = 0; y < size; y++) {
            addCell(map, x, y);
        };
    };
    return map;
};

function addCell (map, x, y) {
    map[x][y] = [toAlpha(x+1)+(y+1)];
};

function toAlpha (num) {
    if (num < 1 || num > 26 || typeof num !== 'number') {
        return -1;
    };
    const leveller = 64;
    return String.fromCharCode(num + leveller);
};

const ships = [
    {
    name: 'Carrier',
    size: 5,
    },
    {
    name: 'Battleship',
    size: 4,
    },
    {
    name: 'Cruiser',
    size: 3,
    },
    {
    name: 'Submarine',
    size: 3,
    },
    {
    name: 'Destroyer',
    size: 2,
    },
];

function reroll() {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    direction = Math.floor(Math.random() * 4);
};

function shipSetup () {
    setShips = 0;
    for (let i = 0; i < ships.length; i++) {
        reroll();
        let shipSize = ships[i].size;
        while(shipSize > 0) {
            if (map[y] && map[y][x] && !map[y][x].includes('O')) {
                placeShip (x, y, 'O', ships[i].name, map);
                if (direction === 0) {
                    x++;
                } else if (direction === 1) {
                    y++;
                } else if (direction === 2) {
                    x--;
                } else {
                    y--;
                };
                shipSize --;
            } else {
                removeShip(map, ships[i].name);
                reroll();
                shipSize = ships[i].size;
            };
        };
        setShips ++;
    };
};


function placeShip (x, y, mark, shipType, map) {
    map[y][x].push(shipType);
    map[y][x].push(mark);    
};

function removeShip (map, shipType) {
    for (y = 0; y < map.length; y++) {
        for (x = 0; x < map.length; x++) {
            if(map[y][x].includes(shipType)) {
                map[y][x].pop();
                map[y][x].pop();
            };
        };
    };
};

function pickCoordinate() {
    const coordinate = rs.question(`Enter a location to strike. I.E. 'A2'  `);
    let location = coordinate.toUpperCase();
    let validLocation = false;
    for (y = 0; y < map.length; y++) {
        for (x = 0; x < map.length; x++) {
            if(map[y][x].includes(location)) {
                console.log(map);
                validLocation = true;
                if(map[y][x].includes('O')) {
                    map[y][x].pop();
                    let shipName = map[y][x][1];
                    map[y][x].pop();
                    map[y][x].push('X');
                    checkOnShips(shipName);                 
                } else if (map[y][x].includes('X') || map [y][x].includes('+')) {
                    console.log('You have already picked this location. Miss!');
                } else {
                    map[y][x].push('+');
                    console.log('You have missed!');
                };
            };
        };
    };
    if (!validLocation) {
    console.log('That is an invalid location. Choose from letters A-J then numbers 1-10');
    };
};

function checkOnShips (shipName) {
    let flatMap = map.flat().flat();
    if (flatMap.includes(shipName)) {
        console.log('You hit the '+ shipName +'!');
    } else {
        setShips --;
        if (setShips > 1) {
            console.log('You sunk the ' + shipName + '! ' + setShips + ' ships remaining.');
        } else if (setShips > 0) {
            console.log('You sunk the ' + shipName + '! ' + setShips + ' ship remaining.');
        };
    };
};

while(!finished) {
    rs.keyIn('Press any key to start the game');
    setup();
    while (setShips > 0) {
        pickCoordinate();
    }; 
    if (rs.keyInYN('You have destroyed all battleships. Would you like to play again?')) {
        setup();
    } else {
        finished = true;
    };
}


