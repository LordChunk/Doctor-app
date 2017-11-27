//$_SERVER['REQUEST_URI'] javascript alternative
function requestURI() {
    var uri = location.pathname.substr(1).split('/');
    if(0 in uri && uri[0] != "") {
        var page = uri[0];
    } else {
        var page = "index";
    }
    return page;
}

//Loading css asynchronously
loadCss("https://fonts.googleapis.com/icon?family=Material+Icons");
loadCss("/media/css/main.css");
loadCss("/media/css/" + requestURI()  + ".css");
loadCss("https://fonts.googleapis.com/css?family=Open+Sans:300,400,500");

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}