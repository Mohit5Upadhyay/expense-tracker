import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import { IoMdCard } from "react-icons/io";
import InfoCard from "../../components/cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import RecentIncome from "../../components/dashboard/RecentIncome";
import Last30DaysExpenses from "../../components/dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";

function Home() {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    console.log("Above try block in fetchDashboardData" , API_PATHS.DASHBOARD.GET_DATA);
    
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      console.log("Dashboard Data : ", response);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Error while fetching dashboard data : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            income={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance)}
            color={`bg-primary` || `bg-orange-500`}
          />

          <InfoCard
            income={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome)}
            color={`bg-green-600`}
          />

          <InfoCard
            income={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense)}
            color={`bg-red-500`}
          />
        </div>



        {/* graph */}
        <div className="grid grid-cols-1 md:grid">
          <RecentTransactions
            transaction={dashboardData?.recentTransactions}
            onSeeMore={() => navigate('/expenses')}
          />


          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />


          <ExpenseTransactions 
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate('/expense')}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []} 
          />

          <RecentIncomeWithChart 
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome={dashboardData?.last60DaysIncome?.totalIncome || 0}
          />

          <RecentIncome 
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate('/income')}
          />


        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
