import Sidebar from "../components/Sidebar"
import LineGraph from "../components/LineGraph"
import FinancialGains from "../components/FinancialGains"



import salesanalyticsstyle from '../style/salesanalyticsstyle.module.css'



const SalesAnalytics = () => {
  return (
    <div className={salesanalyticsstyle.mainContainer}>
      <div>
        <Sidebar />
      </div>
      <div className={salesanalyticsstyle.analyticsMainWrapper}>
        <div className={salesanalyticsstyle.header}>
          <h1>Sales Analytics</h1>
        </div>
        <div className={salesanalyticsstyle.chartsWrapper}>
          <div className={salesanalyticsstyle.finicialgainsWrapper}>
            <FinancialGains />
          </div>
          <div className={salesanalyticsstyle.linegraphWrapper}>
            <LineGraph />
          </div>
        </div>
        

      </div>
    </div>
  )
}

export default SalesAnalytics