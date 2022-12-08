// Include CSS here.

import '../css/base.css';
import '../css/style.css';

// JS Modules
import Counter from './counter.js';

const counter = new Counter();
const output = document.getElementById('clickOutput');

output.value = counter.value;

document.getElementById('clickBtn').addEventListener('click',e=> {
    e.preventDefault();
    counter.incrementCounter();
    output.value = counter.value;
});