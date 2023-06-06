import React, { Fragment, useState, useRef } from "react";
import { Table, Pagination, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import EditModal from "../yasserComponents/EditModal";

import data from "../pages/tableData";
const tabData = [
  { name: "Tout ", content: "" },
  { name: "Nouveau", content: "" },
  { name: "En préparation", content: "" },
  { name: "Prêt", content: "" },
  { name: "closed", content: "" },
  //   { name: "More", content: "" },
];
const ProfileDatatable = () => {
  const [selectedNav, setSelectedNav] = useState("tout");
  const [editModal, setEditModal] = useState(false);
  const [modalInformations, setModalInformations] = useState();
  const [demo, setdemo] = useState();

  // deduire le nombre de pages
  const sort = 3;
  const [pagination, setPagination] = useState(
    Array(Math.ceil(data.profileTable.data.length / sort))
      .fill()
      .map((_, i) => i + 1)
  );
  // let Pagination = Array(Math.ceil(data.profileTable.data.length / sort))
  //   .fill()
  //   .map((_, i) => i + 1);

  //initialiser la pagination
  const activePag = useRef(0);

  //les donnes affichés apres la pagination
  const orderData = useRef(
    data.profileTable.data.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    )
  );
  const onClick = (i) => {
    activePag.current = i;

    if (selectedNav.trim() === "tout") {
      orderData.current = data.profileTable.data.slice(
        activePag.current * sort,
        (activePag.current + 1) * sort
      );
    } else {
      const indexStatus = data.profileTable.columns.indexOf("Status");
      const filtredData = data.profileTable.data.filter((element) => {
        return element[indexStatus].toLowerCase() === selectedNav.toLowerCase();
        // console.log("item :" + element[indexStatus].toLowerCase());
        // console.log("navBar :" + navItem.toLowerCase());
      });
      orderData.current = filtredData.slice(
        activePag.current * sort,
        (activePag.current + 1) * sort
      );
    }

    setdemo(
      data.profileTable.data.slice(
        activePag.current * sort,
        (activePag.current + 1) * sort
      )
    );
    // console.log(JSON.stringify(orderData.current));
  };
  const handleSelectNav = (navItem) => {
    let filtredData;
    if (navItem.trim() === "tout") {
      filtredData = data.profileTable.data;
    } else {
      const indexStatus = data.profileTable.columns.indexOf("Status");
      filtredData = data.profileTable.data.filter((element) => {
        return element[indexStatus].toLowerCase() === navItem.toLowerCase();
        // console.log("item :" + element[indexStatus].toLowerCase());
        // console.log("navBar :" + navItem.toLowerCase());
      });
    }
    activePag.current = 0;
    orderData.current = filtredData.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
    setPagination(
      Array(Math.ceil(filtredData.length / sort))
        .fill()
        .map((_, i) => i + 1)
    );
    setSelectedNav(navItem);
  };
  const handleModal = (state, data) => {
    setEditModal(state);
    setModalInformations(data);
  };
  return (
    <div className="col-12">
      {editModal && (
        <EditModal
          editModal={editModal}
          handleModal={handleModal}
          modalInformations={{
            columns: data.profileTable.columns,
            modalInformations,
          }}
        />
      )}

      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Profile Datatable</h4>
          <div className="card-action card-tabs mt-3 mt-3 mt-lg-0">
            <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
              <Nav as="ul" className="nav-tabs" onSelect={handleSelectNav}>
                {tabData.map((data, i) => (
                  <Nav.Item as="li" key={i}>
                    <Nav.Link eventKey={data.name.toLowerCase()}>
                      {data.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Tab.Content className="">
                {tabData.map((data, i) => (
                  <Tab.Pane
                    eventKey={data.name.toLowerCase()}
                    key={i}
                  ></Tab.Pane>
                ))}
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
        <div className="card-body">
          <Table responsive className="w-100">
            <div id="example_wrapper" className="dataTables_wrapper">
              <table id="example" className="display w-100 dataTable">
                <thead>
                  <tr role="row">
                    {data.profileTable.columns.map((d, i) => (
                      <th key={i}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orderData.current.map((d, i) => (
                    <tr key={i}>
                      {d.map((da, i) => (
                        <Fragment key={i}>
                          <td>
                            {
                              // i === 0 ? (
                              // <img
                              //   className="rounded-circle"
                              //   width="35"
                              //   src={da}
                              //   alt=""
                              // />
                              // ) :
                              i === 2 ? (
                                <Fragment>
                                  {da === "Nouveau" ? (
                                    <Badge variant="success light">
                                      Nouveau
                                    </Badge>
                                  ) : da === "Prêt" ? (
                                    <Badge variant="danger light">Prêt</Badge>
                                  ) : da === "En Préparation" ? (
                                    <Badge variant="warning light">
                                      En Préparation
                                    </Badge>
                                  ) : da === "Closed" ? (
                                    <Badge variant="info light">Closed</Badge>
                                  ) : (
                                    da
                                  )}
                                </Fragment>
                              ) : (
                                <Fragment>
                                  {da}
                                  {i === 5 && (
                                    <div className="d-flex">
                                      <Button
                                        to="#"
                                        className="btn btn-primary shadow btn-xm sharp mr-1 "
                                        onClick={() => handleModal(true, d)}
                                      >
                                        <i className="fa fa-pencil "></i>
                                      </Button>
                                      <Button
                                        to="#"
                                        className="btn btn-danger shadow btn-xm sharp"
                                        onClick={() => handleModal(true, d)}
                                      >
                                        <i className="fa fa-arrows-alt"></i>
                                      </Button>
                                    </div>
                                  )}
                                </Fragment>
                              )
                            }
                          </td>
                        </Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr role="row">
                    {data.profileTable.columns.map((d, i) => (
                      <th key={i}>{d}</th>
                    ))}
                  </tr>
                </tfoot>
              </table>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="dataTables_info">
                  Showing {activePag.current * sort + 1} to
                  {data.profileTable.data.length <
                  (activePag.current + 1) * sort
                    ? data.profileTable.data.length
                    : (activePag.current + 1) * sort}
                  of {data.profileTable.data.length} entries
                </div>
                <div className="dataTables_paginate paging_simple_numbers">
                  <Pagination
                    className="pagination-primary pagination-circle"
                    size="lg"
                  >
                    <li
                      className="page-item page-indicator "
                      onClick={() =>
                        activePag.current > 1 && onClick(activePag.current - 1)
                      }
                    >
                      <Link className="page-link" to="#">
                        <i className="la la-angle-left" />
                      </Link>
                    </li>
                    {pagination.map((number, i) => (
                      <Pagination.Item
                        className={activePag.current === i ? "active" : ""}
                        onClick={() => onClick(i)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}
                    <li
                      className="page-item page-indicator"
                      onClick={() =>
                        activePag.current + 1 < pagination.length &&
                        onClick(activePag.current + 1)
                      }
                    >
                      <Link className="page-link" to="#">
                        <i className="la la-angle-right" />
                      </Link>
                    </li>
                  </Pagination>
                </div>
              </div>
            </div>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProfileDatatable;
