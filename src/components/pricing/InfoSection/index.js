import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { BsChevronDoubleRight, BsChevronRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../common/TextInput";
import styles from "./styles.module.scss";

import { ShowAlert } from "../../../store/actions/alertActions";
import { useEffect } from "react";
import { REGEX } from "../../../customHooks/utils";
import { addPrice } from "../../../store/actions/pricingActions";

const InfoSection = ({
  setOpen,
  setOpen2,
  values,
  setValues,
  setTotalPrice,
  totalPrice,
}) => {
  const pricing = useSelector((state) => state?.pricing);
  const dispatch = useDispatch();
  const [clickButton, setClickButton] = useState("");
  // const [values, setValues] = useState({});
  let totalScore = Object.values(values)?.map((e) =>
    e?.price !== "0.00"
      ? Number(e?.count) * Number(e?.price)
      : e?.price === undefined
      ? Number(e?.count)
      : Number(e?.count)
  );
  let total = totalScore?.length > 0 && totalScore?.reduce((e, i) => e + i);

  useEffect(() => {
    setTotalPrice(Number(total));
  }, [totalScore]);
  let validateArray = [];
  const validate = pricing?.paymentList?.results?.map((e, i) =>
    ["question", "cost"].includes(e?.type) ? validateArray?.push(i) : null
  );

  useEffect(() => {
    dispatch(addPrice(Number(totalPrice)));
  }, [totalPrice]);

  const validation = () => {
    let newError = {};
    for (let key in validateArray) {
      const value = values[key];

      if (!value || value?.count?.trim() === "") {
        return (newError = "Please Add The Data");
      }
    }
    return newError;
  };

  const handleChange = (e, item, i, el) => {
    const { value, name } = e?.target;
    let cal_id = [];
    let array = item?.filter((e) => {
      if (e?.range === null) {
        // return cal_id.push(item[0]);
        return cal_id.push(e);
      } else if (Number(e?.range) > Number(value)) {
        return cal_id.push(e);
      } else {
        // return cal_id.push(item[0]);
      }
    });

    setValues({
      ...values,
      [name]: {
        ...values[name],
        count: value,
        cost_calculator_id:
          cal_id.slice(0, 1)?.pop()?.cost_calculator_id === undefined
            ? 0
            : cal_id.slice(0, 1)?.pop()?.cost_calculator_id,
        name: el?.name,
        title: el?.title,
        price:
          name === "3"
            ? Number(value) <= 10
              ? 0
              : cal_id.slice(0, 1)?.pop()?.price === undefined
              ? 1
              : cal_id.slice(0, 1)?.pop()?.price
            : cal_id.slice(0, 1)?.pop()?.price === undefined
            ? 1
            : cal_id.slice(0, 1)?.pop()?.price,
      },
    });
  };
  const yesButton = (i, item, el) => {
    let cal_id = [];
    let array = item?.filter((e) => {
      if (e?.range === null) {
        // return cal_id.push(item[0]);
        return cal_id.push(e);
      } else if (Number(e?.range) > Number(values[i]?.count)) {
        return cal_id.push(e);
      } else {
        // return cal_id.push(item[0]);
      }
    });

    setValues({
      ...values,
      [i]: {
        count: i === 2 ? "40" : "00",
        no: false,
        yes: true,
        cost_calculator_id:
          cal_id.slice(0, 1)?.pop()?.cost_calculator_id === undefined
            ? 0
            : cal_id.slice(0, 1)?.pop()?.cost_calculator_id,
        name: el?.name,
        title: el?.title,
        price:
          cal_id.slice(0, 1)?.pop()?.price === undefined
            ? 1
            : cal_id.slice(0, 1)?.pop()?.price,
      },
    });
  };
  const noButton = (i, item, el) => {
    let cal_id = [];
    let array = item?.filter((e) => {
      if (e?.range === null) {
        // return cal_id.push(item[0]);
        return cal_id.push(e);
      } else if (Number(e?.range) > Number(values[i]?.count)) {
        return cal_id.push(e);
      } else {
        // return cal_id.push(item[0]);
      }
    });

    setValues({
      ...values,
      [i]: {
        count: "0",
        no: true,
        yes: false,
        cost_calculator_id:
          cal_id.slice(0, 1)?.pop()?.cost_calculator_id === undefined
            ? 0
            : cal_id.slice(0, 1)?.pop()?.cost_calculator_id,
        name: el?.name,
        title: el?.title,
        price:
          cal_id.slice(0, 1)?.pop()?.price === undefined
            ? 1
            : cal_id.slice(0, 1)?.pop()?.price,
      },
    });
  };

  const checkOut = () => {
    // const validateData = validation();
    // if (Object.keys(validateData).length > 0) {
    //   console.log(validateData);
    //   return dispatch(ShowAlert("Please fill all  fields", "error"));
    // }
    if (values["2"]?.yes === true && Number(values["2"]?.count) < 40) {
      return dispatch(ShowAlert("Your values is less then 40", "error"));
    }
    setOpen(false);
  };
  const [price, setPrice] = useState("10.50");
  console.log(values);
  return (
    <Box className={styles.gridParrent}>
      {/* <PaymentElement /> */}
      <Box className={styles.content}>
        <Box className={styles.contentBox}>
          <Box className={styles.left}>
            <Box className={styles.heading}>Pricing</Box>
          </Box>
          <Box className={styles.right}>
            <Box className={styles.heading}></Box>
          </Box>
        </Box>

        {pricing?.paymentList?.results?.map((e, i) => [
          ["question", "cost"].includes(e?.type) && (
            <Box className={styles.contentBox} key={i}>
              <Box className={`${styles.left} ${styles.left2}`}>
                <Typography component="span">{e?.name}</Typography>
                {e?.cost_range?.map(
                  (el) =>
                    el?.name !== null && (
                      <Typography className={styles?.idName}>
                        {el?.name}
                      </Typography>
                    )
                )}
              </Box>

              <Box className={styles.right}>
                {e?.type === "question" ? (
                  <Box className={styles.buttonSection}>
                    <Box className={`button-primary  ${styles.button}`}>
                      <Button
                        className="secondary-btn"
                        name={i}
                        style={{
                          backgroundColor:
                            values[i]?.no === false && values[i]?.yes === true
                              ? "#00CFC5"
                              : "",
                          color:
                            values[i]?.no === false && values[i]?.yes === true
                              ? "white"
                              : "",
                        }}
                        onClick={(el) => {
                          yesButton(i, e.cost_range, e);
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        className="secondary-btn"
                        name={i}
                        style={{
                          backgroundColor:
                            values[i]?.no === true && values[i]?.yes === false
                              ? "#00CFC5"
                              : "",
                          color:
                            values[i]?.no === true && values[i]?.yes === false
                              ? "white"
                              : "",
                        }}
                        onClick={(el) => {
                          noButton(i, e.cost_range, e);
                        }}
                      >
                        No
                      </Button>
                    </Box>
                    <Box sx={{}}>
                      {e?.qoute === "aa6" &&
                        values[i]?.no === false &&
                        values[i]?.yes === true && (
                          <TextInput
                            name={i}
                            type={"number"}
                            min="40"
                            onKeyPress={(e) => {
                              if (
                                e.code === "Minus" ||
                                e.code === "NumpadSubtract" ||
                                e.code === "Comma" ||
                                e.code === "NumpadAdd" ||
                                e.code === "Period" ||
                                e.key === "e" ||
                                e.key === "E"
                              ) {
                                e.preventDefault();
                              }
                            }}
                            value={values[i]?.count || ""}
                            onChange={(el) =>
                              handleChange(el, e?.cost_range, i, e)
                            }
                            customClass={`${styles.inputBox} ${styles.inputBox22}`}
                          />
                        )}
                    </Box>
                  </Box>
                ) : e?.type === "cost" ? (
                  <TextInput
                    name={i}
                    type={"number"}
                    min="0"
                    max="99"
                    onKeyPress={(e) => {
                      if (
                        e.code === "Minus" ||
                        e.code === "NumpadSubtract" ||
                        e.code === "Comma" ||
                        e.code === "NumpadAdd" ||
                        e.code === "Period" ||
                        e.key === "e" ||
                        e.key === "E" ||
                        values[i]?.count?.length > 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    value={values[i]?.count || ""}
                    onChange={(el) => handleChange(el, e?.cost_range, i, e)}
                    customClass={styles.inputBox}
                  />
                ) : (
                  ""
                )}

                {/* <Typography component="span">
                  {e?.id[0]?.range && (
                    <>
                      $
                      {values[i]?.count <= 20
                        ? "10.50"
                        : values[i]?.count > 20 && values[i]?.count <= 30
                        ? "9.00"
                        : values[i]?.count > 30
                        ? "8.00"
                        : "10.50"}{" "}
                      Exc of GST
                    </>
                  )}
                </Typography> */}
              </Box>
            </Box>
          ),
        ])}

        {/* <Box className={styles.contentBox}>
          <Box className={styles.left}>
            <Typography component="span">
              How many candidates would you like to invite in a month?
            </Typography>
          </Box>
          <Box className={styles.right}>
            <TextInput
              name="input1"
              type={"number"}
onKeyPress={(e) => {
            if (type === "number") {
              if (
                e.code === "Minus" ||
                e.code === "NumpadSubtract" ||
                e.code === "Comma" ||
                e.code === "NumpadAdd" ||
                e.code === "Period" ||
                e.key === "e" ||
                e.key === "E" ||
                !REGEX.test(e.key)
              ) {
                e.preventDefault();
              }
            }
          }}
              customClass={styles.inputBox}
            />
            <Typography component="span">$93.00 Exc of GST</Typography>
          </Box>
        </Box>
        <Box className={styles.contentBox}>
          <Box className={styles.left}>
            <Typography component="span">
              How many application forms you want to send?
            </Typography>
          </Box>
          <Box className={styles.right}>
            <TextInput
              name="input1"
              type={"number"}
onKeyPress={(e) => {
            if (type === "number") {
              if (
                e.code === "Minus" ||
                e.code === "NumpadSubtract" ||
                e.code === "Comma" ||
                e.code === "NumpadAdd" ||
                e.code === "Period" ||
                e.key === "e" ||
                e.key === "E" ||
                !REGEX.test(e.key)
              ) {
                e.preventDefault();
              }
            }
          }}
              customClass={styles.inputBox}
            />
            <Typography component="span">$93.00 Exc of GST</Typography>
          </Box>
        </Box>
        <Box className={styles.contentBox}>
          <Box className={styles.left}>
            <Typography component="span">
              How many reference checks do you want to conduct?
            </Typography>
          </Box>
          <Box className={styles.right}>
            <TextInput
              name="input1"
              type={"number"}
onKeyPress={(e) => {
            if (type === "number") {
              if (
                e.code === "Minus" ||
                e.code === "NumpadSubtract" ||
                e.code === "Comma" ||
                e.code === "NumpadAdd" ||
                e.code === "Period" ||
                e.key === "e" ||
                e.key === "E" ||
                !REGEX.test(e.key)
              ) {
                e.preventDefault();
              }
            }
          }}
              customClass={styles.inputBox}
            />
            <Typography component="span">$93.00 Exc of GST</Typography>
          </Box>
        </Box>
        <Box className={styles.contentBox}>
          <Box className={styles.left}>
            <Typography component="span">
              How many offer letters you want to send?
            </Typography>
          </Box>
          <Box className={styles.right}>
            <TextInput
              name="input1"
              type={"number"}
onKeyPress={(e) => {
            if (type === "number") {
              if (
                e.code === "Minus" ||
                e.code === "NumpadSubtract" ||
                e.code === "Comma" ||
                e.code === "NumpadAdd" ||
                e.code === "Period" ||
                e.key === "e" ||
                e.key === "E" ||
                !REGEX.test(e.key)
              ) {
                e.preventDefault();
              }
            }
          }}
              customClass={styles.inputBox}
            />
            <Typography component="span">$93.00 Exc of GST</Typography>
          </Box>
        </Box>
        <Box className={styles.contentBox}>
          <Box className={styles.left}>
            <Typography component="span">
              Will you be creating electronic forms?
            </Typography>
          </Box>
          <Box className={styles.right}>
            <Box className={styles.buttonSection}>
              <Box className={`button-primary  ${styles.button}`}>
                <Button className="secondary-btn">Yes </Button>
                <Button className="secondary-btn">No </Button>
              </Box>
            </Box>
            <Typography component="span">$93.00 Exc of GST</Typography>
          </Box>
        </Box>
        <Box className={styles.contentBox}>
          <Box className={styles.left}>
            <Typography component="span">
              Would you like to send forms electronically?
            </Typography>
          </Box>
          <Box className={styles.right}>
           
            <Typography component="span">$93.00 Exc of GST</Typography>
          </Box>
        </Box>
        <Box className={styles.contentBox}>
          <Box className={styles.left}>
            <Typography component="span">
              Would you like to enable text notification?
            </Typography>
          </Box>
          <Box className={styles.right}>
            <Box className={styles.buttonSection}>
              <Box className={`button-primary  ${styles.button}`}>
                <Button className="secondary-btn">Yes </Button>
                <Button className="secondary-btn">No </Button>
              </Box>
            </Box>
            <Typography component="span">$93.00 Exc of GST</Typography>
          </Box>
        </Box>
        <Box className={styles.contentBox}>
          <Box className={styles.left}>
            <Typography component="span">
              How many employees will be using Worecs?
            </Typography>
          </Box>
          <Box className={styles.right}>
            <TextInput
              name="input1"
              type={"number"}
onKeyPress={(e) => {
            if (type === "number") {
              if (
                e.code === "Minus" ||
                e.code === "NumpadSubtract" ||
                e.code === "Comma" ||
                e.code === "NumpadAdd" ||
                e.code === "Period" ||
                e.key === "e" ||
                e.key === "E" ||
                !REGEX.test(e.key)
              ) {
                e.preventDefault();
              }
            }
          }}
              customClass={styles.inputBox}
            />
            <Typography component="span">$93.00 Exc of GST</Typography>
          </Box>
        </Box> */}

        <Box className={styles.contentBox}>
          <Box className={styles.left}></Box>
          <Box className={styles.right} sx={{ marginTop: "20px" }}>
            {/* <TextInput
              name="input1"
              type={"number"}
onKeyPress={(e) => {
            if (type === "number") {
              if (
                e.code === "Minus" ||
                e.code === "NumpadSubtract" ||
                e.code === "Comma" ||
                e.code === "NumpadAdd" ||
                e.code === "Period" ||
                e.key === "e" ||
                e.key === "E" ||
                !REGEX.test(e.key)
              ) {
                e.preventDefault();
              }
            }
          }}
              customClass={styles.inputBox}
            /> */}
            <Box className={`button-primary ${styles.button}`}>
              <Button onClick={checkOut}>Add to cart </Button>
            </Box>
            <Typography>${pricing?.price.toFixed(2)}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InfoSection;
