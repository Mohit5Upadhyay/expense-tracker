import React, { useEffect, useState } from "react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import ExpenseList from "../../components/expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

function Expense() {
  useUserAuth();

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // get all ExpenseAPI
  const fetchExpenseDetails = async () => {
    // if (loading) return;
    // setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_EXPENSE}`
      );

      console.log("Expense :: Expense.jsx :: Data : ", response);

      if (response.data) {
        setExpenseData(response.data.expense); //.expense
      }
    } catch (error) {
      console.log("Error while fetching Expense data : ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // console.log("Details" , `category: ${category}  , amount: ${amount} , date ${date} , icon :${icon}`);
    
    

    // validation checks
    if (!category.trim()) {
      toast.error("Category is required..");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully..");

      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding in Expense",
        error.response?.data?.message || error.message
      );
    }finally{
      setLoading(false)
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully..");

      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting Expense: ",
        error.response?.data?.message || error.message
      );
      // setOpenDeleteAlert({ show: false, data: null });
    }finally{
      setLoading(false)
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      // creating URL FOR Blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // console.log("Download URL : ", url);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx"); //or any other extension

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // remove link from DOM

      window.URL.revokeObjectURL(url); // free up memory
    } catch (error) {
      console.error(
        "Error downloading Expense details : ",
        error.response?.data?.message || error.message
      );
      toast.error(
        "Error downloading Expense details : ",
        error.response?.data?.message || error.message
      );
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <div>
    {loading ? (
      <Loader />
    ) : (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
    )}
    </div>
  );
}

export default Expense;
