'use strict';

var w = viewportSize.getWidth();
var h = viewportSize.getHeight();
w = Number(w);
h = Number(h);

var updateNavBar = function() {
    if (w > 899) {
        $('.nav-container #logo-container').removeClass('col-xs-2').addClass('col-xs-3');
        $('.nav-container #logo-container img').attr("src", navUrl+"/img/logo.png");
        $('.nav-container .heading').removeClass('col-xs-10').addClass('col-xs-5');
        $('.nav-container .heading span:nth-child(2)').empty().html('three');
    } else if (w < 900) {
        $('.nav-container #logo-container').removeClass('col-xs-3').addClass('col-xs-2');
        $('.nav-container #logo-container img').attr("src", navUrl+"/img/small-logo.png");
        $('.nav-container .heading').removeClass('col-xs-5').addClass('col-xs-10');
    }
}

/*update navbar for different nav ports*/
$(document).ready(function() {
    updateNavBar();
});
$(window).resize(function() {
    updateNavBar();
});
/*end*/

/*switchable tabs in payment section*/
$('#form4 #tabs .tab').click(function() {
    if ($(this).hasClass('unactive')) {
        $(this).siblings().removeClass('active').addClass('unactive');
        $(this).addClass('active').removeClass('unactive');
    } else {
        return;
    }
});
/*end*/

// $('#form1 .title-bar').click(function() {
//  $(this).siblings('.content-box').velocity('slideUp', {duration: 500});
//  $(this).velocity({
//      width: '95%'
//  },{
//      duration: 200,
//      delay: 500
//  });
//  $(this).children('#edit').velocity('fadeIn',{delay: 700, duration: 400});
// });

var timeExpireCheck = 0;

/*proceed on click function*/
/*$('.form .proceed').click(function() {
    
    var proceedId = $(this).attr('id');
    var thisProceed = $('#' + proceedId);
    var contentboxId = thisProceed.parents('.content-box').attr('id');
    var thisContentBox = $('#' + contentboxId);
    var titlebarId = thisContentBox.siblings('.title-bar').attr('id');
    var thisTitleBar = $('#' + titlebarId);
    var formId = thisProceed.parents('.form').attr('id');
    var thisForm = $('#' + formId);
    var nextForm = thisForm.next();

    thisContentBox.velocity('slideUp', {
        duration: 500,
        easing: "swing"
    });
    thisTitleBar.velocity({
        width: '95%'
    }, {
        duration: 200,
        delay: 500,
        easing: "swing"
    });
    thisForm.removeClass('active-form').addClass('unactive-form');
    nextForm.children('.content-box').velocity('slideDown', {
        duration: 500,
        easing: "swing",
        complete: function() {
            if (w < 768) {
                if (proceedId == 'proceed1') {
                    nextForm.velocity('scroll', {
                        duration: 200,
                        offset: 60
                    });
                } else if (proceedId == 'proceed2') {
                    nextForm.velocity('scroll', {
                        duration: 200,
                        offset: 120
                    });
                } else if (proceedId == 'proceed3') {
                    nextForm.velocity('scroll', {
                        duration: 200,
                        offset: 180
                    });
                }
            } else {
                if (proceedId == 'proceed1') {
                    nextForm.velocity('scroll', {
                        duration: 200,
                        offset: -24
                    });
                } else if (proceedId == 'proceed2') {
                    nextForm.velocity('scroll', {
                        duration: 200,
                        offset: 36
                    });
                } else if (proceedId == 'proceed3') {
                    nextForm.velocity('scroll', {
                        duration: 200,
                        offset: 96
                    });
                }
            }
        }
    });
    nextForm.children('.title-bar').velocity({
        width: '100%'
    }, {
        duration: 100,
        easing: "swing",
        complete: function() {
            nextForm.addClass('active-form').removeClass('unactive-form').addClass('opened-once');
        }
    });



    if (proceedId == 'proceed2' && timeExpireCheck == 0) {
        timeExpireCheck += 1;
        $('#dropdown #time-expire').velocity('fadeIn', {
            duration: 250
        });
    }

});*/
/*end*/

/*edit on click function*/
$('.form .title-bar .edit').click(function() {

    var editId = $(this).attr('id');
    var thisEdit = $('#' + editId);
    var formId = thisEdit.parents('.form').attr('id');
    var thisForm = $('#' + formId);
    var titlebarId = thisEdit.parents('.title-bar').attr('id');
    var thisTitleBar = $('#' + titlebarId);
    var contentboxId = thisTitleBar.siblings('.content-box').attr('id');
    var thisContentBox = $('#' + contentboxId);


    if (thisForm.hasClass('unactive-form')) {

        thisTitleBar.velocity({
            width: '100%'
        }, {
            duration: 100,
            easing: "swing"
        });
        thisContentBox.velocity('slideDown', {
            duration: 500,
            easing: "swing",
            complete: function() {
                if (w < 768) {
                    if (editId == 'edit1') {
                        $('#form1').velocity("scroll", {
                            duration: 200
                        });
                    } else if (editId == 'edit2') {
                        $('#form2').velocity("scroll", {
                            duration: 200,
                            offset: 60
                        });
                    } else if (editId == 'edit3') {
                        $('#form3').velocity("scroll", {
                            duration: 200,
                            offset: 120
                        });
                    } else if (editId == 'edit4') {
                        $('#form3').velocity("scroll", {
                            duration: 200,
                            offset: 180
                        });
                    }
                } else {
                    if (editId == 'edit1') {
                        $('#form1').velocity("scroll", {
                            duration: 200,
                            offset: -80
                        });
                    } else if (editId == 'edit2') {
                        $('#form2').velocity("scroll", {
                            duration: 200,
                            offset: -20
                        });
                    } else if (editId == 'edit3') {
                        $('#form3').velocity("scroll", {
                            duration: 200,
                            offset: 40
                        });
                    } else if (editId == 'edit4') {
                        $('#form4').velocity("scroll", {
                            duration: 200,
                            offset: 100
                        });
                    }
                }
            }

        });
        thisForm.addClass('active-form').removeClass('unactive-form').addClass('opened-once');
        thisForm.siblings('.active-form').children('.title-bar').velocity({
            width: '95%'
        }, {
            duration: 100,
            easing: "swing"
        });

        thisForm.siblings('.active-form').children('.content-box').velocity('slideUp', {
            duration: 500,
            easing: "swing",
            complete: function() {
                thisForm.siblings('.active-form').removeClass('active-form').addClass('unactive-form');
                thisForm.addClass('active-form').removeClass('unactive-form');
            }
        });

    }

});
/*end*/

/*navbar dropdown function*/
$('#price-dropdown .price-section').click(function() {

    var element = $(this).parent();
    var drop = element.find('#dropdown');

    if (element.hasClass('closed')) {
        drop.velocity('slideDown', {
            duration: 400,
            complete: function() {
                element.removeClass('closed').addClass('open')
            }
        });
        element.children('.price-section').find('#arrow').velocity({
            rotateX: "180deg"
        }, {
            duration: 400
        });
    } else if (element.hasClass('open')) {
        drop.velocity('slideUp', {
            duration: 200,
            complete: function() {
                element.removeClass('open').addClass('closed')
            }
        });
        element.children('.price-section').find('#arrow').velocity({
            rotateX: "360deg"
        }, {
            duration: 200
        });
    }
});
/*end*/

/*swap elements*/
var swapElements = function(siblings, subjectIndex, objectIndex) {
    // Get subject jQuery
    var subject = $(siblings.get(subjectIndex));
    // Get object element
    var object = siblings.get(objectIndex);
    // Insert subject after object
    subject.insertAfter(object);
}

$(document).ready(function() {
    if (w > 767) {
        swapElements($('#fb-section .fb-section-item'), 1, 2);
        swapElements($('#fb-section .fb-section-item'), 0, 1);
    }
});
/*end*/

/*sticky navbar function*/
function moveScroller() {
    var move = function() {
        var st = $(window).scrollTop();
        var ot = $("#scroller-anchor").offset().top;
        var s = $(".event");
        if (st > ot) {
            s.css({
                position: "fixed",
                top: "0px",
                boxShadow: '0 0 4px #333'
            });
            s.find('#dropdown').css({
                boxShadow: '0 1px 4px -1px #333'
            });
            $('.section_2').css({
                paddingTop: '60px'
            });
        } else if (st <= ot) {
            s.css({
                position: "relative",
                top: "",
                boxShadow: 'none'
            });
            s.find('#dropdown').css({
                boxShadow: 'none'
            });
            $('.section_2').css({
                paddingTop: '0px'
            });

        }
    };
    $(window).scroll(move);
    move();
}
$(document).ready(function() {
    if (w > 767) {
        moveScroller();
    }
});
/*end*/

$('#pre-text').click(function() {
    $(this).velocity('fadeOut', {
        duration: 50,
        complete: function() {
            $('#coupon-wrapper').velocity('fadeIn', {
                duration: 500
            });
        }
    });

});
/*
$('#coupon-wrapper label').click(function() {
    $('#coupon-wrapper').velocity('fadeOut', {
        duration: 50,
        complete: function() {
            $('#post-text').velocity('fadeIn', {
                duration: 500
            });
        }
    });

});
*/
$('#post-text .icon-coupon-edit').click(function() {
    $('#post-text').velocity('fadeOut', {
        duration: 50,
        complete: function() {
            $('#coupon-wrapper').velocity('fadeIn', {
                duration: 500
            });
        }
    });

});
