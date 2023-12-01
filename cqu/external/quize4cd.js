// ?date=20120306

var suppress_scroll_quiz_save = false;

$(document).ready(function() {

	$('.position-sticky').each(function(){$(this).fixedsticky()});

    var rememberedStr = '';
    $(document).bind("mouseup", function(){
        var selObj = window.getSelection();
        rememberedStr = selObj.toString();
    });
	$('.language-trigger-search').click(function(e){
		if ($(this).attr('href')=='#') {
			e.preventDefault();
            var selObj = window.getSelection();
            var str = selObj.toString();
            if (!str) str = rememberedStr;
            if (str) {
                url=$(this).data('highlight_search_url').replace('__q__',encodeURIComponent(str.trim()));
				$.get(
				    url,
				    function(rawData) {
				        data = $.parseJSON(rawData);
				        only_url_found_is_source = data['only_url_found_is_source'];
				        next_url = data['next_url'];
				        if (only_url_found_is_source) {
				        	alert('The only page found is this one');
				        	return false;
				        }
				        else if (next_url==null) {
				        	alert('No pages were found matching your search');
				        	return false;
				        }
				        // if an error has not been encountered yet, go to the search page (which will set important session data)
		                window.location = next_url;
				    }
				);
            }
			else alert('Please select some text on the page before searching');
		}
	});

	highlight0 = $('.search-highlight').first();
	if (highlight0.length) {
		$(document).scrollTop(highlight0.first().offset().top);
	}

});
