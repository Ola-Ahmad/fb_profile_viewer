
// document.getElementById('loginBtn').addEventListener('click', function() {
//     //do the login
//     FB.login(function(response) {
//         if (response.authResponse) {
//             //user just authorized your app
//             top.location.href = 'example.com/facebook_connect.php';
//         }
//     }, {scope: 'email,public_profile', return_scopes: true});
// },
//     false
// );





// $(document).ready(function(){
//
//     ​$(".loginbtn").click(function () {
//         //do the login
//         FB.login(function(response) {
//             if (response.authResponse) {
//                 //user just authorized your app
//                 top.location.href = 'example.com/facebook_connect.php';
//             }
//         }, {scope: 'email,public_profile', return_scopes: true});
//
//
//     });​
// });​
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
// function checkLoginState() {


$(document).ready(function () {


    $('.loginbtn').click(function () {
        FB.getLoginStatus(function(response) {
            console.log('getLoginStatus');
            statusChangeCallback(response);
        });

    });

});

// }
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        // basicAPIRequest();
        window.location='index.html#!/login';

    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}


// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
// function  basicAPIRequest() {
    // console.log('Welcome!  Fetching your information.... ');
    // FB.api('/me',
    //     {fields: "id,name,birthday,gender,work,picture,education"},
    //     function(response) {
    //         console.log('Successful login for: ' + response.name);
    //
    //         console.log(response);
    //
    //     // document.getElementById('status').innerHTML =
    //     //     'Thanks for logging in, ' + response.name + '!';
    //     window.location='index.html#!/login';
    // });


// }
