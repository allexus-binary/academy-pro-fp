const orders = [
    { name: 'TV', price: 300, date: '2018-10-10' },
    { name: 'laptop', price: 600, date: '2018-10-12' },
    { name: 'PC', price: 800, date: '2018-09-05' },
    { name: 'owen', price: 300 },
    { name: 'Camera', price: 500, date: '2018-03-03' },
    { name: 'Fridge', price: 1000, date: '2018-12-11' },
    { name: 'table', price: 150, date: '2018-12-10' },
    { name: 'Sofa', price: 400, date: '2018-12-10' },
    { name: 'chair', date: '2018-09-10' },
    { name: 'Window', price: 300, date: '2018-05-05' },
];

const addPrefix = (price) => '$' + price;
const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1);
const validateOrder = (order) => order && order.name && order.price && order.date;
const getValidOrders = (orders) => orders.filter(validateOrder);
const getInvalidOrders = (orders) => orders.filter(order => !validateOrder(order));

const groupOrdersByDate = (orders) => {
    let groupedOrders = {};
    orders.forEach(order => {
        groupedOrders = Object.assign(groupedOrders, {
            [order.date]: [...groupedOrders[order.date] || [], order]
        });
    });

    return groupedOrders;
}
const renderValidOrders = (validOrders) => {
    const table = document.createElement('table');

    const groupedOrders = groupOrdersByDate(validOrders);

    const headerRow = table.appendChild(document.createElement('tr'));
    Object.keys(groupedOrders).map((key) => {
        const column = document.createElement('th');
        column.innerHTML = key;
        headerRow.appendChild(column);
    });

    Object.keys(groupedOrders).map((key) => {
        const orders = groupedOrders[key];
        
    });


    // add grouping
    // add sorting
    // add row rendering

    return table;
};

const renderInvalidOrder = (order) => {
    const element = document.createElement('code');
    element.innerHTML = JSON.stringify(order);

    return element;
}

const renderInvalidOrders = (invalidOrders) => {
    const list = document.createElement('div');
    const header = document.createElement('h2');
    header.innerHTML = 'Incorrect rows';

    list.appendChild(header);

    invalidOrders.map(renderInvalidOrder)
        .forEach(element => {
            list.appendChild(element)
                .appendChild(document.createElement('br'));
        });

    return list;
};

const renderOrdersMatrix = (orders) => {    
    document.body.appendChild(renderValidOrders(getValidOrders(orders)))
        .appendChild(renderInvalidOrders(getInvalidOrders(orders)));
}

renderOrdersMatrix(orders);