import React, { useEffect, useState, useCallback } from "react";

const MyOrder = () => {
  const [orderData, setOrderData] = useState({});
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchMyOrder = useCallback(async () => {
    await fetch(`${BASE_URL}/api/myorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      setOrderData(response);
    });
  }, [BASE_URL]);

  useEffect(() => {
    fetchMyOrder();
  }, [fetchMyOrder]);

  return (
    <>
      <div className="container">
        <div className="row">
          {Object.keys(orderData).length !== 0
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <div key={arrayData._id}>
                              {arrayData.Order_date ? (
                                <div className="m-auto mt-5">
                                  <div>{arrayData.Order_date}</div>
                                  <hr />
                                </div>
                              ) : (
                                <div className="col-12 col-md-6 col-lg-3">
                                  <div
                                    className="card mt-3"
                                    style={{
                                      width: "18rem",
                                      height: "16rem",
                                      maxHeight: "450px",
                                    }}
                                  >
                                    <img
                                      src={arrayData.img}
                                      className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    />
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {arrayData.name}
                                      </h5>
                                      <div
                                        className="container w-100 p-0"
                                        style={{ height: "38px" }}
                                      >
                                        <span className="m-1">
                                          {arrayData.qty}
                                        </span>
                                        <span className="m-1">
                                          {arrayData.size}
                                        </span>
                                        <div className="m-1">
                                          {arrayData.Order_date}
                                        </div>
                                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default MyOrder;
