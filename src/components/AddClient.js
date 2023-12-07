import { useState } from "react";
import { BiCalendarPlus } from "react-icons/bi";

const AddClient = ({ addClient }) => {
  const clearData = {
    firstName: "",
    lastName: "",
    location: "",
    aptDate: "",
    aptTime: "",
  };
  let [toggleForm, setToggleForm] = useState(false);
  let [formData, setFormData] = useState(clearData);

  const formDataPosted = () => {
    if (
      formData.firstName &&
      formData.firstName &&
      formData.location &&
      formData.aptDate &&
      formData.aptTime
    ) {
      const appointmentInfo = {
        id: Math.floor(Math.random() * 10000),
        firstName: formData.firstName,
        lastName: formData.lastName,
        location: formData.location,
        apts: [
          {
            id: Math.floor(Math.random() * 10000),
            aptDate: formData.aptDate,
            aptTime: formData.aptTime,
          },
        ],
      };
      addClient(appointmentInfo);
      setFormData(clearData);
      setToggleForm(!toggleForm);
    } else {
      alert("fill required fields");
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setToggleForm(!toggleForm)}
        className={`bg-blue-400 w-full text-white px-2 py-3 flex items-center text-left  ${
          toggleForm ? "rounded-t-md" : "rounded-md"
        }`}
      >
        <BiCalendarPlus className="inline-block align-text-top mr-2" /> Add
        Client
      </button>
      {toggleForm && (
        <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              First Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(event) => {
                  setFormData({ ...formData, firstName: event.target.value });
                }}
                required
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Last Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(event) => {
                  setFormData({ ...formData, lastName: event.target.value });
                }}
                required
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Location
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(event) => {
                  setFormData({ ...formData, location: event.target.value });
                }}
                required
                type="text"
                name="location"
                id="location"
                value={formData.location}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptDate"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Apt Date
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                required
                onChange={(event) => {
                  setFormData({ ...formData, aptDate: event.target.value });
                }}
                type="date"
                name="aptDate"
                id="aptDate"
                value={formData.aptDate}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptTime"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Apt Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(event) => {
                  setFormData({ ...formData, aptTime: event.target.value });
                }}
                type="time"
                name="aptTime"
                id="aptTime"
                value={formData.aptTime}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={formDataPosted}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddClient;
