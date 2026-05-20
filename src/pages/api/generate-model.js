export async function POST({ request }) {

try {

const body =
await request.json();

const image =
body.image;

const prompt =
body.prompt ||
"Luxury fashion model wearing elegant premium underwear, studio lighting, realistic skin, ecommerce photography, luxury fashion campaign";

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
"ac732df83cea7fffaf6b84a1fff7b5c2b7f5f9f3b84d4d2c5d2f84f8c9d2a6d5",

input:{

prompt:prompt,

image:image,

strength:0.8,

num_outputs:1

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
error:"AI generation failed"
}),
{
status:500
}
);

}

}
