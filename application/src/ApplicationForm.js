import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { TextareaAutosize } from "@mui/base";

export default function ApplicationForm() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    dob: "",
    email: "",
    schoolName: "",
    schoolCity: "",
    schooolState: "",
    programsOfInterest: [],
    resumeText: "",
    resume: null,
    uploadedFileName: "",
  });

  let today = new Date(Date.now());
  today = today.toISOString().substring(0, 10);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log(data);
  };

  const handleProgramChange = (e) => {
    const programValue = e.target.name;
    const isChecked = e.target.checked;
    const updatedPrograms = isChecked
      ? [...data.programsOfInterest, programValue] // Add the program
      : data.programsOfInterest.filter((program) => program !== programValue); // Remove the program
    setData({ ...data, programsOfInterest: updatedPrograms });
  };

  const max_file = 1048576;
  const fileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > max_file) {
        alert("File size exceeds 1 MB");
      } else {
        setData({
          ...data,
          resume: file,
          manualInputVisible: false,
          uploadedFileName: file.name,
        });
      }
    }
  };
  console.log(today);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Data:", data);

    const formDataToSend = new FormData();

    for (let key in data) {
      if (key === "programsOfInterest") {
        data[key].forEach((program) => {
          formDataToSend.append("programsOfInterest", program);
        });
      } else {
        formDataToSend.append(key, data[key]);
      }
    }

    formDataToSend.forEach((value, key) => {
      console.log(key, value);
    });

    await fetch("http://localhost:3001/submit", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            alert(data.message);
            window.location.reload();
          });
        } else {
          alert("Error. Try again");
          throw new Error("Request failed");
        }
      })
      .then((d) => {
        console.log(d);
      })
      .catch((error) => {
        console.error(error);
      });
    setData({
      fname: "",
      lname: "",
      dob: "",
      email: "",
      schoolName: "",
      schoolCity: "",
      programsOfInterest: [],
      resumeText: "",
      resume: null,
      uploadedFileName: "",
    });
    console.log(data);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Application Form</h1>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            name="fname"
            label="First Name"
            onChange={handleInputChange}
            required
            fullWidth
            variant="standard"
            value={data.fname}
          />
          <TextField
            name="lname"
            label="Last Name"
            onChange={handleInputChange}
            required
            fullWidth
            value={data.lname}
            variant="standard"
          />{" "}
          <br />
          <br />
          <TextField
            label="Date of Birth"
            name="dob"
            onChange={handleInputChange}
            required
            fullWidth
            type="date"
            value={data.dob}
            InputLabelProps={{
              shrink: true, // This makes the label move above the input when focused
            }}
          />
          <TextField
            name="email"
            label="Email"
            onChange={handleInputChange}
            required
            fullWidth
            value={data.email}
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            name="schoolName"
            label="School Name"
            value={data.schoolName}
            onChange={handleInputChange}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            name="schoolCity"
            label="City"
            onChange={handleInputChange}
            fullWidth
            value={data.schoolCity}
            autoComplete="given-name"
            variant="standard"
          />
          <TextField
            name="schoolState"
            label="State"
            value={data.schoolState}
            onChange={handleInputChange}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />{" "}
          <br />
          <br />
          <Typography variant="h6">Programs of Interest</Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="monthlyMentorship"
                onChange={handleProgramChange}
                checked={data.programsOfInterest.includes("monthlyMentorship")}
              />
            }
            label="Monthly Mentorship"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="fallInternship"
                onChange={handleProgramChange}
                checked={data.programsOfInterest.includes("fallInternship")}
              />
            }
            label="Fall Internship"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="springInternship"
                onChange={handleProgramChange}
                checked={data.programsOfInterest.includes("springInternship")}
              />
            }
            label="Spring Internship"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="AnnualCoop"
                onChange={handleProgramChange}
                checked={data.programsOfInterest.includes("AnnualCoop")}
              />
            }
            label="Annual Coop"
            s
          />
          <Typography variant="h6">Resume</Typography>
          <label htmlFor="contained-button-file">
            <TextField
              type="file"
              placeholder="Upload here"
              onChange={fileUpload}
              style={{ width: "100%" }}
            />
          </label>
          <FormControl fullWidth>
            <TextareaAutosize
              minRows={25} // You can set the minimum number of rows
              name="resumeText"
              placeholder="Paste your resume (up to 500 words)"
              onChange={handleInputChange}
              value={data.resumeText}
              style={{ background: "transparent" }}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ backgroundColor: "#f5f5f5" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}
