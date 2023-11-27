ace.define("ace/ext/textarea",["require","exports","module","ace/lib/event","ace/lib/useragent","ace/ace"],(function(e,t,i){"use strict";var n=e("../lib/event"),o=e("../lib/useragent"),r=e("../ace");i.exports=t=r;var getCSSProperty=function(e,t,i){var n=e.style[i];return n||(n=window.getComputedStyle?window.getComputedStyle(e,"").getPropertyValue(i):e.currentStyle[i]),n&&"auto"!=n&&"intrinsic"!=n||(n=t.style[i]),n};function applyStyles(e,t){for(var i in t)e.style[i]=t[i]}function setupContainer(e,t){if("textarea"!=e.type)throw new Error("Textarea required!");var i=e.parentNode,o=document.createElement("div"),resizeEvent=function(){var t="position:relative;";["margin-top","margin-left","margin-right","margin-bottom"].forEach((function(i){t+=i+":"+getCSSProperty(e,o,i)+";"}));var i=getCSSProperty(e,o,"width")||e.clientWidth+"px",n=getCSSProperty(e,o,"height")||e.clientHeight+"px";t+="height:"+n+";width:"+i+";",t+="display:inline-block;",o.setAttribute("style",t)};for(n.addListener(window,"resize",resizeEvent),resizeEvent(),i.insertBefore(o,e.nextSibling);i!==document;){if("FORM"===i.tagName.toUpperCase()){var r=i.onsubmit;i.onsubmit=function(i){e.value=t(),r&&r.call(this,i)};break}i=i.parentNode}return o}function setupApi(e,t,i,n,o){function toBool(e){return"true"===e||1==e}return e.setDisplaySettings=function(t){null==t&&(t="none"==i.style.display),t?(i.style.display="block",i.hideButton.focus(),e.on("focus",(function onFocus(){e.removeListener("focus",onFocus),i.style.display="none"}))):e.focus()},e.$setOption=e.setOption,e.$getOption=e.getOption,e.setOption=function(t,i){switch(t){case"mode":e.$setOption("mode","ace/mode/"+i);break;case"theme":e.$setOption("theme","ace/theme/"+i);break;case"keybindings":switch(i){case"vim":e.setKeyboardHandler("ace/keyboard/vim");break;case"emacs":e.setKeyboardHandler("ace/keyboard/emacs");break;default:e.setKeyboardHandler(null)}break;case"wrap":case"fontSize":e.$setOption(t,i);break;default:e.$setOption(t,toBool(i))}},e.getOption=function(t){switch(t){case"mode":return e.$getOption("mode").substr("ace/mode/".length);case"theme":return e.$getOption("theme").substr("ace/theme/".length);case"keybindings":var i=e.getKeyboardHandler();switch(i&&i.$id){case"ace/keyboard/vim":return"vim";case"ace/keyboard/emacs":return"emacs";default:return"ace"}break;default:return e.$getOption(t)}},e.setOptions(o),e}function setupSettingPanel(e,i,o){var r=null,a={mode:"Mode:",wrap:"Soft Wrap:",theme:"Theme:",fontSize:"Font Size:",showGutter:"Display Gutter:",keybindings:"Keyboard",showPrintMargin:"Show Print Margin:",useSoftTabs:"Use Soft Tabs:",showInvisibles:"Show Invisibles"},s={mode:{text:"Plain",javascript:"JavaScript",xml:"XML",html:"HTML",css:"CSS",scss:"SCSS",python:"Python",php:"PHP",java:"Java",ruby:"Ruby",c_cpp:"C/C++",coffee:"CoffeeScript",json:"json",perl:"Perl",clojure:"Clojure",ocaml:"OCaml",csharp:"C#",haxe:"haXe",svg:"SVG",textile:"Textile",groovy:"Groovy",liquid:"Liquid",Scala:"Scala"},theme:{clouds:"Clouds",clouds_midnight:"Clouds Midnight",cobalt:"Cobalt",crimson_editor:"Crimson Editor",dawn:"Dawn",gob:"Green on Black",eclipse:"Eclipse",idle_fingers:"Idle Fingers",kr_theme:"Kr Theme",merbivore:"Merbivore",merbivore_soft:"Merbivore Soft",mono_industrial:"Mono Industrial",monokai:"Monokai",pastel_on_dark:"Pastel On Dark",solarized_dark:"Solarized Dark",solarized_light:"Solarized Light",textmate:"Textmate",twilight:"Twilight",vibrant_ink:"Vibrant Ink"},showGutter:r,fontSize:{"10px":"10px","11px":"11px","12px":"12px","14px":"14px","16px":"16px"},wrap:{off:"Off",40:"40",80:"80",free:"Free"},keybindings:{ace:"ace",vim:"vim",emacs:"emacs"},showPrintMargin:r,useSoftTabs:r,showInvisibles:r},l=[];function renderOption(e,t,i,n){if(i){for(var o in e.push("<select title='"+t+"'>"),i)e.push("<option value='"+o+"' "),n==o&&e.push(" selected "),e.push(">",i[o],"</option>");e.push("</select>")}else e.push("<input type='checkbox' title='",t,"' ",n+""=="true"?"checked='true'":"","'></input>")}for(var u in l.push("<table><tr><th>Setting</th><th>Value</th></tr>"),t.defaultOptions)l.push("<tr><td>",a[u],"</td>"),l.push("<td>"),renderOption(l,u,s[u],o.getOption(u)),l.push("</td></tr>");l.push("</table>"),e.innerHTML=l.join("");for(var onChange=function(e){var t=e.currentTarget;o.setOption(t.title,t.value)},onClick=function(e){var t=e.currentTarget;o.setOption(t.title,t.checked)},c=e.getElementsByTagName("select"),p=0;p<c.length;p++)c[p].onchange=onChange;var d=e.getElementsByTagName("input");for(p=0;p<d.length;p++)d[p].onclick=onClick;var h=document.createElement("input");h.type="button",h.value="Hide",n.addListener(h,"click",(function(){o.setDisplaySettings(!1)})),e.appendChild(h),e.hideButton=h}t.transformTextarea=function(e,i){var a,s=e.autofocus||document.activeElement==e,l=setupContainer(e,(function(){return a.getValue()}));e.style.display="none",l.style.background="white";var u=document.createElement("div");applyStyles(u,{top:"0px",left:"0px",right:"0px",bottom:"0px",border:"1px solid gray",position:"absolute"}),l.appendChild(u);var c=document.createElement("div");applyStyles(c,{position:"absolute",right:"0px",bottom:"0px",cursor:"nw-resize",border:"solid 9px",borderColor:"lightblue gray gray #ceade6",zIndex:101});var p=document.createElement("div"),d={top:"0px",left:"20%",right:"0px",bottom:"0px",position:"absolute",padding:"5px",zIndex:100,color:"white",display:"none",overflow:"auto",fontSize:"14px",boxShadow:"-5px 2px 3px gray"};o.isOldIE?d.backgroundColor="#333":d.backgroundColor="rgba(0, 0, 0, 0.6)",applyStyles(p,d),l.appendChild(p),i=i||t.defaultOptions;var h=r.edit(u);(a=h.getSession()).setValue(e.value||e.innerHTML),s&&h.focus(),l.appendChild(c),setupApi(h,u,p,r,i),setupSettingPanel(p,c,h);var f="";return n.addListener(c,"mousemove",(function(e){var t=this.getBoundingClientRect();e.clientX-t.left+(e.clientY-t.top)<(t.width+t.height)/2?(this.style.cursor="pointer",f="toggle"):(f="resize",this.style.cursor="nw-resize")})),n.addListener(c,"mousedown",(function(e){if(e.preventDefault(),"toggle"!=f){l.style.zIndex=1e5;var t=l.getBoundingClientRect(),i=t.width+t.left-e.clientX,o=t.height+t.top-e.clientY;n.capture(c,(function(e){l.style.width=e.clientX-t.left+i+"px",l.style.height=e.clientY-t.top+o+"px",h.resize()}),(function(){}))}else h.setDisplaySettings()})),h},t.defaultOptions={mode:"javascript",theme:"textmate",wrap:"off",fontSize:"12px",showGutter:"false",keybindings:"ace",showPrintMargin:"false",useSoftTabs:"true",showInvisibles:"false"}})),ace.require(["ace/ext/textarea"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));