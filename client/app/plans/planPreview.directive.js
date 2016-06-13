'use strict';

angular.module( 'wellnessPlanApp' ).directive('planPreview', function () {
		return {
			restrict: 'E',
			// templateUrl: 'app/plans/planPreview.html',
			link: function( scope, element ) {
				element.addClass( 'row' );

				function previewInit() {
					var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
						pages = $( '.plan-page' ),
						firstPage = pages.first();

					for ( var i=0; i<pages.length; i++ ) {
						$( pages[ i ] ).children( '.plan-page-number' ).html( i + 1 );
						//$( pages[ i ] ).append( $( '<div class="plan-page-number">' + ( i + 1 ) + '</div>' ) );
					}

					// Animate first page.
					$(firstPage).addClass('animated fadeInDown').one(animationEnd, function() {
						$(firstPage).css('opacity', 1);
						$(firstPage).removeClass('animated fadeInDown');
					});
				};

				function transferChildren( $page, $nextPage, $tmpSection ) {

					var $lastChild		= $page.children().last(),
						$tmpLastChild	= $tmpSection.find( '.plan-page-content' ).children().last(),
						$pageBody		= $tmpSection.find( '.plan-page-body' ),

						pageHeight		= $tmpSection.find( '.plan-page' ).outerHeight(),
						bodyHeight		= $pageBody.outerHeight();

					$lastChild.prependTo( $nextPage );
					$tmpLastChild.remove();

					if ( bodyHeight > pageHeight ) {
						transferChildren( $page, $nextPage, $tmpSection );
					}

				};

				function checkPageHeight( $section, $tmpSection, i ) {

					var $page			= $section.children( '.plan-page:eq(' + i + ')' ),
						$clone			= $page.clone( true );

					$tmpSection.append( $clone );

					var $tmpPage		= $tmpSection.find( '.plan-page:eq(' + i + ')' ),
						$pageContent	= $page.find( '.plan-page-content' ),
						$tmpBody		= $tmpPage.find( '.plan-page-body' ),
						pageHeight		= $tmpPage.outerHeight(),
						bodyHeight		= $tmpBody.outerHeight();

					if ( bodyHeight > pageHeight ) {
						/*
							if the height of the content exceeds the height of the container (the page)
							then transfer the trailing / overlapping children onto a newly created page / section.
							When finished, check the height of the current page again and repeat.
						*/
						var $newSection		= $section.after( '<div class="section-wrapper ng-scope" ng-repeat="section in vm.templateSections | orderBy:\'order\'"/>' ),
							$newPage		= $( '<div class="plan-page ng-scope" ng-if="section.title != \'Front\' &amp;&amp; section.title != \'Compounding Pharmacy List\' &amp;&amp; section.title != \'Supplement Store\' &amp;&amp; section.title != \'Social Media\' &amp;&amp; !section.has_extras" style="opacity: 0; z-index: 0;"/>' ).appendTo( $newSection ),
							$newPageBody	= $( '<div class="plan-page-body"/>' ).appendTo( $newPage ),
							$content		= $( '<div class="plan-page-content"/>' ).appendTo( $newPageBody );

						transferChildren( $pageContent, $content, $tmpSection );

						i++;
						checkPageHeight( $section, $tmpSection, i );

					}

				};

				function checkSection( $section ) {

					if ( !$section[ 0 ] ) {
						return false;
						clog( 'section not found: exiting' );
					}

					var $tmpWrapper		= $( '<div id="tmp-wrapper"/>' ),
						$tmpSection		= $( '<div class="plan-wrapper tmp-wrapper" style="height:auto;"/>' ).appendTo( $tmpWrapper );


					$( '#plan-wrapper' ).after( $tmpWrapper );

					checkPageHeight( $section, $tmpSection, 0 );
					$tmpSection.remove();
				};



				setTimeout(function() {

					$.each( $( '#plan-wrapper > .section-wrapper' ), function() {

						checkSection( $( this ) );

						var $page = $( this ).children( '.plan-page' );

						$.each( $page, function() {
							if ( !$( this ).children( '.plan-page-number')[ 0 ] ) {
								$( this ).append( '<div class="plan-page-number"></div>' );
							}
						});
					});
					
					previewInit();
				}, 500);
			}
		};
});
