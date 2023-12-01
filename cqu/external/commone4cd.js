$(document).ready(function() {
	$(".js__parents-guide-form").each(function(){
		var nonblanks=['guide_first_name','guide_last_name','guide_person_type','guide_email','guide_email_confirm'];
		var match=[['guide_email','guide_email_confirm']];
		$(this).submit(function(e){
			var errors=0;
			var focusid='';
			for (var i=0;i<nonblanks.length;i++) {
				var id=nonblanks[i];
				var field=$('#'+id);
				if (field.val()=='') {
					markfield(field);
					errors++;
					if (focusid=='') {
						focusid=id;
					}
				}
			}
			if (errors>0) {
				alert('There appear to be errors - please check the highlighted areas');
				if (focusid) $('#'+focusid).focus();
				return false;
			}
			for (var i=0;i<match.length;i++) {
				var fields=match[i];
				var value=null; // reset the value for this group
				var groupmatch=true;
				for (var j=0;j<fields.length;j++) {
					var field=fields[j];
					if (value==null) value=$('#'+field).val();
					else if ($('#'+field).val()!=value) {
						groupmatch=false;
					}
				}
				if (!groupmatch) {
					errors++;
					for (var k=0;k<fields.length;k++) {
						var field=fields[k];
						var fieldid='#'+field;
						markfield($(fieldid));
					}
				}
			}
			if (errors>0) {
				alert('There appear to be errors - please check the highlighted areas');
				if (focusid) $('#'+focusid).focus();

				return false;
			}
		});
		for (var i=0;i<nonblanks.length;i++) {
			var id=nonblanks[i];
			var field=$('#'+id);
			field.blur(function(){
				if ($(this).val()=='') {
					markfield($(this));
				}
				else {
					unmarkfield($(this));
				}
			});
		}
	});

	// bind fancybox to .modal links
	if ($(".modal").length) $(function() {
		$(".modal").fancybox({
			'transitionIn' : 'none',
			'transitionOut' : 'none',
			'titlePosition' : 'over',
			'titleShow' : true,
			'scrolling' : 'no',
			'autoDimensions' : false,
			'width' : 560,
			'height' : '97%'
		});
	});
	// bind fancybox to .modal-sized links
	if ($(".modal-sized").length) $(function() {
		$(".modal-sized").fancybox({
			'transitionIn' : 'fade',
			'transitionOut' : 'fade',
			'titlePosition' : 'over',
			'titleShow' : true,
			'scrolling' : 'no',
			'autoDimensions' : false,
			'width' : 802,
			'height' : '80%',
			'scrolling' : 'auto'
		});
	});
	if ($(".modal-setsized").length) $(function() {
		// beware - this is not well-suited to mobile viewports (if you set it too wide)!
		$(".modal-setsized").each(function(){
			var modalWidth=$(this).data('modalWidth');
			var modalHeight=$(this).data('modalHeight');
			$(this).fancybox({
				'transitionIn' : 'fade',
				'transitionOut' : 'fade',
				'titlePosition' : 'over',
				'titleShow' : true,
				'scrolling' : 'no',
				'autoDimensions' : false,
				'width' : modalWidth,
				'height' : modalHeight,
				'scrolling' : 'auto'
			});
		});
	});
	// bind fancybox to .modal-unsized links
	if ($(".modal-unsized").length) $(function() {
		$(".modal-unsized").fancybox({
			'transitionIn' : 'fade',
			'transitionOut' : 'fade',
			'titlePosition' : 'over',
			'titleShow' : true,
			'scrolling' : 'no',
			'autoDimensions' : true,
			'scrolling' : 'auto'
		});
	});
	// bind fancybox to .modal-iframe links
	if ($(".modal-iframe").length) $(function() {
		$(".modal-iframe").each(function(){
			var href = $(this).attr('href');
			href += (href.indexOf('?') < 0 ? '?' : '&');
			href = href + 'modal-iframe=true';
			if ($(this).data('modal-iframe-width')) {
				var modalIframeWidth = $(this).data('modal-iframe-width');
			}
			else {
				var modalIframeWidth = 400
			}
			if ($(this).data('modal-iframe-height')) {
				var modalIframeHeight = $(this).data('modal-iframe-height');
			}
			else {
				var modalIframeHeight = 400
			}
			$(this).fancybox({
				'href' : href,
				'transitionIn' : 'fade',
				'transitionOut' : 'fade',
				'titlePosition' : 'over',
				'titleShow' : true,
				'scrolling' : 'no',
				'autoDimensions' : false,
				'width' : modalIframeWidth,
				'height' : modalIframeHeight,
				'scrolling' : 'auto',
				'type' : 'iframe',
				'onComplete' : function(link) {
					link = $(link);
					if (link.data('modalIframeExtraheight')) {
						var modalIframeExtraheight = link.data('modalIframeExtraheight');
					}
					else {
						var modalIframeExtraheight = 30;
					}
					$('#fancybox-frame').load(function() { // wait for frame to load and then gets it's height
						$('#fancybox-content').height($(this).contents().find('body').height()+modalIframeExtraheight);
					});
				},
				'onClosed' : function(link) {
					link = $(link);
					if (link.data('fancyboxReloadPageAfterClose')) {
						window.location.reload(true);
					}
				}
			});
		});
	});
	// bind a new window to .childwin links
	if ($(".childwin").length) $(function() {
		$(".childwin").click(function(e){
			e.preventDefault();
			newwindow=window.open($(this).attr('href'),'printquiz','status=yes,resizable=yes,scrollbars=yes,height=750,width=600');
			if (window.focus) newwindow.focus();
		});
	});

	// add play buttons to audio snippets
	$('.audio-snippet').each(function(){audioSnippet($(this));});

	// handle callstoactionbar tabs
	// don't do any of this if there's only one tab
	if ($('.js__callstoactionbar--site-desktop').length && $('.callstoactionbar__tab-nav').length > 1) {
		function switchToTab($tab){
			$('.callstoactionbar__tab-nav').each(function(){
				$(this).removeClass('callstoactionbar__tab-nav--current');
			});
			$('.callstoactionbar__tab-content').each(function(){
				$(this).hide();
			});
			target=$tab.attr('href');
			$(target).show();
			$tab.addClass('callstoactionbar__tab-nav--current');

		}
		tabNotYetSelected = true;
		$('.callstoactionbar__tab-nav')
			.each(function(){
				$(this).click(function($e){
					$e.preventDefault();
					switchToTab($(this));
					$('html, body').animate({
	        			scrollTop: $(this).offset().top
	    			}, 500);
				});
				if (window.location.hash == '#'+$(this).attr('id')) {
					$(this).click();
					tabNotYetSelected = false;
				}
			})
		;
		if (tabNotYetSelected) {
			switchToTab($('.callstoactionbar__tab-nav').first());
		}
		$('.js__callstoactionbar__button--join-us').each(function(){
			$(this).click(function($e){
				$e.preventDefault();
				$('#callstoactionbar__tab-nav--join-us').click();
			});
		});
	}

	// fancybox youtube - see http://fancybox.net/blog
	$('.js__fancybox-youtube').each(function(){$(this).click(function() {
		$.fancybox({
				'padding'		: 0,
				'autoScale'		: false,
				'transitionIn'	: 'none',
				'transitionOut'	: 'none',
				'title'			: this.title,
				'width'		: 640,
				'height'		: 390,
				'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/')+'?autoplay=1',
				'type'			: 'swf',
				'swf'			: {
			   		 'wmode'		: 'transparent',
					'allowfullscreen'	: 'true'
				}
			});return false;});
	});
});

function audioSnippet(audioHolder) {
	audio = audioHolder.children('audio:first');
	if (audio.get(0).canPlayType) {
		gender = audioHolder.data('gender');
		// if there is already a buttton, use it instead of adding another
		buttons = audioHolder.children('button.audio-snippet-button');
		if (buttons.size()) {
			button = buttons.first();
		}
		else {
			button = $('<button type="button" class="audio-snippet-button audio-snippet-button-'+gender+'" title="Play '+gender+' sample">Play '+gender+' sample</button>');
			audioHolder.append(button);
		}
		button.click(function(e){
			e.preventDefault(); // this prevents the click bubbling through to the ancestor <label> and acting as though the user has answered the question
			audio = $(this).siblings('audio:first');
			audio.get(0).play();
		});
	}
}

$(window).load(function() {
	// it appears that the heights are determined prior to the @font-face font being applied, thus they are wrong. window.load is later than document.ready, so it works OK
	// equal-height side-by-side items
	if ($('.matchheights').length) {
		$('.matchheights').each(function(){$(this).children().equalHeights();});
	}
});


/**
 * Equal Heights Plugin
 * Equalize the heights of elements. Great for columns or any elements
 * that need to be the same size (floats, etc).
 * 
 * Version 1.0
 * Updated 12/10/2008
 *
 * Copyright (c) 2008 Rob Glazebrook (cssnewbie.com) 
 *
 * Usage: $(object).equalHeights([minHeight], [maxHeight]);
 * 
 * Example 1: $(".cols").equalHeights(); Sets all columns to the same height.
 * Example 2: $(".cols").equalHeights(400); Sets all cols to at least 400px tall.
 * Example 3: $(".cols").equalHeights(100,300); Cols are at least 100 but no more
 * than 300 pixels tall. Elements with too much content will gain a scrollbar.
 * 
 * 
 * TJS revision 1.1
 * 2010-06-14
 * Solves the problem of height-matching an element that has padding and/or border, with one that has no padding and/or border. 
 * It inspects the outerHeight rather than the height, but adjusts only the height by whatever shortfall was found.
 */
(function($) {
	$.fn.equalHeights = function(minHeight, maxHeight) {
		tallest = (minHeight) ? minHeight : 0;
		this.each(function() {
			if($(this).outerHeight() > tallest) {
				tallest = $(this).outerHeight();
			}
		});
		if((maxHeight) && tallest > maxHeight) tallest = maxHeight;
		return this.each(function() {
			shortfall=tallest-$(this).outerHeight();
			targetheight=$(this).height()+shortfall;
			$(this).height(targetheight)/*.css("overflow","hidden")*/;/* overflow:auto triggers scrollbars upon :active of a link */
		});
	}
})(jQuery);

function markfield(field) {
	var parent=field.parent();
	parent.addClass('form__error-holder--error');
	parent.siblings('.form__error-indicator').addClass('form__error-indicator--error');
	field.change(function(){
		if ($(this).val()!='') {
			unmarkfield($(this));
		}
	});
}
function unmarkfield(field) {
	var parent=field.parent();
	parent.removeClass('form__error-holder--error');
	parent.siblings('.form__error-indicator').removeClass('form__error-indicator--error');
	field.change(function(){
		if ($(this).val()=='') {
			markfield($(this));
		}
	});
}
