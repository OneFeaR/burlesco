// run_at: document_idle
var code = null;
if (/([^\/].)?oglobo\.globo\.com/.test(document.location.host))
  code = 'paywallAtivo = false;';

else if (/www\.economist\.com/.test(document.location.host))
  code = 'document.cookie = "ec_limit=allow";';

else if (/foreignpolicy\.com/.test(document.location.host)) {
  code = '\
    document.getElementById("paywall_bg").remove();\
    document.body.classList.remove("overlay-no-scroll");\
    document.body.style.overflow = "visible";\
    document.documentElement.classList.remove("overlay-no-scroll");\
  ';
}

else if (/folha.uol.com.br/.test(document.location.host)) {
  code = 'omtrClickUOL = function(){};function showText() {\
            $("#bt-read-more-content").next().show();\
            $("#bt-read-more-content").next().show().prev().remove();\
          } \
          setTimeout(showText, 100);';
}

else if (/ft.com/.test(document.location.host)) {
  code = 'document.cookie = "";\
          localStorage.clear();\
          sessionStorage.clear();\
          indexedDB.deleteDatabase("next-flags");\
          indexedDB.deleteDatabase("next:ads");';
}

else if (/gauchazh.clicrbs.com.br/.test(document.location.host)) {
  code = 'document.cookie = "";\
          localStorage.clear();\
          sessionStorage.clear();';
}

else if (/www.nexojornal.com.br/.test(document.location.host)) {
  code = "paywallContainer = document.getElementsByClassName('new-paywall-container')[0];\
          paywallContent = paywallContainer.getAttribute('data-paywall-content');\
          nexoApiURL = paywallContainer.getAttribute('data-paywall-check');\
          xmlhttp = new XMLHttpRequest();\
          xmlhttp.onreadystatechange = function() {\
          if (this.readyState == 4 && (this.status == 200 || this.status == 201 || this.status == 401)) {\
          access_token = JSON.parse(this.responseText)['access_token'];\
          paywallContainer.className = 'wf-placeholder';\
          paywallContainer.setAttribute('data-loadURL', paywallContent.replace('{access_token}', access_token));\
          paywallContainer.setAttribute('data-skip-profiles', '');\
          WFLazyLoader.loadFragment()}};\
          xmlhttp.open('GET', nexoApiURL, true);\
          xmlhttp.send();";
}

if (code !== null) {
  var script = document.createElement('script');
  script.textContent = code;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}
