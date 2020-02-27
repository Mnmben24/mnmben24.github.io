
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
           var firstTime = true;


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
             objectStore.openCursor(indx).onsuccess = function(event) {
                var cursor = event.target.result;
                var jsonStr = "";
                var jsn = {};


                if (cursor) {

                    jsn['Category'] = cursor.value.Category;
                    jsn['ID'] = cursor.value.ID;
                    jsn['PD'] = cursor.value.PD;
                    jsn['caption'] = cursor.value.caption;
                    jsn['img'] = cursor.value.img;
                    jsn['range'] = cursor.value.range;
                    jsn['subtitle'] = cursor.value.subtitle;
                    jsn['title'] = cursor.value.title;
                    jsn['variation'] = cursor.value.variation;
                    jsn['var1'] = cursor.value.var1;  jsn['var1n'] = cursor.value.var1n;
                    jsn['var2'] = cursor.value.var2;  jsn['var2n'] = cursor.value.var2n;
                    jsn['var3'] = cursor.value.var3;  jsn['var3n'] = cursor.value.var3n;
                    jsn['var4'] = cursor.value.var4;  jsn['var4n'] = cursor.value.var4n;
                    jsn['var5'] = cursor.value.var5;  jsn['var5n'] = cursor.value.var5n;
                    var jsonStr = JSON.stringify(jsn);
                    changeDetails(jsonStr);
                }
             };
               objectStore.openCursor().onerror = function(event) {
                   alert("Error connecting to database")
               };
           }

           function getVar() {
            var variation = getCookie("variation");
                    if (variation == null || variation == "./" || variation == "null")
                    {
                      return false;
                    }
                return true;
           }

           function readAll() {
             var countReq;
              var objectStore = db.transaction("PumpDatabase").objectStore("PumpDatabase");
              countReq = objectStore.count();
              countReq.onsuccess = function () {count = countReq.result};
              objectStore.openCursor().onsuccess = function(event) {
                 var cursor = event.target.result;

                 if (cursor) {
                   if(cursor.value.Category == getCategory())
                   { firstTime = false;
                     addTile("m" + cursor.key, cursor.value.title, cursor.value.img);
                   }
                    cursor.continue();
                 }
                 else
                 {
                    if (firstTime) {
                      addNoItemsFound();
                    }
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
                        fillRangeBox(text, cursor.key)
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
                        addTile("c" + cursor.key, cursor.value.Name, cursor.value.img)
                       cursor.continue();
                    }
                 };
           }
