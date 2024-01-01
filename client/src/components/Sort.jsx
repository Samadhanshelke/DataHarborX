import { useForm } from 'react-hook-form';
import Select from 'react-select';

const Sort = ({handleSort}) => {
    const {
        register,
       
        // getValues,
        setValue,
        formState: { errors },
      } = useForm()

    const handleSortChange = (selectedOption) => {
        setValue('Sort', selectedOption);
         handleSort(selectedOption)
         // Update the value of the 'city' field
      };
      const sortOptions = [
        { value: 'A-Z', label: 'A-Z' },
        { value: 'Z-A', label: 'Z-A' },
        { value: 'Last Modified', label: 'Last Modified' },
        { value: 'Last Inserted', label: 'Last Inserted' },
      ]
  return (
   <form>
  <div>
        <label htmlFor="sort"></label>
        <Select
          id="sort"
          {...register("Sort", { required: true })}
          options={sortOptions}
          placeholder="Sort Option"
          onChange={handleSortChange}
          className="border border-black rounded w-[200px]"
        />
        {errors.Sort && <span>This field is required</span>}
      </div>
   </form>
  )
}

export default Sort