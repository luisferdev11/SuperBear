
(function ($) {
    "use strict";

    /**
     * ----------------------------------------
     * indicator__bg_active tab
     * ----------------------------------------
     */

    $(document).on('click', '.item__tab .nav-link', function () {
        handleTabChange($(this));
    });

    handleTabChange($('.item__tab .active'));

    function handleTabChange(tab) {
        var nav = tab.closest('.item__tab');
        $('.indicator__bg_active', nav).css({
            width: tab.outerWidth(),
            left: tab.position().left
        });
        tab.siblings().removeClass('active');
        tab.addClass('active');
    };


}(jQuery));


(function ($) {
    "use strict";

    /**
     * ----------------------------------------
     * indicator__bg_active tab (three-item)
     * ----------------------------------------
     */

    $(document).on('click', '.three-item .nav-link', function () {
        handleTabChange($(this));
    });

    handleTabChange($('.three-item .active'));

    function handleTabChange(tab) {
        var nav = tab.closest('.three-item');
        $('.indicator__bg_active', nav).css({
            width: tab.outerWidth(),
            left: tab.position().left
        });
        tab.siblings().removeClass('active');
        tab.addClass('active');
    };


}(jQuery));


(function ($) {
    "use strict";

    /**
     * ----------------------------------------
     * indicator__bg_active tab (four-item)
     * ----------------------------------------
     */

    $(document).on('click', '.four-item .nav-link', function () {
        handleTabChange($(this));
    });

    handleTabChange($('.four-item .active'));

    function handleTabChange(tab) {
        var nav = tab.closest('.four-item');
        $('.indicator__bg_active', nav).css({
            width: tab.outerWidth(),
            left: tab.position().left
        });
        tab.siblings().removeClass('active');
        tab.addClass('active');
    };


}(jQuery));