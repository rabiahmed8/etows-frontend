import React, { useEffect, useState } from "react";

// reactstrap components
import {
  CardHeader,
  Label,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
  Form,
  Card,
  FormGroup,
  Input,
  Spinner,
} from "reactstrap";
import { Document, Page, pdfjs } from "react-pdf";
import * as moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import config from "config";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import DateTimePicker from "react-datetime-picker";
import Select from "react-select";

import { getUploadDatabyUrl } from "APIstore/apiCalls";
const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
});
function ViewImageModal(props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const { classes, modal, itemData, prefix, companyId, loading } = props;
  const [openModal, setModal] = useState(modal);
  const [openData, setData] = useState(itemData ? itemData : {});

  const [imageUrl, setImageUrl] = useState("");
  const [imageType, setImageType] = useState("");
  const [pdfString, setPdfString] = useState("");
  const [msg, setMsg] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loader, setLoader] = useState(true);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  useEffect(() => {
    if (itemData?.url) {
      try {
        getUploadDatabyUrl(
          (prefix === null || prefix === undefined ? "" : prefix) +
            itemData?.url +
            (companyId ? "&companyId=" + companyId : ""),
          (res) => {
            if (res.sucess) {
              setImageType(res.sucess.type);

              if (String(itemData?.url).includes("/tow/image/files")) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  var data = event.target.result;

                  const base64Part = data.replace(
                    /^data:image\/\w+;base64,/,
                    ""
                  );
                  const endInd = data.length - base64Part.length;
                  const remainingPart = data.substring(0, endInd);
                  const dec = atob(base64Part);

                  setImageUrl(
                    dec.startsWith("data") ? dec : remainingPart + dec
                  );
                };

                reader.readAsDataURL(res.sucess);
              } else setImageUrl(URL.createObjectURL(res.sucess));

              if (
                res.sucess.type ==
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              ) {
                setModal(false);
                setLoader(false);
                setMsg("Your Excel sheet is downloaded");
              }
            } else {
              console.log("error in res");
            }
            setLoader(false);
          }
        );
      } catch (error) {
        console.log("error", error);
      }
    }
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    setData(itemData);
    setModal(modal);

    return () => {
      setPdfString("");
      setImageUrl("");
    };
  }, [modal, openData]);
  const onTrigger = (event) => {
    if (event == "1") {
      setModal(!openModal);
      setLoader(true);
      return;
    } else {
      setModal(!openModal);
      setLoader(true);
    }
  };
  const toggleUpdate = () => {
    onTrigger("1");
    setModal(!openModal);
    setLoader(true);
  };

  return (
    <>
      <Container className="mt--7" fluid>
        <Modal
          size="lg"
          style={{}}
          isOpen={openModal}
          toggleUpdate={() => {
            toggleUpdate();
          }}
          className={props.className}
        >
          <ModalBody>
            <Row>
              <Col className="order-xl-1" xl="12">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Show Document</h3>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      {itemData?.name ? (
                        <>
                          <h6 className="heading-small text-muted mb-4">
                            {(prefix === null || prefix === undefined
                              ? ""
                              : prefix) + itemData?.url}
                          </h6>
                          <div className="pl-lg-3">
                            {imageUrl && (
                              <Row>
                                <Col lg="12">
                                  {String(itemData?.url).includes(
                                    "/tow/image/files"
                                  ) ? (
                                    <img width={"100%"} src={imageUrl} />
                                  ) : (
                                    <iframe
                                      width={"100%"}
                                      src={imageUrl}
                                    ></iframe>
                                  )}
                                </Col>
                              </Row>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <Row>
                            <Col lg="12">Document not available</Col>
                          </Row>
                        </>
                      )}
                      {loader && (
                        <div className="SpinnerClass">
                          <Spinner className="loader" children={true} />
                        </div>
                      )}
                      <Row>
                        <div className="save-close-div">
                          <Button
                            color="primary"
                            className="s-btm my-4 save-close"
                            onClick={() => {
                              toggleUpdate();
                            }}
                          >
                            {config.close}
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Container>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
    </>
  );
}
ViewImageModal.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ViewImageModal);
