import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { ShieldCheck } from 'lucide-react'

export default function StudentIDCard({ student, compact = false, side }) {
  const [back, setBack] = useState(false)
  useEffect(() => {
    if (typeof side === 'boolean') setBack(side)
  }, [side])
  const qrValue = `${window.location.origin}/verify/${student.registerNumber}`

  return (
    <div className={`student-id-card ${back ? 'is-back' : ''}`} onDoubleClick={() => setBack((value) => !value)} style={compact ? { width: 340, maxWidth: '100%' } : undefined}>
      {!back ? (
        <div className="id-side id-front">
          <div className="id-header">
            <div className="college-mark"><ShieldCheck size={25} /></div>
            <div><p className="college-name">{student.college.name}</p><p className="college-location">Chennai, Tamil Nadu</p></div>
          </div>
          <div className="id-body">
            <img className="id-photo" src={student.photo} alt={student.name} />
            <h3>{student.name}</h3>
            <p className="id-status"><span /> Student</p>
            <div className="id-details">
              <div><span>Register No.</span><strong>{student.registerNumber}</strong></div>
              <div><span>Department</span><strong>{student.shortDepartment}</strong></div>
              <div><span>Academic Year</span><strong>{student.academicYear}</strong></div>
            </div>
            <div className="id-footer">
              <div className="signature"><span>Arjun Kumar</span><small>Student Signature</small></div>
              <QRCodeSVG value={qrValue} size={58} level="M" marginSize={1} />
            </div>
          </div>
        </div>
      ) : (
        <div className="id-side id-back">
          <div className="id-header"><div className="college-mark"><ShieldCheck size={25} /></div><div><p className="college-name">{student.college.shortName}</p><p className="college-location">Student Information</p></div></div>
          <div className="id-back-body">
            <p className="id-address">{student.college.address}</p>
            <p className="id-address">{student.college.phone} · {student.college.email}</p>
            <div className="id-back-grid">
              <div><span>Emergency Contact</span><strong>{student.emergencyContact}</strong></div>
              <div><span>Blood Group</span><strong>{student.bloodGroup}</strong></div>
              <div><span>Card Valid Until</span><strong>{student.validity}</strong></div>
              <div><span>Student ID</span><strong>{student.registerNumber}</strong></div>
            </div>
            <div className="id-terms">
              <strong>Terms & Conditions</strong>
              <p>This card is the property of the institution and must be returned upon withdrawal or completion of the programme.</p>
            </div>
            <div className="id-back-sign"><span>Registrar</span><small>Authorised Signature</small></div>
          </div>
        </div>
      )}
    </div>
  )
}
