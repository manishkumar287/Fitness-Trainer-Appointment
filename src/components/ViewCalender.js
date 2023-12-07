import { useNavigate } from "react-router-dom";

const ViewCalender = () => {
  const naviagte = useNavigate();

  const handleViewCalender = () => {
    naviagte("/calender");
  };
  return (
    <div className="min-w-max">
      <button
        onClick={handleViewCalender}
        className={"bg-blue-400 text-white px-2 py-3 text-left rounded-md"}
      >
        Calender View
      </button>
    </div>
  );
};

export default ViewCalender;
