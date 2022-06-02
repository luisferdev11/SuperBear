
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

