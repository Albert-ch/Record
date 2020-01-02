import React, { Component } from "react";
import html2canvas from 'html2canvas';
import C2S from 'canvas2svg';
import canvg from 'canvg';
import {SvgConverter} from 'svg-dataurl';
import d3 from 'd3';
import {downloadable} from 'd3-downloadable';
import "./index.less";
// import domtoimage from "dom-to-image";
import domtoimage from "dom-to-image-more";
class Home extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    if(window.BMap && window.BMap.Map){
      this.drawMap()

    }
    const that = this;
    document.getElementById("export-svg").onclick = function(){


      function filter (node) {
          return (node.tagName !== 'i');
      }

      
     
      domtoimage.toSvg(document.getElementById('map'), {
        width: document.getElementById("map").clientWidth,
        height: document.getElementById("map").clientHeight,
      })
      .then(function (canvas) {
        // document.body.appendChild(canvas);
        // return ;
        // var svgCtx = new C2S(canvas.width, canvas.height);
        // svgCtx.drawImage(canvas, 0, 0);
        // var a = svgCtx.getSerializedSvg();
        // that.download("a.svg", a);
        that.download("a.svg", canvas);
      }).catch((e) => {
        console.log("err__", e);
      });

      return ;

      var img;
      html2canvas(img, {
          useCORS : true,
          foreignObjectRendering : true,
          allowTaint :false,
          // width: document.getElementById("map").clientWidth/2,
          // height: document.getElementById("map").clientHeight/2,
      }).then(function(canvas) {
        console.log("canvas__", canvas)
        document.body.appendChild(canvas);
        return false;
        var svgCtx = new C2S(canvas.width, canvas.height);
        svgCtx.drawImage(canvas, 0, 0);
        var a = svgCtx.getSerializedSvg();
        // var b = svgCtx.getSvg();
        // console.log("b", b)
        // document.body.appendChild(b);
        // SvgConverter.loadFromElement(b).then((converter) => {
        //   const dataUrl = converter.pngDataURL()
        //   console.log("____v", dataUrl)
        //   // downloadLink.setAttribute('href', dataUrl)
        // })

        that.download("a.svg", a);
    });
    }

  }

  init = (map) => {
    var styleOptions = {
        strokeColor:"red",    //边线颜色。
        fillColor:"#ff00ee",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    }
      //实例化鼠标绘制工具
    var drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
        },
        circleOptions: styleOptions, //圆的样式
        polylineOptions: styleOptions, //线的样式
        polygonOptions: styleOptions, //多边形的样式
        rectangleOptions: styleOptions //矩形的样式
    });

    //添加鼠标绘制工具监听事件，用于获取绘制结果
    // drawingManager.addEventListener('overlaycomplete', overlaycomplete);
  }

  download = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  componentDidUpdate(prevProps, prevState){
    
  }

  drawMap = () => {
    const that = this;
    var mp = new BMap.Map("map", {minZoom:10,maxZoom:18, enableMapClick: false});
    mp.centerAndZoom(new BMap.Point(121.562174, 31.189902), 18);
    mp.addEventListener("click",function(e){
      console.log(e.point.lng + "," + e.point.lat);
    });
   
    mp.enableScrollWheelZoom();

    this.init(mp);

    var canvasLayer = new BMap.CanvasLayer({
        update: update,
        strokeOpacity: 0.9
    });

    function update() {
        var ctx = this.canvas.getContext("2d");

        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        var temp = {};
        ctx.fillStyle = "#e48686a6";
        ctx.beginPath();
        var pData = [];
        var sx = 121.545118, sy = 31.14129;
        // var sx = 121.562174, sy = 31.189902;
        var ex = 121.592379,ey = 31.228766;

        var dx = 0.001,dy = 0.0012;
        var numI = (ex - sx)/dx, numJ = (ey - sy)/dy;
        
        for(var i = 0; i<numI; i++){
          for(var j =0; j<numJ; j++){
            pData.push( new BMap.Point(sx+i*dx, sy+ j*dy));
          }
        }
        // var data = [
        //     new BMap.Point(116.3847579605906,39.910711371641334),
        //     new BMap.Point(116.3897884714465,39.91098809254841),
        //     new BMap.Point(116.3976216954935,39.91021327116899),
        //     new BMap.Point(116.40196949416179,39.91057301076525),
        //     new BMap.Point(116.40832949717243,39.91057301076525),
        //     new BMap.Point(116.4096589893272,39.90675413940173),
        //     new BMap.Point(116.40369424074095,39.90689250805284),
        //     new BMap.Point(116.3975138988323,39.90653274897401),
        //     new BMap.Point(116.39309423572321,39.90694785543441),
        //     new BMap.Point(116.38723728379816,39.90686483434514),
        // ];
console.log("___", pData);
        ctx.font="20px Arial";
        for (var i = 0, len = pData.length; i < len; i++) {
            var pixel = mp.pointToPixel(pData[i]);
            const num = Math.floor(Math.random(1)*100);
            var pixelNext = mp.pointToPixel({lng: pData[i].lng + dx, lat: pData[i].lat +dy});
            ctx.beginPath();
            ctx.fillStyle = that.showColor(num);
            // ctx.fillStyle = "rgba(122,13,33,0.5)"
            // ctx.fillRect(pixel.x, pixel.y, Math.abs(pixelNext.x-pixel.x) -2, Math.abs(pixelNext.y-pixel.y)-2);
            // 计算方向有右上  画图有右下 取下一个点
            ctx.fillRect(pixel.x, pixelNext.y, Math.abs(pixelNext.x-pixel.x) -2, Math.abs(pixelNext.y-pixel.y)-2);
            // ctx.stroke()
            if(pixelNext.x-pixel.x > 40){
              ctx.beginPath();
              ctx.fillStyle = "#000";
              ctx.font = "10px";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle"
              const str = ""+ num + "%";
              // console.log("___", ctx.measureText(str).width);
              ctx.fillText( str, (pixel.x + pixelNext.x)/2, (pixel.y + pixelNext.y)/2 )
            }
            ctx.closePath();
           
        }
    }
    mp.addOverlay(canvasLayer);
  }

  showColor = (num) => {
    const a = 0.5;
    var color = `rgba(255,255,255,${a})`;
    if (num >0 && num <20) {
      color = `rgba(180,224,243,${a})`
    } else if(num >=20 && num <40) {
      color = `rgba(112,180,235,${a})`
    } else if(num >=40 && num <60) {
      color = `rgba(20,130,229,${a})`
    } else if(num >=60 && num <80) {
      color = `rgba(28,63,191,${a})`
    } else if(num >=80 && num <100) {
      color = `rgba(7,0,147,${a})`
    }
    return color;
  }

  render(){
    return (
      <div className = "home-container">
         <button id= "export-svg">导出svg</button>
        <div id = "map"></div>
      </div>
    );
  }
}


export default Home;