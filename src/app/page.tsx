"use client"
import useCustomStore from '@/hooks/useCustomStore';
import { useMainStore } from '@/hooks/useMainStore';
import AddSetNumbers from "../components/addsetnumbers";
import UserOrders from '@/components/user-orders';
import NRow from "../components/nrow";
import React, { useCallback, useRef } from 'react';
import { toJpeg } from 'html-to-image';
import { toast } from 'react-toastify';



export default function Home() {
  const orders = useCustomStore(useMainStore, (state: any) => state.orders)
  const uniqOrder = useCustomStore(useMainStore, (state: any) => state.uniqOrder)
  const filterKeyword = useCustomStore(useMainStore, (state: any) => state.filterKeyword)
  const changeKeyword = useMainStore((state) => state.changeKeyword)
  const changeColor = useMainStore((state) => state.changeColor)
  const removeOrder = useMainStore((state) => state.removeOrder)
  const removeAllOrder = useMainStore((state) => state.removeAllOrder)

  const ref = useRef<HTMLDivElement>(null)
  const onCapture = useCallback((name: string) => {
    if (ref.current === null) {
      return
    }

    toJpeg(ref.current, {quality : 0.98})
      .then((dataUrl) => {
        const file_name = 'ss_'+name+'_.jpeg'
        const link = document.createElement('a')
        link.download = 'ss_'+name+'_.jpeg'
        link.href = dataUrl
        link.click()
        toast.success("Screenshort Success ! "+ file_name);
      })
      .catch((err) => {
        console.log(err)
        toast.error("Screenshort failed ! ");
    })
    
    
  }, [ref])


  const table_header_css = "dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl xs:text-sm"

  const modalRef = useRef(null);
  const onShowRemoveAllOrderModal = () => {
    const modalDialog: any = modalRef.current
    try {
      modalDialog.showModal()
    } catch (error) {
      console.log("Modal not found ", error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-10 pt-20 gap-6 xs:gap-4 xs:pt-12 xs:px-4">
      <div className='flex flex-row w-full justify-between xs:flex-wrap xs:gap-8 xs:justify-center'>
        <div className='text-3xl font-semibold text-white'>ตารางการซื้อขาย </div>
        <div className="flex flex-row justify-self-end gap-2 items-center xs:py-4">
          {/* Dialog box */}
          <button className="btn btn-lg px-2 btn-error" onClick={() => onShowRemoveAllOrderModal()}> ลบทั้งหมด </button>
          <dialog id="my_modal_1" className="modal" ref={modalRef}>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-3xl hover:bg-red-600">✕</button>
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg">ลบรายการทั้งหมด</h3>
              <p className="py-4 px-2"> คุณต้องการลบรายการทั้งหมดใช่หรือไม่</p>
                <div className="modal-action">
                <form method="dialog" className='flex gap-4'>
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-success w-20 text-white" onClick={ () => removeAllOrder() }> ใช่ </button>
                  <button className="btn btn-error w-20"> ไม่</button>
                </form>
              </div>
            </div>
          </dialog>
          <a href={"/"} className='btn btn-info btn-lg'  > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" /></svg> </a>
          <AddSetNumbers />

        </div>
      </div>

      <div className="flex justify-around gap-8 flex-wrap xl:flex-nowrap pb-20">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-lg font-medium text-blue-500 dark:text-info"> ตัวกรอง </label>
            <select className="select select-ghost w-full max-w-xs min-w-[200px] xs:min-w-[100px] text-base" defaultValue={filterKeyword} onChange={(ev) => changeKeyword(ev.target.value)}>
              <option disabled >เลือกรายชื่อที่จะแสดงผล</option>
              <option> ทั้งหมด</option>
              {
                uniqOrder?.map((el: any, index: number) => {
                  return (
                    <option key={index + "-" + el}> {el.name} </option>
                  )
                })
              }
            </select>
          </div>
          <div>
            {
              uniqOrder?.map((el: any, index: number) => {
                return (
                  <div className="flex" key={index + "_col"}>
                    <input type="color" className="input input-bordered input-secondary min-w-[80px] max-w-xs text-left " defaultValue={el.color} onChange={(ev) => changeColor({ color: ev.target.value }, el.name)} />
                    <input type="text" className="input input-bordered input-secondary min-w-[120px] max-w-xs text-left pr-2" value={el.name} readOnly={true} />
                    <div className='flex justify-center items-center px-4'>
                      <UserOrders username={el.name} hColor={el.color} />
                    </div>
                  </div>
                )

              })
            }
          </div>


        </div>
        <div className="flex flex-col" ref={ref} >
          <div className="flex">
            <input type="text" value={"ชื่อ"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl xs:text-xs" readOnly={true} />
            <input type="text" value={"หมายเลข"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl xs:text-xs" readOnly={true} />
            <input type="text" value={"บน"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl xs:text-xs" readOnly={true} />
            <input type="text" value={"โต๊ด"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl xs:text-xs" readOnly={true} />
            <input type="text" value={"ล่าง"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl xs:text-xs" readOnly={true} />
            <input type="text" value={"รวม"} className="input border dark:text-white border-slate-300 bg-slate-700 w-full max-w-xs text-center text-xl xs:text-xs" readOnly={true} />
            <button className="btn dark:text-white border-slate-300 bg-slate-700 w-full max-w-[100px] xs:max-w-[40px] text-xl xs:text-xs text-center" onClick={ () => onCapture(filterKeyword)}> SS </button>
          </div>

          {
            filterKeyword == "ทั้งหมด" ?
              orders?.map((rowData: any, index: number) => {
                return (
                  <NRow rowData={rowData} key={rowData.id} index={index} removeOrder={removeOrder} />
                )
              })
              :
              orders?.filter((el: any) => el?.name == filterKeyword)?.map((rowData: any, index: number) => {
                return (
                  <NRow rowData={rowData} key={rowData.id} index={index} removeOrder={removeOrder} />
                )
              })
          }

        </div>
      </div>


    </main>


  )
}
