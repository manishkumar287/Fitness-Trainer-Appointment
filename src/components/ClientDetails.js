import { useParams, Link } from "react-router-dom";
import React, { useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Box, Modal } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ClientDetails = () => {
  const { id } = useParams();

  const [client, setClient] = useState(
    localStorage.getItem("clients")
      ? JSON.parse(localStorage.getItem("clients")).filter(
          (item) => item.id === JSON.parse(id)
        )
      : []
  );

  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState({
    clientId: "",
    aptId: "",
    aptDate: "",
    aptTime: "",
  });

  const handleEditAppointment = (clientId, appointmentId) => {
    const appointment = client[0].apts.filter(
      (item) => item.id === appointmentId
    )[0];
    setSelectedClient({
      clientId,
      aptId: appointmentId,
      aptDate: appointment.aptDate,
      aptTime: appointment.aptTime,
    });
    setOpen(true);
  };

  const updateAppointment = () => {
    const allClients = JSON.parse(localStorage.getItem("clients"));
    const index = allClients.findIndex(
      (item) => item.id === JSON.parse(selectedClient.clientId)
    );
    const index1 = allClients[index].apts.findIndex(
      (item) => item.id === JSON.parse(selectedClient.aptId)
    );
    allClients[index].apts[index1].aptDate = selectedClient.aptDate;
    allClients[index].apts[index1].aptTime = selectedClient.aptTime;
    localStorage.setItem("clients", JSON.stringify(allClients));
    setClient(
      allClients.filter(
        (item) => item.id === JSON.parse(selectedClient.clientId)
      )
    );
    setOpen(false);
  };

  if (client.length === 0) {
    return <div>Loading.....</div>;
  }

  return (
    <>
      <div className="flex justify-start p-4">
        <Link to="/" className="text-blue-400 underline">
          Back to Home
        </Link>
      </div>
      <Item className="m-4">
        <div className="flex flex-grow flex-col gap-y-2 justify-start items-start">
          <div className="flex items-center gap-6 w-full">
            <div className="flex items-start flex-col">
              <span className="text-xs font-semibold text-black/40">
                Client First Name
              </span>
              <span className="flex-none font-medium text-lg text-blue-500">
                {client[0].firstName}
              </span>
            </div>
            <div className="flex items-start flex-col">
              <span className="text-xs font-semibold text-black/40">
                Client Last Name
              </span>
              <span className="flex-none font-medium text-lg text-blue-500">
                {client[0].lastName}
              </span>
            </div>
          </div>

          <div className="flex items-start flex-col">
            <span className="text-xs font-semibold text-black/40">
              Location
            </span>
            <span className="flex-none font-medium text-lg text-blue-500">
              {client[0].location}
            </span>
          </div>

          <div className="flex items-start flex-col w-full">
            <span className="text-xs font-semibold text-black/40">
              Appointments List
            </span>
            <table className="table-auto w-full mt-1">
              <thead className="w-full">
                <tr className="w-full bg-black/10">
                  <th className="px-1 py-1 text-left">Date</th>
                  <th className="px-1 py-1 text-left">Time</th>
                  <th className="px-1 py-1 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {client[0].apts?.map((item) => (
                  <tr className="w-full" key={item}>
                    <td className="px-1 py-1 text-left">{item.aptDate}</td>
                    <td className="px-1 py-1 text-left">{item.aptTime}</td>
                    <td className="px-1 py-1 text-left">
                      <button
                        type="button"
                        onClick={() => {
                          // confirmation from user
                          const isOk = prompt(
                            "Are you sure you want to delete this appointment? if yes type 'yse' else type 'no'"
                          );
                          if (isOk.toLowerCase() === "yes") {
                            const temp = client[0].apts.filter(
                              (apt) => apt !== item
                            );
                            const index = JSON.parse(id);
                            const allClients = JSON.parse(
                              localStorage.getItem("clients")
                            );
                            const index1 = allClients.findIndex(
                              (item) => item.id === index
                            );
                            allClients[index1].apts = temp;
                            localStorage.setItem(
                              "clients",
                              JSON.stringify(allClients)
                            );
                            setClient(
                              allClients.filter((item) => item.id === index)
                            );
                          }
                        }}
                        className="p-1 mr-1 rounded text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 transition-all duration-150 ease-in-out"
                      >
                        <BiTrash />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleEditAppointment(client[0].id, item.id)
                        }
                        className="p-1 mr-1 rounded text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition-all duration-150 ease-in-out"
                      >
                        <BiEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
                    setSelectedClient({
                      ...selectedClient,
                      aptDate: event.target.value,
                    });
                  }}
                  type="date"
                  name="aptDate"
                  id="aptDate"
                  value={selectedClient.aptDate}
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
                    setSelectedClient({
                      ...selectedClient,
                      aptTime: event.target.value,
                    });
                  }}
                  type="time"
                  name="aptTime"
                  id="aptTime"
                  value={selectedClient.aptTime}
                  className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={updateAppointment}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                >
                  Submit
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </Item>
    </>
  );
};

export default ClientDetails;
