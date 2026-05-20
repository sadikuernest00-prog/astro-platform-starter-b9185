export async function POST({ request }) {

try {

const body =
await request.json();

const prompt =
body.prompt;

const response =
await fetch(
"https://api.replicate.com/v1/predictions",
{

method:"POST",

headers:{
"Authorization":
`Token ${import.meta.env.REPLICATE_API_TOKEN}`,

"Content-Type":"application/json"
},

body:JSON.stringify({

version:
"black-forest-labs/flux-dev",

input:{
prompt:prompt
}

})

}
);

const data =
await response.json();

return new Response(
JSON.stringify(data),
{
status:200,
headers:{
"Content-Type":"application/json"
}
}
);

} catch(error){

return new Response(
JSON.stringify({
error:error.message
}),
{
status:500
}
);

}

}
