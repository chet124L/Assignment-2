var fs = require('fs'); // import the fs module for file operations

class Data { // Define a class to hold the data
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null; // Initialize the data collection variable

function readFile(filePath) { // Function to read a file and return its contents as a Promise
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, dataFromFile) => {  // Read the file using 'fs.readFile'
      if (err) {
        reject(err); //Reject the Promise if there's an error
        return;
      }
      
      const parsedData = JSON.parse(dataFromFile); //// Parse the file content as JSON
      resolve(parsedData); // Resolve the Promise with the parsed data
    });
  });
}

function initialize() { // Function to initialize the data
  return new Promise((resolve, reject) => {
    readFile('../data/students.json') // Read the students file
      .then(studentDataFromFile => {
        return readFile('../data/courses.json') // Read the courses file
          .then(courseDataFromFile => {
            dataCollection = new Data(studentDataFromFile, courseDataFromFile); // Create a new Data instance with the parsed data
            resolve();
          })
          .catch(error => reject(`No courses found: ${error}`)); // Reject the Promise if courses file reading fails
      })
      .catch(error => reject(`No students found: ${error}`));// Reject the Promise if students file reading fails
  });
}

function getAllStudents() { //// Function to retrieve all students
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students && dataCollection.students.length > 0) {
      resolve(dataCollection.students);
    } else {
      reject('No results returned');
    }
  });
}

function getTAs() { // Function to retrieve all TAs 
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students && dataCollection.students.length > 0) {
      const tas = dataCollection.students.filter(student => student.TA);
      if (tas.length > 0) {
        resolve(tas);
      } else {
        reject('No results returned');
      }
    } else {
      reject('No results returned');
    }
  });
}

function getCourses() { // Function to retrieve all courses
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.courses && dataCollection.courses.length > 0) {
      resolve(dataCollection.courses);
    } else {
      reject('No results returned');
    }
  });
}

module.exports = {initialize,getAllStudents,getTAs,getCourses}; // Export the functions as an object

