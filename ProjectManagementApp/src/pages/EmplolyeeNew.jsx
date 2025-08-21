import { useState,useEffect } from "react";
import { api } from "../services/api";
import { useForm } from "react-hook-form";
import {useNavigate } from "react-router-dom";

export default function EmployeeNew(){
    const {register,handleSubmit,formState:{isSubmitting}} = useForm({
        defaultValues:{
            name:'',
            email:'',
            department:'',
            role:''
        }
    });
    const [submitError,setSubmitError]=useState();
    const navigate=useNavigate();
    const onSubmit=async(data)=>{
        setSubmitError('');
        try {
            const payload = {
                name:data.name.trim(),
                email:data.email.trim(),
                department:data.department,
                designation:data.role
            }
            await api.post('/employees',payload);
            navigate('/employees')

        } catch (error) {
            setSubmitError(error?.message || "Failed to Add Employee.")   
        }
    }

return(
    <div className="main-container">
        <div className="flex justify-between mt-7">
        <h3 className=" text-3xl font-extrabold">Add New Employee</h3>
        </div>

         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full max-w-[448px] flex flex-col gap-6">
                <div>
                    <label className="block text-left font-medium text-lg mb-2">Name</label>
                    <input type="text"
                    placeholder="Enter Employee's full name" 
                    {...register('name',{required:'Emplpoyee name Required'})}
                    className="w-full h-[56px] border rounded-2xl border-gray-300 p-[15px] text-sm focus:outline-none focus:ring"
                    />
                </div>
                     <div>
                    <label className="block text-left font-medium text-lg mb-2">Email</label>
                    <input type="text"
                    placeholder="Enter Employee's email address" 
                    {...register('email',{required:'Emplpoyee email Required'})}
                    className="w-full h-[56px] border rounded-2xl border-gray-300 p-[15px] text-sm focus:outline-none focus:ring"
                    />
                </div>
                     <div>
                    <label className="block text-left font-medium text-lg mb-2">Department</label>
                    <input type="text"
                    placeholder="Enter Employee's department" 
                    {...register('department',{required:'Emplpoyee Department Required'})}
                    className="w-full h-[56px] border rounded-2xl border-gray-300 p-[15px] text-sm focus:outline-none focus:ring"
                    />
                </div>
                     <div>
                    <label className="block text-left font-medium text-lg mb-2">Role</label>
                    <input type="text"
                    placeholder="Enter Employee's role" 
                    {...register('role',{required:'Emplpoyee role Required'})}
                    className="w-full h-[56px] border rounded-2xl border-gray-300 p-[15px] text-sm focus:outline-none focus:ring"
                    />
                </div>
            </div>

            <div className="w-full flex  justify-end gap-3 px-5 py-5">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="h-[40px] w-[84px] px-4 rounded-2xl font-bold bg-gray-100 text-sm"
                >
                  Cancel
                </button>

                <button
                type="submit"
                disabled={isSubmitting}
                className="py-2.5 px-4 rounded-2xl bg-gray-200 text-black font-bold text-sm disabled:opacity-60"
                >
                 { isSubmitting?'Adding...':'Add Employee'}      
                </button>
            </div>
            </form>   

    </div>
)


}