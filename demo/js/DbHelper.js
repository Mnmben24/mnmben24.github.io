var firstTime = true;
window.onload = function doOnLoad() {
if (contains(window.location.href,"indexHome")) {
  readAllCategories();
}
else if (contains(window.location.href,"ProductPage")) {
  runOnLoad();
}
else {
  readAll();
}
}

function readInfo(indx) {
    var data = Interface.getInfo();
    changeDetails(data);
}

function readAll()  {
  var products = Interface.getProducts();
  var jsnP = JSON.parse(products);

  jsnP.forEach(function(element){
    var id = "m" + element.ID;
    var title = element.title;
    var img = element.img;
    firstTime = false;
    addTile(id,title,img);
  });

  if (firstTime)
  {
    addNoItemsFound();
  }
}

function readAllCategories()  {
  var categories = Interface.getCategories();
  var categories = JSON.stringify(PumpCategories);
  var jsnP = JSON.parse(categories);
  count = jsnP.length;

  jsnP.forEach(function(element){
    var id = "c" + element.ID;
    var title = element.Name;
    var img = element.img;
    addTile(id,title,img);
  });
}

function readAllProducts() {
  var ranges = Interface.getRanges();
  var jsnP = JSON.parse(ranges);

  jsnP.forEach(function(element) {
  var text = element.range;
  if (element.variation != "/.") text += " " + element.variation;
  fillRangeBox(text,element.ID);
  });

}

function contains(str, element) {
    for (i = 0; i < (str.length - element.length); i++) {
        if(str.substr(i,element.length) == element)
        {
            return true;
        }
    }
    return false;
}
