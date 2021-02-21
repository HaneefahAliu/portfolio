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
  var database = firebase.database();

window.onload = function() {
    if (document.getElementById("uploadForm")) {
        document.getElementById("uploadForm").addEventListener("submit", function(e){
            e.preventDefault();

            var projectImage = document.getElementById('projectImage').files[0]
            var projectName = document.getElementById('projectName').value;
            var projectRole = document.getElementById('projectRole').value;
            var projectDescription = document.getElementById('projectDescription').value;
            var projectLink = document.getElementById('projectLink').value;

            // Create the file metadata
            var metadata = {
                contentType: projectImage.type
            };

            // Upload projectImage and metadata to the object 'images/mountains.jpg'
            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child('projects/' + projectImage.name).put(projectImage, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on("state_changed", // or 'state_changed'
            function(snapshot) {
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
            },
            function(error) {
                switch (error.code) {
                  case 'storage/unauthorized':
                  console.log("unauthorized >> ", error)
                    // User doesn't have permission to access the object
                    break;
            
                  case 'storage/canceled':
                  console.log("canceled >> ", error)
                    // User canceled the upload
                    break;
            
                  case 'storage/unknown':
                  console.log("unknown >> ", error)
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
            },
            function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('projectImage available at', downloadURL);

                     // upload to produt table
                    database.ref('projects').push().set({
                        projectImage: downloadURL,
                        projectName: projectName,
                        projectRole : projectRole,
                        projectDescription: projectDescription,
                        projectLink: projectLink
                    })
                    .then((result) => {
                    console.log("Project added successfully => ", result)
                    })
                    .catch((error) => {
                    console.log("There was an error => ", error)
                    });
                });
    
            });
        })
    }
}


var firebaseProject = document.getElementsByClassName('cards')[0]
var projectsDataRef = database.ref("projects");

projectsDataRef.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        // console.log(childData)

        var card = document.createElement("div")
        card.className = "card";

        var projectImg = document.createElement("img")
        projectImg.imageSrc =  '<img '+ ' src="' + childData.projectImage + '"/>' 

        var projectNm = document.createElement("h2");
        projectNm.innerHTML = '<h2>'+ childData.projectName + '</h2>'

        var projecRl = document.createElement("h3");
        projecRl.innerHTML = '<h3>'+ childData.projectRole + '</h3>'

        var projectDesc = document.createElement("p");
        projectDesc.innerHTML = '<p>' + childData.projectDescription + '</p>'

        var projectLink = document.createElement("a");
        projectLink.downloadURL = '<a '+ 'target="_blank"' + ' href="' + childData.projectLink + '">' + "View Project" + '</a>'

        var cardText = document.createElement("div")
        cardText.className = "card-text";

        cardText.innerHTML = projectNm.innerHTML + projecRl.innerHTML + projectDesc.innerHTML +  projectLink.downloadURL

        card.innerHTML = projectImg.imageSrc  

        console.log(card)
        firebaseProject.appendChild(card);
        card.appendChild(cardText);
    });
});


   
