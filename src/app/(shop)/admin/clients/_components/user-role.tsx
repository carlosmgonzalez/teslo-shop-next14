"use client";

import { setUserRole } from "@/actions";
import { Role, User } from "@prisma/client";
import React from "react";
import toast from "react-hot-toast";

export const SetUserRole = ({ user }: { user: User }) => {
	const onChange = async (role: string) => {
		const response = await setUserRole(user.id, role as Role);
		if (!response.ok) {
			toast.error(response.message);
			return;
		}
		toast.success(response.message);
	};

	return (
		<select
			onChange={(e) => onChange(e.target.value)}
			defaultValue={user.role}
			className="px-2 py-1.5 rounded-md bg-neutral-200"
		>
			<option
				key={Role.user}
				// selected={user.role === Role.user}
				value={Role.user}
			>
				User
			</option>
			<option
				key="admin"
				// selected={user.role === Role.admin}
				value={Role.admin}
			>
				Admin
			</option>
		</select>
	);
};
