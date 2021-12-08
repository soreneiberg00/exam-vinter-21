document.addEventListener("DOMContentLoaded", function() {
    
    let userForm =document.getElementById("submit")

    userForm.addEventListener("click", () => {


        let username = document.getElementById('username').value;
     //   let newUsername = document.getElementById('newusername').value
        let password = document.getElementById('password').value;

        let updatedUser = {
            username: username,
            password: password
        }

        
        fetch('http://localhost:3000/updateuser', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)

        }).then(response => response.json())
        .then(data => {
            alert(data.msg)
        })
        .catch((error) => {
            console.log('Error:', error)
        })



    })
})
