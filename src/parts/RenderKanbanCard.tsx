import Img from '@components/Img/Img';
import formatCurrency from '@helpers/formatCurrency';
import React from 'react';

type Props = {};

export default function RenderKanbanCard({ data }: any) {
  return (
    <div className="">
      {data.categories.map((category: any, categoryIndex) => (
        <div className="item mb-3" key={categoryIndex}>
          <h1 className="font-bold">{category}</h1>
          <hr className="my-1" />
          <div className="orders">
            {data.items
              .filter((order: any) => order.category === category)
              .map((order: any, orderIndex) => (
                <div
                  className="flex gap-x-2 items-center"
                  key={`${categoryIndex}-${orderIndex}`}
                >
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
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
