import * as React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Modal} from "@mui/material";

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

export default function ResponsiveGrid({
  filteredClients,
  clients,
  setClients,
}) {
  const naviagte = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState({
    clientId: "",
    aptId: "",
    aptDate: "",
    aptTime: "",
  });

  const handleEditAppointment = (clientId, appointmentId) => {
    const allClients = JSON.parse(localStorage.getItem("clients"));
    const appointment = allClients
      .filter((item) => item.id === clientId)[0]
      .apts.filter((date) => date.id === appointmentId)[0];
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
      (item) => item.id === selectedClient.clientId
    );
    const clients = allClients
      .filter((item) => item.id === selectedClient.clientId)[0]
      .apts.filter((date) => date.id !== selectedClient.aptId);
    const updatedClients = [
      ...allClients.slice(0, index),
      {
        ...allClients[index],
        apts: [
          ...clients,
          {
            id: Math.floor(Math.random() * 10000),
            aptDate: selectedClient.aptDate,
            aptTime: selectedClient.aptTime,
          },
        ],
      },
      ...allClients.slice(index + 1),
    ];
    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients));
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {filteredClients.map((appointment) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={appointment.id}>
              <Item>
                <div className="flex flex-grow flex-col gap-y-2 justify-start items-start">
                  <div className="flex items-center gap-6 w-full">
                    <div className="flex items-start flex-col">
                      <span className="text-xs font-semibold text-black/40">
                        Client First Name
                      </span>
                      <span className="flex-none font-medium text-lg text-blue-500">
                        {appointment.firstName}
                      </span>
                    </div>
                    <div className="flex items-start flex-col">
                      <span className="text-xs font-semibold text-black/40">
                        Client Last Name
                      </span>
                      <span className="flex-none font-medium text-lg text-blue-500">
                        {appointment.lastName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start flex-col">
                    <span className="text-xs font-semibold text-black/40">
                      Client Location
                    </span>
                    <span className="flex-none font-medium text-lg text-blue-500">
                      {appointment.location}
                    </span>
                  </div>

                  <div className="flex items-start flex-col w-full">
                    <span className="text-xs font-semibold text-black/40">
                      Appointment List
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
                        {appointment?.apts?.slice(0, 3).map((item) => (
                          <tr className="w-full" key={item}>
                            <td className="px-1 py-1 text-left">
                              {item.aptDate}
                            </td>
                            <td className="px-1 py-1 text-left">
                              {item.aptTime}
                            </td>
                            <td className="px-1 py-1 text-left">
                              <button
                                type="button"
                                onClick={() => {
                                  // confirmation from user
                                  const isOk = prompt(
                                    "Are you sure you want to delete this appointment? if yes type 'yse' else type 'no'"
                                  );
                                  if (isOk.toLowerCase() === "yes") {
                                    const allClients = JSON.parse(
                                      localStorage.getItem("clients")
                                    );
                                    const index = allClients.findIndex(
                                      (item) => item.id === appointment.id
                                    );
                                    const clients = allClients
                                      .filter(
                                        (item) => item.id === appointment.id
                                      )[0]
                                      .apts.filter(
                                        (date) => date.id !== item.id
                                      );
                                    const updatedClients = [
                                      ...allClients.slice(0, index),
                                      {
                                        ...allClients[index],
                                        apts: clients,
                                      },
                                      ...allClients.slice(index + 1),
                                    ];
                                    setClients(updatedClients);
                                    localStorage.setItem(
                                      "clients",
                                      JSON.stringify(updatedClients)
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
                                  handleEditAppointment(appointment.id, item.id)
                                }
                                className="p-1 mr-1 rounded text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition-all duration-150 ease-in-out"
                              >
                                <BiEdit />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      {appointment.apts.length > 3 && (
                        <tfoot className="w-full">
                          <tr className="w-full">
                            <td
                              className="px-1 py-1 text-left underline text-blue-600 cursor-pointer"
                              onClick={() => naviagte(`/${appointment.id}`)}
                            >
                              see more
                            </td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>
                </div>
              </Item>
            </Grid>
          );
        })}
      </Grid>

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
    </Box>
  );
}
