'use strict';

(function() {

/**
 * The Util service is for thin, globally reusable, utility functions
 */
function UtilService($window) {
	var Util = {
		/**
		 * Return a callback or noop function
		 *
		 * @param  {Function|*} cb - a 'potential' function
		 * @return {Function}
		 */
		safeCb(cb) {
			return (angular.isFunction(cb)) ? cb : angular.noop;
		},

		/**
		 * Parse a given url with the use of an anchor element
		 *
		 * @param  {String} url - the url to parse
		 * @return {Object}     - the parsed url, anchor element
		 */
		urlParse(url) {
			var a = document.createElement('a');
			a.href = url;
			return a;
		},

		/**
		 * Test whether or not a given url is same origin
		 *
		 * @param  {String}           url       - url to test
		 * @param  {String|String[]}  [origins] - additional origins to test against
		 * @return {Boolean}                    - true if url is same origin
		 */
		isSameOrigin( url, origins ) {
			url = Util.urlParse( url );
			origins = ( origins && [].concat( origins ) ) || [];
			origins = origins.map( Util.urlParse );
			origins.push( $window.location );
			origins = origins.filter(function( o ) {
				return url.hostname === o.hostname && url.port === o.port && url.protocol === o.protocol;
			});
			return ( origins.length >= 1 );
		},

		/**
		 * Slide out old background and slide in new one.
		 *
		 * @param  {String}           url       - url of new image
		 */
		 changeBackground() {
			var backgrounds = [
				'url(../assets/images/seasons_backdrop_1.jpg)',
				'url(../assets/images/seasons_backdrop_2.jpg)',
				'url(../assets/images/seasons_backdrop_3.jpg)'
			];

			// gets current background
			var bg = $( '.site-bg' ).css( 'background-image' );

			// finds index of current background
			var idx = bg.split( 'backdrop_' )[ 1 ][ 0 ] - 1;

			// increases or resets index of background
			if ( idx < backgrounds.length - 1 ) {
				idx++;
			} else {
				idx = 0;
			}

			$( '.site-bg' ).css( 'background-image', backgrounds[ idx ] );
		}
	};

	return Util;
}

angular.module( 'wellnessPlanApp.util' ).factory( 'Util', UtilService );

})();
