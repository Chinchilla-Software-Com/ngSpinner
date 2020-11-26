var spinner = function () {
	return {
		replace: false,
		templateNamespace: "svg",
		scope: {
			spinnerStyle: "@",
			spinnerName: "@"
		},
		// NOTE: ng-attr- style binding is used to prevent SVG validation
		// error messages.
		template: function (tElement, tAttrs) {
			var progress = '<div class="spinner-progress"><span>{{ (progress == 0) ? "" : progress + " %" }}</span></div>';
			var expando = ['<svg class="spinner-circular" viewBox="25 25 50 50">',
				'<circle class="spinner-path" fill="none" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="20" />',
				'</svg>',
				progress
			].join('');
			var dotty = ['<div><div class="dotty"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>',
				progress
			].join('');
			switch (tAttrs.spinnerStyle) {
				case "dotty":
					return dotty;
				default:
					return expando;
			}
		},
		restrict: 'CEA',
		link: ["$scope", "el", "attrs", function ($scope, el, attrs) {
			$scope.progress = 0;
			$scope.$on("spinner-progress-updated", function (newProgress) {
				$scope.progress = newProgress;
			});
		}],
		compile: function (tElement, tAttrs) {
			// this is link function
			return function (scope) {
				scope.spinnerName = tAttrs.spinnerName;
				scope.progress = 0;
				scope.$on("spinner-progress-updated", function (event, newValue) {
					if (scope.spinnerName == newValue.spinnerName || newValue.spinnerName == null || newValue.spinnerName == "")
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