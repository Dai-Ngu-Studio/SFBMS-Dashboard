import React from "react";
import { FiCreditCard } from "react-icons/fi";
import { BsCurrencyDollar, BsShield } from "react-icons/bs";
import { MdFeedback, MdInventory } from "react-icons/md";
import { GiSoccerField } from "react-icons/gi";
import { clearFieldValues } from "../features/field/fieldSlice";
import { clearFeedbackValues } from "../features/feedback/feedbackSlice";

export const links = [
  {
    title: "Pages",
    links: [
      {
        name: "fields",
        icon: <GiSoccerField />,
        clickEvent: clearFieldValues(),
      },
      {
        name: "booking-details",
        icon: <MdInventory />,
        clickEvent: clearFieldValues(),
      },
      {
        name: "feedbacks",
        icon: <MdFeedback />,
        clickEvent: clearFeedbackValues(),
      },
    ],
  },
];

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
    Name: "Not yet",
  },
  {
    id: 1,
    Name: "Open",
  },
  {
    id: 2,
    Name: "Attended",
  },
  {
    id: 1,
    Name: "Absent",
  },
];

// export const showBookingDetailStatus = (status) => {
//   switch (status) {
//     case 0:
//       "Not yet";
//       break;
//     case 1:
//       "Open";
//       break;
//     case 2:
//       "Attended";
//       break;
//     case 3:
//       "Absent";
//       break;
//   }
// };

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
  {
    icon: <BsShield />,
    title: "My Inbox",
    desc: "Messages & Emails",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
  },
  {
    icon: <FiCreditCard />,
    title: "My Tasks",
    desc: "To-do and Daily Tasks",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
  },
];
