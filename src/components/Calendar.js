import React from "react";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./App";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import client from "../utils/feathers";
import "../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import CalendarSidebar from "./CalendarSidebar";

const localizer = momentLocalizer(moment);

export default function CalendarContainer(props) {
  const authenticatedUser = useContext(LoginContext);
  const [calendarEntries, setCalendarEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(undefined);

  //gets calendar entries on component mount
  useEffect(() => {
    getCalendarEntries();
  }, []);

  //gets calendar entries and saves them to state
  async function getCalendarEntries() {
    const userID = authenticatedUser.login.user._id;
    const log = client.service("log");
    console.log(userID);

    const calendarEntryData = await log.find({
      query: {
        $limit: 100,
        userId: userID,
        $select: ["calendarEntry", "_id"],
      },
    });
    console.log(calendarEntryData);
    const formattedEntries = calendarEntryData.data.map((entry) => {
      return { ...entry.calendarEntry, id: entry._id };
    });

    setCalendarEntries(formattedEntries);
  }

  async function getSelectedEntry(id) {
    const log = client.service("log");
    const selectedEntryData = await log.find({ query: { _id: id } });
    setSelectedEntry(selectedEntryData.data[0]);
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={calendarEntries}
        startAccessor="start"
        allDayAccessor="allDay"
        views={["month"]}
        style={{ height: 500 }}
        onSelectEvent={(event) => getSelectedEntry(event.id)}
        popup={true}
      />
      <CalendarSidebar selectedEntry={selectedEntry} />
    </div>
  );
}