"use client"

import SummaryTable from "../../components/summary-table";
import NewCSTable from "../../components/new-cs-table";

export default function Rewards() {
  const sumHeaders = ["ชื่อ", "หมายเลข", "บน", "โต๊ด", "ล่าง", "รวม", "จ่ายเงิน"]
  return (
    <main className="flex min-h-screen items-center flex-col gap-4 pt-20">
      <div className='text-3xl font-semibold text-slate-100'> สรุปยอดการซื้อ </div>
      <div className="flex flex-col gap-10">
        <NewCSTable headers={sumHeaders} />
        <SummaryTable />
      </div>
    </main>

  )
}
