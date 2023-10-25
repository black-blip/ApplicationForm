const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const port = 3001;
const mysql = require("mysql2");

app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
  user: "root",
  password: "root",
  host: "localhost",
  database: "Users",
  insecureAuth: true,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

app.post("/submit", upload.single("resume"), async (req, res) => {
  const {
    fname,
    lname,
    dob,
    email,
    schoolName,
    schoolCity,
    schoolState,
    programsOfInterest,
    resumeText,
  } = req.body;
  console.log(req.body);
  const resumeFile = req.file;
  console.log(resumeFile);
  // console.log("POI", programsOfInterest);
  const query =
    "INSERT INTO UserDetails (fname,lname, dob, email, schoolName, City,State,programofinterest,resume) VALUES (?, ?, ?, ?, ?, ?,?,?,?)";
  db.query(
    query,
    [
      fname,
      lname,
      dob,
      email,
      schoolName,
      schoolCity,
      schoolState,
      JSON.stringify(programsOfInterest),
      resumeText,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred" });
      } else {
        res.status(200).json({
          message: `Thank you, ${fname}! Your information has been submitted. Someone from our team will be in touch shortly.`,
        });
      }
    }
  );
});
