const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAi = require('openai')
const mongoose = require('mongoose');
require('dotenv').config();
const multer = require('multer');
const pdfParser = require('pdf-parse');

//mongoose connection
mongoose.connect(process.env.Mongo)


const API_KEY = process.env.API_KEY;

const db = mongoose.connection
db.on('error', (error) => {
    console.error(error)
})

db.once('open', () => {
    console.log('Database connected')
})

const openai = new OpenAi({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true
})

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post('/generate', async (req, res) => {
    const formData = {
        name: req.body.name,
        company: req.body.company,
        position: req.body.position,
        details: req.body.details,
    }
    //console.log(formData); log formData

    const userMessages = [
        {
          role: "user",
          content: `Create a cover letter for the candidate below. Use the following details:\n\n`,
        },
        {
          role: "user",
          content: `Dear Hiring Manager,\n\n`,
        },
        {
          role: "user",
          content: `I am writing to express my interest in the ${formData.position} position at ${formData.company}. With a strong background in ${formData.details}, I believe I am well-suited for this role.\n\n`,
        },
        {
          role: "user",
          content: `Candidate Name: ${formData.name}\n`,
        },
        {
          role: "user",
          content: `Company: ${formData.company}\n`,
        },
        {
          role: "user",
          content: `Position: ${formData.position}\n`,
        },
        {
          role: "user",
          content: `Job Description: ${formData.details}\n\n`,
        },
        {
          role: "user",
          content: `In my previous roles, I have demonstrated a strong ability to (/* Highlight relevant skills or achievements */). My dedication to achieving results and contributing to a positive work environment aligns well with the values of ${formData.company}.\n\n`,
        },
        {
          role: "user",
          content: `Attached is the resume of the candidate for your review:\n${pdfText}\n\n`,
        },
        {
          role: "user",
          content: `Thank you for considering my application. I am excited about the opportunity to contribute to ${formData.company} and would welcome the chance to further discuss how my skills and experiences align with your team's needs.\n\n`,
        },
        {
          role: "user",
          content: `Sincerely,\n${formData.name}\n`,
        },
        {
            role: "user",
            content: "improve how the cover letter is written",
          },
      ];

      const userMessages1 = [
        { role: 'user', content: `Create a cover letter for ${formData.name} with ${formData.company} as ${formData.position} and ${formData.details} 
        . You can use this format. Use the name:${formData.name} as the writer so do necessary changes.
        and this is the resume to get additional data 
        resume: ${pdfText} and
        Dear Hiring Manager,
          
        
             ...details here
             
        closing signature` },
      ];

      const userMessage = `
Create a cover letter for ${formData.name} applying for the position of ${formData.position} at ${formData.company}. Utilize the following template and include relevant details. Please use the name "${formData.name}" as the writer.

Here's the resume for additional information: ${pdfText}

Dear Hiring Manager,

[Opening paragraph: Introduce yourself and express your interest in the position]

[Body paragraphs: Highlight your skills, experiences, and accomplishments. Connect them to the specific requirements of the job. Use the resume as a reference to include relevant details.]

[Closing paragraph: Express enthusiasm for the opportunity, restate your qualifications, and mention your desire for an interview.]

[Closing signature: Sign off with a professional closing, e.g., "Sincerely" or "Best regards," followed by your full name]

Thank you for considering my application.

Sincerely,
${formData.name}
`;

const userMessages2 = [{ role: 'user', content: userMessage }];

      

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: userMessages2
    });

    res.send(completion.choices[0].message.content);
})


const userRouter = require('./routes/users');
app.use('/api', userRouter);


// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         return cb(null, './assets');
//     },
//     filename: function(req, file, cb){
//         return cb(null, `${Date.now()}_${file.originalname}`)
//     }
// })

const storage = multer.memoryStorage();


let pdfText = 'not available';
const upload = multer({storage})
app.post('/upload', upload.single('file'), async (req, res) => {
    if(req.file != null) {
    try {
        const pdfBuffer = req.file.buffer;

        const data = await pdfParser(pdfBuffer);
        pdfText = data.text;

        //console.log(pdfText); //log pdf text to see

        res.send('PDF content extracted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error extracting PDF content')
    }
}else {
    console.log('no file');
    pdfText = "not available";
}
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running`);
})
