import { Modal } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarsRate from "./../StarsRate";
import useGetActivityDetails from "../../hooks/users/useGetActivityDetails";
import DataLoader from "../DataLoader";

export default function ActivityView({ showModal, handleClose, item }) {
  const { data, isLoading } = useGetActivityDetails(item?.id);

  return (
    <Modal
      show={showModal}
      centered
      onHide={handleClose}
      aria-labelledby="slider-modal"
    >
      <Modal.Header closeButton>
        <h6>{data?.title_en}</h6>
      </Modal.Header>

      <Modal.Body>
        <div className="tool_details">
          {isLoading ? (
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
                {data?.activity_images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image.image_path}
                      alt={`Tool image ${index + 1}`}
                      className="img-fluid"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="text mt-3">
                <h6>
                  {data?.title_en} <span>{data?.price} SAR</span>
                </h6>
                <span className="category_rate">
                  {data?.activity_type?.name_en}{" "}
                  <StarsRate rate={Number(data?.average_rating)} />
                </span>
                <span>{data?.city_name_en}</span>
                <p>{data?.description_en}</p>

                <div className="trip_plans">
                  {data?.activity_plans?.map((plan) => (
                    <div key={plan?.id}></div>
                  ))}
                </div>

                <div className="d-flex gap-3 w-100">
                  <div className="capacity">
                    <div className="icon">
                      <img src="/icons/capacity.svg" alt="capacity" />
                      <h6>Capacity</h6>
                    </div>
                    <h5>{data?.capacity}</h5>
                  </div>

                  <div className="capacity">
                    <div className="icon">
                      <img src="/icons/calender.svg" alt="capacity" />
                      <h6>Start Date</h6>
                    </div>
                    <h5>
                      {data?.start_date?.split(",").length > 0
                        ? data?.start_date?.split(",")[0]
                        : data?.start_date}
                    </h5>
                  </div>
                </div>

                <div className="owner_card">
                  <div className="icon">
                    <img src="" alt="" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
