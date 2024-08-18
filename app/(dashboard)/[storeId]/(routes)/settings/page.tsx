import { getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";


import prismadb from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps{
    params: {
        storeId: string;
    }
};

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}) => {
    const headersList = headers();
    const authHeaders: Record<string, string> = {};
    headersList.forEach((value, key) => {
        authHeaders[key] = value;
    });

    const { userId } = getAuth({ headers: authHeaders });

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) {
        redirect("/");
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    );
}

export default SettingsPage;