'use strict'
$(".preloader").fakeLoader({
    timeToHide: 1500, //Time in milliseconds for fakeLoader disappear
    zIndex:"2147483647",//Default zIndex
    spinner:"spinner6",//Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7'
    bgColor:"#ef6621", //Hex, RGB or RGBA colors
});

function backgroundParallax() {
    var backgroundParallaxCollection = $('.background-parallax-item')
    var backgroundParallax = $('.background-parallax')
    backgroundParallaxCollection.each(function() {
        var element = $(this);
        var valueArray = [];
        var valueArrayBase = $(element).map(function(i, el) {
            valueArray.push($(this).attr('data-src'));
        });
        for(var i = 0; i < valueArray.length; i++) {
            element.eq(i).attr('style', 'display: none').parent(backgroundParallax).eq(i).attr('style', 'background-image: url("' + valueArray[i] + '")')
        }
    })
}
function headerTopPadding() {
    var headerTop = $('.main-header-top');
    var contentWrapper = $('.content-wrapper');
    var height = headerTop.height() + parseInt(headerTop.css('padding-top'), 10) + parseInt(headerTop.css('padding-bottom'), 10);
    contentWrapper.attr('style', 'padding-top: ' + height + 'px');
}
function homeSelect() {
    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;
    
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());
    
        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);
    
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
    
        var $listItems = $list.children('li');
    
        $styledSelect.on('click', function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });
    
        $listItems.on('click', function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });
    
        $(document).on('click', function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    });
}

function destinationSlider() {
    var destinationSwiperSlider = $('.destination-block-item-slider');
    destinationSwiperSlider.swiper({
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30
    })
}
function headerNavigation() {
    var mainHeaderToggle = $('.main-header-navbar-toggle');
    var mainHeaderNavBarItem = $('.main-header-navbar-item');
    var mainHeaderNavBar = $('.main-header-navbar')
    mainHeaderToggle.on('click', function() {
        mainHeaderToggle.toggleClass('active');
        mainHeaderNavBarItem.toggleClass('active');
    });
    $(window).on('resize', function() {
        if ($(window).width() > 990) {
            mainHeaderNavBarItem.removeClass('active');
            mainHeaderToggle.removeClass('active');
        }
    }) 
        if ($(window).width() > 990) {
            $(window).scroll(function() {
                var windowTop = $(window).scrollTop() + 1;
                    if (windowTop > 800) {
                        mainHeaderNavBar.addClass('stick');
                        mainHeaderNavBar.css({
                            'opacity' : '1',
                        });
                    } 
                    else if (windowTop > 400) {
                        mainHeaderNavBar.css({
                            'opacity' : '0',
                        });
                    }
                    else {
                        mainHeaderNavBar.removeClass('stick');
                        mainHeaderNavBar.css({
                            'opacity' : '1',
                        });
                    }
            });
        }
}


function contactFormValidation() {
    var contactForm = $('.contact-form')
    var contactFormButton = $('.contact-form > .btn')
    contactForm.validate({
        rules: {
            conemail: {
                required: true,
                email: true,
            },
            conname: {
                required: true,
            },
            context: {
                required: true,
            },
            conphone: {
                required: true,
            },
        },
        messages: {
            conemail: {
                required: 'Please enter your Email.',
                email: 'This Email is not valid', 
            },
            conname: {
                required: 'Please enter your Name.',
            },
            context: {
                required: 'Please enter your Message.',
            },
            conphone: {
                required: 'Please enter your Phone.',
            },
        },
        submitHandler: function(form) {
            $.ajax({
                url: 'php/contact-sending.php',
                type: 'POST',
                data: $(form).serialize(),
                success: function(response) {
                    if(response != 'success') {
                        contactFormButton.addClass('error').text('Error')
                        setTimeout(function() {
                            contactFormButton.removeClass('error').text('Send')
                        }, 3000)
                    }
                    else {
                        contactFormButton.addClass('valid').text('Success')
                        setTimeout(function() {
                            contactFormButton.removeClass('valid').text('Send')
                        }, 3000)
                    }
                },
                error: function(response) {
                    contactFormButton.addClass('error').text('Error')
                    setTimeout(function() {
                        contactFormButton.removeClass('error').text('Send')
                    }, 3000)
                }         
            });
        }
    })
}
function regFormValidation() {
    var regForm = $('.check-out-form ')
    var regFormButton = $('.check-out-form > .btn')
    regForm.validate({
        rules: {
            regfitsname: {
                required: true,
            },
            reglastname: {
                required: true,
            },
            reglastemail: {
                required: true,
                email: true,
            },
            regphone: {
                required: true,
            },
            regadress: {
                required: true,
            },
        },
        messages: {
            reglastemail: {
                required: 'Please enter your Email.',
                email: 'This Email is not valid', 
            },
            reglastname: {
                required: 'Please enter your First Name.',
            },
            regfitsname: {
                required: 'Please enter your Name.',
            },
            regadress: {
                required: 'Please enter your Adress.',
            },
            regphone: {
                required: 'Please enter your Phone.',
            },
        },
        submitHandler: function(form) {
            $.ajax({
                url: 'php/register.php',
                type: 'POST',
                data: $(form).serialize(),
                success: function(response) {
                    if(response != 'success') {
                        regFormButton.addClass('error').text('Error')
                        setTimeout(function() {
                            regFormButton.removeClass('error').text('Register')
                        }, 3000)
                    }
                    else {
                        regFormButton.addClass('valid').text('Success')
                        setTimeout(function() {
                            regFormButton.removeClass('valid').text('Register')
                        }, 3000)
                    }
                },
                error: function(response) {
                    regFormButton.addClass('error').text('Error')
                    setTimeout(function() {
                        regFormButton.removeClass('error').text('Register')
                    }, 3000)
                }         
            });
        }
    })
}

function logFormValidation() {
    var regForm = $('.check-out-form ')
    var regFormButton = $('.check-out-form > .btn')
    regForm.validate({
        rules: {
            logpass: {
                required: true,
            },
            loglog: {
                required: true,
            }
        },
        messages: {
            logpass: {
                required: 'Please enter your First Name.',
            },
            loglog: {
                required: 'Please enter your Name.',
            }
        }
    })
}

function googleMapsInit() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 17,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(54.857917, 83.111232), // Change This position and see down 
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('contact-map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it (see down)
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(54.857917, 83.111232), // And change this position
        map: map,
        title: 'My Wokring Center',
    });
}



function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
// Skill function vision
function skillWork() {
    var element = $('.small-section-item-skill-percentage');
    var valueArray = [];
    var valueArrayBase = $(element).map(function(i, el) {
        var newValue = +el.innerHTML.slice(0, -1) + '%';
        valueArray.push(newValue);
    });
    var skillElemet = $('.small-section-skill .small-section-item-icon-background')
    var elementSkillArray = skillElemet.toArray();
    for(var i = 0; i < valueArray.length; i++) {
        skillElemet.eq(i).height(valueArray[i])
    }
}
// Skill Function no Vision 
function skillNoWork() {
    var skillElemet = $('.small-section-skill .small-section-item-icon-background')
    skillElemet.height('0');
}
// Function navigation submenu 
function subNavigation() {
    var link = $('.main-header-navbar-item a[href$="#"]'); 
    link.on('click', function(e) {
        e.preventDefault();
    });
}
$(document).ready(function() {
    'use strict'
    // images PolyFill 
    objectFitImages();
    // Header 
    headerTopPadding();
    headerNavigation();
    subNavigation();
    // Parallax Background 
    if ($('div').is($('.background-parallax'))) {
        backgroundParallax();
         $('.background-parallax').jarallax({
            speed: 0.2
        });
    }
    // Home 
    homeSelect();
    // Destination 
    destinationSlider();
    // Magnific Popup 
    function popUpGallery() {
        $('.gallery-container').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                    return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                }
            }
        });
    }
    popUpGallery();
    // Masonry 
    function masonryInit() {
        $('.row-masonry').isotope({
            itemSelector: '.masonry-item',
            percentPosition: true
        })
        $('.gallery-container').isotope({
            itemSelector: '.gallery-item',
            percentPosition: true
        })
    }
    masonryInit();
    contactFormValidation();
    regFormValidation();
    logFormValidation();
});

$(window).on('resize', function() {
    headerTopPadding();
})

$(window).on('scroll', function() {
    var skillElemet = $('.small-section-skill .small-section-item-icon-background')
    if ($('div').is(skillElemet)) {
        $(skillElemet).each(function () {
            if (isScrolledIntoView(this) === true && !$(this).hasClass('active')) {
                $(this).addClass('active');
                skillWork();
            }
        });
    }
});
if ($('div').is($('#contact-map'))) {
    google.maps.event.addDomListener(window, 'load', googleMapsInit);
}