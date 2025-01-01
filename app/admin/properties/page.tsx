
import AddPropertyForm from "./components/PropertyForm";
import PropertiesList from "@/app/admin/components/propertiesList"
import { Button } from "@/components/ui/button";





const page = () => {
  return (


    <div className='px-10 p-10  '>
      <Button>
        Add new property
      </Button>
      {/* <AddPropertyForm /> */}
      <section>
        <h1 className="flex p-6 font-bold text-2xl items-center justify-center">Available Properties </h1>
        <PropertiesList />

      </section>
    </div>

  )
}

export default page
