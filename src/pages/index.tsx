import React, { useState } from "react";
import Board from "kanban-board-from-react-trello";
import { Card } from "@styles/global.style";
import RenderKanbanCard from "@parts/RenderKanbanCard";
import { Bee } from "@ethersphere/bee-js";

type Props = {};

export default function Home({}: Props) {
  const beeUrl = "http://localhost:1633";
  const bee = new Bee(beeUrl);
  const [listOrders, setListOrders] = useState([]);
  const [orderReference, setOrderReference] = useState("");

  const getCategoriesFromOrders = (orders: any) => {
    const categories = [];
    orders.map((order) => {
      if (!categories.includes(order.category)) {
        categories.push(order.category);
      }
    });

    return categories;
  };

  const [data, setData] = useState({
    lanes: [
      {
        id: "new-order-lane",
        title: "New Orders",
        label: "0",
        cards: [],
      },
      {
        id: "doing-lane",
        title: "Doing",
        label: "0",
        cards: [],
      },
      {
        id: "served-lane",
        title: "Served",
        label: "0",
        cards: [],
      },
    ],
  });

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const swarmData = await bee.downloadData(orderReference);
        const response: any = swarmData.json();

        const isOrderExist = listOrders.find(
          (order) => order.id === response.id
        );
        if (!isOrderExist) {
          const categories = getCategoriesFromOrders(response.orders);

          data.lanes[0].cards.unshift({
            id: response.id,
            title: `[# ${response.tableNo ?? "00"}] ${
              response.customer ?? "-"
            }`,
            description: (
              <RenderKanbanCard
                data={{
                  categories,
                  order: response,
                }}
              />
            ),
            label: `${response.orders.length} Items`,
            laneId: "new-order-lane",
            metadata: response,
          });
          data.lanes[0].label = data.lanes[0].cards.length.toString();

          setData({ ...data });
          setListOrders([...listOrders, response]);
        } else {
          alert(
            `Order for [# ${isOrderExist.tableNo}] ${isOrderExist.customer} already exist`
          );
        }
      } catch (error) {
        console.log(error);
        alert(`Invalid Order Reference`);
      } finally {
        setOrderReference("");
      }
    }
  };

  const handleOnDataChange = (newData) => {
    newData.lanes.map((lane: any, i) => {
      newData.lanes[i].label = newData.lanes[i].cards.length.toString();
    });
    setData({ ...newData });
  };

  return (
    <div className="mt-8">
      <Card className="p-4 bg-white my-3 w-full md:w-3/5 mx-auto shadow-md">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Paste your Order Reference here
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs placeholder:text-xs"
          type="text"
          placeholder="Enter Order Reference"
          value={orderReference}
          onKeyDown={handleKeyDown}
          onChange={(e) => setOrderReference(e.currentTarget.value)}
        />
      </Card>

      <div className="container w-full md:w-8/12">
        <Board
          data={data}
          style={{
            borderRadius: "6px",
            padding: "25px",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#ffb72b",
          }}
          laneStyle={{
            backgroundColor: "#fdffa9",
          }}
          onDataChange={handleOnDataChange}
        />
      </div>
    </div>
  );
}
