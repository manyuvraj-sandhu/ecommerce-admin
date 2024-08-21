"use client";

import { useParams, useRouter } from "next/navigation";

interface ApiListProps {
    entityName: string;
    entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
    entityName,
    entityIdName,
}) => {
    const params = useParams();
    const router = useRouter();

    return (
        <div>
            ApiList
        </div>
    )
}