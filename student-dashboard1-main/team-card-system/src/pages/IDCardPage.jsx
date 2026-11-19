import { useState } from 'react'
import { Printer, Download, QrCode, RotateCcw } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import StudentIDCard from '../components/cards/StudentIDCard'
import Card from '../components/ui/Card'
import { student } from '../data/studentData'
import { useAuth } from '../context/AuthContext'

export default function IDCardPage() {
  const { loggedInStudent }=useAuth()
  const student=loggedInStudent
  const [back, setBack] = useState(false)
  const [modal, setModal] = useState(false)
  const qrValue = `${window.location.origin}/verify/${student.registerNumber}`
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-slate-900">Digital Student ID Card</h1><p className="mt-1 text-sm text-slate-500">View, print or verify your institutional identity card</p></div>
      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
        <div className="print-card"><StudentIDCard student={student} compact={false} side={back}/></div>
        <Card className="w-full max-w-sm">
          <h2 className="font-bold text-slate-900">Card Controls</h2>
          <div className="mt-4 grid gap-3">
            <button onClick={()=>setBack(!back)} className="id-control"><RotateCcw size={18}/><span><strong>Flip Card</strong><small>Switch front and back</small></span></button>
            <button onClick={()=>window.print()} className="id-control"><Printer size={18}/><span><strong>Print Card</strong><small>Open print preview</small></span></button>
            <button onClick={()=>window.print()} className="id-control"><Download size={18}/><span><strong>Download PDF</strong><small>Save using print dialog</small></span></button>
            <button onClick={()=>setModal(true)} className="id-control"><QrCode size={18}/><span><strong>QR Preview</strong><small>View verification code</small></span></button>
          </div>
        </Card>
      </div>
      {modal && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4" onClick={()=>setModal(false)}><div className="w-full max-w-sm rounded-xl bg-white p-6 text-center" onClick={(event)=>event.stopPropagation()}><h2 className="font-bold text-slate-900">Verification QR Code</h2><div className="mx-auto mt-5 w-fit rounded-xl border border-slate-200 p-4"><QRCodeSVG value={qrValue} size={200}/></div><p className="mt-4 break-all text-xs text-slate-500">{qrValue}</p><button onClick={()=>setModal(false)} className="mt-5 h-10 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white">Close</button></div></div>}
    </div>
  )
}
