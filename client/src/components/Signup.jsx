import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../services/authAPI";
import Select from 'react-select';
// import { mailSender } from "../../../server/utils/mailSender";

const Signup = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   
   
  const {
    register,
    handleSubmit,
    reset,
    // getValues,
    setValue,
    formState: { errors,isSubmitSuccessful },
  } = useForm()

  

 const onSubmit = (data) =>{
   console.log("signup data",data)
  dispatch(setSignupData(data))
  dispatch(sendOtp(data.Email, navigate))
 }

 useEffect(() => {
   if (isSubmitSuccessful) {
     reset({
     Name:"",
     Email:"",
     Password:"",
     Phone:"",
     Gender:"",
     hearAbout:"",
     city:"",
     State:""
     
     })
   }
 }, [reset, isSubmitSuccessful])

 const stateOptions = [
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Karnataka', label: 'Karnataka' },
];
const cityOptions = [
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Ahmedabad', label: 'Ahmedabad' },
]

const handleStateChange = (selectedOption) => {
  setValue('State', selectedOption); // Update the value of the 'State' field
};
const handleCityChange = (selectedOption) => {
  setValue('City', selectedOption); // Update the value of the 'city' field
};
  return (
    <form className='w-11/12 m-auto flex flex-col justify-center items-center gap-y-6 mt-[50px]' onSubmit={handleSubmit(onSubmit)}>
    <div>
        <img src="/Images/signup.jpg" alt="no" className='h-[100px] w-[150px]'/>
    </div>
    <div className='flex gap-x-10 items-center justify-between'>
        <div className="flex flex-col gap-y-4">
            <span className='flex flex-col gap-y-2'>
              <label htmlFor="text">Name</label>
              <input className='border w-96 border-black px-4 py-1 rounded' type="text" name="name" id="name"  {...register("Name",{ required: true })} />
              {errors.Name && <span className="text-red-500 text-[12px]">*This field is required</span>}
          </span>
          <span className='flex flex-col gap-y-2'>
              <label htmlFor="email">Email</label>
              <input className='border w-96 border-black px-4 py-1 rounded' type="email" name="email" id="email"  {...register("Email",{ required: true })} />
              {errors.Email && <span className="text-red-500 text-[12px]">*This field is required</span>}

          </span>

          <span className='flex flex-col gap-y-2'>
              <label htmlFor="password">Password</label>
              <input className='border w-96 border-black px-4 py-1 rounded' type="password" name="password" id="password"  {...register("Password",{ required: true })} />
              {errors.Password && <span className="text-red-500 text-[12px]">*This field is required</span>}

          </span>
          <span className='flex flex-col gap-y-2'>
              <label htmlFor="phone">Phone</label>
              <input className='border w-96 border-black px-4 py-1 rounded' type="tel" name="phone" id="phone"  {...register("Phone",{ required: true })} />
              {errors.Phone && <span className="text-red-500 text-[12px]">*This field is required</span>}
          </span>
        </div>
        <div className="flex flex-col gap-y-7">

         <span>
              <label htmlFor="Gender">Gender</label>
              <div className="flex gap-x-2">
                <label className="flex gap-x-1">
                  <input type="radio" {...register("Gender", { required: true })} value="male" />
                  Male
                </label>
                <label className="flex gap-x-1">
                  <input type="radio" {...register("Gender", { required: true })} value="female" />
                  Female
                </label>
                <label className="flex gap-x-1">
                  <input type="radio" {...register("Gender", { required: true })} value="other" />
                  Other
                </label>
              </div>
              {errors.Gender && <span>This field is required</span>}
          </span>

      <span>
        <label>How did you hear about this?</label>
        <div className="flex items-center gap-x-3">
          <label className="flex items-center gap-x-1">
            <input type="checkbox" {...register("hearAbout", { required: true })} value="LinkedIn" />
            LinkedIn
          </label>
          <label className="flex items-center gap-x-1">
            <input type="checkbox" {...register("hearAbout", { required: true })} value="Friends" />
            Friends
          </label>
          <label className="flex items-center gap-x-1">
            <input type="checkbox" {...register("hearAbout", { required: true })} value="Job Portal" />
            Job Portal
          </label>
          <label className="flex items-center gap-x-1">
            <input type="checkbox" {...register("hearAbout", { required: true })} value="Others" />
            Others
          </label>
        </div>
        {errors.hearAbout && <span>This field is required</span>}
      </span>

      <div>
        <label htmlFor="City">State:</label>
        <Select
          id="City"
          {...register("City", { required: true })}
          options={cityOptions}
          placeholder="Select a city"
          onChange={handleCityChange}
          className="border border-black rounded"
        />
        {errors.City && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="State">State:</label>
        <Select
          id="State"
          {...register("State", { required: true })}
          options={stateOptions}
          placeholder="Select a state"
          onChange={handleStateChange}
          className="border border-black rounded"
        />
        {errors.State && <span>This field is required</span>}
      </div>

        </div>
    </div>
    <button type='submit' className='bg-blue-500 hover:bg-blue-400  text-white px-4 py-2 rounded'>SignUp</button>
</form>
  )
}

export default Signup