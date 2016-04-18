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
						 	removeOverflow(section, 0);
						}
        	}

        	function removeOverflow(section, idx) {
            // console.log(idx);
            if (idx > 10) {  // overflow limit to prevent infinite loop
              console.log('Error: repeating content overflow - Check format of sections');
              // need a toaster saying the section format is wrong!
            }

					  // If content overflows, add new page.
            var page = section.children('.plan-page').last();
					  var pageBody = $(page.children('.plan-page-body'));
					  var pageHeight = page.height();
					  var pageBodyHeight = pageBody.height();
            if (page.children('.plan-page-number').length <= 0) {
              page.append('<div class="plan-page-number"></div>');
            }

					  if (pageBodyHeight > pageHeight && idx <= 10 ) {
					    $(section).append('<div class="plan-page"><div class="plan-page-body"><div class="plan-page-content"></div></div></div>');

					    // As long as the content is overflowing, push it down to the top of the next page.
					    while (pageBodyHeight > pageHeight) {

                // push last child of overlowing div to the next div
					      $(pageBody).children('.plan-page-content').children().last().prependTo($(pageBody).parent().next('.plan-page').children('.plan-page-body').children('.plan-page-content'));

					      // update height
					      pageBodyHeight = $(pageBody).height();
					    }

              idx++;
              try {
					     removeOverflow(section, idx);
              }

              catch(err) {
                console.log(err);
              }
					  }
					  // If the last page has no overflow, it's done!
					}

          function previewInit() {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            var pages = $('.plan-page');
            var firstPage = pages.first();

            for (var i=0; i<pages.length; i++) {
              $(pages[i]).children('.plan-page-number').html(i+1);
              console.log();
            }

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
