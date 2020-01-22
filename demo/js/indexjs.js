
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
              else
              {
                readAll();
              }
           };

           request.onupgradeneeded = function(event) {
              db = event.target.result;
              try
              {
                db.deleteObjectStore("pumps");
              }
              catch(error)
              {}
              var objectStore = db.createObjectStore("pumps", {keyPath: "ID"});
              var transaction = event.target.transaction

              for (var i in pumpIndexList) {
                 objectStore.add(pumpIndexList[i]);
              }
              connected =true;
           }

           function readInfo(indx) {
             var tx = db.transaction("pumps","readwrite")
             var objectStore = tx.objectStore("pumps");
             objectStore.openCursor(indx).onsuccess = function(event) {
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
             var tx = db.transaction("pumps","readwrite")
             var objectStore = tx.objectStore("pumps");
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
              var objectStore = db.transaction("pumps").objectStore("pumps");
              countReq = objectStore.count();
              countReq.onsuccess = function () {count = countReq.result};
              objectStore.openCursor().onsuccess = function(event) {
                 var cursor = event.target.result;

                 if (cursor) {
                       addTile("m" + cursor.key,cursor.value.title,cursor.value.img)
                    cursor.continue();
                 }
              };
           }

           function readAllProducts() {
                 var objectStore = db.transaction("pumps").objectStore("pumps");
                 objectStore.openCursor().onsuccess = function(event) {
                    var cursor = event.target.result;

                    if (cursor) {
                      var text = cursor.value.title
                      if (cursor.value.variation != "/.") text += " " + cursor.value.variation;
                        fillRangeBox(text, cursor.key)
                       cursor.continue();
                    }
                 };
           }

/*
           function add() {
              var request = db.transaction(["employee"], "readwrite")
              .objectStore("employee")
              .add({ id: "00-03", name: "Kenny", age: 19, email: "kenny@planet.org" });

              request.onsuccess = function(event) {
                 alert("Kenny has been added to your database.");
              };

              request.onerror = function(event) {
                 alert("Unable to add data\r\nKenny is aready exist in your database! ");
              }
           }

           function remove() {
              var request = db.transaction(["employee"], "readwrite")
              .objectStore("employee")
              .delete("00-03");

              request.onsuccess = function(event) {
                 alert("Kenny's entry has been removed from your database.");
              };
           }*/


  function onChoice(id)
  {
      var url = "ProductPage.html?id=" + id.substring(1);
      window.location = url;
  }


  function addTile(id,name,img) {
      var tile = document.createElement('div');
      tile.id = id;
      tile.className = "tile";
      tile.onclick = function(){onChoice(tile.id);};
      if (count <= 4) {
          tile.style.width = "95%";
          tile.style.padding = "0px 0px 0px 2vw";
      }
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
      txt.appendChild(h2);
      txt.appendChild(div2);
      tile.appendChild(txt);
      tile.appendChild(pic)
      h2.align = "center"
      document.getElementById("grid").appendChild(tile);
  }
