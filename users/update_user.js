document.addEventListener("DOMContentLoaded", function() {
    
    let userForm =document.getElementById("submit")
    //Siden lytter på knappen
    userForm.addEventListener("click", () => {

        //Værdierne i inputfelterne defineres
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        //Værdierne forbindes til at udgøre en opdateret bruger
        let updatedUser = {
            username: username,
            password: password
        }

        //Der sendes en Put-request til serveren, med de opdaterede brugerinformationer
        fetch('http://localhost:3000/updateuser', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)

        }).then(response => response.json())
        .then(data => {
            //Hvis serveren sender et response retur alert'es den besked til brugeren
            alert(data.msg)
        })
        .catch((error) => {
            console.log('Error:', error)
        })



    })
})
