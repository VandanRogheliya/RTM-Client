import React from 'react'

// Importing Bootstrap Components
import { Button, Modal } from 'reactstrap'

// Delete component defination
function DeleteModal({ toggle, toggleModal, onDelete }) {
	return (
		<div>
			<Modal
				modalClassName="modal-mini modal-danger modal-mini"
				isOpen={toggle}
				toggle={() => toggleModal(!toggle)}
			>
				{/* Message */}
				<div className="modal-header justify-content-center">
					<button className="close" onClick={e => toggleModal(!toggle)}>
						<i className="tim-icons icon-simple-remove text-white" />
					</button>
					<div className="modal-profile">
						<i className="tim-icons icon-alert-circle-exc" />
					</div>
				</div>
				<div className="modal-body">
					<p>Warning! This will delete the mission permanently</p>
				</div>

				{/* Delete Button */}
				<Button className="btn-neutral mb-2" color="link" type="button" onClick={() => onDelete()}>
					Delete
				</Button>
			</Modal>
		</div>
	)
}

export default DeleteModal
