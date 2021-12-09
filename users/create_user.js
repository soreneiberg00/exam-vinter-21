document.addEventListener("DOMContentLoaded", function() {
    
    let button =document.getElementById("submit")
    //Siden lyttes for hvonår der klikkes på "submit"-knappen
    button.addEventListener("click", () => {


        //Værdierne i inputfelterne defineres
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value

        //Værdierne der skal udgøre en bruger forbindes
        let newUser = {
            username: username,
            password: password,
        }

        //Der laves en Post-request til serveren, med dataene fra inputfelterne
        fetch('http://localhost:3000/newuser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)

            //Hvis serveren sender en response, får brugeren en alert, der siger succes, og sendes til log-in siden
        }).then(response => response.json())
        .then((response) => {
            if(response) {
            alert("Succes")
            location.href = "/log-in.html"
        }})
        })
        //Brugeren får en fejl, hvis serveren sender en error tilbage
        .catch((error) => {
            console.log('Error:', error)
        })



})


