import React, { useEffect, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { Link } from "react-router-dom";

const CalenderPage = () => {
  let [clients, setClients] = useState(
    JSON.parse(localStorage.getItem("clients")) || []
  );
  let [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const transformedData = [];
    clients.forEach((client) => {
      const clientName = client.firstName + " " + client.lastName;
      client.apts.forEach((date) => {
        transformedData.push({
          title: clientName,
          start: date.aptDate + " " + date.aptTime,
        });
      });
    });
    setMyEvents(transformedData);
  }, []);

  useEffect(() => {
    const calendarEl = document.getElementById("calendar");
    let calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,listWeek",
      },
      events: myEvents,
    });
    calendar.render();
  }, [myEvents]);

  console.log("myEvents : ", myEvents);

  return (
    <>
      {/* Back to home Link */}
      <div className="flex justify-start p-4">
        <Link to="/" className="text-blue-400 underline">
          Back to Home
        </Link>
      </div>

      <div id="calendar" className="p-4"></div>
    </>
  );
};

export default CalenderPage;
