document.addEventListener("DOMContentLoaded", function () {


    const user = localStorage.getItem("user");
  if (!user) {
    location.href = "/login.html";
  }
    

    
    //Log af
    logout = document.getElementById('logout')

    logout.addEventListener("click", () => {

        localStorage.removeItem("user");
        location.href = "log-in.html";

    })

    
    deleteUser = document.getElementById('userdelete').addEventListener("click", (e) => {
        e.preventDefault();

        username = document.getElementById("userToDelete").value;

        fetch("http://localhost:3000/deleteuser/" + username, {
            method: "DELETE",
            headers: {
                "Content-Type": "application.json",
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                alert("User has been deleted")
                })
            .catch(
                console.log("error")
            )

    })




})

