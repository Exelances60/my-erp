import LoginForm from "@/components/login/LoginForm";

export default function Home() {
  return (
    <div className="container mx-auto  h-[100vh] flex items-center justify-center">
      <div className="border rounded p-5 box-border flex flex-col gap-4">
        <LoginForm />
      </div>
    </div>
  );
}
