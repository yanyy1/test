let idCode = {
  /**生成一个随机数**/
  randomNum: function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  /**生成一个随机色**/
  randomColor: function (min, max) {
    let scope = this
    var r = scope.randomNum(min, max);
    var g = scope.randomNum(min, max);
    var b = scope.randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  },
  drawPic: function (strCode) {
    let scope = this
    var canvas = document.getElementById("canvas");
    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext('2d');
    ctx.textBaseline = 'bottom';

    /**绘制背景色**/
    ctx.fillStyle = scope.randomColor(180, 240); //颜色若太深可能导致看不清
    ctx.fillRect(0, 0, width, height);
    /**绘制文字**/
    // var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
    var str = strCode;
    for (var i = 0; i < 4; i++) {
      var txt = str[i];
      ctx.fillStyle = scope.randomColor(50, 160);  //随机生成字体颜色
      ctx.font = scope.randomNum(100, 150) + 'px SimHei'; //随机生成字体大小
      var x = 20 + i * 60;
      var y = scope.randomNum(125, 135);
      var deg = scope.randomNum(-45, 45);
      //修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(txt, 0, 0);
      //恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180);
      ctx.translate(-x, -y);
    }
    /**绘制干扰线**/
    for (var i = 0; i < 0; i++) {
      ctx.strokeStyle = scope.randomColor(40, 180);
      ctx.beginPath();
      ctx.moveTo(scope.randomNum(0, width), scope.randomNum(0, height));
      ctx.lineTo(scope.randomNum(0, width), scope.randomNum(0, height));
      ctx.stroke();
    }
    /**绘制干扰点**/
    for (var i = 0; i < 0; i++) {
      ctx.fillStyle = scope.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(scope.randomNum(0, width), scope.randomNum(0, height), 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

export default idCode;







