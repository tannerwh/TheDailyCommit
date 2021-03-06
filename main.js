// this statement is a redirect for brackets development
if (window.location.hostname === '127.0.0.1') {
    window.location = 'http://localhost:8080';
}
var auth2;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    $('.g-signin2').hide();
}

function appStart() {
    gapi.load('auth2', initSigninV2);
}

function signinChanged(isSignedIn) {
    console.log('signinChanged() = ' + isSignedIn);
    if (isSignedIn) {
        console.log('the user must be signed in to print this');
        var googleUser = auth2.currentUser.get();
        var authResponse = googleUser.getAuthResponse();
        var profile = googleUser.getBasicProfile();
        
        $('#email').html('<h3>' + profile.getEmail() + '</h3>');
        $('#photo').html('<img src="' + profile.getImageUrl() + '">');
    }
    else {
        console.log('the user must not be signed in if this is printing');
    }
}

function initSigninV2() {
    auth2 = gapi.auth2.getAuthInstance();
    auth2.isSignedIn.listen(signinChanged);
    auth2.currentUser.listen(userChanged);
    if (auth2.isSignedIn.get() == true) {
        auth2.signIn();
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    $('.g-signin2').show();
}