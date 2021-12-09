document.addEventListener("DOMContentLoaded", (event) => {

    //Siden tjekker for om der allerede ligger en bruger i localstorage
    const savedUser = localStorage.getItem("user");
    if(savedUser) {
      //Hvis der allerede ligger en bruger, sendes brugeres til forsiden
        location.href = "/home.html";
    }
    
    //Siden lytter på knappen
    document.getElementById("submit").addEventListener("click", (event) => {
      event.preventDefault();
  
      //Værdierne i inputfelterne defineres
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      //Værdierne forbindes til at udgøre en bruger
      const user = {
        username: username,
        password: password,
      };

      //Der sendes en Post-request til serveren, med brugerinformationerne
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            //Hvis serveren sender et response gemmes dataene i localstorage, så det bliver muligt at forblive logget ind
            localStorage.setItem("user", JSON.stringify(user));
            //Brugeren sendes til forsiden
            location.href = "/home.html";
          } else {
            window.alert("Oplysninger forkert");
          }
        })
        .catch(() => {
          window.alert("Der skete en fejl");
        });
    });
  });
  