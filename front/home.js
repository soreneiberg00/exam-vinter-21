document.addEventListener("DOMContentLoaded", function () {

// Når siden er loadet tjekkes der for om der ligger en "user" i localstorage. Hvis der ikke gør det sendes brugeren til log-in siden
    const user = localStorage.getItem("user");
  if (!user) {
    location.href = "/log-in.html";
  }

  // Der lyttes på knappen "userdelete"
    deleteUser = document.getElementById('userdelete').addEventListener("click", (e) => {
        e.preventDefault();

        //Værdien fra inputfeltet defineres som "username"
        username = document.getElementById("userToDelete").value;

        //Sender en request til serveren med "username" som parameter
        fetch("http://localhost:3000/deleteuser/" + username, {
            method: "DELETE",
            headers: {
                "Content-Type": "application.json",
            }
        })
        //Svaret fra serveren konverteres til json og giver en alert til brugeren, hvis det lykkedes at slette brugeren
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                alert("User has been deleted")
                })
            .catch(
                console.log("error")
            )

    })


    
    // Der lyttes på knappen "submit"
    deleteproduct = document.getElementById('submit').addEventListener("click", (e) => {
        e.preventDefault();

        //Værdien i inputfeltet defineres som "title"
        title = document.getElementById('titleToDelete').value;

        //Sender en request til serveren med "title" som parameter
        fetch("http://localhost:3000/deleteproduct/" + title, {
            method: "DELETE",
            headers: {
                "Content-Type": "application.json",
            }
        })
        //Svaret fra serveren konverteres til json og giver en alert til brugeren, hvis det lykkedes at slette brugeren
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                alert("Product has been deleted")
                })
            .catch(
                console.log(error)
            )


    })

    //Log af
    logout = document.getElementById('logout')

    //Der lyttes på knappen "logout" og ved tryk på knappen aktiveres funktionerne
    logout.addEventListener("click", () => {

        //Brugeren slettes fra localstorage så brugeren ikke længere forbliver logget ind, og brugeren dirigeres til log-in siden
        localStorage.removeItem("user");
        location.href = "log-in.html";

    })


//Se alle produktet til salg
    //Der lyttes på en knap
    let productReveal = document.getElementById("seeproducts");
    let table = document.getElementById("products")

    productReveal.addEventListener("click", async () => {

        //Der oprettes en tabel til HTML-siden hvor produkterne kan blive vist
        table.innerHTML = `
        <tr>
            <th>Title </th>
            <th>Category </th>
            <th>Price </th>
            <th>Image </th>
        </tr>
        `;

        //Der laves en request til serveren
        await fetch('http://localhost:3000/products', {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);

            //For hvert produkt "e" der kommer fra serveren, skal produktets værdier indsættes i tabellen, med værdierne i den viste rækkefølge
            res.forEach((e) => {
                table.innerHTML +=`
                <tr>
                    <th>${e.title} </th>
                    <th>${e.category} </th>
                    <th>${e.price}</th>
                    <th> <img src ="${e.picturePath}" style="height: 50px; width: 50px;"</th>
        </tr>
                `;
                //"picturePath" er anderledes end de andre de billedet ikke er gemt i json-filen, men det i stedet er en sti til hvor billedet er
                // Derfor benyttes "img src"
            })
        })
    })

    
//See products for a category
let categorySubmit = document.getElementById("buttontocategory")
//Der lyttes på en knap
categorySubmit.addEventListener("click", async () => {
        
        let categoryTable = document.getElementById("categorised");
        
        //Værdien fra inputfeltet defineres
        let category = document.getElementById("category").value;
    
         //Der oprettes en tabel til HTML-siden hvor produkterne kan blive vist
        categoryTable.innerHTML = `
        <tr>
            <th>Title </th>
            <th>Category </th>
            <th>Price </th>
            <th>Image </th>
        </tr>
        `;

        //Der oprettes en fetch-request til serveren med category som parameter
        await fetch('http://localhost:3000/products/'+ category, {
                method: 'GET',
        })

        .then((res) => {
            
            //For hvert produkt "e" der kommer fra serveren, skal produktets værdier indsættes i tabellen, med værdierne i den viste rækkefølge
            res.forEach((e) => {
                categoryTable.innerHTML +=`
                <tr>
                    <th>${e.title} </th>
                    <th>${e.category} </th>
                    <th>${e.price}</th>
                    <th> <img src ="${e.picturePath}" style="height: 50px; width: 50px;"</th>
                </tr>
                    `;
                    //"picturePath" er anderledes end de andre de billedet ikke er gemt i json-filen, men det i stedet er en sti til hvor billedet er
                    // Derfor benyttes "img src"
            })
        })
        

    })


    //Vis produkter for en bestemt bruger
    let productsForUser = document.getElementById("submitforproducts");
    
    productsForUser.addEventListener("click", async () => {


    let userTable = document.getElementById("peruser")
    
    //Værdien fra inputfeltet defineres
    let username = document.getElementsByName("usernameforproduct").value;

    //Der oprettes en tabel til HTML-siden hvor produkterne kan blive vist
    userTable.innerHTML = `
    <tr>
        <th>Title </th>
        <th>Category </th>
        <th>Price </th>
        <th>Image </th>
    </tr>
    `;

        //Der oprettes en fetch-request til serveren med username som parameter
    await fetch('http://localhost:3000/products/'+ username, {
            method: 'GET',
    })

    .then((res) => {
        //For hvert produkt "e" der kommer fra serveren, skal produktets værdier indsættes i tabellen, med værdierne i den viste rækkefølge        
        res.forEach((e) => {
            categoryTable.innerHTML +=`
            <tr>
                <th>${e.title} </th>
                <th>${e.category} </th>
                <th>${e.price}</th>
                <th> <img src ="${e.picturePath}" style="height: 50px; width: 50px;"</th>
            </tr>
                `;
            //"picturePath" er anderledes end de andre de billedet ikke er gemt i json-filen, men det i stedet er en sti til hvor billedet er
                // Derfor benyttes "img src"
        })
    })
    

})

})

