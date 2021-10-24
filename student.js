/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() { console.log(`${this.name} is a ${year} year student`)},
    addCourse(course) { this.courses.push(course) },
    listCourses() { console.log(this.courses)},
    addNote(code, note) {
      this.courses.forEach(course => {
        if (course.code === code) {
          course.note = course.note === undefined ? note : course.note + '; ' + note;
        }
      });
    },
    updateNote(code, note) {
      this.courses.forEach(course => {
        if (course.code === code) {
          course.note = note;
        }
      });
    },
    viewNotes() {
      this.courses.forEach(course => {
        if (course.note !== undefined) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },
  };
}

const school = (() => {
  let students = [];
  let allowedYears = ['1st', '2nd', '3rd', '4th', '5th'];
  function getCourse(student, courseName) {
    return student.listCourses().filter(course => course.name === courseName)[0];
  }

  return {
    addStudent(name, year) {
      if (!allowedYears.includes(year)) {
        console.log("Invalid Year");
      } else {
        let student = createStudent(name, year)
        students.push(student);
        return student;
      }
    },
    enrollStudent(student, courseName, courseCode) {
      let course = {name: courseName, code: courseCode};
      student.addCourse(course);
    },
    addGrade(student, courseName, grade) {
      let course = getCourse(student, courseName);
      if (course) course.grade = grade;
    },
    getReportCard(student) {
      student.listCourses().forEach(course => {
        console.log(`${course.name}: ` + (course.grade === undefined ? "In Progress" : `${course.grade}`));
      });
    },
    courseReport(courseName) {
      let courseStudents = students.map(student => {
        let course = getCourse(student, courseName) || {grade: undefined};
        return {name: student.name, grade: course.grade };
      }).filter(({grade}) => grade);
  
      if (courseStudents.length > 0) {
        course.log(`=${courseName} Grades=`);
  
        const average = courseStudents.reduce((total, {name, grade}) => {
          console.log(`${name}: ${String(grade)}`);
          return total + grade;
        }, 0) / courseStudents.length;
  
        console.log('---');
        console.log(`Course Average: ${String(average)}`);
      }
    },
  };
})();