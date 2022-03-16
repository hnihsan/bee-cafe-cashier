import React, { useEffect, useState } from 'react';

import BaseModal from './BaseModal';
import formatCurrency from '@helpers/formatCurrency';

import { ContainerModal, HeaderModal, BodyModal } from '@styles/global.style';
import IconClose from '@public/images/icon-close.svg';
import Img from '@components/Img/Img';

interface ModalProps {
  isOpen: boolean;
  shouldCloseOnOverlayClick?: boolean;
  data: any;
  onRequestClose: () => void;
}

export default function DetailOrderModal({
  isOpen,
  shouldCloseOnOverlayClick,
  data,
  onRequestClose,
}: ModalProps) {
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    let total = 0;
    data.orders.forEach((order) => {
      total += order.item.price * order.qty;
    });

    const tax = (total * 0.1).toFixed(2);
    const grandTotal = total + tax;

    setSummary({
      total,
      tax,
      grandTotal,
    });
  }, [data]);

  return (
    <BaseModal
      maxWidth={640}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onRequestClose={onRequestClose}
    >
      <ContainerModal>
        <HeaderModal>
          <div className="flex items-center justify-between">
            <p>DETAIL ORDER</p>
            <button
              className="flex justify-center items-center w-4 h-w-4"
              onClick={onRequestClose}
            >
              <IconClose />
            </button>
          </div>
        </HeaderModal>
        <BodyModal>
          <div className="container">
            {data.orders.map((order, index) => (
              <div className="item mb-2 shadow-md p-2" key={index}>
                <div className="flex gap-x-2 items-center py-2 transition ease-in-out duration-300">
                  <Img
                    height={75}
                    width={75}
                    alt={'item'}
                    classname="object-cover rounded-md"
                    layout={'fixed'}
                    src={order?.item?.image}
                  />
                  <div className="detail">
                    <h3 className="text-sm">{order.item?.name ?? '-'}</h3>
                    <p className="text-xs">
                      {order.qty ?? 0} x $ {formatCurrency(order.item?.price)}
                    </p>
                    <p className="text-xs font-bold mt-5">
                      ${' '}
                      {formatCurrency(
                        (order.item?.price * order.qty).toString()
                      )}
                    </p>
                  </div>
                </div>
                <div className="border border-orange-600 rounded-md p-2">
                  <p>
                    <b>Notes: </b> {order.notes.length > 0 ? order.notes : '-'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 text-sm bg-gray-100 border rounded-md shadow">
            <div className="flex justify-between">
              <h3>Total</h3>
              <p>$ {formatCurrency(summary?.total?.toString())}</p>
            </div>
            <div className="flex justify-between">
              <h3>Tax (10%)</h3>
              <p>$ {formatCurrency(summary?.tax?.toString())}</p>
            </div>
            <div className="flex justify-between">
              <h3>Grand Total</h3>
              <p className="font-bold">
                $ {formatCurrency(summary?.grandTotal.toString())}
              </p>
            </div>
          </div>
        </BodyModal>
      </ContainerModal>
    </BaseModal>
  );
}
