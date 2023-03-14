import React, { createRef, useEffect } from "react";
import $ from "jquery";
import { Box } from "@mui/material";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

const CreateFormBuilder = ({ setFormData, handleInit, data, isDraft }) => {
  const fb = createRef();

  useEffect(() => {
    let options = {
      disabledAttrs: ["subtype"],
      sortableControls: true,
      disabledActionButtons: ["save", "data"],
      onClearAll: function (formData) {
        setFormData(null);
      },
      stickyControls: {
        enable: true,
        offset: {
          top: 20,
          right: 20,
          left: "auto",
        },
      },
      actionButtons: [
        {
          id: "submit",
          className: "submitFormBuilder",
          label: data ? "Update" : "Create",
          type: "button",
          events: {
            click: function () {
              $(() => {
                let myxml = formBuilder.actions.getData("json", true);
                let myxml2 = JSON.parse(myxml);
                if (myxml2.length > 0) {
                  setFormData(myxml);
                  handleInit(true, formBuilder.formData);
                } else {
                  alert("Add atleast one Field");
                }
              });
            },
          },
        },
        {
          id: "submit",
          className: "draftFormBuilder",
          label: isDraft ? "Save Draft" : "Draft",
          type: "button",
          events: {
            click: function () {
              $(() => {
                let myxml = formBuilder.actions.getData("json", true);
                let myxml2 = JSON.parse(myxml);
                if (myxml2.length > 0) {
                  setFormData(myxml);
                  handleInit(
                    true,
                    formBuilder.formData,
                    isDraft ? "0" : "1",
                    isDraft ? "saveDraft" : "draft"
                  );
                } else {
                  alert("Add atleast one Field");
                }
              });
            },
          },
        },
      ],
      fields: [
        {
          label: "Star Rating",
          attrs: {
            type: "text",
          },
          icon: "🌟",
        },
        {
          label: "Signature",
          className: "form-signature",
          attrs: {
            type: "text",
          },
        },
        {
          label: "Essential",
          attrs: {
            type: "text",
          },
        },
      ],
      // templates: {
      //   starRating: function (fieldData) {
      //     return {
      //       field: '<span id="' + fieldData.name + '">',
      //       onRender: function () {
      //         $(document.getElementById(fieldData.name)).rateYo({
      //           rating: 3.6,
      //         });
      //       },
      //     };
      //   },
      // },
      formData: data,
    };

    const formBuilder = $(fb.current).formBuilder(options);
  }, []);

  return (
    <>
      <Box id="fb-editor" ref={fb} />
    </>
  );
};

export default CreateFormBuilder;
