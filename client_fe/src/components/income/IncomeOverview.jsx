import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareIncomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../charts/CustomeBarChart";

function IncomeOverview({ transactions, onAddIncome }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);

    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div className="flex justify-between items-center p-4">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-700 mt-1">
            Track your earning over time and analyze the trend..
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-2xl" />
          Add Income
        </button>
      </div>

        <div className="mt-10">
            <CustomBarChart  data={chartData} />
        </div>

    </div>
  );
}

export default IncomeOverview;
