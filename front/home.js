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

    
    deleteproduct = document.getElementById('submit').addEventListener("click", (e) => {
        e.preventDefault();

        title = document.getElementById('titleToDelete').value;

        fetch("http://localhost:3000/deleteproduct/" + title, {
            method: "DELETE",
            headers: {
                "Content-Type": "application.json",
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                alert("Product has been deleted")
                })
            .catch(
                console.log(error)
            )


    })


    

//See all products for sale
let productReveal = document.getElementById("seeproducts");
let table = document.getElementById("products")

productReveal.addEventListener("click", async () => {
    table.innerHTML = `
    <tr>
        <th>Title </th>
        <th>Category </th>
        <th>Price </th>
        <th>Image </th>
    </tr>
    `;

    await fetch('http://localhost:3000/products', {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((res) => {
        console.log(res);

        res.forEach((e) => {
            table.innerHTML +=`
            <tr>
                <th>${e.title} </th>
                <th>${e.category} </th>
                <th>${e.price}</th>
                <th> <img src ="${e.picturePath}" style="height: 50px; width: 50px;"</th>
    </tr>
            `;
        })
    })
})

//See products for a category
let categorySubmit = document.getElementById("buttontocategory")

categorySubmit.addEventListener("click", async () => {
        
        let categoryTable = document.getElementById("categorised");

        let category = document.getElementById("category").value;
    

        categoryTable.innerHTML = `
        <tr>
            <th>Title </th>
            <th>Category </th>
            <th>Price </th>
            <th>Image </th>
        </tr>
        `;


        await fetch('http://localhost:3000/products/'+ category, {
                method: 'GET',
        })

        .then((res) => {
            
            res.forEach((e) => {
                categoryTable.innerHTML +=`
                <tr>
                    <th>${e.title} </th>
                    <th>${e.category} </th>
                    <th>${e.price}</th>
                    <th> <img src ="${e.picturePath}" style="height: 50px; width: 50px;"</th>
                </tr>
                    `;
            })
        })
        

    })


    // Show products for a certain user
    let productsForUser = document.getElementById("submitforproducts");
    
    productsForUser.addEventListener("click", async () => {


    let userTable = document.getElementById("peruser")
    let username = document.getElementById("usernameforproduct").value;


    userTable.innerHTML = `
    <tr>
        <th>Title </th>
        <th>Category </th>
        <th>Price </th>
        <th>Image </th>
    </tr>
    `;


    await fetch('http://localhost:3000/products/'+ username, {
            method: 'GET',
    })

    .then((res) => {
        
        res.forEach((e) => {
            categoryTable.innerHTML +=`
            <tr>
                <th>${e.title} </th>
                <th>${e.category} </th>
                <th>${e.price}</th>
                <th> <img src ="${e.picturePath}" style="height: 50px; width: 50px;"</th>
            </tr>
                `;
        })
    })


})
});
