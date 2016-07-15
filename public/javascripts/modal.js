$(function() {

    var appendthis = ("<div class='modal-overlay js-modal-close'></div>");

    $('a[data-modal-id]').click(function(e) {
        e.preventDefault();
        $(window).resize();

        $("body").append(appendthis);
        $(".modal-overlay").fadeTo(500, 0.7);
        var modalBox = $(this).attr('data-modal-id');
        $('#' + modalBox).fadeIn($(this).data());
        var item = $(this).data('item');
        var item = $('#row_' + item._id).find('.controls').find(".itemCart").val();
        var Cart = new UpdateCart();
        Cart.cartHTML(JSON.parse(item));
    });


    $(".js-modal-close, .modal-overlay").click(function() {
        $(".modal-box, .modal-overlay").fadeOut(500, function() {
            $(".modal-overlay").remove();
        });
    });

    $(window).resize(function() {
        $(".modal-box").css({
            top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
            left: ($(window).width() - $(".modal-box").outerWidth()) / 2
        });
    });

    $(window).resize();
});