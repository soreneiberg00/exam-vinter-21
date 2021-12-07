document.addEventListener("DOMContentLoaded", function() {
    
    let button =document.getElementById("submit")

    button.addEventListener("click", () => {



        let username = document.getElementById('username').value
        let password = document.getElementById('password').value

        let newUser = {
            username: username,
            password: password,
        }

        
        fetch('http://localhost:3000/newuser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)

        }).then(response => response.json())
        .then((response) => {
            if(response) {
            alert("Succes")
            location.href = "/log-in.html"
        }})
        })
        .catch((error) => {
            console.log('Error:', error)
        })



})


