
           //prefixes of implementation that we want to test
           window.indexedDB = window.indexedDB || window.mozIndexedDB ||
           window.webkitIndexedDB || window.msIndexedDB;

           //prefixes of window.IDB objects
           window.IDBTransaction = window.IDBTransaction ||
           window.webkitIDBTransaction || window.msIDBTransaction;
           window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
           window.msIDBKeyRange

           var connected = false;
           var count = 0;
           var counter = 0;

           function getID()
           {
             return getCookie("id");
           }

           function setID(nID)
           {
             setCookie("id",nID);
           }

           function getCategory()
           {
             return getCookie("category");
           }

           function setCategory(nCat)
           {
             setCookie("category",nCat);
           }

           function getFlow()
           {
             return getCookie("flow");
           }

           function setFlow(nFL)
           {
             setCookie("flow",nFL);
           }

           function getHead()
           {
             return getCookie("head");
           }

           function setHead(nHD)
           {
             setCookie("head",nHD);
           }

           function getHUnits()
           {
             return getCookie("hUnits");
           }

           function setHUnits(nHU)
           {
             setCookie("hUnits",nHU);
           }

           function getFUnits()
           {
             return getCookie("fUnits");
           }

           function setFUnits(nFU)
           {
             setCookie("fUnits",nFU);
           }

          function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                  }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                  }
                }
            return "";
          }

      function setCookie(cname, cvalue) {
          var d = new Date();
          d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }


           if (!window.indexedDB) {
              window.alert("Your browser doesn't support a stable version of IndexedDB.")
           }

           var db;
           var request = window.indexedDB.open("PumpDatabase",versionNumber);


           request.onerror = function(event) {
              console.log("error: ");
           };

           request.onsuccess = function(event) {
              db = request.result;
              console.log("success: "+ db);
              if(window.location.href.includes("ProductPage.html"))
              {
                runOnLoad();
              }
              else if(window.location.href.includes("index.html"))
              {
                readAll();
              }

              else if(window.location.href.includes("indexHome.html") || window.location.href.includes("web_app_manifest"))
              {
                readAllCategories();
              }
           };

           request.onupgradeneeded = function(event) {
              db = event.target.result;
              try
              {
                db.deleteObjectStore("PumpDatabase");
                db.deleteObjectStore("PumpCategories");
              }
              catch(error)
              {}
              var objectStore = db.createObjectStore("PumpDatabase", {keyPath: "ID"});
              var transaction = event.target.transaction

              for (var i in PumpDatabase) {
                 objectStore.add(PumpDatabase[i]);
              }
              var objectStore = db.createObjectStore("PumpCategories", {keyPath: "ID"});
              var transaction = event.target.transaction

              for (var i in PumpCategories) {
                 objectStore.add(PumpCategories[i]);
              }
              connected =true;
           }

           function readInfo(indx) {
             var tx = db.transaction("PumpDatabase","readwrite")
             var objectStore = tx.objectStore("PumpDatabase");
             objectStore.openCursor(indx-1).onsuccess = function(event) {
                var cursor = event.target.result;

                if (cursor) {
                  changeDetails(cursor);
                }
             };
               objectStore.openCursor().onerror = function(event) {
                   alert("Error connecting to database")
               };
           }

           function getVar(indx) {
             var tx = db.transaction("PumpDatabase","readwrite")
             var objectStore = tx.objectStore("PumpDatabase");
             objectStore.openCursor(indx).onsuccess = function(event) {
                var cursor = event.target.result;

                if (cursor) {
                    if (cursor.value.variation == null || cursor.value.variation == "./" || cursor.value.variation == "null")
                    {
                      return false;
                    }
                }
                return true;
             };
               objectStore.openCursor().onerror = function(event) {
                   alert("Error connecting to database")
               };
           }



           function readAll() {
             var countReq;
              var objectStore = db.transaction("PumpDatabase").objectStore("PumpDatabase");
              countReq = objectStore.count();
              countReq.onsuccess = function () {count = countReq.result};
              objectStore.openCursor().onsuccess = function(event) {
                 var cursor = event.target.result;

                 if (cursor) {
                   if(cursor.value.Category = getCategory())  addTile("m" + cursor.value.ID,cursor.value.title,cursor.value.img);
                    cursor.continue();
                 }
              };
           }

           function readAllProducts() {
                 var objectStore = db.transaction("PumpDatabase").objectStore("PumpDatabase");
                 var tx = objectStore.openCursor()
                 tx.onsuccess = function(event) {
                    var cursor = event.target.result;

                    if (cursor) {
                      var text = cursor.value.range
                      if (cursor.value.variation != "/.") text += " " + cursor.value.variation;
                        fillRangeBox(text, cursor.value.id)
                       cursor.continue();
                    }
                 };
           }

           function readAllCategories() {
             var countReq;
              var objectStore = db.transaction("PumpCategories").objectStore("PumpCategories");
              countReq = objectStore.count();
              countReq.onsuccess = function () {count = countReq.result};
              objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

                    if (cursor) {
                        addTile("c" + cursor.value.ID, cursor.value.Name, cursor.value.img)
                       cursor.continue();
                    }
                 };
           }

  function onChoice(id)
  {
    if (id.startsWith("m"))
    {
      setID(id.substring(1));
      var url = "ProductPage.html";
      window.location = url;
    }
    else if (id.startsWith("c"))
    {
        setCategory(id.substring(1));
        var url = "index.html";
        window.location = url;
    }
  }
var row;
var col;

  function addTile(id,name,img) {
      var tile = document.createElement('div');
      tile.id = id;
      tile.className = "tile";
      tile.onclick = function(){onChoice(tile.id);};
      var pic = document.createElement('img')
      pic.style.width = "matchParent";
      pic.style.height = "matchParent";
      pic.src = "images/"+img;
      pic.alt = name;
      var txt = document.createElement('div');
      txt.className = "textWrapper";
      var h2 = document.createElement('h2');
      h2.innerHTML = name;
      var div2 = document.createElement('div');
      div2.className = "content";
      if (count <= 4) {
          row = document.createElement('tr');
          col = document.createElement('td');
          txt.style.top = "84%";
          tile.style.minHeight = "50vh";
      }
      else
      {
        if (counter%2 == 0)
        {
          row = document.createElement('tr');
          col = document.createElement('td');
        }
        else
        {
          col = document.createElement('td');
        }
        counter++;
        if (counter == count)
        {
          col.colspan = "2"
        }
      }
      txt.appendChild(h2);
      txt.appendChild(div2);
      tile.appendChild(txt);
      tile.appendChild(pic)
      h2.align = "center"
      col.appendChild(tile);
      row.appendChild(col);
      document.getElementById("grid").appendChild(row);
  }
