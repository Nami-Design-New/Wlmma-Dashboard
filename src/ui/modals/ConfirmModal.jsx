import { Modal } from "react-bootstrap";
import SubmitButton from "../forms/SubmitButton";

const ConfirmModal = ({
  show,
  closeModal,
  text,
  loading,
  onConfirm,
  btn,
  danger,
}) => {
  return (
    <Modal
      show={show}
      onHide={closeModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="pb-0">
        <h6>Confirm</h6>
      </Modal.Header>

      <Modal.Body className="pt-0">
        <div className="row confirmation_modal">
          <div className="col-12 p-2">
            <p>{text}</p>
          </div>
          <div className="col-12 p-2 d-flex gap-2">
            <button className="cancel" onClick={closeModal}>
              Cancel
            </button>

            <SubmitButton
              text={btn}
              loading={loading}
              event={onConfirm}
              className={`confirm ${danger ? "red" : "#000"}`}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
