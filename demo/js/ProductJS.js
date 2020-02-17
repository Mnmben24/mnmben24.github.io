  var offline;

  window.addEventListener('offline', function(e) {
      // queue up events for server
      console.log("You are offline");
      offline = true;
  }, false);

  window.addEventListener('online', function(e) {
      // queue up events for server
      console.log("You are online");
      offline = false;
  }, false);

  document.addEventListener('keydown', function(event) {
  if (event.key == 'Enter') {
    openAOL();
  }
});

function runOnLoad()
{
  var urlParam = new URLSearchParams(window.location.search);
  var id = getID();
  var flow = getFlow();
  var head = getHead();
  if (flow == undefined) { flow = 0;};
  if (head == undefined) { head = 0;};
  try{
  document.getElementById('inputA').value = flow;
  document.getElementById('inputB').value = head;
}
catch (err){}

  setQR(false);
  readAllProducts();
  readInfo(id);
}

  function onFlowChange()
  {
    if(document.getElementById('pd').innerHTML == 1)
    {
      var flow = document.getElementById('inputB').value;
    }
    else {
      var flow = document.getElementById('inputA').value;
    }
    setFlow(flow);
  }

  function onHeadChange()
  {
    if(document.getElementById('pd').innerHTML == 1)
    {
      var head = document.getElementById('inputA').value;
    }
    else {
      var head = document.getElementById('inputB').value;
    }
    setHead(head);
  }

  function onFlowUChange()
  {

    if(document.getElementById('pd').innerHTML == 1)
    {
      var sel =  document.getElementById('selB');
    }
    else {
      var sel = document.getElementById('selA');
    }
    var units = sel.options[sel.selectedIndex].text;
    setFUnits(units);
  }
    function onHeadUChange()
    {
        if(document.getElementById('pd').innerHTML == 1)
        {
          var sel =  document.getElementById('selA');
        }
        else {
          var sel = document.getElementById('selB');
        }
        var units = sel.options[sel.selectedIndex].text;
        setHUnits(units);
    }


  function pageUpdate()
  {
    var list;
    for(var i = 1; i < 6; i++)
    {
      list = document.getElementById('spec' + i + "List");
      list.style.display = 'visible';
      while(list.firstChild)
      {
        list.removeChild(list.firstChild);
      }
      document.getElementById('nSpec' + i).innerHTML = '';
  }
    list = document.getElementById('pumpRange');
    productNo = list.options[list.selectedIndex].value;
    readInfo(productNo);
  }

  function fillRangeBox(titl,val)
  {
      var sel = document.getElementById("pumpRange");
      var option = document.createElement("option");
      option.text = titl;
      option.value = val;
      sel.add(option);
  }

  function createElems(varNo, str, strN)
  {
    var parName = "spec" + varNo + "List";
    var headName = "nSpec" + varNo;
    var divName = "spec" + varNo;
    if(!(str === "/."  || str === ""))
    {
      var splt = str.split("|");
      var i = 0;
      var max = splt.length;
      while(i < max)
      {
        var node = document.createElement("li");                 // Create a <li> node
        var txt = splt[i];
        txt.replace("m^3","m³")
        var textnode = document.createTextNode(txt);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById(parName).appendChild(node);     // Append <li> to <ul> with id="myList"
        i++;
      }
      document.getElementById(headName).innerHTML = strN;
    }
    else {
        document.getElementById(divName).style.display = "hidden";
    }
  }

  function changeDetails(cursor)
  {
      var jsonParse = JSON.parse(cursor);
      var ur = "./images/" + jsonParse.img;
      document.getElementById('imgDiv').src  =  ur;

      document.getElementById('id').innerHTML = jsonParse.ID;
      document.getElementById('pd').innerHTML = jsonParse.PD;
      var pd = document.getElementById('pd').innerHTML;
      comboboxs(pd);

      if (pd == 1)
      {
        var sA = document.getElementById("selA");
        var sB = document.getElementById("selB");
      }
      else {
        var sB = document.getElementById("selA");
        var sA = document.getElementById("selB");
      }
      var fUnits = getFUnits();
      var hUnits = getHUnits();

      createElems("1",jsonParse.var1,jsonParse.var1n);
      createElems("2",jsonParse.var2,jsonParse.var2n);
      createElems("3",jsonParse.var3,jsonParse.var3n);
      createElems("4",jsonParse.var4,jsonParse.var4n);
      createElems("5",jsonParse.var5,jsonParse.var5n);



      document.getElementById('head1').innerHTML = jsonParse.title;
      if(jsonParse.subtitle == "/." || jsonParse.subtitle == null)
      {
        document.getElementById('head2').innerHTML = " ";
      }
      else
      {
        document.getElementById('head2').innerHTML = jsonParse.subtitle;
      }
      if(jsonParse.caption == "/." || jsonParse.caption == null)
      {
        document.getElementById('caption').innerHTML = "";
      }
      else
      {
          document.getElementById('caption').innerHTML = jsonParse.caption;
      }
      var pmpSel = document.getElementById('pumpRange');
      var id = jsonParse.ID;
      setID(id);
      setCategory(jsonParse.Category);
      setSelectBox(pmpSel,id);
      setCookie("variation" , jsonParse.variation);
  }

  function comboboxs(pd)
  {
    if (pd == 1)
    {
      document.getElementById('selB').innerHTML = "<option>m³/h</option> <option>l/min</option>    <option>l/sec</option>    <option>US GPM</option>    <option>lmp GPM</option>    <option>l/h</option>    <option>cfm</option>";
      document.getElementById('selA').innerHTML = "<option>m</option>          <option>kPa</option>          <option>bar</option>          <option>ft</option>          <option>psi</option>          <option>inHg</option>          <option>Torr</option>";
      document.getElementById('labelB').innerHTML = "Flow Rate";
      document.getElementById('labelA').innerHTML = "Total Head";
      document.getElementById('pd').innerHTML = pd;
      setSelectBox(document.getElementById('selB'),getFUnits())
      setSelectBox(document.getElementById('selA'),getHUnits())
    }
    else {
        document.getElementById('selA').innerHTML = "<option>m³/h</option> <option>l/min</option>    <option>l/sec</option>    <option>US GPM</option>    <option>lmp GPM</option>    <option>l/h</option>    <option>cfm</option>";
        document.getElementById('selB').innerHTML = "<option>m</option>          <option>kPa</option>          <option>bar</option>          <option>ft</option>          <option>psi</option>          <option>inHg</option>          <option>Torr</option>";
        document.getElementById('labelA').innerHTML = "Flow Rate";
        document.getElementById('labelB').innerHTML = "Total Head";
        document.getElementById('pd').innerHTML = pd;
        setSelectBox(document.getElementById('selA'),getFUnits())
        setSelectBox(document.getElementById('selB'),getHUnits())
    }


  }

  function indexMatchingText(ele, text) {
    for (var i=0; i<ele.length;i++) {
        if (ele.options[i].text === text){
            return i;
        }
    }
    return 1;
}

  function headTool()
  {
    if(document.getElementById('pd').innerHTML == 1)
    {
      var flow = document.getElementById('inputB').value;
      var units = document.getElementById('selB').options[document.getElementById('selB').selectedIndex].text;
    }
    else {
      var flow = document.getElementById('inputA').value;
      var units = document.getElementById('selA').options[document.getElementById('selA').selectedIndex].text;
    }
    setFlow(flow);
    setFUnits(units);
    var url = "headTool.html";
    window.location = url;
  }

  function pressureBooster()
  {
    var url = "PressureBooster.html";
    window.location = url;
  }

  function setSelectBox(sBox, text)
  {
      var max = sBox.length;
      var index;
      var j;
      for (j = 0; j < max; j++)
        if (text == sBox.options[j].value) {
          index = j;
        }
      sBox.selectedIndex = index;
  }

  function openAOL()
  {

    if (offline)
    {
      alert("Cannot Connect to AOL Web. Check your Internet Settings");
    }
    else {
    id = document.getElementById('id').innerHTML;
    var fR = document.getElementById('inputA').value;
    var fRU = document.getElementById('selA').options[ document.getElementById('selA').selectedIndex].text;

    var tH = document.getElementById('inputB').value;;
    var tHU = document.getElementById('selB').options[ document.getElementById('selB').selectedIndex].text;

    var rn = document.getElementById('pumpRange').options[ document.getElementById('pumpRange').selectedIndex].text;

    var varB = getCookie("variation");
    varB = (varB === "" ? " " : varB);

    var nOut = rn.replace(" " + varB,"").replace(" ","_");

    //var fil = "pFilter2";
    var url;
    fRU = fRU.replace("m³/h","m3/hr");
    url = config.url + config.company + "&pQin=" + fR + "&cUQin=" + fRU + "&pHTot=" + tH + "&cUHin=" + tHU + "&" + config.filter + "=" + nOut + "&LoginType=MobileApp";
    setCookie("url",url);
    //window.open(url,"_blank");
    window.location = url;
    }
  }
