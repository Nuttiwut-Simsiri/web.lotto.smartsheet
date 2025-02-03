import useCustomStore from "@/hooks/useCustomStore";
import { useMainStore } from "@/hooks/useMainStore";
import { useRewardnHPStore } from "@/hooks/useRewardStore";

export default function SummaryTable() {
    const allWinOrders = useCustomStore(useRewardnHPStore, (state: any) => state.allWinOrders)
    const total = useCustomStore(useMainStore, (state: any) => state.total)
    const currentAmount = useCustomStore(useMainStore, (state: any) => state.currentAmount)
    const nidProfitPercent = 0.20
    const paiProfitPercent = 1 - 0.20
    const nidProfit = total * nidProfitPercent
    const paiProfit = allWinOrders - (total * paiProfitPercent)  // > 0 = pay pai, < 0 = pai pay  
    const remainAmount = total - currentAmount

    const header_css = "bg-black text-xl xs:text-base"
    return (
        <div className="overflow-x-auto px-8">
            <table className="table">
                {/* head */}

                <tbody>
                    <tr>
                        <td className={header_css}> ยอดรวมทั้งหมด</td>
                        <td className=" text-white text-right">{total?.toLocaleString('en-US')}</td>
                    </tr>
                    <tr>
                        <td className={header_css}> รายได้</td>
                        <td className=" text-success text-right">{nidProfit?.toLocaleString('en-US')}</td>
                    </tr>
                    <tr>
                        <td className={header_css}>  {paiProfit < 0 ? "โอนให้ปาย" : "** ปายโอนให้เพิ่ม"}</td>
                        <td className=" text-purple-500 text-right bg-base-200">{paiProfit?.toLocaleString('en-US')}</td>
                    </tr>
                    <tr>
                        <td className={header_css}> ยอดปัจจุบัน</td>
                        <td className=" text-white text-right bg-blue-900">{currentAmount?.toLocaleString('en-US')}</td>
                    </tr>

                    <tr>
                        <td className={header_css}> ค้างชำระ</td>
                        <td className=" text-red-600 text-right bg-base-200">{remainAmount?.toLocaleString('en-US')}</td>
                    </tr>

                    <tr>
                        <td className={header_css}> ยอดถูกหวย</td>
                        <td className=" text-green-600 text-right">{allWinOrders?.toLocaleString('en-US')}</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )

}