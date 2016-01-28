'use strict';

angular.module('wellnessPlanApp')
  .directive('planPreview', function () {
    return {
      restrict: 'E',
      link: function(scope, element) {
        element.addClass('row');

        	//set up loop! 

        	function pagedContent() {
        		// Gather initial data.	
						var ln = $('.section-wrapper').length;
						

						for (var i = 0; i < ln; i++) {
						  var section = $($('.section-wrapper')[i]);
						  
						 	removeOverflow(section);
						}
        	}

        	function removeOverflow(section) {

					  // If content overflows, add new page.
					  var page = $(section.children('.plan-page').last().children('.plan-page-body'));
					  var pageBodyHeight = page.parent().height();
					  var pageHeight = page.height();
					  if (pageHeight > pageBodyHeight) {

					    $(section).append('<div class="plan-page"><div class="plan-page-body"></div></div>');

					    // As long as the content is overflowing, push it down to the top of the next page.
					    while (pageHeight > pageBodyHeight) {
					      $(page).children().last().prependTo($(page).parent().next('.plan-page').children('.plan-page-body'));

					      // update height
					      var pageHeight = $(page).height();
					    }
					    removeOverflow(section); // <= Recursion Mothafucka
					  }
					  // If the last page has no overflow, it's done!
					}

        	setTimeout(function() {
        		pagedContent();
        	}, 1000);
      }
    };
  });