import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createInventories } from "../services/inventories";
import { useState } from "react";
import type { InventoryForm } from "../types/InventoryForm";
import { Link } from "react-router-dom";

function AddInventoryForm() {
  const [form, setForm] = useState<InventoryForm>({
    name: "",
    locationId: 0,
    price: 0,
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const fetchAddInventory = async (body: InventoryForm) => {
    try {
      await createInventories(body);
      setForm({ name: "", locationId: 0, price: 0 });
      setError("");
      setSuccess("ინვენტარი წარმატებით დაემატა");
    } catch (error) {
      setError("ინვენტარის დამატება ვერ მოხერხდა");
      setSuccess("");
      console.log("error adding inventory:", error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "locationId" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSuccess("");
    if (!form.name || !form.locationId || !form.price) {
      setError("ყველა ველი სავალდებულოა");
      return;
    }
    fetchAddInventory(form);
  };

  return (
    <>
      <div className="text-center font-bold text-xl p-2">
        ინვენტარის დამატება
      </div>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>ინვენტარის დასახელება</Form.Label>
          <Form.Control
            type="text"
            placeholder="ჩაწერეთ ინვენტარის დასახელება"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLocation">
          <Form.Label>ფილიალი</Form.Label>
          <Form.Select
            name="locationId"
            value={form.locationId}
            onChange={handleChange}
            required
          >
            <option value={0}>აირჩიეთ ფილიალი</option>
            <option value={1}>მთავარი ოფისი</option>
            <option value={2}>კავეა გალერია</option>
            <option value={3}>კავეა თბილისი მოლი</option>
            <option value={4}>კავეა ისთ ფოინთი</option>
            <option value={5}>კავეა სითი მოლი</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>ფასი</Form.Label>
          <Form.Control
            type="number"
            placeholder="ჩაწერეთ ფასი"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min={1}
          />
        </Form.Group>
        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}
        {success && (
          <div style={{ color: "green", marginBottom: "10px" }}>{success}</div>
        )}
        <Button variant="primary" type="submit">
          დამატება
        </Button>
        <Link to={"/"} className="!no-underline border-black rounded-3xl mt-2 ">
          <Button variant="secondary w-full">დაბრუნება მთავარ გვერდზე</Button>
        </Link>
      </Form>
    </>
  );
}

export default AddInventoryForm;
