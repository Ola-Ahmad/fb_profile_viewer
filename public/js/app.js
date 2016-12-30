var myapp = angular.module("contactsApp", ['ngRoute']);

window.fbAsyncInit = function() {
    FB.init({
        appId      : '899782363404518',
        cookie     : true,  // enable cookies to allow the server to access

        xfbml      : true,
        version    : 'v2.8'
    });
    // FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


myapp.config(function($routeProvider,$locationProvider) {
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

