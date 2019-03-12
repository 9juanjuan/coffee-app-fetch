const API_URL = 'https://dc-coffeerun.herokuapp.com/api/coffeeOrders';
// Creat empty array to store all orders 
let allOrders = [];
console.log (allOrders[1])
// local storage key
const storageKey = 'customer-order-data'; 

// 
function accumulateCustomerData(retrievedData) {
    // acculumates data
    allOrders = [
        ...allOrders,
        ...retrievedData
    ];
    storeCustomerData(allOrders);
    console.log(retrievedData);
    console.log(allOrders);

}

function storeCustomerData(customerArray) {
    //  Convert array into json string
    const jsonCharacters = JSON.stringify(customerArray);
    console.log(customerArray);
    //  set that string in local storage
    localStorage.setItem(storageKey,jsonCharacters);
}

function loadCustomerData() {
    const jsonCharacters = localStorage.getItem(storageKey);
    // Convert back into iterable array 
    const arrayOfCustomers= JSON.parse(jsonCharacters);
    console.log(`retrieved ${arrayOfCustomers.length} customers info`)
    return customerArray;
}

function retrieveUserURL(email) {
    return `https://dc-coffeerun.herokuapp.com/api/coffeeOrders/${email}`

}




// fetch data from API 
function retrieveCustomerData() {
    fetch(API_URL)
    .then(function(response) {
        console.log(response)
        return response.json()
    })
    .then(accumulateCustomerData)
    .then(function(){
        console.log('done retrieving')
    })
};
// main functions that runs api fetch
function main() {
    setTimeout(retrieveCustomerData(), 1000)
}
main();
console.log (allOrders[1])