import { createContext, useEffect, useState } from "react";
import axios from "axios"

const StudentContext = createContext()

const Studentcontext = (props) => {
    const API = import.meta.env.VITE_API_URL

    const [students, setStudents] = useState([])
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [course, setCourse] = useState("MERN Stack")
    const [status, setStatus] = useState("Active")
    const [search, setSearch] = useState("")
    const [message, setMessage] = useState("")
    const [addMessage, setAddMessage] = useState("")
    const [recordsMessage, setRecordsMessage] = useState("")

    const getStudents = async () => {
        if (!API) {
            setMessage("Student API URL is not configured. Set VITE_API_URL and restart the frontend.")
            return null
        }

        try {
            const { data } = await axios.get(`${API}/students`)
            if (!Array.isArray(data)) {
                throw new Error("The student API returned an invalid records response.")
            }
            setStudents(data)
            return data
        } catch (error) {
            const responseMessage = error.response?.data?.message
                || (typeof error.response?.data === "string" ? error.response.data : "")
            setMessage(responseMessage || error.message || "Unable to connect to server")
            return null
        }
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
        setAddMessage("")
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
            setMessage("")
            setAddMessage("Student Added Successfully!")
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

    const updateStudent = async (id, studentData) => {
        const updates = { ...studentData }
        if (studentData?.age !== undefined) {
            updates.age = Number(studentData.age)
        }

        try {
            if (!API) {
                throw new Error("Student API URL is not configured.")
            }

            const { data: responseData } = await axios.put(`${API}/update/${id}`, updates)
            let savedStudent = responseData?.student || responseData?.data || responseData
            const returnedId = savedStudent?._id || savedStudent?.id

            if (returnedId && String(returnedId) !== String(id)) {
                throw new Error("The server returned a different student record.")
            }

            if (!returnedId) {
                const { data: refreshedStudents } = await axios.get(`${API}/students`)
                if (!Array.isArray(refreshedStudents)) {
                    throw new Error("The server returned an invalid student list.")
                }
                savedStudent = refreshedStudents.find(
                    (student) => String(student._id || student.id) === String(id)
                )
                if (!savedStudent) {
                    throw new Error("The updated student could not be found.")
                }
            }

            setStudents((currentStudents) => currentStudents.map((student) =>
                String(student._id || student.id) === String(id)
                    ? { ...student, ...savedStudent, ...updates }
                    : student
            ))
            setMessage("")
            setRecordsMessage("Student Updated Successfully!")
            return true
        } catch (error) {
            const responseMessage = error.response?.data?.message
                || (typeof error.response?.data === "string" ? error.response.data : "")
            setMessage(responseMessage || error.message || "Unable to update student")
            return false
        }
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
            setStatus, search, setSearch, message, setMessage,
            addMessage, setAddMessage, recordsMessage, setRecordsMessage,
            getStudents, addStudent, deleteStudent
            , updateStudent, updateAll, deleteAll, searchStudents, operatorSearch,
            activeCount, completedCount
        }}>
            {props.children}
        </StudentContext.Provider>
    )
}
export default Studentcontext
export { StudentContext }