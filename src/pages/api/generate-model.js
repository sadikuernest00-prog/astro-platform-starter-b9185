export async function POST({ request }) {

try {

const body =
await request.json();

const prompt =
body.prompt;

const startResponse =
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

const prediction =
await startResponse.json();

let result = prediction;

/* WAIT FOR AI IMAGE */

while(
result.status !== "succeeded" &&
result.status !== "failed"
){

await new Promise(resolve =>
setTimeout(resolve,3000)
);

const pollResponse =
await fetch(result.urls.get,{

headers:{
"Authorization":
`Token ${import.meta.env.REPLICATE_API_TOKEN}`
}

});

result =
await pollResponse.json();

}

/* SUCCESS */

if(result.status === "succeeded"){

return new Response(
JSON.stringify({

image:result.output[0]

}),
{
status:200,

headers:{
"Content-Type":"application/json"
}
}
);

}

/* FAILED */

return new Response(
JSON.stringify({
error:"Generation failed"
}),
{
status:500
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
