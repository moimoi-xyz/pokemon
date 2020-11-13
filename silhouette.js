"use strict";

import { pokemons } from "./js/pokemons.js";

var pokemon;
var img;
var originalImageData;
var silhouetteImageData;
var originalData;
var silhouetteData;
var isClicked = false; //クリックのトグルのためのフラグを準備

var canvas = document.getElementById("canvas"); //Canvas要素の取得
var ctx = canvas.getContext("2d"); //canvasのコンテキストの設定

function loadImage() {
  img = new Image(); //イメージオブジェクトの呼び出し

  pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
  img.src = "./img/" + pokemon.id + ".png";

  img.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      (canvas.width - img.width) / 2,
      (canvas.height - img.height) / 2
    ); //Canvasに読み込んだ画像を表示

    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height); //オリジナルの画像DATAを確保
    silhouetteImageData = ctx.getImageData(0, 0, canvas.width, canvas.height); //シルエット用の画像DATAを確保
    originalData = originalImageData.data; //オリジナルのdataを保存する場所
    silhouetteData = silhouetteImageData.data; //シルエット用のdataを保存する場所

    //シルエット用のdataを作成
    for (var i = 0; i < silhouetteData.length; i += 4) {
      silhouetteData[i] = 122; //Rチャンネル
      silhouetteData[i + 1] = 192; //Gチャンネル
      silhouetteData[i + 2] = 105; //Bチャンネル
      //不透明度以外を一定の値に変更
    }

    //シルエット画像をCanvasに表示
    silhouetteImageData.data.set(silhouetteData);
    ctx.putImageData(silhouetteImageData, 0, 0);
  };
}

//Canvas実装
(function () {
  canvas.addEventListener("click", function () {
    if (isClicked) {
      loadImage();
      isClicked = false;
    } else {
      //オリジナル画像をCanvasに表示
      originalImageData.data.set(originalData);
      ctx.putImageData(originalImageData, 0, 0);

      // 名前を表示
      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(pokemon.name, canvas.width / 2, canvas.height);

      isClicked = true;
    }
  });

  loadImage();
})();
