import React, { useEffect, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import gjsForms from "grapesjs-plugin-forms";
import gjsExport from "grapesjs-plugin-export";
// import gjsPlugin from "grapesjs-plugin-toolbox";
import gjsTable from "grapesjs-table";
const TemplateBuilder = () => {
  const initEditor = () => {
    var lp = "./img/";
    var plp = "https://via.placeholder.com/350x250/";
    var images = [
      lp + "team1.jpg",
      lp + "team2.jpg",
      lp + "team3.jpg",
      plp + "78c5d6/fff/image1.jpg",
      plp + "459ba8/fff/image2.jpg",
      plp + "79c267/fff/image3.jpg",
      plp + "c5d647/fff/image4.jpg",
      plp + "f28c33/fff/image5.jpg",
      plp + "e868a2/fff/image6.jpg",
      plp + "cc4360/fff/image7.jpg",
      lp + "work-desk.jpg",
      lp + "phone-app.png",
      lp + "bg-gr-v.png",
    ];

    const editor = grapesjs.init({
      container: "#editor",
      height: "700px",
      width: "100%",
      fromElement: true,
      showOffsets: true,
      assetManager: {
        embedAsBase64: true,
        assets: images,
      },
      selectorManager: { componentFirst: true },
      styleManager: {
        sectors: [
          {
            name: "General",
            properties: [
              {
                extend: "float",
                type: "radio",
                default: "none",
                options: [
                  { value: "none", className: "fa fa-times" },
                  { value: "left", className: "fa fa-align-left" },
                  { value: "right", className: "fa fa-align-right" },
                ],
              },
              "display",
              { extend: "position", type: "select" },
              "top",
              "right",
              "left",
              "bottom",
            ],
          },
          {
            name: "Dimension",
            open: false,
            properties: [
              "width",
              {
                id: "flex-width",
                type: "integer",
                name: "Width",
                units: ["px", "%"],
                property: "flex-basis",
                toRequire: 1,
              },
              "height",
              "max-width",
              "min-height",
              "margin",
              "padding",
            ],
          },
          {
            name: "Typography",
            open: false,
            properties: [
              "font-family",
              "font-size",
              "font-weight",
              "letter-spacing",
              "color",
              "line-height",
              {
                extend: "text-align",
                options: [
                  { id: "left", label: "Left", className: "fa fa-align-left" },
                  {
                    id: "center",
                    label: "Center",
                    className: "fa fa-align-center",
                  },
                  {
                    id: "right",
                    label: "Right",
                    className: "fa fa-align-right",
                  },
                  {
                    id: "justify",
                    label: "Justify",
                    className: "fa fa-align-justify",
                  },
                ],
              },
              {
                property: "text-decoration",
                type: "radio",
                default: "none",
                options: [
                  { id: "none", label: "None", className: "fa fa-times" },
                  {
                    id: "underline",
                    label: "underline",
                    className: "fa fa-underline",
                  },
                  {
                    id: "line-through",
                    label: "Line-through",
                    className: "fa fa-strikethrough",
                  },
                ],
              },
              "text-shadow",
            ],
          },
          {
            name: "Decorations",
            open: false,
            properties: [
              "opacity",
              "border-radius",
              "border",
              "box-shadow",
              "background", // { id: 'background-bg', property: 'background', type: 'bg' }
            ],
          },
          {
            name: "Extra",
            open: false,
            buildProps: ["transition", "perspective", "transform"],
          },
          {
            name: "Flex",
            open: false,
            properties: [
              {
                name: "Flex Container",
                property: "display",
                type: "select",
                defaults: "block",
                list: [
                  { value: "block", name: "Disable" },
                  { value: "flex", name: "Enable" },
                ],
              },
              {
                name: "Flex Parent",
                property: "label-parent-flex",
                type: "integer",
              },
              {
                name: "Direction",
                property: "flex-direction",
                type: "radio",
                defaults: "row",
                list: [
                  {
                    value: "row",
                    name: "Row",
                    className: "icons-flex icon-dir-row",
                    title: "Row",
                  },
                  {
                    value: "row-reverse",
                    name: "Row reverse",
                    className: "icons-flex icon-dir-row-rev",
                    title: "Row reverse",
                  },
                  {
                    value: "column",
                    name: "Column",
                    title: "Column",
                    className: "icons-flex icon-dir-col",
                  },
                  {
                    value: "column-reverse",
                    name: "Column reverse",
                    title: "Column reverse",
                    className: "icons-flex icon-dir-col-rev",
                  },
                ],
              },
              {
                name: "Justify",
                property: "justify-content",
                type: "radio",
                defaults: "flex-start",
                list: [
                  {
                    value: "flex-start",
                    className: "icons-flex icon-just-start",
                    title: "Start",
                  },
                  {
                    value: "flex-end",
                    title: "End",
                    className: "icons-flex icon-just-end",
                  },
                  {
                    value: "space-between",
                    title: "Space between",
                    className: "icons-flex icon-just-sp-bet",
                  },
                  {
                    value: "space-around",
                    title: "Space around",
                    className: "icons-flex icon-just-sp-ar",
                  },
                  {
                    value: "center",
                    title: "Center",
                    className: "icons-flex icon-just-sp-cent",
                  },
                ],
              },
              {
                name: "Align",
                property: "align-items",
                type: "radio",
                defaults: "center",
                list: [
                  {
                    value: "flex-start",
                    title: "Start",
                    className: "icons-flex icon-al-start",
                  },
                  {
                    value: "flex-end",
                    title: "End",
                    className: "icons-flex icon-al-end",
                  },
                  {
                    value: "stretch",
                    title: "Stretch",
                    className: "icons-flex icon-al-str",
                  },
                  {
                    value: "center",
                    title: "Center",
                    className: "icons-flex icon-al-center",
                  },
                ],
              },
              {
                name: "Flex Children",
                property: "label-parent-flex",
                type: "integer",
              },
              {
                name: "Order",
                property: "order",
                type: "integer",
                defaults: 0,
                min: 0,
              },
              {
                name: "Flex",
                property: "flex",
                type: "composite",
                properties: [
                  {
                    name: "Grow",
                    property: "flex-grow",
                    type: "integer",
                    defaults: 0,
                    min: 0,
                  },
                  {
                    name: "Shrink",
                    property: "flex-shrink",
                    type: "integer",
                    defaults: 0,
                    min: 0,
                  },
                  {
                    name: "Basis",
                    property: "flex-basis",
                    type: "integer",
                    units: ["px", "%", ""],
                    unit: "",
                    defaults: "auto",
                  },
                ],
              },
              {
                name: "Align",
                property: "align-self",
                type: "radio",
                defaults: "auto",
                list: [
                  {
                    value: "auto",
                    name: "Auto",
                  },
                  {
                    value: "flex-start",
                    title: "Start",
                    className: "icons-flex icon-al-start",
                  },
                  {
                    value: "flex-end",
                    title: "End",
                    className: "icons-flex icon-al-end",
                  },
                  {
                    value: "stretch",
                    title: "Stretch",
                    className: "icons-flex icon-al-str",
                  },
                  {
                    value: "center",
                    title: "Center",
                    className: "icons-flex icon-al-center",
                  },
                ],
              },
            ],
          },
        ],
      },
      plugins: [
        gjsPresetWebpage,
        gjsBlocksBasic,
        gjsForms,
        gjsExport,
        // gjsPlugin,
        gjsTable,
      ],
      pluginsOpts: {
        [gjsForms]: {
          blocks: [
            "input",
            "textarea",
            "select",
            "button",
            "label",
            "checkbox",
            "radio",
          ],
        },
        [gjsBlocksBasic]: {
          blocks: [
            "column1",
            "column2",
            "column3",
            "column3-7",
            "text",
            "link",
            "image",
          ],
        },
        [gjsPresetWebpage]: {
          blocks: ["text-basic"],
        },
        // [gjsPlugin] : {
        //   panels: [
        //    true,
        //  ],
        // },
      },
      storageManager: {
        id: "editor",
        type: "local",
        autosave: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
        contentTypeJson: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
      json_encode: {
        "gjs-html": [],
        "gjs-css": [],
      },
      deviceManager: {
        devices: [
          {
            id: "desktop",
            name: "Desktop",
            width: "",
          },
          {
            id: "tablet",
            name: "Tablet",
            width: "768px",
            widthMedia: "992px",
          },
          {
            id: "mobilePortrait",
            name: "Mobile portrait",
            width: "320px",
            widthMedia: "575px",
          },
        ],
      },
      layerManager: {
        appendTo: ".layers-container",
      },
    });

    var pn = editor.Panels;
    var modal = editor.Modal;
    var cmdm = editor.Commands;

    // Update canvas-clear command
    // cmdm.add('canvas-clear', function() {
    //   if(confirm('Are you sure to clean the canvas?')) {
    //     editor.runCommand('core:canvas-clear')
    //     setTimeout(function(){ localStorage.clear()}, 0)
    //   }
    // });

    // Add info command
    var mdlClass = "gjs-mdl-dialog-sm";
    var infoContainer = document.getElementById("info-panel");

    cmdm.add("open-info", function () {
      var mdlDialog = document.querySelector(".gjs-mdl-dialog");
      mdlDialog.className += " " + mdlClass;
      infoContainer.style.display = "block";
      modal.setTitle("About this demo");
      modal.setContent(infoContainer);
      modal.open();
      modal.getModel().once("change:open", function () {
        mdlDialog.className = mdlDialog.className.replace(mdlClass, "");
      });
    });

    pn.addButton("options", {
      id: "open-info",
      className: "fa fa-question-circle",
      command: function () {
        editor.runCommand("open-info");
      },
      attributes: {
        title: "About",
        "data-tooltip-pos": "bottom",
      },
    });

    // Simple warn notifier
    // var origWarn = console.warn;
    // toastr.options = {
    //   closeButton: true,
    //   preventDuplicates: true,
    //   showDuration: 250,
    //   hideDuration: 150
    // };
    // console.warn = function (msg) {
    //   if (msg.indexOf('[undefined]') == -1) {
    //     toastr.warning(msg);
    //   }
    //   origWarn(msg);
    // };

    // Add and beautify tooltips
    [
      ["sw-visibility", "Show Borders"],
      ["preview", "Preview"],
      ["fullscreen", "Fullscreen"],
      ["export-template", "Export"],
      ["undo", "Undo"],
      ["redo", "Redo"],
      ["gjs-open-import-webpage", "Import"],
      ["canvas-clear", "Clear canvas"],
    ].forEach(function (item) {
      pn.getButton("options", item[0]).set("attributes", {
        title: item[1],
        "data-tooltip-pos": "bottom",
      });
    });
    [
      ["open-sm", "Style Manager"],
      ["open-layers", "Layers"],
      ["open-blocks", "Blocks"],
    ].forEach(function (item) {
      pn.getButton("views", item[0]).set("attributes", {
        title: item[1],
        "data-tooltip-pos": "bottom",
      });
    });
    var titles = document.querySelectorAll("*[title]");

    for (var i = 0; i < titles.length; i++) {
      var el = titles[i];
      var title = el.getAttribute("title");
      title = title ? title.trim() : "";
      if (!title) break;
      el.setAttribute("data-tooltip", title);
      el.setAttribute("title", "");
    }

    //  editor.Panels.addButton
    //       ('options',
    //         [{
    //           id: 'save-db',
    //           className: 'fa fa-floppy-o',
    //           command: 'save-db',
    //           attributes: {title: 'Save DB'}
    //         }]
    // );
    editor.Commands.add("save-db", {
      run: function (editor, sender) {
        sender && sender.set("active"); // turn off the button
        editor.store(); // extract data
      },
    });
    // to load data inital
    editor.on("storage:load", function (e) {
      console.log("Loaded ", e);
    });
    editor.on("storage:store", function (e) {
      console.log("Stored ", e);
    });
  };

  useEffect(() => {
    initEditor();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div id="editor"></div>
    </>
  );
};

export default TemplateBuilder;
