import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { adminCredentials, facultyCredentials, initialStudents, initialFaculties } from '../data/studentData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [faculties,setFaculties]=useState(()=>{
    try {
      const saved=JSON.parse(localStorage.getItem('faculty_db'))
      return Array.isArray(saved)?saved:initialFaculties
    } catch {
      return initialFaculties
    }
  })
  const [students, setStudents] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('students_db'))
      if (!Array.isArray(saved)) return initialStudents
      return initialStudents.map((seed) => {
        const existing = saved.find((item) => item.registerNumber === seed.registerNumber)
        return existing ? { ...seed, ...existing } : seed
      }).concat(saved.filter((item) => !initialStudents.some((seed) => seed.registerNumber === item.registerNumber)))
    } catch {
      return initialStudents
    }
  })
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('auth_user')) || null
    } catch {
      return null
    }
  })

  useEffect(() => {
    localStorage.setItem('students_db', JSON.stringify(students))
  }, [students])

  useEffect(() => {
    localStorage.setItem('faculty_db', JSON.stringify(faculties))
  }, [faculties])

  useEffect(() => {
    if (currentUser) sessionStorage.setItem('auth_user', JSON.stringify(currentUser))
    else sessionStorage.removeItem('auth_user')
  }, [currentUser])

  useEffect(() => {
    const syncStudents = (event) => {
      if (event.key !== 'students_db') return
      try {
        const saved = JSON.parse(event.newValue)
        if (Array.isArray(saved)) setStudents(saved)
      } catch {
        return
      }
    }
    window.addEventListener('storage', syncStudents)
    return () => window.removeEventListener('storage', syncStudents)
  }, [])

  const loginAdmin = (username, password) => {
    if (username !== adminCredentials.username || password !== adminCredentials.password) {
      return { success: false, message: 'Invalid admin credentials.' }
    }
    const user = { role: 'admin', name: 'System Administrator', username }
    setCurrentUser(user)
    return { success: true, user }
  }

  const loginStudent = (registerNumber, password) => {
    const found = students.find((item) =>
      item.registerNumber.toLowerCase() === registerNumber.trim().toLowerCase()
    )
    if (!found) return { success: false, message: 'No student record was found for this register number.' }
    if (!found.isActive) return { success: false, message: 'Your portal access has been revoked. Contact the administrator.' }
    if (found.password !== password) return { success: false, message: 'Invalid student password or PIN.' }
    const user = { role: 'student', registerNumber: found.registerNumber }
    setCurrentUser(user)
    return { success: true, user }
  }

  const loginFaculty = (username, password) => {
    const member = faculties.find((item) =>
      item.username.toLowerCase() === username.trim().toLowerCase()
    )
    if (!member || member.password !== password) {
      return { success: false, message: 'Invalid faculty credentials.' }
    }
    if (!member.isActive) return { success: false, message: 'Your faculty account access has been revoked.' }
    const user = { role: 'faculty', name: member.name, username: member.username, employeeId: member.employeeId }
    setCurrentUser(user)
    return { success: true, user }
  }

  const login = (identifier, password) => {
    const value = identifier.trim()
    if (value.toLowerCase() === adminCredentials.username.toLowerCase()) return loginAdmin(value, password)
    const facultyMatch = faculties.find((item) => item.username.toLowerCase() === value.toLowerCase())
    if (facultyMatch) return loginFaculty(value, password)
    return loginStudent(value, password)
  }

  const addFaculty=(member)=>{
    const exists=faculties.some((item)=>item.username.toLowerCase()===member.username.trim().toLowerCase()||item.employeeId.toLowerCase()===member.employeeId.trim().toLowerCase())
    if(exists)return {success:false,message:'A faculty account with this username or employee ID already exists.'}
    setFaculties((current)=>[...current,member])
    return {success:true}
  }

  const toggleFacultyAccess=(employeeId)=>{
    setFaculties((current)=>current.map((item)=>item.employeeId===employeeId?{...item,isActive:!item.isActive}:item))
  }

  const updateFaculty=(employeeId,updates)=>{
    setFaculties((current)=>current.map((item)=>item.employeeId===employeeId?{...item,...updates,id:updates.employeeId||item.employeeId}:item))
    if (currentUser?.role==='faculty'&&currentUser.employeeId===employeeId) {
      setCurrentUser((current)=>({...current,name:updates.name||current.name,username:updates.username||current.username,employeeId:updates.employeeId||current.employeeId}))
    }
  }

  const deleteFaculty=(employeeId)=>{
    setFaculties((current)=>current.filter((item)=>item.employeeId!==employeeId))
  }

  const addStudent = (student) => {
    const exists = students.some((item) => item.registerNumber.toLowerCase() === student.registerNumber.trim().toLowerCase())
    if (exists) return { success: false, message: 'A student with this register number already exists.' }
    setStudents((current) => [...current, student])
    return { success: true }
  }

  const toggleStudentAccess = (registerNumber) => {
    setStudents((current) => current.map((item) =>
      item.registerNumber === registerNumber ? { ...item, isActive: !item.isActive } : item
    ))
  }

  const deleteStudent = (registerNumber) => {
    setStudents((current) => current.filter((item) => item.registerNumber !== registerNumber))
  }

  const updateStudent=(registerNumber,updates)=>{
    setStudents((current)=>current.map((item)=>item.registerNumber===registerNumber?{
      ...item,
      ...updates,
      id:updates.registerNumber||item.registerNumber,
      firstName:(updates.name||item.name).trim().split(' ')[0],
    }:item))
    if (currentUser?.role==='student'&&currentUser.registerNumber===registerNumber&&updates.registerNumber) {
      setCurrentUser((current)=>({...current,registerNumber:updates.registerNumber}))
    }
  }

  const logout = () => setCurrentUser(null)

  const loggedInStudent = useMemo(() => {
    if (currentUser?.role !== 'student') return null
    return students.find((item) => item.registerNumber === currentUser.registerNumber && item.isActive) || null
  }, [currentUser, students])

  const value = {
    faculties,
    students,
    currentUser,
    role: currentUser?.role || null,
    loggedInStudent,
    loginAdmin,
    loginFaculty,
    login,
    loginStudent,
    addStudent,
    toggleStudentAccess,
    deleteStudent,
    updateStudent,
    updateFaculty,
    addFaculty,
    toggleFacultyAccess,
    deleteFaculty,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
