import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { FieldError } from "components/FieldError/FieldError";
import { useState } from "react";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { ValidatorService } from "services/form-validators";
import s from "./style.module.css";

const VALIDATORS = {
	title: (value) => {
		return ValidatorService.min(value, 3) || ValidatorService.max(value, 20)
	},
	content: (value) => {
		return ValidatorService.min(value, 3);
	},
}


export function NoteForm({ isEditable = true, note, title, onClickEdit, onClickDelete, onSubmit }) {
	const [formValues, setFormValues] = useState({ 
		title: note?.title || "", 
		content: note?.content || "",
	});
	const [formErrors, setFormErrors] = useState({
		title: note?.title ? undefined : true,
		content: note?.content ? undefined : true
	});
	function hasError() {
		return Object.values(formErrors).some((error => error !== undefined))
	}
	const updateFormValues = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setFormValues({ ...formValues, [name]: value })
		validate(name, value);
	}

	function validate(fieldName, fieldValue) {
		setFormErrors({
			...formErrors,
			[fieldName]: VALIDATORS[fieldName](fieldValue),
		})
	}

	const actionIcons = (
		<>
			<div className="col-1">
				{onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon} />}
			</div>
			<div className="col-1">
				{onClickDelete && <TrashFill onClick={onClickDelete} className={s.icon} />}
			</div>
		</>
	);

	const titleInput = (
		<>
			<div className="mb-5">
				<label className="form-label">Title</label>
				<input
					onChange={updateFormValues}
					type="text"
					name="title"
					className="form-control"
					value={formValues.title}
				/>
				<FieldError msg={formErrors.title} />
			</div>
		</>
	)

	const contentInput = (
		<>
			<div className="mb-5">
				<label className="form-label">Content</label>
				<textarea
					onChange={updateFormValues}
					type="text"
					name="content"
					className="form-control"
					rows="5"
					value={formValues.content}
				/>
				<FieldError msg={formErrors.content} />

			</div>
		</>
	)

	const submitBtn = (
		<div className={s.submit_btn}>
			<ButtonPrimary isDisabled={hasError()} onClick={() => onSubmit(formValues)} >Submit</ButtonPrimary>
		</div>
	)

	return (
		<div className={s.container}>
			<div className="row justify-content-space-between">
				<div className="col-10">
					<h2 className="mb-3">{title} </h2>
				</div>
				{actionIcons}
			</div>
			<div className={`mb-3 ${s.title_input_container}`}  >{isEditable && titleInput} </div>
			<div className="mb-3">{isEditable ? contentInput : <pre>{note.content}</pre>} </div>
			{onSubmit && submitBtn}
		</div>


	)

}





















