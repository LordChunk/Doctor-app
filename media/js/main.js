console.log("Main.js loaded.");

//Better page loading
//Select internal links
$('body').on('click', "a:not([href*='//'])", function (event)
{
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
        )
    });

    //Load new css file
    loadCss("/media/css/" + requestURI() + ".css");
}

//User goes back a page
window.onpopstate = function() {
    //RequestURI is new page URI, also user goes back via history so back = true
    loadNewPage(requestURI(), true);
};


/* Jquery stuff */
$(document).ready(function () {
    //Set the side nav right above the screen on load
    //Somehow this doesn't always work, not quite sure why
    $("#side-nav").css("top", $('#landing').height() - $('#side-nav').height()); //This loads the nav underneath the landing page right above the nav bar

    //Navbar animation
    //Navbar now also closes when clicking any other item withing the nav bar
    $('body').on('click', '#close_mobile_nav, #side-nav *', function (){
        $('#side-nav').animate({"top": - $('#side-nav').height()}, "slow"); //This moves the nav bar above the nav bar + landing page height
    });

    //Do redirect for desktop and open nav bar for mobile
    if (window.innerWidth < 800)
    {
        //Change attribute href and check for click event
        $('body').on('click', '#open_mobile_nav', function (){
            $('#side-nav').animate({"top": 0}, "slow");
        });
    }
    else
    {
        //Make logo element clickable as home button for desktop version
        $("#open_mobile_nav").attr("href", "/");
    }


    //Source: https://css-tricks.com/snippets/jquery/smooth-scrolling/
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                    });
                }
            }
        });
});