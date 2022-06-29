import { MdFeedback, MdInventory } from "react-icons/md";
import { GiSoccerField } from "react-icons/gi";
import { clearInputFieldValues } from "../features/field/fieldSlice";
import { clearFeedbackValues } from "../features/feedback/feedbackSlice";
import { clearBookingDetailValues } from "../features/bookingdetail/bookingDetailSlice";

export const links = [
  {
    title: "Pages",
    links: [
      {
        name: "fields",
        icon: <GiSoccerField />,
        clickEvent: clearInputFieldValues(),
      },
      {
        name: "booking-details",
        icon: <MdInventory />,
        clickEvent: clearBookingDetailValues(),
      },
      {
        name: "feedbacks",
        icon: <MdFeedback />,
        clickEvent: clearFeedbackValues(),
      },
    ],
  },
];
