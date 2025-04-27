
import moment from "moment";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email);
}


export const addThousandsSeparator = (num = 0) => {
    if(num === null || num === undefined || isNaN(num)) {
        console.log("Number is Either null or undefined or not a number" , num);
        return "";
    }
    if(num === 0) return "0"; // Handle zero case

    if(num < 0) return console.log("Negative number not allowed", num); // Handle negative numbers
    

    // Convert to string and add thousands separator
    
    const formattedNum = num.toLocaleString('en-IN')

    return formattedNum;
}




export const prepareExpenseBarChartData = (data = [])=> {
    const chartData = data.map((item) => (
        {
            category: item?.category,
            amount: item?.amount,
        }
    ))

    return chartData
}


export const prepareIncomeBarChartData = (data =[]) => {
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }))


    return chartData
}


export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category,
    }))

    return chartData;
}


