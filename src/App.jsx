
import { useContext } from 'react'
import { StudentContext } from './context/studentcontext'


function App() {
  const { students, name, setName, age, setAge, course, setCourse, status,
    setStatus, search, setSearch, message, setMessage, getStudents, addStudent, deleteStudent
    , updateStudent, updateAll, deleteAll, searchStudents, operatorSearch,
    activeCount, completedCount } = useContext(StudentContext)

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
          {message && (<div className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl mb-5 font-medium'>{message}
            <button className='float-right font-bold' onClick={() => setMessage('')}>X</button>
          </div>)}

          <div className='bg-white rounded-3xl p-5 md:p-8 shadow-sm mb-8'>
            <h2 className='text-2xl font-bold text-[#115E59] mb-6'>+ Add New Student</h2>
            <form onSubmit={addStudent}>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <div>
                  <label className='block text-teal-900 font-semibold mb-2'>Student Name</label>
                  <input type="text" value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter student name' className='w-full p-3 rounded-xl bg-[#F8F5FF]
                     border border-teal-200 outline-none focus:border-teal-600' />
                </div>
                <div>
                  <label className='block text-teal-900 font-semibold mb-2'>Student Age</label>
                  <input type="number" min='1' value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder='Enter age' className='w-full p-3 rounded-xl bg-[#F8F5FF] border 
                    border-teal-200 outline-none focus:border-teal-600' />
                </div>
                <div>
                  <label className='block text-teal-900 font-semibold mb-2'>Course</label>
                  <select value={course} onChange={(e) => setCourse(e.target.value)} className='w-full p-3 rounded-xl bg-[#F8F5FF] border border-teal-200 outline-none focus:border-teal-600'><option>MERN Stack</option>
                    <option>React JS</option>
                    <option>Full Stack</option>
                    <option>Node JS</option>
                  </select>
                </div>
                <div>
                  <label className='block text-teal-900 font-semibold mb-2'>Student Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}
                    className='w-full p-3 rounded-xl bg-[#F8F5FF] border border-teal-200
                      outline-none focus:border-teal-600'>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <button type='submit' className='mt-6 w-full sm:w-auto bg-[#0F766E] hover:bg-[#115E59] text-white font-bold px-8
                py-3 rounded-xl transition'>+ Add Student</button>
            </form>
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
                hover:bg-[#115E59]'>Search</button>
              <button onClick={() => {
                setSearch('')
                getStudents()
              }} className='bg-[#0F766E] text-teal-900 px-7 py-3
                rounded-xl font-bold'>Reset</button>
            </div>
          </div>
          <div className='bg-white rounded-3xl p-5 md:p-8 shadow-sm mb-8'>
            <h2 className='text-xl font-bold text-[#115E59] mb-2'>MongoDB Query</h2>
            <p className='text-sm text-teal-600 mb-5'>Click a button to practice MongoDB queries.</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              <button onClick={() => operatorSearch("gt")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4]'>$gt - Age 18+ </button>
              <button onClick={() => operatorSearch("lt")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4]'>$lt - Age below 25 </button>
              <button onClick={() => operatorSearch("in")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4]'>$in - Courses </button>
              <button onClick={() => operatorSearch("and")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4]'>$and - Conditions</button>
              <button onClick={() => operatorSearch("or")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4]'>$or - Conditions</button>
              <button onClick={() => operatorSearch("exists")}
                className='bg-[#CCFBF1] text-teal-900 p-3 rounded-xl font-semibold
                hover:bg-[#99F6E4]'>$exists - Status</button>
            </div>
            <button className='mt-4 bg-[#115E59] text-white px-5 py-2 rounded-xl font-semibold' onClick={getStudents}>
              Show All Students</button>
          </div>
          <div className='bg-white rounded-3xl p-5 md:p-8 shadow-sm'>
            <div className='flex flex-col sm:flex-row justify-between gap-4 mb-6'>
              <div>
                <h2 className='text-2xl font-bold text-[#115E59]'>Student Records</h2>
                <p className='text-teal-500 text-sm mt-1'>All student information</p>
              </div>
              <div className='flex flex-wrap gap-2'><button className='bg-[#CCFBF1] text-teal-900
              px-4 py-2 rounded-xl text-sm font-bold' onClick={updateAll}>
                Complete All
                </button>
                <button className='bg-red-100 text-red-600
              px-4 py-2 rounded-xl text-sm font-bold' onClick={deleteAll}>
                Delete All
                </button>
                </div>
            </div>
            
            {students.length === 0 ?(
              <div className='text-center py-12'>
                <p className='text-5xl mb-3'>🎓</p>
                <h3 className='text-xl font-bold text-teal-900'>No Students Found</h3>
                <p className='text-teal-500 mt-2'>Add a new student to see records here.</p>
              </div>
            ):(
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {students.map((student)=>(<div className='border border-teal-100 bg-[#FCFAFF] p-5 rounded-2xl hover:shadow-md transition' key={student._id}>
                  <div className='flex justify-between items-start gap-3'>
                    <div>
                      <h3 className='text-lg font-bold text-[#115E59]'>{student.name}</h3>
                      <p className='text-teal-500 text-sm mt-1'>Student ID:{student._id.slice(-6)}</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-2 rounded-full ${student.status === "Completed"
                      ?"bg-green-100 text-green-700":"bg-teal-100 text-teal-700"
                    }`}>{student.status}</span>
                  </div>
                  <div className='mt-4 space-y-2 text-sm text-gray-600'>
                    <p>🎂 Age:{student.age}</p>
                    <p>📚 Course:{student.course}</p>
                  </div>
                  <div className='flex gap-2 mt-5'>
                    {student.status !== "Completed" && ( <button onClick={()=>updateStudent(student._id)}
                      className='flex-1 bg-[#0D9488] text-white py-2 rounded-lg text-sm font-semibold'>
                        Complete
                      </button>)}
                      <button onClick={()=>deleteStudent(student._id)}
                        className='flex-1 bg-red-100 text-red-600 py-2 rounded-lg text-sm font-semibold'>
                          Delete
                        </button>
                  </div>
                </div>))}
              </div>
            )}
          </div>
          
          <div className='text-center py-8 text-teal-500 text-sm'>
            Made With 💜 Studently Management System
          </div>
        </div>
      </div>
    </>
  )
}
export default App
