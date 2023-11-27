ace.define("ace/mode/asciidoc_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,o){"use strict";var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,AsciidocHighlightRules=function(){var e="[a-zA-Z¡-￿]+\\b";function quoteRule(e){return(/\w/.test(e)?"\\b":"(?:\\B|^)")+e+"[^"+e+"].*?"+e+"(?![\\w*])"}this.$rules={start:[{token:"empty",regex:/$/},{token:"literal",regex:/^\.{4,}\s*$/,next:"listingBlock"},{token:"literal",regex:/^-{4,}\s*$/,next:"literalBlock"},{token:"string",regex:/^\+{4,}\s*$/,next:"passthroughBlock"},{token:"keyword",regex:/^={4,}\s*$/},{token:"text",regex:/^\s*$/},{token:"empty",regex:"",next:"dissallowDelimitedBlock"}],dissallowDelimitedBlock:[{include:"paragraphEnd"},{token:"comment",regex:"^//.+$"},{token:"keyword",regex:"^(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION):"},{include:"listStart"},{token:"literal",regex:/^\s+.+$/,next:"indentedBlock"},{token:"empty",regex:"",next:"text"}],paragraphEnd:[{token:"doc.comment",regex:/^\/{4,}\s*$/,next:"commentBlock"},{token:"tableBlock",regex:/^\s*[|!]=+\s*$/,next:"tableBlock"},{token:"keyword",regex:/^(?:--|''')\s*$/,next:"start"},{token:"option",regex:/^\[.*\]\s*$/,next:"start"},{token:"pageBreak",regex:/^>{3,}$/,next:"start"},{token:"literal",regex:/^\.{4,}\s*$/,next:"listingBlock"},{token:"titleUnderline",regex:/^(?:={2,}|-{2,}|~{2,}|\^{2,}|\+{2,})\s*$/,next:"start"},{token:"singleLineTitle",regex:/^={1,5}\s+\S.*$/,next:"start"},{token:"otherBlock",regex:/^(?:\*{2,}|_{2,})\s*$/,next:"start"},{token:"optionalTitle",regex:/^\.[^.\s].+$/,next:"start"}],listStart:[{token:"keyword",regex:/^\s*(?:\d+\.|[a-zA-Z]\.|[ixvmIXVM]+\)|\*{1,5}|-|\.{1,5})\s/,next:"listText"},{token:"meta.tag",regex:/^.+(?::{2,4}|;;)(?: |$)/,next:"listText"},{token:"support.function.list.callout",regex:/^(?:<\d+>|\d+>|>) /,next:"text"},{token:"keyword",regex:/^\+\s*$/,next:"start"}],text:[{token:["link","variable.language"],regex:/((?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+)(\[.*?\])/},{token:"link",regex:/(?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+/},{token:"link",regex:/\b[\w\.\/\-]+@[\w\.\/\-]+\b/},{include:"macros"},{include:"paragraphEnd"},{token:"literal",regex:/\+{3,}/,next:"smallPassthrough"},{token:"escape",regex:/\((?:C|TM|R)\)|\.{3}|->|<-|=>|<=|&#(?:\d+|x[a-fA-F\d]+);|(?: |^)--(?=\s+\S)/},{token:"escape",regex:/\\[_*'`+#]|\\{2}[_*'`+#]{2}/},{token:"keyword",regex:/\s\+$/},{token:"text",regex:e},{token:["keyword","string","keyword"],regex:/(<<[\w\d\-$]+,)(.*?)(>>|$)/},{token:"keyword",regex:/<<[\w\d\-$]+,?|>>/},{token:"constant.character",regex:/\({2,3}.*?\){2,3}/},{token:"keyword",regex:/\[\[.+?\]\]/},{token:"support",regex:/^\[{3}[\w\d =\-]+\]{3}/},{include:"quotes"},{token:"empty",regex:/^\s*$/,next:"start"}],listText:[{include:"listStart"},{include:"text"}],indentedBlock:[{token:"literal",regex:/^[\s\w].+$/,next:"indentedBlock"},{token:"literal",regex:"",next:"start"}],listingBlock:[{token:"literal",regex:/^\.{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"constant.numeric",regex:"<\\d+>"},{token:"literal",regex:"[^<]+"},{token:"literal",regex:"<"}],literalBlock:[{token:"literal",regex:/^-{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"constant.numeric",regex:"<\\d+>"},{token:"literal",regex:"[^<]+"},{token:"literal",regex:"<"}],passthroughBlock:[{token:"literal",regex:/^\+{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"literal",regex:e+"|\\d+"},{include:"macros"},{token:"literal",regex:"."}],smallPassthrough:[{token:"literal",regex:/[+]{3,}/,next:"dissallowDelimitedBlock"},{token:"literal",regex:/^\s*$/,next:"dissallowDelimitedBlock"},{token:"literal",regex:e+"|\\d+"},{include:"macros"}],commentBlock:[{token:"doc.comment",regex:/^\/{4,}\s*$/,next:"dissallowDelimitedBlock"},{token:"doc.comment",regex:"^.*$"}],tableBlock:[{token:"tableBlock",regex:/^\s*\|={3,}\s*$/,next:"dissallowDelimitedBlock"},{token:"tableBlock",regex:/^\s*!={3,}\s*$/,next:"innerTableBlock"},{token:"tableBlock",regex:/\|/},{include:"text",noEscape:!0}],innerTableBlock:[{token:"tableBlock",regex:/^\s*!={3,}\s*$/,next:"tableBlock"},{token:"tableBlock",regex:/^\s*|={3,}\s*$/,next:"dissallowDelimitedBlock"},{token:"tableBlock",regex:/!/}],macros:[{token:"macro",regex:/{[\w\-$]+}/},{token:["text","string","text","constant.character","text"],regex:/({)([\w\-$]+)(:)?(.+)?(})/},{token:["text","markup.list.macro","keyword","string"],regex:/(\w+)(footnote(?:ref)?::?)([^\s\[]+)?(\[.*?\])?/},{token:["markup.list.macro","keyword","string"],regex:/([a-zA-Z\-][\w\.\/\-]*::?)([^\s\[]+)(\[.*?\])?/},{token:["markup.list.macro","keyword"],regex:/([a-zA-Z\-][\w\.\/\-]+::?)(\[.*?\])/},{token:"keyword",regex:/^:.+?:(?= |$)/}],quotes:[{token:"string.italic",regex:/__[^_\s].*?__/},{token:"string.italic",regex:quoteRule("_")},{token:"keyword.bold",regex:/\*\*[^*\s].*?\*\*/},{token:"keyword.bold",regex:quoteRule("\\*")},{token:"literal",regex:quoteRule("\\+")},{token:"literal",regex:/\+\+[^+\s].*?\+\+/},{token:"literal",regex:/\$\$.+?\$\$/},{token:"literal",regex:quoteRule("`")},{token:"keyword",regex:quoteRule("^")},{token:"keyword",regex:quoteRule("~")},{token:"keyword",regex:/##?/},{token:"keyword",regex:/(?:\B|^)``|\b''/}]};var t={macro:"constant.character",tableBlock:"doc.comment",titleUnderline:"markup.heading",singleLineTitle:"markup.heading",pageBreak:"string",option:"string.regexp",otherBlock:"markup.list",literal:"support.function",optionalTitle:"constant.numeric",escape:"constant.language.escape",link:"markup.underline.list"};for(var o in this.$rules)for(var n=this.$rules[o],i=n.length;i--;){var l=n[i];if(l.include||"string"==typeof l){var r=[i,1].concat(this.$rules[l.include||l]);l.noEscape&&(r=r.filter((function(e){return!e.next}))),n.splice.apply(n,r)}else l.token in t&&(l.token=t[l.token])}};n.inherits(AsciidocHighlightRules,i),t.AsciidocHighlightRules=AsciidocHighlightRules})),ace.define("ace/mode/folding/asciidoc",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],(function(e,t,o){"use strict";var n=e("../../lib/oop"),i=e("./fold_mode").FoldMode,l=e("../../range").Range,r=t.FoldMode=function(){};n.inherits(r,i),function(){this.foldingStartMarker=/^(?:\|={10,}|[\.\/=\-~^+]{4,}\s*$|={1,5} )/,this.singleLineHeadingRe=/^={1,5}(?=\s+\S)/,this.getFoldWidget=function(e,t,o){var n=e.getLine(o);return this.foldingStartMarker.test(n)?"="==n[0]?this.singleLineHeadingRe.test(n)?"start":e.getLine(o-1).length!=e.getLine(o).length?"":"start":"dissallowDelimitedBlock"==e.bgTokenizer.getState(o)?"end":"start":""},this.getFoldWidgetRange=function(e,t,o){var n=e.getLine(o),i=n.length,r=e.getLength(),a=o,s=o;if(n.match(this.foldingStartMarker)){var g,c=["=","-","~","^","+"],k="markup.heading",d=this.singleLineHeadingRe;if(getTokenType(o)==k){for(var x=getLevel();++o<r;){if(getTokenType(o)==k)if(getLevel()<=x)break}if((s=g&&g.value.match(this.singleLineHeadingRe)?o-1:o-2)>a)for(;s>a&&(!getTokenType(s)||"["==g.value[0]);)s--;if(s>a){var u=e.getLine(s).length;return new l(a,i,s,u)}}else{if("dissallowDelimitedBlock"==e.bgTokenizer.getState(o)){for(;o-- >0&&-1!=e.bgTokenizer.getState(o).lastIndexOf("Block"););if((s=o+1)<a){u=e.getLine(o).length;return new l(s,5,a,i-5)}}else{for(;++o<r&&"dissallowDelimitedBlock"!=e.bgTokenizer.getState(o););if((s=o)>a){u=e.getLine(o).length;return new l(a,5,s,u-5)}}}}function getTokenType(t){return(g=e.getTokens(t)[0])&&g.type}function getLevel(){var t=g.value.match(d);if(t)return t[0].length;var n=c.indexOf(g.value[0])+1;return 1==n&&e.getLine(o-1).length!=e.getLine(o).length?1/0:n}}}.call(r.prototype)})),ace.define("ace/mode/asciidoc",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/asciidoc_highlight_rules","ace/mode/folding/asciidoc"],(function(e,t,o){"use strict";var n=e("../lib/oop"),i=e("./text").Mode,l=e("./asciidoc_highlight_rules").AsciidocHighlightRules,r=e("./folding/asciidoc").FoldMode,Mode=function(){this.HighlightRules=l,this.foldingRules=new r};n.inherits(Mode,i),function(){this.type="text",this.getNextLineIndent=function(e,t,o){if("listblock"==e){var n=/^((?:.+)?)([-+*][ ]+)/.exec(t);return n?new Array(n[1].length+1).join(" ")+n[2]:""}return this.$getIndent(t)},this.$id="ace/mode/asciidoc"}.call(Mode.prototype),t.Mode=Mode})),ace.require(["ace/mode/asciidoc"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));