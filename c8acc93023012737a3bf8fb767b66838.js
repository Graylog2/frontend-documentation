ace.define("ace/snippets",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/range_list","ace/keyboard/hash_handler","ace/tokenizer","ace/clipboard","ace/editor"],(function(e,t,n){"use strict";var r=e("./lib/dom"),i=e("./lib/oop"),o=e("./lib/event_emitter").EventEmitter,a=e("./lib/lang"),s=e("./range").Range,p=e("./range_list").RangeList,c=e("./keyboard/hash_handler").HashHandler,u=e("./tokenizer").Tokenizer,d=e("./clipboard"),l={CURRENT_WORD:function(e){return e.session.getTextRange(e.session.getWordRange())},SELECTION:function(e,t,n){var r=e.session.getTextRange();return n?r.replace(/\n\r?([ \t]*\S)/g,"\n"+n+"$1"):r},CURRENT_LINE:function(e){return e.session.getLine(e.getCursorPosition().row)},PREV_LINE:function(e){return e.session.getLine(e.getCursorPosition().row-1)},LINE_INDEX:function(e){return e.getCursorPosition().row},LINE_NUMBER:function(e){return e.getCursorPosition().row+1},SOFT_TABS:function(e){return e.session.getUseSoftTabs()?"YES":"NO"},TAB_SIZE:function(e){return e.session.getTabSize()},CLIPBOARD:function(e){return d.getText&&d.getText()},FILENAME:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0]},FILENAME_BASE:function(e){return/[^/\\]*$/.exec(this.FILEPATH(e))[0].replace(/\.[^.]*$/,"")},DIRECTORY:function(e){return this.FILEPATH(e).replace(/[^/\\]*$/,"")},FILEPATH:function(e){return"/not implemented.txt"},WORKSPACE_NAME:function(){return"Unknown"},FULLNAME:function(){return"Unknown"},BLOCK_COMMENT_START:function(e){var t=e.session.$mode||{};return t.blockComment&&t.blockComment.start||""},BLOCK_COMMENT_END:function(e){var t=e.session.$mode||{};return t.blockComment&&t.blockComment.end||""},LINE_COMMENT:function(e){return(e.session.$mode||{}).lineCommentStart||""},CURRENT_YEAR:date.bind(null,{year:"numeric"}),CURRENT_YEAR_SHORT:date.bind(null,{year:"2-digit"}),CURRENT_MONTH:date.bind(null,{month:"numeric"}),CURRENT_MONTH_NAME:date.bind(null,{month:"long"}),CURRENT_MONTH_NAME_SHORT:date.bind(null,{month:"short"}),CURRENT_DATE:date.bind(null,{day:"2-digit"}),CURRENT_DAY_NAME:date.bind(null,{weekday:"long"}),CURRENT_DAY_NAME_SHORT:date.bind(null,{weekday:"short"}),CURRENT_HOUR:date.bind(null,{hour:"2-digit",hour12:!1}),CURRENT_MINUTE:date.bind(null,{minute:"2-digit"}),CURRENT_SECOND:date.bind(null,{second:"2-digit"})};function date(e){var t=(new Date).toLocaleString("en-us",e);return 1==t.length?"0"+t:t}l.SELECTED_TEXT=l.SELECTION;var h=function(){function SnippetManager(){this.snippetMap={},this.snippetNameMap={},this.variables=l}return SnippetManager.prototype.getTokenizer=function(){return SnippetManager.$tokenizer||this.createTokenizer()},SnippetManager.prototype.createTokenizer=function(){function TabstopToken(e){return e=e.substr(1),/^\d+$/.test(e)?[{tabstopId:parseInt(e,10)}]:[{text:e}]}function escape(e){return"(?:[^\\\\"+e+"]|\\\\.)"}var e={regex:"/("+escape("/")+"+)/",onMatch:function(e,t,n){var r=n[0];return r.fmtString=!0,r.guard=e.slice(1,-1),r.flag="",""},next:"formatString"};return SnippetManager.$tokenizer=new u({start:[{regex:/\\./,onMatch:function(e,t,n){var r=e[1];return("}"==r&&n.length||-1!="`$\\".indexOf(r))&&(e=r),[e]}},{regex:/}/,onMatch:function(e,t,n){return[n.length?n.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:TabstopToken},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(e,t,n){var r=TabstopToken(e.substr(1));return n.unshift(r[0]),r},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+escape("\\|")+"*\\|",onMatch:function(e,t,n){var r=e.slice(1,-1).replace(/\\[,|\\]|,/g,(function(e){return 2==e.length?e[1]:"\0"})).split("\0").map((function(e){return{value:e}}));return n[0].choices=r,[r[0]]},next:"start"},e,{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:/:/,onMatch:function(e,t,n){return n.length&&n[0].expectElse?(n[0].expectElse=!1,n[0].ifEnd={elseEnd:n[0]},[n[0].ifEnd]):":"}},{regex:/\\./,onMatch:function(e,t,n){var r=e[1];return"}"==r&&n.length||-1!="`$\\".indexOf(r)?e=r:"n"==r?e="\n":"t"==r?e="\t":-1!="ulULE".indexOf(r)&&(e={changeCase:r,local:r>"a"}),[e]}},{regex:"/\\w*}",onMatch:function(e,t,n){var r=n.shift();return r&&(r.flag=e.slice(1,-1)),this.next=r&&r.tabstopId?"start":"",[r||e]},next:"start"},{regex:/\$(?:\d+|\w+)/,onMatch:function(e,t,n){return[{text:e.slice(1)}]}},{regex:/\${\w+/,onMatch:function(e,t,n){var r={text:e.slice(2)};return n.unshift(r),[r]},next:"formatStringVar"},{regex:/\n/,token:"newline",merge:!1},{regex:/}/,onMatch:function(e,t,n){var r=n.shift();return this.next=r&&r.tabstopId?"start":"",[r||e]},next:"start"}],formatStringVar:[{regex:/:\/\w+}/,onMatch:function(e,t,n){return n[0].formatFunction=e.slice(2,-1),[n.shift()]},next:"formatString"},e,{regex:/:[\?\-+]?/,onMatch:function(e,t,n){"+"==e[1]&&(n[0].ifEnd=n[0]),"?"==e[1]&&(n[0].expectElse=!0)},next:"formatString"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"formatString"}]}),SnippetManager.$tokenizer},SnippetManager.prototype.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map((function(e){return e.value||e}))},SnippetManager.prototype.getVariableValue=function(e,t,n){if(/^\d+$/.test(t))return(this.variables.__||{})[t]||"";if(/^[A-Z]\d+$/.test(t))return(this.variables[t[0]+"__"]||{})[t.substr(1)]||"";if(t=t.replace(/^TM_/,""),!this.variables.hasOwnProperty(t))return"";var r=this.variables[t];return"function"==typeof r&&(r=this.variables[t](e,t,n)),null==r?"":r},SnippetManager.prototype.tmStrFormat=function(e,t,n){if(!t.fmt)return e;var r=t.flag||"",i=t.guard;i=new RegExp(i,r.replace(/[^gim]/g,""));var o="string"==typeof t.fmt?this.tokenizeTmSnippet(t.fmt,"formatString"):t.fmt,a=this,s=e.replace(i,(function(){var e=a.variables.__;a.variables.__=[].slice.call(arguments);for(var t=a.resolveVariables(o,n),r="E",i=0;i<t.length;i++){var s=t[i];if("object"==typeof s)if(t[i]="",s.changeCase&&s.local){var p=t[i+1];p&&"string"==typeof p&&("u"==s.changeCase?t[i]=p[0].toUpperCase():t[i]=p[0].toLowerCase(),t[i+1]=p.substr(1))}else s.changeCase&&(r=s.changeCase);else"U"==r?t[i]=s.toUpperCase():"L"==r&&(t[i]=s.toLowerCase())}return a.variables.__=e,t.join("")}));return s},SnippetManager.prototype.tmFormatFunction=function(e,t,n){return"upcase"==t.formatFunction?e.toUpperCase():"downcase"==t.formatFunction?e.toLowerCase():e},SnippetManager.prototype.resolveVariables=function(e,t){for(var n=[],r="",i=!0,o=0;o<e.length;o++){var a=e[o];if("string"!=typeof a){if(a){if(i=!1,a.fmtString){var s=e.indexOf(a,o+1);-1==s&&(s=e.length),a.fmt=e.slice(o+1,s),o=s}if(a.text){var p=this.getVariableValue(t,a.text,r)+"";a.fmtString&&(p=this.tmStrFormat(p,a,t)),a.formatFunction&&(p=this.tmFormatFunction(p,a,t)),p&&!a.ifEnd?(n.push(p),gotoNext(a)):!p&&a.ifEnd&&gotoNext(a.ifEnd)}else a.elseEnd?gotoNext(a.elseEnd):(null!=a.tabstopId||null!=a.changeCase)&&n.push(a)}}else n.push(a),"\n"==a?(i=!0,r=""):i&&(r=/^\t*/.exec(a)[0],i=/\S/.test(a))}function gotoNext(t){var n=e.indexOf(t,o+1);-1!=n&&(o=n)}return n},SnippetManager.prototype.getDisplayTextForSnippet=function(e,t){return processSnippetText.call(this,e,t).text},SnippetManager.prototype.insertSnippetForSelection=function(e,t,n){void 0===n&&(n={});var r=processSnippetText.call(this,e,t,n),i=e.getSelectionRange(),o=e.session.replace(i,r.text),a=new g(e),s=e.inVirtualSelectionMode&&e.selection.index;a.addTabstops(r.tabstops,i.start,o,s)},SnippetManager.prototype.insertSnippet=function(e,t,n){void 0===n&&(n={});var r=this;if(e.inVirtualSelectionMode)return r.insertSnippetForSelection(e,t,n);e.forEachSelection((function(){r.insertSnippetForSelection(e,t,n)}),null,{keepOrder:!0}),e.tabstopManager&&e.tabstopManager.tabNext()},SnippetManager.prototype.$getScope=function(e){var t=e.session.$mode.$id||"";if("html"===(t=t.split("/").pop())||"php"===t){"php"!==t||e.session.$mode.inlinePhp||(t="html");var n=e.getCursorPosition(),r=e.session.getState(n.row);"object"==typeof r&&(r=r[0]),r.substring&&("js-"==r.substring(0,3)?t="javascript":"css-"==r.substring(0,4)?t="css":"php-"==r.substring(0,4)&&(t="php"))}return t},SnippetManager.prototype.getActiveScopes=function(e){var t=this.$getScope(e),n=[t],r=this.snippetMap;return r[t]&&r[t].includeScopes&&n.push.apply(n,r[t].includeScopes),n.push("_"),n},SnippetManager.prototype.expandWithTab=function(e,t){var n=this,r=e.forEachSelection((function(){return n.expandSnippetForSelection(e,t)}),null,{keepOrder:!0});return r&&e.tabstopManager&&e.tabstopManager.tabNext(),r},SnippetManager.prototype.expandSnippetForSelection=function(e,t){var n,r=e.getCursorPosition(),i=e.session.getLine(r.row),o=i.substring(0,r.column),a=i.substr(r.column),s=this.snippetMap;return this.getActiveScopes(e).some((function(e){var t=s[e];return t&&(n=this.findMatchingSnippet(t,o,a)),!!n}),this),!!n&&(t&&t.dryRun||(e.session.doc.removeInLine(r.row,r.column-n.replaceBefore.length,r.column+n.replaceAfter.length),this.variables.M__=n.matchBefore,this.variables.T__=n.matchAfter,this.insertSnippetForSelection(e,n.content),this.variables.M__=this.variables.T__=null),!0)},SnippetManager.prototype.findMatchingSnippet=function(e,t,n){for(var r=e.length;r--;){var i=e[r];if((!i.startRe||i.startRe.test(t))&&((!i.endRe||i.endRe.test(n))&&(i.startRe||i.endRe)))return i.matchBefore=i.startRe?i.startRe.exec(t):[""],i.matchAfter=i.endRe?i.endRe.exec(n):[""],i.replaceBefore=i.triggerRe?i.triggerRe.exec(t)[0]:"",i.replaceAfter=i.endTriggerRe?i.endTriggerRe.exec(n)[0]:"",i}},SnippetManager.prototype.register=function(e,t){var n=this.snippetMap,r=this.snippetNameMap,i=this;function wrapRegexp(e){return e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e)&&(e="(?:"+e+")"),e||""}function guardedRegexp(e,t,n){return e=wrapRegexp(e),t=wrapRegexp(t),n?(e=t+e)&&"$"!=e[e.length-1]&&(e+="$"):(e+=t)&&"^"!=e[0]&&(e="^"+e),new RegExp(e)}function addSnippet(e){e.scope||(e.scope=t||"_"),t=e.scope,n[t]||(n[t]=[],r[t]={});var o=r[t];if(e.name){var s=o[e.name];s&&i.unregister(s),o[e.name]=e}n[t].push(e),e.prefix&&(e.tabTrigger=e.prefix),!e.content&&e.body&&(e.content=Array.isArray(e.body)?e.body.join("\n"):e.body),e.tabTrigger&&!e.trigger&&(!e.guard&&/^\w/.test(e.tabTrigger)&&(e.guard="\\b"),e.trigger=a.escapeRegExp(e.tabTrigger)),(e.trigger||e.guard||e.endTrigger||e.endGuard)&&(e.startRe=guardedRegexp(e.trigger,e.guard,!0),e.triggerRe=new RegExp(e.trigger),e.endRe=guardedRegexp(e.endTrigger,e.endGuard,!0),e.endTriggerRe=new RegExp(e.endTrigger))}e||(e=[]),Array.isArray(e)?e.forEach(addSnippet):Object.keys(e).forEach((function(t){addSnippet(e[t])})),this._signal("registerSnippets",{scope:t})},SnippetManager.prototype.unregister=function(e,t){var n=this.snippetMap,r=this.snippetNameMap;function removeSnippet(e){var i=r[e.scope||t];if(i&&i[e.name]){delete i[e.name];var o=n[e.scope||t],a=o&&o.indexOf(e);a>=0&&o.splice(a,1)}}e.content?removeSnippet(e):Array.isArray(e)&&e.forEach(removeSnippet)},SnippetManager.prototype.parseSnippetFile=function(e){e=e.replace(/\r/g,"");for(var t,n=[],r={},i=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;t=i.exec(e);){if(t[1])try{r=JSON.parse(t[1]),n.push(r)}catch(e){}if(t[4])r.content=t[4].replace(/^\t/gm,""),n.push(r),r={};else{var o=t[2],a=t[3];if("regex"==o){var s=/\/((?:[^\/\\]|\\.)*)|$/g;r.guard=s.exec(a)[1],r.trigger=s.exec(a)[1],r.endTrigger=s.exec(a)[1],r.endGuard=s.exec(a)[1]}else"snippet"==o?(r.tabTrigger=a.match(/^\S*/)[0],r.name||(r.name=a)):o&&(r[o]=a)}}return n},SnippetManager.prototype.getSnippetByName=function(e,t){var n,r=this.snippetNameMap;return this.getActiveScopes(t).some((function(t){var i=r[t];return i&&(n=i[e]),!!n}),this),n},SnippetManager}();i.implement(h.prototype,o);var processSnippetText=function(e,t,n){void 0===n&&(n={});var r=e.getCursorPosition(),i=e.session.getLine(r.row),o=e.session.getTabString(),a=i.match(/^\s*/)[0];r.column<a.length&&(a=a.slice(0,r.column)),t=t.replace(/\r/g,"");var s=this.tokenizeTmSnippet(t);s=(s=this.resolveVariables(s,e)).map((function(e){return"\n"!=e||n.excludeExtraIndent?"string"==typeof e?e.replace(/\t/g,o):e:e+a}));var p=[];s.forEach((function(e,t){if("object"==typeof e){var n=e.tabstopId,r=p[n];if(r||((r=p[n]=[]).index=n,r.value="",r.parents={}),-1===r.indexOf(e)){e.choices&&!r.choices&&(r.choices=e.choices),r.push(e);var i=s.indexOf(e,t+1);if(-1!==i){var o=s.slice(t+1,i);o.some((function(e){return"object"==typeof e}))&&!r.value?r.value=o:!o.length||r.value&&"string"==typeof r.value||(r.value=o.join(""))}}}})),p.forEach((function(e){e.length=0}));var c={};function copyValue(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];if("object"==typeof r){if(c[r.tabstopId])continue;r=t[e.lastIndexOf(r,n-1)]||{tabstopId:r.tabstopId}}t[n]=r}return t}for(var u=0;u<s.length;u++){var d=s[u];if("object"==typeof d){var l=d.tabstopId,h=p[l],g=s.indexOf(d,u+1);if(c[l])c[l]===d&&(delete c[l],Object.keys(c).forEach((function(e){h.parents[e]=!0})));else{c[l]=d;var f=h.value;"string"!=typeof f?f=copyValue(f):d.fmt&&(f=this.tmStrFormat(f,d,e)),s.splice.apply(s,[u+1,Math.max(0,g-u)].concat(f,d)),-1===h.indexOf(d)&&h.push(d)}}}var m=0,b=0,v="";return s.forEach((function(e){if("string"==typeof e){var t=e.split("\n");t.length>1?(b=t[t.length-1].length,m+=t.length-1):b+=e.length,v+=e}else e&&(e.start?e.end={row:m,column:b}:e.start={row:m,column:b})})),{text:v,tabstops:p,tokens:s}},g=function(){function TabstopManager(e){if(this.index=0,this.ranges=[],this.tabstops=[],e.tabstopManager)return e.tabstopManager;e.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=a.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(e)}return TabstopManager.prototype.attach=function(e){this.$openTabstops=null,this.selectedTabstop=null,this.editor=e,this.session=e.session,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},TabstopManager.prototype.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges.length=0,this.tabstops.length=0,this.selectedTabstop=null,this.editor.off("change",this.$onChange),this.editor.off("changeSelection",this.$onChangeSelection),this.editor.off("changeSession",this.$onChangeSession),this.editor.commands.off("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.session=null,this.editor=null},TabstopManager.prototype.onChange=function(e){for(var t="r"==e.action[0],n=this.selectedTabstop||{},r=n.parents||{},i=this.tabstops.slice(),o=0;o<i.length;o++){var a=i[o],s=a==n||r[a.index];if(a.rangeList.$bias=s?0:1,"remove"==e.action&&a!==n){var p=a.parents&&a.parents[n.index],c=a.rangeList.pointIndex(e.start,p);c=c<0?-c-1:c+1;var u=a.rangeList.pointIndex(e.end,p);u=u<0?-u-1:u-1;for(var d=a.rangeList.ranges.slice(c,u),l=0;l<d.length;l++)this.removeRange(d[l])}a.rangeList.$onChange(e)}var h=this.session;this.$inChange||!t||1!=h.getLength()||h.getValue()||this.detach()},TabstopManager.prototype.updateLinkedFields=function(){var e=this.selectedTabstop;if(e&&e.hasLinkedRanges&&e.firstNonLinked){this.$inChange=!0;for(var n=this.session,r=n.getTextRange(e.firstNonLinked),i=0;i<e.length;i++){var o=e[i];if(o.linked){var a=o.original,s=t.snippetManager.tmStrFormat(r,a,this.editor);n.replace(o,s)}}this.$inChange=!1}},TabstopManager.prototype.onAfterExec=function(e){e.command&&!e.command.readOnly&&this.updateLinkedFields()},TabstopManager.prototype.onChangeSelection=function(){if(this.editor){for(var e=this.editor.selection.lead,t=this.editor.selection.anchor,n=this.editor.selection.isEmpty(),r=0;r<this.ranges.length;r++)if(!this.ranges[r].linked){var i=this.ranges[r].contains(e.row,e.column),o=n||this.ranges[r].contains(t.row,t.column);if(i&&o)return}this.detach()}},TabstopManager.prototype.onChangeSession=function(){this.detach()},TabstopManager.prototype.tabNext=function(e){var t=this.tabstops.length,n=this.index+(e||1);(n=Math.min(Math.max(n,1),t))==t&&(n=0),this.selectTabstop(n),this.updateTabstopMarkers(),0===n&&this.detach()},TabstopManager.prototype.selectTabstop=function(e){this.$openTabstops=null;var t=this.tabstops[this.index];if(t&&this.addTabstopMarkers(t),this.index=e,(t=this.tabstops[this.index])&&t.length){this.selectedTabstop=t;var n=t.firstNonLinked||t;if(t.choices&&(n.cursor=n.start),this.editor.inVirtualSelectionMode)this.editor.selection.fromOrientedRange(n);else{var r=this.editor.multiSelect;r.toSingleRange(n);for(var i=0;i<t.length;i++)t.hasLinkedRanges&&t[i].linked||r.addRange(t[i].clone(),!0)}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler),this.selectedTabstop&&this.selectedTabstop.choices&&this.editor.execCommand("startAutocomplete",{matches:this.selectedTabstop.choices})}},TabstopManager.prototype.addTabstops=function(e,t,n){var r=this.useLink||!this.editor.getOption("enableMultiselect");if(this.$openTabstops||(this.$openTabstops=[]),!e[0]){var i=s.fromPoints(n,n);moveRelative(i.start,t),moveRelative(i.end,t),e[0]=[i],e[0].index=0}var o=[this.index+1,0],a=this.ranges,c=this.snippetId=(this.snippetId||0)+1;e.forEach((function(e,n){var i=this.$openTabstops[n]||e;i.snippetId=c;for(var u=0;u<e.length;u++){var d=e[u],l=s.fromPoints(d.start,d.end||d.start);movePoint(l.start,t),movePoint(l.end,t),l.original=d,l.tabstop=i,a.push(l),i!=e?i.unshift(l):i[u]=l,d.fmtString||i.firstNonLinked&&r?(l.linked=!0,i.hasLinkedRanges=!0):i.firstNonLinked||(i.firstNonLinked=l)}i.firstNonLinked||(i.hasLinkedRanges=!1),i===e&&(o.push(i),this.$openTabstops[n]=i),this.addTabstopMarkers(i),i.rangeList=i.rangeList||new p,i.rangeList.$bias=0,i.rangeList.addList(i)}),this),o.length>2&&(this.tabstops.length&&o.push(o.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,o))},TabstopManager.prototype.addTabstopMarkers=function(e){var t=this.session;e.forEach((function(e){e.markerId||(e.markerId=t.addMarker(e,"ace_snippet-marker","text"))}))},TabstopManager.prototype.removeTabstopMarkers=function(e){var t=this.session;e.forEach((function(e){t.removeMarker(e.markerId),e.markerId=null}))},TabstopManager.prototype.updateTabstopMarkers=function(){if(this.selectedTabstop){var e=this.selectedTabstop.snippetId;0===this.selectedTabstop.index&&e--,this.tabstops.forEach((function(t){t.snippetId===e?this.addTabstopMarkers(t):this.removeTabstopMarkers(t)}),this)}},TabstopManager.prototype.removeRange=function(e){var t=e.tabstop.indexOf(e);-1!=t&&e.tabstop.splice(t,1),-1!=(t=this.ranges.indexOf(e))&&this.ranges.splice(t,1),-1!=(t=e.tabstop.rangeList.ranges.indexOf(e))&&e.tabstop.splice(t,1),this.session.removeMarker(e.markerId),e.tabstop.length||(-1!=(t=this.tabstops.indexOf(e.tabstop))&&this.tabstops.splice(t,1),this.tabstops.length||this.detach())},TabstopManager}();g.prototype.keyboardHandler=new c,g.prototype.keyboardHandler.bindKeys({Tab:function(e){t.snippetManager&&t.snippetManager.expandWithTab(e)||(e.tabstopManager.tabNext(1),e.renderer.scrollCursorIntoView())},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1),e.renderer.scrollCursorIntoView()},Esc:function(e){e.tabstopManager.detach()}});var movePoint=function(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row},moveRelative=function(e,t){e.row==t.row&&(e.column-=t.column),e.row-=t.row};r.importCssString("\n.ace_snippet-marker {\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    background: rgba(194, 193, 208, 0.09);\n    border: 1px dotted rgba(211, 208, 235, 0.62);\n    position: absolute;\n}","snippets.css",!1),t.snippetManager=new h;var f=e("./editor").Editor;(function(){this.insertSnippet=function(e,n){return t.snippetManager.insertSnippet(this,e,n)},this.expandSnippet=function(e){return t.snippetManager.expandWithTab(this,e)}}).call(f.prototype)})),ace.define("ace/ext/emmet",["require","exports","module","ace/keyboard/hash_handler","ace/editor","ace/snippets","ace/range","ace/config","resources","resources","tabStops","resources","utils","actions"],(function(e,t,n){"use strict";var r,i,o=e("../keyboard/hash_handler").HashHandler,a=e("../editor").Editor,s=e("../snippets").snippetManager,p=e("../range").Range,c=e("../config"),u=function(){function AceEmmetEditor(){}return AceEmmetEditor.prototype.setupContext=function(e){this.ace=e,this.indentation=e.session.getTabString(),r||(r=window.emmet),(r.resources||r.require("resources")).setVariable("indentation",this.indentation),this.$syntax=null,this.$syntax=this.getSyntax()},AceEmmetEditor.prototype.getSelectionRange=function(){var e=this.ace.getSelectionRange(),t=this.ace.session.doc;return{start:t.positionToIndex(e.start),end:t.positionToIndex(e.end)}},AceEmmetEditor.prototype.createSelection=function(e,t){var n=this.ace.session.doc;this.ace.selection.setRange({start:n.indexToPosition(e),end:n.indexToPosition(t)})},AceEmmetEditor.prototype.getCurrentLineRange=function(){var e=this.ace,t=e.getCursorPosition().row,n=e.session.getLine(t).length,r=e.session.doc.positionToIndex({row:t,column:0});return{start:r,end:r+n}},AceEmmetEditor.prototype.getCaretPos=function(){var e=this.ace.getCursorPosition();return this.ace.session.doc.positionToIndex(e)},AceEmmetEditor.prototype.setCaretPos=function(e){var t=this.ace.session.doc.indexToPosition(e);this.ace.selection.moveToPosition(t)},AceEmmetEditor.prototype.getCurrentLine=function(){var e=this.ace.getCursorPosition().row;return this.ace.session.getLine(e)},AceEmmetEditor.prototype.replaceContent=function(e,t,n,r){null==n&&(n=null==t?this.getContent().length:t),null==t&&(t=0);var i=this.ace,o=i.session.doc,a=p.fromPoints(o.indexToPosition(t),o.indexToPosition(n));i.session.remove(a),a.end=a.start,e=this.$updateTabstops(e),s.insertSnippet(i,e)},AceEmmetEditor.prototype.getContent=function(){return this.ace.getValue()},AceEmmetEditor.prototype.getSyntax=function(){if(this.$syntax)return this.$syntax;var e=this.ace.session.$modeId.split("/").pop();if("html"==e||"php"==e){var t=this.ace.getCursorPosition(),n=this.ace.session.getState(t.row);"string"!=typeof n&&(n=n[0]),n&&((n=n.split("-")).length>1?e=n[0]:"php"==e&&(e="html"))}return e},AceEmmetEditor.prototype.getProfileName=function(){var e=r.resources||r.require("resources");switch(this.getSyntax()){case"css":return"css";case"xml":case"xsl":return"xml";case"html":var t=e.getVariable("profile");return t||(t=-1!=this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i)?"xhtml":"html"),t;default:var n=this.ace.session.$mode;return n.emmetConfig&&n.emmetConfig.profile||"xhtml"}},AceEmmetEditor.prototype.prompt=function(e){return prompt(e)},AceEmmetEditor.prototype.getSelection=function(){return this.ace.session.getTextRange()},AceEmmetEditor.prototype.getFilePath=function(){return""},AceEmmetEditor.prototype.$updateTabstops=function(e){var t=0,n=null,i=r.tabStops||r.require("tabStops"),o=(r.resources||r.require("resources")).getVocabulary("user"),a={tabstop:function(e){var r=parseInt(e.group,10),o=0===r;o?r=++t:r+=1e3;var s=e.placeholder;s&&(s=i.processText(s,a));var p="${"+r+(s?":"+s:"")+"}";return o&&(n=[e.start,p]),p},escape:function(e){return"$"==e?"\\$":"\\"==e?"\\\\":e}};if(e=i.processText(e,a),o.variables.insert_final_tabstop&&!/\$\{0\}$/.test(e))e+="${0}";else if(n){e=(r.utils?r.utils.common:r.require("utils")).replaceSubstring(e,"${0}",n[0],n[1])}return e},AceEmmetEditor}(),d={expand_abbreviation:{mac:"ctrl+alt+e",win:"alt+e"},match_pair_outward:{mac:"ctrl+d",win:"ctrl+,"},match_pair_inward:{mac:"ctrl+j",win:"ctrl+shift+0"},matching_pair:{mac:"ctrl+alt+j",win:"alt+j"},next_edit_point:"alt+right",prev_edit_point:"alt+left",toggle_comment:{mac:"command+/",win:"ctrl+/"},split_join_tag:{mac:"shift+command+'",win:"shift+ctrl+`"},remove_tag:{mac:"command+'",win:"shift+ctrl+;"},evaluate_math_expression:{mac:"shift+command+y",win:"shift+ctrl+y"},increment_number_by_1:"ctrl+up",decrement_number_by_1:"ctrl+down",increment_number_by_01:"alt+up",decrement_number_by_01:"alt+down",increment_number_by_10:{mac:"alt+command+up",win:"shift+alt+up"},decrement_number_by_10:{mac:"alt+command+down",win:"shift+alt+down"},select_next_item:{mac:"shift+command+.",win:"shift+ctrl+."},select_previous_item:{mac:"shift+command+,",win:"shift+ctrl+,"},reflect_css_value:{mac:"shift+command+r",win:"shift+ctrl+r"},encode_decode_data_url:{mac:"shift+ctrl+d",win:"ctrl+'"},expand_abbreviation_with_tab:"Tab",wrap_with_abbreviation:{mac:"shift+ctrl+a",win:"shift+ctrl+a"}},l=new u;for(var h in t.commands=new o,t.runEmmetCommand=function runEmmetCommand(e){if("expand_abbreviation_with_tab"==this.action){if(!e.selection.isEmpty())return!1;var n=e.selection.lead,i=e.session.getTokenAt(n.row,n.column);if(i&&/\btag\b/.test(i.type))return!1}try{l.setupContext(e);var o=r.actions||r.require("actions");if("wrap_with_abbreviation"==this.action)return setTimeout((function(){o.run("wrap_with_abbreviation",l)}),0);var a=o.run(this.action,l)}catch(n){if(!r){var s=t.load(runEmmetCommand.bind(this,e));return"expand_abbreviation_with_tab"!=this.action&&s}e._signal("changeStatus","string"==typeof n?n:n.message),c.warn(n),a=!1}return a},d)t.commands.addCommand({name:"emmet:"+h,action:h,bindKey:d[h],exec:t.runEmmetCommand,multiSelectAction:"forEach"});t.updateCommands=function(e,n){n?e.keyBinding.addKeyboardHandler(t.commands):e.keyBinding.removeKeyboardHandler(t.commands)},t.isSupportedMode=function(e){if(!e)return!1;if(e.emmetConfig)return!0;var t=e.$id||e;return/css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(t)},t.isAvailable=function(e,n){if(/(evaluate_math_expression|expand_abbreviation)$/.test(n))return!0;var r=e.session.$mode,i=t.isSupportedMode(r);if(i&&r.$modes)try{l.setupContext(e),/js|php/.test(l.getSyntax())&&(i=!1)}catch(e){}return i};var onChangeMode=function(e,n){var r=n;if(r){var i=t.isSupportedMode(r.session.$mode);!1===e.enableEmmet&&(i=!1),i&&t.load(),t.updateCommands(r,i)}};t.load=function(e){return"string"!=typeof i?(c.warn("script for emmet-core is not loaded"),!1):(c.loadModule(i,(function(){i=null,e&&e()})),!0)},t.AceEmmetEditor=u,c.defineOptions(a.prototype,"editor",{enableEmmet:{set:function(e){this[e?"on":"removeListener"]("changeMode",onChangeMode),onChangeMode({enableEmmet:!!e},this)},value:!0}}),t.setCore=function(e){"string"==typeof e?i=e:r=e}})),ace.require(["ace/ext/emmet"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));