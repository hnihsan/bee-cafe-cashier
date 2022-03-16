import Img from '@components/Img/Img';
import formatCurrency from '@helpers/formatCurrency';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import React, { useState } from 'react';

type Props = {};

export default function RenderKanbanCard({ data }: any) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="">
      <div className='inline-flex justify-between w-full mb-3' onClick={() => setIsShow(!isShow)}>
        <p>{isShow ? "Hide Order Items" : "Show Order Items"}</p>
        {isShow ? <FaCaretDown/> : <FaCaretUp />}
      </div>
      {/* <hr className="my-1 " /> */}
      <div className={'orderItems ' + (!isShow && 'hidden')}>
        {data.categories.map((category: any, categoryIndex) => (
          <div className="item mb-3" key={categoryIndex}>
            <h1 className="font-bold">{category}</h1>
            <hr className="my-1" />
            <div className="orders">
              {data.items
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
    </div>
  );
}
