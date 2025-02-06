import PropertiesForm from "@/app/upload/PropertiesForm";
import { m } from "framer-motion";
import { useRouter } from "next/router";

const EditPropertyPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return <PropertiesForm propertyId={Number(id)} />;
};

export default EditPropertyPage;

   