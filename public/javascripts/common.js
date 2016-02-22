/*
@Description: Updates cart html
*/
var UpdateCart = function(item) {
    var modalBody = $('.modal-body');
    this.promos = ['DS1', 'JF5', 'JF10', 'PROMO20'];

/*
@Description: Discounts
*/
    this.discount = function() {
        var products = $("input#products").val();
        items = JSON.parse(products),
            total = items.length || 0,
            discount = $('span#discount'),
            subtotal = $("#subTotal"),
            estimatedTotal = $('#estimatedTotal'),
            subTotalValue = subtotal.data('subtotal'),
            subTotalValue = parseFloat(subTotalValue),
            discountPercentage = this.discountPercentage(total),
            discountValue = (subTotalValue * discountPercentage) / 100,
            finalDescount = parseFloat(discountValue).toFixed(2),
            currency = $('#currency').text();
        var estimatedTotalValue = subTotalValue - finalDescount;
        var dis = '- ' + currency + ' ' + finalDescount;
        estimatedTotalValue = parseFloat(estimatedTotalValue).toFixed(2);
        discount.text(dis);
        estimatedTotal.text('$ ' + estimatedTotalValue);
    };

/*
@Description: Returns discount percentage by total cart items
*/
    this.discountPercentage = function(totalItems) {
        var disc = 5;
        if (totalItems >= 3 && totalItems < 6) {
            disc = 10;
        } else if (totalItems >= 6) {
            disc = 25;
        }
        return disc;
    };

/*
@Description: Color variations of the item in cart
*/
    this.selectColors = function(thisObj) {
        $('.productColors span').removeClass('selectColor');
        var style = $(thisObj).data('colors');

        $(thisObj).addClass('selectColor');
        $('#colorHidden').val(style);
    };

/*
@Description: Add item details to modal
*/
    this.cartHTML = function(item) {
        var colors = item.p_available_options.colors;
        var sizes = item.p_available_options.sizes;
        var colorsHtml = "",
            sizesHtml = "<select class='availableSizes'><option value='0'> SIZE </option>",
            qtyHtml = "<select class='availableQty' onchange='Cart.updateQty(this)'><option value='0'> Qty </option>";
        colors.forEach(function(value, key) {
            var newClass = '';
            console.log(item.p_selected_color.name + " == " + value.name)
            if (item.p_selected_color.name == value.name) {
                newClass = "selectColor";
                colorsHtml += "<input type='hidden' id='colorHidden' value='" + value.name + '|' + value.hexcode + "' />";
            }
            colorsHtml += "<span class='colors " + newClass + " ' style='background: " + value.hexcode + "' data-colors='" + value.name + '|' + value.hexcode + "' onclick='Cart.selectColors(this);'></span>"
        });
        sizes.forEach(function(value, key) {
            var selected = '';
            if (value.code == item.p_selected_size.code) {
                selected = 'selected = "selected"';
            }
            sizesHtml += "<option value='" + value.code + "' " + selected + "> " + value.name.toUpperCase() + " </option>";
        });
        sizesHtml += "</select>";
        var i = 1;
        while (i <= 10) {
            var select = '';
            if (item.p_quantity == i) {
                select = 'selected="selected"';
            }
            qtyHtml += "<option value='" + i + "' " + select + "> " + i + " </option>"
            i++;
        }
        qtyHtml += "</select>";

        var raw = "<div class='cartTable'> <div class='cartContent floatLeft'> \
             <div class='itemDetails center'> <div class='productName'> " + item.p_name.toUpperCase() + "</div> \
              <div class='productPrice'> $ <span data-originalPrice='" + parseFloat(item.p_originalprice).toFixed(2) + "' data-price=' " + parseFloat(item.p_price).toFixed(2) + "'>" + parseFloat(item.p_price).toFixed(2) + "<span> </div> \
              <div class='productColors'>  " + colorsHtml + " </div> \
              <div class='productSizes'>  " + sizesHtml + qtyHtml + " </div> \
              <input type='hidden' id='itemCart' value='" + JSON.stringify(item) + "' /> \
              <div class='productBtn'> <button class='blueBtn floatLeft' onclick='Cart.saveCartDetails(this);'> ADD TO BAG </button></div> \
              <div> <a href='javascript:void(0)'>See product details. </div> \
              </div></div> <div class='cartItemImg floatRight'> <img src=" + item.p_image + " </div> </div>";
        $('.modal-body').html(raw);
        $(window).resize();
    };

/*
@Description: Apply promo codes
*/
    this.promoCodes = function() {
        var promoCode = $('#promotionCode'),
            promoValue = promoCode.val();
        if (promoValue.length) {
            if ($.inArray(promoValue, this.promos) != -1) {
                var discount = promoValue.match(/\d+/);
                var subtotal = $("#subTotal"),
                    subTotalValue = subtotal.data('subtotal'),
                    subTotalValue = parseFloat(subTotalValue),
                    discountPercentage = discount[0],
                    discountValue = (subTotalValue * discountPercentage) / 100;

                var codeDiscount = discountValue;
                $('#codeDiscount').text(codeDiscount);
                $('.promotionCodeBlock').fadeIn(500);
                var codeDiscount = $('#codeDiscount'),
                    codeDiscount = codeDiscount.text(),
                    discount = $('#discount').text().replace('-  $', '').trim();
                estimatedTotal = $('#subTotal').data('subtotal');

                estimatedTotal = parseFloat(estimatedTotal) - parseFloat(codeDiscount) - parseFloat(discount);
                $('#estimatedTotal').text('$ ' + estimatedTotal.toFixed(2))
            } else {
                alert('Invalid code: ' + promoValue);
                $('.promotionCodeBlock').fadeOut(500);
            }
        } else {
            $('promotionCode').val('');
            $('.promotionCodeBlock').fadeOut(500);
        }
    };

/*
@Description: Updates item qty
*/
    this.updateQty = function(thisObj) {
        var _this = $(thisObj),
            qty = _this.val(),
            priceBlock = $('.productPrice span');
        price = priceBlock.data('originalprice'),
            price = parseFloat(price);

        if (qty != 0) {
            var price = price * qty,
                price = parseFloat(price).toFixed(2);

            priceBlock.text(price);
        }
    };

/*
@Description: Add to bag
*/
    this.saveCartDetails = function(thisObj) {
        var item = JSON.parse($('#itemCart').val());
        item.p_price = $('.productPrice')
            .find('span')
            .data('price');
        var qty = $('.availableQty').val();
        var colors = $('#colorHidden').val().split('|');
        item.p_price = item.p_originalprice * qty;
        item.p_quantity = parseInt(qty);
        var sizeTxt = '';
        switch ($('.availableSizes').val()) {
            case 'm':
                sizeTxt = 'medium';
                break;
            case 's':
                sizeTxt = 'small';
                break;
            case 'l':
                sizeTxt = 'large';
                break;
            case 'xl':
                sizeTxt = 'extra large';
                break;
            default:
                sizeTxt = 'small';
                break;
        }
        item.p_selected_size.name = sizeTxt;
        item.p_selected_size.code = $('.availableSizes').val();
        item.p_selected_color.name = colors[0];
        item.p_selected_color.code = colors[1];

        $.ajax({
            url: "/",
            method: 'put',
            data: JSON.stringify(item),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function() {
                $('.productBtn button').text('Updating..');
                $('.productBtn button').attr('disabled', 'disabled');
            },
            success: function(response) {
                $('.js-modal-close').trigger('click');
            },
            complete: function(response) {
                if (response.status) {
                    $('#row_' + item._id).find('.qty').find('input').val(item.p_quantity);
                    $('#row_' + item._id).find('.price').find('.calcPrice').text(parseFloat(item.p_price).toFixed(2));

                    var res = JSON.parse(response.responseText);
                    $('#row_' + item._id).find('.controls').find(".itemCart").val(JSON.stringify(res.product));
                    $('#row_' + item._id).find('.controls').find(".js-open-modal").attr("data-item", '').attr("data-item", JSON.stringify(res.product))
                    $('#row_' + item._id).find("span.colorName").text(item.p_selected_color.name);
                    var price = Cart.calculatePrice();
                }
            }
        });
    };

/*
@Description: If the user clicks on sav later
*/
    this.saveForLater = function(thisObj, id) {
        var item = JSON.parse($(thisObj).prev('input').val());
        var inputValue = $('#row_' + id).find('.qty').find('input').val();
        if (inputValue >= 1) {
            item.p_quantity = inputValue;

            $.ajax({
                url: "/",
                method: 'put',
                data: JSON.stringify(item),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function() {
                    $('.productBtn button').text('Updating..');
                    $('.productBtn button').attr('disabled', 'disabled');
                },
                success: function(response) {
                    $('.js-modal-close').trigger('click');
                },
                complete: function(response) {
                    window.location.reload();
                }
            });
        }
    };

/*
@Description: Removes the item from the cart
*/
    this.remove = function(id) {
        if (confirm('Are you sure to delete this?')) {
            $.ajax({
                url: "/",
                method: 'delete',
                data: {
                    _id: id
                },
                dataType: "json",
                success: function(response) {},
                complete: function(response) {
                    $('#row_' + id).remove();
                }
            });
        }
    };

/*
@Description: Update qty in cart of an item
*/
    this.updateQtyHome = function(thisObj) {
        var _this = $(thisObj),
            qty = _this.val() || 1,
            priceBlock = _this.parent('div').next('div').find('span#originalPrice'),
            price = priceBlock.data('price');

        //qty
        var price = price * qty,
            price = parseFloat(price).toFixed(2);
        priceBlock.text('').text(price)
        this.calculatePrice();

        priceBlock.text(parseFloat(price).toFixed(2));
    };

/*
@Description: Calculate prices
*/
    this.calculatePrice = function() {
        var price = 0;
        $('.calcPrice').each(function() {
            var _this = $(this);
            price += parseFloat(_this.text());
        });
        var discounts = 0;
        $('.discountPrices').each(function() {
            var _this = $(this);
            var localDisc = _this.text();
            var localDisc = localDisc.replace(/^\D+/g, '');

            if ($.isNumeric(localDisc)) {
                discounts += parseFloat(localDisc);
            }
        });
        var price = parseFloat(price).toFixed(2);
        $("#subTotal").data('subtotal', price);
        $("#subTotal").text('$ ' + parseFloat(price).toFixed(2));
        var finalPrice = price - discounts;
        $("#estimatedTotal").text('$ ' + parseFloat(finalPrice).toFixed(2));
    };


/*
@Description: Manage discount block
*/
    this.applyCoupon = function(thisObj) {
        var _this = $(thisObj);
        if ($.trim(_this.val()) == '') {
            $('#codeDiscount').text(0);
            $('.promotionCodeBlock').fadeOut(500);
        }
    }
};

var Cart = new UpdateCart();
Cart.discount();