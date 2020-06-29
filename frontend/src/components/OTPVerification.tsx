import React from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import styles from './OTPVerification.module.css';
interface OTPVerificationProps {
    show: Boolean;
    onHide: Function;
}
export default ({show,onHide}:OTPVerificationProps) => {
    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        >
        <Modal.Header closeButton className={styles.OTPverification_modal_body}>
            <Modal.Title id="contained-modal-title-vcenter" className={"text-align-center"}>
                Verification Code
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className={styles.OTPverification_modal_body}>
            <div>
                <h5>Please type verification code sent to</h5>
                <p>123456789</p>
            </div>
            <div>
                <InputGroup className="mb-3 d-flex justify-content-center ">
                    <div className="d-flex align-items-center">
                    <FormControl
                    className={`mr-2 ml-2`}
                    aria-label="OTP-verification"
                    />
                    </div>
                </InputGroup>
            </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <a href="#" className={styles.OTPverification_modal_footer_align}>Back</a>
            <Button
            variant="primary" 
            size="sm"
            onClick={()=>onHide()}
            >Confirm</Button>
        </Modal.Footer>
        </Modal>
    )
}