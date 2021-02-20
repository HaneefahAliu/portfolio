var firebaseConfig = {
    apiKey: "AIzaSyCIDTFdu9RhfPuKpnWPu_Lrd0IkuxjlG6U",
    authDomain: "portfolio-4677b.firebaseapp.com",
    databaseURL: "https://portfolio-4677b.firebaseio.com",
    projectId: "portfolio-4677b",
    storageBucket: "portfolio-4677b.appspot.com",
    messagingSenderId: "215275434167",
    appId: "1:215275434167:web:039f1d2dbdda5531289d32",
    measurementId: "G-45LXK5GX4T"
  };
firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('portfolioDetails');

$('#contactForm').submit(function(e) {
    e.preventDefault();
 
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: $('.fullname').val(),
        email: $('.email').val(),
        subject: $('.subject').val(),
        message: $('.message').val()
    });
 
    $('.success-message').show();
 
    $('#contactForm')[0].reset();
});

// messagesRef.once('value').then((snapshot) => {
//     Object.keys(snapshot.val()).forEach((key) => {
//         document.write(`Name: ${snapshot.val()[key].name}`);
//         document.write(`Email: ${snapshot.val()[key].email}`);
//         document.write(`Subject: ${snapshot.val()[key].subject}`);
//         document.write(`Message: ${snapshot.val()[key].message}`);
//     });
// });
