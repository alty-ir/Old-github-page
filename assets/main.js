/*
	Name: TheBlogger
	Description: Shape-Shifter Blog Theme
	Version: 1.0
	Author: pixelwars
*/

(function($) { "use strict"; 
	
	/* global variables */
	var $masonry_container;
	var isSafari = (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1 &&  navigator.userAgent.indexOf('Android') === -1);
	var isIE = document.documentMode;
	var isEdge = /Edge/.test(navigator.userAgent);


	// DOCUMENT READY
	$(function() {
		
		
		// FIX SIDEBAR INSTAGRAM
		$('.sidebar .instagram-pics, .featured-area .instagram-pics').wrap('<div class="instagram-pics-wrap"></div>');
		$('.sidebar .null-instagram-feed > p').appendTo($('.sidebar .instagram-pics-wrap'));
		$('.featured-area .instagram-pics-wrap + p').appendTo($('.featured-area .instagram-pics-wrap'));
		
		// FORMS
		$('input:not([type=submit]):not([type=button]):not([type=file]):not([type=radio]):not([type=checkbox])').addClass('input-text');
		
				
		

		// ------------------------------
		// STICKY MENU
		if($('html').hasClass('is-menu-sticky')) {
			
			// the element to be sticky
			var theElement = $('html').hasClass('is-menu-bar') ? $('.site-navigation') : $('.site-header');
			
			// variables
			var smart,
				$orgElement,
				$clonedElement,
				orgElementTop,
				currentScroll,
				previousScroll = 0,
				scrollDifference,
				detachPoint = 650, // point of detach (after scroll passed it, menu is fixed)
				hideShowOffset = 6, // scrolling value after which triggers hide/show menu
				$html = $('html');

				
			// Create a clone of the menu, right next to original.
			theElement.addClass('original').clone().insertAfter(theElement).addClass('clone').removeClass('original');
			
			$orgElement = $('.original'); 
			$clonedElement = $('.clone'); 
			
			
			smart = $('html').hasClass('is-menu-smart-sticky');
			
			// fix css max-width issue for the fixed positioned clone element
			$clonedElement.width($orgElement.width());
			$( window ).on( "resize", function() {
				$clonedElement.width($orgElement.width());
			});
			
			$( window ).on( "scroll", function() {
				
				currentScroll = $(this).scrollTop(), // gets current scroll position
				scrollDifference = Math.abs(currentScroll - previousScroll); // calculates how fast user is scrolling
				
				// fix css max-width issue for the fixed positioned clone element
				$clonedElement.width($orgElement.width());
							
				if (window.matchMedia("(min-width: 992px)").matches) {
					
					  orgElementTop = $orgElement.offset().top;  
								   
					  // Scrolled past the original position; now only show the cloned, sticky element.
					  if (currentScroll >= (orgElementTop) && currentScroll != 0 ) {
						  
						
						// if : SMART STICKY 
						if(smart) {
							
								// if scrolled past detach point add class to fix menu
								if (currentScroll > detachPoint) 
								{
									if (!$html.hasClass('menu-detached')) {
										$html.addClass('menu-detached');
										}
								}
								  
								// if scrolling faster than hideShowOffset hide/show menu
								if (scrollDifference >= hideShowOffset) 
								{
									// scrolling down; hide menu  
									if (currentScroll > previousScroll) 
									{
										if (!$html.hasClass('menu-invisible')) {
											$html.addClass('menu-invisible');
										}
									} 
									// scrolling up; show menu
									else 
									{
										if ($html.hasClass('menu-invisible')) {
											$html.removeClass('menu-invisible');
										}
									}
								}
						} // if : smart
						
						
						// else : NORMAL STICKY
						else {
							$clonedElement.addClass('is-visible');
							$orgElement.addClass('is-hidden');
						}
						
					  }
					  // Scrolled past the original position; now only show the cloned, sticky element.
					  
					  
					  // NOT scrolled past the menu; only show the original menu.
					  else 
					  {
						$clonedElement.removeClass('is-visible');
						$orgElement.removeClass('is-hidden');
						
						if(smart) {
							$html.removeClass('menu-detached').removeClass('menu-invisible');
						} // if : smart
						
					  } 
					  // NOT scrolled past the menu; only show the original menu.
					  
					  
					  // replace previous scroll position with new one
					  previousScroll = currentScroll;
					  
					
					
				} // > 991
			  
			}); // window on scroll
			
		} // STICKY MENU 
		// ------------------------------	
		
		// ------------------------------
		// STICKY: HEADER ROW & HEADER SMALL
		window.addEventListener('scroll', function(){
			var distanceY = window.pageYOffset || document.documentElement.scrollTop,
				shrinkOn = 300,
				header = $('.is-header-row.is-menu-sticky .site-header.clone, .is-header-small.is-menu-sticky .site-header.clone');
			if (distanceY > shrinkOn) {
				header.addClass("smaller");
			} else {
				if (header.hasClass("smaller")) {
					header.removeClass("smaller");
				}
			}
		});
		// ------------------------------



		// ------------------------------	
        // SEARCH TOGGLE
        $('.search-toggle').on("click", function(e) {
            e.stopPropagation();
			var search_input = $(this).parent().find('.search-container input[type="search"]');
            $('html').toggleClass('is-search-toggled-on');
			if($('html').hasClass('is-search-toggled-on')) {
				setTimeout(function() { search_input.trigger('focus'); },400);
			}
        });
        // ------------------------------
		


		// ------------------------------	
        // HEADER MENU TOGGLE
        $('.menu-toggle').on("click", function(e) {
            e.stopPropagation();
            $('html').toggleClass('is-menu-toggled-on');
        });
        // ------------------------------
		
		
		// ------------------------------
		// MOBILE MENU
		var $menu = $('.nav-menu');
		
		// add classes
		$menu.find('li').each(function() {
			if($(this).children('ul').length) {
				$(this).addClass('has-submenu');
				$(this).find('>a').after('<span class="submenu-toggle"></span>');
			}
		});
		
		var $submenuTrigger = $('.has-submenu > .submenu-toggle');
		// submenu link click event
		$submenuTrigger.on( "click", function() {
			$(this).parent().toggleClass('active');
			$(this).siblings('ul').toggleClass('active');
		});
		// ------------------------------
		
		
		
		/* Slider more-link clone */
		$('.post-thumbnail .entry-header .more-link').each(function() {
            $(this).clone().appendTo($(this).parents('.post-wrap')).addClass('outside');
        });
		
		
		var sliderAnimations = {
			
			'backSlide': {
				'in' : 		'backSlideInRight',
				'out' :		'backSlideOutLeft',
				'backIn' : 	'backSlideInLeft',
				'backOut' :	'backSlideOutRight'
			},
			'scale': {
				'in' : 		'scaleIn',
				'out' :		'scaleOut'
			},
			'stackScale': {
				'in' : 		'scaleIn',
				'out' :		'zoomOut',
				'backIn' : 	'zoomIn',
				'backOut' :	'scaleOut'
			},
			'stackZoom': {
				'in' : 		'zoomIn',
				'out' :		'scaleOut',
				'backIn' : 	'scaleIn',
				'backOut' :	'zoomOut'
			},
			'fade': {
				'in' : 		'fadeIn',
				'out' :		'fadeOut'
			},
			'fadeHorizontal': {
				'in' : 		'fadeInRight',
				'out' :		'fadeOutLeft',
				'backIn' : 	'fadeInLeft',
				'backOut' :	'fadeOutRight'
			},
			'fadeHorizontalBig': {
				'in' : 		'fadeInRightBig',
				'out' :		'fadeOutLeftBig',
				'backIn' : 	'fadeInLeftBig',
				'backOut' :	'fadeOutRightBig'
			},
			'fadeVertical': {
				'in' : 		'fadeInUp',
				'out' :		'fadeOutUp',
				'backIn' : 	'fadeInDown',
				'backOut' :	'fadeOutDown'
			},
			'fadeVerticalBig': {
				'in' : 		'fadeInUpBig',
				'out' :		'fadeOutUpBig',
				'backIn' : 	'fadeInDownBig',
				'backOut' :	'fadeOutDownBig'
			},
			'jello': {
				'in' : 		'jello',
				'out' :		'zoomOut'
			},
			'jelloVertical': {
				'in' : 		'jello',
				'out' :		'fadeOutDown',
				'backIn' : 	'jello',
				'backOut' :	'fadeOutUp'
			},
			'jelloVerticalBig': {
				'in' : 		'jello',
				'out' :		'fadeOutDownBig',
				'backIn' : 	'jello',
				'backOut' :	'fadeOutUpBig'
			},
			'jelloHorizontal': {
				'in' : 		'jello',
				'out' :		'fadeOutLeft',
				'backIn' : 	'jello',
				'backOut' :	'fadeOutRight'
			},
			'jelloHorizontalBig': {
				'in' : 		'jello',
				'out' :		'fadeOutLeftBig',
				'backIn' : 	'jello',
				'backOut' :	'fadeOutRightBig'
			},
			'swing': {
				'in' : 		'swing',
				'out' :		'zoomOut'
			},
			'swingVertical': { 
				'in' : 		'swing',
				'out' :		'fadeOutDown',
				'backIn' : 	'swing',
				'backOut' :	'fadeOutUp'
			},
			'swingVerticalBig': { 
				'in' : 		'swing',
				'out' :		'fadeOutDownBig',
				'backIn' : 	'swing',
				'backOut' :	'fadeOutUpBig'
			},
			'swingHorizontal': {
				'in' : 		'swing',
				'out' :		'fadeOutLeft',
				'backIn' : 	'swing',
				'backOut' :	'fadeOutRight'
			},
			'swingHorizontalBig': {
				'in' : 		'swing',
				'out' :		'fadeOutLeftBig',
				'backIn' : 	'swing',
				'backOut' :	'fadeOutRightBig'
			},
			'rubberBand': {
				'in' : 		'rubberBand',
				'out' :		'zoomOut'
			},
			'rubberBandVertical': {
				'in' : 		'rubberBand',
				'out' :		'fadeOutUp',
				'backIn' : 	'rubberBand',
				'backOut' :	'fadeOutDown'
			},
			'rubberBandVerticalBig': {
				'in' : 		'rubberBand',
				'out' :		'fadeOutDownBig',
				'backIn' : 	'rubberBand',
				'backOut' :	'fadeOutUpBig'
			},
			'rubberBandHorizontal': {
				'in' : 		'rubberBand',
				'out' :		'fadeOutLeft',
				'backIn' : 	'rubberBand',
				'backOut' :	'fadeOutRight'
			},
			'rubberBandHorizontalBig': {
				'in' : 		'rubberBand',
				'out' :		'fadeOutLeftBig',
				'backIn' : 	'rubberBand',
				'backOut' :	'fadeOutRightBig'
			},
			'zoom': {
				'in' : 		'zoomIn',
				'out' :		'zoomOut'
			},
			'zoomHorizontal': {
				'in' : 		'zoomIn',
				'out' :		'fadeOutLeft',
				'backIn' : 	'fadeInLeft',
				'backOut' :	'zoomOut'
			},
			'zoomHorizontalBig': {
				'in' : 		'zoomIn',
				'out' :		'fadeOutLeftBig',
				'backIn' : 	'fadeInLeftBig',
				'backOut' :	'zoomOut'
			},
			'zoomVertical': {
				'in' : 		'zoomIn',
				'out' :		'fadeOutUp',
				'backIn' : 	'fadeInDown',
				'backOut' :	'zoomOut'
			},
			'zoomVerticalBig': {
				'in' : 		'zoomIn',
				'out' :		'fadeOutUpBig',
				'backIn' : 	'fadeInDownBig',
				'backOut' :	'zoomOut'
			},
			'zoomInDown': {
				'in' : 		'zoomInDown',
				'out' :		'zoomOut'
			},
			'fadeUpZoomOut': {
				'in' : 		'fadeInUp',
				'out' :		'zoomOut',
				'backIn' : 	'zoomIn',
				'backOut' :	'fadeOutDown'
			},
			'fadeLeftZoomOut': {
				'in' : 		'fadeInLeft',
				'out' :		'zoomOut',
				'backIn' : 	'zoomIn',
				'backOut' :	'fadeOutLeft'
			},
			'flipVertical': {
				'in' : 		'flipInX',
				'out' :		'zoomOut'
			},
			'flipHorizontal': {
				'in' : 		'flipInY',
				'out' :		'zoomOut'
			},
			'lightSpeed': {
				'in' : 		'lightSpeedInLeft',
				'out' :		'lightSpeedOutLeft',
				'backIn' : 	'lightSpeedInRight',
				'backOut' :	'lightSpeedOutRight'
			},
			'jackInTheBox': {
				'in' : 		'jackInTheBox',
				'out' :		'zoomOut'
			},
			'hinge': {
				'out' :		'hinge'
			},
			'rotate': {
				'in' : 		'rotateIn',
				'out' :		'zoomOut',
				'backIn' : 	'zoomIn',
				'backOut' :	'rotateOut'
			},
			'rotateUpSwitch': {
				'in' : 		'rotateInUpRight',
				'out' :		'rotateOutDownRight'
			},
			'rotateDownSwitch': {
				'in' : 		'rotateInDownRight',
				'out' :		'rotateOutUpRight'
			},
			'rotateHorizontal': {
				'in' : 		'rotateInDownLeft',
				'out' :		'rotateOutUpRight',
				'backIn' : 	'rotateInDownRight',
				'backOut' :	'rotateOutUpLeft'
			},
			'rotateVertical': {
				'in' : 		'rotateInUpRight',
				'out' :		'rotateOutUpRight',
				'backIn' : 	'rotateInDownRight',
				'backOut' :	'rotateOutDownRight'
			},
			'jumpIn': {
				'in' : 		'jumpIn',
				'out' :		'zoomOut'
			},
			'blur': {
				'in' : 		'blurIn',
				'out' :		'blurOut'
			},
			'blurZoom': {
				'in' : 		'blurZoomIn',
				'out' :		'blurZoomOut'
			},
			'blurScale': {
				'in' : 		'blurScaleIn',
				'out' :		'blurScaleOut'
			},
			'blurStackScale': {
				'in' : 		'blurScaleIn',
				'out' :		'blurZoomOut',
				'backIn' : 	'blurZoomIn',
				'backOut' :	'blurScaleOut'
			},
			'blurStackZoom': {
				'in' : 		'blurZoomIn',
				'out' :		'blurScaleOut',
				'backIn' : 	'blurScaleIn',
				'backOut' :	'blurZoomOut'
			},
			'invert': {
				'in' : 		'invert'
			}
		};
		
		// console.log('Total Slider Animations Count is ' + Object.keys(sliderAnimations).length);
		
		
		// ------------------------------
        // OWL-CAROUSEL
		var owl = $('.owl-carousel');
		$('.slider-box .post-thumbnail .entry-header').removeClass('ready');
		if(owl.length) {
			owl.each(function(index, element) {
				
				var items = $(element).data('items');
				var animate = $(element).data('animation');
				//var animate = 'jello';
				var animateIn, animateOut, backAnimateIn, backAnimateOut;
				var mouseDrag = $(element).data('mouse-drag');
				
				// check if the animations is defined
				if(sliderAnimations[animate] !== undefined && items <= 1) {
					
					// mouse drag is always of when custom animation is on
					mouseDrag = false;
					$(element).addClass('custom-animation');
					
					animateIn = isIE ? 'fadeIn' : sliderAnimations[animate].in;	
					animateOut = isIE ? 'fadeOut' : sliderAnimations[animate].out;	
					backAnimateIn = isIE ? 'fadeIn' : sliderAnimations[animate].backIn;	
					backAnimateOut = isIE ? 'fadeOut' : sliderAnimations[animate].backOut;	
				}
				
				//wait for images
				$(element).imagesLoaded( function() {
					
					//remove loading
					$(element).find('.loading').remove();
					
					$(element).owlCarousel({
						mouseDrag : 			mouseDrag,
						dots :		 			$(element).data('dots'),
						nav : 					$(element).data('nav'),
						autoplay : 				$(element).data('autoplay'),
						autoplayTimeout	: 		$(element).data('autoplay-timeout'),
						autoplayHoverPause :	true,
						navText :		 		false,
						rewind : 				$(element).data('rewind'),
						center : 				$(element).data('center'),
						loop : 					$(element).data('loop'),
						// margin :				60,
						// stagePadding: 		200,
						navSpeed : 				350,
						dotsSpeed : 			250,
						responsiveRefreshRate : 10,
						smartSpeed :			1000, // slide change animation duration when autoplay is on
						autoHeight : 			true,
						animateIn: 				animateIn,
						animateOut: 			animateOut,
						backAnimateIn: 			backAnimateIn,
						backAnimateOut: 		backAnimateOut,
						responsive:{
							0:{
								items:1,
								nav:true
							},
							700:{
								items: items <= 2 ? items : 2,
								nav:false
							},
							960:{
								items: items <= 3 ? items : 3,
								nav:true
							},
							1260:{
								items: items <= 4 ? items : 4,
								nav:true
							}
						},
						onInitialized : function() {


							// ------------------------------
							// PARALLAX
							var $container = $('.post-slider');
							$('.post-slider .post-thumbnail').each(function() {
								if($(this).data('parallax-video')) { //parallax video
									$(this).jarallax({
										speed: 0,
										zIndex: 1,
										elementInViewport: $container,
										videoSrc: $(this).data('parallax-video')
									});	
								} else if($('html').hasClass('is-slider-parallax')) { //parallax image
								   $(this).jarallax({
									  elementInViewport: $container,
									  zIndex : 1,
									  speed: 0.7,
									  noAndroid: true,
									  noIos: true
								   });
								} // else if
							}); // each
							// ------------------------------
							
							// responsive text
							$('.slider-box .entry-title').fitText($('html').data('title-ratio') , { minFontSize: '12px', maxFontSize: '220px' });
							setTimeout(function() { 
								$('.post-thumbnail .entry-header').addClass('ready');
							} , 300);
							
							var fixWaitTime;
							$(window).on('resize', function () { 
								clearTimeout(fixWaitTime);
								fixWaitTime = setTimeout(function() { 
									$('.slider-box .entry-title').fitText($('html').data('title-ratio') , { minFontSize: '12px', maxFontSize: '220px' });
								} , 500);
							});	
							
							// update sticky sidebar
							sticky_sidebar_update();
							
							
						} // afterInit
					}); // owlCarousel()
					
					
					// fix for: nav = false not working
					if($(element).data('nav') !== true) {
						$(element).find('.owl-nav').hide();
					}
					

				}); // wait for images
				

				
				
			});	// owl.each()
		}
		// ------------------------------
		
		
		
		
		// ------------------------------
		// PARALLAX
		var video_parallax = $(".header-wrap, .intro, .post-thumbnail");
		
		video_parallax.each(function() {
			if($(this).data('parallax-video')) {
				$(this).jarallax({
					speed: 0,
					zIndex: 1,
					videoSrc: $(this).data('parallax-video')
				});	
			}
        });
		
		// PARALLAX HEADER BG IMAGE
		$('.is-header-parallax .header-wrap').jarallax({
			zIndex: 1,
			speed: 0.6,
			noAndroid: true,
			noIos: true
		});
		
		// PARALLAX INTRO BG IMAGE
		$('.is-intro-parallax .intro').jarallax({ 
			zIndex: 1,
			speed: -0.2,	//from -1.0 to 2.0
			noAndroid: true,
			noIos: true
		});	
		
		// PARALLAX LINK BOXES
		if (!(isIE || isEdge)) { // buggy on IE : disable for now
			$('.is-link-box-parallax .link-box .post-thumbnail').jarallax({
				zIndex : 1,
				speed: isSafari ? 0.5 : 0.7, // safari weird performance fix
				noAndroid: true,
				noIos: true
			});
		}
		// PARALLAX RELATED POSTS
		if (!(isIE || isEdge)) { // buggy on IE : disable for now
			$('.is-related-posts-parallax .related-posts .post-thumbnail').jarallax({
				zIndex : 1,
				speed: 0.8,
				noAndroid: true,
				noIos: true
			});
		}
		
		// PARALLAX IMAGE IN POST
		parallaxImages();
		// ------------------------------
		
       
	   
		
		// ------------------------------
		// POST THUMBNAILS
        var post_thumbnail = $('.post-thumbnail');
		if(post_thumbnail.length) {

			singlePostParallax();
			
			
			
			// optimized background images for various screens
		  	post_thumbnail.each(function() {
				
				var postThumbnail = $(this);
				var parallax = postThumbnail.find('[id^="jarallax"] div');
				var isParallax = parallax.length;
				var parallaxRatio = (isParallax && postThumbnail.parent('.post-header-overlay-inline').length) ? 1.5 : 1;
				var src = "";
				
				if (postThumbnail.width() * window.devicePixelRatio * parallaxRatio > 1060) { // big screens
					src = postThumbnail.data('large-image');
				} else if (postThumbnail.width() * window.devicePixelRatio * parallaxRatio > 550) { // retina phones or tablets
					src = postThumbnail.data('medium-image');
				}
				
				if(src !== "") {

					$("<img />").attr("src", src).load(function() {
						if (isParallax) {
							parallax.css('background-image', 'url(' + src + ')');	
						} else {
							postThumbnail.css('background-image', 'url(' + src + ')');	
						}
					});
				}
				
            });
			
			$('*:not(.slider-post) > .post-thumbnail .entry-header').addClass('ready');
		
        }
		// ------------------------------
		
		
		
		
		// ------------------------------
		// Fitvids.js : fluid width video embeds
		$("body").fitVids({ customSelector: 'iframe[src*="facebook.com/plugins/video"], iframe[src*="facebook.com/video/embed"]' });
		// preserve 16:9 aspect ratio for soundcloud embeds
		$('iframe[src*="soundcloud.com"]').wrap('<div class="fluid-audio fluid-width-video-wrapper"></div>');
		$('.fluid-width-video-wrapper').wrap('<div class="media-wrap"></div>');
		// ------------------------------
			
		
		// ------------------------------
		// FluidBox : Zoomable Images
		setupFluidbox();
        // ------------------------------
		
		
		
		// ------------------------------
		// FORM VALIDATION
		// comment form validation fix
		$('#commentform, .post-password-form, .mc4wp-form form, .mc4wp-form').addClass('validate-form');
		$('#commentform').find('input,textarea').each(function(index, element) {
            if($(this).attr('aria-required') == "true") {
				$(this).addClass('required');
			}
			if($(this).attr('name') == "email") {
				$(this).addClass('email');
			}
		});
		
		// validate form
		if($('.validate-form').length) {
			$('.validate-form').each(function() {
					$(this).validate();
				});
		}
		// ------------------------------
        
        
		
		
		// ------------------------------
		// GALLERY COLLAGE LAYOUT
		collage();
		
		var resizeTimer = null;
		$(window).bind('resize', function() {
			
			// hide all the images until we resize them
			// set the element you are scaling i.e. the first child nodes of ```.Collage``` to opacity 0
			$('.gallery figure').css("opacity", 0);
			// set a timer to re-apply the plugin
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(collage, 1200);
			collage();
		});
		// ------------------------------
		
		
		// ------------------------------
		// LIGHTBOX - applied to gallery post format  a[href*=".jpg"]
		
		// zoomable text links
		$('.entry-content .lightbox').wrap("<span class='lightbox'></span>");
		
		if($('.lightbox, .gallery, .portfolio-grid .hentry-middle, .portfolio-grid .featured-image').length) {
			$('.lightbox, .gallery,  .portfolio-grid .hentry-middle, .portfolio-grid .featured-image').each(function(index, element) {
				var $media_box = $(this);
				$media_box.magnificPopup({
				  delegate: '.lightbox, .gallery-item a[href$=".jpg"], .gallery-item a[href$=".jpeg"], .gallery-item a[href$=".png"], .gallery-item a[href$=".gif"]',
				  type: 'image',
				  image: {
					  markup: '<div class="mfp-figure">'+
								'<div class="mfp-close"></div>'+
								'<div class="mfp-img"></div>'+
							  '</div>' +
							  '<div class="mfp-bottom-bar">'+
								'<div class="mfp-title"></div>'+
								'<div class="mfp-counter"></div>'+
							  '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button
					
					  cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor. 
					  verticalFit: true, // Fits image in area vertically
					  tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
					},
					gallery: {
					  enabled:true,
					  tCounter: '<span class="mfp-counter">%curr% / %total%</span>' // markup of counter
					},
				  iframe: {
					 markup: '<div class="mfp-iframe-scaler">'+
								'<div class="mfp-close"></div>'+
								'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
								'<div class="mfp-title">Some caption</div>'+
							  '</div>'
				  },
				  mainClass: 'mfp-zoom-in',
				  tLoading: '',
				  removalDelay: 300, //delay removal by X to allow out-animation
				  callbacks: {
					markupParse: function(template, values, item) {
						  var title = "";
						  if(item.el.parents('.gallery-item').length) {
							  title = item.el.parents('.gallery-item').find('.gallery-caption').text();	  
						  } else {
							  title = item.el.attr('title') == undefined ? "" : item.el.attr('title');
							  }
						  //return title;
					 	values.title = title;
					},
					imageLoadComplete: function() {
					  var self = this;
					  setTimeout(function() {
						self.wrap.addClass('mfp-image-loaded');
					  }, 16);
					},
					close: function() {
					  this.wrap.removeClass('mfp-image-loaded');
					},
					
					beforeAppend: function() {
						
						var self = this;
						
						// square aspect ratio for soundcloud embeds
						if(this.content.find('iframe[src*="soundcloud.com"]').length) {
							self.wrap.addClass('is-soundcloud');
						} else {
							self.wrap.removeClass('is-soundcloud');
						}
						
						this.content.find('iframe').on('load', function() {
						  setTimeout(function() {
							self.wrap.addClass('mfp-image-loaded');
						  }, 16);
						});
						
					 }
				  },
				  closeBtnInside: false,
				  closeOnContentClick: true,
				  midClick: true
				});
			});	
		}
		// ------------------------------
		
		
		
		// ------------------------------
		// MASONRY - ISOTOPE
		$masonry_container = $('.masonry');
		if($masonry_container.length) {

			$masonry_container.imagesLoaded(function() {
				// initialize isotope
				$masonry_container.isotope({
				  itemSelector : '.hentry',
				  layoutMode : $masonry_container.data('layout'),
				  transitionDuration: $masonry_container.hasClass('portfolio-grid') ? 400 : 0
				});
				
				setMasonry();
				setTimeout(function() { $masonry_container.isotope(); }, 20);	
				// filters
				if ($masonry_container.data('isotope')) {
					var filters = $('.filters');
					if(filters.length) {
						filters.find('a').on("click", function() {
							var selector = $(this).attr('data-filter');
							  $masonry_container.isotope({ filter: selector });
							  $(this).parent().addClass('current').siblings().removeClass('current');
							  return false;
						});
					}
				}		
				
				// fix item widths on resize
				$(window).on('resize', function () { 
					setMasonry();
				});	
				
				

			}); // images loaded			
		}
		// ------------------------------
		
		
		
	
		// ------------------------------
        // FULL WIDTH IMAGES with caption fix
		if($('figure img.full').length) {
			$('figure img.full').parent().addClass('full');
		}
		// ------------------------------
		
		
		// ------------------------------
		// HOME LANDING FULLSCREEN VIDEO
		var fs_video = $('.intro-vid');
		if(fs_video.length) {
			//fs_video.wrap( "<div class='fs-video'></div>" );
			//fs_video = $('.fs-video');
			bgVideo(fs_video);
			$( window ).resize(function() {
				bgVideo(fs_video);
				//setTimeout(bgVideo(fs_video), 1500);
			});
		}
		
		var resizeTimerVideo = null;
		$(window).bind('resize', function() {
			if(resizeTimerVideo) { 
				clearTimeout(resizeTimerVideo);
			}
			resizeTimerVideo = setTimeout(bgVideo(fs_video), 200);
		});
		// ------------------------------
		
		
		
		// ------------------------------
		// STICKY SIDEBAR
		sticky_sidebar();
		// ------------------------------
		
		
		
		// LINK BOX FIT TEXT
		$('.link-box .entry-title').fitText($('html').data('link-box-title-ratio') , { minFontSize: '12px' });

		
		
    });
    // DOCUMENT READY
	
	
	
	
	// WINDOW ONLOAD
	window.onload = function() {
		
		sticky_sidebar_update();
		
		// html addclass : loaded
		$('html').addClass('loaded');

		// intro video bg
		bgVideo($('.intro-vid'));
		
	};
	// WINDOW ONLOAD
	
	
	
	
	// -------------------------------------------------
	// FUNCTIONS
	
	

	
	// ------------------------------
	// SINGLE POST PARALLAX
	function singlePostParallax() {

		// PARALLAX OVERLAY POST OVERLAY MEDIUM
		$('.is-top-content-single-medium .post-thumbnail').jarallax({
			zIndex: 1, speed: 0.6, noAndroid: true, noIos: true
		});	
		
		// PARALLAX OVERLAY POST OVERLAY FULL/FULL MARGINS
		$('.is-top-content-single-full .post-thumbnail, .is-top-content-single-full-margins .post-thumbnail').jarallax({
			zIndex: 1, speed: -0.2, noAndroid: true, noIos: true
		});	
		
		// PARALLAX OVERLAY POST OVERLAY INLINE
		$('.post-header-overlay-inline .post-thumbnail').jarallax({
			zIndex: 1, speed: 0.7, noAndroid: true, noIos: true
		});
	
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// STICKY SIDEBAR
	var stickySidebar;
	function sticky_sidebar() {
		
		if($('.is-sidebar-sticky #secondary').length) {
			jQuery.support.touch = 'ontouchend' in document;
			if (window.matchMedia("(min-width: 992px)").matches && !(jQuery.support.touch) && ($('#primary').height() > $('#secondary').height()) ) {

				stickySidebar = new StickySidebar('#secondary', {
					topSpacing: 80,
					bottomSpacing: 20,
					resizeSensor: true,
					containerSelector: '.site-main > div',
					innerWrapperSelector: '.sidebar-wrap'
				});

			}
		}
	}
	// ------------------------------
			  
			  
	// ------------------------------
	// UPDATE STICKY SIDEBAR
	function sticky_sidebar_update() {
		if($('.is-sidebar-sticky #secondary').length) {
			jQuery.support.touch = 'ontouchend' in document;
			if (window.matchMedia("(min-width: 992px)").matches && !(jQuery.support.touch) && ($('#primary').height() > $('#secondary').height()) ) {

				stickySidebar.updateSticky();

			}
		}
	}
	// ------------------------------
	
	
	// ------------------------------
	// FULL SCREEN BG VIDEO
	function bgVideo(fs_video) {
		
		var videoW = fs_video.find('iframe, video').width(),
			videoH = fs_video.find('iframe, video').height(),
			screenW = $('.intro').outerWidth(),
			screenH = $('.intro').outerHeight();
			
		var video_ratio =  videoW / videoH;
		var screen_ratio = screenW / screenH;
		
		if(video_ratio > screen_ratio) {
			var diffW = screenH / videoH;
			var newWidth = videoW  * diffW;				
			fs_video.css( {'width' : newWidth, 'margin-left' : -((newWidth-screenW)/2), 'margin-top' : 0 });	
		} else {
			var diffH = screenH / videoH;
			var newHeight = screenH * diffH;	
			fs_video.css( {'width' : "100%", 'margin-left' : 0, 'margin-top' : -((videoH-screenH)/2) });		
		}
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// FULL WIDTH PARALLAX IMAGES
	function parallaxImages() { 
		$('img.parallax').each(function(index, element) {
			
			var img = $(element);
			$('<div class="parallax-image"></div>').insertBefore(img);
			var wrapper = img.prev('.parallax-image');
			wrapper.css('background-image', 'url(' + img.attr('src') + ')');
			
			if(img.hasClass('half')) {
				wrapper.addClass('half');
			}
			
			var isIE = document.documentMode || /Edge/.test(navigator.userAgent);
			if (!isIE) {
				img.imagesLoaded(function() {
							
					// PARALLAX EFFECT
					var aspect_ratio = img.width() / img.height();
					var speed = aspect_ratio > 1.2 ? 0.2 : -0.9;
					speed = $('.content-area').hasClass('with-sidebar') ? 0.2 : speed;
					wrapper.jarallax({
						zIndex: 1,
						speed: speed,
						noAndroid: true,
						noIos: true
					});	
					
				});
			}
        });
	}
	// ------------------------------
	
	

	
	// ------------------------------
	// FluidBox : Zoomable Images
	function setupFluidbox() { 
	
		$('.entry-content > p a, .wp-caption a, a.zoom').each(function() {
			
			// prevent conflict with the woocommerce lightbox - both have zoom class
			if($('body').hasClass('woocommerce')) {
				return;	
			}
			if($(this).attr('href').match(/\.(jpeg|jpg|gif|png)$/) !== null) {
				$(this).fluidbox({
					viewportFill: 0.8,
					immediateOpen: true,
					loader: false,
					stackIndex: 400
				});
			}
		});
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// GALLERY COLLAGE LAYOUT
	function collage() {
		var collage = $('.gallery');
		if(collage.length) {
			
			collage.each(function(index, el) {
				
				// wait for images to be loaded
				$(el).imagesLoaded(function() {
					
					$(el).removeClass('pw-collage-loading');
					$(el).collagePlus({
						
						//'targetHeight' : collage.data('row-height'),
						'targetHeight' : 360,
						'effect' : 'effect-4',
						'allowPartialLastRow' : false
						
					}); //collagePlus()
					
				}); //imagesLoaded()
				
			}); //each
		}
	}
	// ------------------------------
	
	
	
	// ------------------------------
	// MASONRY LAYOUT : changes the number of masonry columns based on the current container's width
	function setMasonry() {
		
		var itemW = $masonry_container.data('item-width');
		var containerW = $masonry_container.width();
		var items = $masonry_container.children('.hentry');
		var columns = Math.round(containerW/itemW);
		$masonry_container.removeClass('col-1 col-2 col-3 col-4- col-5 col-6 col-7- col-8').addClass('col-' + columns);
	
		// set the widths (%) for each of item
		items.each(function(index, element) {
			var multiplier = ($masonry_container.hasClass('first-full') && index === 0) && columns > 1 ? 2 : 1;
			var itemRealWidth = (Math.floor( containerW / columns ) * 100 / containerW) * multiplier ;
			itemRealWidth = itemRealWidth > 100 ? 100 : itemRealWidth;
			$(this).css( 'width', itemRealWidth + '%' );
		});
	
		var columnWidth = Math.floor( containerW / columns );
		$masonry_container.isotope( 'option', { masonry: { columnWidth: columnWidth } } );
	}
	// ------------------------------
	
	
	
})(jQuery);