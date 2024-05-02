import React, { useState } from "react";
import { SideMenu } from "../../components";
import axios from "axios";
import "./index.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";

const Orders = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const convertToDollars = (amount) => {
    return `$${(amount / 100).toFixed(2)}`;
  };
  const [users, setUsers] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const fetchUsersWithOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/all-orders`,
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  React.useEffect(() => {
    fetchUsersWithOrders();
  }, []);

  const handleExpandClick = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <SideMenu>
      <div className="order-table-main">
        <Paper sx={{ width: "100%" }} style={{ backgroundColor: "#fff" }}>
          <TableContainer sx={{ maxHeight: "55vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    User ID
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    Full Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>Email</TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <React.Fragment key={user._id}>
                      <TableRow>
                        <TableCell>{user._id}</TableCell>
                        <TableCell>{user.fullName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleExpandClick(user._id)}
                          >
                            {expandedOrderId === user._id
                              ? "Collapse"
                              : "Expand"}
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Collapse
                            in={expandedOrderId === user._id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell style={{ fontWeight: "bolder" }}>
                                    Order ID
                                  </TableCell>
                                  <TableCell style={{ fontWeight: "bolder" }}>
                                    Product Name
                                  </TableCell>
                                  <TableCell style={{ fontWeight: "bolder" }}>
                                    Unit Amount
                                  </TableCell>
                                  <TableCell style={{ fontWeight: "bolder" }}>
                                    Quantity
                                  </TableCell>
                                  <TableCell style={{ fontWeight: "bolder" }}>
                                    Order Status(Stripe)
                                  </TableCell>
                                  <TableCell style={{ fontWeight: "bolder" }}>
                                    Images
                                  </TableCell>
                                  <TableCell style={{ fontWeight: "bolder" }}>
                                    Customer Details
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {user.orders.map((order) => (
                                  <React.Fragment key={order._id}>
                                    {order.lineItems.map((item, index) => (
                                      <TableRow key={index}>
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell>
                                          {item.price_data.product_data.name}
                                        </TableCell>
                                        <TableCell>
                                          {convertToDollars(
                                            item.price_data.unit_amount,
                                          )}
                                        </TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                          {order.shipping.payment_status}
                                        </TableCell>

                                        <TableCell>
                                          {item.price_data.product_data.images.map(
                                            (image, idx) => (
                                              <a
                                                key={idx}
                                                href={image}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                <img
                                                  src={image}
                                                  alt={`Product ${idx}`}
                                                  style={{
                                                    width: "200px",
                                                    height: "350px",
                                                    marginRight: "5px",
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </a>
                                            ),
                                          )}
                                        </TableCell>

                                        <TableCell>
                                          {order.shipping &&
                                            order.shipping.customer_details && (
                                              <div>
                                                Name:{" "}
                                                {
                                                  order.shipping
                                                    .customer_details.name
                                                }
                                                <br />
                                                Email:{" "}
                                                {
                                                  order.shipping
                                                    .customer_details.email
                                                }
                                                <br />
                                                Address:{" "}
                                                {
                                                  order.shipping
                                                    .customer_details.address
                                                    .line1
                                                }
                                                <br />
                                                City:{" "}
                                                {
                                                  order.shipping
                                                    .customer_details.address
                                                    .city
                                                }
                                                <br />
                                                State:{" "}
                                                {
                                                  order.shipping
                                                    .customer_details.address
                                                    .state
                                                }
                                                <br />
                                                Postal Code:{" "}
                                                {
                                                  order.shipping
                                                    .customer_details.address
                                                    .postal_code
                                                }
                                                <br />
                                                Country:{" "}
                                                {
                                                  order.shipping
                                                    .customer_details.address
                                                    .country
                                                }
                                                <br />
                                              </div>
                                            )}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </React.Fragment>
                                ))}
                              </TableBody>
                            </Table>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            style={{
              backgroundColor: "#fff",
              color: "#6B7280",
              fontFamily: "Inter",
            }}
          />
        </Paper>
      </div>
    </SideMenu>
  );
};

export default Orders;
