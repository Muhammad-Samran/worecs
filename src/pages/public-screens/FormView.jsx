import $ from "jquery";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import "./styles.css";
import { Container } from "@mui/system";
import {
  acceptForm,
  submitForm,
  showSubmissionForms,
  storeFormRequest,
} from "../../api/candidate/candidate.class";
import { useSelector } from "react-redux";
import Navbar from "../../components/home-page/navbar/Navbar";
import { routes } from "../../routes";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("formBuilder/dist/form-render.min.js");

const FormView = () => {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth.results);

  const location = useLocation();
  const data = location?.state?.data;
  const type = location?.state?.type;
  const uuid = location?.state?.uuid;
  const row = location?.state?.row;
  const [loading, setLoading] = useState(false);
  const { formToken } = useParams();

  const [renderData, setRenderData] = useState();

  const [payload, setPayload] = useState();
  const [submitData, setSubmitData] = useState();

  const [formBuilderData, setFormBuilderData] = useState();

  let fbOptions = {
    disabledAttrs: ["subtype"],
  };

  useEffect(() => {
    $("#fb-render").formRender({
      disabledAttrs: ["subtype"],
      dataType: "json",
      formData: formBuilderData?.length > 0 ? formBuilderData : data,
    });
  });

  useEffect(() => {
    const AcceptForm = async () => {
      try {
        const response = await acceptForm(formToken);
        // console.log(response?.data);
        if (response?.data?.success) {
          setFormBuilderData(
            response?.data?.results?.form_builder?.form_builder_json
          );
          setPayload(response?.data?.results);
        }
      } catch (error) {
        console.log(error);
      }
    };
    AcceptForm();
  }, []);

  const handleSubmit = async () => {
    var json = {};
    $("#my-form").on("submit", function (event) {
      var object = $(".rendered-form :input").serializeArray();

      $.each(object, function () {
        if (json[this.name] !== undefined) {
          if (!json[this.name].push) {
            json[this.name] = [json[this.name]];
          }
          json[this.name].push(this.value || "");
        } else {
          json[this.name] = this.value || "";
        }
      });
      setRenderData(json);

      event.preventDefault();
    });
  };

  useEffect(() => {
    const SubmitForm = async () => {
      if (renderData) setLoading(true);
      try {
        if (renderData && formToken && type !== "candidate") {
          const response = await submitForm(payload?.form_builder?.slug, {
            ...renderData,
            recruiter_id: payload?.recruiter_id,
            form_builder_id: payload?.form_builder?.id,
            form_request_id: payload?.id,
            form_builder_category_id:
              payload?.form_builder?.form_builder_category?.id,
            workspace_id: payload?.workspace_id,
          });

          if (response.data.success) {
            setLoading(false);
            navigate("/");
          }
        } else if (renderData && type === "candidate") {
          // console.log("render data", renderData);
          const response = await storeFormRequest(row?.form_builder?.slug, {
            ...renderData,
            recruiter_id: row?.recruiter_id,
            form_builder_id: row?.form_builder?.id,
            form_request_id: row?.id,
            form_builder_category_id:
              row?.form_builder?.form_builder_category?.id,
            workspace_id: row?.workspace_id,
            candidate_id: auth?.candidate_id,
          });

          if (response.data.success) {
            setLoading(false);
            navigate("/dashboard/request/list");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    SubmitForm();
  }, [renderData]);

  useEffect(() => {
    if (type === "submission") {
      const API = async () => {
        const response = await showSubmissionForms(uuid, {
          workspace_id: auth?.workspace_id,
        });
        // console.log(response?.data?.results?.data_json);
        setSubmitData(response?.data?.results?.data_json);
      };

      API();
    }
  }, []);

  useEffect(() => {
    // console.log("================================", submitData);
    if (type === "submission" && submitData) {
      var frm = $(".rendered-form");
      $.each(submitData, function (key, value) {
        // console.log("[name=" + key + "]");
        var $ctrl = $("[name=" + key + "]", frm);
        switch ($ctrl.attr("type")) {
          case "text":
          case "hidden":
            $ctrl.val(value);
            break;
          case "radio":
            $ctrl.each(function () {
              if ($(this).attr("value") == value) {
                $(this).attr("checked", value);
              }
            });
            break;
          case "checkbox":
            for (var i = 0; i < value.length; i++) {
              $ctrl.each(function () {
                if ($(this).attr("value") == value[i]) {
                  $(this).attr("checked", value[i]);
                }
              });
            }
            break;

          default:
            $ctrl.val(value);
        }
      });
    }
  }, [submitData]);
  return (
    <>
      <Container
        className={
          "py-5 px-5 d-flex flex-column align-items-center justify-content-center"
        }
      >
        <form id="my-form">
          <fieldset disabled={type === "submission" ? true : false}>
            <Box className="bodyView">
              <Box className="mainView" id="fb-render" />
            </Box>
            {type === "submission" ? (
              <></>
            ) : (
              <Box
                className={`button-primary`}
                // style={{ display: "flex", width: "100%" }}
              >
                {formToken || type === "candidate" ? (
                  <Button type="submit" onClick={handleSubmit}>
                    {loading ? (
                      <CircularProgress style={{ color: "white" }} />
                    ) : (
                      "Submit Form"
                    )}
                  </Button>
                ) : (
                  <Button
                    style={{ marginRight: "20px" }}
                    className="secondary-btn"
                    onClick={() =>
                      auth?.type === "candidate"
                        ? navigate(routes.SUBMISSION_LIST)
                        : navigate("/dashboard/forms")
                    }
                  >
                    Back
                  </Button>
                )}
              </Box>
            )}
          </fieldset>
        </form>
      </Container>
    </>
  );
};
export default FormView;
