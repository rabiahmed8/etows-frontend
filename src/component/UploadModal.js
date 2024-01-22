import React, { useEffect, useState } from "react";

// reactstrap components
import {
    CardHeader,
    Label,
    Container,
    Row,
    Col,
    Modal, ModalHeader, ModalBody, ModalFooter,
    CardBody,
    Form,
    Card,
    FormGroup,
    Input
} from "reactstrap";

import * as moment from 'moment'
import toast, { Toaster } from 'react-hot-toast';
import config from "config";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import DateTimePicker from 'react-datetime-picker';
import Select from 'react-select';
const styles = (theme) => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: "none"
    }
});
function ViewImageModal(props) {
    const { classes, modal, title, data } = props;
    const [multipleImages, saveMultipleImages] = useState([]);
    const [openModal, setModal] = useState(modal);
    const [openData, setData] = useState(data ? data : {});
    const [comment, setComments] = useState('');
    const [paidnUnpaid, setPaidnUnpaid] = useState('');
    const [files, setFiles] = useState('');
    const [imageType, setType] = useState('');
    const [dateTimepickerIssueDate, onChangeIssueDate] = useState('');
    const [dateTimepickerExpiryDate, onChangeExpiryDate] = useState('');
    useEffect(() => {
        setData({})
        onChangeIssueDate('');
        onChangeExpiryDate('')
        setComments('')
        saveMultipleImages([])
        setData(data)
        setModal(modal);
    }, [modal, data])
    const uploadImages = (e, imageType) => {
        const files = e.target.files[0];
        setFiles(files)
        setType(imageType)
    }
    const onTrigger = (event) => {
        const issueDate = dateTimepickerIssueDate ? dateTimepickerIssueDate : '';
        const expDate = dateTimepickerExpiryDate ? dateTimepickerExpiryDate : '';
        const comments = comment ? comment : '';
        multipleImages.push(...multipleImages, { files, imageType, issueDate, expDate, comments })
        console.log("multiImages", multipleImages);
        setData({})
        onChangeIssueDate('');
        onChangeExpiryDate('')
        setComments('')
        if (event == "1") {

            setModal(!openModal)
            // setData('')
            return
        }
        else {
            props.parentCallback(multipleImages);
            // setData('')
            setModal(!openModal)
        }
    }
    const toggleUpdate = () => {
        onTrigger("1")
        setModal(!openModal)
    }
    return (
        <>
            <Container className="mt--7" fluid>
                <Modal size="lg" style={{ maxWidth: '1600px', width: '80%' }} isOpen={openModal}
                    toggleUpdate={() => { toggleUpdate() }}
                    className={props.className}>
                    <ModalBody>
                        <Row>

                            <Col className="order-xl-1" xl="12">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <Row className="align-items-center">
                                            <Col xs="8">
                                                <h3 className="mb-0">{title}</h3>
                                            </Col>

                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <h6 className="heading-small text-muted mb-4">
                                                {/* {config.govtAgency} */}
                                            </h6>
                                            <div className="pl-lg-3">
                                                {title == 'Invoice Upload' && (
                                                    <Row>
                                                        <Col lg="12">
                                                            <FormGroup>
                                                                <Label for="exampleSelect">Select Type</Label>

                                                                <Select
                                                                    name="form-field-name"
                                                                    // value={this.state.value}
                                                                    // defaultValue={setItem?.agencyType}
                                                                    // defaultInputValue={setItem?.agencyType}
                                                                    // val={setItem?.agencyType}
                                                                    onChange={(val) => {
                                                                        setPaidnUnpaid(val.label)
                                                                    }}
                                                                    labelKey='name'
                                                                    valueKey='countryCode'
                                                                    options={[
                                                                        { value: 'paid', label: 'Paid' },
                                                                        { value: 'unpaid', label: 'Unpaid' }
                                                                    ]}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                )}
                                                <Row>
                                                    <Col lg="2">
                                                        <FormGroup>
                                                            <div className="flex-class">
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="input-username"
                                                                >
                                                                    {title}
                                                                </label>
                                                                <input
                                                                    // accept="image/*"
                                                                    className={classes.input}
                                                                    id="contained-button-file-1"
                                                                    // defaultValue={openData?.name}
                                                                    type="file"
                                                                    onChange={(e) => {
                                                                        uploadImages(e, title.split(" ").join(""))
                                                                    }}
                                                                />
                                                                <label htmlFor="contained-button-file-1">
                                                                    <Button variant="contained" component="span" className='p-btm'>
                                                                        Upload
                                                                    </Button>
                                                                </label>
                                                            </div>
                                                        </FormGroup>

                                                    </Col>
                                                    {/* <Col lg="5">
                                                        <FormGroup>
                                                            <Label>Issue Date</Label>
                                                            <DateTimePicker onChange={onChangeIssueDate} value={dateTimepickerIssueDate} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="5">
                                                        <FormGroup>
                                                            <Label>Expiry Date</Label>
                                                            <DateTimePicker onChange={onChangeExpiryDate} value={dateTimepickerExpiryDate} />
                                                        </FormGroup>
                                                    </Col> */}
                                                    <Col lg="5">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Issued Date
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={openData?.issueDate}
                                                                id="input-username"
                                                                placeholder="YYYY-MM-DD"
                                                                type="text"
                                                                onChange={text => onChangeIssueDate(text.target.value)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="5">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Paid Date
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={openData?.expiryDate}
                                                                id="input-username"
                                                                placeholder="YYYY-MM-DD"
                                                                type="text"
                                                                onChange={text => onChangeExpiryDate(text.target.value)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col lg="12">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Comment
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={openData?.comments}
                                                                id="input-username"
                                                                placeholder="Comment"
                                                                type="text"
                                                                onChange={text => setComments(text.target.value)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <div className="save-close-div">
                                                        <Button
                                                            onClick={() => { onTrigger() }}
                                                            // onClick={() => { handleOnChange(25) }}
                                                            className="p-btm my-4 save-close" color="primary" type="button">
                                                            {config.save}
                                                        </Button>

                                                        <Button color="primary" className='s-btm my-4 save-close' onClick={() => { toggleUpdate() }}>{config.close}</Button>
                                                    </div>
                                                </Row>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </Container>
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: 'green',
                        },
                    },
                    error: {
                        style: {
                            background: 'red',
                        },
                    },
                }}
            />
        </>
    );
}
ViewImageModal.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ViewImageModal);