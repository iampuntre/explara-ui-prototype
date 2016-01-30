(function(window){function classReg(className){return new RegExp("(^|\\s+)"+className+"(\\s+|$)");}var hasClass,addClass,removeClass;if('classList'in document.documentElement){hasClass=function(elem,c){return elem.classList.contains(c);};addClass=function(elem,c){elem.classList.add(c);};removeClass=function(elem,c){elem.classList.remove(c);};}else{hasClass=function(elem,c){return classReg(c).test(elem.className);};addClass=function(elem,c){if(!hasClass(elem,c)){elem.className=elem.className+' '+c;}};removeClass=function(elem,c){elem.className=elem.className.replace(classReg(c),' ');};}function toggleClass(elem,c){var fn=hasClass(elem,c)?removeClass:addClass;fn(elem,c);}var classie={hasClass:hasClass,addClass:addClass,removeClass:removeClass,toggleClass:toggleClass,has:hasClass,add:addClass,remove:removeClass,toggle:toggleClass};if(typeof define==='function'&&define.amd){define('classie/classie',classie);}else if(typeof exports==='object'){module.exports=classie;}else{window.classie=classie;}})(window);(function(window){var Packery=window.Packery=function(){};function rectDefinition(){function Rect(props){for(var prop in Rect.defaults){this[prop]=Rect.defaults[prop];}for(prop in props){this[prop]=props[prop];}}Packery.Rect=Rect;Rect.defaults={x:0,y:0,width:0,height:0};Rect.prototype.contains=function(rect){var otherWidth=rect.width||0;var otherHeight=rect.height||0;return this.x<=rect.x&&this.y<=rect.y&&this.x+this.width>=rect.x+otherWidth&&this.y+this.height>=rect.y+otherHeight;};Rect.prototype.overlaps=function(rect){var thisRight=this.x+this.width;var thisBottom=this.y+this.height;var rectRight=rect.x+rect.width;var rectBottom=rect.y+rect.height;return this.x<rectRight&&thisRight>rect.x&&this.y<rectBottom&&thisBottom>rect.y;};Rect.prototype.getMaximalFreeRects=function(rect){if(!this.overlaps(rect)){return false;}var freeRects=[];var freeRect;var thisRight=this.x+this.width;var thisBottom=this.y+this.height;var rectRight=rect.x+rect.width;var rectBottom=rect.y+rect.height;if(this.y<rect.y){freeRect=new Rect({x:this.x,y:this.y,width:this.width,height:rect.y-this.y});freeRects.push(freeRect);}if(thisRight>rectRight){freeRect=new Rect({x:rectRight,y:this.y,width:thisRight-rectRight,height:this.height});freeRects.push(freeRect);}if(thisBottom>rectBottom){freeRect=new Rect({x:this.x,y:rectBottom,width:this.width,height:thisBottom-rectBottom});freeRects.push(freeRect);}if(this.x<rect.x){freeRect=new Rect({x:this.x,y:this.y,width:rect.x-this.x,height:this.height});freeRects.push(freeRect);}return freeRects;};Rect.prototype.canFit=function(rect){return this.width>=rect.width&&this.height>=rect.height;};return Rect;}if(typeof define==='function'&&define.amd){define('packery/js/rect',rectDefinition);}else if(typeof exports==='object'){module.exports=rectDefinition();}else{window.Packery=window.Packery||{};window.Packery.Rect=rectDefinition();}})(window);(function(window){function packerDefinition(Rect){function Packer(width,height,sortDirection){this.width=width||0;this.height=height||0;this.sortDirection=sortDirection||'downwardLeftToRight';this.reset();}Packer.prototype.reset=function(){this.spaces=[];this.newSpaces=[];var initialSpace=new Rect({x:0,y:0,width:this.width,height:this.height});this.spaces.push(initialSpace);this.sorter=sorters[this.sortDirection]||sorters.downwardLeftToRight;};Packer.prototype.pack=function(rect){for(var i=0,len=this.spaces.length;i<len;i++){var space=this.spaces[i];if(space.canFit(rect)){this.placeInSpace(rect,space);break;}}};Packer.prototype.placeInSpace=function(rect,space){rect.x=space.x;rect.y=space.y;this.placed(rect);};Packer.prototype.placed=function(rect){var revisedSpaces=[];for(var i=0,len=this.spaces.length;i<len;i++){var space=this.spaces[i];var newSpaces=space.getMaximalFreeRects(rect);if(newSpaces){revisedSpaces.push.apply(revisedSpaces,newSpaces);}else{revisedSpaces.push(space);}}this.spaces=revisedSpaces;this.mergeSortSpaces();};Packer.prototype.mergeSortSpaces=function(){Packer.mergeRects(this.spaces);this.spaces.sort(this.sorter);};Packer.prototype.addSpace=function(rect){this.spaces.push(rect);this.mergeSortSpaces();};Packer.mergeRects=function(rects){for(var i=0,len=rects.length;i<len;i++){var rect=rects[i];if(!rect){continue;}var compareRects=rects.slice(0);compareRects.splice(i,1);var removedCount=0;for(var j=0,jLen=compareRects.length;j<jLen;j++){var compareRect=compareRects[j];var indexAdjust=i>j?0:1;if(rect.contains(compareRect)){rects.splice(j+indexAdjust-removedCount,1);removedCount++;}}}return rects;};var sorters={downwardLeftToRight:function(a,b){return a.y-b.y||a.x-b.x;},rightwardTopToBottom:function(a,b){return a.x-b.x||a.y-b.y;}};return Packer;}if(typeof define==='function'&&define.amd){define('packery/js/packer',['./rect'],packerDefinition);}else if(typeof exports==='object'){module.exports=packerDefinition(require('./rect'));}else{var Packery=window.Packery=window.Packery||{};Packery.Packer=packerDefinition(Packery.Rect);}})(window);(function(window){function itemDefinition(getStyleProperty,Outlayer,Rect){var transformProperty=getStyleProperty('transform');var Item=function PackeryItem(){Outlayer.Item.apply(this,arguments);};Item.prototype=new Outlayer.Item();var protoCreate=Item.prototype._create;Item.prototype._create=function(){protoCreate.call(this);this.rect=new Rect();this.placeRect=new Rect();};Item.prototype.dragStart=function(){this.getPosition();this.removeTransitionStyles();if(this.isTransitioning&&transformProperty){this.element.style[transformProperty]='none';}this.getSize();this.isPlacing=true;this.needsPositioning=false;this.positionPlaceRect(this.position.x,this.position.y);this.isTransitioning=false;this.didDrag=false;};Item.prototype.dragMove=function(x,y){this.didDrag=true;var packerySize=this.layout.size;x-=packerySize.paddingLeft;y-=packerySize.paddingTop;this.positionPlaceRect(x,y);};Item.prototype.dragStop=function(){this.getPosition();var isDiffX=this.position.x!==this.placeRect.x;var isDiffY=this.position.y!==this.placeRect.y;this.needsPositioning=isDiffX||isDiffY;this.didDrag=false;};Item.prototype.positionPlaceRect=function(x,y,isMaxYOpen){this.placeRect.x=this.getPlaceRectCoord(x,true);this.placeRect.y=this.getPlaceRectCoord(y,false,isMaxYOpen);};Item.prototype.getPlaceRectCoord=function(coord,isX,isMaxOpen){var measure=isX?'Width':'Height';var size=this.size['outer'+measure];var segment=this.layout[isX?'columnWidth':'rowHeight'];var parentSize=this.layout.size['inner'+measure];if(!isX){parentSize=Math.max(parentSize,this.layout.maxY);if(!this.layout.rowHeight){parentSize-=this.layout.gutter;}}var max;if(segment){segment+=this.layout.gutter;parentSize+=isX?this.layout.gutter:0;coord=Math.round(coord/segment);var mathMethod;if(this.layout.options.isHorizontal){mathMethod=!isX?'floor':'ceil';}else{mathMethod=isX?'floor':'ceil';}var maxSegments=Math[mathMethod](parentSize/segment);maxSegments-=Math.ceil(size/segment);max=maxSegments;}else{max=parentSize-size;}coord=isMaxOpen?coord:Math.min(coord,max);coord*=segment||1;return Math.max(0,coord);};Item.prototype.copyPlaceRectPosition=function(){this.rect.x=this.placeRect.x;this.rect.y=this.placeRect.y;};Item.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element);this.layout.packer.addSpace(this.rect);this.emitEvent('remove',[this]);};return Item;}if(typeof define==='function'&&define.amd){define('packery/js/item',['get-style-property/get-style-property','outlayer/outlayer','./rect'],itemDefinition);}else if(typeof exports==='object'){module.exports=itemDefinition(require('desandro-get-style-property'),require('outlayer'),require('./rect'));}else{window.Packery.Item=itemDefinition(window.getStyleProperty,window.Outlayer,window.Packery.Rect);}})(window);(function(window){function packeryDefinition(classie,getSize,Outlayer,Rect,Packer,Item){Rect.prototype.canFit=function(rect){return this.width>=rect.width-1&&this.height>=rect.height-1;};var Packery=Outlayer.create('packery');Packery.Item=Item;Packery.prototype._create=function(){Outlayer.prototype._create.call(this);this.packer=new Packer();this.stamp(this.options.stamped);var _this=this;this.handleDraggabilly={dragStart:function(draggie){_this.itemDragStart(draggie.element);},dragMove:function(draggie){_this.itemDragMove(draggie.element,draggie.position.x,draggie.position.y);},dragEnd:function(draggie){_this.itemDragEnd(draggie.element);}};this.handleUIDraggable={start:function handleUIDraggableStart(event){_this.itemDragStart(event.currentTarget);},drag:function handleUIDraggableDrag(event,ui){_this.itemDragMove(event.currentTarget,ui.position.left,ui.position.top);},stop:function handleUIDraggableStop(event){_this.itemDragEnd(event.currentTarget);}};};Packery.prototype._resetLayout=function(){this.getSize();this._getMeasurements();var packer=this.packer;if(this.options.isHorizontal){packer.width=Number.POSITIVE_INFINITY;packer.height=this.size.innerHeight+this.gutter;packer.sortDirection='rightwardTopToBottom';}else{packer.width=this.size.innerWidth+this.gutter;packer.height=Number.POSITIVE_INFINITY;packer.sortDirection='downwardLeftToRight';}packer.reset();this.maxY=0;this.maxX=0;};Packery.prototype._getMeasurements=function(){this._getMeasurement('columnWidth','width');this._getMeasurement('rowHeight','height');this._getMeasurement('gutter','width');};Packery.prototype._getItemLayoutPosition=function(item){this._packItem(item);return item.rect;};Packery.prototype._packItem=function(item){this._setRectSize(item.element,item.rect);this.packer.pack(item.rect);this._setMaxXY(item.rect);};Packery.prototype._setMaxXY=function(rect){this.maxX=Math.max(rect.x+rect.width,this.maxX);this.maxY=Math.max(rect.y+rect.height,this.maxY);};Packery.prototype._setRectSize=function(elem,rect){var size=getSize(elem);var w=size.outerWidth;var h=size.outerHeight;if(w||h){w=this._applyGridGutter(w,this.columnWidth);h=this._applyGridGutter(h,this.rowHeight);}rect.width=Math.min(w,this.packer.width);rect.height=Math.min(h,this.packer.height);};Packery.prototype._applyGridGutter=function(measurement,gridSize){if(!gridSize){return measurement+this.gutter;}gridSize+=this.gutter;var remainder=measurement%gridSize;var mathMethod=remainder&&remainder<1?'round':'ceil';measurement=Math[mathMethod](measurement/gridSize)*gridSize;return measurement;};Packery.prototype._getContainerSize=function(){if(this.options.isHorizontal){return{width:this.maxX-this.gutter};}else{return{height:this.maxY-this.gutter};}};Packery.prototype._manageStamp=function(elem){var item=this.getItem(elem);var rect;if(item&&item.isPlacing){rect=item.placeRect;}else{var offset=this._getElementOffset(elem);rect=new Rect({x:this.options.isOriginLeft?offset.left:offset.right,y:this.options.isOriginTop?offset.top:offset.bottom});}this._setRectSize(elem,rect);this.packer.placed(rect);this._setMaxXY(rect);};function verticalSorter(a,b){return a.position.y-b.position.y||a.position.x-b.position.x;}function horizontalSorter(a,b){return a.position.x-b.position.x||a.position.y-b.position.y;}Packery.prototype.sortItemsByPosition=function(){var sorter=this.options.isHorizontal?horizontalSorter:verticalSorter;this.items.sort(sorter);};Packery.prototype.fit=function(elem,x,y){var item=this.getItem(elem);if(!item){return;}this._getMeasurements();this.stamp(item.element);item.getSize();item.isPlacing=true;x=x===undefined?item.rect.x:x;y=y===undefined?item.rect.y:y;item.positionPlaceRect(x,y,true);this._bindFitEvents(item);item.moveTo(item.placeRect.x,item.placeRect.y);this.layout();this.unstamp(item.element);this.sortItemsByPosition();item.isPlacing=false;item.copyPlaceRectPosition();};Packery.prototype._bindFitEvents=function(item){var _this=this;var ticks=0;function tick(){ticks++;if(ticks!==2){return;}_this.emitEvent('fitComplete',[_this,item]);}item.on('layout',function(){tick();return true;});this.on('layoutComplete',function(){tick();return true;});};Packery.prototype.resize=function(){var size=getSize(this.element);var hasSizes=this.size&&size;var innerSize=this.options.isHorizontal?'innerHeight':'innerWidth';if(hasSizes&&size[innerSize]===this.size[innerSize]){return;}this.layout();};Packery.prototype.itemDragStart=function(elem){this.stamp(elem);var item=this.getItem(elem);if(item){item.dragStart();}};Packery.prototype.itemDragMove=function(elem,x,y){var item=this.getItem(elem);if(item){item.dragMove(x,y);}var _this=this;function delayed(){_this.layout();delete _this.dragTimeout;}this.clearDragTimeout();this.dragTimeout=setTimeout(delayed,40);};Packery.prototype.clearDragTimeout=function(){if(this.dragTimeout){clearTimeout(this.dragTimeout);}};Packery.prototype.itemDragEnd=function(elem){var item=this.getItem(elem);var itemDidDrag;if(item){itemDidDrag=item.didDrag;item.dragStop();}if(!item||(!itemDidDrag&&!item.needsPositioning)){this.unstamp(elem);return;}classie.add(item.element,'is-positioning-post-drag');var onLayoutComplete=this._getDragEndLayoutComplete(elem,item);if(item.needsPositioning){item.on('layout',onLayoutComplete);item.moveTo(item.placeRect.x,item.placeRect.y);}else if(item){item.copyPlaceRectPosition();}this.clearDragTimeout();this.on('layoutComplete',onLayoutComplete);this.layout();};Packery.prototype._getDragEndLayoutComplete=function(elem,item){var itemNeedsPositioning=item&&item.needsPositioning;var completeCount=0;var asyncCount=itemNeedsPositioning?2:1;var _this=this;return function onLayoutComplete(){completeCount++;if(completeCount!==asyncCount){return true;}if(item){classie.remove(item.element,'is-positioning-post-drag');item.isPlacing=false;item.copyPlaceRectPosition();}_this.unstamp(elem);_this.sortItemsByPosition();if(itemNeedsPositioning){_this.emitEvent('dragItemPositioned',[_this,item]);}return true;};};Packery.prototype.bindDraggabillyEvents=function(draggie){draggie.on('dragStart',this.handleDraggabilly.dragStart);draggie.on('dragMove',this.handleDraggabilly.dragMove);draggie.on('dragEnd',this.handleDraggabilly.dragEnd);};Packery.prototype.bindUIDraggableEvents=function($elems){$elems.on('dragstart',this.handleUIDraggable.start).on('drag',this.handleUIDraggable.drag).on('dragstop',this.handleUIDraggable.stop);};Packery.Rect=Rect;Packery.Packer=Packer;return Packery;}if(typeof define==='function'&&define.amd){define('packery/js/packery',['classie/classie','get-size/get-size','outlayer/outlayer','./rect','./packer','./item'],packeryDefinition);}else if(typeof exports==='object'){module.exports=packeryDefinition(require('desandro-classie'),require('get-size'),require('outlayer'),require('./rect'),require('./packer'),require('./item'));}else{window.Packery=packeryDefinition(window.classie,window.getSize,window.Outlayer,window.Packery.Rect,window.Packery.Packer,window.Packery.Item);}})(window);(function(window){function extend(a,b){for(var prop in b){a[prop]=b[prop];}return a;}function packeryDefinition(LayoutMode,Packery,getSize){var PackeryMode=LayoutMode.create('packery');var _getElementOffset=PackeryMode.prototype._getElementOffset;var _getMeasurement=PackeryMode.prototype._getMeasurement;extend(PackeryMode.prototype,Packery.prototype);PackeryMode.prototype._getElementOffset=_getElementOffset;PackeryMode.prototype._getMeasurement=_getMeasurement;var _resetLayout=PackeryMode.prototype._resetLayout;PackeryMode.prototype._resetLayout=function(){this.packer=this.packer||new Packery.Packer();_resetLayout.apply(this,arguments);};var _getItemLayoutPosition=PackeryMode.prototype._getItemLayoutPosition;PackeryMode.prototype._getItemLayoutPosition=function(item){item.rect=item.rect||new Packery.Rect();return _getItemLayoutPosition.call(this,item);};var _manageStamp=PackeryMode.prototype._manageStamp;PackeryMode.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft;this.options.isOriginTop=this.isotope.options.isOriginTop;_manageStamp.apply(this,arguments);};PackeryMode.prototype.needsResizeLayout=function(){var size=getSize(this.element);var hasSizes=this.size&&size;var innerSize=this.options.isHorizontal?'innerHeight':'innerWidth';return hasSizes&&size[innerSize]!==this.size[innerSize];};return PackeryMode;}if(typeof define==='function'&&define.amd){define(['isotope/js/layout-mode','packery/js/packery','get-size/get-size'],packeryDefinition);}else if(typeof exports==='object'){module.exports=packeryDefinition(require('isotope-layout/js/layout-mode'),require('packery'),require('get-size'));}else{packeryDefinition(window.Isotope.LayoutMode,window.Packery,window.getSize);}})(window);