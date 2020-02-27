
window.onload = function onLoad()
{
	var id = getID();
  document.getElementById('id').value=id;
	document.getElementById('ipSel').selectedIndex = 2;
	document.getElementById('opSel').selectedIndex = 1;
};

function pdfLoader() {
  
}
function backClick()
{
	var CFlow = document.getElementById('flow').value;
	var Dhead = document.getElementById('dynamicHead').value;;
	var id = document.getElementById('id').value;
	setFlow(CFlow);
	setHead(Dhead);
	setFUnits("m³/h");
	setHUnits("m");
	var url = "ProductPage.html";
	window.location = url;
}

function calculateFlow(bed,bath)
{
  var baths = [1,1.5,2,3,4,5,6];
  var beds = [2,3,4,5,6];
  var flowTable = [
                    [ 1.4 , 1.8 , 2.3 , 2.7 , 3.2 , 3.6 , 4.1],
                    [ 1.8 , 2.3 , 2.7 , 3.2 , 3.6 , 4.1 , 4.5],
                    [ 2.3 , 2.7 , 3.2 , 3.6 , 4.1 , 4.5 , 5.0],
                    [ null, 3.0 , 3.4 , 3.9 , 4.3 , 4.8 , 5.2],
                    [ null, 3.2 , 3.6 , 4.1 , 4.5 , 5.0 , 5.5]];
  var bedIndex = beds.findIndex(function(bd) {return bd == bed;});
  var bathIndex = baths.findIndex(function(bd) {return bd == bath;});
  var flow = flowTable[bedIndex][bathIndex];
  return flow;
}

function calculateFrictionLoss(floor,bath, tflow)
{
    var baths = [1,1.5,2,3,4,5,6];
    var pLengthTable =  [8 , 10 , 12 , 15 , 18 , 21 , 24];
    var bathIndex = baths.findIndex(function(bd) {return bd == bath;});
    var pLength = pLengthTable[bathIndex] + (5*(floor-1));
    var nFlow = tflow/3600;

    var nHazen = 100;
    var pDiam = 25/1000; //25mm to M
    var fHead = (10.67 * Math.pow(nFlow,1.852))/(Math.pow(nHazen,1.852) * Math.pow(pDiam, 4.8704));
    //var fHead = (0.002083 * Math.pow((100/nHazen),1.85) * Math.pow(((tflow/3.6)/0.0631),1.85))/(Math.pow((pDiam/25.4),4.8655));// - Other Eqaution?
		//nFL = (0.002083 * Math.pow((100/nHazen),1.85) * Math.pow((nFlow/0.0631),1.85))/(Math.pow((pDiam/25.4),4.8655));
    fricHead = fHead * pLength;
    return fricHead;

}

function calculations() {

	var nBed = document.getElementById('nBedrooms').value;
	var nBath = document.getElementById('nBathrooms').value;
	var nFloor = document.getElementById('nFloors').value;
	var iPressure = document.getElementById('inPressure').value;
	var dPressure = document.getElementById('outPressure').value;

  var cFlow = calculateFlow(nBed,nBath);
  document.getElementById('flow').value = cFlow;

	var sel = document.getElementById('ipSel');
	var cIP = iPressure * (sel.options[0].value / sel.options[sel.selectedIndex].value);

	sel = document.getElementById('opSel');
	var cDP = dPressure * (sel.options[0].value / sel.options[sel.selectedIndex].value);

	fricH = calculateFrictionLoss(nFloor, nBath, cFlow);

  var dynHead = (cDP - cIP) + fricH + (nFloor * 3.5);

	document.getElementById('frictionHead').value = fricH.toPrecision(4);
	document.getElementById('dynamicHead').value = dynHead.toPrecision(4);

}
