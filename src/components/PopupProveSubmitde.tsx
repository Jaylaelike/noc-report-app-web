"use client";
import React, { useState } from "react";

function PopupProveSubmitde(
    props: {  onClose : () => void }
) {

    // const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* The button to open modal */}z

      <label htmlFor="my_modal_7" className="btn">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">อนุมัติให้ส่ง Line Notify หรือ Emails</h3>
          <p className="py-4">ส่ง Line Notify หรือ Emails เพื่อแจ้งลูกค้า</p>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
}

export default PopupProveSubmitde;
