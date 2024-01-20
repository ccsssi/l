window.gLocalAssetContainer["mainscene"] = function(g) { (function(exports, require, module, __filename, __dirname) {
var Global = require("./global");
var EnemyManager = require("./enemy_manager");;
var Background = require("./background");
var Gamecore = require("./gamecore");
var Getmap = require("./map");

let font = new g.DynamicFont({
    game: g.game,
    fontFamily: "sans-serif",
    size: 60,
  });
let time = 80;

function MainScene(){
    var scene = new g.Scene({
        game: g.game,
        assetPaths:["/audio/*", "/image/*"]
    });

    Global.scene = scene;
    let background = new Background();

    let gamecore = new Gamecore();

    let params = Getmap();
    let enemy_manager;

    scene.onLoad.add(function(){

//以下４行は色を変える追加点
    scene.setTimeout(function () {
        Global.color = "#FFEEFF" ; // 背景色を変更
        background.background.cssColor = Global.color; // 背景エンティティの背景色を更新
    }, 80000); // 80秒後に実行

        let bgm = scene.asset.getAudioById("music").play();
        bgm.changeVolume(0.2);
        let root = background.root;
        let basics = getBasics(scene);
        enemy_manager = new EnemyManager(params);

        scene.setTimeout(function() {
            if(Global.isAtsumaru){
                window.RPGAtsumaru.scoreboards.setRecord(1, Math.floor(g.game.vars.gameState.score));
            }
        }, 80000);

        scene.setTimeout(function() {
            if(Global.isAtsumaru){
                window.RPGAtsumaru.scoreboards.display(1);
            }
        }, 81000);

        scene.onPointDownCapture.add(function(ev) {
            Global.start_pos = {x:ev.point.x, y:ev.point.y}
            Global.end_pos = {x:ev.point.x, y:ev.point.y}
            Global.is_clicked = true;
        });
        scene.onPointMoveCapture.add(function(ev) {
            Global.end_pos = {x:ev.point.x+ev.startDelta.x, y:ev.point.y+ev.startDelta.y};
        });
        scene.onPointUpCapture.add(function(){
            Global.is_clicked = false;
        })

         if(Global.isAtsumaru){
            let ranking = new g.Sprite({ //ランキングボタン
                scene: Global.scene,	src: scene.asset.getImageById("ranking"), parent:root,
                 x: g.game.width*0.45, y: g.game.height*0.06, scaleX: 1, scaleY: 1,
                anchorX: 0.5, anchorY: 0.5, touchable: true,
             });
             ranking.onPointDown.add(function() {// ランキング表示
                window.RPGAtsumaru.scoreboards.display(1);
             });
	//}else{　　
	//↑アツマール以外でリスタートを表示させるときは}else{を付ける
            let restart = new g.Sprite({ // リスタートボタン
                 scene: Global.scene,	src: scene.asset.getImageById("restart"), parent:root,
                x: g.game.width*0.55, y: g.game.height*0.06, scaleX: 1, scaleY: 1,
                    anchorX: 0.5, anchorY: 0.5, touchable: true,
                 });
            restart.onPointDown.add(function() {// リスタート操作

        Global.color = "#EEFFFF" ; // 背景色を変更

                g.game.vars.gameState.score = 0;
                time = 80;
                g.game.replaceScene(MainScene());
            });
        }

        scene.append(root);
        scene.append(basics);
        scene.append(enemy_manager.root);
        scene.append(gamecore.root);
    })
    scene.onUpdate.add(function(){
        Global.time +=  1/g.game.fps;
        gamecore.update();
        enemy_manager.update();
    });
    return scene;
}

function getBasics(scene){
var Global = require("./global");
    let root = new g.E({scene: scene});

    let score_label = new g.Label({
        scene: scene,
        font: font,
        text: g.game.vars.gameState.score + "点",
        fontSize: 40,
        textColor: "black",
        x: 148,//g.game.width-200,
        y: 20
    });
    root.append(score_label);

    let time_label = new g.Label({
        scene: scene,
        font: font,
        text: "残り"+time+"秒",
        fontSize: 40,
        textColor: "black",
        x: 150,
        y: 20
    });
    root.append(time_label);

    scene.onUpdate.add(function(){

if(time > 59.9 & time_label.y !=20){
	time_label.y = 20;
	g.game.vars.gameState.score = 0;
	}
   
if(g.game.vars.gameState.score < 12700){
        score_label.text="　　　　　 秒　　　　　　　　　　　　　　　  "+Math.floor(g.game.vars.gameState.score)+"点";
	}
if(g.game.vars.gameState.score < 12700 & time<0.01){
        score_label.text="残り　0　  秒　　　　　　　　　　　　　　　  "+Math.floor(g.game.vars.gameState.score)+"点";
	score_label.x =150;
	}


if(g.game.vars.gameState.score == 12800 & time>0){
	g.game.vars.gameState.score = g.game.vars.gameState.score + Math.floor(time);
	score_label.text="お見事です！！　　　　　 "+Math.floor(g.game.vars.gameState.score)+"点";
	score_label.x=535;
	score_label.y=80;
	score_label.textColor=  "blue";
        }
if(g.game.vars.gameState.score == 12800 & time<=0){
	score_label.text="お見事です！！　　　　　 "+Math.floor(g.game.vars.gameState.score)+"点";
	score_label.x=536;
	score_label.y=80;
	score_label.textColor=  "blue";
        }

if(g.game.vars.gameState.score == 12700 & time>0){
	g.game.vars.gameState.score = g.game.vars.gameState.score + Math.floor(time) + 2300;
	score_label.text="　 神　　　　 "+Math.floor(g.game.vars.gameState.score)+"点";
	score_label.x=536;
	score_label.y=80;
	score_label.fontSize=60;
	score_label.textColor=  "red";
        }
if(g.game.vars.gameState.score == 12700 & time <=0){
	g.game.vars.gameState.score = g.game.vars.gameState.score + 2300;
	score_label.text="　 神　　　　 "+Math.floor(g.game.vars.gameState.score)+"点";
	score_label.x=536;
	score_label.y=80;
	score_label.fontSize=60;
	score_label.textColor=  "red";
        }

        score_label.invalidate();

//Math.floor(time)
        time -= 1/g.game.fps; 
        if(time > 0){
            time_label.text="残り　"+(Math.floor(("%.",time)*10)/10);
        }else{
	time_label.text="";
		if(time_label.y == 20){
		time_label.y = g.game.vars.gameState.score;
		}
		if(time_label.y != 20){
		g.game.vars.gameState.score = time_label.y;
		}
        }
        time_label.invalidate();
    })
    return root;
}

module.exports = MainScene;
//akashic-sandbox　http://localhost:3000
//akashic export zip --output game.zip --nicolive
//akashic export html --magnify --output ../mygame　※index.htmlを出力
})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}