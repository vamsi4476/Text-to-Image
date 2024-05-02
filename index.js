// import MonsterApiClient from "monsterapi";
const { default: MonsterApiClient } = require("monsterapi");
const express = require("express");
const path = require('path');

const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port");
});

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, '/public')));

const client = new MonsterApiClient('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFhOGMzMTM3ZjhhMTVmMjBmZGQ2NDUzZjkxZDYxOTYwIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDQtMThUMjA6MDQ6MjEuNjc3MTY1In0.JTL3WZoLXHQDu9QCbFlSLCv_YUYGWywFgRR_ihE23tM');



app.get("/", (req, res) => {
   //input_txt = req.query.input_prompt;

   res.render("home");

});

app.get("/index",(req,res)=>{ // This page is for taking input fo image generation

    res.render("index");
})

app.get("/chatCompletion",(req,res)=>{

  res.render("chatCompletion");

})

/////////////////////////// Monster-API  ////////////////////////////////////

app.get("/pictures_page/:param",(req,res)=>{

  const param=req.params.param;

  const model = 'txt2img'; // Replace with the desired model name
  const input = {
    prompt: param,
    negprompt: 'deformed, bad anatomy, disfigured, poorly drawn face',
    samples: 1,
    steps: 100,
    aspect_ratio: 'square',
    guidance_scale: 50,
    seed: 155,
    style: 'photographic'
  };

  client.generate(model, input)
    .then((response) => {
      const url = response.output[0];
      console.log(url);
      console.log('Generated content:', response);
      res.render("pictures.ejs",{url});
    })
    .catch((error) => {
      console.error('Error generating content:', error);
      res.status(500).send("Error generating content");
    });
})


//////////////////////////// Gemini API  /////////////////////////////////



const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyD6FOVvT3VX9035-T9wcrDIR6Q4rS24WXw");

// ...

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 50,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

const model = genAI.getGenerativeModel({ model: "gemini-pro"},  generationConfig );

// For text-only input, use the gemini-pro model
//const model = genAI.getGenerativeModel({ model: "gemini-pro"});


// async function run() {
//   const prompt = "SUNY NEW PALTZ"

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
//   chatting(text);
// }
// run();

// function chatting(text){
// app.get("/getchatResponse",(req,res)=>{
//   console.log("hello .........");
//   res.render("chatCompletion",{text:"hi"});

// })

// }

app.get("/getchatResponse",(req,res)=>{
  console.log("hello .........");
  //res.render("chatCompletion",{text:"hi"});
  res.render("chatCompletion");

})

//Is get request different from <a> request