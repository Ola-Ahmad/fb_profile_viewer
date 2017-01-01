var myapp = angular.module("contactsApp", ['ngRoute']);

window.fbAsyncInit = function() {
    FB.init({
        appId: '899782363404518',
        cookie: true, // enable cookies to allow the server to access

        xfbml: true,
        version: 'v2.8'
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


myapp.config(function($routeProvider, $locationProvider) {
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
myapp.service("Contacts", function($http) {

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
        console.log(url);
        return $http.put(url, contact).
        then(function(response) {
            return response;
        }, function(response) {
            alert("Error editing this contact.");
            console.log(response);
        });
    }
    this.deleteContact = function(contactId) {
        let url = "/contacts/" + contactId;
        return $http.delete(url).
        then(function(response) {
            return response;
        }, function(response) {
            console.log(response);

            alert("Error deleting this contact.");
        });
    }
})
myapp.factory('facebookService', function($q) {
    console.log('inside service');
    return {
        getResponse: function() {
            let deferred = $q.defer();
            FB.api('/me', {
                fields: "id,name,email,birthday,gender,work,picture,location,education"
            }, function(response) {
                if (!response || response.error) {
                    console.log('Error occured');
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                    // console.log( deferred.resolve(response));
                    // console.log(response);
                }
            });
            return deferred.promise;
        }
    }

})

myapp.controller("ListController", function(contacts,Contacts, $scope,$rootScope,$location) {

    $scope.contacts = contacts.data;
    // $rootScope.contacts = contacts.data;

    var refresh = function() {

        $scope.contacts =  Contacts.getContacts();

    };
    $scope.saveContact = function(contact) {
        Contacts.createContact(contact);
        // refresh();
    }
    $scope.deleteContact = function(contactId) {
        Contacts.deleteContact(contactId);
       // refresh();
    }
    $scope.editContact = function(contact) {
        Contacts.editContact(contact);
        console.log(contact);
       // refresh();

    }

})

//
//     // .run(['$rootScope', '$window',
// myapp.run(
//         function($rootScope, $window) {
//             $rootScope.user = {};
//             $window.fbAsyncInit = function() {
//                 // Executed when the SDK is loaded
//                 FB.init({
//                     /*
//                      The app id of the web app;
//                      To register a new app visit Facebook App Dashboard
//                      ( https://developers.facebook.com/apps/ )
//                      */
//
//                     appId: '899782363404518',
//                     /*
//                      Adding a Channel File improves the performance
//                      of the javascript SDK, by addressing issues
//                      with cross-domain communication in certain browsers.
//                      */
//
//                //     channelUrl: '/public/channel.html',
//
//                     /*
//                      Set if you want to check the authentication status
//                      at the start up of the app
//                      */
//
//                     status: true,
//
//                     /*
//                      Enable cookies to allow the server to access
//                      the session
//                      */
//
//                     cookie: true,
//
//                     /* Parse XFBML */
//
//                     xfbml: true,
//                     version: 'v2.8'
//
//                 });
//
//
//             };
//             (function(d, s, id) {
//                 let js, fjs = d.getElementsByTagName(s)[0];
//                 if (d.getElementById(id)) return;
//                 js = d.createElement(s);
//                 js.id = id;
//                 js.src = "//connect.facebook.net/en_US/sdk.js";
//                 fjs.parentNode.insertBefore(js, fjs);
//             }(document, 'script', 'facebook-jssdk'));
//         })
//
//
//
//