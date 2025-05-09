import React from "react";

import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

function TransactionInfoCard({
  title,
  amount,
  date,
  type,
  icon,
  hideDeleteBtn,
  onDelete,
}) {
  const getAmountStyles = () =>
    type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

  const getCardStyle = () => type === "income" ? "hover:bg-green-100/50" : "hover:bg-red-100/50";

  // console.log("Amount Type : ", amountType);


  return (
    <div className={`group relative flex items-center gap-4 mt-2 p-3 rounded-lg ${getCardStyle()} `}>
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-500 rounded-full bg-gray-100">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-sm text-gray-400 mt-1">{date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-100"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-sm font-medium">
              {type === "income" ? " + " : " - "} {`₹ ${amount}`}
            </h6>

            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfoCard;
