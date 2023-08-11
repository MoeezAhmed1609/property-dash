import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import TabsComponent from "../../components/TabsComponent";
import { TabPanel } from "react-tabs";
import AddNewProperty from "./Components/AddNewProperty";
import AddProperty from "../AddProperty";

import { db } from "../../Config";
import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SingleProperty } from "../../Redux/Action/SingleProperty";
import { UpdatePropertyAction } from "../../Redux/Action/UpdatePropertyAction";
import Modal from "../../ReUseableComponent/Modal";
import LazyLoadImage from "../../ReUseableComponent/LazyLoadImage";
import { CSVLink } from "react-csv";
import useFirestoreQuery from "../../hooks/useFirestoreQuery";
import useFirestoreDelete from "../../hooks/useFirestoreDelete";

export default function Properties() {
  const [Properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useFirestoreQuery("/properties");
  const { isDeleting, error, isDeleted, setCollectionPath, setDocumentId } =
    useFirestoreDelete();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  


  useEffect(() => {
    console.log(data);
  }, []);

  const HandleNavigateProperty = (item) => {
    dispatch(SingleProperty(item));
    navigate(`/Single`);
  };

  const HandleDelete = async (id) => {
    setCollectionPath("/properties");
    setDocumentId(id);
  };

  const HandleUpdate = (item) => {
    navigate(`/${item.id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DefaultLayout>
      <div className="flex h-[70px] w-full cursor-pointer items-center justify-end px-10">

       
        <CSVLink filename={"properties.csv"} data={Properties}>
          Download Csv
        </CSVLink>
      </div>

      <TabsComponent Header={["Properties", "Add New"]}>
        <TabPanel>
          <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            
            {data.map((item, index) => {
              return (
                <Box
                  key={index}
                  className="mx-auto max-w-md cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
                >
                  <LazyLoadImage
                    onClick={() => HandleNavigateProperty(item)}
                    className="h-48 w-full object-cover"
                    src={item.property_urls[0]}
                    alt="[Property Name]"
                  />
                  <Box className="p-6">
                    <Text
                      as="h2"
                      onClick={() => HandleNavigateProperty(item)}
                      className="text-gray-900 mb-2 text-lg font-semibold"
                    >
                      {item.Property_Name}
                    </Text>
                    <Text
                      noOfLines={2}
                      onClick={() => HandleNavigateProperty(item)}
                      className="text-gray-700 mb-4 text-base"
                    >
                      {item.Overview}
                    </Text>
                    <Box className="flex justify-end">
                      <button
                        onClick={() => HandleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 mr-2 rounded px-4 py-2 text-black"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => HandleUpdate(item)}
                        className="bg-cyan-500 hover:bg-blue-600 rounded px-4 py-2 text-black"
                      >
                        Update
                      </button>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel>
          <AddProperty />
        </TabPanel>
      </TabsComponent>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Text>A</Text>
      </Modal>
    </DefaultLayout>
  );
}
