import React, {Component} from "react";
import { Button } from "antd";

import "./index.less";

export default class About extends Component{
  constructor(props){
    super(props);
    this.state = {
      num: 0
    }
  }

  componentDidMount(){
    var DomCanvas = document.getElementById("mp");
    const ctx = DomCanvas.getContext("2d");
    // ctx.strokeStyle = "red";
    // ctx.moveTo(100,100);
    // ctx.lineTo(200, 200);
    // ctx.stroke();

    // ctx.strokeRect(100, 100, 100, 100)

    // ctx.fillStyle = "blue";
    // ctx.fillRect(100, 100, 100, 100)

    // ctx.rect(10,10, 200,200);
    // ctx.stroke();
    // ctx.fill()
    // ctx.clearRect(20,20,100,100)

    // 调色板
    // for( var i = 0; i < 6; i++){
    //   for( var j = 0; j < 6; j++){
    //         ctx.fillStyle = "rgb(" + Math.floor(255 -42.5*i) + "," + Math.floor(255 -42.5*j) + ",0)";
    //         ctx.fillRect(i*25, j*25, 25, 25);
    //     }
    // }

    // ctx.moveTo(20,20);
    // ctx.lineTo(70,20);
    // ctx.arcTo(120,20,120,70,50);
    // ctx.lineTo(120,120);
    // ctx.stroke();

    // 扇形
    // ctx.beginPath();
    // ctx.moveTo(100,75);
    // ctx.arc(100, 75, 50, 30*Math.PI/180, 120*Math.PI/180, false);
    // ctx.closePath();
    // ctx.strokeStyle = "HotOink";
    // ctx.stroke();


    ctx.fillStyle = "HotPink";
    ctx.fillRect(30,30,50,50);
    document.getElementById("btn-big").onclick = function(){
      ctx.scale(1.5, 1.5);
      ctx.fillStyle = "#9966ff";
      ctx.fillRect(30,30,50,50);
    }
    document.getElementById("btn-small").onclick = function(){
      ctx.scale(0.5, 0.5);
      ctx.fillStyle = "LightSkyBlue";
      ctx.fillRect(30,30,50,50);
    }

  }

  render(){
    const { num } = this.state;
    console.log("num>", num);
    return (
      <div>
        <div>{num}</div>
        <button onClick = { () => { this.setState({num: num+1}); } }>click</button>
        <Button type = "primary" onClick = { () => { this.setState({num: num+1}); } }>click</Button>
        <button id= "btn-big">大</button>
        <button id= "btn-small">小</button>
        <canvas id = "mp" width = "500" height = "500" style = {{ border: "dashed 1px red" }}>
        </canvas>
      </div>
    );
  }
}