import CountUp from "react-countup";
import useGetStatistics from "../../hooks/settings/useGetStatistics";

export default function Statistics() {
  const { data: statistics, isLoading } = useGetStatistics();

  const percentPointer = (percent) => {
    const isNegative = percent?.split("")?.[0] === "-";
    return isNegative ? "/icons/down.svg" : "/icons/up.svg";
  };

  const data = [
    {
      title: "All Users",
      icon: "fa-users",
      value: statistics?.allUsers,
      pointer: percentPointer(statistics?.allUsersChangePercent),
      percent: statistics?.allUsersChangePercent,
    },
    {
      title: "Service Providers",
      icon: "fa-buildings",
      value: statistics?.providers,
      pointer: percentPointer(statistics?.providersChangePercent),
      percent: statistics?.providersChangePercent,
    },
    {
      title: "Reservations This Month",
      icon: "fa-calendar",
      value: statistics?.reservationsThisMonth,
      pointer: percentPointer(statistics?.reservationsChangePercent),
      percent: statistics?.reservationsChangePercent,
    },
    {
      title: "Tools Orders",
      icon: "fa-box",
      value: statistics?.toolsOrders,
      pointer: percentPointer(statistics?.toolsOrdersChangePercent),
      percent: statistics?.toolsOrdersChangePercent,
    },
  ];

  return isLoading ? null : (
    <div className="statistics">
      {data.map(({ title, icon, value, pointer, percent }) => (
        <div className="static_card" key={title}>
          <div className="head">
            <h6>{title}</h6>
            <div className="icon">
              <i className={`fa-regular ${icon}`} />
            </div>
          </div>

          <div className="content">
            <h3>
              <CountUp start={0} end={value} duration={3} separator="," />
            </h3>

            <p>
              <img src={pointer} alt="" /> <span>{percent}</span> form last
              month
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
