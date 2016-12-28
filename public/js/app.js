
angular.module("contactsApp", ['ngRoute'])

.config(function($routeProvider,$locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    contacts: function(Contacts) {
                        return Contacts.getContacts();
                    }
                }
            })
            .when("/new/contact", {
                controller: "NewContactController",
                templateUrl: "contact-form.html"
            })
            .when("/contact/:contactId", {
                controller: "EditContactController",
                templateUrl: "contact.html"
            })
            .when("/login", {
                controller: "loginWithFacebookController",
                templateUrl: "fbprofile.html"
            })
            .otherwise({
                redirectTo: "/"
            })
        // use the HTML5 History API
        $locationProvider
            .html5Mode(false)
            .hashPrefix('!');

        // .html5Mode(true)
            // .hashPrefix('!');


    })
    .run(function($rootScope, $window) {
            $rootScope.user = {};
            $window.fbAsyncInit = function() {
                // Executed when the SDK is loaded
                FB.init({
                    /*
                     The app id of the web app;
                     To register a new app visit Facebook App Dashboard
                     ( https://developers.facebook.com/apps/ )
                     */

                    appId: '899782363404518',

                    /*
                     Adding a Channel File improves the performance
                     of the javascript SDK, by addressing issues
                     with cross-domain communication in certain browsers.
                     */

                    channelUrl: 'app/channel.html',

                    /*
                     Set if you want to check the authentication status
                     at the start up of the app
                     */

                    status: true,

                    /*
                     Enable cookies to allow the server to access
                     the session
                     */

                    cookie: true,

                    /* Parse XFBML */

                    xfbml: true,
                    version: 'v2.8'

                });


            };

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

        })

.service('facebookService', function($q) {
        return {
            getResponse: function() {
                // let deferred = $q.defer();
                FB.api('/me',
                    {fields: "id,name,birthday,gender,work,picture,education"
                    }, function(response) {
                        if (!response || response.error) {
                            // deferred.reject('Error occured');
                            console.log('errrorr');
                        } else {
                            // deferred.resolve(response);

                            console.log('Successful login for: ' + response.name);
                            return response;

                        }
                    });
                // return deferred.promise;
                // return response;
            }
        }
    });


.service("Contacts", function($http) {
        this.getContacts = function() {
            return $http.get("/contacts").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding contacts.");
                });
        }
        this.createContact = function(contact) {
            return $http.post("/contacts", contact).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating contact.");
                });
        }
        this.getContact = function(contactId) {
            var url = "/contacts/" + contactId;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this contact.");
                });
        }
        this.editContact = function(contact) {
            var url = "/contacts/" + contact._id;
            console.log(contact._id);
            return $http.put(url, contact).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this contact.");
                    console.log(response);
                });
        }
        this.deleteContact = function(contactId) {
            var url = "/contacts/" + contactId;
            return $http.delete(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error deleting this contact.");
                    console.log(response);
                });
        }
    })
    .controller("ListController", function(contacts, $scope) {
        $scope.contacts = contacts.data;
    })
    .controller("NewContactController",function($scope, $location, Contacts) {
            $scope.back = function() {
                $location.path("/");
            }

            $scope.saveContact = function(contact) {
                Contacts.createContact(contact).then(function(doc) {
                    var contactUrl = "/contact/" + doc.data._id;
                    $location.path(contactUrl);
                }, function(response) {
                    alert(response);
            });
        }
    })
    .controller("EditContactController", function($scope, $routeParams, Contacts) {
        Contacts.getContact($routeParams.contactId).then(function(doc) {
            $scope.contact = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.contactFormUrl = "contact-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.saveContact = function(contact) {
            Contacts.editContact(contact);
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.deleteContact = function(contactId) {
            Contacts.deleteContact(contactId);
        }
    })
    .controller("loginWithFacebookController",function ($scope,facebookService) {
            facebookService.getResponse()
                .then(function(response) {
                        $scope.response = response;
                       // alert(response);
                    },
                    function(response) {
                        alert(response);
                    }
                );


    })


