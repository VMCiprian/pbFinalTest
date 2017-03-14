
$(document).ready(function(){

    // show and hide div on click
    $("#buyerToogle").click(function(){

        if($(this).hasClass("hide")){
            $('.hidden-content').slideUp();
            $('.show-when-collpased').show("fast");
            $(this).html("SHOW");
        }else{
            $('.hidden-content').slideDown();
            $('.show-when-collpased').hide("fast");
            $(this).html("HIDE");
        }
        $(this).toggleClass("hide");
    });

    // validate form
    $("#offerForm").on("click", "#formSubmit", function(e) {
        e.preventDefault();

        // get the value
        var type    = 'offer'
        var price   = $('#newOffer').val();
        var isNum   = false;

        // stripping forced commas
        var priceNoCommas = price.replace(/,/g , "");

        // validate the price
        if($.isNumeric(priceNoCommas)){
            isNum = true
        }

        if(isNum){

            $('#loader').show();
            $('#overlay').show();

            // this timeout is set just to mimic the ajax behaviour
            setTimeout(function () {

                customConsole('Price (no formatting)£' + priceNoCommas);
                customConsole('Price (from input)£' + price);
                customConsole('Price (function formatted) £'+ numberWithCommas(price));

                $('#newOffer').val("");
                $('#msgErrorConf').show()
                $('#newOffer').css('border','1px solid green');
                $('#msgErrorConf').removeClass("red").addClass("green").html("Success! Offer submitted.");
                $('#msgErrorConf').delay(5000).fadeOut("slow");

                $('#loader').fadeOut("slow");
                $('#overlay').fadeOut("slow");

            }, 2000);

        }else{
            $('#msgErrorConf').show();
            $('#newOffer').css('border','1px solid red');
            $('#msgErrorConf').removeClass("green").addClass("red").html("Please add a numeric value!");
            $('#msgErrorConf').delay(5000).fadeOut("slow");
        }


    });

    // force input to display correct formating
    $('input.newOffer').keyup(function(event) {
        // skip for arrow keys
        if(event.which >= 37 && event.which <= 40) return;
        // format number
        $(this).val(function(index, value) {
            return value
                .replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        });
    });


});

// outputs styled console mesages
function customConsole(v,size,colour) {

    var getv    = v;
    var size    = size;
    var colour  = colour;

    if (typeof getv == 'undefined') {
        getv = 'variable not set';
    }

    if (typeof size == 'undefined') {
        size = 20;
    }

    if (typeof colour == 'undefined') {
        colour = 'black';
    }

    var css = "font-size: " + size + "px; color:" + colour;
    console.log("%c Debug: %s", css, getv);
    // usage customConsole('test','20','green');
}

// just to reformat the values
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

