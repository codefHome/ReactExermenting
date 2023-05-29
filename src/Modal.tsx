

function Modal(props: {showModal:boolean,handleClose:()=>void }) {


  return (
    <>
      {props.showModal ? (
        <div className="modalStyle">
         
          <div>
          <label>What do you want to add</label>
           <button onClick={props.handleClose}>Category</button>
           <button onClick={props.handleClose}>Services</button>
           
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;
