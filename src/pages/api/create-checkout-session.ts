<script>

const buttons = document.querySelectorAll('.buy-btn');

buttons.forEach((button) => {

button.addEventListener('click', async () => {

const card = button.closest('.card');

const size = card.querySelector('.size-select').value;

const name = button.dataset.name + ' - Size ' + size;

const price = button.dataset.price;

try {

const response = await fetch('/api/create-checkout-session', {

method:'POST',

headers:{
'Content-Type':'application/json'
},

body:JSON.stringify({
name,
price,
size
})

});

const data = await response.json();

if(data.url){

window.location.href = data.url;

}else{

alert('Stripe checkout failed');

}

}catch(error){

console.error(error);

alert('Checkout error');

}

});

});

</script>
