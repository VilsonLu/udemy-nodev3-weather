const greeter = (name = 'Thax') => {
  console.log(`Hello ${name}`);
};

greeter('Vilson');
greeter();

// set default on destructured object
const transaction = (type, { label, stock } = {}) => {
  console.log('type', label, stock);
};

transaction('order');
