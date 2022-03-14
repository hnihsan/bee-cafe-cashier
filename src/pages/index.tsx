import Img from '@components/Img/Img';
import React, { useState } from 'react';
import { FaBeer } from 'react-icons/fa';

import formatRupiah from '@helpers/formatRupiah';
import ConfirmQtyModal from '@components/Modal/ConfirmQtyModal';
import Receipt from '@parts/Receipt';
type Props = {};

export default function Home({}: Props) {
  const [selectedCurrentIndex, setSelectedCurrentIndex] = useState(0);
  const datas = [
    {
      category: 'coffee',
      items: [
        {
          name: 'Expresso',
          price: '7000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Double Expresso',
          price: '10000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Cappacino',
          price: '8000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Latte',
          price: '8000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Americano',
          price: '5000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Mocha',
          price: '8000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Flat White',
          price: '3000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Short Black',
          price: '3000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Long Black',
          price: '3000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
      ],
    },
    {
      category: 'teas',
      items: [
        {
          name: 'White',
          price: '2000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Green',
          price: '2000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Black',
          price: '3000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Oolong',
          price: '4000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          name: 'Puer',
          price: '3000',
          image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
      ],
    },
    {
      category: 'bakery',
      items: [],
    },
    {
      category: 'sandwiches',
      items: [],
    },
  ];
  const tablesNumbers = [...Array(25).keys()];
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orders, setOrders] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('customer');

  const handleConfirmItem = (item: any) => {
    const isExist = orders.filter((order) => {
      return order.item.name === item.item.name;
    }).length;

    if (isExist) {
      const index = orders.findIndex(
        (order) => order.item.name === item.item.name
      );

      orders[index].qty = item.qty;
    } else {
      setOrders((oldOrders) => [...oldOrders, item]);
    }
  };

  const handleTabSwitch = (event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedTab(event.currentTarget.getAttribute('data-tabs'));
    console.log(
      'Selected Tab:' + event.currentTarget.getAttribute('data-tabs')
    );

    setTabIndex(+event.currentTarget.getAttribute('data-tabIndex'));
    console.log(
      'Selected Index:' + +event.currentTarget.getAttribute('data-tabindex')
    );
  };

  const handleCustomerInput = (event) => {
    setCustomerName(event.currentTarget.value);
  };

  const handleSubmitCustomer = (event) => {
    setTabIndex(1);
    setSelectedTab('tables');
  };

  return (
    <div>
      <div className="container bg-white shadow rounded-lg mt-16 w-1/2 flex justify-center">
        <div className="w-full max-w-lg">
          <ul id="tabs" className="inline-flex w-full px-1 pt-2 ">
            <li
              className={
                'px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50' +
                (tabIndex >= 0 ? '-mb-px border-b-4 border-blue-400' : '')
              }
            >
              <a
                className="tabs-navigation"
                data-tabindex="0"
                data-tabs="customer"
                onClick={handleTabSwitch}
              >
                Customer Info
              </a>
            </li>
            <li
              className={
                'px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50' +
                (tabIndex >= 1 ? '-mb-px border-b-4 border-blue-400' : '')
              }
            >
              {' '}
              &gt;{' '}
            </li>
            <li
              className={
                'px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50' +
                (tabIndex >= 1 ? '-mb-px border-b-4 border-blue-400' : '')
              }
            >
              <a
                className="tabs-navigation"
                data-tabindex="1"
                data-tabs="tables"
                onClick={handleTabSwitch}
              >
                Choose Table <FaBeer className="text-blue-500" />
              </a>
            </li>
            <li
              className={
                'px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50' +
                (tabIndex >= 2 ? '-mb-px border-b-4 border-blue-400' : '')
              }
            >
              {' '}
              &gt;{' '}
            </li>
            <li
              className={
                'px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50' +
                (tabIndex >= 2 ? '-mb-px border-b-4 border-blue-400' : '')
              }
            >
              <a
                className="tabs-navigation"
                data-tabindex="2"
                data-tabs="menus"
                onClick={handleTabSwitch}
              >
                Main Menu
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container bg-white shadow rounded-lg mt-4 p-8">
        <div
          className={
            'flex justify-center ' +
            (selectedTab === 'customer' ? '' : 'hidden')
          }
          id="customerID"
        >
          <div className="w-full max-w-md">
            <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Welcome to Bee Cafe, what can we call you?
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={handleCustomerInput}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmitCustomer}
                >
                  Let's go!
                </button>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2020 Acme Corp. All rights reserved.
            </p>
          </div>
        </div>
        <div className={selectedTab === 'tables' ? '' : 'hidden'} id="tableNo">
          <div
            className="w-12/12 overflow-auto p-4"
            style={{ maxHeight: '70vh', height: '70vh' }}
          >
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {tablesNumbers.map((item, index) => (
                <div
                  className={
                    'relative border rounded-md cursor-pointer hover:shadow-md ' +
                    (selectedTable == item + 1 &&
                      'border-4 border-green-300 rounded-lg font-bold')
                  }
                  style={{
                    height: '150px',
                    width: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => {
                    console.log('Table no: ' + (item + 1));
                    setSelectedTable(item + 1);
                  }}
                  key={index}
                >
                  <button
                    className={
                      'absolute flex items-center justify-center gap-2 transition-all bg-green-300 w-8 h-8 rounded-br-lg top-0 left-0 ' +
                      (selectedTable == item + 1 ? '' : 'hidden')
                    }
                  >
                    <div className="absolute w-10 h-10 z-10">
                      <Img
                        src="/images/icon-checklist.png"
                        height="100%"
                        width="100%"
                        alt={'Table No. ' + (item + 1)}
                        classname="object-cover rounded-tl-md rounded-tr-md"
                      />
                    </div>
                  </button>
                  <h1>{item + 1}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={
            'flex gap-x-5 w-full ' + (selectedTab === 'menus' ? '' : 'hidden')
          }
          id="menuOrders"
        >
          <aside
            className="w-2/12 overflow-auto "
            style={{ maxHeight: '70vh' }}
          >
            <ul className="list-none">
              {datas.map(({ category }, index) => (
                <li
                  key={index}
                  className={`p-3 first-letter:uppercase  cursor-pointer hover:text-red-100 transition-all duration-75 ${
                    selectedCurrentIndex === index
                      ? 'border rounded bg-gray-500 text-white hover:text-white'
                      : ''
                  }`}
                  onClick={() => setSelectedCurrentIndex(index)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </aside>
          <div
            className="w-10/12  overflow-auto p-4 border-l"
            style={{ maxHeight: '70vh', height: '70vh' }}
          >
            <div className="grid grid-cols-4 gap-4">
              {datas[selectedCurrentIndex]?.items?.length > 0 ? (
                datas[selectedCurrentIndex].items.map((item, index) => (
                  <div
                    className="border rounded-md cursor-pointer hover:shadow-md relative"
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                    }}
                    key={index}
                  >
                    <figure className="bg-white rounded-md">
                      <div className="relative">
                        {orders.filter((order) => order.item.name === item.name)
                          .length > 0 && (
                          <div className="absolute w-10 h-10 z-10">
                            <Img
                              src="/images/icon-checklist.png"
                              height="100%"
                              width="100%"
                              alt={item?.name ?? '-'}
                              classname="object-cover rounded-tl-md rounded-tr-md"
                            />
                          </div>
                        )}

                        <Img
                          src={item?.image}
                          height="100%"
                          width="100%"
                          alt={item?.name ?? '-'}
                          classname="object-cover rounded-tl-md rounded-tr-md"
                        />

                        <div className="meta">
                          <p className="mt-3 px-3 text-lg text-white">
                            IDR {formatRupiah(item?.price ?? 0)}
                          </p>
                        </div>
                      </div>

                      <figcaption className="p-4 text-black text-center">
                        <h2 className="text-gray-900 text-center text-sm">
                          {item?.name ?? '-'}
                        </h2>
                      </figcaption>
                    </figure>
                  </div>
                ))
              ) : (
                <h2>Sorry, no item available</h2>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedItem && (
        <ConfirmQtyModal
          orders={orders}
          data={selectedItem}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={(payload) => {
            handleConfirmItem(payload);
          }}
          shouldCloseOnOverlayClick={true}
        />
      )}

      {orders.length > 0 && (
        <Receipt
          customer={customerName}
          tableNo={selectedTable}
          orders={orders}
        />
      )}
    </div>
  );
}
