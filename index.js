// import MonsterApiClient from "monsterapi";
const { default: MonsterApiClient } = require("monsterapi");
const express = require("express");

const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port");
});

app.set('view engine', 'ejs');

const client = new MonsterApiClient('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFhOGMzMTM3ZjhhMTVmMjBmZGQ2NDUzZjkxZDYxOTYwIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDQtMThUMjA6MDQ6MjEuNjc3MTY1In0.JTL3WZoLXHQDu9QCbFlSLCv_YUYGWywFgRR_ihE23tM');



app.get("/", (req, res) => {
   //input_txt = req.query.input_prompt;

   res.render("index");

   // Commented the below as we don't need it for now......

  //  const model = 'txt2img'; // Replace with the desired model name
  //  const input = {
  //    prompt: 'stadium',
  //    negprompt: 'deformed, bad anatomy, disfigured, poorly drawn face',
  //    samples: 2,
  //    steps: 50,
  //    aspect_ratio: 'square',
  //    guidance_scale: 7.5,
  //    seed: 2414,
  //    style: 'photographic'
  //  };
 
  //  client.generate(model, input)
  //    .then((response) => {
  //      const url = response.output[0];
  //      console.log(url);
  //      console.log('Generated content:', response);
  //      res.render("home",{url});
       
  //    })
  //    .catch((error) => {
  //      console.error('Error generating content:', error);
  //      res.status(500).send("Error generating content");
  //    });
 

});

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





