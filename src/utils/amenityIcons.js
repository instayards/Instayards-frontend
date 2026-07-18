import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";
import * as IoIcons from "react-icons/io5";

const icons = {
  ...FiIcons,
  ...FaIcons,
  ...GiIcons,
  ...MdIcons,
  ...IoIcons
};

export const getAmenityIcon = (iconName) => {
  return icons[iconName] || FiIcons.FiCheckCircle;
};