import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Dropdownblog2 from "./Dropdownblog2";
import ModalMenu from "./Modal";

const DatatablePstatus = ({ dataMenus }) => {
  const handleModal = (menu) => {
    setIsModalOpen((prevState) => !prevState);
    setModalMenuData(menu);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMenuData, setModalMenuData] = useState({});
  const [expandedMenuId, setExpandedMenuId] = useState(null);

  const formatDescription = (description, menuId) => {
     return (
      <>
        {description}
        <span
          className="text-primary ml-1"
          style={{ cursor: "pointer" }}
          onClick={() => handleViewMore(description, menuId)}
        >
         Show Less
        </span>
      </>
    );
  };

  const handleViewMore = (description, menuId) => {
    setExpandedMenuId(menuId);
  };

  const truncateDescription = (description, menuId) => {
    const maxCharacters = 100;
    if (description.length <= maxCharacters) {
      return description;
    }
    const truncated = description.slice(0, maxCharacters) + "...";
    return (
      <>
        {truncated}
        <span
          className="text-primary ml-1"
          style={{ cursor: "pointer" }}
          onClick={() => handleViewMore(description, menuId)}
        >
          View more
        </span>
      </>
    );
  };

  const rows = dataMenus.map((menu) => {
    const formattedDescription =
      menu.description.length > 100
        ? truncateDescription(menu.description, menu.id)
        : formatDescription(menu.description, menu.id);

    return {
      id: menu.id,
      name: menu.name,
      updateDate: menu.updateDate,
      image: (
        <div className="media mb-3" style={{ width: "150px" }}>
          <img
            className="rounded"
            src={`${process.env.PUBLIC_URL}/assets/card/${menu.image}`}
            style={{ width: "100%" }}
            alt=""
          />
        </div>
      ),
      description:
        menu.id === expandedMenuId ? (
          formatDescription(menu.description,menu.menuId)
        ) : (
          formattedDescription 
        ),
      status: (
        <Link
          to={""}
          className={`btn  ${
            menu.status === "OFFLINE"
              ? "bgl-warning text-warning"
              : menu.status === "ONLINE"
              ? "bgl-success text-success"
              : "bgl-light"
          } btn-sm`}
        >
          {menu.status}
        </Link>
      ),
      dropdown: <Dropdownblog2 menu={menu} handleModal={handleModal} />,
    };
  });

  const data = {
    columns: [
      { label: "Menu ID", field: "id", sort: "asc", width: 100 },
      { label: "Name", field: "name", sort: "asc" },
      { label: "Image", field: "image", sort: "asc" },
      { label: "Updated at", field: "updateDate", sort: "asc" },
      { label: "Description", field: "description", sort: "asc" },
      { label: "Status", field: "status", sort: "asc" },
      { label: "Action", field: "dropdown", sort: "asc" },
    ],
    rows: rows,
  };

  return (
    <Fragment>
      {isModalOpen && (
        <ModalMenu
          isModalOpen={isModalOpen}
          handleModal={handleModal}
          modalInformations={{
            columns: data.columns,
            data: modalMenuData,
          }}
        />
      )}
      <div className="row">
        <div className="col-xl-12">
          <div className="table-responsive">
            <div className="display mb-4 dataTablesCard">
              <MDBDataTable
                striped
                small
                noBottomColumns
                hover
                align="middle"
                data={data}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DatatablePstatus;
