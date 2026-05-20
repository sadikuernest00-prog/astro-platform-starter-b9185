export async function POST({ request }) {

try {

const body =
await request.json();

const prompt =
body.prompt;

/* CREATE PREDICTION */

const response =
await fetch(
"https://api.replicate.com/v1/predictions",
{

method:"POST",

headers:{

Authorization:
`Token ${import.meta.env.REPLICATE_API_TOKEN}`,

"Content-Type":"application/json"

},

body:JSON.stringify({

version:
"black-forest-labs/flux-schnell",

input:{

prompt:prompt,

num_outputs:1,

aspect_ratio:"3:4",

output_format:"jpg",

output_quality:90

}

})

}
);

const prediction =
await response.json();

console.log(prediction);

/* FAILED */

if(!prediction?.urls?.get){

return new Response(
JSON.stringify({
error:"Prediction failed",
details:prediction
}),
{
status:500
}
);

}

/* WAIT */

let result = prediction;

while(

result.status !== "succeeded" &&
result.status !== "failed"

){

await new Promise(resolve =>
setTimeout(resolve,2000)
);

const pollResponse =
await fetch(result.urls.get,{

headers:{

Authorization:
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

image:
Array.isArray(result.output)
? result.output[0]
: result.output

}),
{
status:200,

headers:{
"Content-Type":"application/json"
}
}
);

}

/* ERROR */

return new Response(
JSON.stringify({
error:"Generation failed",
details:result
}),
{
status:500
}
);

}catch(error){

console.log(error);

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
