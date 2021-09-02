import React, {useState} from "react";
import { useForm } from "react-hook-form";
import "./App.css";

interface CardInput {
  balanceAmt:number;
  amount:number,
  cardNumber: string;
  fullName: string;
  month: number;
  year: number;
  cvv: number;
  transaction: boolean;
}

function App(props) {
  const [amountValue, setValue] = useState(10000);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CardInput>();

  const onSubmit = (props) => { // for pay and withdraw
    if(amountValue > props.amount){
      if(props.transaction === 'Withdraw'){
        setValue(amountValue - Number(props.amount));
        alert("Amount withdrawn successfully!");
      }
    }
    else{
      alert("Insufficeient funds, unable to withdraw!");
    }

    if(props.transaction === 'Pay'){
      setValue(amountValue + Number(props.amount));
      alert("Amount added successfully!");
    }
    
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Debit Card Application</h2>
      <label><span>Balance Amount:</span><span>{amountValue}</span></label>

      <label>Amount</label>
      <input 
      {...register("amount", { 
        required: true, 
        min: 1,
        pattern: /[\d]+$/
      })} />
      {errors?.amount?.type === "required" && <p>This field is required</p>}
      {errors.amount && (
        <p>Amount should be more than 0</p>
      )}

      <label>Card Number</label>
      <input
        {...register("cardNumber", {
          required: true,
          maxLength: 16,
          pattern: /^[\d| ]{16,22}$/i
        })}
      />
      {errors?.cardNumber?.type === "required" && <p>This field is required</p>}
      {errors?.cardNumber?.type === "pattern" && (
        <p>Card number should be 16 digits numeric value</p>
      )}

      <label>Card holder name</label>
      <input 
      {...register("fullName", { 
        required: true, 
        pattern: /^[A-Za-z]+$/i 
      })} />
      {errors?.fullName?.type === "required" && <p>This field is required</p>}
      {errors?.fullName?.type === "pattern" && (
        <p>Alphabetical characters only</p>
      )}

      <div className="short-div">
      <label>Expiry Month</label>
      <input 
      {...register("month", { 
        required: true, 
        min: 1, 
        max: 12,
        pattern: /[\d]+$/
      })} />
      {errors?.month?.type === "required" && <p>This field is required</p>}
      {errors.month && (
        <p>Month value should be from 1 to 12</p>
      )}
      </div>

      <div className="short-div">
      <label>Expiry Year</label>
      <input 
      {...register("year", {
        required: true, 
        min: 0, 
        max: 99,
        pattern: /[\d]+$/ 
      })} />
      {errors?.year?.type === "required" && <p>This field is required</p>}
      {errors.year && (
        <p>Year value should be from 00 to 99</p>
      )}
      </div>

      <div className="short-div">
      <label>CVV</label>
      <input 
      {...register("cvv", {
        required: true, 
        min: 0, 
        max: 999,
        pattern: /[\d]+$/ 
      })} />
      {errors?.cvv?.type === "required" && <p>This field is required</p>}
      {errors.cvv && (
        <p>Year value should be from 000 to 999</p>
      )}
      </div>

      <input {...register("transaction", { required: true })} type="radio" value="Pay" className="radio-block"/>
      <label className="radio-block">Pay</label>

      <input {...register("transaction", { required: true })} type="radio" value="Withdraw" className="radio-block" />
      <label className="radio-block">Withdraw</label>

      <input type="submit" value="Submit" />
    </form>
  );
}

export default App;
