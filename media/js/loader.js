//Load JS and CSS asynchronously

//          CSS
//Loading css asynchronously
loadCss("https://fonts.googleapis.com/icon?family=Material+Icons");
loadCss("/media/css/nav.css");
loadCss("/media/css/main.css");
loadCss("/media/css/" + requestURI()  + ".css");
loadCss("https://fonts.googleapis.com/css?family=Open+Sans:300,400,500");

//          JS
//Loading JS asynchronously
$(document).ready(function(){
    //Native JS
    loadJs("/media/js/src/smoothScroll.js");
    loadJs("/media/js/src/nav.js");
    loadJs("/media/js/src/ajaxPageLoader.js");
    //loadJS("/media/js/src/main.js");
});

function loadJs(url){
    var jsScript = document.createElement("script");
    jsScript.type = "text/javascript";
    jsScript.src = url;
    document.getElementsByTagName("body")[0].appendChild(jsScript);
}

//$_SERVER['REQUEST_URI'] javascript alternative
function requestURI() {
    var uri = location.pathname.substr(1).split("/")[0].replace(".html", "");

    //Replaced by using replace .html at the end of split("/")
    // console.log(uri);

    // if(0 in uri && uri[0] != "") {
    //     var page = uri[0];
    // } else {
    //     var page = "index";
    // }
    //return page;

    //New version
    if(uri === "")
    {
        uri = "index";
    }

    return uri;
}

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
