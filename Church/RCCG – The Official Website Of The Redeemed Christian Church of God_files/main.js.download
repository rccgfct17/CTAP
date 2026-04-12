jQuery(document).ready(function($){
	"use strict";	
 	// Tooltips
	 $(document).ready(function(){	

	 		var close_text 		= EventalkObj.close_text ? EventalkObj.close_text : 'Close';
	 		var details_text 	= EventalkObj.details_text ? EventalkObj.details_text : 'Details';

		  $('a.details-down').on('click', function (e) {
	 		e.preventDefault();
	 		var detail_block = $(this).closest('.row').find('.details-txt');
	 	    detail_block.toggle(100, function () {
	 	    	if (detail_block.is(":visible")) {
	 	    		$(this).text(close_text).addClass('active-block').removeClass('hidden-block');
	 	    	} else {
	 	    		$(this).text(details_text).addClass('hidden-block').removeClass('active-block');
	 	    	}
	 	    }.bind(this));

 		  });

    var a = $('.offscreen-navigation .menu');

    if (a.length) {
        a.children("li").addClass("menu-item-parent");
        a.find(".menu-item-has-children > a").on("click", function (e) {
            e.preventDefault();
            $(this).toggleClass("opened");
            var n = $(this).next(".sub-menu"),
                s = $(this).closest(".menu-item-parent").find(".sub-menu");
            a.find(".sub-menu").not(s).slideUp(250).prev('a').removeClass('opened'), n.slideToggle(250)
        });
        a.find('.menu-item:not(.menu-item-has-children) > a').on('click', function (e) {
            $('.rt-slide-nav').slideUp();
            $('body').removeClass('slidemenuon');
        });
    }

    $('.mean-bar .sidebarBtn').on('click', function (e) {
        e.preventDefault();
        if ($('.rt-slide-nav').is(":visible")) {
            $('.rt-slide-nav').slideUp();
            $('body').removeClass('slidemenuon');
        } else {
            $('.rt-slide-nav').slideDown();
            $('body').addClass('slidemenuon');
        }

    });	

    $('#site-navigation').navpoints({
        updateHash:true
    });

	});


    $(document).on('mouseover', '.speaker-img-tooltip',
        function () {
            var self = $(this),
                tips = self.attr('data-tips');
            $tooltip = '<div class="eventalk-tooltip">' +
                '<div class="eventalk-tooltip-content">' + tips + '</div>' +
                '<div class="eventalk-tooltip-bottom"></div>' +
                '</div>';
            $('body').append($tooltip);
            var $tooltip = $('body > .eventalk-tooltip');
            var tHeight = $tooltip.outerHeight();
            var tBottomHeight = $tooltip.find('.eventalk-tooltip-bottom').outerHeight();
            var tWidth = $tooltip.outerWidth();
            var tHolderWidth = self.outerWidth();
            var top = self.offset().top - (tHeight + tBottomHeight);
            var left = self.offset().left;
            $tooltip.css({
                'top': top + 'px',
                'left': left + 'px',
                'opacity': 1
            }).show();
            if (tWidth <= tHolderWidth) {
                var itemLeft = (tHolderWidth - tWidth) / 2;
                left = left + itemLeft;
                $tooltip.css('left', left + 'px');
            } else {
                var itemLeft = (tWidth - tHolderWidth) / 2;
                left = left - itemLeft;
                if (left < 0) {
                    left = 0;
                }
                $tooltip.css('left', left + 'px');
            }
        })
        .on('mouseout', '.speaker-img-tooltip', function () {
            $('body > .eventalk-tooltip').remove();
        });
		
		// Wishlist Icon
		$(document).on('click', '.rdtheme-wishlist-icon',function() {
			if ( $(this).hasClass('rdtheme-add-to-wishlist')) {

				var $obj = $(this),
					productId = $obj.data('product-id'),
					afterTitle = $obj.data('title-after');

				var data = {
					'action' : 'eventalk_add_to_wishlist',
					'context' : 'frontend',
					'nonce' : $obj.data('nonce'),
					'add_to_wishlist' : productId,
				};

				$.ajax({
					url : EventalkObj.ajaxurl,
					type : 'POST',
					data : data,
					success : function( data ){
						if ( data['result'] != 'error' ) {
							$obj.find('.wishlist-icon').removeClass('fa-heart-o').addClass('fa-check').show();
							$obj.removeClass('rdtheme-add-to-wishlist').addClass('rdtheme-remove-from-wishlist');
							$obj.attr('title', afterTitle);
						}
					}
				});

				return false;
			}
		});

	/* Scroll to top */
	$('.scrollToTop').on('click',function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});

	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	/* Search Box */
	$(".search-box-area").on('click', '.search-button, .search-close', function(event){
		event.preventDefault();
		if($('.search-text').hasClass('active')){
			$('.search-text, .search-close').removeClass('active');
		}
		else{
			$('.search-text, .search-close').addClass('active');
		}
		return false;
	});

	if ( EventalkObj.stickyMenu == 1 || EventalkObj.stickyMenu == 'on' ) {
		if ($(".masthead-container").length > 0) {
				var s = $(".masthead-container");
				var sw = $(".site-wrp");
				var pos = s.position();
				var tHeight = s.outerHeight();
				$(window).scroll(function() {
				var windowpos = $(window).scrollTop();
				if (windowpos >= pos.top + 1) {
				    s.removeClass("slideInUp");
				    sw.removeClass("opt-slideInUp");
				    s.addClass("stick animated slideInDown");
				    sw.addClass("opt-slideInUp");			
					//sw.css('padding-top', tHeight + 'px');				
				} else {
				    s.removeClass("stick animated slideInDown");
				    sw.removeClass("opt-slideInUp");
				    s.addClass("animated");
				    //sw.css('padding-top', 0);
				}
				});
			}
		}

	/* Header Right Menu */
	$('.additional-menu-area').on('click', '.side-menu-trigger', function (e) {
		e.preventDefault();
		var width = $('.sidenav').width();
		if (width==280) {
			$('.sidenav').width(0);
		}
		else{
			$('.sidenav').width(280);
		}
	});
	$('.additional-menu-area').on('click', '.closebtn', function (e) {
		e.preventDefault();
		$('.sidenav').width(0);
	});

	/* Mega Menu */
	$('.site-header .main-navigation ul > li.mega-menu').each(function() {
        // total num of columns
        var items = $(this).find(' > ul.sub-menu > li').length;
        // screen width
        var bodyWidth = $('body').outerWidth();
        // main menu link width
        var parentLinkWidth = $(this).find(' > a').outerWidth();
        // main menu position from left
        var parentLinkpos = $(this).find(' > a').offset().left;

        var width = items * 220;
        var left  = (width/2) - (parentLinkWidth/2);

        var linkleftWidth  = parentLinkpos + (parentLinkWidth/2);
        var linkRightWidth = bodyWidth - ( parentLinkpos + parentLinkWidth );

        // exceeds left screen
        if( (width/2)>linkleftWidth ){
        	$(this).find(' > ul.sub-menu').css({
        		width: width + 'px',
        		right: 'inherit',
        		left:  '-' + parentLinkpos + 'px'
        	});        
        }
        // exceeds right screen
        else if ( (width/2)>linkRightWidth ) {
        	$(this).find(' > ul.sub-menu').css({
        		width: width + 'px',
        		left: 'inherit',
        		right:  '-' + linkRightWidth + 'px'
        	}); 
        }
        else{
        	$(this).find(' > ul.sub-menu').css({
        		width: width + 'px',
        		left:  '-' + left + 'px'
        	});            
        }
    });
	// Scripts needs loading inside content area
	rdtheme_content_ready_scripts();
	/* WooCommerce */
	rdtheme_wc_scripts($);
});

(function($){
	"use strict";

    // Window Load+Resize
    $(window).on('load resize', function () {
        // Define the maximum height for mobile menu
        var wHeight = $(window).height();
        wHeight = wHeight - 50;
        $('.mean-nav > ul').css('max-height', wHeight + 'px');
    });

    // Window Load
    $(window).on('load', function () {

		 var setupMaxHeight = function(selector) {
			 var itemBody = $(selector);
			 var maxHeight = 0;
			 itemBody.each(function (index, el) {
			   var height = $(el).height();
			   if ( height > maxHeight ) {
			     maxHeight = height;
			   }
			 })
			 if ( maxHeight ) {
			   itemBody.height(maxHeight)
			 }
			}
    	 setupMaxHeight('.price-table-layout1 .item-body');


    	// Owl Slider
    	rdtheme_content_load_scripts();
        // Preloader
        $('#preloader').fadeOut('slow', function () {
        	$(this).remove();
        });
       	
	/* Event Single Countdown */
	if ( typeof $.fn.countdown == 'function') {
		try {
			var eventCountdownTime = $('.event-countdown').data('countdown'),
			day    = (EventalkObj.day == 'Day') ? 'Day%!D' : EventalkObj.day,
			hour   = (EventalkObj.hour == 'Hour') ? 'Hour%!D' : EventalkObj.hour,
			minute = (EventalkObj.minute == 'Minute') ? 'Minute%!D' : EventalkObj.minute,
			second = (EventalkObj.second == 'Second') ? 'Second%!D' : EventalkObj.second;
			$('.event-countdown')
			.countdown(eventCountdownTime)
			.on('update.countdown', function(event) {
				$(this).html(event.strftime(''
					+ '<div class="countdown-section"><h2>%D</h2><h3>'+day+'</h3></div>'
					+ '<div class="countdown-section cs2sd"><h2>%H</h2><h3>'+hour+'</h3></div>'
					+ '<div class="countdown-section"><h2>%M</h2><h3>'+minute+'</h3></div>'
					+ '<div class="countdown-section"><h2>%S</h2><h3>'+second+'</h3></div>'));
			})		
			.on('finish.countdown', function(event) {
				$(this).html(event.strftime(''));
			});

		}
		catch(err) {
			console.log('Event Countdown : '+err.message);
		}      
	}

	/* Countdown Style 4*/
	if ( typeof $.fn.countdown == 'function') {
		try {
			var eventCountdownTime = $('.event-countdown2').data('countdown'),
			day    = (EventalkObj.day == 'Day') ? 'Day%!D' : EventalkObj.day,
			hour   = (EventalkObj.hour == 'Hour') ? 'Hour%!D' : EventalkObj.hour,
			minute = (EventalkObj.minute == 'Minute') ? 'Minute%!D' : EventalkObj.minute,
			second = (EventalkObj.second == 'Second') ? 'Second%!D' : EventalkObj.second;
			$('.event-countdown2')
			.countdown(eventCountdownTime)
			.on('update.countdown', function(event) {
				$(this).html(event.strftime(''
					+ '<div class="countdown-section"><h2>%D</h2><h3>'+day+'</h3></div>'
					+ '<div class="countdown-section cs2sd"><h2>%H</h2><h3>'+hour+'</h3></div>'
					+ '<div class="countdown-section"><h2>%M</h2><h3>'+minute+'</h3></div>'));
			})		
			.on('finish.countdown', function(event) {
				$(this).html(event.strftime(''));
			});

		}
		catch(err) {
			console.log('Event Countdown : '+err.message);
		}      
	}

	/* Event Single Countdown */
	if ( typeof $.fn.countdown == 'function') {
		try {
			var eventCountdownTime = $('.idcountdown').data('countdown'),
			day    = (EventalkObj.day == 'Day') ? 'Day%!D' : EventalkObj.day,
			hour   = (EventalkObj.hour == 'Hour') ? 'Hour%!D' : EventalkObj.hour,
			minute = (EventalkObj.minute == 'Minute') ? 'Minute%!D' : EventalkObj.minute,
			second = (EventalkObj.second == 'Second') ? 'Second%!D' : EventalkObj.second;
			$('.idcountdown').countdown(eventCountdownTime).on('update.countdown', function(event) {
				$(this).html(event.strftime(''
					+ '<div class="countdown-section"><h2>%D</h2><h3>'+day+'</h3></div>'
					+ '<div class="countdown-section"><h2>%H</h2><h3>'+hour+'</h3></div>'
					+ '<div class="countdown-section"><h2>%M</h2><h3>'+minute+'</h3></div>'
					+ '<div class="countdown-section"><h2>%S</h2><h3>'+second+'</h3></div>'));
			}).on('finish.countdown', function(event) {
				$(this).html(event.strftime(''));
			});
		}
		catch(err) {
			console.log('Event Countdown : '+err.message);
		}      
	}

		
    });
    // Slider Resize
    $(window).on('resize', function () {
    	rdtheme_slider_fullscreen();
    });

    // Sticky Menu Resize
    $(window).on('resize', function () {   	

	if ($(".masthead-container").length > 0) {
			var s = $(".masthead-container");
			var sw = $(".site-wrp");
			var pos = s.position();
			var tHeight = s.outerHeight();
			$(window).scroll(function() {
			var windowpos = $(window).scrollTop();
			if (windowpos >= pos.top + 1) {
			    s.removeClass("slideInUp");
			    sw.removeClass("opt-slideInUp");
			    s.addClass("stick animated slideInDown");
			    sw.addClass("opt-slideInUp");			
				//sw.css('padding-top', tHeight + 'px');				
			} else {
			    s.removeClass("stick animated slideInDown");
			    sw.removeClass("opt-slideInUp");
			    s.addClass("animated slideInUpCustonAnimetion");
			    //sw.css('padding-top', 0);
			}
			});
		}
   	
    });

	// Elementor
	$( window ).on( 'elementor/frontend/init', function() {
		if (elementorFrontend.isEditMode() ) {
			elementorFrontend.hooks.addAction( 'frontend/element_ready/widget', function(){
				rdtheme_content_ready_scripts()
				rdtheme_content_load_scripts();
			} );
		}
	} );

})(jQuery);


function rdtheme_content_ready_scripts(){
	var $ = jQuery;

	/* Event Single Countdown */
	if ( typeof $.fn.countdown == 'function') {
		try {
			var eventCountdownTime = $('.event-countdown').data('countdown'),
			day    = (EventalkObj.day == 'Day') ? 'Day%!D' : EventalkObj.day,
			hour   = (EventalkObj.hour == 'Hour') ? 'Hour%!D' : EventalkObj.hour,
			minute = (EventalkObj.minute == 'Minute') ? 'Minute%!D' : EventalkObj.minute,
			second = (EventalkObj.second == 'Second') ? 'Second%!D' : EventalkObj.second;
			$('.event-countdown').countdown(eventCountdownTime).on('update.countdown', function(event) {
				$(this).html(event.strftime(''
					+ '<div class="countdown-section"><h2>%D</h2><h3>'+day+'</h3></div>'
					+ '<div class="countdown-section"><h2>%H</h2><h3>'+hour+'</h3></div>'
					+ '<div class="countdown-section"><h2>%M</h2><h3>'+minute+'</h3></div>'
					+ '<div class="countdown-section"><h2>%S</h2><h3>'+second+'</h3></div>'));
			}).on('finish.countdown', function(event) {
				$(this).html(event.strftime(''));
			});
		}
		catch(err) {
			console.log('Event Countdown : '+err.message);
		}      
	}

	if ( typeof $.fn.countdown == 'function') {
		try {
			var eventCountdownTime = $('.event-countdown2').data('countdown'),
			day    = (EventalkObj.day == 'Day') ? 'Day%!D' : EventalkObj.day,
			hour   = (EventalkObj.hour == 'Hour') ? 'Hour%!D' : EventalkObj.hour,
			minute = (EventalkObj.minute == 'Minute') ? 'Minute%!D' : EventalkObj.minute,
			second = (EventalkObj.second == 'Second') ? 'Second%!D' : EventalkObj.second;
			$('.event-countdown2')
			.countdown(eventCountdownTime)
			.on('update.countdown', function(event) {
				$(this).html(event.strftime(''
					+ '<div class="countdown-section"><h2>%D</h2><h3>'+day+'</h3></div>'
					+ '<div class="countdown-section cs2sd"><h2>%H</h2><h3>'+hour+'</h3></div>'
					+ '<div class="countdown-section"><h2>%M</h2><h3>'+minute+'</h3></div>'));
			})		
			.on('finish.countdown', function(event) {
				$(this).html(event.strftime(''));
			});

		}
		catch(err) {
			console.log('Event Countdown : '+err.message);
		}      
	}

	/* Event Single Countdown */
	if ( typeof $.fn.countdown == 'function') {
		try {
			var eventCountdownTime = $('.idcountdown').data('countdown'),
			day    = (EventalkObj.day == 'Day') ? 'Day%!D' : EventalkObj.day,
			hour   = (EventalkObj.hour == 'Hour') ? 'Hour%!D' : EventalkObj.hour,
			minute = (EventalkObj.minute == 'Minute') ? 'Minute%!D' : EventalkObj.minute,
			second = (EventalkObj.second == 'Second') ? 'Second%!D' : EventalkObj.second;
			$('.idcountdown').countdown(eventCountdownTime).on('update.countdown', function(event) {
				$(this).html(event.strftime(''
					+ '<div class="countdown-section"><h2>%D</h2><h3>'+day+'</h3></div>'
					+ '<div class="countdown-section"><h2>%H</h2><h3>'+hour+'</h3></div>'
					+ '<div class="countdown-section"><h2>%M</h2><h3>'+minute+'</h3></div>'
					+ '<div class="countdown-section"><h2>%S</h2><h3>'+second+'</h3></div>'));
			}).on('finish.countdown', function(event) {
				$(this).html(event.strftime(''));
			});
		}
		catch(err) {
			console.log('Event Countdown : '+err.message);
		}      
	}

		/* Event Single Countdown */
		if ( typeof $.fn.countdown == 'function') {
			try {
				var eventCountdownTime = $('#event-countdown').data('countdown'),
				day    = (EventalkObj.day == 'Day') ? 'Day%!D' : EventalkObj.day,
				hour   = (EventalkObj.hour == 'Hour') ? 'Hour%!D' : EventalkObj.hour,
				minute = (EventalkObj.minute == 'Minute') ? 'Minute%!D' : EventalkObj.minute,
				second = (EventalkObj.second == 'Second') ? 'Second%!D' : EventalkObj.second;
				$('#event-countdown').countdown(eventCountdownTime).on('update.countdown', function(event) {
					$(this).html(event.strftime(''
						+ '<div class="countdown-section"><h2>%D</h2><h3>'+day+'</h3></div>'
						+ '<div class="countdown-section"><h2>%H</h2><h3>'+hour+'</h3></div>'
						+ '<div class="countdown-section"><h2>%M</h2><h3>'+minute+'</h3></div>'
						+ '<div class="countdown-section"><h2>%S</h2><h3>'+second+'</h3></div>'));
				}).on('finish.countdown', function(event) {
					$(this).html(event.strftime(''));
				});
			}
			catch(err) {
				console.log('Event Countdown : '+err.message);
			}      
		}

		/* Slider */
		if ( typeof $.fn.nivoSlider == 'function') {
			$('.rt-nivoslider').nivoSlider({
				effect: 'boxRainReverse',
				slices: 15,
				boxCols: 8,
				boxRows: 4,
				animSpeed: 500,
				pauseTime: 3000,
				startSlide: 0,
				directionNav: true,
				controlNav: true,
				controlNavThumbs: false,
				pauseOnHover: false,
				manualAdvance: true,
				prevText: '',
				nextText: '',
				randomStart: false,
				beforeChange: function() {},
				afterChange: function() {},
				slideshowEnd: function() {},
				lastSlide: function() {},
				afterLoad: function() {}
			});
			rdtheme_slider_fullscreen();
		}
	}

function rdtheme_content_load_scripts(){
	var $ = jQuery;

	 /*-------------------------------------
        Masonry
        -------------------------------------*/
        var galleryIsoContainer = $('#no-equal-gallery');
        if (galleryIsoContainer.length) {
            var blogGallerIso = galleryIsoContainer.imagesLoaded(function() {
                blogGallerIso.isotope({
                    itemSelector: '.no-equal-item',
                    masonry: {
                        columnWidth: '.no-equal-item'
                    }
                });
            });
        }
	
	 /*-------------------------------------
    Popup
    -------------------------------------*/
    var yPopup = $(".popup-youtube");
    if (yPopup.length) {
        yPopup.magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }
    if ($('.zoom-gallery').length) {
        $('.zoom-gallery').each(function () { // the containers for all your galleries
            $(this).magnificPopup({
                delegate: 'a.ne-zoom', // the selector for gallery item
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });
    }
    
	/* Owl Slider */
	if (typeof $.fn.owlCarousel == 'function') { 

		$(".owl-custom-nav .owl-next").on('click',function(){
			$(this).closest('.owl-wrap').find('.owl-carousel').trigger('next.owl.carousel');
		});
		$(".owl-custom-nav .owl-prev").on('click',function(){
			$(this).closest('.owl-wrap').find('.owl-carousel').trigger('prev.owl.carousel');
		});

		$(".rt-owl-carousel").each(function() {
			var options = $(this).data('carousel-options');
			if ( EventalkObj.rtl == 'yes' ) {
			    options['rtl'] = true; //@rtl
			    options['navText'] = ["<i class='fa fa-angle-right'></i>","<i class='fa fa-angle-left'></i>"];
			}
			$(this).owlCarousel(options);
		});
	}

    /* Isotope */
    if (typeof $.fn.isotope == 'function') {
    	var $rtGalleryContainer = $('.rt-isotope-wrapper .rt-isotope-content');
    	$rtGalleryContainer.isotope({
    		filter: '*',
    		animationOptions: {
    			duration: 750,
    			easing: 'linear',
    			queue: false
    		}
    	});

		$('.rt-isotope-tab a').on('click',function(){
			var $parent = $(this).closest('.rt-isotope-wrapper'),
			selector = $(this).attr('data-filter');

			$parent.find('.rt-isotope-tab .current').removeClass('current');
			$(this).addClass('current');     
			$parent.find('.rt-isotope-content').isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
			return false;
		});    	
    }
}

function rdtheme_wc_scripts($){
	/* Shop change view */
	$('#shop-view-mode li a').on('click',function(){
		$('body').removeClass('product-grid-view').removeClass('product-list-view');

		if ( $(this).closest('li').hasClass('list-view-nav')) {
			$('body').addClass('product-list-view');
			Cookies.set('shopview', 'list');
		}
		else{
			$('body').addClass('product-grid-view');
			Cookies.remove('shopview');
		}
		return false;
	});
}

function rdtheme_slider_fullscreen(){
	var $ = jQuery;
	$('.rt-el-slider').each(function() {
		var width = $(window).width(),
		left = $(this).offset().left,
		$container = $(this).find('.rt-nivoslider');
		if (width<1921) {
			$container.css('margin-left', -left).width(width);
		}
		else {
			leftAlt = left-(width-1920)/2;
			$container.css('margin-left', -leftAlt).width(1920);
		}
		$container.css('opacity', 1);
	});
}
