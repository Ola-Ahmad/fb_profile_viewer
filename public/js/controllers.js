/**
 * Created by Hp on 30/12/2016.
 */

myapp .service("Contacts", function($http) {

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
myapp .factory('facebookService', function($q) {
    console.log('inside service');
    return {
                    getResponse: function () {
                        let deferred = $q.defer();
                                    FB.api('/me',
                                        {
                                            fields: "id,name,email,birthday,gender,work,picture,location,education"
                                        }, function (response) {
                                            if (!response || response.error) {
                                                console.log('Error occured');
                                                deferred.reject('Error occured');
                                            } else {
                                               deferred.resolve(response);
                                                // console.log( deferred.resolve(response));
                                                console.log(response);}
                                        });
                        return deferred.promise;
                                            }
        }

})


myapp.controller("ListController", function(contacts, $scope) {
    $scope.contacts = contacts.data;
})
myapp.controller("NewContactController",function($scope, $location, Contacts) {
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
myapp .controller("EditContactController", function($scope, $routeParams, Contacts) {
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
myapp .controller("loginWithFacebookController",function ($q,$scope,facebookService ) {


    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            console.log('Successful login for: ');
            FB.login(function (response) {
                if (response.authResponse) {
                    let access_token = FB.getAuthResponse()['accessToken'];
                    console.log('Access Token = ' + access_token);
                    facebookService.getResponse()
                        .then(function (response) {
                                $scope.response = response;
                                $scope.url = response.picture.data.url;
                                // $scope.education = [];
                                $scope.education = response.education;
                                angular.forEach(response.education, function (edu, index) {
                                    $scope.education.push(edu);
                                });


                                for (i=0;i<$scope.panier.length;i++){

                                    $scope.listeCommandes.push({
                                        idliste:idListe,
                                        id:     $scope.panier[i].id,
                                        photo:  $scope.panier[i].photo,
                                        nom:    $scope.panier[i].nom,
                                        quantite:$scope.panier[i].quantite,
                                        prix:   $scope.panier[i].prix,
                                        heureajout:$scope.getHeure()
                                    });

                                };





                                // $scope.work = [];
                                // angular.forEach(response.work, function (work, index) {
                                //     $scope.work.push(work);
                                // });
                                $scope.work = response.work;
                                $scope.location = response.location.name;
                                $scope.birthday= response.birthday ;
                                $scope.gender= response.gender;
                                $scope.name = response.name;
                                $scope.email = response.email;



                                console.log(response);


                            },
                            function (response) {
                                alert(response);
                            }
                        );

                } else {
                    console.log('User cancelled login or did not fully authorize.');
                    return false;
                }

            }, {scope: 'public_profile,email,user_work_history,user_about_me,user_birthday,user_education_history'});

            // if (typeof resp !== 'undefined') {
// console.log('undefined');            }
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            console.log('Please log ' +
                'into this app.');
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
           console.log('Please log ' +
                'into Facebook.');
        }
    }

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '899782363404518',
            cookie     : true,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use graph api version 2.8
        });

        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });

    };

    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));




})

