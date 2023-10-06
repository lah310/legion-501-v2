import css from '../stylesheets/index.module.css'

const Modal = (props) => {
	return (
		<div>
			{/* <div
				className={css.ModalBase}
				onClick={() => props.setOpenModal(false)}
			></div> */}
			<div
				className={css.ModalBody}
				{...props}
			></div>
		</div>
	)
}

export default Modal
