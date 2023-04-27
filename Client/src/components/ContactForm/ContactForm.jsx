import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../../redux/Actions/actions";
import validationContact from "../validation/validationContactForm";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    setContactForm({
      ...contactForm,
      [event.target.name]: event.target.value,
    });

    setErrors(validationContact(contactForm));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addMessage(contactForm));
  };

  return (
    <div className={styles.background}>

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        
        <label htmlFor="name" className={styles.label1}>
          Name
        </label>
        <input
          type="text"
          name="name"
          value={contactForm.name}
          onChange={handleChange}
          className={styles.input1}
        />
        {errors.name && (
          <p className={styles.errorText1}>{errors.name}</p>
        )}

        <label htmlFor="email" className={styles.label2}>
          Email
        </label>
        <input
          type="text"
          name="email"
          value={contactForm.email}
          onChange={handleChange}
          className={styles.input2}
        />
        {errors.email && (
          <p className={styles.errorText2}>{errors.email}</p>
        )}

        <label htmlFor="message" className={styles.label3}>
          Message
        </label>
        <textarea
          name="message"
          value={contactForm.message}
          id="message"
          cols="30"
          rows="20"
          onChange={handleChange}
          className={styles.textarea}
        ></textarea>
        {errors.message && (
          <p className={styles.errorText3}>{errors.message}</p>
        )}

        <button
          type="submit"
          disabled={
            !contactForm.name ||
            !contactForm.email ||
            !contactForm.message ||
            Object.values(errors).some((error) => error.length > 0)
          }
          className={styles.submitButton}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;