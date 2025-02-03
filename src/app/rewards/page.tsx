import RewardsTable from "../../components/reward-table";
import HalfPayTable from "../../components/half-pay-table";
export default async function Rewards() {
  return (
    <>
      <main className="flex flex-col min-h-screen items-center pt-20 xs:px-10 xs:pt-12">
        <div className='text-3xl font-semibold text-slate-100'> อัตราการจ่ายและเลขอั้น </div>
        <div className="flex justify-between xs:flex-wrap gap-12 xs:justify-center xs:items-center">
          <RewardsTable />
          <HalfPayTable />
        </div>
      </main>

    </>

  )
}
