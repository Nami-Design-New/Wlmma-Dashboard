import { Modal } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useGetToolDetails from "../../hooks/users/useGetToolDetails";
import DataLoader from "../DataLoader";

export default function ToolView({ showModal, handleClose, item }) {
  const { data, isLoading } = useGetToolDetails(item?.id);

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
        </div>
      </Modal.Body>
    </Modal>
  );
}
