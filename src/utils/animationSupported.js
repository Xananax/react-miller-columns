var EVENT_NAME_MAP = {
	transitionend: {
		'transition': 'transitionend'
	,	'WebkitTransition': 'webkitTransitionEnd'
	,	'MozTransition': 'mozTransitionEnd'
	,	'OTransition': 'oTransitionEnd'
	,	'msTransition': 'MSTransitionEnd'
	}
,	animationend: {
		'animation': 'animationend'
	,	'WebkitAnimation': 'webkitAnimationEnd'
	,	'MozAnimation': 'mozAnimationEnd'
	,	'OAnimation': 'oAnimationEnd'
	,	'msAnimation': 'MSAnimationEnd'
	}
};
var endEvents = [];
var tested = false;

export default function animationSupported(){
	if(!tested){detectEvents();tested=true;}
	return endEvents.length !== 0;
}

function detectEvents(){
	if (typeof window === "undefined") {return;}

	var testEl = document.createElement('div');
	var style = testEl.style;

	// On some platforms, in particular some releases of Android 4.x, the
	// un-prefixed "animation" and "transition" properties are defined on the
	// style object but the events that fire will still be prefixed, so we need
	// to check if the un-prefixed events are useable, and if not remove them
	// from the map
	if(!('AnimationEvent' in window)){delete EVENT_NAME_MAP.animationend.animation;}
	if (!('TransitionEvent' in window)){delete EVENT_NAME_MAP.transitionend.transition;}

	for(var baseEventName in EVENT_NAME_MAP){
		if(Object.prototype.hasOwnProperty.call(EVENT_NAME_MAP,baseEventName)){
			var baseEvents = EVENT_NAME_MAP[baseEventName];
			for(var styleName in baseEvents){
				if(styleName in style){
					endEvents.push(baseEvents[styleName]);
					break;
				}
			}
		}
	}
};