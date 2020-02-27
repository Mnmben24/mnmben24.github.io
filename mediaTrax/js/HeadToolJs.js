
window.onload = function onLoad()
{  var urlParam = new URLSearchParams(window.location.search);
	var id = getID();
	var flow = getFlow();
	var units = getFUnits();
	document.getElementById('flowRate').value = flow;
	document.getElementById('id').value = id;
	var flowU = document.getElementById('flowSel');
	var index = indexMatchingText(flowU, units);
	flowU.selectedIndex = index;
};

//Used to find index for Select Lists
function indexMatchingText(ele, text) {
	for (var i=0; i<ele.length;i++) {
			if (ele[i].text === text){
					return i;
			}
	}
	return undefined;
}

function backClick()
{
	var flow = document.getElementById('flowRate').value;
	var fUnits = document.getElementById('flowSel').options[document.getElementById('flowSel').selectedIndex].text;
	var head = document.getElementById('tHead').value;
	var hUnits = "m";
	setFlow(flow);
	setHead(head);
	setFUnits(fUnits);
	setHUnits(hUnits);
	var url = "ProductPage.html";
	window.location = url;
}

function calCulate() {

	var fl = document.getElementById('flowRate').value;
	var sH = document.getElementById('sHeight').value;
	var dH = document.getElementById('dHeight').value;
	var dp = document.getElementById('dPres').value;
	var pd = document.getElementById('pDiam').value;
	var ln = document.getElementById('len').value;

	var sel = document.getElementById('flowSel');
	var cFl = fl * (sel.options[1].value / sel.options[sel.selectedIndex].value );

	sel = document.getElementById('shSel');
	cSH = sH * (sel.options[0].value / sel.options[sel.selectedIndex].value);

	sel = document.getElementById('dhSel');
	cDH = dH * (sel.options[0].value / sel.options[sel.selectedIndex].value);

	sel = document.getElementById('dpSel');
	cDP = dp * (sel.options[0].value / sel.options[sel.selectedIndex].value);
	var pdm = pd / 1000;
	var Vel = (4/1000)*cFl/(3.141592 * Math.pow(pdm,2));
	var statH = (cDH - cSH);

	var nHazen = document.getElementById('pMat').options[document.getElementById('pMat').selectedIndex].value;
	var fricH = 0;
	fricH = getFricHead(cFl, nHazen, pd, Vel)*ln+cDP;
	var totH = statH+fricH;

	document.getElementById('vel').value = Vel.toPrecision(4);
	document.getElementById('sHead').value = statH.toPrecision(4);
	document.getElementById('fHead').value = fricH.toPrecision(4);
	document.getElementById('tHead').value = totH.toPrecision(4);

}

function getTotH(statH, fricH)
{
	return (statH + fricH);
}

function getFricHead(flow, nHazen, nD, nV)
{
	var visc = 1;
	var nFL = 0;
	var nRey = (nV * (nD/1000) * 1000000 / visc);

	if(nD <= 0)
	{
		alert("Please Enter a Positive, Non-Zero Diameter.")
		return 0;
	}
	else if(+nRey <= 2000)
	{
		var nF = 64/+nRey;
		nFL = (nF * Math.pow(nV,2))/ ((nD/1000) * 2 * 9.81);
	}
	else {
		if (nHazen > 1)
		{
				nFL = (0.002083 * Math.pow((100/nHazen),1.85) * Math.pow((flow/0.0631),1.85))/(Math.pow((nD/25.4),4.8655));
		}
		else
		{
			alert("Failure");
		}
	}


	return nFL;
}
