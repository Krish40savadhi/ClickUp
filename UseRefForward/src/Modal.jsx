import ReactDOM from 'react-dom';

function Modal({ children }) {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    console.error('No element with id "modal-root" found in HTML');
    return null;
  }

  return ReactDOM.createPortal(
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '500px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
  }
};

export default Modal;
