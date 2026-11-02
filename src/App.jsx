import { useContext, useState } from 'react'
import { StudentContext } from './context/studentcontext'


function App() {
  const { students, name, setName, age, setAge, course, setCourse, status,
    setStatus, search, setSearch, message, setMessage, addMessage, setAddMessage,
    recordsMessage, setRecordsMessage,
    getStudents, addStudent, deleteStudent,
    updateStudent, updateAll, deleteAll, searchStudents, operatorSearch,
    activeCount, completedCount } = useContext(StudentContext)

  // Separate state for Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editAge, setEditAge] = useState('')
  const [editCourse, setEditCourse] = useState('')
  const [editStatus, setEditStatus] = useState('')

  const openEditModal = (student) => {
    setEditId(student._id)
    setEditName(student.name || '')
    setEditAge(student.age || '')
    setEditCourse(student.course || '')
    setEditStatus(student.status || 'Active')
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditId(null)
    setEditName('')
    setEditAge('')
    setEditCourse('')
    setEditStatus('Active')
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editId) return

    const updated = await updateStudent(editId, {
      name: editName,
      age: Number(editAge),
      course: editCourse,
      status: editStatus
    })
    if (updated) {
      closeEditModal()
    }
  }

  const handleAddSubmit = (e) => {
    addStudent(e)
  }

  const activeStudents = students.filter((student) => student.status !== "Completed")
  const completedStudents = students.filter((student) => student.status === "Completed")

  const renderStudentCards = (studentList) => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {studentList.map((student) => (
        <div className='border border-teal-100 bg-[#FCFAFF] p-5 rounded-2xl hover:shadow-md transition' key={student._id}>
          <div className='flex justify-between items-start gap-3'>
            <div>
              <h3 className='text-lg font-bold text-[#115E59]'>{student.name}</h3>
              <p className='text-teal-500 text-sm mt-1'>Student ID:{student._id ? student._id.slice(-6) : 'N/A'}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-2 rounded-full ${student.status === "Completed"
              ? "bg-green-100 text-green-700" : "bg-teal-100 text-teal-700"
              }`}>{student.status}</span>
          </div>
          <div className='mt-4 space-y-2 text-sm text-gray-600'>
            <p>🎂 Age:{student.age}</p>
            <p>📚 Course:{student.course}</p>
          </div>
          <div className='flex gap-2 mt-5'>
            <button onClick={() => openEditModal(student)}
              className='student-action-button flex-1 bg-[#CCFBF1] text-teal-900 py-2 rounded-lg text-sm font-semibold hover:bg-[#99F6E4]'>
              Edit
            </button>
            {student.status !== "Completed" && (
              <button onClick={() => updateStudent(student._id, { status: "Completed" })}
                className='student-action-button flex-1 bg-[#0D9488] text-white py-2 rounded-lg text-sm font-semibold'>
                Complete
              </button>
            )}
            <button onClick={() => deleteStudent(student._id)}
              className='student-action-button flex-1 bg-red-100 text-red-600 py-2 rounded-lg text-sm font-semibold'>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <>
      <div className="min-h-screen bg-[#ECFDF5] p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className='flex flex-col sm:flex-row sm:justify-between items-center sm:items-center gap-4 mb-8 text-center sm:text-left'>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#115E59]">CampusHub</h1>
              <p className='text-teal-600 mt-1'>Student Management Dashboard</p>
            </div>
            <div className='bg-white px-11 py-3 sm:px-5 rounded-2xl shadow-sm'>
              <p className='text-sm text-teal-500'>Welcome Back!</p>
              <p className='font-bold text-[#115E59]'>Admin Dashboard✨</p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
            <div className='bg-[#0F766E] text-white p-6 rounded-2xl shadow-lg'>
              <p className='text-teal-50'>Total Students</p>
              <h2 className='text-4xl font-bold mt-2'>{students.length}</h2>
            </div>
            <div className='bg-white p-6 rounded-2xl shadow-sm border border-teal-100'>
              <p className='text-teal-600'>Active Students</p>
              <h2 className='text-4xl font-bold text-[#0F766E] mt-2'>{activeCount}</h2>
            </div>
            <div className='bg-white p-6 rounded-2xl shadow-sm border border-teal-100'>
              <p className='text-teal-600'>Completed Students</p>
              <h2 className='text-4xl font-bold text-[#0F766E] mt-2'>{completedCount}</h2>
            </div>
          </div>
          {/* Add New Student Form - Separate Section */}
          <div className='bg-white rounded-3xl p-5 md:p-8 shadow-sm mb-8'>
            <h2 className='text-2xl font-bold text-[#115E59] mb-6'>+ Add New Student</h2>
            <form onSubmit={handleAddSubmit}>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <div>
                  <label htmlFor="student-name" className='block text-teal-900 font-semibold mb-2'>Student Name</label>
                  <input id="student-name" type="text" value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter student name' className='w-full p-3 rounded-xl bg-[#F8F5FF]
                     border border-teal-200 outline-none focus:border-teal-600' />
                </div>
                <div>
                  <label htmlFor="student-age" className='block text-teal-900 font-semibold mb-2'>Student Age</label>
                  <input id="student-age" type="number" min='1' value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder='Enter age' className='w-full p-3 rounded-xl bg-[#F8F5FF] border 
                    border-teal-200 outline-none focus:border-teal-600' />
                </div>
                <div>
                  <label htmlFor="student-course" className='block text-teal-900 font-semibold mb-2'>Course</label>
                  <select id="student-course" value={course} onChange={(e) => setCourse(e.target.value)} className='w-full p-3 rounded-xl bg-[#F8F5FF] border border-teal-200 outline-none focus:border-teal-600'><option>MERN Stack</option>
                    <option>React JS</option>
                    <option>Full Stack</option>
                    <option>Node JS</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="student-status" className='block text-teal-900 font-semibold mb-2'>Student Status</label>
                  <select id="student-status" value={status} onChange={(e) => setStatus(e.target.value)}
                    className='w-full p-3 rounded-xl bg-[#F8F5FF] border border-teal-200
                      outline-none focus:border-teal-600'>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <button type='submit' className='mt-6 w-full sm:w-auto bg-[#0F766E] hover:bg-[#115E59] text-white font-bold px-8
                py-3 rounded-xl transition cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200'>+ Add Student</button>
            </form>
            {addMessage && (
              <div role='status' className='mt-4 flex items-center justify-between text-green-700 font-semibold'>
                <span>{addMessage}</span>
                <button type='button' aria-label='Close success message'
                  className='ml-4 font-bold cursor-pointer hover:text-green-900 active:scale-95 transition-transform duration-150'
                  onClick={() => setAddMessage('')}>X</button>
              </div>
            )}
          </div>

          <div className='bg-white rounded-3xl p-5 md:p-8 shadow-sm mb-8'>
            <h2 className='text-xl font-bold text-[#115E59] mb-4'>Search Student</h2>
            <div className='flex flex-col sm:flex-row gap-3'>
              <select value={search}
                onChange={(e) => setSearch(e.target.value)} className='flex-1 p-3 rounded-xl bg-[#F8F5FF] border border-teal-200 outline-none'>
                <option value="">All Course</option>
                <option value="MERN Stack">MERN Stack</option>
                <option value="React JS">React JS</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Node JS">Node JS</option>
              </select>
              <button onClick={searchStudents}
                className='bg-[#0F766E] text-white px-7 py-3 rounded-xl font-bold 
                hover:bg-[#115E59] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200'>Search</button>
              <button onClick={() => {
                setSearch('')
                getStudents()
              }} className='bg-[#0F766E] text-teal-900 px-7 py-3
                rounded-xl font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200'>Reset</button>
            </div>
          </div>
          <div className='bg-white rounded-3xl p-5 md:p-8 shadow-sm mb-8'>
            <h2 className='text-xl font-bold text-[#115E59] mb-2'>MongoDB Query</h2>
            <p className='text-sm text-teal-600 mb-5'>Click a button to practice MongoDB queries.</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              <button onClick={() => operatorSearch("gt")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200'>$gt - Age 18+ </button>
              <button onClick={() => operatorSearch("lt")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200'>$lt - Age below 25 </button>
              <button onClick={() => operatorSearch("in")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200'>$in - Courses </button>
              <button onClick={() => operatorSearch("and")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200'>$and - Conditions</button>
              <button onClick={() => operatorSearch("or")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200'>$or - Conditions</button>
              <button onClick={() => operatorSearch("exists")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200'>$exists - Status</button>
            </div>
            <button className='mt-4 bg-[#115E59] text-white px-5 py-2 rounded-xl font-semibold cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200' onClick={getStudents}>
              Show All Students</button>
          </div>
          {message && (
            <div className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl mb-5 font-medium'>
              {message}
              <button className='float-right font-bold cursor-pointer hover:text-teal-700 active:scale-95 transition-transform duration-150' onClick={() => setMessage('')}>X</button>
            </div>
          )}

          <div className='bg-white rounded-3xl p-5 md:p-8 shadow-sm'>
            <div className='flex flex-col sm:flex-row justify-between gap-4 mb-6'>
              <div>
                <h2 className='text-2xl font-bold text-[#115E59]'>Student Records</h2>
                <p className='text-teal-500 text-sm mt-1'>All student information</p>
              </div>
              <div className='flex flex-wrap gap-2'>
                <button className='bg-[#CCFBF1] text-teal-900
              px-4 py-2 rounded-xl text-sm font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200' onClick={() => {
                if (window.confirm('Mark all students as Completed?')) {
                  updateAll();
                }
              }}>
                Complete All
                </button>
                <button className='bg-red-100 text-red-600
              px-4 py-2 rounded-xl text-sm font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200' onClick={() => {
                if (window.confirm('Are you sure you want to delete all students? This cannot be undone.')) {
                  deleteAll();
                }
              }}>
                Delete All
                </button>
                </div>
            </div>
            {recordsMessage && (
              <div role='status' className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl mb-5 font-medium flex items-center justify-between'>
                <span>{recordsMessage}</span>
                <button type='button' aria-label='Close success message'
                  className='ml-4 font-bold cursor-pointer hover:text-teal-700 active:scale-95 transition-transform duration-150'
                  onClick={() => setRecordsMessage('')}>X</button>
              </div>
            )}

            {students.length === 0 ?(
              <div className='text-center py-12'>
                <p className='text-5xl mb-3'>🎓</p>
                <h3 className='text-xl font-bold text-teal-900'>No Students Found</h3>
                <p className='text-teal-500 mt-2'>Add a new student to see records here.</p>
              </div>
            ):(
              <div className='space-y-8'>
                <section>
                  <h3 className='text-lg font-bold text-[#115E59] mb-4'>Active Students</h3>
                  {activeStudents.length > 0
                    ? renderStudentCards(activeStudents)
                    : <p className='text-teal-500 text-sm'>No active students.</p>}
                </section>
                <section>
                  <h3 className='text-lg font-bold text-[#115E59] mb-4'>Completed Students</h3>
                  {completedStudents.length > 0
                    ? renderStudentCards(completedStudents)
                    : <p className='text-teal-500 text-sm'>No completed students.</p>}
                </section>
              </div>
            )}
          </div>
          
          {/* Edit Student Modal */}
          {isEditModalOpen && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm' onClick={closeEditModal}>
              <div className='bg-white rounded-2xl p-6 md:p-8 w-full max-w-md mx-4 shadow-xl transform transition scale-100' onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between items-center mb-6'>
                  <h3 className='text-xl font-bold text-[#115E59]'>✏️ Edit Student</h3>
                </div>
                <form onSubmit={handleEditSubmit}>
                  <div className='space-y-4'>
                    <div>
                      <label htmlFor="edit-student-name" className='block text-teal-900 font-semibold mb-2'>Student Name</label>
                      <input id="edit-student-name" type="text" value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder='Enter student name' className='w-full p-3 rounded-xl bg-[#F8F5FF]
                         border border-teal-200 outline-none focus:border-teal-600' />
                    </div>
                    <div>
                      <label htmlFor="edit-student-age" className='block text-teal-900 font-semibold mb-2'>Student Age</label>
                      <input id="edit-student-age" type="number" min='1' value={editAge}
                        onChange={(e) => setEditAge(e.target.value)}
                        placeholder='Enter age' className='w-full p-3 rounded-xl bg-[#F8F5FF] border 
                        border-teal-200 outline-none focus:border-teal-600' />
                    </div>
                    <div>
                      <label htmlFor="edit-student-course" className='block text-teal-900 font-semibold mb-2'>Course</label>
                      <select id="edit-student-course" value={editCourse} onChange={(e) => setEditCourse(e.target.value)} className='w-full p-3 rounded-xl bg-[#F8F5FF] border border-teal-200 outline-none focus:border-teal-600'>
                        <option>MERN Stack</option>
                        <option>React JS</option>
                        <option>Full Stack</option>
                        <option>Node JS</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="edit-student-status" className='block text-teal-900 font-semibold mb-2'>Student Status</label>
                      <select id="edit-student-status" value={editStatus} onChange={(e) => setEditStatus(e.target.value)}
                        className='w-full p-3 rounded-xl bg-[#F8F5FF] border border-teal-200
                          outline-none focus:border-teal-600'>
                        <option>Active</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>
                  <div className='mt-6 flex gap-3'>
                    <button type='submit' className='flex-1 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold py-3 rounded-xl transition cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200'>
                      Save Changes
                    </button>
                    <button type='button' onClick={closeEditModal}
                      className='flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200'>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className='text-center py-8 text-teal-500 text-sm'>
            Made With 💜 CampusHub Management System
          </div>
        </div>
      </div>
    </>
  )
}
export default App
