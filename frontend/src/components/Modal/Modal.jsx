import React from 'react';

const Modal = (props) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 ${props.width} flex h-full items-center justify-center`}
        style={{
          zIndex: '9999',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="z-50 mx-auto overflow-y-auto rounded bg-white shadow-lg ">
          <div
            className={`relative flex flex-col rounded-lg border-2 bg-white shadow-lg outline-none focus:outline-none`}
          >
            <div className="relative flex-auto p-6">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
