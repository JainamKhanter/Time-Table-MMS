import React,{useState,useEffect} from "react";
import Courses from "./Courses";
import "./App.css"
import Overlay from "./Overlay";
import CourseForm from "./CourseForm";
import ttImage from './tt.png'; // Import the image
import NotesCard from "./NotesCard";
import Timetable from "./TimeTableDynamic";
import axios from "axios"
import Navbar from "./Navbar";




function MyCourses() {

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  

//   const [courses, setCourses] = useState([
//     { title: "Machine Learning", date: "2 December - 3 March", lectures: "5/20", color: "#d0c1ff", id: "1256" },
//     { title: "Project Management", date: "2 December - 3 March", lectures: "7/18", color: "#d0ffc1", id: "1246" },
//     { title: "Algorithm Analysis", date: "2 December - 3 March", lectures: "8/20", color: "#c1fff3", id: "1156" },
//     { title: "Cloud Computing", date: "2 December - 3 March", lectures: "5/18", color: "#ffd6c1", id: "1776" }
//   ]);

  const notesData = [
    { subject: 'Machine Learning', notes_up: 50, notes_exp: 100, color: '#d0c1ff' },
    { subject: 'Project Planning', notes_up: 30, notes_exp: 80, color: '#C8F1CA' },
    { subject: 'Algorithm Analysis', notes_up: 70, notes_exp: 100, color: '#C8F1E5' },
    { subject: 'Cloud Computing', notes_up: 70, notes_exp: 100, color: '#FDE3D8' }
  ];

   const [info, setInfo] = useState({});
   const [studentId, setId] = useState([]);

//    setId(info.id);

   

//   const getCourses = async (student_id) => {
//     try {
//       const response = await axios.post('http://localhost:5000/student/courses', student_id);
//       console.log('Courses found:', response.data);
//       console.log("hi")
//     } catch (error) {
//       console.error('Error accessing courses:', error);
//     }
//   };
  
//   getCourses(student_id)


  const addCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
    
  };

  const removeCourse = (title) => {
    setCourses(courses.filter(course => course.title !== title));
  };

  const updateCourse = (title, updatedInfo) => {
    setCourses(courses.map(course =>
      course.title === title ? { ...course, ...updatedInfo } : course
    ));
  };

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem('userInfo')));
    setId(info.id);
    console.log(info)
    console.log(studentId);
    // Ensure that studentId is defined before making the request
    if (studentId) {
        // Fetch data from Flask API
        axios.post('http://localhost:5000/student/courses', { student_id: studentId }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
            });
    } else {
        console.error('Student ID is not provided');
    }
}, [studentId]); 

  return (

    

  



    <div className="App" style={{backgroundColor:`white`}}>

      <header>
        {/* <nav className="navbar">
          <h1 className="logo">ET</h1>
        </nav> */}
        <Navbar  />
      </header>
      
      <main>
        <section className="courses-section">
          <h2>Your Courses</h2>
          <p>December 2023</p>
          <div style={{width:"100%",overflowX:"auto",scrollbarWidth:"none"}}>
       <div>
       
       </div>
        <div className="courses">
      {courses.map((course,index) => (
        <div key = {index} className="course-card" style={{ backgroundColor: course.color }}>
            <div>
            <h3>{course.title}</h3>
            <h3 style={{marginRight:"0px"}}>ID:{course.id}</h3>
            </div>
          
          <p>{course.date}</p>
          <div className="Line" style={{marginTop: `75px`,height:`0.8px`,width: `100%`,backgroundColor: `#7D7B7B`}}><p></p></div>
          <div style={{display:"flex", gap:`200px`}}>
          <p>Lectures</p>
          <p >{course.lectures}</p>
          </div>
        </div>
      ))}
      
      <div className="AddCourse" onClick={openModal}> 
        <div style={{height:"100%"}}>
        <p style={{marginTop:`50px`,textAlign:"center",marginBottom:"0px",fontSize:`100px`}}>+</p>
        <p style={{textAlign:`center`,marginTop:`0px`,fontSize:`30px`}}>Add Course</p>
        </div>
        
      </div>
      <Overlay isOpen={isModalOpen} onClose={closeModal}>
        < CourseForm student_id={studentId} onAddCourse={addCourse} onClose={closeModal}/>
      </Overlay>
      
      </div>
      {/* <MyCourses addCourse={addCourse} /> */}

      
    </div>
          
        </section>
        <div className="Box">
           <div style={{marginLeft:"0px", textAlign:"center"}}>
          <h2>Time Table</h2>
          
          <Timetable visible={true} />
          
          </div>
        
        
       <div className="NotesBars" style={{marginLeft: `0px`}}>
        <h2 style={{marginLeft: `10px`}}>Notes</h2>
        {/* <NotesCard
        subject="Machine Learning"
        notes_up={8}
        notes_exp={10}
        color="#d0c1ff"
      />
      <NotesCard
        subject="Project Planning"
        notes_up={5}
        notes_exp={10}
        color="#C8F1CA"
      />
      <NotesCard
        subject="Algorithm Analysis"
        notes_up={7}
        notes_exp={11}
        color="#C8F1E5"
      />
      <NotesCard
        subject="Cloud Computing"
        notes_up={9}
        notes_exp={9}
        color="#FDE3D8"
      /> */}
      {notesData.map((note, index) => (
        <NotesCard
          key={index}
          subject={note.subject}
          notes_up={note.notes_up}
          notes_exp={note.notes_exp}
          color={note.color}
        />
      ))}
      </div>

      </div>

       
     

        
      </main>
      
      

    </div>
  );
}

export default MyCourses;
