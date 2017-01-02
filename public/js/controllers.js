/**
 * Created by Hp on 30/12/2016.
 */


myapp.controller("mainController", function(contacts, Contacts, $scope,$http) {
    $scope.contacts = contacts.data;
    var refresh = function() {
        $http.get("/contacts").
        then(function(response) {
            $scope.contacts = response.data;

        }, function(response) {
            alert("Error finding contacts.");
        });
    };
    // refresh();
    $scope.saveContact = function(contact) {
        Contacts.createContact(contact);
        refresh();
    };
    $scope.deleteContact = function(contactId) {
        Contacts.deleteContact(contactId);
        refresh();
    };
    $scope.editContact = function(contact) {
        console.log(contact);
        Contacts.getContact(contact._id).then(function(doc) {
            Contacts.editContact(contact);
        }, function(response) {
            alert(response);
        });
    }

})

myapp.controller("loginWithFacebookController", function($q, $scope, $routeParams,facebookService,Contacts) {
    // $scope.logInMode = false;
    // $scope.logInFormUrl = "";
    // $("#loginForm").css('display','block');

    // $scope.logInMode = true;
    // $scope.logInFormUrl = "login.html";
    Contacts.getContact($routeParams.contactId).then(function(doc) {
        $scope.contact = doc.data;
    }, function(response) {
        alert(response);
    });



    function statusChangeCallback(response) {

        // $("#loginForm").css('display','block');
        //
        // $scope.logInMode = true;
        // $scope.logInFormUrl = "login.html";


        console.log('statusChangeCallback');
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            $scope.logInMode = false;
            $scope.logInFormUrl = "";

            // Logged into your app and Facebook.
            console.log('Successful login for: ');
            FB.login(function(response) {
                if (response.authResponse) {
                    let access_token = FB.getAuthResponse()['accessToken'];
                    console.log('Access Token = ' + access_token);
                    facebookService.getResponse()
                        .then(function(response) {
                                $scope.response = response;
                                $scope.url = response.picture.data.url;
                                $scope.education = [];
                                $scope.shcoolName = [];
                                $scope.schoolType = [];
                                angular.forEach(response.education, function(edu, index) {
                                    $scope.education.push(edu);
                                    $scope.shcoolName.push(edu.school.name);
                                    $scope.schoolType.push(edu.type);
                                });
                                $scope.work = [];
                                $scope.employerName = [];
                                $scope.jobLocation = [];
                                $scope.jobPosition = [];

                                angular.forEach(response.work, function(work, index) {
                                    $scope.work.push(work);
                                    $scope.employerName.push(work.employer.name);
                                    $scope.jobLocation.push(work.location.name);
                                    $scope.jobPosition.push(work.position.name);

                                });
                                $scope.location = response.location.name;
                                $scope.birthday = response.birthday;
                                $scope.gender = response.gender;
                                $scope.name = response.name;
                                $scope.email = response.email;

                                console.log(response);

                            },
                            function(response) {
                                alert(response);
                            }
                        );

                } else {
                    console.log('User cancelled login or did not fully authorize.');
                    return false;
                }

            }, {
                scope: 'public_profile,email,user_work_history,user_about_me,user_birthday,user_education_history'
            });

            // if (typeof resp !== 'undefined') {
            // console.log('undefined');            }
        } else if (response.status === 'not_authorized') {
            $scope.logInMode = true;
            $scope.logInFormUrl = "login.html";

            // The person is logged into Facebook, but not your app.
            console.log('Please log ' +
                'into this app.');
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            // $scope.state = !$scope.state;
            //  $("#loginForm").css('display','block');

            $scope.logInMode = true;
            $scope.logInFormUrl = "login.html";


            alert('Please log ' +
                'into Facebook.');



        }
    }

    window.fbAsyncInit = function() {
        FB.init({
            appId: '899782363404518',
            cookie: true, // enable cookies to allow the server to access
            // the session
            xfbml: true, // parse social plugins on this page
            version: 'v2.8' // use graph api version 2.8
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
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));




})