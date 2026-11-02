import { createContext, useEffect, useState } from "react";
import axios from "axios"

const StudentContext = createContext()

const Studentcontext = (props) => {
    const API = "https://student-database-backend-1-281z.onrender.com"

    const [students, setStudents] = useState([])
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [course, setCourse] = useState("MERN Stack")
    const [status, setStatus] = useState("Active")
    const [search, setSearch] = useState("")
    const [message, setMessage] = useState("")

    const getStudents = () => {
        axios.get(`${API}/students`)
            .then((data) => {
                setStudents(data.data)
            }).catch(() => {
                setMessage("Unable to connect to server")
            })
    }
    useEffect(() => {
        getStudents()
    }, [])

    const addStudent = (e) => {
        e.preventDefault()
        if (!name || !age || !course || !status) {
            setMessage("Please fill all fields")
            return
        }
        axios.post(`${API}/addstudent`, {
            name: name,
            age: Number(age),
            course: course,
            status: status
        }).then(() => {
            setName("")
            setAge("")
            setCourse("MERN Stack")
            setStatus("Active")

            setMessage("Student added successfully!")
            getStudents()
        }).catch(() => {
            setMessage("Unable to add student")
        })
    }

    const deleteStudent = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Student?")
        if (confirmDelete) {
            axios.delete(`${API}/delete/${id}`)
                .then(() => {
                    setMessage("Student deleted successfully!")
                    getStudents()
                })
        }
    }

        const updateStudent = (id, studentData) => {
        axios.put(`${API}/update/${id}`, {
            name: studentData?.name,
            age: Number(studentData?.age),
            course: studentData?.course,
            status: studentData?.status
        })
            .then(() => {
                setMessage("Student updated successfully!")
                getStudents()
            })
            .catch(() => {
                setMessage("Unable to update student")
            })
    }

    const updateAll = () => {
        axios.put(`${API}/updateall`)
            .then(() => {
                setMessage("All Active students completed!")
                getStudents()
            })
    }

    const deleteAll = () => {
        const confirmDelete = window.confirm("Warning! Delete All student records?")
        if (confirmDelete) {
            axios.delete(`${API}/deleteall`)
                .then(() => {
                    setMessage("All students deleted!")
                    getStudents()
                })
        }
    }

    const searchStudents = () => {
        if (search.trim() === "") {
            getStudents()
            return
        }
        axios.get(`${API}/search/${encodeURIComponent(search)}`)
            .then((data) => {
                setStudents(data.data)
            })
            .catch(() => {
                setMessage("Search failed")
            })
    }

    const operatorSearch = (type) => {
        axios.get(`${API}/operators/${type}`)
            .then((data) => {
                setStudents(data.data)
                setMessage("Query results loaded")
            })
            .catch(() => {
                setMessage("unable to fetch data")
            })
    }

    const activeCount = students.filter(
        (student) =>
            student.status === "Active"
    ).length

    const completedCount = students.filter(
        (student)=> student.status==="Completed"
    ).length

    return (
        <StudentContext.Provider value={{
            students, name, setName, age, setAge, course, setCourse, status,
            setStatus, search, setSearch, message, setMessage, getStudents, addStudent, deleteStudent
            , updateStudent, updateAll, deleteAll, searchStudents, operatorSearch,
            activeCount, completedCount
        }}>
            {props.children}
        </StudentContext.Provider>
    )
}
export default Studentcontext
export { StudentContext }