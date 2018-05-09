(function exampleCode() {
	"use strict";




	

	brfv4Example.initCurrentExample = function(brfManager, resolution) {
		brfManager.init(resolution, resolution, brfv4Example.appId);
	};

	brfv4Example.updateCurrentExample = function(brfManager, imageData, draw) {

		brfManager.update(imageData);

		draw.clear();

		// Face detection results: a rough rectangle used to start the face tracking.

		draw.drawRects(brfManager.getAllDetectedFaces(),	false, 1.0, 0x00a1ff, 0.5);
		draw.drawRects(brfManager.getMergedDetectedFaces(),	false, 2.0, 0xffd200, 1.0);

		var faces = brfManager.getFaces(); // default: one face, only one element in that array.

		for(var i = 0; i < faces.length; i++) {

			var face = faces[i];

			if(face.state === brfv4.BRFState.FACE_TRACKING) {

				// simple blink detection

				// A simple approach with quite a lot false positives. Fast movement can't be
				// handled properly. This code is quite good when it comes to
				// staring contest apps though.

				// It basically compares the old positions of the eye points to the current ones.
				// If rapid movement of the current points was detected it's considered a blink.

				var v = face.vertices;

				if(_oldFaceShapeVertices.length === 0) storeFaceShapeVertices(v);

				var k, l, yLE, yRE;

				// Left eye movement (y)

				for(k = 36, l = 41, yLE = 0; k <= l; k++) {
					yLE += v[k * 2 + 1] - _oldFaceShapeVertices[k * 2 + 1];
				}
				yLE /= 6;

				// Right eye movement (y)

				for(k = 42, l = 47, yRE = 0; k <= l; k++) {
					yRE += v[k * 2 + 1] - _oldFaceShapeVertices[k * 2 + 1];
				}

				yRE /= 6;

				var yN = 0;

				// Compare to overall movement (nose y)

				yN += v[27 * 2 + 1] - _oldFaceShapeVertices[27 * 2 + 1];
				yN += v[28 * 2 + 1] - _oldFaceShapeVertices[28 * 2 + 1];
				yN += v[29 * 2 + 1] - _oldFaceShapeVertices[29 * 2 + 1];
				yN += v[30 * 2 + 1] - _oldFaceShapeVertices[30 * 2 + 1];
				yN /= 4;

				var blinkRatio = Math.abs((yLE + yRE) / yN);

				if((blinkRatio > 12 && (yLE > 0.4 || yRE > 0.4))) {
					console.log("blink " + blinkRatio.toFixed(2) + " " + yLE.toFixed(2) + " " +
						yRE.toFixed(2) + " " + yN.toFixed(2));

					blink();
				}

				// Let the color of the shape show whether you blinked.

				var color = 0x00a0ff;

				if(_blinked) {
					color = 0xffd200;
				}

				// Face Tracking results: 68 facial feature points.

				draw.drawTriangles(	face.vertices, face.triangles, false, 1.0, color, 0.4);
				draw.drawVertices(	face.vertices, 2.0, false, color, 0.4);

				brfv4Example.dom.updateHeadline("BRFv4 - advanced - face tracking - simple blink" +
					"detection.\nDetects an eye  blink: " + (_blinked ? timeR() : "No"));

				storeFaceShapeVertices(v);
			}
		}
	};

	function blink() {
		_blinked = true;

		if(_timeOut > -1) { clearTimeout(_timeOut); }

		_timeOut = setTimeout(resetBlink, 150);
	}

	function resetBlink() {
		_blinked = false;
	}

	function storeFaceShapeVertices(vertices) {
		for(var i = 0, l = vertices.length; i < l; i++) {
			_oldFaceShapeVertices[i] = vertices[i];
		}
	}

	var _oldFaceShapeVertices = [];
	var _blinked		= false;
	var _timeOut		= -1;

	brfv4Example.dom.updateHeadline("BRFv4 - advanced - face tracking - simple blink detection.\n" +
		"Detects a blink of the eyes: ");

	brfv4Example.dom.updateCodeSnippet(exampleCode + "");
	var tabTime = [];

	var h1 = document.getElementsByTagName('h1')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
	score = document.getElementById('score'),
    milliseconde=0,seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    milliseconde++;
	if(milliseconde>=1000){
		milliseconde = 0;
		if (seconds >= 60) {
			seconds = 0;
			minutes++;
			if (minutes >= 60) {
				minutes = 0;
				hours++;
			}
		}
	}
    
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds)+ ":" + (milliseconde > 999 ? milliseconde : "0" + milliseconde);

    timer();
}
function timer() {
    t = setTimeout(add, 1);
}



/* Start button */
start.onclick = timer;

/* Stop button */
stop.onclick = function() {
    clearTimeout(t);
	timeR();
}

/* Clear button */
clear.onclick = function() {
    h1.textContent = "00:00:00";
    milliseconde = 0; seconds = 0; minutes = 0; hours = 0;
}

function timeR(){
	clearTimeout(t);
	if(tabTime.length<5){
  	tabTime.push(h1.textContent);
    
    }
    tabTime.sort();
var tab = tabTime.join('-');
score.textContent= tab;
}
	
})();