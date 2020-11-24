const customers = ['Max', 'Manuel', 'Anna'];

const activeCustomers = ['Max', 'Manuel'];

const inactiveCustomers = _.difference(activeCustomers, customers);

console.log(inactiveCustomers);
