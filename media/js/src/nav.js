$(document).ready(function () {
    console.log("Nav Loaded");
    
    //Register original nav height
    var $navHeight =  $("#side-nav").height();
    //Hide mobile nav
    $("#side-nav").height(0);

    //Navbar animation
    //Navbar now also closes when clicking any other item withing the nav bar
    $("body").on("click", "#close_mobile_nav, #side-nav *:not([href*='//'])", function (event){
        event.preventDefault();        
        $("#side-nav").animate({"height": 0}, "slow"); 
        //This moves the nav bar above the nav bar + landing page height
    });

    //Do redirect for desktop and open nav bar for mobile
    if (window.innerWidth < 800)
    {
        //Change attribute href and check for click event
        $("body").on("click", "#open_mobile_nav", function (event){
            event.preventDefault();                    
            $("#side-nav").animate({"height": $navHeight}, "slow");
        });
    }
    else
    {
        //Make logo element clickable as home button for desktop version
        $("#open_mobile_nav").attr("href", "/");
    }
});