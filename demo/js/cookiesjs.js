
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

           function getQR()
           {
             return getCookie("qr");
           }

           function setQR(bQR)
           {
             setCookie("qr",bQR);
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
