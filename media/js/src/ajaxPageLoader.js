console.log("Ajax Page Loader Loaded.");

//Better page loading
//Select internal links
$('body').on('click', "a:not([href*='//'])", function (event)
{
    console.log("Page loader triggerd");
    //Check for empty URLs (nav trigger buttons etc.)
    if(this.href !== "" && this.href.indexOf("mailto:") === -1 && this.href.indexOf("#") === -1)
    {
        //Prevent default page load
        event.preventDefault();
        //Load in new link
        loadNewPage(this.href);
    }
});

//Load pages better
//URL is page url, back = did the user want to go back a page (important for javascript or client link rewrites)
function loadNewPage(url, back) {
    //Remove old CSS File
    $("link[href*="+ requestURI() + "]").remove();

    //Check for index link and replace with
    if (url === "index")
    {
        url = "/";
    }
 
    //Check if user is going back, in which case don't rewrite the URL since this is already done by the client
    if(!back)
    {
        //Change URL to new url
        history.pushState("","",url);
    }

    //Load in page contents and add fade
    $("main").animate({
        'opacity' : 0,
        'padding-top' : 5
    }, 200, function () {
        $(this).load(url+" main > *",
            function (response)
            {
                $(this).animate({
                    'opacity' : 1,
                    'padding-top' : 0
                }, 500);
                //Check if loaded element is empty e.g. login page or failed load
                if (response === undefined)
                {
                    //Reload page to serve proper content
                    window.location.reload(false);
                }
            }
        );
    });

    //Load new css file
    loadCss("/media/css/" + requestURI() + ".css");
}

//User goes back a page
window.onpopstate = function() {
    //RequestURI is new page URI, also user goes back via history so back = true
    loadNewPage(requestURI(), true);
};