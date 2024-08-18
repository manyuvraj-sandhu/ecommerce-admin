import { getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const headersList = headers();
    const authHeaders: Record<string, string> = {};
    headersList.forEach((value, key) => {
        authHeaders[key] = value;
    });
    
    const { userId } = getAuth({ headers: authHeaders });

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    });

    if (store) {
        redirect(`/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    );
};
