(function(i,e){var d=i;var g=e;function h(j){return g.getElementById(j)}function a(j){return g.getElementsByClassName(j)}function c(l,m,j){for(var k=l;k<m;k++){if(j(k)){break}}}function f(k,j,l){g.addEventListener(k,function(m){if(j==m.target.tagName.toLowerCase()||j==m.target.className||j==m.target.id){l(m)}})}function b(j){this.input=j.input;this.container=j.container;this.jsonData=j.jsonData;this.success=j.success;this.ulCount=0;this.ulIdx=0;this.ulDomArr=[];this.idxArr=[];this.jsonArr=[];this.liHeight=i.lib?Number(g.getElementsByTagName("HTML")[0].style.fontSize.replace("px",""))*1:40;this.maxHeight=[];this.distance=[];this.start={Y:0,time:""};this.move={Y:0,speed:[]};this.end={Y:0,status:true,};this.resultArr=[];this.initDomFuc();this.initReady(0,this.jsonData[0]);this.initBinding()}b.prototype={constructor:b,generateArrData:function(k){var j=[];c(0,k.length,function(l){j.push({"id":k[l].id,"value":k[l].value})});return j},checkArrDeep:function(j){var k=this;if("child" in j&&j.child.length>0){k.jsonArr.push(k.generateArrData(j.child));k.checkArrDeep(j.child[0])}k.idxArr.push(this.ulIdx++)},insertLiArr:function(m,j){var k="";var l={id:"-99",value:"",};j.unshift(l,l);j.push(l,l);c(0,j.length,function(n){k+='<li data-id="'+j[n].id+'">'+j[n].value+"</li>"});m.innerHTML=k},initDomFuc:function(){var k=this;var j="";j+='<div class="multi-picker-bg" id="multi-picker-bg-'+k.container+'">'+'<div  class="multi-picker-container" id="multi-picker-container-'+k.container+'">'+'<div class="multi-picker-btn-box">'+'<div class="multi-picker-btn" id="multi-picker-btn-cancel">返回</div>'+'<div class="multi-picker-btn" id="multi-picker-btn-save-'+k.container+'">确定</div>'+"</div>"+'<div class="multi-picker-content">'+'<div class="multi-picker-up-shadow"></div>'+'<div class="multi-picker-down-shadow"></div>'+'<div class="multi-picker-line"></div>'+"</div></div></div>";h(k.container).innerHTML=j;k.jsonArr.push(k.generateArrData(k.jsonData))},initReady:function(l,p){var q=this;this.ulIdx=0;this.idxArr.length=l;q.jsonArr.length=l+1;q.checkArrDeep(p);var k=h("multi-picker-container-"+q.container).children[1];var o=q.ulCount<=q.idxArr.length?q.ulCount:q.idxArr.length;c(l+1,o,function(j){var r=h("multi-picker-"+q.container+"-"+j);q.insertLiArr(r,q.jsonArr[j]);q.distance[j]=0;r.style.transform="translate3d(0, 0, 0)";r.style.webkitTransform="translate3d(0, 0, 0)"});if(q.ulCount<=q.idxArr.length){c(q.ulCount,q.idxArr.length,function(r){var s=document.createElement("div");s.setAttribute("class","multi-picker");s.innerHTML='<ul id="multi-picker-'+q.container+"-"+r+'"></ul>';k.insertBefore(s,k.children[k.children.length-3]);var j=h("multi-picker-"+q.container+"-"+r);q.ulDomArr.push(j);q.distance.push(0);q.insertLiArr(j,q.jsonArr[r]);var t=q.jsonArr[r];j.addEventListener("touchstart",function(){q.touch(event,q,j,t,r)},false);j.addEventListener("touchmove",function(){q.touch(event,q,j,t,r)},false);j.addEventListener("touchend",function(){q.touch(event,q,j,t,r)},true)})}else{for(var n=q.ulCount-1;n>q.idxArr.length-1;n--){var m=h(q.container).querySelectorAll(".multi-picker")[n];m.parentNode.removeChild(m);q.ulDomArr.pop();q.distance.pop()}}q.maxHeight.length=0;q.resultArr.length=0;c(0,q.idxArr.length,function(j){h(q.container).querySelectorAll(".multi-picker")[j].style.width=100/q.idxArr.length+"%";q.maxHeight.push(h("multi-picker-"+q.container+"-"+j).childNodes.length*q.liHeight);q.resultArr.push({"id":q.jsonArr[j][q.distance[j]/q.liHeight+2].id,"value":q.jsonArr[j][q.distance[j]/q.liHeight+2].value,"index":q.distance[j]/q.liHeight})});q.ulCount=q.idxArr.length},initBinding:function(){var m=this;var l=h("multi-picker-bg-"+m.container);var k=h("multi-picker-container-"+m.container);var j=g.body;f("touchstart",m.input,function(){l.classList.add("multi-picker-bg-up","multi-picker-bg-delay");k.classList.add("multi-picker-container-up");j.classList.add("multi-picker-locked")},false);f("touchstart","multi-picker-btn-save-"+m.container,function(){m.success(m.resultArr);l.classList.remove("multi-picker-bg-up");k.classList.remove("multi-picker-container-up");setTimeout(function(){l.classList.remove("multi-picker-bg-delay")},350);j.classList.remove("multi-picker-locked")},false);f("touchstart","multi-picker-bg-"+m.container,function(){l.classList.remove("multi-picker-bg-up");k.classList.remove("multi-picker-container-up");setTimeout(function(){l.classList.remove("multi-picker-bg-delay")},350);j.classList.remove("multi-picker-locked")},false);f("touchstart","multi-picker-btn-cancel",function(){l.classList.remove("multi-picker-bg-up");k.classList.remove("multi-picker-container-up");setTimeout(function(){l.classList.remove("multi-picker-bg-delay")},350);j.classList.remove("multi-picker-locked")},false)},checkRange:function(j){var m=this;var k=m.jsonData;var l=0;c(0,j+1,function(n){l=m.distance[n]/m.liHeight;k=n==0?k[l]:k.child[l]});m.initReady(j,k)},initPosition:function(l,k,j){l=l<0?0:l;l=l>k?k:l;var m=l%this.liHeight;if(m<this.liHeight/2){this.distance[j]=l-m
}else{this.distance[j]=l+(this.liHeight-m)}return this},initSpeed:function(o,l,r,s){var k=0;var p=0;var q=0;for(var n in o){p+=o[n]-0}for(var m in o){k+=(o[m]-(p/o.length))*(o[m]-(p/o.length))}if((k/o.length).toFixed(2)>0.1){q=r>this.liHeight*15?l*2:0;this.initPosition(this.distance[s]+q,r-this.liHeight*5,s);this.move.speed[0]=0.2}else{this.initPosition(this.distance[s],r,s);this.move.speed[0]=this.move.speed[0]>0.2?0.2:this.move.speed[0]}},touch:function(j,o,k,p,q){j=j||window.event;j.preventDefault();switch(j.type){case"touchstart":if(o.end.status){o.end.status=!o.end.status;j.preventDefault();o.move.speed=[];o.start.Y=j.touches[0].clientY;o.start.time=Date.now()}break;case"touchend":o.end.Y=Math.abs(j.changedTouches[0].clientY);var n=o.distance[q]+(o.start.Y-o.end.Y);var r=o.distance[q];o.distance[q]=n<0?0:(n<o.maxHeight[q]-this.liHeight*5?n:o.maxHeight[q]-this.liHeight*5);o.initSpeed(o.move.speed,o.start.Y-o.end.Y,o.maxHeight[q],q);k.style.transform="translate3d(0,-"+o.distance[q]+"px, 0)";k.style.webkitTransform="translate3d(0,-"+o.distance[q]+"px, 0)";k.style.transition="transform "+o.move.speed[0]+"s ease-out";k.style.webkitTransition="-webkit-transform "+o.move.speed[0]+"s ease-out";if(r!=o.distance[q]){o.checkRange(q)}setTimeout(function(){o.end.status=true},o.move.speed[0]*1000);break;case"touchmove":j.preventDefault();o.move.Y=j.touches[0].clientY;var m=o.start.Y-o.move.Y;if(o.distance[q]==0&&m<0){k.style.transform="translate3d(0,"+1.5*o.liHeight+"px, 0)";k.style.webkitTransform="translate3d(0,"+1.5*o.liHeight+"px, 0)";k.style.transition="transform 0.2s ease-out";k.style.webkitTransition="-webkit-transform 0.2s ease-out"}else{k.style.transform="translate3d(0,-"+(m+o.distance[q])+"px, 0)";k.style.webkitTransform="translate3d(0,-"+(m+o.distance[q])+"px, 0)"}if(Math.abs(m).toFixed(0)%5===0){var l=Date.now();o.move.speed.push((Math.abs(m)/(l-o.start.time)).toFixed(2))}break}}};if(typeof exports=="object"){module.exports=b}else{if(typeof define=="function"&&define.amd){define([],function(){return b})}else{d.MultiPicker=b}}})(window,document);