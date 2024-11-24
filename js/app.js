;(function(window, angular) {

  'use strict';

  // Application module
  angular.module('app', [
    'ui.router',
		'app.common',
		'app_user'
  ])

  // Application config
  .config([
    '$stateProvider', 
    '$urlRouterProvider', 
    ($stateProvider, $urlRouterProvider) => {

      $stateProvider
      .state('root', {
				abstract: true,
				views: {
					'@': {
						templateUrl: './html/root.html'
					},
					'header_top@root': {
						templateUrl: './html/header_top.html'
					},
					'header_nav@root': {
						templateUrl: './html/header_nav.html'
					},
					'footer@root': {
						templateUrl: './html/footer.html'
					}
				}
      })
			.state('home', {
				url: '/',
				parent: 'root',
				templateUrl: './html/home.html'
			})
			.state('presing_lenke', {
				url: '/presing_lenke',
				parent: 'root',
				templateUrl: './html/presing_lenke.html'
			})
      .state('galeria', {
				url: '/galeria',
				parent: 'root',
				templateUrl: './html/galeria.html',
				controller: 'galeriaController',
				params: {type: null},
			})
     	.state('eskuvocukor', {
				url: '/eskuvocukor',
				parent: 'root',
				templateUrl: './html/uder_construction.html'
			})
      .state('figurak', {
				url: '/figurak',
				parent: 'root',
				templateUrl: './html/under_construction.html'
			})
      .state('Naszparok', {
				url: '/Naszparok',
				parent: 'root',
				templateUrl: './html/under_construction.html'
			})
			.state('Tortak', {
				url: '/Tortak',
				parent: 'root',
				templateUrl: './html/under_construction.html'
			})
			.state('Sutemenyek', {
				url: '/Sutemenyek',
				parent: 'root',
				templateUrl: './html/under_construction.html'
			})
			.state('Karamell-cukrok', {
				url: '/Karamell-cukrok',
				parent: 'root',
				templateUrl: './html/uder_construction.html'
			})
      .state('bolt', {
				url: '/bolt',
				parent: 'root',
				templateUrl: './html/bolt.html',
				controller:'boltController'
			})
			.state('termek', {
				url: '/termek',
				parent: 'root',
				templateUrl: './html/termek.html'
			})
			.state('order', {
				url: '/order',
				parent: 'root',
				templateUrl: './html/order.html',
				controller:'orderController'
			})
			.state('Kapcsolat', {
				url: '/Kapcsolat',
				parent: 'root',
				templateUrl: './html/Kapcsolat.html',
				controller:'Kapcsolatcontroller'
			})
      .state('receptek', {
				url: '/receptek',
				parent: 'root',
				templateUrl: './html/receptek.html'
			})
      .state('megosztas', {
				url: '/megosztas',
				parent: 'root',
				templateUrl: './html/under_construction.html',
				controller: 'megosztasController',
			})
      .state('vasarlas', {
				url: '/vasarlas',
				parent: 'root',
				templateUrl: './html/vasarlas.html'
			})
			.state('Kosar', {
				url: '/Kosar',
				parent: 'root',
				templateUrl: './html/Kosar.html',
				controller: 'kosarController',
			})
			.state('fejlesztok', {
				url: '/fejlesztok',
				parent: 'root',
				templateUrl: './html/fejlesztok.html'
			})
      .state('login', {
				url: '/login',
				parent: 'root',
				group: 'user',
				templateUrl: './html/login.html',
				controller: 'loginController',
			})
			.state('register', {
				url: '/register',
				parent: 'root',
				group: 'user',
				templateUrl: './html/register.html',
				controller: 'registerController',
			})
      .state('profile', {
				url: '/profile',
				parent: 'root',
				group: 'user',
				templateUrl: './html/profile.html',
				controller: 'profileController',
			});
			
      
      $urlRouterProvider.otherwise('/');
    }
  ])

	.filter('sumTotal', [
    'util',
    function(util) {
      return function(data) {
        let total = 0;
        if (util.isArray(data) && data.length) {
          data.forEach((item) => {total += Number(item.total)});
        } 
        return total;
      };
    }
  ])

  // Application run
  .run([
    '$rootScope',
    'trans',
		'user',
    ($rootScope, trans, user) => {

      // Transaction events
			trans.events({
				name: 'Kosar,order',
				group: 'user',
			});

			// Get user
			user.get().then(() => {

				// Check user exist
				if ($rootScope.user.id) {

					// Get/Set user properties
					user.user().then(() => {

						// Get/Set user cart properties
						user.cart();
					});
				}
			});
    }
  ])

	// Galéria controller
  .controller('galeriaController', [
		'$state',
		'$stateParams',
    '$scope',
		'http',
    function($state, $stateParams, $scope, http) {

			// Check state params
			if (!$stateParams.type) {
				$state.go('home');
				return;
			}

			// Set item index
			$scope.itemIndex = -1;

			// Set title
			switch($stateParams.type) {
				case 'Cukorviragdisz':
					$scope.title = 'Cukorvirágdíszek';
					break;
				case 'Eskuvocukor':
					$scope.title = 'Esküvői díszek';
					break;
				case 'Figurak':
					$scope.title = 'Figurák';
					break;
				case 'Naszparok':
					$scope.title = 'Nászpárok';
					break;
				case 'Sutemenyek':
					$scope.title = 'Sütemények';
					break;
				case 'Tortak':
					$scope.title = 'Torták';
					break;
				case 'Karamell-cukrok':
					$scope.title = 'Karamell cukrok';
					break;
				default:
					$scope.title = $stateParams.type;
			}

			// Http request
			http.request({
				url: './php/galeria.php',
				data: {type: $stateParams.type}
			})
			.then(response => {

				// Set response
				$scope.data = response;

				// Apply changes
				$scope.$applyAsync();
			})
			.catch(e => {

				// Reset asynchronity
				$timeout(() => {

					// Informing the user
					alert(e);
				}, 50);
			});

			// Set scope methods
			$scope.methods = {

				// Item clicked
				itemClicked: (event) => {
					let element = event.currentTarget;
					if (element) {
						let index = element.dataset.index;
						if (index) {
							index = parseInt(index);
							if (!isNaN(index)) {
								$scope.itemIndex = index;
								$scope.$applyAsync();
							}
						}
					}
				},

				// Change image
				changeImage: (event) => {
					let element = event.currentTarget;
					if (element) {
						if (element.classList.contains('fa-angle-right')) {
							if ($scope.itemIndex < $scope.data.length - 1)
										$scope.itemIndex++;
							else	$scope.itemIndex = 0;
						} else {
							if ($scope.itemIndex > 0)
										$scope.itemIndex--;
							else	$scope.itemIndex = $scope.data.length - 1;
						} 
						$scope.$applyAsync();
					}
				}
			};
		}
	])

	// Login controller
  .controller('loginController', [
    '$state',
    '$rootScope',
    '$scope',
    '$timeout',
    '$element',
    'http',
    'util',
		'user',
    function($state, $rootScope, $scope, $timeout, $element, http, util, user) {
			
      // Set methods
      let methods = {

        // Initialize
        init: () => {

          // Set model
			    $scope.model = {email: user.getEmail()};
					console.log($scope.model);

          // Set focus
          methods.focus();
        },

        // Set focus
				focus() {
					$timeout(() => {
						let inputs = $element[0].querySelectorAll(
															`form[name="loginForm"] input:not(:disabled), 
															 form[name="loginForm"] textarea:not(:disabled)`);
						if (inputs.length) {
							let invalids = [...inputs].filter(e => e.classList.contains('ng-invalid'));
							if (invalids.length) 
										invalids[0].focus();
							else	inputs[0].focus();
						}
					}, 50);
				},
      };

      // Set scope methods
      $scope.methods = {

        // Accept
        accept: () => {
          
          // Get neccesary input properties
					let args = util.objFilterByKeys($scope.model, [
            'passwordShow',
          ], false);

          // Http request
          http.request({
            url 	: `./php/login.php`,
            data 	: args
          })
          .then(response => {

            // Convert born to date type
						response.born = moment(response.born).toDate();
						response.email = args.email;
            
            // Set user
						$rootScope.user = util.objMerge($rootScope.user, response, true);

						// Save user properties to local storage
						user.save();

						// Get/Set user cart properties
						user.cart().then(() => {

							// Apply change
							$rootScope.$applyAsync();

							// Go to prevent enabled state, or to home
							$scope.methods.cancel();
						});
          })
          .catch(error => {

            // Reset password
            $scope.model.password = null;

            // Apply change
						$rootScope.$applyAsync();

            // Reset asynchronous
            $timeout(() => {

              // Show error
              alert(error);
              
              // Set focus
              methods.focus();
            }, 50)
          });
        },

        // Cancel
        cancel: () => {

          // Go to prevent enabled state, or to home
					if ($rootScope.state.prevEnabled)
                $state.go($rootScope.state.prevEnabled);
          else	$state.go('home');
        },

        // Show/Hide password
				showHidePassword: (event) => {
					let element = event.currentTarget;
					if (element) {
						let form = element.closest('form');
						if (form) {
							let passwords = form.querySelectorAll('.input-password');
							if (passwords.length) {
								passwords.forEach(e => {
									e.type = $scope.model.passwordShow ? 'text' : 'password';
								});
							}
						}
					}
				},
      };

      // Initialize
      methods.init();
		}
	])

	// Register controller
  .controller('registerController', [
    '$state',
    '$rootScope',
    '$scope',
    '$timeout',
    '$element',
    'http',
    'util',
    function($state, $rootScope, $scope, $timeout, $element, http, util) {
			
      // Set methods
      let methods = {

        // Initialize
        init: () => {

          // Set helper
					$scope.helper = {
						maxBorn: moment().subtract(18, 	'years').format('YYYY-MM-DD'),
						minBorn: moment().subtract(120, 'years').format('YYYY-MM-DD')
					};

          // Set focus
          methods.focus();
        },

        // Set focus
				focus() {
					$timeout(() => {
						let inputs = $element[0].querySelectorAll(
															`form[name="registerForm"] input:not(:disabled), 
															 form[name="registerForm"] textarea:not(:disabled)`);
						if (inputs.length) {
							let invalids = [...inputs].filter(e => e.classList.contains('ng-invalid'));
							if (invalids.length) 
										invalids[0].focus();
							else	inputs[0].focus();
						}
					}, 50);
				},
      };

      // Set scope methods
      $scope.methods = {

        // Accept
        accept: () => {
          
          // Get neccesary input properties
					let args = util.objFilterByKeys($scope.model, [
            'passwordShow',
          ], false);

          // Convert date to string
          args.born = moment(args.born).format('YYYY-MM-DD');

          // Http request
          http.request({
            method: 'POST',
            url 	: `./php/register.php`,
            data 	: args
          })
          .then(response => {

            // Convert to date type
            args.born = moment(args.born).toDate();

            // Set user identifier, default type, and type name.
            args['id'] 				= response['id'];
						args['type'] 			= 'U';
						args['type_name'] = 'felhasználó';
            
            // Set user
						$rootScope.user = util.objMerge($rootScope.user, args, true);

						// Save user properties to local storage
						user.save();

            // Apply change
						$rootScope.$applyAsync();

            // Reset asynchronous
            $timeout(() => {

              // Show message
              alert('Köszönjük, hogy regisztrált weboldalunkra!');

              // Go to prevent enabled state, or to home
              $scope.methods.cancel();

            }, 50);
          })
          .catch(error => {

            // Reset password
            $scope.model.password = null;

            // Apply change
						$rootScope.$applyAsync();

            // Reset asynchronous
            $timeout(() => {

              // Show error
              alert(error);
              
              // Set focus
              methods.focus();
            }, 50);
          });
        },

        // Cancel
        cancel: () => {

          // Go to prevent enabled state, or to home
					if ($rootScope.state.prevEnabled)
                $state.go($rootScope.state.prevEnabled);
          else	$state.go('home');
        },

        // Show/Hide password
				showHidePassword: (event) => {
					let element = event.currentTarget;
					if (element) {
						let form = element.closest('form');
						if (form) {
							let passwords = form.querySelectorAll('.input-password');
							if (passwords.length) {
								passwords.forEach(e => {
									e.type = $scope.model.passwordShow ? 'text' : 'password';
								});
							}
						}
					}
				},
      };

      // Initialize
      methods.init();
		}
	])
    
	//Kapcsolatcontroller
	.controller('Kapcsolatcontroller', [
  '$scope',
  '$timeout',
  'http',
	'util',
    function($scope, $timeout, http, util) {

      // Send
			$scope.kuld = () => {
				
				// Get neccesary input properties
				let args = util.objFilterByKeys($scope.model, [
					'roole',
					'table'
				], false);

				// Request to the server
				http.request({
					url: './php/offers.php',
					data: args
				})
				.then(response => {

					$timeout(() => { 
						alert(response); 
					}, 50);
				})
				.catch(e => $timeout(() => { alert(e); }, 50));

			};
        }
  ])

  // Profile controller
  .controller('profileController', [
    '$state',
    '$rootScope',
    '$scope',
    '$timeout',
    '$element',
    'http',
    'util',
    function($state, $rootScope, $scope, $timeout, $element, http, util) {
			
      // Set methods
      let methods = {

        // Initialize
        init: () => {

          // Set helper
					$scope.helper = {
						maxBorn: moment().subtract(18, 	'years').format('YYYY-MM-DD'),
						minBorn: moment().subtract(120, 'years').format('YYYY-MM-DD')
					};

          // Set focus
          methods.focus();
        },

        // Set focus
				focus() {
					$timeout(() => {
						let inputs = $element[0].querySelectorAll(
															`form[name="profileForm"] input:not(:disabled), 
															 form[name="profileForm"] textarea:not(:disabled)`);
						if (inputs.length) {
							let invalids = [...inputs].filter(e => e.classList.contains('ng-invalid'));
							if (invalids.length) 
										invalids[0].focus();
							else	inputs[0].focus();
						}
					}, 50);
				},
      };

      // Set scope methods
      $scope.methods = {

        // Accept
        accept: () => {
          
          // Get neccesary input properties
					let args = util.objFilterByKeys($scope.model, [
            'passwordShow',
            'type_name'
          ], false);

          // Convert date to string
          args.born = moment(args.born).format('YYYY-MM-DD');

          // Add user identifier to arguments
					args['id'] = $rootScope.user.id;

          // Http request
          http.request({
            method: 'POST',
            url 	: `./php/profile.php`,
            data 	: args
          })
          .then(() => {

            // Convert to date type
            args.born = moment(args.born).toDate();
            
            // Set user
						$rootScope.user = util.objMerge($rootScope.user, args, true);

            // Apply change
						$rootScope.$applyAsync();

            // Reset asynchronous
            $timeout(() => {

              // Show message
              alert('Az Ön adatait sikeressen módosítottuk!');

              // Go to prevent enabled state, or to home
              $scope.methods.cancel();

            }, 50);
          })
          .catch(error => {

            // Reset asynchronous
            $timeout(() => {

              // Show error
              alert(error);
              
              // Set focus
              methods.focus();
            }, 50);
          });
        },

        // Cancel
        cancel: () => {

          // Go to prevent enabled state, or to home
					if ($rootScope.state.prevEnabled)
                $state.go($rootScope.state.prevEnabled);
          else	$state.go('home');
        },

        // Show/Hide password
				showHidePassword: (event) => {
					let element = event.currentTarget;
					if (element) {
						let form = element.closest('form');
						if (form) {
							let passwords = form.querySelectorAll('.input-password');
							if (passwords.length) {
								passwords.forEach(e => {
									e.type = $scope.model.passwordShow ? 'text' : 'password';
								});
							}
						}
					}
				},
      };

      // Initialize
      methods.init();
		}
	])

	// Bolt controller
  .controller('boltController', [
		'$rootScope',
    '$scope',
		'$timeout',
		'http',
    function($rootScope, $scope, $timeout, http) {

			// Get products
			http.request('./php/products.php')
			.then(response => {

				// Set types, and data
				$scope.types	= response.types;
				$scope.data 	= response.data;
				$scope.$applyAsync();
			})
			.catch(e => $timeout(() => { alert(e); }, 50));

			$scope.model = {};
			$scope.setModal = (item) => {
				$scope.item = item;
				$scope.model.quantity = 1;
				$scope.model.total = item.price;
				$scope.$applyAsync();
			};

			$scope.sumTotal = () => {
				$scope.model.total = $scope.item.price * $scope.model.quantity;
			};

			$scope.itemToCart = () => {
				if (!$rootScope.user.id) {
					$timeout(() => {alert('Be kell jelenkeznie!')}, 100);
					return;
				}

				// Set arguments
				let args = {
					user_id 		: $rootScope.user.id,
					product_id 	: $scope.item.id,
					quantity 		: $scope.model.quantity,
					price 			: $scope.item.price
				};
				
				// Http request
				http.request({
					url: `./php/add_cart.php`,
					data: args
				})
				.then(response => {
					$rootScope.cart = response;
					$rootScope.$applyAsync();
				})
				.catch(e => {
					$timeout(() => {
						alert(e);
					}, 50);
				});
			};
		}
	])

	.controller('kosarController', [
		'$rootScope',
    '$scope',
		'$timeout',
		'http',
		'util',
    function($rootScope, $scope, $timeout, http, util) {

			// Table header
			$scope.header = {
				name: "Termék",
				price: "Egységár (Ft)",
				quantity: "Mennyiség (db)",
				total: "Össesen (Ft)"
			};

			// Get current date
      let currentDate 	= new Date(),
					currentYear 	= currentDate.getFullYear(),
					currentMonth 	= currentDate.getMonth();

			// Set years
      $scope.years = 	Array.from({length: 11}, 
                        (_, i) => currentYear + i);

      // Set months
      $scope.months = [
        "Január",
        "Február",
        "Március",
        "Április",
        "Május",
        "Június",
        "Július",
        "Augusztus",
        "Szeptember",
        "Október",
        "November",
        "December",
      ];

			// Reset model
			let resetModel = (msg=null) => {
				Object.keys($scope.model).forEach((k) => {
					$scope.model[k] = null;
				});
				if (msg) {
					$timeout(() => {
						alert(msg);
					}, 50);
				}
			};

			// Remove item
			$scope.torol = (item) => {
				if (!confirm('Biztos eltávolítja a kosárból?')) return;

				// Set arguments
				let args = {
					user_id 		: $rootScope.user.id,
					product_id 	: item.product_id,
					quantity 		: item.quantity,
					price 			: item.price
				};

				// Http request
				http.request({
					url: `./php/remove_cart.php`,
					data: args
				})
				.then(response => {
					$rootScope.cart = response;
					$rootScope.$applyAsync();
				})
				.catch(e => {
					$timeout(() => {
						alert(e);
					}, 50);
				});
			};
			
			// Set order
			$scope.vasarlas = () => {

				// Check credit card expiration
				let month = $scope.months.indexOf($scope.model.month);
				if ($scope.model.year === currentYear &&
						month < currentMonth) {
					resetModel('A hitelkártya lejárt!');
					return;
				}

				let totalElement = document.querySelector('table tfoot th#total');
				if (!totalElement) {
					resetModel('Mindösszesen elem hiányzik!');
					return;
				} 
				let total = parseInt(totalElement.innerText.replace(/\s/g,''));
				if (isNaN(total)) {
					resetModel('Mindösszesen érték hibás!');
					return;
				}

				// Set expiration date
				let expiration = 	$scope.model.year + '/' + 
													(month+1).toString().padStart(2,"0");

				// Set arguments
				let args = {
					user_id 		: $rootScope.user.id,
					card_number : $scope.model.cardNumber,
					expiration 	: expiration,
					cvv 				: $scope.model.cvv,
					total 			: total
				};

				// Http request
				http.request({
					url: `./php/set_order.php`,
					data: {
						order:	args,
						items:	util.arrayObjFilterByKeys($rootScope.cart, 
											'product_id,quantity,price')
					}
				})
				.then(response => {
					$rootScope.cart = [];
					$rootScope.$applyAsync();
					$timeout(() => {
						alert(response);
					}, 50);
				})
				.catch(e => {
					$timeout(() => {
						alert(e);
					}, 50);
				});

				// Reset model
				resetModel();
			};
		}
	])

	.controller('orderController', [
		'$rootScope',
    '$scope',
		'$timeout',
		'http',
    function($rootScope, $scope, $timeout, http) {

			// Accordion header
			$scope.header = {
				button: {
					id: "Rendelésszám",
					items: "Tétel (db)",
					date: "Dátum",
					total: "Összeg (Ft)"
				},
				body: {
					name: "Termék",
					price: "Egységár (Ft)",
					quantity: "Mennyiség (db)",
					total: "Össesen (Ft)"
				}
			};

			// Http request
			http.request({
				url: `./php/get_orders.php`,
				data: {user_id: $rootScope.user.id}
			})
			.then(response => {
				$scope.orders = response;
				$scope.$applyAsync();
			})
			.catch(e => {
				$timeout(() => {
					alert(e);
				}, 50);
			});
		}
	]);

})(window, angular);

