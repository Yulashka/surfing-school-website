$(function () {
    // add nav active class on click
    $('#navigation li a').click(function (event) {
        $('#navigation li a').removeClass('active hvr-underline-from-center');
        $($(this)).addClass('active hvr-underline-from-center');
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

     smoothScroll.init();
    // add nav active class on scroll
    var sections = $('section'),
        nav = $('nav'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }

        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    $('.carousel').carousel({
        interval: 8000
    })

    $('#navigation li a').on('click', function () {
        if (window.innerWidth < 768) {
            $(".navbar-toggle").click()
        }
    });

    var offset = 220;
    var duration = 500;
    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
    });

    $('.back-to-top').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    })

    //callback handler for form submit
    $("#contact-form").submit(function(e)
    {
        $("#contactProgress").modal("show")
        var data = { "Email": $('#email').val(), "Name": $('#name').val(), "Message": $('#msg').val() };
        $.ajax(
        {
            url: "http://rationalgifts.cloudapp.net/api/v1/contact/flaco",
            type: "POST",
            data : JSON.stringify(data),
            contentType : 'application/json'
        }).done(function( msg ) {
            $("#contactProgress").modal("hide")
            $("#contactSuccess").modal("show")
            $('#contact-form')[0].reset();
        }).fail(function( jqXHR, textStatus ) {
            $("#contactProgress").modal("hide")
            $("#contactFail").modal("show")
            $('#contact-form')[0].reset();
            console.log(jqXHR.status) 
        });
        e.preventDefault(); //STOP default action
        return true;
    });

});