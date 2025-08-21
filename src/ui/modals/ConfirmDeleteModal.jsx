import { Modal } from "react-bootstrap";
import SubmitButton from "../forms/SubmitButton";

const ConfirmDeleteModal = ({
  show,
  closeDeleteModal,
  text,
  loading,
  onConfirm,
}) => {
  return (
    <Modal
      show={show}
      onHide={closeDeleteModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="pb-0">
        <h6>Confirm Delete</h6>
      </Modal.Header>

      <Modal.Body className="pt-0">
        <div className="row confirmation_modal">
          <div className="col-12 p-2">
            <p>{text}</p>
          </div>
          <div className="col-12 p-2 d-flex gap-2">
            <button className="cancel" onClick={closeDeleteModal}>
              Cancel
            </button>
            <SubmitButton
              text="Delete"
              className="confirm red"
              loading={loading}
              event={onConfirm}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDeleteModal;
