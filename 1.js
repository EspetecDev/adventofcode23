const fs = require('fs');
const DATA_FILE = './data/1_input.txt';

async function day1_part1(){
    const data = fs.readFileSync(DATA_FILE).toString().split('\n');
    let accum = 0;
    for(token of data){
        let nums = [];
        for(char of token){
            const test = parseInt(char);
            if(!isNaN(test))
                nums.push(test);
        }
        accum += nums[0]*10 + nums[nums.length - 1];
    }
    console.log(`day 1 - part 1 result is: ${accum}`);
}

async function day1_part2(){
    // same as before but numbers now are written with words too
    const num_words = {
        'one':1,'two':2,'three':3,'four':4,'five':5,
        'six':6,'seven':7,'eight':8,'nine':9,'zero':0
    }
    const data = fs.readFileSync(DATA_FILE).toString().split('\n');
    let accum = 0;
    for(token of data){
        let nums = [];
        let idx = 0;
        while(idx < token.length){
            const test = parseInt(token[idx]);
            if(isNaN(test)){
                for(num_word of Object.keys(num_words).filter(k => token.includes(k))){
                    if(num_word.startsWith(token[idx]) && idx+num_word.length <= token.length){
                        let word_idx = 0;
                        let test = true;
                        while(word_idx < num_word.length){
                            test &= token[idx+word_idx] == num_word[word_idx];
                            if(!test)
                                break;
                            word_idx +=1;
                        }
                        if(test)
                            nums.push(num_words[num_word]);
                    }
                }
            }
            else
                nums.push(test);
            idx += 1;
        }
        accum += nums[0]*10 + nums[nums.length - 1];
    }
    console.log(`day 1 - part 2 result is: ${accum}`);
}

module.exports = { day1_part1, day1_part2 }