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

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const append = (parent, child) => { parent.appendChild(child); return parent; };
const appendHTML = (node, html) => { node.innerHTML = html; return node; }

const addPricePrefix = (price) => '$' + price;
const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1);
const parseOrderData = (order) => capitalizeName(order.name) + ' - ' + addPricePrefix(order.price);

const validateOrder = (order) => order && order.name && order.price && order.date;
const getValidOrders = (orders) => orders.filter(validateOrder);
const getInvalidOrders = (orders) => orders.filter(order => !validateOrder(order));
const sortOrdersByDate = (orders) => orders.sort((a, b) => new Date(a.date) - new Date(b.date));
const getRowsCount = (groupedOrders) => Object.keys(groupedOrders).reduce((prev, key) => 
    groupedOrders[key].length > prev ? groupedOrders[key].length : prev, 0);
const groupOrdersByDate = (orders) => orders.reduce((prev, curr) => Object.assign(prev, {
    [curr.date]: [...prev[curr.date] || [], curr]}), {});

const renderOrdersTableHeader = (groupedOrders) => Object.keys(groupedOrders).reduce((prev, key) => {
    const th = document.createElement('th');
    th.innerHTML = key;
    prev.appendChild(th);
    return prev;
}, document.createElement('tr'));

const renderOrdersTable = (groupedOrders) => {
    const table = document.createElement('table');
    table.appendChild(renderOrdersTableHeader(groupedOrders));
    
    for (let i = 0; i < getRowsCount(groupedOrders); i++) {
        table.appendChild(Object.keys(groupedOrders).map((key) => {
            const orders = groupedOrders[key];
            const element = document.createElement('td');
            element.innerHTML = orders[i] ? parseOrderData(orders[i]) : '';
            return element;
        }).reduce((prev, curr) => {
            prev.appendChild(curr);
            return prev;
        }, document.createElement('tr')));
    }

    return table;
}

const renderValidOrders = pipe(
    sortOrdersByDate,
    groupOrdersByDate,
    renderOrdersTable
);

const renderInvalidOrder = (order) => appendHTML(document.createElement('code'), JSON.stringify(order));

const renderInvalidOrders = (invalidOrders) => invalidOrders.reduce((prev, curr) => 
    append(append(prev, renderInvalidOrder(curr)), document.createElement('br')),
    append(document.createElement('div'), appendHTML(document.createElement('h2'), 'Incorrect rows'))
);

const renderOrdersMatrix = (orders) => {    
    append(append(document.body, renderValidOrders(getValidOrders(orders))), renderInvalidOrders(getInvalidOrders(orders)));
}

renderOrdersMatrix(orders);