export const slotStatus = [
  {
    id: 0,
    name: "Active",
  },
  {
    id: 1,
    name: "Inactive",
  },
];

export const bookingDetailStatus = [
  {
    id: 0,
    name: "Not yet",
  },
  {
    id: 1,
    name: "Open",
  },
  {
    id: 2,
    name: "Attended",
  },
  {
    id: 3,
    name: "Absent",
  },
];

export const showBookingDetailStatus = (status) => {
  switch (status) {
    case 0:
      return "Not yet";
    case 1:
      return "Open";
    case 2:
      return "Attended";
    case 3:
      return "Absent";
  }
};
