const fs = require('fs');
const DATA_FILE = './data/2_input.txt';

async function day2_part1(){

    // Game X: ... X is id
    // then a subset with semicolons
    // a subset contians x cubes for each color shown

    // which games are possible if the bag contained 
    // 12 red, 13 green, 14 blue

    const reqs = { 'red': 12, 'green': 13, 'blue': 14 };
    // 1. filter by 'possible' games determined by reqs, is the max cubes per color allowed
    const data = fs.readFileSync(DATA_FILE).toString().split('\n');
    let games = {};
    for (game of data){
        const leftPart = game.split(':')[0].split(' ');
        const rightPart = game.split(':')[1];
        const gameId = parseInt(leftPart[1]);
        let gameSubsets = [];
        let breakGame = false;
        for (subset of rightPart.split(';')){
            let set = {};
            for(set_str of subset.split(',')){
                const parse = set_str.split(' ').filter(s => s);
                const cubeNum = parseInt(parse[0]);
                const cubeColor = parse[1].trim();

                if(cubeNum > reqs[cubeColor]){
                    breakGame = true;
                    break;
                }
                set[cubeColor] = cubeNum;
            }
            if(breakGame)
                break;
            gameSubsets.push(set);
        }
        if(!breakGame)
            games[gameId] = gameSubsets;
    }
    // 2. add all game ids 
    const sumIds = Object.keys(games).reduce((sum, key) => sum += parseInt(key), 0);
    console.log(`Sum of ids: ${sumIds}`);
}

async function day2_part2(){
    // for every set, get the max of every color between sets
    // multiply every color numbers then sum them
    const data = fs.readFileSync(DATA_FILE).toString().split('\n');
    let total = 0;
    for (game of data){
        const rightPart = game.split(':')[1];
        let maxColors = {'red': 0, 'green': 0, 'blue': 0};
        for (subset of rightPart.split(';')){
            for(set_str of subset.split(',')){
                const parse = set_str.split(' ').filter(s => s);
                const cubeNum = parseInt(parse[0]);
                const cubeColor = parse[1].trim();
    
                if(cubeNum > maxColors[cubeColor])
                    maxColors[cubeColor] = cubeNum;
            }
        }
        // multiply colors
        total += Object.values(maxColors).reduce((accum, current) => accum *= current);
    }
    console.log(`total: ${total}`);
}

module.exports = { day2_part1, day2_part2 }
