'use strict';

angular.module('wellnessPlanApp')
  .directive('planPreview', function () {
    return {
      restrict: 'E',
      // templateUrl: 'app/plans/planPreview.html',
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

					  if (pageHeight > pageBodyHeight && idx < 11) {
					    $(section).append('<div class="plan-page"><div class="plan-page-body"><div class="plan-page-content"></div></div></div>');

					    // As long as the content is overflowing, push it down to the top of the next page.
              // Set overflow limit of 10 to prevent crashes
              var idx = 0;
					    while (pageHeight > pageBodyHeight) {

                // push last child of overlowing div to the next div
					      $(page).children('.plan-page-content').children().last().prependTo($(page).parent().next('.plan-page').children('.plan-page-body').children('.plan-page-content'));

					      // update height
					      var pageHeight = $(page).height();

					    }
              idx++;
					    removeOverflow(section);
					  }
					  // If the last page has no overflow, it's done!
					}

          function previewInit() {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            var firstPage = $('.plan-page').first()

            // Animate first page.
            $(firstPage).addClass('animated fadeInDown').one(animationEnd, function() {
              $(firstPage).css('opacity', 1);

              $(firstPage).removeClass('animated fadeInDown');
            });
          }

        	setTimeout(function() {
        		pagedContent();
            previewInit();
        	}, 1000);
      }
    };
  });
