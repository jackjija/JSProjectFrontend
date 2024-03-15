const express = require('express');
const axois = require('axios');
const app = express();
const path = require("path");
var bodyParser = require('body-parser');
const { default: axios } = require('axios');

// const base_url = 'http://localhost:3000';
const base_url = "http://10.104.4.192:3000";

app.set("views" ,path.join(__dirname, "/public/view"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

app.get("/" , async(req ,res) => {
    res.render("PetProduct/login.ejs");
});

// app.get("/main", async (req, res) => {
//     res.render("PetProduct/main.ejs");
// });

app.get("/cats", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/cats');
        const response1 = await axios.get(base_url + '/breeds');
        res.render("PetProduct/viewall", {cats: response.data , breeds : response1.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error')
    }
});


app.get("/cat/view/:id", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/cats/' + req.params.id);
        const response1 = await axios.get(base_url + '/breeds')
        res.render("PetProduct/view", { cat: response.data , breeds: response1.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/cat/create", async (req, res) => {
    try { 
        const breeds = await axios.get(base_url + "/breeds")
        res.render("PetProduct/create" , {breeds: breeds.data})
    }catch {
        res.status(500).send(err)
    }
});

app.post("/create", async (req, res) => {
    try{
        const data = {name: req.body.name, breed_id: req.body.breed_id, age: req.body.age,
                    color: req.body.color, price: req.body.price, availability: req.body.availability};
        await axios.post(base_url + '/cats/', data);
        res.redirect("/cats");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/cat/update/:id", async (req, res) => {
    try{
    const response = await axois.get(base_url + '/cats/' + req.params.id);
    const response1 = await axios.get(base_url + '/breeds')
        res.render("PetProduct/update", { cat: response.data ,breeds: response1.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/update/:id", async (req, res) => {
    try{
        const data = {name: req.body.name, breed_id: req.body.breed_id, age: req.body.age,
            color: req.body.color, price: req.body.price, availability: req.body.availability};
        await axios.put(base_url + '/cats/' + req.params.id, data);
        res.redirect("/cats");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/delete/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/cats/' + req.params.id);
        res.redirect("/cats");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

//Customer Table
app.get("/customers/", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/customers');
        res.render("Customer/customers", {customers: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error')
    }
});

app.get("/customer/:id", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/customers/' + req.params.id);
        res.render("Customer/customer", { customer: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/customers/create", (req, res) => {
    res.render("Customer/create");
});

app.post("/customers/create", async (req, res) => {
    try{
        const customerData = {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName,
            email: req.body.email, phoneNumber: req.body.phoneNumber};
        await axios.post(base_url + '/customers/', customerData);
        res.redirect("/customers/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/customers/update/:id", async (req, res) => {
    try{
    const response = await axois.get(
        base_url + '/customers/' + req.params.id);
        res.render("Customer/update", { customer: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/customers/update/:id", async (req, res) => {
    try{
        const customerData = {username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName,
            email: req.body.email, phoneNumber: req.body.phoneNumber};
        await axios.put(base_url + '/customers/' + req.params.id, customerData);
        res.redirect("/customers/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/customers/delete/:id", async (req, res) => {
    try{
        await axios.delete(base_url + '/customers/' + req.params.id);
        res.redirect("/customers/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

// //Order Table
// app.get("/orders/", async (req, res) => {
//     try{
//         const response = await axios.get(base_url + '/orders');
//         res.render("Order/orders", {orders: response.data});
//     }catch (err){
//         console.error(err);
//         res.status(500).send('Error')
//     }
// });

// app.get("/order/:id", async (req, res) => {
//     try{
//         const response = await axios.get(base_url + '/orders/' + req.params.id);
//         res.render("Order/order", { order: response.data});
//     }catch (err){
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });

// app.get("/orders/create", (req, res) => {
//     res.render("Order/create");
// });

// app.post("/orders/create", async (req, res) => {
//     try{
//         const orderData = {customer_id: req.body.customer_id, order_date: req.body.order_date, total_amount: req.body.total_amount};
//         await axios.post(base_url + '/orders/', orderData);
//         res.redirect("/orders/");
//     }catch (err){
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });

// app.get("/orders/update/:id", async (req, res) => {
//     try{
//     const response = await axois.get(
//         base_url + '/orders/' + req.params.id);
//         res.render("Order/update", { order: response.data});
//     }catch (err){
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });

// app.post("/orders/update/:id", async (req, res) => {
//     try{
//         const orderData = {customer_id: req.body.customer_id, order_date: req.body.order_date, total_amount: req.body.total_amount};
//         await axios.put(base_url + '/orders/' + req.params.id, orderData);
//         res.redirect("/orders/");
//     }catch (err){
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });

// app.get("/orders/delete/:id", async (req, res) => {
//     try{
//         await axios.delete(base_url + '/orders/' + req.params.id);
//         res.redirect("/orders/");
//     }catch (err){
//         console.error(err);
//         res.status(500).send('Error');
//     }
// });

//Petcustomer Table
app.get("/petcustomers", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/petcustomers');
        const catRes = await axios.get(base_url + '/cats');
        const customerRes = await axios.get(base_url + '/customers');
        res.render("petcustomer/Petcustomer", {
            petcustomers: response.data ,
            cats: catRes.data ,
            customers: customerRes.data
        });
    }catch (err){
        console.error(err);
        res.status(500).send('Error')
    }
});

app.get("/detail/:id", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/petcustomers/' + req.params.id);
        const response1 = await axios.get(base_url + '/cats')
        res.render("petcustomer/detail", { petcustomers: response.data , cats: response1.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/petcustomers/create", async (req, res) => {
    const response = await axios.get(base_url + '/cats')
    const response1 = await axios.get(base_url + '/customers')
    res.render("petcustomer/create" , {cats: response.data , customers: response1.data});
});

app.post("/petcustomers/create", async (req, res) => {
    try{
        const customer_All = {cat_id: req.body.cat_id ,customer_id: req.body.customer_id};
        await axios.post(base_url + "/petcustomers", customer_All);
        res.redirect("/petcustomers");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/petcustomers/update/:id", async (req, res) => {
    try{
        const response = await axois.get(
        base_url + '/petcustomers/' + req.params.id);
        res.render("petcustomer/update", { petcustomers: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/petcustomers/update/:id", async (req, res) => {
    try{
        const customer_All = {petcustomer_id: req.body.petcustomer_id ,cat_id: req.body.cat_id ,customer_id: req.body.customer_id};
        await axios.put(base_url + '/petcustomers/' + req.params.id, customer_All);
        res.redirect("/petcustomers");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/petcustomers/delete/:id", async (req, res) => {
    try{
        // const petcusId = req.params.petcustomer_id;
        await axios.delete(base_url + '/petcustomers/' + req.params.id);
        res.redirect("/petcustomers/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});


//Breed Table
app.get("/breeds", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/breeds');
        res.render("Breed/breeds", {breeds: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error')
    }
});

app.get("/breed/:id", async (req, res) => {
    try{
        const response = await axios.get(base_url + '/breeds/' + req.params.id);
        res.render("Breed/breed", { breeds: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/breeds/create", (req, res) => {
    res.render("Breed/create");
});

app.post("/breeds/create", async (req, res) => {
    try{
        const customer_All = {breed_id: req.body.breed_id ,breedName: req.body.breedName};
        await axios.post(base_url + "/breeds", customer_All);
        res.redirect("/breeds");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/Breed/update/:id", async (req, res) => {
    try{
        const response = await axois.get(
        base_url + '/breeds/' + req.params.id);
        res.render("Breed/update", { breeds: response.data});
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.post("/breeds/update/:id", async (req, res) => {
    try{
        const customer_All = {breed_id: req.body.breed_id , breedName: req.body.breedName};
        await axios.put(base_url + '/breeds/' + req.params.id, customer_All);
        res.redirect("/breeds");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.get("/Breed/delete/:id", async (req, res) => {
    try{
        // const petcusId = req.params.petcustomer_id;
        await axios.delete(base_url + '/breeds/' + req.params.id);
        res.redirect("/breeds/");
    }catch (err){
        console.error(err);
        res.status(500).send('Error');
    }
});

app.listen(5500, () => {
    console.log('Server started on port 5500');
});