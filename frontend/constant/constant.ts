import { IoHome } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { MdReviews } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { FaBrain } from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";

export const navLinks = [
  {
    id: "home",
    url: "#",
    label: "Home",
    icon: IoHome,
  },
  {
    id: "about",
    url: "#",
    label: "About",
    icon: IoIosInformationCircle,
  },
  {
    id: "services",
    url: "#",
    label: "Services",
    icon: MdOutlineMiscellaneousServices,
  },
  {
    id: "projects",
    url: "#",
    label: "Projects",
    icon: GrProjects,
  },
  {
    id: "skills",
    url: "#",
    label: "Skills",
    icon: FaBrain,
  },
  {
    id: "reviews",
    url: "#",
    label: "Reviews",
    icon: MdReviews,
  },
  {
    id: "blogs",
    url: "#",
    label: "Blogs",
    icon: RiArticleFill,
  },
  {
    id: "contacts",
    url: "#",
    label: "Contacts",
    icon: MdContacts,
  },
];
