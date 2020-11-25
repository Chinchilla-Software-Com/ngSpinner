var spinner = function () {

	return {
		replace: false,
		templateNamespace: 'svg',
		scope: {
			size: '@'
		},
		// NOTE: ng-attr- style binding is used to prevent SVG validation
		// error messages.
		template: [
			'<svg class="circular" viewBox="25 25 50 50">',
			'    <circle class="path" fill="none" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="20" />',
			'</svg>',
			'<div class="loader-progress"><span>{{ (progress == 0) ? "" : progress + " %" }}</span></div>'
		].join(''),
		restrict: 'CEA',
		link: ["$scope", "el", "attrs", function ($scope, el, attrs) {
			$scope.progress = 0;
			$scope.$on("loader-progress-updated", function (newProgress) {
				$scope.progress = newProgress;
			});
		}],
		compile: function (tElement, tAttrs) {
			// this is link function
			return function (scope) {
				scope.loaderName = tAttrs.loaderName;
				scope.progress = 0;
				scope.$on("loader-progress-updated", function (event, newValue) {
					if (scope.loaderName == newValue.loaderName || newValue.loaderName == null || newValue.loaderName == "")
						if (scope.progress != newValue.value)
							scope.progress = newValue.value;
				});
			};
		}
	}
};

angular.module("ngSpinner", []);

angular
	.module('ngSpinner')
	.directive('loader', spinner)
	.directive('spinner', spinner);