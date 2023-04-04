import StatItem from "./StatItem";
import { useAppContext } from "../context/appContext";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug, FaShirtsinbulk } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
// import Stats from "../pages/dashboard/Stats";


const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: "pending application",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
    {
      title: "got employed",
      count: stats.employed || 0,
      icon: <FaShirtsinbulk />,
      color: "#a2c934",
      bcg: "#32CD32",
    }
  ];
  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
      <StatItem />
    </Wrapper>
  );
};

export default StatsContainer;
