import React from 'react'
import "./ModalPopup.css"

export default function PopupModal() {
    return (
        <div id="customModal" class="modal hidden">
            <div class="modal-content">
                <span id="closeModalBtn" class="close">&times;</span>
                <h2 class="text-lg font-semibold">Error</h2>
                <p class="mb-4">One field is missing!</p>
            </div>
        </div>
    )
}
