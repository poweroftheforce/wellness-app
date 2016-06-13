'use strict';

(function() {

	class TemplateSection {

		constructor( $resource ) {
			this.$resource = $resource;
			return $resource('/api/templates/:template_id/sections/:id', { id: '@_id', template_id: '@template_id' }, {
				update: {
					method: 'PUT'
				}
			});
		}
	};

	angular.module( 'wellnessPlanApp' ).service( 'TemplateSection', TemplateSection );
})();
