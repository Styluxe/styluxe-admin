
import './Modal.css'; // Create a CSS file for modal styling

const Modal = ({ children, type, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${type}`}>
        <img className="modal-close" onClick={onClose} src='cross_icon.svg'/>
        {children}
      </div>
    </div>
  );
};

export default Modal;
