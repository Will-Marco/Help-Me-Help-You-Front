import { StudentHomeModule } from "@/modules/Student";

const StudentHome = () => {
  return (
    <>
      <div className="containers flex flex-col">
        <StudentHomeModule />
      </div>
    </>
  );
};

export default StudentHome;