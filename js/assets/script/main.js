window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
var Global = require("./global");
var tutorialscene = require("./tutorialscene");
var mainscene = require("./mainscene");

g.game.vars.gameState = { score: 0 };

exports.main = void 0;
function main(param) {

Global.random=param.random;//追加点

    Global.isAtsumaru = param.isAtsumaru;
    let scene = tutorialscene();
   // let scene = mainscene();
    g.game.pushScene(scene);
}
exports.main = main;
})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}