import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import image from "../../../assets/pricing/check.png";
import TextInput from "../../common/TextInput";
import CustomSelect from "../../common/Select";
import t1 from "../../../assets/pricing/1.png";
import t2 from "../../../assets/pricing/2.png";
import t3 from "../../../assets/pricing/3.png";
import t4 from "../../../assets/pricing/4.png";
import t5 from "../../../assets/pricing/5.png";
import t6 from "../../../assets/pricing/6.png";
import t7 from "../../../assets/pricing/7.png";
import CustomModel from "../model";
import CostPopup from "../InfoSection";
import { useState } from "react";
import Subs from "../subscription";
import CouponCode from "../reffernce-add";
import CheckoutForm from "../checkout/checkout";
import BillingForm from "../billing/checkout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ShowAlert } from "../../../store/actions/alertActions";
import useWindowDimensions from "../../../customHooks/useWindowDimensions";
import { REGEX } from "../../../customHooks/utils";
import { addPrice, resetPricing } from "../../../store/actions/pricingActions";

const Main = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const { width } = useWindowDimensions();
  const mobile = width <= 992;
  const [sub, setSub] = useState(false);
  const [cart, setCart] = useState({});
  const [license, setLicense] = useState([]);
  const [licenseValue, setLicenseValue] = useState({});
  const [totalPrice, setTotalPrice] = useState("");
  const subscription = useSelector((state) => state?.pricing?.subscription);
  const [totalPriceLic, setTotalPric] = useState("");

  const [billing, setBilling] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const pricing = useSelector((state) => state?.pricing);
  const auth = useSelector((state) => state?.auth);
  const DISCOUNT_PRICE = (
    pricing?.price -
    (pricing?.couponCode?.results?.discount / 100) * pricing?.price
  ).toFixed(2);
  // const DISCOUNT_PRICE = (
  //   pricing?.price - pricing?.couponCode?.results?.discount
  // ).toFixed(2);
  const [radio, setRadio] = useState({});

  const purchaseItem = [licenseValue, cart, radio];

  let totalScore = Object.values(cart)?.map((e) =>
    e?.price !== "0.00" ? Number(e?.count) * Number(e?.price) : Number(e?.count)
  );
  useEffect(() => {
    dispatch(
      addPrice(Number(totalPrice + totalPriceLic + (radio?.price || 0)))
    );
  }, [totalPrice, totalPriceLic, radio?.price]);

  let total = totalScore?.length > 0 && totalScore?.reduce((e, i) => e + i);

  let validateArray = [];
  const validate = pricing?.paymentList?.results?.map((e, i) =>
    ["question", "cost", "additional"].includes(e?.type)
      ? validateArray?.push(i)
      : null
  );
  const validation = () => {
    let newError = {};
    for (let key in validateArray) {
      const value = cart[key];
      // console.log(value);
      if (!value || value?.count?.trim() === "") {
        return (newError = "Please Add The Data");
      }
    }
    return newError;
  };

  const validationL = () => {
    let newError = {};

    for (let key in license) {
      const value = licenseValue[license[key]?.index];
      if (!value || value?.count?.trim() === "") {
        // console.log(value);
        return (newError = "Please Add The Data");
      }
    }
    return newError;
  };
  useEffect(() => {
    let totalScorelience = Object.values(licenseValue)?.map((e) =>
      e?.price !== "0.00"
        ? Number(e?.count) * Number(e?.price)
        : Number(e?.count)
    );
    let totalLience =
      totalScorelience?.length > 0 && totalScorelience?.reduce((e, i) => e + i);
    setTotalPric(totalLience);
    // dispatch(addPrice(totalLience));
  }, [license, licenseValue]);
  useEffect(() => {
    setTotalPrice(total);
    // dispatch(addPrice(total));
  }, [totalScore]);

  const data = [
    {
      name: "Electronic Signature",
      icon: t1,
    },
    {
      name: "Online Reference Checks",
      icon: t2,
    },
    {
      name: "Electronic  Forms",
      icon: t3,
    },
    {
      name: "License Checks",
      icon: t4,
    },
    {
      name: "Team Collaboration",
      icon: t5,
    },
    {
      name: "File Sharing",
      icon: t6,
    },
    {
      name: "Privacy Insured",
      icon: t7,
    },
  ];
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: process.env.REACT_APP_STRIPE_SECRET_KEY,
  // };

  const handleChange = (e, item, i, el) => {
    const { value, name, type } = e?.target;
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

    if (type === "checkbox") {
      return setCart({
        ...cart,
        [name]: {
          ...cart[i],
          checkbox: e?.target.checked ? true : null,
          count: "0",
          name: el?.name,
          title: el?.title,
          price:
            cal_id.slice(0, 1)?.pop()?.price === undefined
              ? 1
              : cal_id.slice(0, 1)?.pop()?.price,
        },
      });
    }
    setCart({
      ...cart,
      [name]: {
        ...cart[i],
        count: value,
        name: el?.name,
        cost_calculator_id:
          cal_id.slice(0, 1)?.pop()?.cost_calculator_id === undefined
            ? 0
            : cal_id.slice(0, 1)?.pop()?.cost_calculator_id,
        price:
          cal_id.slice(0, 1)?.pop()?.price === undefined
            ? 1
            : cal_id.slice(0, 1)?.pop()?.price,
      },
    });
  };

  const handleChangeLicence = (e, item, i, array) => {
    const { value, name, type } = e?.target;
    if (type === "checkbox") {
      return setLicenseValue({
        ...licenseValue,
        [name]: {
          ...licenseValue[array],
          checkbox: e?.target.checked ? true : null,
          name: item?.name,
          title: item?.title,
          count: "0",
          index: array,
        },
      });
    }
    setLicenseValue({
      ...licenseValue,
      [name]: {
        ...licenseValue[array],
        count: value,
        name: item?.name,
        title: item?.title,
        price: item?.price,
        license_id: item?.id,
        index: array,
      },
    });
  };

  const openCheckout = () => {
    const validateData = validation();
    const validateData2 = validationL();
    // if (Object.keys(validateData).length > 0) {
    //   return dispatch(ShowAlert("Please fill all  fields", "error"));
    // }

    // if (Object.keys(validateData2).length > 0) {
    //   return dispatch(ShowAlert("Please fill all  fields", "error"));
    // }
    if (Object.keys(cart)?.length === 0 && Object.keys(radio)?.length === 0) {
      return dispatch(ShowAlert("Please fill one field", "error"));
    }
    dispatch(
      ShowAlert(
        "You have items in your cart, please proceed with checkout. ",
        "error"
      )
    );
    setOpen5(true);
  };

  // const options = pricing?.industry?.results?.map((e, i) => ({
  //   value: e?.id,
  //   label: e?.name,
  //   price: e?.price,
  //   data: e,
  //   index: i,
  // }));
  const options = pricing?.industry?.results?.map((e, i) => ({
    label: e?.name,
    options: e?.license?.map((el, i) => ({
      value: el?.id,
      label: el?.name,
      price: el?.price,
      title: el?.title,
      data: el,
      index: i,
    })),
  }));

  return (
    <Box className={styles.priceBox}>
      <CustomModel
        open={open}
        setOpen={setOpen}
        price={true}
        setTotalPrice={setTotalPrice}
        cart={cart}
        setCart={setCart}
        feature={true}
      >
        <CostPopup
          open={open}
          setOpen={setOpen}
          setOpen2={setOpen2}
          values={cart}
          setValues={setCart}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      </CustomModel>
      <CustomModel
        open={open2}
        setOpen={setOpen2}
        cart={cart}
        setCart={setCart}
        feature={true}
      >
        <CheckoutForm
          open={open2}
          setOpen={setOpen2}
          cart={cart}
          sub={sub}
          setCart={setCart}
          licenseValue={licenseValue}
          setLicenseValue={setLicenseValue}
          setLicense={setLicense}
          radio={radio}
          setRadio={setRadio}
          billing={billing}
          setBilling={setBilling}
        />
      </CustomModel>
      <CustomModel open={open5} setOpen={setOpen5}>
        <BillingForm
          open={open5}
          open2={open2}
          setOpen={setOpen5}
          setOpen2={setOpen2}
          billing={billing}
          setBilling={setBilling}
        />
      </CustomModel>

      <Grid container spacing={2}>
        <Grid item sx={12} lg={8}>
          <Box className={styles.header}>
            <Typography variant="h4">Pricing</Typography>
          </Box>
          <Box className={styles.desc}>
            <Typography component="h5">Pricing Calculator</Typography>
            <Typography>
              Now you can estimate the exact cost required for all your HR
              requirements. <br />
              Click below to estimate your cost now.
            </Typography>
          </Box>
          <Box className={styles.buttonSection}>
            <Box className={`button-primary ${styles.button}`}>
              <Button
                onClick={() => {
                  if (sub) {
                    setCart({});
                  }
                  setOpen(true);
                }}
              >
                Select features
              </Button>{" "}
            </Box>
            <Typography>
              Note: The estimated cost will be treated as final cost at check
              out. Recruiter will have freedom to end the contract at their
              discretion.
            </Typography>
            <Typography component={"h5"}>No lock in contracts.</Typography>
          </Box>
          <Box className={styles.content}>
            <Box className={styles.contentBox}>
              <Box className={styles.left}>
                <Box className={styles.heading}>Additional Options</Box>
              </Box>
              <Box
                className={styles.right}
                sx={{
                  "@media(max-width:600px)": {
                    display: "none",
                  },
                }}
              >
                <Box className={styles.heading}></Box>
              </Box>{" "}
            </Box>
            {auth?.results?.subscription_status !== 1 && (
              <>
                <Box className={styles.contentBox}>
                  <Box className={styles.left} style={{ flex: "0 0 60%" }}>
                    <span>E-Worecs (Electronic Document Processing)</span>
                  </Box>
                  <Box
                    className={styles.right}
                    style={{
                      display: "none",
                    }}
                  >
                    <Box className={styles.heading}></Box>
                  </Box>{" "}
                </Box>

                <Box className={styles.contentBox} sx={{ marginTop: "5px" }}>
                  <Box className={styles.left} style={{ flex: "0 0 100%" }}>
                    <Box className={styles.withSelect}>
                      <Box className={styles.radiobox}>
                        {/* <label className={styles.cont2}>
                  Without subscription
                  <input
                    name={"subscription"}
                    value={radio}
                    onChange={(e) => setRadio({})}
                    // value={license}
                    id={"15"}
                    // onChange={(el) => handleChange(el, e?.id, i)}
                    type="radio"
                  />
                  <span className={styles.checkmark2}></span>
                </label> */}
                        <label className={styles.cont2}>
                          1 month
                          <input
                            name={"subscription"}
                            value={radio}
                            onChange={(e) =>
                              setRadio({
                                interval_count: 1,
                                product: "prod_MYziSEI4fqv3Zs",
                                price: 15,
                                name: "1 month",
                              })
                            }
                            // value={license}
                            id={"15"}
                            // onChange={(el) => handleChange(el, e?.id, i)}
                            type="radio"
                          />
                          <span className={styles.checkmark2}></span>
                        </label>
                        <label className={styles.cont2}>
                          6 months
                          <input
                            name={"subscription"}
                            value={radio}
                            onChange={(e) =>
                              setRadio({
                                interval_count: 6,
                                product: "prod_MYztMRXQzcgMFk",
                                price: 75,
                                name: "6 months",
                              })
                            }
                            // value={license}
                            id={"75"}
                            // onChange={(el) => handleChange(el, e?.id, i)}
                            type="radio"
                          />
                          <span className={styles.checkmark2}></span>
                        </label>
                        <label className={styles.cont2}>
                          12 months
                          <input
                            name={"subscription"}
                            value={radio}
                            onChange={(e) =>
                              setRadio({
                                interval_count: 12,
                                product: "prod_MYzgCw91827LU5",
                                price: 150,
                                name: "12 months",
                              })
                            }
                            // value={license}
                            // onChange={(el) => handleChange(el, e?.id, i)}
                            id={"150"}
                            type="radio"
                          />
                          <span className={styles.checkmark2}></span>
                        </label>
                      </Box>
                    </Box>
                    <Box className={styles.selectParent}></Box>
                  </Box>
                </Box>
              </>
            )}

            {pricing?.paymentList?.results?.map(
              (e, i) =>
                ["additional"].includes(e?.type) && (
                  <Box className={styles.contentBox} key={i}>
                    <Box className={styles.left}>
                      <Box className={styles.checkbox}>
                        <label className={styles.cont}>
                          {e?.name}
                          <input
                            name={i}
                            value={cart[i]?.checkbox || ""}
                            checked={cart[i]?.checkbox || ""}
                            onChange={(el) =>
                              handleChange(el, e?.cost_range, i, e)
                            }
                            type="checkbox"
                          />
                          <span className={styles.checkmark}></span>
                        </label>
                      </Box>
                    </Box>
                    <Box className={styles.right}>
                      {cart[i]?.checkbox && (
                        <>
                          {" "}
                          <TextInput
                            // name="input1"
                            type={"number"}
                            min="0"
                            onKeyPress={(e) => {
                              if (
                                e.code === "Minus" ||
                                e.code === "NumpadSubtract" ||
                                e.code === "Comma" ||
                                e.code === "NumpadAdd" ||
                                e.code === "Period" ||
                                e.key === "e" ||
                                e.key === "E" ||
                                cart[i]?.count?.length > 1
                              ) {
                                e.preventDefault();
                              }
                            }}
                            name={i}
                            value={cart[i]?.count || ""}
                            onChange={(el) =>
                              handleChange(el, e?.cost_range, i, e)
                            }
                            customClass={styles.inputBox}
                          />
                          {/* <Typography component="span">
                            $00.00 Exc of GST
                          </Typography> */}
                        </>
                      )}
                    </Box>
                  </Box>
                )
            )}

            {/* <Box className={styles.contentBox}>
          <Box className={styles.left}>
            <Box className={styles.checkbox}>
              <img src={image} alt="check" />
            </Box>
            <Typography component="span">
              Drivers license verification
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
            {/* <Box className={styles.contentBox}>
          <Box className={styles.left}>
            <Box className={styles.checkbox}>
          
            </Box>
            <Typography component="span">
              E-Worecs (electronic signatures)
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
              <Box className={styles.left} style={{ flex: "0 0 100%" }}>
                <Box className={styles.withSelect}>
                  <label className={styles.cont}>
                    License check
                    <input
                      name={"license"}
                      // value={license}
                      // onChange={(el) => handleChange(el, e?.id, i)}
                      type="checkbox"
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                </Box>
                <Box className={styles.selectParent}>
                  <CustomSelect
                    options={options}
                    isMulti={true}
                    name={"license"}
                    onChange={(e, action) => {
                      if (action.action === "remove-value") {
                        delete licenseValue[`${action.removedValue.index}`];

                        setLicenseValue(licenseValue);
                      }
                      setLicense(e);
                    }}
                    value={license}
                    customClass={`${styles.selectChild} pricingSelect`}
                  />
                </Box>
              </Box>
            </Box>
            {license?.length > 0 &&
              license?.map((e, i) => (
                <Box className={styles.contentBox} key={i}>
                  <Box className={styles.left}>
                    <Box className={styles.checkbox}>
                      <label className={styles.cont}>{e?.label}</label>
                    </Box>
                  </Box>
                  <Box className={styles.right}>
                    <>
                      {" "}
                      <TextInput
                        // name="input1"
                        type={"number"}
                        min="0"
                        onKeyPress={(el) => {
                          if (
                            el.code === "Minus" ||
                            el.code === "NumpadSubtract" ||
                            el.code === "Comma" ||
                            el.code === "NumpadAdd" ||
                            el.code === "Period" ||
                            el.key === "e" ||
                            el.key === "E" ||
                            licenseValue[`${e?.index}`]?.count?.length > 1
                          ) {
                            el.preventDefault();
                          }
                        }}
                        name={`${e?.index}`}
                        value={licenseValue[`${e?.index}`]?.count || ""}
                        onChange={(el) =>
                          handleChangeLicence(el, e?.data, i, `${e?.index}`)
                        }
                        customClass={styles.inputBox}
                      />
                      <Typography component="span">
                        $00.00 Exc of GST
                      </Typography>
                    </>
                  </Box>
                </Box>
              ))}

            <Box className={styles.contentBox}>
              <Box className={styles.left}>
                {/* <Box
                  className={`button-primary ${styles.button} ${styles.button2}`}
                >
                  <Button
                    onClick={() => {
                      dispatch(resetPricing());
                      setOpen4(true);
                    }}
                  >
                    Coupon Code{" "}
                  </Button>
                </Box> */}
              </Box>
            </Box>

            {/* <Box className={styles.contentBox}>
              <Box className={styles.left}>
                <Box className={`button-primary ${styles.button}`}>
                  <Button onClick={openCheckout}>Pay Now </Button>
                  {mobile && <span>${pricing?.price.toFixed(2)}</span>}
                </Box>
              </Box>
              {!mobile && (
                <Box className={styles.right}>
                  <Typography>${pricing?.price.toFixed(2)}</Typography>
                </Box>
              )}
            </Box> */}

            {/* <Box className={styles.contentBox}>
          <Typography
            component={"span"}
            onClick={() => {
              setCart({});
              setOpen3(true);
            }}
          >
            Click for Subscription
          </Typography>
        </Box> */}
          </Box>
        </Grid>
        <Grid item sx={12} lg={4}>
          <Box className={styles.sellBox}>
            <Box className={styles.box1}>
              <Typography component={"h5"}>Subtotal:</Typography>
              <Typography component={"h5"}>
                ${pricing?.price.toFixed(2)}
              </Typography>
            </Box>
            <Box className={styles.box1}>
              <Typography component={"h5"}>Billing Details</Typography>
              <Typography component={"h6"}>Calculated at next step</Typography>
            </Box>
            <Box className={styles?.box1}>
              <Box className={styles.heading}>
                <Box className={styles.headbox}>
                  <Box className={styles.headbox1}>Item</Box>
                  <Box className={styles.headbox2}>Qty</Box>
                  <Box className={styles.headbox2}>Price</Box>
                </Box>
                <Box className={styles.headbox}>
                  <>
                    <Box className={styles.headbox3}>
                      {purchaseItem[2]?.name}
                    </Box>
                    <Box className={styles.headbox4}></Box>
                    <Box className={styles.headbox4}>
                      {purchaseItem[2]?.price}
                    </Box>
                  </>
                </Box>

                {Object.entries(purchaseItem[1])?.map(
                  ([key, e], i) =>
                    Number(e?.count) > 0 && (
                      <Box className={styles.headbox} key={i}>
                        <React.Fragment>
                          <Box className={styles.headbox3}>
                            {e?.title || e?.name}
                          </Box>
                          <Box className={styles.headbox4}>{e?.count}</Box>
                          <Box className={styles.headbox4}>{e?.price}</Box>
                        </React.Fragment>
                      </Box>
                    )
                )}

                {Object.entries(purchaseItem[0])?.map(
                  ([key, e], i) =>
                    Number(e?.count) > 0 && (
                      <Box className={styles.headbox} key={i}>
                        <React.Fragment>
                          <Box className={styles.headbox3}>
                            {" "}
                            {e?.title || e?.name}
                          </Box>
                          <Box className={styles.headbox4}>{e?.count}</Box>
                          <Box className={styles.headbox4}>{e?.price}</Box>
                        </React.Fragment>
                      </Box>
                    )
                )}
              </Box>
              {/* {Object.entries(purchaseItem[0])?.map(([key, e], i) => e?.name)}
              {Object.entries(purchaseItem[1])?.map(([key, e], i) => e?.name)}
              {purchaseItem[2]?.name} */}
            </Box>
            <Box className={styles.box1}>
              <Box style={{ width: "100%" }}>
                <Typography component={"h5"} style={{ marginBottom: "20px" }}>
                  Coupon Code:
                </Typography>
                <CouponCode />
              </Box>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box className={styles.box1}>
              <Typography component={"h5"}>All Your Discounts: </Typography>
              <Typography component={"h6"} style={{ color: "#00CFC5" }}>
                {pricing?.couponCode?.results?.discount || "00"} %
              </Typography>
            </Box>
            <Box className={styles.box1}>
              <Typography component={"h5"}>Grand total:</Typography>
              <Typography component={"h6"}>
                {pricing?.couponCode?.results?.discount
                  ? `$ ${DISCOUNT_PRICE}`
                  : ` $ ${pricing?.price.toFixed(2)}`}
              </Typography>
            </Box>
            <Box className={`button-primary ${styles.butonsell}`}>
              <Button onClick={openCheckout}>Pay Now </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <hr style={{ margin: "50px 0" }} />
      <Box className={styles.featured}>
        <Box className={styles.header}>
          <Typography variant="h4">Features</Typography>
        </Box>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {data?.map((e, i) => (
            <Grid item md={6} xs={12} lg={3} key={i}>
              <Box className={styles.card}>
                <img src={e?.icon} alt={e?.name} />
                <Typography component={"h5"}>{e?.name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Main;
