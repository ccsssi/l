window.gLocalAssetContainer["get_map"] = function(g) { (function(exports, require, module, __filename, __dirname) {
var Global = require("./global");
var x_size = 20;
var y_size =  9;
var width = g.game.width/(x_size-3);
var height = g.game.height/(y_size+1);
var x_start = 2;
var num_lower = 40;

function Get_map(){
    let numbers = [];
    for(var i=0; i< num_lower; i++){
        numbers.push(Math.floor(Global.random.generate() * 3)+1)
    }
    for(var i = 0; i< (y_size-1)*(x_size-2*x_start)-num_lower-1; i++){
        numbers.push(Math.floor(Global.random.generate() *9)+1)
    }
    let sum = 0
    for(var i=0; i< numbers.length; i++){
        sum += numbers[i];
    }
    if(sum%10 != 0){
        numbers.push(10-sum%10);
    }else{
        numbers.push(0);
    }


    shuffle(numbers);

    let params = [];
    for(var i=x_start; i< x_size-x_start; i++){
        for(var j=1; j<y_size; j++){
            let number = numbers.pop();
            let param = {x: (i-1)*width, y:(j+1)*height, number:number}
            params.push(param);
        }
    }
    return params;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Global.random.generate() * (i + 1)); // 0 から i のランダムなインデックス
      [array[i], array[j]] = [array[j], array[i]]; // 要素を入れ替えます
    }
}

module.exports = Get_map;
})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}