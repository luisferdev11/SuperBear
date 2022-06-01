
(function ($) {
  "use strict";

  /**
  * ----------------------------------------
  * item-active
  * ----------------------------------------
  */

  $('.item-active').on('click', function () {
    $(this).toggleClass('-active');
  });

  /**
  * ----------------------------------------
  * Select Colors (Swiper)
  * ----------------------------------------
  */

  $('.itemSelect .swiper-slide').on('click', function () {
    $(this).parent().find('.swiper-slide.selected').removeClass('selected');
    $(this).addClass('selected');
  });


  /**
  * ----------------------------------------
  * Select Size
  * ----------------------------------------
  */

  $('.emPatternSizes .item').on('click', function () {
    $(this).parent().find('.item.selected').removeClass('selected');
    $(this).addClass('selected');
  });


  /**
  * ----------------------------------------
  * Choose single item
  * ----------------------------------------
  */

  $('.itemSingle .item').on('click', function () {
    $(this).parent().find('.item.selected').removeClass('selected');
    $(this).addClass('selected');
  });


  /**
  * ----------------------------------------
  * Button Add to Cart (Change text!)
  * ----------------------------------------
  */

  $("#addCart").on('click', function () {
    $(this).toggleClass('active');
    $(".textCart").fadeOut(function () {
      $(".textCart").text(($(".textCart").text() == 'Add to Cart') ? 'Added!' : 'Add to Cart').fadeIn();
    });
  });

  /**
  * ----------------------------------------
  * Button Save (Change text!)
  * ----------------------------------------
  */

  $("#itemSave").on('click', function () {
    $(this).toggleClass('active');
    $(".textCart").fadeOut(function () {
      $(".textCart").text(($(".textCart").text() == 'Save') ? 'Saved!' : 'Save').fadeIn();
    });
  });


  /**
  * ----------------------------------------
  * btn_meunSearch
  * ----------------------------------------
  */

  $(".btn_meunSearch").on('click', function () {
    var a = $(".searchMenu__hdr").hasClass("-show");
    if (a) {
      $(".searchMenu__hdr").removeClass("-show");
    }
    else {
      $(".searchMenu__hdr").addClass("-show");
      $(".searchMenu__hdr .form-control").focus();
      setTimeout(function () { $('.searchMenu__hdr .form-control').focus() }
        , 100
      );
    }
  });


  /**
  * ----------------------------------------
  * em-owlCentred
  * ----------------------------------------
  */

  $('.em-owlCentred').owlCarousel({
    stagePadding: 30,
    items: 1,
    loop: true,
    margin: 10,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  });

  /**
  * ----------------------------------------
  * em-owlRight
  * ----------------------------------------
  */

  $('.em-owlRight').owlCarousel({
    stagePadding: 20,
    loop: true,
    margin: 15,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 4
      },
      1000: {
        items: 6
      }
    }
  });

  /**
  * ----------------------------------------
  * tooltip
  * ----------------------------------------
  */

  $('[data-toggle="tooltip"]').tooltip();

  /**
  * ----------------------------------------
  * popover
  * ----------------------------------------
  */

  $(function () {
    $('[data-toggle="popover"]').popover()
  });


  /**
  * ----------------------------------------
  * how and Hide Password
  * ----------------------------------------
  */

  $("#show_hide_password button").on('click', function (event) {
    event.preventDefault();
    if ($('#show_hide_password input').attr("type") == "text") {
      $('#show_hide_password input').attr('type', 'password');
      $('#show_hide_password .hide_show i').addClass("tio-hidden_outlined");
      $('#show_hide_password .hide_show i').removeClass("tio-visible_outlined");
    } else if ($('#show_hide_password input').attr("type") == "password") {
      $('#show_hide_password input').attr('type', 'text');
      $('#show_hide_password .hide_show i').removeClass("tio-hidden_outlined");
      $('#show_hide_password .hide_show i').addClass("tio-visible_outlined");
    }
  });


  /**
  * ----------------------------------------
  * em-swiperSliderFull
  * ----------------------------------------
  */

  var swiper = new Swiper('.em-swiperSliderFull', {
    loop: true,
    speed: 600,
    parallax: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  });


  /**
  * ----------------------------------------
  * swiper-PatternColors
  * ----------------------------------------
  */

  var galleryThumbs = new Swiper('.swiper-PatternColors', {
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var galleryTop = new Swiper('.em-swiperProduct', {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    thumbs: {
      swiper: galleryThumbs
    }
  });

  /**
  * ----------------------------------------
  * owlCursol_Colors
  * ----------------------------------------
  */

  $('.owlCursol_Colors').owlCarousel({
    margin: 15,
    // loop: true,
    autoWidth: true,
    items: 6
  })

  /**
  * ----------------------------------------
  * makes the current link containing a of class "active"
  * ----------------------------------------
  */

  $(document).ready(function ($) {
    var url = window.location.href;
    var activePage = url;
    $('.-active-links a').each(function () {
      var linkPage = this.href;

      if (activePage == linkPage) {
        $(this).closest("a").addClass("active");
      }
    });
  });

  /**
  * ----------------------------------------
  * Page Loader
  * ----------------------------------------
  */

  $(window).on("load", function () {
    $("#loaderPage").fadeOut("slow");
  });


  /**
  * ----------------------------------------
  * swiper-intro (intro.html)
  * ----------------------------------------
  */

  var swiper = new Swiper('.swiper-intro', {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  /**
    * ----------------------------------------
    * swiper-intro
    * ----------------------------------------
  */

  var swiper = new Swiper('.swiper-intro-default', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },

    autoplay: {
      delay: 2700,
      disableOnInteraction: false,
    },
  });

  /**
  * ----------------------------------------
  * swiperWelcome
  * ----------------------------------------
  */

  var swiper = new Swiper('.swiperWelcome', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  /**
  * ----------------------------------------
  * maxlength
  * ----------------------------------------
  */
  shortAndSweet('.number__letters');


  /**
   * ----------------------------------------
   * Upload photo
   * ----------------------------------------
   */

  function url(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $(".img__avatar").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#file").change(function () {
    url(this);
  });

  /**
  * ----------------------------------------
  * Manual Counter
  * ----------------------------------------
  */
  var numberSpinner = (function () {
    $('.itemCountr_manual .btn_counter').click(function () {
      var btn = $(this),
        oldValue = btn.closest('.itemCountr_manual').find('input').val().trim(),
        newVal = 0;

      if (btn.attr('data-dir') === 'up') {
        newVal = parseInt(oldValue) + 1;
      } else {
        if (oldValue > 1) {
          newVal = parseInt(oldValue) - 1;
        } else {
          newVal = 1;
        }
      }
      btn.closest('.itemCountr_manual').find('input').val(newVal);
    });
    $('.itemCountr_manual .input_no').keypress(function (evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    });
  })();


  /**
  * ----------------------------------------
  * owlCards
  * ----------------------------------------
  */

  $('.owlCards').owlCarousel({
    margin: 15,
    loop: true,
    autoWidth: true,
    items: 3
  });

  /**
  * ----------------------------------------
  * owlServiceProvider
  * ----------------------------------------
  */

  $('.owlServiceProvider').owlCarousel({
    stagePadding: 50,
    loop: true,
    margin: 15,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  });

  /**
* ----------------------------------------
* owlServiceProvider
* ----------------------------------------
*/

  $('.owlServiceProvider-two').owlCarousel({
    stagePadding: 40,
    loop: true,
    margin: 15,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  });

  /**
  * ----------------------------------------
  * owl-package
  * ----------------------------------------
  */

  $('.owl-package').owlCarousel({
    stagePadding: 60,
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  });

  /**
  * ----------------------------------------
  * circleFull jQuery Knob
  * ----------------------------------------
  */

  $(".circleFull").knob();

  /**
  * ----------------------------------------
  * Select Colors (Swiper)
  * ----------------------------------------
  */

  $('.itemSelect .owl-item').on('click', function () {
    $(this).parent().find('.owl-item.selected').removeClass('selected');
    $(this).addClass('selected');
  });

  /**
  * ----------------------------------------
  * owlCategories_learning
  * ----------------------------------------
  */

  $('.owlCategories_learning').owlCarousel({
    stagePadding: 20,
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
      0: {
        items: 3
      },
      600: {
        items: 4
      },
      1000: {
        items: 6
      }
    }
  });

  /**
* ----------------------------------------
* owlCategories_Public
* ----------------------------------------
*/
  $('.owlCategories_Public').owlCarousel({
    margin: 15,
    loop: true,
    autoWidth: true,
    items: 3
  });

  /**
  * ----------------------------------------
  * owlThemeCorses
  * ----------------------------------------
  */
  $('.owlThemeCorses').owlCarousel({
    margin: 15,
    loop: true,
    autoWidth: true,
    items: 2
  })

  /**
* ----------------------------------------
* owlThemeCorses
* ----------------------------------------
*/
  $('.owlCategories').owlCarousel({
    margin: 13,
    loop: true,
    autoWidth: true,
    items: 2,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 5
      },
      1000: {
        items: 8
      }
    }
  })

  /**
  * ----------------------------------------
  * Disable any link it has #
  * ----------------------------------------
  */
  $('a').on('click', function () {
    var attrs = $(this).attr('href');
    if (attrs === '#') { return false; }
  });

  /**
  * ----------------------------------------
  * Verification codes
  * ----------------------------------------
  */

  var body = $('body');

  function goToNextInput(e) {
    var key = e.which,
      inputText = $(e.target),
      sib = inputText.next('.input_number');

    if (key != 9 && (key < 48 || key > 57)) {
      e.preventDefault();
      return false;
    }

    if (key === 9) {
      return true;
    }

    if (!sib || !sib.length) {
      sib = body.find('.input_number').eq(0);
    }
    sib.select().focus();
  }

  function onKeyDown(e) {
    var key = e.which;

    if (key === 9 || (key >= 48 && key <= 57)) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  function onFocus(e) {
    $(e.target).select();
  }

  body.on('keyup', '.input_number', goToNextInput);
  body.on('keydown', '.input_number', onKeyDown);
  body.on('click', '.input_number', onFocus);



}(jQuery));

/**
 * ----------------------------------------
 * Fixes Header on Scroll
 * ----------------------------------------
 */

function fixedHeader() {
  var scrolls = $(this).scrollTop();
  if (scrolls > 20) {
    $(".header-sticky").addClass("-sticky");
  } else {
    $(".header-sticky").removeClass("-sticky");
  }
}
fixedHeader();
$(window).scroll(function () {
  fixedHeader();
});

/**
 * ----------------------------------------
 *  Dark Mode Activation
 * ----------------------------------------
 */

function eMDarkMode() {

  var eMDarkSwitch = $('.em_darkMode_menu .switchDarkMode').off().on('click', function () {
    $('body').toggleClass('lightMode-active darkMode-active');
    if ($('body').hasClass('status-theme')) {
      $('body').removeClass('status-theme');
    }
    if ($('body').hasClass('lightMode-active')) {
      eMDarkSwitch.prop('checked', false);
      localStorage.setItem('OliveraTheme', 'light__mode')
    }
    if ($('body').hasClass('darkMode-active')) {
      eMDarkSwitch.prop('checked', true);
      localStorage.setItem('OliveraTheme', 'dark__mode')
    }
  })

  if (localStorage.getItem('OliveraTheme') == "dark__mode") {
    eMDarkSwitch.prop('checked', true);
    $('body').removeClass('lightMode-active').addClass('darkMode-active');
  }
  if (localStorage.getItem('OliveraTheme') == "light__mode") {
    eMDarkSwitch.prop('checked', false);
    $('body').removeClass('darkMode-active').addClass('lightMode-active');
  }

}
eMDarkMode();



/**
* --------------------------------------------------------------------------
* Offline Mode / Online Mode Detection
* --------------------------------------------------------------------------
*/

//You can change the text of the message
var textOnline = "Internet connection is back";
var textOffline = "Internet disconnected";

//Add Offline Toasts
var toastOffline = $('#offlineToast');
if (!toastOffline.length) {
  $("body").append(
    "<div id='offlineToast' class='toast_block toast__network bg-red tap-to-close'>"
    +
    "<div class='content'><div class='text'>"
    +
    "<i class='tio-wifi_off'></i>"
    +
    textOffline
    +
    "</div></div></div>"
  );
  $("body").append(
    "<div id='onlineToast' class='toast_block toast__network bg-green tap-to-close'>"
    +
    "<div class='content'><div class='text'>"
    +
    "<i class='tio-wifi'></i>"
    +
    textOnline
    +
    "</div></div></div>"
  );
}

//here is show function Offline 
function isOfflineMode() {
  $('#offlineToast').addClass('show');
  $('#onlineToast').removeClass('show');
  setTimeout(function () { $('#offlineToast').removeClass('show'); }, 2900);
}

//here is show function Online
function isOnlineMode() {
  $('#onlineToast').addClass('show');
  $('#offlineToast').removeClass('show');
  setTimeout(function () { $('#onlineToast').removeClass('show'); }, 2100);
}

$('.experimentOffline').on('click', function () { isOfflineMode(); })
$('.experimentOnline').on('click', function () { isOnlineMode(); })

//If the internet is turned off, the links will be stopped
function DisabledLink() {
  var linkStatus = $(this).attr('href'); if (linkStatus.match(/.html/)) { isOfflineMode(); return false; }
}

//Connection verification stage
function ReStatusOnline(event) { var condition = navigator.onLine ? "online" : "offline"; isOnlineMode(); console.log('Status: Online'); $("a").off("click", DisabledLink); }
function ReStatusOffline(event) { isOfflineMode(); $("a").on("click", DisabledLink); console.log('Status: Offline'); }
window.addEventListener('online', ReStatusOnline);
window.addEventListener('offline', ReStatusOffline);

//This is for testing on the components page
window.addEventListener('online', isOnlineMode);
window.addEventListener('offline', isOfflineMode);
