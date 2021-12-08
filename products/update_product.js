document.addEventListener("DOMContentLoaded", function() {
    
    let userForm =document.getElementById("submit")

    userForm.addEventListener("click", () => {


        let title = document.getElementById('title').value;
        let category = document.getElementById('category').value;
        let price = document.getElementById('price').value;

        let updatedProduct = {
            title: title,
            category: category,
            price: price
        }

        
        fetch('http://localhost:3000/updateproduct', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)

        }).then(response => response.json())
        .then(data => {
            console.log(data)
            alert( data.msg)
        })
        .catch((error) => {
            console.log('Error:', error)
        })

    })
})
