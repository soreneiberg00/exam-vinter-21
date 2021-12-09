document.addEventListener("DOMContentLoaded", function() {
    
    let userForm =document.getElementById("submit")
    // Der lyttes efter en klik på submit "submit"-knappen, når siden er loadet
    userForm.addEventListener("click", () => {

        //Værdierne i inputfelterne defineres
        let title = document.getElementById('title').value;
        let category = document.getElementById('category').value;
        let price = document.getElementById('price').value;

        //Værdierne kædes sammen til et samlet produkt
        let updatedProduct = {
            title: title,
            category: category,
            price: price
        }

        //Der sendes en PUT-request til serveren, med det opdaterede produkt som "body"
        fetch('http://localhost:3000/updateproduct', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)

        
        }).then(response => response.json())
        .then(data => {
            console.log(data)
        //Serveren sender en besked tilbage som alert'es til brugere
            alert( data.msg)
        })
        .catch((error) => {
            console.log('Error:', error)
        })

    })
})
