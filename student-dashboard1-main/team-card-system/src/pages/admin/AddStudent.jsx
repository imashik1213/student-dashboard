import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Upload, UserPlus } from 'lucide-react'
import Card from '../../components/ui/Card'
import { useAuth } from '../../context/AuthContext'

const empty = {
  name:'',registerNumber:'',password:'',department:'Computer Science & Engineering',shortDepartment:'CSE',
  year:'I Year',semester:'1st Semester',dob:'',bloodGroup:'O+',email:'',phone:'',emergencyContact:'',
  address:'',photo:'',overallAttendance:85,cgpa:8.5,sgpa:8.5,validity:'Jun 2027',status:'active',isActive:true,
  subjectsCount:6,unreadNotifications:0,
}

export default function AddStudent() {
  const [form,setForm]=useState(empty)
  const [error,setError]=useState('')
  const [preview,setPreview]=useState('')
  const { addStudent }=useAuth()
  const navigate=useNavigate()
  const update=(key,value)=>setForm((current)=>({...current,[key]:value}))
  const upload=(event)=>{
    const file=event.target.files?.[0]
    if (!file)return
    const reader=new FileReader()
    reader.onload=()=>{setPreview(reader.result);update('photo',reader.result)}
    reader.readAsDataURL(file)
  }
  const submit=(event)=>{
    event.preventDefault()
    setError('')
    if (!form.name.trim()||!form.registerNumber.trim()||!form.password.trim()) {
      setError('Full name, register number and access password are required.')
      return
    }
    if (form.password.length<4) {
      setError('Access password or PIN must contain at least 4 characters.')
      return
    }
    const student={
      ...form,
      registerNumber:form.registerNumber.trim().toUpperCase(),
      name:form.name.trim(),
      firstName:form.name.trim().split(' ')[0],
      id:form.registerNumber.trim().toUpperCase(),
      academicYear:'2026 - 2027',
      photo:form.photo||`https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=2563EB&color=fff`,
      fatherName:'Not provided',
      attendance:[
        {code:'CS601',name:'Core Subject I',working:40,present:Math.round(40*(Number(form.overallAttendance)||85)/100),percentage:Number(form.overallAttendance)||85},
        {code:'CS602',name:'Core Subject II',working:38,present:Math.round(38*(Number(form.overallAttendance)||85)/100),percentage:Number(form.overallAttendance)||85},
        {code:'CS603',name:'Core Subject III',working:36,present:Math.round(36*(Number(form.overallAttendance)||85)/100),percentage:Number(form.overallAttendance)||85},
      ],
      results:[
        {code:'CS601',name:'Core Subject I',internal:42,semester:78,total:120,grade:'A'},
        {code:'CS602',name:'Core Subject II',internal:44,semester:82,total:126,grade:'A+'},
        {code:'CS603',name:'Core Subject III',internal:40,semester:76,total:116,grade:'A'},
      ],
      timetable:{
        Monday:[{time:'09:00 - 10:00',subject:'Core Subject I',faculty:'Assigned Faculty',room:'CSE-201'}],
        Tuesday:[{time:'10:15 - 11:15',subject:'Core Subject II',faculty:'Assigned Faculty',room:'CSE-202'}],
        Wednesday:[{time:'09:00 - 10:00',subject:'Core Subject III',faculty:'Assigned Faculty',room:'CSE-203'}],
        Thursday:[{time:'11:30 - 12:30',subject:'Faculty Mentoring',faculty:'Student Mentor',room:'CSE-201'}],
        Friday:[{time:'14:00 - 15:00',subject:'Department Activity',faculty:'Department Coordinator',room:'Auditorium'}],
      },
      college:{name:'Mohamed Sathak AJ College of Engineering and Architecture',shortName:'MSAJCEA',address:'12 College Road, Chennai, Tamil Nadu - 600025',phone:'+91 44 2456 7800',email:'admin@msajcea.edu'},
    }
    const result=addStudent(student)
    if (!result.success){setError(result.message);return}
    navigate('/admin',{replace:true})
  }
  const field=(key,label,type='text',placeholder='')=>(
    <div><label className="text-xs font-semibold text-slate-600">{label}</label><input type={type} value={form[key]} onChange={(e)=>update(key,type==='number'?Number(e.target.value):e.target.value)} required={['name','registerNumber','password','dob','email','phone','emergencyContact','address'].includes(key)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500" placeholder={placeholder}/></div>
  )
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"><ArrowLeft size={17}/> Back to Admin Dashboard</Link>
        <div className="mt-5"><h1 className="text-2xl font-bold text-slate-900">Add Student</h1><p className="mt-1 text-sm text-slate-500">Provision an active student portal account</p></div>
        <form onSubmit={submit} className="mt-6">
          <Card>
            {error&&<div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {field('name','Full Name','text','Arun Kumar')}
              {field('registerNumber','Register Number','text','21CS1050')}
              {field('password','Access Password / PIN','password','Minimum 4 characters')}
              <div><label className="text-xs font-semibold text-slate-600">Department</label><select value={form.department} onChange={(e)=>update('department',e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none"><option>Computer Science & Engineering</option><option>Information Technology</option><option>Electronics & Communication</option><option>Mechanical Engineering</option><option>Civil Engineering</option></select></div>
              {field('shortDepartment','Department Code','text','CSE')}
              <div><label className="text-xs font-semibold text-slate-600">Year</label><select value={form.year} onChange={(e)=>update('year',e.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none"><option>I Year</option><option>II Year</option><option>III Year</option><option>IV Year</option></select></div>
              {field('semester','Semester','text','1st Semester')}
              {field('dob','Date of Birth','date')}
              {field('bloodGroup','Blood Group','text','O+')}
              {field('email','Institutional Email','email','student@MSAJCEA.edu')}
              {field('phone','Phone Number','tel','+91 98765 43210')}
              {field('emergencyContact','Emergency Contact','tel','+91 94440 81920')}
              {field('overallAttendance','Initial Attendance %','number','85')}
              {field('cgpa','CGPA','number','8.5')}
              {field('validity','Card Validity','text','Jun 2027')}
            </div>
            <div className="mt-5">{field('address','Address','text','Address')}</div>
            <div className="mt-5 rounded-xl border border-dashed border-slate-300 p-4">
              <label className="flex cursor-pointer items-center gap-4">
                {preview?<img src={preview} alt="Preview" className="h-20 w-20 rounded-full object-cover"/>:<div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600"><Upload size={24}/></div>}
                <div><span className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Upload size={16}/> Upload student photo</span><span className="mt-1 block text-xs text-slate-500">PNG or JPG preview</span></div>
                <input type="file" accept="image/*" className="hidden" onChange={upload}/>
              </label>
              <input value={form.photo?.startsWith('data:')?'':form.photo} onChange={(e)=>{update('photo',e.target.value);setPreview(e.target.value)}} className="mt-4 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none" placeholder="Or enter photo URL"/>
            </div>
            <button className="mt-6 flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white"><UserPlus size={18}/> Provision Student Account</button>
          </Card>
        </form>
      </div>
    </div>
  )
}
