
/*********************************************************************************
*  WEB700 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Chester Gil Balbuena Student ID: 113088223 Date: June 3, 2023
*
********************************************************************************/ 


let collegeData = require('./collegeData'); //import college data module 

collegeData.initialize() //initialize the data
  .then(() => {
    console.log('Data configuration successful.');

    collegeData.getAllStudents() //retrieve all students by calling getAllStudents function
      .then(students => {
        console.log(`Successfully retrieved ${students.length} students`);
      })
      .catch(error => { //if there's an error, log the error message.
        console.log(`Error retrieving students: ${error}`);
      });

    collegeData.getCourses() //retrieve all courses 
      .then(courses => {
        console.log(`Successfully retrieved ${courses.length} courses`);
      })
      .catch(error => {
        console.log(`Error retrieving courses: ${error}`);
      });

    collegeData.getTAs() //retrieve all TAs
      .then(tas => {
        console.log(`Successfully retrieved ${tas.length} TAs`);
      })
      .catch(error => { 
        console.log(`Error retrieving TAs: ${error}`); 
      });
  })
  .catch(error => { //catch block to handle any errors the data configuration process.
    console.log(`Data configuration failed: ${error}`); //Log the error message.
  });

