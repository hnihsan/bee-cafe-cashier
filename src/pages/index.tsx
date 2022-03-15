import React, { useState } from 'react';
import Board from 'kanban-board-from-react-trello';
import { Card } from '@styles/global.style';
import RenderKanbanCard from '@parts/RenderKanbanCard';

type Props = {};

export default function Home({}: Props) {
  const [listOrders, setListOrders] = useState([]);

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
        id: 'new-order-lane',
        title: 'New Orders',
        label: '0',
        cards: [],
      },
      {
        id: 'doing-lane',
        title: 'Doing',
        label: '0',
        cards: [],
      },
      {
        id: 'served-lane',
        title: 'Served',
        label: '0',
        cards: [],
      },
    ],
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const response: any = {
        orders: [
          {
            category: 'coffee',
            item: {
              name: 'Caramel Macchiato',
              price: '10',
              image:
                'https://gateway-proxy-bee-8-0.gateway.ethswarm.org/bzz/cac57098810ea60163e02fcfe017c207fd86ae99cff4001645fa171e6c4db5c7/',
            },
            qty: 2,
            subtotal: 20,
            notes: '',
          },
          {
            category: 'teas',
            item: {
              name: 'Black Tea',
              price: '7',
              image:
                'https://gateway-proxy-bee-2-0.gateway.ethswarm.org/bzz/f7ce35d89b4404d4b1230511c31566704add994e95f4e21ea291c15a206bda78/',
            },
            qty: 3,
            subtotal: 21,
            notes: '1/4 sugar..',
          },
          {
            category: 'teas',
            item: {
              name: 'Green Tea',
              price: '7',
              image:
                'https://gateway-proxy-bee-1-0.gateway.ethswarm.org/bzz/a8d06e2dd8189704d674d846eda871919d95eece82c1641bcefd91145e51c424/',
            },
            qty: 2,
            subtotal: 14,
            notes: 'No sugar...',
          },
          {
            category: 'juices',
            item: {
              name: 'Raspberry Black Currant',
              price: '8',
              image:
                'https://gateway-proxy-bee-1-0.gateway.ethswarm.org/bzz/f837296b3ba8ef8d286cc211fe65676f2b77732dfc59f61eedc6c76877b3ece7/',
            },
            qty: 2,
            subtotal: 16,
            notes: 'Sweatt...',
          },
          {
            category: 'breakfasts',
            item: {
              name: 'Scrambled Egg & Bacon',
              price: '15',
              image:
                'https://gateway-proxy-bee-2-0.gateway.ethswarm.org/bzz/8c90a5c6b3378bd1bc1c1ccc403d05b4ca1c4a02cfa7ef0996f56affed7c0c1c/',
            },
            qty: 1,
            subtotal: 15,
            notes: 'No crack',
          },
        ],
        total: 86,
        tax: '8.60',
        grandTotal: '868.60',
        customer: 'Nico',
        tableNo: 2,
      };
      response.id = `${response.tableNo}-${response.customer}`;

      const isOrderExist = listOrders.find((order) => order.id === response.id);
      if (!isOrderExist) {
        const categories = getCategoriesFromOrders(response.orders);

        data.lanes[0].cards.push({
          id: response.id,
          title: `[# ${response.tableNo ?? '00'}] ${response.customer ?? '-'}`,
          description: (
            <RenderKanbanCard
              data={{
                categories,
                items: response.orders,
              }}
            />
          ),
          label: `${response.orders.length} Items`,
          laneId: 'new-order-lane',
        });
        data.lanes[0].label = data.lanes[0].cards.length.toString();

        setData({ ...data });
        setListOrders([...listOrders, response]);
      } else {
        alert(
          `Order for [# ${isOrderExist.tableNo}] ${isOrderExist.customer} already exist`
        );
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
      <Card className="p-4 bg-white my-3 w-full md:w-3/5 mx-auto">
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
          onKeyDown={handleKeyDown}
        />
      </Card>

      <div className="container">
        <Board
          data={data}
          style={{
            borderRadius: '6px',
            padding: '25px',
            display: 'flex',
            justifyContent: 'center',
          }}
          onDataChange={handleOnDataChange}
        />
      </div>
    </div>
  );
}
