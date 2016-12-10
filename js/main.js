$(document).ready(function () {

    $('.opener').hover(function () {
        $('.left-sidebar').addClass("hover");
    }, function () {
        $('.left-sidebar').removeClass("hover");
    });

    var visibleFooter = false;
    $('.info').click(function () {
        if (visibleFooter) {
            $('.footer').removeClass("hover");
            visibleFooter = false;
            return
        }
        visibleFooter = true;
        $('.footer').addClass("hover");

    });

    $(".content").mCustomScrollbar({
        axis:"x" // horizontal scrollbar
    });
    $(".info").click(function () {
        $(this).toggleClass("active_st");
    });

    $('a[name=modal]').click(function (e) {
        e.preventDefault();
        var id = $(this).attr('href');
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
        $('#mask').css({'width': maskWidth, 'height': maskHeight});
        var winH = $(window).height();
        var winW = $(window).width();
        $(id).css('top', winH / 2 - $(id).height() / 2);
        $(id).css('left', winW / 2 - $(id).width() / 2);
        $(id).add('#mask').fadeIn(1000);
    });
    $('.window .close').click(function (e) {
        e.preventDefault();
        $('#mask, .window').hide();
    });
    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $('input#submit').click(function () {
        var name = $('input[name="name"]'),
            tel = $('input[name="tel"]'),
            email = $('input[name="email"]'),
            info = $('textarea[name="info"]');

        function validate(input) {
            if (input.val().length > 0) {
                input.removeClass('error');
                return true
            }
            input.addClass('error');
        }

        if (!isEmail(email.val())) {
            email.addClass('error');
        }
        if (validate(name) && validate(tel) && isEmail(email.val())) {
            $.post('/core/add_to_base.php', {
                name: name.val(),
                tel: tel.val(),
                email: email.val(),
                info: info.val()
            }).done(function (data) {
                swal({
                    title: "Good job!",
                    text: "",
                    type: "success",
                    timer: 1567,
                    showConfirmButton: false
                });
            });
            $('#mask, .window').hide();
            $('form input').val('');
            return
        }
        sweetAlert("Oops...", "Something went wrong!", "error");
    });
    $(function () {
        $('ul.tabs li:first').addClass('active');

        $('.wrap_main_content article').hide();
        $('.wrap_main_content article:first').show();

        $('ul.tabs li').on('click', function (e) {
            var activeTab = $(this).find('a').attr('href'); // KOstyl
            if (activeTab.length > 2){
                $('ul.tabs li').removeClass('active');
                $(this).addClass('active');

                $('.wrap_main_content article').hide();
                $('article' + activeTab).show();
            }
            e.preventDefault();
            return false;
        });
    });
});
$(window).load(function(){
    $(".content").mCustomScrollbar();
});