const API_URL = '/coffee.json';
// Creat empty array to store all orders 
let allOrders = [];
// local storage key
const storageKey = 'customer-order-data'; 

// 
function accumulateCustomerData(retrievedData) {
    // acculumates data
    allOrders = [
        ...Object.values(retrievedData)
    ];
    storeCustomerData(allOrders);
    // console.log(retrievedData);
    console.log(allOrders);

}

function storeCustomerData(customerArray) {
    //  Convert array into json string
    const jsonCharacters = JSON.stringify(customerArray);
    // console.log(customerArray);
    //  set that string in local storage
    localStorage.setItem(storageKey,jsonCharacters);
}

function loadCustomerData() {
    const jsonCharacters = localStorage.getItem(storageKey);
    // Convert back into iterable array 
    const arrayOfCustomers= JSON.parse(jsonCharacters);
    // console.log(`retrieved ${arrayOfCustomers.length} customers info`)
    console.log(arrayOfCustomers);
    return arrayOfCustomers;
}

function drawCustomerToDetail(object) {
    const customerDetails = document.querySelector('[customer-order');
    customerDetails.textContent = ''

    const coffeeDiv = document.createElement('div');

    coffeeDiv.textContent = object.coffee

    customerDetails.appendChild(coffeeDiv)

}
function drawCustomerToList() {
    allOrders.forEach(function(customer){
        const customerName = customer.emailAddress;
        const anchorElement = document.createElement('a');
        anchorElement.textContent = customerName;      
        
        const listItem = document.createElement ('li');
        listItem.appendChild(anchorElement); 
        anchorElement.addEventListener('click', function() {
            drawCustomerToDetail(customer)
        } )
        const listArea = document.querySelector('[customer-email]');

        listArea.appendChild(listItem); 


    })
}

// function retrieveUserURL(email) {
//     return `https://dc-coffeerun.herokuapp.com/api/coffeeOrders/${email}`

// }


function sortByName(obj1, obj2) {
    const letter1 = obj1.emailAddress[0].toLowerCase();
    const letter2 = obj2.emailAddress[0].toLowerCase();

    if (letter1 < letter2) {
        return -1

    } else if (letter2 < letter1) {
        return 1;

    }
    return 0;
}

// fetch data from API 
function retrieveCustomerData() {
    fetch(API_URL)
    .then(function(response) {
        return response.json()
    })
    .then(accumulateCustomerData)
    .then(function(){
        console.log('done retrieving')

    })
};
// main functions that runs api fetch
loadCustomerData(); 
function main() {
    let ordersInStorage = loadCustomerData(); 
    if (ordersInStorage) {
        allOrders = [
            ...ordersInStorage.sort(sortByName)
        ];
    }
    setTimeout(function() {
       retrieveCustomerData();
    }, 1000); 
    drawCustomerToList();


}

main();
