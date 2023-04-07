const rs = require('readline-sync');
let grid;
let ships;
let setShips;
let finished = false;

function setup () {
    grid = 
    [['A1'],['A2'],['A3'],
    ['B1'],['B2'],['B3'],
    ['C1'],['C2'],['C3']];
    ships = 2;
    setShips = 0;
    while(setShips < ships) {
        let x = Math.floor(Math.random() * 9);
        if(!grid[x].includes('ship')) {
            grid[x].push('ship');
            setShips++;
        }   
    }
}

function pickCoordinate() {
    rs.setDefaultOptions({limit: ['A1','A2','A3','B1','B2','B3','C1','C2','C3',]});
    const coordinate = rs.question(`Enter a location to strike. I.E. 'A2'  `);
    let location = coordinate.toUpperCase();
    for(i of grid){
        if (i.includes(location) && i.includes('ship')) {
            i.length = 0;
            setShips--;
            //console.log(grid);
            //console.log(setShips);
            if(setShips){
                return console.log(`Hit. You sunk a battleship! ${setShips} ship remaining.`);
            }
        } else if (i.includes(location)) {
            i.length = 0;
            //console.log(grid);
            //console.log(setShips);
            return console.log('You have missed!');
        }
    }
    if ( i = [] && !setShips == 0) {
        return console.log('You have already picked this location. Miss!');
    }
}  

while(!finished) {
    rs.keyIn('Press any key to start the game');
    setup();
    while (setShips > 0) {
        pickCoordinate();
    } 
    if (rs.keyInYN('You have destroyed all battleships. Would you like to play again?')) {
        setup();
    } else {
        finished = true;
    };
}

