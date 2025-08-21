import { NavLink } from "react-router";
import { Accordion } from "react-bootstrap";
import useLogout from './../hooks/auth/useLogout';

export default function Sidebar() {
  const { logout, isPending } = useLogout();

  return (
    <aside>
      <div className="logo">
        <img src="/images/headerLogo.svg" alt="logo" />
      </div>

      <div className="nav_items">
        <NavLink to="" end>
          <img src="/icons/dashboard.svg" alt="dashboard" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="general-settings">
          <img src="/icons/settings.svg" alt="settings" />
          <span>General Settings</span>
        </NavLink>

        <Accordion
          defaultActiveKey={
            location.pathname.includes("users") ||
            location.pathname.includes("providers") ||
            location.pathname.includes("companies")
              ? "0"
              : undefined
          }
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div>
                <img src="/icons/clients.svg" alt="clients" />
                <span>Users</span>
              </div>
              <i className="fa-regular fa-angle-right"></i>
            </Accordion.Header>

            <Accordion.Body>
              <NavLink to="users">
                <span className="circle"></span> Customers
              </NavLink>
              <NavLink to="providers">
                <span className="circle"></span> Individual Providers
              </NavLink>
              <NavLink to="companies">
                <span className="circle"></span> Company Providers
              </NavLink>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <NavLink to="requests">
          <img src="/icons/user_plus.svg" alt="requests" />
          <span>Providers Requests</span>
        </NavLink>

        <NavLink to="trip-types">
          <img src="/icons/adventures.svg" alt="bookings" />
          <span> Trip Types </span>
        </NavLink>

        <NavLink to="activities">
          <img src="/icons/activities.svg" alt="bookings" />
          <span>Trips</span>
        </NavLink>

        <NavLink to="tools">
          <img src="/icons/orders.svg" alt="orders" />
          <span>Tools</span>
        </NavLink>

        <NavLink to="support">
          <img src="/icons/support.svg" alt="support" />
          <span>Support Messages</span>
        </NavLink>
      </div>

      <div className="logout">
        <div className="link" onClick={logout} disabled={isPending}>
          <img src="/icons/logout.svg" alt="logout" />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}
