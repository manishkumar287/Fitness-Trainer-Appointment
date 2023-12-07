import { BiCalendar } from "react-icons/bi";
import { useState } from "react";
import AddAppointment from "./AddAppointment";
import AddClient from "./AddClient";
import Search from "./Search";
import ResponsiveGrid from "./grid/ResponsiveGrid";
import ViewCalendar from "./ViewCalendar";

const Home = () => {
  let [clients, setClients] = useState(
    JSON.parse(localStorage.getItem("clients")) || []
  );
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("firstName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredClients = clients
    .filter((item) => {
      return (
        item.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.lastName.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const addClient = (client) => {
    setClients([...clients, client]);
    localStorage.setItem("clients", JSON.stringify([...clients, client]));
  };

  const addAppointment = (clientId, apts) => {
    const allClients = JSON.parse(localStorage.getItem("clients"));
    const index = allClients.findIndex(
      (item) => item.id === JSON.parse(clientId)
    );
    console.log("clientId", typeof clientId, apts, index);
    console.log("all clinets", allClients);
    const updatedClients = [
      ...allClients.slice(0, index),
      {
        ...allClients[index],
        apts: [...allClients[index].apts, apts],
      },
      ...allClients.slice(index + 1),
    ];
    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients));
  };

  return (
    <>
      <div className="App container mx-auto px-5 py-4 mt-3 font-thin">
        <h1 className="text-2xl md:text-3xl mb-4 flex flex-col md:flex-row items-start md:items-center font-semibold text-red-400">
          <BiCalendar className="inline-block text-red-400 align-top mr-2" />
          Fitness Trainer Appointment Scheduling Website
        </h1>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <AddClient addClient={addClient} />
          <AddAppointment addAppointment={addAppointment} clients={clients} />
          <ViewCalendar />
        </div>
        <Search
          query={query}
          onQueryChange={(event) => {
            setQuery(event.target.value);
          }}
          orderBy={orderBy}
          onOrderByChange={(val) => {
            setOrderBy(val);
          }}
          sortBy={sortBy}
          onSortBYChange={(val) => {
            setSortBy(val);
          }}
        />

        {filteredClients.length === 0 && (
          <div className="text-center mt-5">No Clients Available</div>
        )}
        {filteredClients.length > 0 && (
          <ResponsiveGrid
            filteredClients={filteredClients}
            clients={clients}
            setClients={setClients}
          />
        )}
      </div>
    </>
  );
};

export default Home;
