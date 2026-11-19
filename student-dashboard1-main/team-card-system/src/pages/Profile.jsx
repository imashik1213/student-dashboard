import Card from '../components/ui/Card'
import { student } from '../data/studentData'
import { useAuth } from '../context/AuthContext'
import { UserRound, GraduationCap, MapPin, Phone } from 'lucide-react'

function InfoCard({ icon: Icon, title, items }) {
  return <Card><div className="mb-5 flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Icon size={18}/></div><h2 className="font-bold text-slate-900">{title}</h2></div><dl className="grid gap-4 sm:grid-cols-2">{items.map(([label,value])=><div key={label}><dt className="text-xs font-medium text-slate-500">{label}</dt><dd className="mt-1 text-sm font-semibold text-slate-900">{value}</dd></div>)}</dl></Card>
}

export default function Profile() {
  const { loggedInStudent }=useAuth()
  const student=loggedInStudent
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">My Profile</h1><p className="mt-1 text-sm text-slate-500">Personal and academic information</p></div>
      <Card className="flex flex-col items-center gap-5 sm:flex-row">
        <img src={student.photo} alt={student.name} className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-50"/>
        <div className="text-center sm:text-left"><h2 className="text-xl font-bold text-slate-900">{student.name}</h2><p className="mt-1 text-sm text-slate-500">{student.registerNumber} · {student.department}</p><span className="mt-3 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">Active Student</span></div>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard icon={UserRound} title="Personal Information" items={[['Full Name',student.name],['Date of Birth',student.dob],['Gender',student.gender],['Blood Group',student.bloodGroup],['Father / Guardian',student.fatherName]]}/>
        <InfoCard icon={GraduationCap} title="Academic Information" items={[['Register Number',student.registerNumber],['Department',student.department],['Year',student.year],['Semester',student.semester],['Academic Year',student.academicYear]]}/>
        <InfoCard icon={Phone} title="Contact Information" items={[['Institutional Email',student.email],['Phone Number',student.phone],['Emergency Contact',student.emergencyContact]]}/>
        <InfoCard icon={MapPin} title="Address" items={[['Current Address',student.address]]}/>
      </div>
    </div>
  )
}
