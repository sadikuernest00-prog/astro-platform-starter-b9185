export async function POST({ request }) {

try {

const body =
await request.json();

const prompt =
body.prompt;

const response =
await fetch(
"https://api.replicate.com/v1/models/black-forest-labs/flux-dev/predictions",
{

method:"POST",

headers:{
"Authorization":
`Token ${import.meta.env.REPLICATE_API_TOKEN}`,

"Content-Type":"application/json"
},

body:JSON.stringify({

input:{

prompt:prompt,

go_fast:true,

megapixels:"1"

}

})

}
);

const prediction =
await response.json();

if(!prediction?.urls?.get){

return new Response(
JSON.stringify({
error:"Prediction failed"
}),
{
status:500
}
);

}

let result = prediction;

/* WAIT FOR IMAGE */

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
