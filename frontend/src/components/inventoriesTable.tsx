import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getInventories } from "../services/inventories";
import { getLocations } from "../services/locations";
import type { Inventory } from "../types/inventory";
import type { Location } from "../types/location";

const InventoriesTable: React.FC = () => {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await getInventories({
          page: currentPage,
          locationId: undefined,
          sort: undefined,
          direction: undefined,
        });
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
        console.log("error fetching lcoations:", error);
      }
    };

    fetchInventory();
    fetchLocations();

    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    console.log(inventory);
  }, [inventory]);

  return (
    <>
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
                  <td>წაშლა</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pages">
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
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default InventoriesTable;
