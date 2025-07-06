import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack", "Android Developer"]
  },
  // {
  //   filterType: "Salary",
  //   array: ["0-40k", "42k-1lakh", "1lakh-5lakh", "6lakh-10lakh", "10lakh-15lakh","15lakh-30lakh"]
  // }
]

const FilterCard = () => {
  const [selectedValue, setselectedValue] = useState('');
  const dispatch = useDispatch();
  const changeHandler =(value) =>{
    setselectedValue(value);
  }
  useEffect(() =>{
    dispatch(setSearchedQuery(selectedValue));
  },[selectedValue]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="text-xl font-semibold">Filter Jobs</h1>
      <hr className="mt-3 mb-5" />

      {
        filterData.map((data, i) => (
          <div key={i} className="mb-6">
            <h2 className="text-lg font-medium mb-2">{data.filterType}</h2>
            <RadioGroup value ={selectedValue} onValueChange ={changeHandler}>
              {
                data.array.map((item, j) => {
                  const itemId = `id${i}-${j}`;
                  return (
                    <div key={itemId} className="flex items-center space-x-2 mb-1">
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </RadioGroup>
          </div>
        ))
      }
    </div>
  )
}

export default FilterCard
