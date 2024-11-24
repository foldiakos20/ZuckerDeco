;(function(window, angular) {

  'use strict';

  // Application user module
  angular.module('app_user', [
		'app.common'
	])

	// User factory
  .factory('user', [
    '$rootScope',
    '$timeout',
		'http',
		'util',
    ($rootScope, $timeout, http, util) => {

			// Set user properties
			$rootScope.user = {
				id: null,
				type: null,
				type_name: null,
				name: null,
				born: null,
				gender: null,
				address: null,
				country_code: null,
				phone: null,
				email: null
			};

			// Set user shopping cart
			$rootScope.cart = [];

			// Set keys to save in local storige
			let keys = ['id', 'email'];

			// Set service
      let service = {

				// Get key
				getKey: (key) => [$rootScope.app.id, 'user', key].join('_'),

				// Get/Set user properties from local storage
				get: () => {
					return new Promise((resolve) => {
						keys.forEach(key => {
							let data = window.localStorage.getItem(service.getKey(key));
							if (data) {
								if (key === 'id')
											$rootScope.user[key] = parseInt(data);
								else	$rootScope.user[key] = data; 
							} else 	$rootScope.user[key] = null;
						});
						$rootScope.$applyAsync();
						resolve();
					});
				},

				getEmail: () => {
					return window.localStorage.getItem(service.getKey('email'));
				},

				// Get/Set user properties
				user: () => {
					return new Promise((resolve, reject) => {

						// Http request
						http.request({
							url: `./php/get_user.php`,
							data: {id: $rootScope.user.id}
						})
						.then(response => {
							response.born = moment(response.born).toDate();
							Object.keys(response).forEach(key => {
								$rootScope.user[key] = response[key];
							});
							$rootScope.$applyAsync();
							resolve();
						})
						.catch(e => {
							$timeout(() => {
								alert(e);
								reject();
							}, 50);
						});
					});
				},

				// Get shopping cart
				cart: () => {
					return new Promise((resolve, reject) => {

						// Http request
						http.request({
							url: `./php/get_cart.php`,
							data: {id: $rootScope.user.id}
						})
						.then(response => {
							$rootScope.cart = response;
							$rootScope.$applyAsync();
							resolve();
						})
						.catch(e => {
							$timeout(() => {
								alert(e);
								reject();
							}, 50);
						});
					});
				},

				// Save user properties to local storage
				save: (filter=null) => {
					if (util.isString(filter))
						filter = filter.replaceAll(';',',').split(",").filter(e => e);
					if (!util.isArray(filter)) filter = []; 
					keys.forEach(k => {
						if (!filter.includes(k)) {
							if ($rootScope.user[k])
										window.localStorage.setItem(
											service.getKey(k), $rootScope.user[k]);
							else	window.localStorage.removeItem(service.getKey(k));
						}
					});
				},

				// Reset
				reset: () => {
					return new Promise((resolve) => {
						Object.keys($rootScope.user).forEach((k) => {
							if (k !== 'email') $rootScope.user[k] = null;
						});

						// Set global cart
						$rootScope.cart = [];
						$rootScope.$applyAsync();
						resolve();
					});
				}
			};

			// Logout
			$rootScope.logout = () => {

				// Reset asynchronous
				$timeout(() => {

					// Confirm
					if (confirm('Biztosan ki akar jelentkezni?')) {

						// Remove user id from localstorige
						window.localStorage.removeItem(service.getKey('id'));

						// Reset user properties
						service.reset().then(() => {

							// Check ignored states
							$rootScope.goToPreviousState();
						});
					}
				}, 300);
			};

			// Return service
      return service;
		}
	]);

})(window, angular);