import React, { useEffect, useState } from "react";
import IncomeOverview from "../../components/income/IncomeOverview";
import { data } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";

import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";

function Income() {
  useUserAuth();

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // get all income API
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_INCOME}`
      );

      console.log("Income :: Income.jsx :: Data : ", response);

      if (response.data) {
        setIncomeData(response.data.income);
      }
    } catch (error) {
      console.log("Error while fetching income data : ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // validation checks
    if (!source.trim()) {
      toast.error("Source is required..");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be valid & greater that 0.0 ");
      return;
    }

    if (!date) {
      toast.error("Date is required..");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully..");

      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding in income",
        error.response?.data?.message || error.message
      );
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully..");

      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error deleting income : ",
        error.response?.data?.message || error.message
      );
      // setOpenDeleteAlert({ show: false, data: null });
    }
  };

  // const handleDownloadIncomeDetails = async () => {}
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );

      // creating URL FOR Blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      console.log("Download URL : ", url);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx"); //or any other extension

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // remove link from DOM

      window.URL.revokeObjectURL(url); // free up memory
    } catch (error) {
      console.error(
        "Error downloading Income details : ",
        error.response?.data?.message || error.message
      );
      toast.error(
        "Error downloading Income details : ",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;
