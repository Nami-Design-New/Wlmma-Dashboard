import { Modal, Nav, Tab } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useGetToolDetails from "../../hooks/users/useGetToolDetails";
import DataLoader from "../DataLoader";
import useGetToolOrders from "../../hooks/users/useGetToolOrders";

export default function ToolView({ showModal, handleClose, item }) {
  const { data, isLoading } = useGetToolDetails(item?.id);
  const { data: orders, isLoading: ordersLoading } = useGetToolOrders(item?.id);

  return (
    <Modal
      show={showModal}
      centered
      onHide={handleClose}
      aria-labelledby="slider-modal"
    >
      <Modal.Header closeButton>
        <h6>{data?.name_en}</h6>
      </Modal.Header>

      <Modal.Body>
        <div className="tool_details">
          <Tab.Container id="user-tabs" defaultActiveKey="first">
            <Nav variant="pills" className="mb-3 gap-2">
              <Nav.Item>
                <Nav.Link eventKey="first">Tool Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Tool Orders</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              {/* User Info */}
              <Tab.Pane eventKey="first">
                <>
                  {isLoading || ordersLoading ? (
                    <DataLoader />
                  ) : (
                    <>
                      <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={true}
                        navigation
                        pagination={{ clickable: true }}
                      >
                        {data?.tool_image?.length > 0 ? (
                          <>
                            {data?.tool_image?.map((image, index) => (
                              <SwiperSlide key={index}>
                                <img
                                  src={image.image_path}
                                  alt={`Tool image ${index + 1}`}
                                  className="img-fluid"
                                />
                              </SwiperSlide>
                            ))}
                          </>
                        ) : (
                          <SwiperSlide>
                            <img
                              src="/images/headerLogo.svg"
                              alt={`Tool image`}
                              className="img-fluid"
                            />
                          </SwiperSlide>
                        )}
                      </Swiper>

                      <div className="text mt-3">
                        <h6>
                          {data?.name_en} <span>{data?.price} SAR</span>
                        </h6>
                        <p>{data?.description_en}</p>
                      </div>
                    </>
                  )}
                </>
              </Tab.Pane>

              {/* User Bookings */}
              <Tab.Pane eventKey="second">
                {orders?.length > 0 ? (
                  <div className="bookings-grid">
                    {orders?.map((booking) => (
                      <div key={booking.id} className="booking-card">
                        <div className="booking-header">
                          <h6>Booking #{booking.id}</h6>
                          <span className="status status-1">
                            {booking.status}
                          </span>
                        </div>
                        <div className="booking-body">
                          <p>
                            Location:{" "}
                            <strong>{booking.location || "N/A"}</strong>
                          </p>
                          <p>
                            Additional Details:{" "}
                            <strong>
                              {booking.additional_details || "N/A"}
                            </strong>
                          </p>
                          <p>
                            Created At:{" "}
                            <strong>
                              {new Date(booking.created_at).toLocaleString()}
                            </strong>
                          </p>
                          <p>
                            Total Price: <strong>{booking.total}</strong> SAR
                          </p>

                          {/* Order Items */}
                          {booking.order_items?.length > 0 && (
                            <div className="mt-2">
                              <h6>Items:</h6>
                              {booking.order_items.map((item) => (
                                <div key={item.id} className="order-item">
                                  <p>
                                    {item.tool?.name_en} × {item.quantity} ={" "}
                                    <strong>{item.sub_total} SAR</strong>
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center mt-5">No bookings found.</p>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </Modal.Body>
    </Modal>
  );
}
