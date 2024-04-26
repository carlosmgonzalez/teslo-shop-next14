"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
	CreateOrderData,
	CreateOrderActions,
	OnApproveData,
	OnApproveActions,
} from "@paypal/paypal-js";
import toast from "react-hot-toast";
import { LuLoader } from "react-icons/lu";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
	orderId: string;
	amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
	const [{ isPending }] = usePayPalScriptReducer();

	const rountedAmount = Math.round(amount * 100) / 100;

	if (isPending) {
		return (
			<div className="flex flex-col gap-3">
				<div className="w-full bg-neutral-200 h-8 flex justify-center items-center rounded-md">
					<LuLoader className="animate-spin w-5 h-5" />
				</div>
				<div className="w-full bg-neutral-200 h-8 flex justify-center items-center rounded-md">
					<LuLoader className="animate-spin w-5 h-5" />
				</div>
			</div>
		);
	}

	const createOrder = async (
		data: CreateOrderData,
		actions: CreateOrderActions,
	): Promise<string> => {
		const transactionId = await actions.order.create({
			intent: "CAPTURE",
			purchase_units: [
				{
					invoice_id: orderId,
					amount: {
						value: rountedAmount.toString(),
						currency_code: "USD",
					},
				},
			],
		});

		const response = await setTransactionId(transactionId, orderId);

		if (!response.ok) {
			toast.error(response.message);
			throw new Error(response.message);
		}

		toast.success(response.message);
		return transactionId;
	};

	const onApprove = async (
		data: OnApproveData,
		actions: OnApproveActions,
	): Promise<void> => {
		const details = await actions.order?.capture();
		if (!details) return;

		const res = await paypalCheckPayment(details.id!);

		if (!res.ok) {
			toast.error(res.message || "");
			return;
		}

		toast.success(res.message || "");
	};

	return (
		<PayPalButtons
			className="relative z-0"
			createOrder={createOrder}
			onApprove={onApprove}
		/>
	);
};
