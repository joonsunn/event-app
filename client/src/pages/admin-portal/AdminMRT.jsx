import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Typography } from "@mui/material";
import EditEventButton from "./EditEventButton";
import DeleteEventButton from "./DeleteEventButton";
import { timeFormatter } from "../../utils/timeUtils";
import CreateEventButton from "../../components/create-event/CreateEventButon";

const AdminMRT = ({ events, deleteEvent, updateEvent }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Event Name",
        size: 50,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 150,
      },
      {
        accessorKey: "organiser",
        header: "Host",
        size: 50,
      },
      {
        accessorKey: "location",
        header: "Venue",
        size: 50,
      },
      {
        accessorKey: "eventDate",
        header: "Date",
        size: 50,
      },
      {
        accessorKey: "time",
        header: "Time",
        size: 80,
        Cell: (cell) => {
          const date = cell.row.original.eventDate;
          const time = cell.row.original.time;
          return <span>{timeFormatter(new Date(`${date} ${time}`))}</span>;
        },
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        size: 50,
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        size: 50,
        Cell: (cell) => {
          const date = cell.row.original.endDate;
          const time = cell.row.original.endTime;
          return <span>{timeFormatter(new Date(`${date} ${time}`))}</span>;
        },
      },
      {
        accessorKey: "completed",
        header: "Status",
        size: 50,
        Cell: (cell) => {
          const completed = cell.row.original.completed;
          return <span>{completed ? "Completed" : "Ongoing"}</span>;
        },
      },
      {
        accessorKey: "priority",
        header: "Priority",
        size: 50,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: (cell) => {
          return (
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EditEventButton
                event={cell.row.original}
                updateEvent={updateEvent}
              />
              <DeleteEventButton
                id={cell.row.original.id}
                deleteEvent={deleteEvent}
              />
            </Box>
          );
        },
      },
    ],
    [events]
  );

  const table = useMaterialReactTable({
    columns,
    data: events,
  });

  return (
    <MaterialReactTable
      columns={columns}
      data={events}
      enableRowActions={false}
      enableColumnOrdering={false}
      enableEditing={false}
      enableDensityToggle={false}
      enableFilters={false}
      enableHiding={false}
      //   enableSorting={false}
      enableColumnActions={false}
      muiTableHeadCellProps={{
        sx: {
          div: {
            justifyContent: "center",
          },
        },
      }}
      renderTopToolbarCustomActions={() => (
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CreateEventButton />
        </Box>
      )}
    />
  );
};

export default AdminMRT;
