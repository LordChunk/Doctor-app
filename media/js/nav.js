$(document).ready(function () {
    //Set the side nav right above the screen on load
    //Somehow this doesn't always work, not quite sure why
    var $navHeight =  $('#side-nav').height();
    //$("#side-nav").css("top", $('header').height() - $('#desktop_nav').height()).css("height", 0).css( "overflow", "hidden"); //This loads the nav underneath the landing page right above the nav bar

    //Navbar animation
    //Navbar now also closes when clicking any other item withing the nav bar
    $('body').on('click', '#close_mobile_nav, #side-nav *', function (event){
        event.preventDefault();        
        $('#side-nav').animate({"height": 0}, "slow"); 
        //This moves the nav bar above the nav bar + landing page height
    });

    //Do redirect for desktop and open nav bar for mobile
    if (window.innerWidth < 800)
    {
        //Change attribute href and check for click event
        $('body').on('click', '#open_mobile_nav', function (){
            $('#side-nav').animate({"height": $navHeight}, "slow");
        });
    }
    else
    {
        //Make logo element clickable as home button for desktop version
        $("#open_mobile_nav").attr("href", "/");
    }
});