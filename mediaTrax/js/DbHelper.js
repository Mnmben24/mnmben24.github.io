var firstTime = true;

if (window.location.contains("indexHome")) {
  readAllCategories();
}
else if (window.location.contains("ProductPage")) {
  runOnLoad();
}
else {
  readAll();
}

function readInfo(indx) {
    var data = Interface.getInfo(indx);
    changeDetails(jsonStr);
}

function readAll()  {
  var cat = getCategory();
  var products = Interface.getProducts(cat);
  var jsnP = JSON.parse(products);

  jsnp.forEach(function(element){
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
  var jsnP = JSON.parse(categories);

  jsnp.forEach(function(element){
    var id = "c" + element.ID;
    var title = element.title;
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
