import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getInventories, deleteInventory } from "../services/inventories";
import { getLocations } from "../services/locations";
import type { Inventory } from "../types/inventory";
import type { Location } from "../types/location";
import { Link } from "react-router-dom";

const InventoriesTable: React.FC = () => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchInventory = async () => {
    try {
      const response = await getInventories({
        page: currentPage,
        locationId: undefined,
        sort: undefined,
        direction: undefined,
      });
      setTotalCount(response.data.count);
      setTotalPages(response.data.count / 20);
      setInventory(response.data.rows);
    } catch (error) {
      console.log("error fetching inventory:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      setLocations(response.data);
    } catch (error) {
      console.log("error fetching locations:", error);
    }
  };

  const fetchDeleteInventory = async (id: number) => {
    try {
      await deleteInventory(id);
      fetchInventory();
    } catch (error) {
      console.log("error deleting inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
    fetchLocations();

    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  return (
    <>
      <Link
        className="!no-underline flex justify-center items-center w-1/2 mx-auto my-2"
        to={"/inventories/add"}
      >
        <Button className="w-full">ინვენტარის დამატება</Button>
      </Link>
      {inventory ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>ნივთის სახელი</td>
                <td>ნივთის ადგილმდებარეობა</td>
                <td>ფასი</td>
                <td>ოპერაციები</td>
              </tr>
            </thead>
            <tbody>
              {inventory.map((element: Inventory) => (
                <tr key={element.id}>
                  <td>{element.name}</td>
                  <td>
                    {locations.find(
                      (location) => location.id === element.locationId
                    )?.name || ""}
                  </td>
                  <td>{element.price} ლარი</td>
                  <td>
                    <div
                      onClick={() => {
                        fetchDeleteInventory(element.id);
                      }}
                      className="delete-button"
                    >
                      წაშლა
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pages">
            <div className="navigation">
              {currentPage ? (
                <div
                  className="pages-prev"
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  previous
                </div>
              ) : (
                ""
              )}
              <div>{currentPage}</div>
              {!(currentPage === totalPages) ? (
                <div
                  className="pages-next"
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                  }}
                >
                  next
                </div>
              ) : (
                ""
              )}
            </div>

            <div>ნივთების რაოდენობა: {totalCount}</div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default InventoriesTable;
