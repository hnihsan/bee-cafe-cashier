import Img from '@components/Img/Img';
import formatCurrency from '@helpers/formatCurrency';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import React, { useState } from 'react';
import DetailOrderModal from '@components/Modal/DetailOrderModal';

type Props = {};

export default function RenderKanbanCard({ data }: any) {
  console.log(data);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="">
      <div
        className="inline-flex justify-between w-full mb-3"
        onClick={() => setIsShow(!isShow)}
      >
        <p>{isShow ? 'Hide Order Items' : 'Show Order Items'}</p>
        {isShow ? <FaCaretDown /> : <FaCaretUp />}
      </div>
      {/* <hr className="my-1 " /> */}
      <div className={'orderItems ' + (!isShow && 'hidden')}>
        {data.categories.map((category: any, categoryIndex) => (
          <div className="item mb-3" key={categoryIndex}>
            <h1 className="font-bold">{category}</h1>
            <hr className="my-1" />
            <div className="orders">
              {data.order.orders
                .filter((order: any) => order.category === category)
                .map((order: any, orderIndex) => (
                  <div
                    className="block mb-1"
                    key={`${categoryIndex}-${orderIndex}`}
                  >
                    <div className="flex gap-x-2 items-center">
                      <Img
                        height={40}
                        width={40}
                        alt={'item'}
                        classname="object-cover rounded-md"
                        layout={'fixed'}
                        src={order.item.image}
                      />

                      <div className="detail py-1">
                        <h3 className="text-sm">{order.item.name ?? '-'}</h3>
                        <p className="text-xs">
                          {order.qty} x $ {formatCurrency(order.item.price)}
                        </p>
                        <p className="text-xs font-bold mt-1">
                          $ {formatCurrency(order.subtotal)}
                        </p>
                      </div>
                    </div>

                    <div className="border border-orange-600 rounded-md p-2">
                      <p>
                        <b>Notes: </b>{' '}
                        {order.notes.length > 0 ? order.notes : '-'}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {!isShow && (
        <div
          className="flex justify-between items-center transition-all duration-300 border shadow p-2 rounded-md hover:bg-gray-50"
          onClick={() => setIsModalShow(true)}
        >
          <div className="items flex">
            {data.order.orders.map((order: any, i) => {
              if (i < 5) {
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    height={30}
                    width={30}
                    alt={'item'}
                    className="object-cover rounded-full first:ml-0 -ml-3 hover:mr-3"
                    src={order.item.image}
                  />
                );
              } else {
                return <p className="self-end font-bold text-xl">..</p>;
              }
            })}
          </div>
          <p className="font-bold">$ {data.order.grandTotal}</p>
        </div>
      )}

      <DetailOrderModal
        data={data.order}
        isOpen={isModalShow}
        onRequestClose={() => setIsModalShow(false)}
      />
    </div>
  );
}
