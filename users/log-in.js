document.addEventListener("DOMContentLoaded", (event) => {

    const savedUser = localStorage.getItem("user");
    if(savedUser) {
        location.href = "/home.html";
    }
      
    document.getElementById("submit").addEventListener("click", (event) => {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      const user = {
        username: username,
        password: password,
      };
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
            localStorage.setItem("user", JSON.stringify(user));
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
  