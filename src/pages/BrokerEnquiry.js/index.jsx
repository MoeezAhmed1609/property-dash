import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Config";
import { useDispatch } from "react-redux";
import { SingleProperty } from "../../Redux/Action/SingleProperty";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";
import {
  Menu as DropDown,
  Typography,
  MenuItem as DropItem,
} from "@mui/material";
import BrokerTable from "./BrokerTable";

export default function BrokerEnquiry() {
  const [Enquiry, setEnquiry] = useState([]);
  const [Status, setStatus] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useFirestoreQuery("/BrokerEnquiry");

  console.log({ data });

  const HandleDeal = async (id, fieldID) => {
    const washingtonRef = doc(db, "properties", id);
    const washingtonRef2 = doc(db, "EnquiryForm", fieldID);
    // await updateDoc(washingtonRef, {
    //     isActive: false,
    // });
    await updateDoc(washingtonRef2, {
      Deal: "Done",
    });

    await deleteDoc(doc(db, "properties", id));
  };

  const HandleSingleProperty = async (id) => {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      dispatch(SingleProperty(docSnap.data()));
      navigate("/Single");
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const HandleActiveProperty = async (propertyid, EnquiryFormId, Active) => {
    const propertyRef = doc(db, "properties", propertyid);
    await updateDoc(propertyRef, {
      isActive: Active ? !Active : true,
    });

    const washingtonRef2 = doc(db, "EnquiryForm", EnquiryFormId);
    await updateDoc(washingtonRef2, {
      Active: Active ? !Active : true,
    });
  };

  //   Dropdown Accordion
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DefaultLayout>
      <div className="mb-2 flex h-[60px] w-full items-center justify-end border-2 border-white pr-2">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Purpose
          </MenuButton>
          <MenuList className="pl-2">
            <MenuItem
              bgColor={"#fff "}
              onClick={() => setStatus("All")}
              className="mx-1 rounded-sm border  border-black px-5 py-2"
            >
              All
            </MenuItem>
            <MenuItem
              bgColor={"#fff "}
              onClick={() => setStatus("Rent")}
              className="mx-1 rounded-sm border  border-black px-5 py-2"
            >
              Rent
            </MenuItem>
            <MenuItem
              bgColor={"#fff "}
              onClick={() => setStatus("Buy")}
              className="mx-1 rounded-sm border  border-black px-5 py-2"
            >
              Buy
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="border-gray-200 overflow-hidden border-b shadow sm:rounded-lg">
                <BrokerTable rows={data} />
              {/* <table className="divide-gray-200 min-w-full divide-y">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Phone No
                    </th>
                    <th
                      scope="col"
                      className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Total Properties
                    </th>
                    <th
                      scope="col"
                      className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Purpose
                    </th>

                    <th
                      scope="col"
                      className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Deal
                    </th>
                    <th
                      scope="col"
                      className="text-gray-500 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-gray-200 divide-y bg-white">
                  {data
                    .filter((item) =>
                      Status
                        ? Status === "All"
                          ? item
                          : item.purpose == Status
                        : item
                    )
                    .map((item, i) => {
                      return (
                        <tr key={i}>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-gray-900 text-sm font-medium">
                                  {item.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-gray-900 text-sm">
                              {item.Email}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-gray-900 text-sm">
                              {item.phone}
                            </div>
                          </td>
                          <td
                            onClick={() =>
                              HandleSingleProperty(item.propertyID)
                            }
                            className="cursor-pointer whitespace-nowrap px-6 py-4"
                          >
                            <div className="text-gray-900 text-sm">
                              {item.properties.length}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className="text-green-800 inline-flex cursor-pointer rounded-full  border-2 px-3 text-xs font-semibold leading-5 hover:bg-[#6ee7b7] hover:text-white"
                              style={{ borderColor: "#6ee7b7" }}
                            >
                              {item.purpose}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              onClick={() =>
                                HandleDeal(item.propertyID, item.id)
                              }
                              className="text-green-800 inline-flex cursor-pointer rounded-full  border-2 px-3 text-xs font-semibold leading-5 hover:bg-[#6ee7b7] hover:text-white"
                              style={{ borderColor: "#6ee7b7" }}
                            >
                              {item.Deal}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              //   onClick={() =>
                              //     HandleDeal(item.propertyID, item.id)
                              //   }
                              className="text-green-800 inline-flex cursor-pointer rounded-full  border-2 px-3 text-xs font-semibold leading-5 hover:bg-[#6ee7b7] hover:text-white"
                              style={{ borderColor: "#6ee7b7" }}
                            //   onClick={handleClick}
                            >
                              <ChevronDownIcon />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
